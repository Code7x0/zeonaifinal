"use client";

import {
  BarChart3,
  Bot,
  FileSearch,
  FileText,
  FolderOpen,
  GitBranch,
  LayoutGrid,
  MessageSquare,
  Target,
  type LucideIcon,
} from "lucide-react";
import { useId, useState } from "react";
import { USE_CASES, type UseCaseId, ZEON_BLUE } from "./data";
import { renderUseCaseView } from "./views";

const NAV_ICONS: Record<UseCaseId, LucideIcon> = {
  "ask-ai": MessageSquare,
  "ai-drive": FolderOpen,
  workflows: GitBranch,
  dashboards: BarChart3,
  contracts: FileSearch,
  opportunity: Target,
  quotes: FileText,
  "app-hub": LayoutGrid,
  "agent-hub": Bot,
};

export function PlatformShowcase() {
  const [activeId, setActiveId] = useState<UseCaseId>("dashboards");
  const labelId = useId();
  const active = USE_CASES.find((c) => c.id === activeId) ?? USE_CASES[3];
  const ActiveIcon = NAV_ICONS[active.id];

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(220px,0.32fr)_minmax(0,0.68fr)] lg:gap-8 xl:gap-10">
      <div className="min-w-0">
        <p
          id={labelId}
          className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-black/40"
        >
          Platform modules
        </p>
        <div
          role="listbox"
          aria-labelledby={labelId}
          aria-activedescendant={`usecase-${active.id}`}
          className="rounded-lg border border-black/8 bg-white"
        >
          {USE_CASES.map((item, i) => {
            const selected = item.id === active.id;
            return (
              <button
                key={item.id}
                id={`usecase-${item.id}`}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => setActiveId(item.id)}
                className={`group relative flex w-full items-start gap-2.5 border-b border-black/6 px-3.5 py-2.5 text-left transition-colors last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0977B3] ${
                  selected
                    ? "bg-[#0977B3]/[0.07]"
                    : "bg-white hover:bg-black/[0.02]"
                }`}
              >
                <span
                  className={`absolute inset-y-1.5 left-0 w-[2px] rounded-full transition-opacity ${
                    selected ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ background: ZEON_BLUE }}
                  aria-hidden
                />
                <span
                  className={`w-5 shrink-0 pt-0.5 text-[10px] tabular-nums tracking-[0.02em] ${
                    selected ? "font-medium text-[#0977B3]" : "text-black/30"
                  }`}
                >
                  {item.index}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[13px] leading-snug tracking-[-0.01em] ${
                      selected
                        ? "font-medium text-[#0977B3]"
                        : "font-medium text-[#1a1a1a]/80"
                    }`}
                  >
                    {item.title}
                  </span>
                  {selected ? (
                    <span className="mt-0.5 block text-[11px] leading-[1.4] text-black/50">
                      {item.description}
                    </span>
                  ) : null}
                </span>
                <span className="sr-only">
                  {i + 1} of {USE_CASES.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-w-0">
        <div className="overflow-hidden rounded-[12px] border border-black/8 bg-white">
          <div className="flex items-center border-b border-black/6 bg-[#fcfcfc] px-3 py-1">
            <p className="truncate text-[10px] font-medium tracking-[0.01em] text-black/40">
              ZeonAI · AI Workspace
            </p>
          </div>

          <div className="flex bg-white">
            <nav
              aria-label="Application modules"
              className="hidden w-11 shrink-0 flex-col items-center gap-0.5 border-r border-black/6 bg-white py-2.5 sm:flex"
            >
              {USE_CASES.map((item) => {
                const Icon = NAV_ICONS[item.id];
                const selected = item.id === active.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    title={item.title}
                    aria-label={item.title}
                    aria-current={selected ? "page" : undefined}
                    onClick={() => setActiveId(item.id)}
                    className={`flex size-8 items-center justify-center rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0977B3] ${
                      selected
                        ? "bg-[#0977B3]/10 text-[#0977B3]"
                        : "text-black/30 hover:bg-black/[0.03] hover:text-black/55"
                    }`}
                  >
                    <Icon className="size-3.5" strokeWidth={1.75} />
                  </button>
                );
              })}
            </nav>

            <div className="flex min-w-0 flex-1 flex-col">
              <header className="flex flex-wrap items-center justify-between gap-2 border-b border-black/6 px-3 py-2 md:px-3.5">
                <div className="min-w-0">
                  <p className="truncate text-[10px] text-black/35">
                    {active.breadcrumb.join(" / ")}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <ActiveIcon
                      className="size-3.5 text-[#0977B3]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <h3 className="truncate text-[12px] font-medium text-[#292929]">
                      {active.module}
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center rounded border border-black/8 bg-[#f7f7f7] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em] text-black/45">
                  Sample data
                </span>
              </header>

              <div
                key={active.id}
                className="platform-view-enter min-h-0 flex-1"
              >
                {renderUseCaseView(active.id)}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-2.5 text-[11px] leading-relaxed text-black/40">
          Illustrative interface. Metrics, documents, and workflows are sample
          data for demonstration — not live ZeonAI customer results.
        </p>
      </div>
    </div>
  );
}
