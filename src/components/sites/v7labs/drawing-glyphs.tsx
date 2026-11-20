"use client";

import { cn } from "@/lib/utils";

/** Small blueprint glyphs for modules / sectors — lines only, no icons-as-emoji. */

type GlyphProps = { className?: string; tone?: "light" | "dark" };

function stroke(tone: "light" | "dark") {
  return tone === "dark" ? "rgba(142,184,255,0.85)" : "var(--zeon-royal)";
}
function mute(tone: "light" | "dark") {
  return tone === "dark" ? "rgba(255,255,255,0.22)" : "#C8CDD5";
}
function fill(tone: "light" | "dark") {
  return tone === "dark"
    ? "rgba(89,145,255,0.12)"
    : "color-mix(in srgb, var(--zeon-sky) 80%, white)";
}

export function ModuleGlyph({
  id,
  className,
  tone = "light",
}: GlyphProps & { id: string }) {
  const s = stroke(tone);
  const m = mute(tone);
  const f = fill(tone);

  const common = {
    className: cn("h-14 w-full", className),
    viewBox: "0 0 160 56",
    fill: "none",
    "aria-hidden": true as const,
  };

  switch (id) {
    case "ask-ai":
      return (
        <svg {...common}>
          <rect x="8" y="10" width="96" height="36" rx="2" stroke={m} />
          <path d="M20 22h72M20 30h54M20 38h40" stroke={s} strokeWidth="1.2" />
          <circle cx="132" cy="28" r="14" stroke={s} fill={f} />
          <path d="M126 28h12M132 22v12" stroke={s} strokeWidth="1.2" />
        </svg>
      );
    case "ai-drive":
      return (
        <svg {...common}>
          <rect x="18" y="8" width="52" height="40" rx="2" stroke={m} fill={f} />
          <path d="M28 18h32M28 26h24M28 34h28" stroke={s} strokeWidth="1.2" />
          <rect x="86" y="12" width="52" height="32" rx="2" stroke={s} />
          <path d="M70 28h16" stroke={s} strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="112" cy="28" r="3" fill={s} />
        </svg>
      );
    case "workflows":
      return (
        <svg {...common}>
          <circle cx="24" cy="28" r="8" stroke={s} fill={f} />
          <circle cx="80" cy="28" r="8" stroke={s} />
          <circle cx="136" cy="28" r="8" stroke={m} />
          <path d="M32 28h40M88 28h40" stroke={s} strokeWidth="1.2" />
          <path d="M124 28l6-4v8l-6-4z" fill={s} />
        </svg>
      );
    case "dashboards":
      return (
        <svg {...common}>
          <rect x="12" y="8" width="136" height="40" rx="2" stroke={m} />
          <rect x="22" y="28" width="18" height="12" fill={s} opacity="0.85" />
          <rect x="48" y="20" width="18" height="20" fill={s} opacity="0.55" />
          <rect x="74" y="16" width="18" height="24" fill={s} />
          <path d="M108 36l14-14 12 8 14-16" stroke={s} strokeWidth="1.4" />
        </svg>
      );
    case "contracts":
      return (
        <svg {...common}>
          <rect x="36" y="6" width="88" height="44" rx="2" stroke={m} fill={f} />
          <path d="M48 18h64M48 26h52M48 34h44M48 42h36" stroke={s} strokeWidth="1.15" />
          <rect x="100" y="32" width="28" height="10" stroke={s} />
        </svg>
      );
    case "opportunity":
      return (
        <svg {...common}>
          <path
            d="M20 40 L52 40 L70 18 L100 18 L118 40 L140 40"
            stroke={s}
            strokeWidth="1.4"
            fill="none"
          />
          <circle cx="70" cy="18" r="4" fill={s} />
          <circle cx="100" cy="18" r="4" stroke={s} fill={f} />
          <path d="M20 44h120" stroke={m} />
        </svg>
      );
    case "quotes":
      return (
        <svg {...common}>
          <rect x="28" y="8" width="104" height="40" rx="2" stroke={m} />
          <path d="M40 20h80M40 28h64M40 36h48" stroke={s} strokeWidth="1.2" />
          <rect x="96" y="32" width="24" height="8" fill={s} opacity="0.7" />
        </svg>
      );
    case "app-hub":
      return (
        <svg {...common}>
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={28 + col * 36}
                y={8 + row * 16}
                width="28"
                height="12"
                rx="1"
                stroke={row === 1 && col === 1 ? s : m}
                fill={row === 1 && col === 1 ? f : "none"}
              />
            )),
          )}
        </svg>
      );
    case "agent-hub":
      return (
        <svg {...common}>
          <circle cx="80" cy="28" r="16" stroke={s} fill={f} />
          <circle cx="32" cy="28" r="8" stroke={m} />
          <circle cx="128" cy="28" r="8" stroke={m} />
          <path d="M40 28h24M96 28h24" stroke={s} strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="80" cy="28" r="3" fill={s} />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="20" y="12" width="120" height="32" rx="2" stroke={m} />
          <path d="M36 28h88" stroke={s} strokeWidth="1.2" />
        </svg>
      );
  }
}

export function ProductGlyph({
  id,
  className,
  tone = "light",
}: GlyphProps & { id: string }) {
  const s = stroke(tone);
  const m = mute(tone);
  const f = fill(tone);
  const common = {
    className: cn("h-16 w-full", className),
    viewBox: "0 0 200 64",
    fill: "none",
    "aria-hidden": true as const,
  };

  switch (id) {
    case "invoiceai":
      return (
        <svg {...common}>
          <rect x="16" y="10" width="70" height="44" rx="2" stroke={m} fill={f} />
          <path d="M28 22h46M28 30h38M28 38h42" stroke={s} strokeWidth="1.2" />
          <path d="M100 32h28" stroke={s} strokeWidth="1.3" markerEnd="url(#arrow)" />
          <rect x="140" y="14" width="44" height="36" rx="2" stroke={s} />
          <path d="M150 26h24M150 34h18M150 42h20" stroke={s} strokeWidth="1.1" />
        </svg>
      );
    case "cashfloai":
      return (
        <svg {...common}>
          <path d="M20 48h160" stroke={m} />
          <path
            d="M24 40 L48 28 L72 36 L96 16 L120 30 L144 12 L168 22 L184 18"
            stroke={s}
            strokeWidth="1.5"
          />
          <circle cx="96" cy="16" r="3.5" fill={s} />
        </svg>
      );
    case "docai":
      return (
        <svg {...common}>
          <rect x="40" y="8" width="56" height="48" rx="2" stroke={m} fill={f} />
          <path d="M52 20h32M52 28h28M52 36h30M52 44h20" stroke={s} strokeWidth="1.15" />
          <rect x="112" y="16" width="48" height="32" rx="2" stroke={s} />
          <path d="M96 32h16" stroke={s} strokeDasharray="3 2" />
        </svg>
      );
    case "ai-workspace":
      return (
        <svg {...common}>
          <rect x="24" y="10" width="152" height="44" rx="2" stroke={m} />
          <circle cx="52" cy="32" r="10" stroke={s} fill={f} />
          <path d="M70 32h90M70 24h60M70 40h72" stroke={s} strokeWidth="1.15" />
        </svg>
      );
    default:
      return <ModuleGlyph id={id} className={className} tone={tone} />;
  }
}

export function SectorGlyph({
  id,
  className,
  tone = "light",
}: GlyphProps & { id: string }) {
  const s = stroke(tone);
  const m = mute(tone);
  const f = fill(tone);
  const common = {
    className: cn("h-12 w-full max-w-[140px]", className),
    viewBox: "0 0 140 48",
    fill: "none",
    "aria-hidden": true as const,
  };

  // Distinct enough shapes per sector family
  if (id.includes("financ") || id === "financial" || id === "super") {
    return (
      <svg {...common}>
        <rect x="10" y="8" width="36" height="32" rx="1.5" stroke={m} fill={f} />
        <path d="M18 16h20M18 22h16M18 28h18" stroke={s} strokeWidth="1.1" />
        <path d="M58 36 L78 14 L98 28 L120 10" stroke={s} strokeWidth="1.4" />
        <circle cx="120" cy="10" r="3" fill={s} />
      </svg>
    );
  }
  if (id === "media" || id === "telco") {
    return (
      <svg {...common}>
        <circle cx="40" cy="24" r="14" stroke={s} fill={f} />
        <circle cx="40" cy="24" r="6" stroke={m} />
        <path d="M58 24h62" stroke={s} strokeWidth="1.2" strokeDasharray="4 3" />
        <circle cx="128" cy="24" r="4" fill={s} />
      </svg>
    );
  }
  if (id === "government" || id === "defense") {
    return (
      <svg {...common}>
        <path d="M20 36 V16 L70 8 L120 16 V36" stroke={s} strokeWidth="1.3" fill={f} />
        <path d="M40 36v-12M70 36V14M100 36v-12" stroke={m} />
      </svg>
    );
  }
  if (id === "manufacturing" || id === "construction") {
    return (
      <svg {...common}>
        <rect x="16" y="20" width="28" height="20" stroke={m} fill={f} />
        <rect x="52" y="12" width="28" height="28" stroke={s} />
        <rect x="88" y="16" width="28" height="24" stroke={m} />
        <path d="M16 40h100" stroke={s} strokeWidth="1.2" />
      </svg>
    );
  }
  // medtech / default
  return (
    <svg {...common}>
      <circle cx="70" cy="24" r="16" stroke={s} fill={f} />
      <path d="M70 12v24M58 24h24" stroke={s} strokeWidth="1.4" />
      <path d="M20 24h28M92 24h28" stroke={m} />
    </svg>
  );
}
