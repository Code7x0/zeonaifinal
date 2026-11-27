export const DEMO_RECIPIENT_EMAIL = "contact@zeonai.com";

export const ALLOWED_INTERESTS = [
  "AI Workspace",
  "Agent Hub",
  "Both",
] as const;

export type DemoSource = "homepage-demo" | "demo-page";

export interface DemoSubmissionInput {
  name: string;
  email: string;
  company: string;
  role: string;
  interest: string;
  message: string;
  website: string;
  source: DemoSource;
}

export type ValidationResult =
  | { ok: true; data: DemoSubmissionInput; isSpam: boolean }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function cleanString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function validateDemoSubmission(payload: unknown): ValidationResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, error: "Invalid request payload." };
  }

  const raw = payload as Record<string, unknown>;
  const website = cleanString(raw.website, 200);
  const source: DemoSource =
    raw.source === "demo-page" ? "demo-page" : "homepage-demo";

  // Honeypot triggered — treat as spam silently so bots get no signal.
  if (website.length > 0) {
    return {
      ok: true,
      isSpam: true,
      data: {
        name: "",
        email: "",
        company: "",
        role: "",
        interest: "",
        message: "",
        website,
        source,
      },
    };
  }

  const name = cleanString(raw.name, 120);
  const email = cleanString(raw.email, 254);
  const company = cleanString(raw.company, 160);
  const role = cleanString(raw.role, 120);
  const interest = cleanString(raw.interest, 60);
  const message = cleanString(raw.message ?? raw.process, 4000);

  if (!name) {
    return { ok: false, error: "Please enter your full name." };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid work email address." };
  }
  if (!company) {
    return { ok: false, error: "Please enter your company name." };
  }
  if (
    !interest ||
    !(ALLOWED_INTERESTS as readonly string[]).includes(interest)
  ) {
    return { ok: false, error: "Please select what you are interested in." };
  }
  if (source === "demo-page" && !message) {
    return { ok: false, error: "Please describe the process you want to discuss." };
  }

  return {
    ok: true,
    isSpam: false,
    data: {
      name,
      email,
      company,
      role,
      interest,
      message,
      website: "",
      source,
    },
  };
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatDemoEmail(data: DemoSubmissionInput): {
  subject: string;
  text: string;
  html: string;
} {
  const safeName = data.name.replace(/[\r\n]+/g, " ");
  const safeCompany = data.company.replace(/[\r\n]+/g, " ");
  const subject = `New ZeonAI Demo Request — ${safeCompany} (${safeName})`;
  const sourceLabel =
    data.source === "demo-page" ? "/demo page" : "Homepage Book a Demo";

  const rows: Array<[string, string]> = [
    ["Full name", data.name],
    ["Work email", data.email],
    ["Company", data.company],
    ["Role", data.role || "Not specified"],
    ["Interested in", data.interest],
    ["Form source", sourceLabel],
    ["Workflow / Message", data.message || "Not provided"],
  ];

  const text = [
    "New ZeonAI Book a Demo Request",
    "================================",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Submitted at: ${new Date().toISOString()}`,
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #E5E7EB;font-weight:600;color:#181D27;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #E5E7EB;color:#344054;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html>
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#F8FAFC;padding:24px;color:#181D27;">
    <div style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;">
      <div style="padding:20px 24px;border-bottom:1px solid #E5E7EB;background:#0F172A;color:#FFFFFF;">
        <h1 style="margin:0;font-size:18px;font-weight:600;">New ZeonAI Demo Request</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5;">
        <tbody>${htmlRows}</tbody>
      </table>
      <div style="padding:12px 24px;font-size:12px;color:#717680;background:#F8FAFC;">
        Reply directly to this email to respond to ${escapeHtml(data.name)} (${escapeHtml(data.email)}).
      </div>
    </div>
  </body>
</html>`;

  return { subject, text, html };
}
