"use client";

import type { ReactNode } from "react";
import { Pause, Play } from "lucide-react";

export type PlatformScreenId =
  | "ask-ai"
  | "ai-drive"
  | "workflows"
  | "dashboards"
  | "contracts"
  | "agent-hub";

export const PLATFORM_SCREEN_TITLES: Record<PlatformScreenId, string> = {
  "ask-ai": "ZeonAI · Ask AI",
  "ai-drive": "ZeonAI · AI Drive",
  workflows: "ZeonAI · Workflows · CAPEX-2291",
  dashboards: "ZeonAI · AI Dashboards · Operational Overview",
  contracts: "ZeonAI · Contract Intelligence",
  "agent-hub": "ZeonAI · Agent Hub",
};

const BLUE = "#356DFF";

export type ScreenProps = {
  className?: string;
  /** 0–100 tour progress for this scene when active */
  progress?: number;
  active?: boolean;
  reduceMotion?: boolean;
};

/** Persistent application window — outer chrome stays mounted across product switches. */
export function AppShell({
  title,
  moduleLabel,
  playing,
  onTogglePlay,
  showPlayControl,
  children,
  className = "",
}: {
  title: string;
  moduleLabel?: string;
  playing?: boolean;
  onTogglePlay?: () => void;
  showPlayControl?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full flex-col overflow-hidden rounded-[6px] border border-[#272C33] bg-[#08090B] shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-[#272C33] bg-[#0D0F12] px-3.5">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span
            className="size-1.5 shrink-0 rounded-full"
            style={{ background: BLUE }}
            aria-hidden
          />
          <p className="truncate font-mono text-[11px] tracking-[-0.01em] text-[#F2F4F7]">
            {title}
          </p>
          {moduleLabel ? (
            <span className="hidden shrink-0 rounded-[3px] border border-[#272C33] bg-[#151920] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[#6F7885] sm:inline">
              {moduleLabel}
            </span>
          ) : null}
        </div>
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-[#6F7885] md:inline">
          Finance manager · demo
        </span>
        {showPlayControl && onTogglePlay ? (
          <button
            type="button"
            onClick={onTogglePlay}
            className="flex size-7 shrink-0 items-center justify-center rounded-[3px] border border-[#272C33] text-[#9BA3AE] outline-none transition-colors hover:border-[#356DFF]/40 hover:text-[#F2F4F7] focus-visible:ring-2 focus-visible:ring-[#356DFF]/50"
            aria-label={playing ? "Pause product tour" : "Play product tour"}
            aria-pressed={playing}
          >
            {playing ? (
              <Pause className="size-3" aria-hidden />
            ) : (
              <Play className="size-3" aria-hidden />
            )}
          </button>
        ) : (
          <span className="rounded-[3px] border border-[#272C33] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.08em] text-[#6F7885]">
            Demo
          </span>
        )}
      </div>
      <div className="relative h-[min(62vh,520px)] shrink-0 overflow-hidden bg-[#08090B] sm:h-[min(64vh,560px)] md:h-[min(66vh,600px)] lg:h-[620px]">
        {children}
      </div>
    </div>
  );
}

function ShellLayout({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0">
      <aside className="hidden w-[168px] shrink-0 flex-col border-r border-[#272C33] bg-[#0D0F12] p-2.5 md:flex lg:w-[180px]">
        {sidebar}
      </aside>
      <div className="min-w-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function NavItem({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-[3px] px-2 py-1.5 text-[11px] ${
        active
          ? "bg-[#111D35] text-[#F2F4F7]"
          : "text-[#6F7885]"
      }`}
      style={active ? { boxShadow: `inset 0 0 0 1px ${BLUE}` } : undefined}
    >
      {label}
    </div>
  );
}

function revealed(progress: number, reduceMotion: boolean, at: number) {
  if (reduceMotion) return true;
  return progress >= at;
}

export function AskAiScreen({
  className = "",
  progress = 100,
  reduceMotion = false,
}: ScreenProps) {
  const showQ = revealed(progress, reduceMotion, 8);
  const showA = revealed(progress, reduceMotion, 28);
  const showCite = revealed(progress, reduceMotion, 52);

  return (
    <ShellLayout
      sidebar={
        <>
          <p className="mb-2 px-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7885]">
            Workspace
          </p>
          <div className="space-y-0.5">
            <NavItem label="Ask AI" active />
            <NavItem label="AI Drive" />
            <NavItem label="Workflows" />
            <NavItem label="Recent" />
          </div>
          <p className="mt-auto px-2 pt-4 font-mono text-[9px] text-[#6F7885]">
            Role-checked retrieval
          </p>
        </>
      }
    >
      <div className={`flex h-full flex-col ${className}`}>
        <div className="flex items-center justify-between border-b border-[#272C33] bg-[#111419] px-4 py-2.5">
          <div>
            <p className="text-[13px] font-medium text-[#F2F4F7]">Ask AI</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6F7885]">
              Finance manager · cited answers
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#9BA3AE]"
          >
            <span
              className="size-1.5 rounded-full"
              style={{ background: BLUE }}
              aria-hidden
            />
            Live demo
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-hidden px-4 py-4 md:px-5">
          <div
            className={`transition-all duration-300 ease-out ${
              showQ ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7885]">
              You
            </p>
            <div className="mt-1.5 ml-auto max-w-[92%] rounded-[5px] border border-[#272C33] bg-[#151920] px-3.5 py-2.5 md:max-w-[75%]">
              <p className="text-[13px] leading-snug text-[#F2F4F7] md:text-[14px]">
                What approval do I need for capital spend above budget?
              </p>
            </div>
          </div>

          <div
            className={`max-w-[96%] space-y-2 transition-all duration-300 ease-out md:max-w-[85%] ${
              showA ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7885]">
              ZeonAI
            </p>
            <p className="text-[13px] leading-[1.55] text-[#F2F4F7] md:text-[14px]">
              Spend above the approved budget needs CFO sign-off past the
              delegated limit.
            </p>
            <p className="text-[13px] leading-[1.55] text-[#9BA3AE] md:text-[14px]">
              Raise a variation in Workflows and attach the revised business
              case.
            </p>
          </div>

          <div
            className={`space-y-1.5 transition-all duration-300 ease-out ${
              showCite ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6F7885]">
              Cited sources
            </p>
            <div className="inline-flex flex-col gap-1.5">
              <div className="rounded-[4px] border border-[#272C33] bg-[#151920] px-2.5 py-1.5 font-mono text-[11px] text-[#9BA3AE]">
                <span style={{ color: BLUE }}>[1]</span> Capital expenditure
                policy v4.pdf · §4.2
              </div>
              <div className="rounded-[4px] border border-[#272C33] bg-[#151920] px-2.5 py-1.5 font-mono text-[11px] text-[#9BA3AE]">
                <span style={{ color: BLUE }}>[2]</span> Delegation of
                authority.docx · v12
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#272C33] bg-[#111419] px-4 py-2.5">
          <div className="flex items-center gap-2 rounded-[4px] border border-[#272C33] bg-[#151920] px-3 py-2">
            <span className="min-w-0 flex-1 text-[12px] text-[#6F7885]">
              Ask about your organisation…
            </span>
            <span
              className="flex size-6 items-center justify-center rounded-[3px] text-white"
              style={{ background: BLUE }}
              aria-hidden
            >
              ↑
            </span>
          </div>
        </div>
      </div>
    </ShellLayout>
  );
}

export function AiDriveScreen({
  className = "",
  progress = 100,
  reduceMotion = false,
}: ScreenProps) {
  const selected = revealed(progress, reduceMotion, 35);
  const files = [
    ["Capital_policy_v4.pdf", "PDF", "Finance", "2d ago", "Indexed"],
    ["Delegation_matrix.xlsx", "XLS", "Finance", "5d ago", "Indexed"],
    ["Contoso_MSA_v4.pdf", "PDF", "Legal", "Today", "Review"],
    ["Invoice_pack_Q3.zip", "ZIP", "AP", "1w ago", "Indexed"],
    ["Board_pack_Oct.pdf", "PDF", "Exec", "3d ago", "Indexed"],
    ["Capex_variation.docx", "DOC", "Finance", "Today", "Draft"],
  ] as const;

  return (
    <ShellLayout
      sidebar={
        <>
          <p className="mb-2 px-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7885]">
            Libraries
          </p>
          <div className="space-y-0.5">
            <NavItem label="All documents" />
            <NavItem label="Finance" active />
            <NavItem label="Legal" />
            <NavItem label="Shared packs" />
          </div>
        </>
      }
    >
      <div className={`flex h-full min-h-0 flex-col ${className}`}>
        <div className="flex flex-wrap items-center gap-2 border-b border-[#272C33] bg-[#111419] px-4 py-2.5">
          <div className="min-w-0 flex-1 rounded-[4px] border border-[#272C33] bg-[#151920] px-2.5 py-1.5 text-[12px] text-[#6F7885]">
            Search governed documents…
          </div>
          <span className="rounded-[3px] border border-[#272C33] px-2 py-1 font-mono text-[10px] text-[#9BA3AE]">
            Finance
          </span>
          <span className="hidden rounded-[3px] border border-[#272C33] px-2 py-1 font-mono text-[10px] text-[#9BA3AE] sm:inline">
            Indexed
          </span>
        </div>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-h-0 overflow-auto border-b border-[#272C33] lg:border-b-0 lg:border-r">
            <div className="grid grid-cols-[1.4fr_0.4fr_0.55fr_0.5fr] gap-2 border-b border-[#272C33] bg-[#0D0F12] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[#6F7885]">
              <span>Name</span>
              <span>Type</span>
              <span className="hidden sm:inline">Owner</span>
              <span>Status</span>
            </div>
            {files.map(([name, type, owner, , status], i) => {
              const isSel = selected && i === 0;
              return (
                <div
                  key={name}
                  className={`grid grid-cols-[1.4fr_0.4fr_0.55fr_0.5fr] gap-2 border-b border-[#272C33]/60 px-3 py-2.5 text-[12px] transition-colors ${
                    isSel ? "bg-[#111D35]" : "bg-transparent"
                  }`}
                  style={
                    isSel ? { boxShadow: `inset 2px 0 0 ${BLUE}` } : undefined
                  }
                >
                  <span className="truncate text-[#F2F4F7]">{name}</span>
                  <span className="text-[#6F7885]">{type}</span>
                  <span className="hidden text-[#6F7885] sm:inline">{owner}</span>
                  <span
                    className={
                      status === "Review" || status === "Draft"
                        ? "text-amber-300/90"
                        : "text-[#9BA3AE]"
                    }
                  >
                    {status}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className={`hidden min-h-0 flex-col overflow-auto bg-[#111419] p-4 transition-opacity duration-300 lg:flex ${
              selected ? "opacity-100" : "opacity-40"
            }`}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6F7885]">
              Preview
            </p>
            <p className="mt-2 text-[13px] font-medium text-[#F2F4F7]">
              Capital expenditure policy v4.pdf
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-[#9BA3AE]">
              §4.2 Delegated authority. Spend above the approved budget needs
              CFO sign-off past the delegated limit…
            </p>
            <div className="mt-4 rounded-[4px] border border-[#272C33] bg-[#151920] px-2.5 py-2 font-mono text-[10px] text-[#9BA3AE]">
              Access · Finance · Indexed · Lineage on
            </div>
          </div>
        </div>
      </div>
    </ShellLayout>
  );
}

export function WorkflowsScreen({
  className = "",
  progress = 100,
  reduceMotion = false,
}: ScreenProps) {
  const advanced = revealed(progress, reduceMotion, 40);
  const stages = [
    ["Request", "Done", "Finance"],
    ["Justification", "Done", "Finance"],
    ["Finance review", advanced ? "Done" : "Running", "Controller"],
    ["CFO approval", advanced ? "Running" : "Waiting", "CFO"],
    ["Complete", "Queued", "System"],
  ] as const;

  return (
    <ShellLayout
      sidebar={
        <>
          <p className="mb-2 px-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7885]">
            Queues
          </p>
          <div className="space-y-0.5">
            <NavItem label="In progress" active />
            <NavItem label="Waiting" />
            <NavItem label="Completed" />
          </div>
        </>
      }
    >
      <div className={`flex h-full flex-col ${className}`}>
        <div className="flex items-center justify-between border-b border-[#272C33] bg-[#111419] px-4 py-2.5">
          <div>
            <p className="text-[13px] font-medium text-[#F2F4F7]">
              Capital expenditure request
            </p>
            <p className="font-mono text-[10px] text-[#6F7885]">
              CAPEX-2291 · $186,400 · Contoso plant upgrade
            </p>
          </div>
          <span
            className="rounded-[3px] px-2 py-1 font-mono text-[10px] text-white"
            style={{ background: `${BLUE}33`, color: "#A8C0FF" }}
          >
            {advanced ? "CFO review" : "Finance review"}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-auto p-4 md:p-5">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {stages.map(([name, status, owner]) => (
              <div
                key={name}
                className="rounded-[4px] border border-[#272C33] bg-[#151920] px-2.5 py-2.5 transition-colors"
                style={
                  status === "Running"
                    ? { borderColor: BLUE, background: "#111D35" }
                    : undefined
                }
              >
                <p className="text-[11px] font-medium text-[#F2F4F7]">{name}</p>
                <p
                  className={`mt-1 font-mono text-[10px] ${
                    status === "Done"
                      ? "text-[#6F7885]"
                      : status === "Running"
                        ? "text-[#A8C0FF]"
                        : "text-[#6F7885]"
                  }`}
                >
                  {status}
                </p>
                <p className="mt-0.5 truncate text-[10px] text-[#6F7885]">
                  {owner}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[4px] border border-[#272C33] bg-[#111419] px-3.5 py-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6F7885]">
              Activity
            </p>
            <ul className="mt-2 space-y-2 text-[12px]">
              <li className="flex gap-3">
                <span className="w-10 shrink-0 font-mono tabular-nums text-[#6F7885]">
                  10:44
                </span>
                <span className="text-[#9BA3AE]">
                  {advanced
                    ? "Finance review cleared · routed to CFO approval"
                    : "Business case attached · waiting on finance review"}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="w-10 shrink-0 font-mono tabular-nums text-[#6F7885]">
                  10:41
                </span>
                <span className="text-[#9BA3AE]">
                  Variation raised from Ask AI citation pack
                </span>
              </li>
              <li className="flex gap-3">
                <span className="w-10 shrink-0 font-mono tabular-nums text-[#6F7885]">
                  10:38
                </span>
                <span className="text-[#9BA3AE]">
                  Request opened · delegated limit exceeded
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ShellLayout>
  );
}

export function DashboardsScreen({
  className = "",
  progress = 100,
  reduceMotion = false,
}: ScreenProps) {
  const bars = [42, 58, 51, 72, 66, 48, 61, 78, 70, 55, 64, 81];
  const draw = reduceMotion ? 1 : Math.min(1, Math.max(0, (progress - 10) / 50));

  return (
    <ShellLayout
      sidebar={
        <>
          <p className="mb-2 px-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7885]">
            Views
          </p>
          <div className="space-y-0.5">
            <NavItem label="Operations" active />
            <NavItem label="Finance" />
            <NavItem label="Exceptions" />
          </div>
        </>
      }
    >
      <div className={`flex h-full flex-col overflow-auto p-4 md:p-5 ${className}`}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-[13px] font-medium text-[#F2F4F7]">
            Operational overview
          </p>
          <span className="font-mono text-[10px] text-[#6F7885]">
            Last 30 days · sample
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {[
            ["Processed docs", "12,486", "+8.2%"],
            ["Completion", "94.8%", "+1.4 pts"],
            ["Avg time", "2.4 min", "−18s"],
            ["Pending", "128", "42 due"],
          ].map(([label, value, hint]) => (
            <div
              key={label}
              className="rounded-[4px] border border-[#272C33] bg-[#151920] px-3 py-2.5"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#6F7885]">
                {label}
              </p>
              <p className="mt-1 text-[18px] font-medium tracking-[-0.03em] text-[#F2F4F7] tabular-nums">
                {value}
              </p>
              <p className="mt-0.5 text-[11px] text-[#9BA3AE]">{hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[4px] border border-[#272C33] bg-[#111419] p-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[12px] font-medium text-[#F2F4F7]">
                Workflow volume
              </p>
              <p className="font-mono text-[10px] text-[#6F7885]">Throughput</p>
            </div>
            <div className="flex h-[120px] items-end gap-1.5 md:h-[140px]">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-[2px] transition-[height] duration-500 ease-out"
                  style={{
                    height: `${h * draw}%`,
                    background: BLUE,
                    opacity: 0.75 + (i % 3) * 0.08,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[4px] border border-[#272C33] bg-[#111419] p-3">
            <p className="mb-3 text-[12px] font-medium text-[#F2F4F7]">
              Performance
            </p>
            <ul className="space-y-3">
              {[
                ["Auto-posted", "86%", 86],
                ["Human review", "11%", 11],
                ["Exceptions", "3%", 3],
              ].map(([label, value, pct]) => (
                <li key={label as string}>
                  <div className="mb-1 flex justify-between text-[12px]">
                    <span className="text-[#9BA3AE]">{label}</span>
                    <span className="font-medium tabular-nums text-[#F2F4F7]">
                      {value}
                    </span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-[#272C33]">
                    <div
                      className="h-full rounded-full transition-[width] duration-500 ease-out"
                      style={{
                        width: `${(pct as number) * draw}%`,
                        background: BLUE,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ShellLayout>
  );
}

export function ContractsScreen({
  className = "",
  progress = 100,
  reduceMotion = false,
}: ScreenProps) {
  const highlight = revealed(progress, reduceMotion, 30);
  const contracts = [
    ["Contoso_MSA_v4.pdf", "Active", "Renewal 90d"],
    ["Apex_SOW_2026.pdf", "Review", "Term 24m"],
    ["NSW_Health_tender.pdf", "Draft", "Due Fri"],
  ] as const;

  return (
    <ShellLayout
      sidebar={
        <>
          <p className="mb-2 px-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7885]">
            Contracts
          </p>
          <div className="space-y-0.5">
            {contracts.map(([name], i) => (
              <NavItem key={name} label={name.split("_")[0]!} active={i === 0} />
            ))}
          </div>
        </>
      }
    >
      <div className={`grid h-full min-h-0 lg:grid-cols-[1.1fr_0.9fr] ${className}`}>
        <div className="min-h-0 overflow-auto border-b border-[#272C33] p-4 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6F7885]">
            Contoso_MSA_v4.pdf · page 7
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-[#9BA3AE]">
            Aggregate liability shall not exceed fees paid in the twelve months
            preceding the claim…
          </p>
          <p
            className={`mt-3 rounded-[4px] border px-3 py-2.5 text-[13px] leading-relaxed transition-colors duration-300 ${
              highlight
                ? "border-[#356DFF]/50 bg-[#111D35] text-[#F2F4F7]"
                : "border-[#272C33] bg-[#151920] text-[#9BA3AE]"
            }`}
          >
            Neither party shall be liable for indirect or consequential damages,
            including lost profits.
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-[#6F7885]">
            Governing law of New South Wales. Disputes escalate to mediation
            before arbitration…
          </p>
        </div>
        <div className="space-y-2 overflow-auto bg-[#111419] p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6F7885]">
            Extracted terms
          </p>
          {[
            ["Term", "36 months"],
            ["Renewal", "Auto · 90-day notice"],
            ["Liability cap", "12 months fees"],
            ["Residency", "AU / CA"],
            ["Status", "Needs legal review"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between rounded-[4px] border border-[#272C33] bg-[#151920] px-3 py-2 text-[12px]"
            >
              <span className="text-[#6F7885]">{k}</span>
              <span className="font-medium text-[#F2F4F7]">{v}</span>
            </div>
          ))}
          <div className="rounded-[4px] border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-[11px] text-amber-100/90">
            Flag · carve-out broader than playbook
          </div>
        </div>
      </div>
    </ShellLayout>
  );
}

export function AgentHubScreen({
  className = "",
  progress = 100,
  reduceMotion = false,
}: ScreenProps) {
  const detail = revealed(progress, reduceMotion, 25);
  const agents = [
    ["Invoice 3-way match", "Match PO, receipt, invoice", "Verified", false],
    ["Bank-ERP reconciliation", "Daily statement match", "Verified", false],
    ["KYC intelligence", "ID + sanctions pack", "Review", true],
    ["Contract analysis", "Clause extract + risk", "Verified", false],
    ["Loan origination", "Application intake", "Review", true],
    ["Knowledge discovery", "Policy Q&A", "Verified", false],
  ] as const;

  return (
    <ShellLayout
      sidebar={
        <>
          <p className="mb-2 px-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#6F7885]">
            Packs
          </p>
          <div className="space-y-0.5">
            <NavItem label="Finance & risk" active />
            <NavItem label="Lending" />
            <NavItem label="Knowledge" />
          </div>
        </>
      }
    >
      <div className={`grid h-full min-h-0 lg:grid-cols-[1.15fr_0.85fr] ${className}`}>
        <div className="min-h-0 overflow-auto border-b border-[#272C33] p-4 lg:border-b-0 lg:border-r">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[13px] font-medium text-[#F2F4F7]">
              Finance & risk pack
            </p>
            <span className="font-mono text-[10px] text-[#6F7885]">
              Sample · 50+ agents
            </span>
          </div>
          <ul className="overflow-hidden rounded-[4px] border border-[#272C33]">
            {agents.map(([name, task, status, human], i) => (
              <li
                key={name}
                className={`flex items-center justify-between gap-2 border-b border-[#272C33] px-3 py-2.5 last:border-b-0 ${
                  detail && i === 2 ? "bg-[#111D35]" : "bg-[#111419]"
                }`}
                style={
                  detail && i === 2
                    ? { boxShadow: `inset 2px 0 0 ${BLUE}` }
                    : undefined
                }
              >
                <div className="min-w-0">
                  <p className="truncate text-[12px] text-[#F2F4F7]">{name}</p>
                  <p className="truncate text-[10px] text-[#6F7885]">{task}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {human ? (
                    <span className="rounded-[3px] border border-amber-400/20 px-1.5 py-0.5 font-mono text-[9px] text-amber-200/80">
                      Human
                    </span>
                  ) : null}
                  <span
                    className={`font-mono text-[10px] ${
                      status === "Verified" ? "text-[#9BA3AE]" : "text-amber-300"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`space-y-3 overflow-auto bg-[#111419] p-4 transition-opacity duration-300 ${
            detail ? "opacity-100" : "opacity-50"
          }`}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6F7885]">
            Agent detail
          </p>
          <p className="text-[14px] font-medium text-[#F2F4F7]">
            KYC intelligence
          </p>
          <p className="text-[12px] leading-relaxed text-[#9BA3AE]">
            ID + sanctions pack with human review on exceptions. Runs as a
            workflow of sub-agents with an audit trail on every step.
          </p>
          <div className="rounded-[4px] border border-[#272C33] bg-[#151920] px-3 py-2 font-mono text-[11px] text-[#9BA3AE]">
            Last run · 2m ago · 3 exceptions held
          </div>
          <div className="rounded-[4px] border border-[#272C33] bg-[#151920] px-3 py-2 font-mono text-[11px] text-[#9BA3AE]">
            Holder · Compliance · Review required
          </div>
        </div>
      </div>
    </ShellLayout>
  );
}

export const PLATFORM_SCREENS = {
  "ask-ai": AskAiScreen,
  "ai-drive": AiDriveScreen,
  workflows: WorkflowsScreen,
  dashboards: DashboardsScreen,
  contracts: ContractsScreen,
  "agent-hub": AgentHubScreen,
} as const;
