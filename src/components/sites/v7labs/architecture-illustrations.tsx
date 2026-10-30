import type { ReactElement, ReactNode } from "react";
import type { ArchitectureLayerKey } from "@/components/sites/zeonai/content";

type Variant = "light" | "dark";

type Palette = {
  ink: string;
  line: string;
  blue: string;
  muted: string;
  surface: string;
  panel: string;
};

const PALETTES: Record<Variant, Palette> = {
  light: {
    ink: "#292929",
    line: "#292929",
    blue: "#0977B3",
    muted: "#9a9a9a",
    surface: "#fff",
    panel: "#f7f7f7",
  },
  dark: {
    ink: "rgba(255,255,255,0.85)",
    line: "rgba(255,255,255,0.35)",
    blue: "#2F5BFF",
    muted: "rgba(255,255,255,0.4)",
    surface: "rgba(255,255,255,0.04)",
    panel: "rgba(255,255,255,0.06)",
  },
};

type IllustProps = { className?: string; variant?: Variant };

function Frame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className ?? "h-auto w-full max-w-[240px]"}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function DataSourcesIllust({ className, variant = "light" }: IllustProps) {
  const { line, blue, muted, surface } = PALETTES[variant];
  return (
    <Frame className={className}>
      <rect x="18" y="22" width="48" height="64" rx="2" fill={surface} stroke={line} strokeWidth="1.2" />
      <line x1="26" y1="36" x2="56" y2="36" stroke={muted} strokeWidth="1" />
      <line x1="26" y1="44" x2="52" y2="44" stroke={muted} strokeWidth="1" />
      <line x1="26" y1="52" x2="48" y2="52" stroke={muted} strokeWidth="1" />
      <rect x="26" y="62" width="28" height="12" rx="1" fill="none" stroke={blue} strokeWidth="1" />
      <rect x="76" y="28" width="56" height="52" rx="2" fill={surface} stroke={line} strokeWidth="1.2" />
      <line x1="76" y1="40" x2="132" y2="40" stroke={line} strokeWidth="1" />
      <line x1="94" y1="28" x2="94" y2="80" stroke={muted} strokeWidth="0.8" />
      <line x1="112" y1="28" x2="112" y2="80" stroke={muted} strokeWidth="0.8" />
      <line x1="76" y1="52" x2="132" y2="52" stroke={muted} strokeWidth="0.8" />
      <line x1="76" y1="64" x2="132" y2="64" stroke={muted} strokeWidth="0.8" />
      <rect x="76" y="28" width="56" height="12" fill={blue} opacity="0.2" />
      <ellipse cx="162" cy="42" rx="22" ry="8" fill="none" stroke={line} strokeWidth="1.2" />
      <path d="M140 42 v28 c0 4.4 9.9 8 22 8 s22-3.6 22-8 V42" fill="none" stroke={line} strokeWidth="1.2" />
      <ellipse cx="162" cy="56" rx="22" ry="8" fill="none" stroke={muted} strokeWidth="0.9" />
    </Frame>
  );
}

function DocumentProcessingIllust({ className, variant = "light" }: IllustProps) {
  const { ink, line, blue, muted, surface, panel } = PALETTES[variant];
  return (
    <Frame className={className}>
      <rect x="36" y="16" width="72" height="88" rx="2" fill={surface} stroke={line} strokeWidth="1.2" />
      <line x1="46" y1="32" x2="96" y2="32" stroke={muted} strokeWidth="1" />
      <line x1="46" y1="42" x2="88" y2="42" stroke={muted} strokeWidth="1" />
      <rect x="46" y="54" width="52" height="14" rx="1.5" fill="none" stroke={blue} strokeWidth="1.2" />
      <text x="52" y="64" style={{ fontSize: 7, fill: blue, fontFamily: "monospace" }}>amount</text>
      <rect x="46" y="74" width="40" height="14" rx="1.5" fill="none" stroke={blue} strokeWidth="1.2" />
      <text x="52" y="84" style={{ fontSize: 7, fill: blue, fontFamily: "monospace" }}>date</text>
      <rect x="120" y="36" width="64" height="56" rx="2" fill={panel} stroke={line} strokeWidth="1" />
      <line x1="128" y1="50" x2="172" y2="50" stroke={ink} strokeWidth="1.2" />
      <line x1="128" y1="62" x2="160" y2="62" stroke={muted} strokeWidth="1" />
      <line x1="128" y1="74" x2="168" y2="74" stroke={muted} strokeWidth="1" />
      <path d="M108 61 H120" stroke={blue} strokeWidth="1.2" />
    </Frame>
  );
}

function RulesEngineIllust({ className, variant = "light" }: IllustProps) {
  const { ink, line, blue, muted, surface } = PALETTES[variant];
  return (
    <Frame className={className}>
      <rect x="24" y="28" width="88" height="36" rx="2" fill={surface} stroke={line} strokeWidth="1.2" />
      <text x="34" y="50" style={{ fontSize: 9, fill: ink, fontFamily: "var(--font-aeonik), sans-serif" }}>
        IF amount &gt; limit
      </text>
      <path d="M68 64 V78" stroke={line} strokeWidth="1.2" />
      <circle cx="68" cy="86" r="8" fill={surface} stroke={blue} strokeWidth="1.4" />
      <path d="M68 94 V102 H40" stroke={line} strokeWidth="1.2" />
      <path d="M68 102 H120" stroke={line} strokeWidth="1.2" />
      <rect x="18" y="96" width="44" height="16" rx="2" fill={surface} stroke={line} strokeWidth="1" />
      <text x="26" y="107" style={{ fontSize: 7, fill: muted, fontFamily: "monospace" }}>escalate</text>
      <rect x="110" y="96" width="44" height="16" rx="2" fill={surface} stroke={blue} strokeWidth="1.2" />
      <text x="118" y="107" style={{ fontSize: 7, fill: blue, fontFamily: "monospace" }}>approve</text>
    </Frame>
  );
}

function WorkflowsIllust({ className, variant = "light" }: IllustProps) {
  const { ink, line, blue, surface } = PALETTES[variant];
  return (
    <Frame className={className}>
      {[
        { x: 20, label: "Intake" },
        { x: 78, label: "Review" },
        { x: 136, label: "Approve" },
      ].map((step, i) => (
        <g key={step.label}>
          <rect
            x={step.x}
            y="44"
            width="44"
            height="28"
            rx="2"
            fill={i === 2 ? blue : surface}
            stroke={i === 2 ? blue : line}
            strokeWidth="1.2"
          />
          <text
            x={step.x + 22}
            y="62"
            textAnchor="middle"
            style={{
              fontSize: 8,
              fill: i === 2 ? "#fff" : ink,
              fontFamily: "var(--font-aeonik), sans-serif",
            }}
          >
            {step.label}
          </text>
          {i < 2 && (
            <path d={`M${step.x + 44} 58 H${step.x + 58}`} stroke={line} strokeWidth="1.2" />
          )}
        </g>
      ))}
      <circle cx="158" cy="36" r="7" fill={surface} stroke={blue} strokeWidth="1.3" />
      <path d="M155 36 l2.5 2.5 4-5" fill="none" stroke={blue} strokeWidth="1.3" />
    </Frame>
  );
}

function AccessAuditIllust({ className, variant = "light" }: IllustProps) {
  const { ink, line, blue, muted, surface, panel } = PALETTES[variant];
  return (
    <Frame className={className}>
      <rect x="24" y="24" width="72" height="72" rx="2" fill={surface} stroke={line} strokeWidth="1.2" />
      <circle cx="48" cy="48" r="10" fill="none" stroke={blue} strokeWidth="1.3" />
      <path d="M48 42 v6 h5" fill="none" stroke={blue} strokeWidth="1.3" />
      <text x="64" y="52" style={{ fontSize: 8, fill: ink, fontFamily: "var(--font-aeonik), sans-serif" }}>
        Role
      </text>
      <rect x="36" y="68" width="48" height="8" rx="1" fill={blue} opacity="0.25" />
      <rect x="36" y="80" width="32" height="8" rx="1" fill={muted} opacity="0.35" />
      <rect x="110" y="30" width="70" height="64" rx="2" fill={panel} stroke={line} strokeWidth="1" />
      <text x="118" y="46" style={{ fontSize: 7, fill: muted, fontFamily: "monospace" }}>14:02 view</text>
      <text x="118" y="60" style={{ fontSize: 7, fill: ink, fontFamily: "monospace" }}>14:05 edit</text>
      <text x="118" y="74" style={{ fontSize: 7, fill: muted, fontFamily: "monospace" }}>14:11 export</text>
    </Frame>
  );
}

function OutputsIllust({ className, variant = "light" }: IllustProps) {
  const { ink, line, blue, muted, surface } = PALETTES[variant];
  return (
    <Frame className={className}>
      <rect x="20" y="30" width="70" height="60" rx="2" fill={surface} stroke={line} strokeWidth="1.2" />
      <rect x="28" y="40" width="28" height="8" rx="1" fill={blue} opacity="0.3" />
      <rect x="28" y="54" width="54" height="4" rx="1" fill={muted} opacity="0.45" />
      <rect x="28" y="64" width="40" height="4" rx="1" fill={muted} opacity="0.45" />
      <rect x="28" y="74" width="48" height="4" rx="1" fill={muted} opacity="0.45" />
      <path d="M90 60 H112" stroke={blue} strokeWidth="1.4" />
      <polygon points="112,56 120,60 112,64" fill={blue} />
      <rect x="124" y="36" width="56" height="48" rx="2" fill={surface} stroke={line} strokeWidth="1.2" />
      <text x="152" y="58" textAnchor="middle" style={{ fontSize: 10, fill: ink, fontFamily: "var(--font-aeonik), sans-serif" }}>
        ERP
      </text>
      <text x="152" y="72" textAnchor="middle" style={{ fontSize: 7, fill: muted, fontFamily: "monospace" }}>
        connector
      </text>
    </Frame>
  );
}

const ILLUSTRATIONS: Record<
  ArchitectureLayerKey,
  (props: IllustProps) => ReactElement
> = {
  "data-sources": DataSourcesIllust,
  "document-processing": DocumentProcessingIllust,
  "rules-engine": RulesEngineIllust,
  "workflows-approvals": WorkflowsIllust,
  "access-audit": AccessAuditIllust,
  "outputs-integrations": OutputsIllust,
};

export function ArchitectureIllustration({
  layerKey,
  className,
  variant = "light",
}: {
  layerKey: ArchitectureLayerKey;
  className?: string;
  variant?: Variant;
}) {
  const Comp = ILLUSTRATIONS[layerKey];
  return <Comp className={className} variant={variant} />;
}

export function parseDetailPair(detail: string): { label: string; body: string } | null {
  const idx = detail.indexOf(": ");
  if (idx <= 0) return null;
  return {
    label: detail.slice(0, idx),
    body: detail.slice(idx + 2),
  };
}
