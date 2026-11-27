import { NextResponse, type NextRequest } from "next/server";
import {
  DEMO_RECIPIENT_EMAIL,
  formatDemoEmail,
  validateDemoSubmission,
} from "@/lib/demo-submission";

const MAX_BODY_BYTES = 16_384;
const COOLDOWN_COOKIE = "zeon_demo_rl";
const COOLDOWN_SECONDS = 60;
const REDIS_WINDOW_SECONDS = 900; // 15 minutes
const REDIS_MAX_REQUESTS = 5;

const encoder = new TextEncoder();

function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function getSigningSecret(): string {
  return (
    process.env.DEMO_RATE_LIMIT_SECRET ||
    process.env.RESEND_API_KEY ||
    "zeonai-demo-fallback"
  );
}

async function signTimestamp(ts: number): Promise<string> {
  const payload = String(ts);
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSigningSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBytes = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );
  const sig = toHex(sigBytes).slice(0, 24);
  return `${payload}.${sig}`;
}

async function isWithinCookieCooldown(
  cookieValue: string | undefined,
): Promise<boolean> {
  if (!cookieValue) return false;
  const [rawTs, sig] = cookieValue.split(".");
  if (!rawTs || !sig) return false;
  const ts = Number(rawTs);
  if (!Number.isFinite(ts)) return false;
  const expected = (await signTimestamp(ts)).split(".")[1];
  if (!expected || !constantTimeEqual(sig, expected)) return false;
  return Date.now() - ts < COOLDOWN_SECONDS * 1000;
}

function getClientIp(req: NextRequest): string {
  const cfIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Optional distributed rate limiter via Upstash Redis REST API.
 * Safe for stateless serverless runtimes (Cloudflare, Vercel) and Docker.
 */
async function checkUpstashRateLimit(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;

  const hashBuf = await crypto.subtle.digest("SHA-256", encoder.encode(ip));
  const ipHash = toHex(hashBuf).slice(0, 16);
  const key = `zeonai:demo:rl:${ipHash}`;

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(REDIS_WINDOW_SECONDS), "NX"],
      ]),
      cache: "no-store",
    });
    if (!res.ok) return false;
    const body = (await res.json()) as Array<{ result?: number }>;
    const count = Number(body?.[0]?.result ?? 0);
    return count > REDIS_MAX_REQUESTS;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { ok: false, error: "Unsupported content type." },
      { status: 415 },
    );
  }

  const contentLength = Number(req.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Request payload is too large." },
      { status: 413 },
    );
  }

  let rawText: string;
  try {
    rawText = await req.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read request body." },
      { status: 400 },
    );
  }

  if (encoder.encode(rawText).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Request payload is too large." },
      { status: 413 },
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const validation = validateDemoSubmission(parsed);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400 },
    );
  }

  // Silently accept honeypot submissions without sending email.
  if (validation.isSpam) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Stateless serverless-safe rate limiting: signed cooldown cookie + optional Upstash Redis.
  if (await isWithinCookieCooldown(req.cookies.get(COOLDOWN_COOKIE)?.value)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please wait a moment before sending another request.",
      },
      { status: 429 },
    );
  }

  const redisLimited = await checkUpstashRateLimit(getClientIp(req));
  if (redisLimited) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many requests. Please try again later or email contact@zeonai.com.",
      },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !fromEmail) {
    console.error("[demo-api] Email provider is not configured.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "Demo request delivery is temporarily unavailable. Please email contact@zeonai.com directly.",
      },
      { status: 503 },
    );
  }

  const { subject, text, html } = formatDemoEmail(validation.data);

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [DEMO_RECIPIENT_EMAIL],
        reply_to: validation.data.email,
        subject,
        text,
        html,
      }),
      cache: "no-store",
    });

    if (!resendRes.ok) {
      console.error(
        "[demo-api] Resend delivery failed with status:",
        resendRes.status,
      );
      return NextResponse.json(
        {
          ok: false,
          error:
            "We could not send your request right now. Please try again or email contact@zeonai.com.",
        },
        { status: 502 },
      );
    }
  } catch {
    console.error("[demo-api] Network error while contacting email provider.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your request right now. Please try again or email contact@zeonai.com.",
      },
      { status: 502 },
    );
  }

  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set(COOLDOWN_COOKIE, await signTimestamp(Date.now()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/demo",
    maxAge: COOLDOWN_SECONDS,
  });
  return response;
}
