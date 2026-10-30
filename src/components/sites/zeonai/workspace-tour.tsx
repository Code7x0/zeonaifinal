"use client";

import { useState } from "react";

const TABS = [
  {
    id: "ask",
    label: "Ask AI",
    panel: (
      <div className="space-y-4">
        <div className="rounded-xl border border-[var(--zeon-line)] bg-[var(--zeon-mist)]/60 p-4">
          <p className="text-[12px] text-[var(--zeon-fog)]">Question</p>
          <p className="mt-1 text-[15px] text-[var(--zeon-ink)]">
            What approval do I need for capital spend above budget?
          </p>
        </div>
        <div className="rounded-xl border border-[var(--zeon-line)] bg-white p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--zeon-fog)]">
            AI assistant · Finance manager
          </p>
          <p className="mt-3 text-[15px] leading-[1.55] text-[var(--zeon-ink70)]">
            Spend above the approved budget needs CFO sign-off once it passes
            the delegated limit. Raise a variation request in Workflows and
            attach the revised business case.
          </p>
          <div className="mt-4 space-y-2 border-t border-[var(--zeon-line)] pt-4">
            <p className="text-[12px] font-medium text-[var(--zeon-ink)]">
              Cited sources
            </p>
            <p className="text-[13px] text-[var(--zeon-ink70)]">
              Capital expenditure policy v4.pdf — AI Drive, Finance only
            </p>
            <p className="text-[13px] text-[var(--zeon-ink70)]">
              Delegation of authority.docx — AI Drive, v12
            </p>
            <p className="text-[12px] text-[var(--zeon-ember)]">
              2 matching documents not shown: outside your access
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "agents",
    label: "Agent Hub",
    panel: (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[14px] text-[var(--zeon-ink70)]">
            Supplier invoice agent
          </p>
          <span className="rounded-full bg-[var(--zeon-mist)] px-2.5 py-1 font-mono text-[11px] text-[var(--zeon-ink70)]">
            Draft · 7 sub-agents
          </span>
        </div>
        <ol className="grid gap-2 sm:grid-cols-2">
          {[
            "Data ingestion",
            "Extraction",
            "Rule builder",
            "Validation",
            "Workflow",
            "Dashboard",
            "Output",
          ].map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-3 rounded-xl border border-[var(--zeon-line)] bg-white px-3 py-3 text-[13px]"
            >
              <span className="font-mono text-[11px] text-[var(--zeon-fog)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <p className="rounded-xl border border-[var(--zeon-line)] bg-[var(--zeon-mist)]/50 px-4 py-3 text-[13px] text-[var(--zeon-ink70)]">
          Run result: 38 lines flagged for review, evidence attached
        </p>
      </div>
    ),
  },
  {
    id: "apps",
    label: "App Hub",
    panel: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-medium text-[var(--zeon-ink)]">
            Apps for your role
          </p>
          <span className="font-mono text-[11px] text-[var(--zeon-fog)]">
            6 apps
          </span>
        </div>
        {[
          ["Assisted Benefits Builder", "Available"],
          ["Assisted Maintenance Planner", "Available"],
          ["Training Assistant", "Available"],
          ["Voice Timesheet", "Available"],
          ["Grant Acquittal", "Coming soon"],
          ["DA Document Assessment", "Coming soon"],
        ].map(([name, state]) => (
          <div
            key={name}
            className="flex items-center justify-between gap-3 rounded-xl border border-[var(--zeon-line)] bg-white px-4 py-3"
          >
            <p className="text-[13px] text-[var(--zeon-ink)]">{name}</p>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] ${
                state === "Available"
                  ? "bg-[var(--zeon-mist)] text-[var(--zeon-ink70)]"
                  : "bg-[var(--zeon-mist)] text-[var(--zeon-fog)]"
              }`}
            >
              {state}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "dash",
    label: "AI Dashboards",
    panel: (
      <div className="space-y-4">
        <p className="text-[14px] font-medium text-[var(--zeon-ink)]">
          Procurement overview
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["AUD 4.8m", "Spend this quarter"],
            ["312", "Open invoices"],
            ["3.1 days", "Average approval time"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border border-[var(--zeon-line)] bg-white p-4"
            >
              <p className="text-[22px] tracking-[-0.03em] text-[var(--zeon-ink)]">
                {value}
              </p>
              <p className="mt-1 text-[12px] text-[var(--zeon-fog)]">{label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-[var(--zeon-line)] bg-white p-4">
          <p className="mb-3 text-[12px] text-[var(--zeon-fog)]">Spend by month</p>
          <div className="flex h-28 items-end gap-2">
            {[42, 55, 48, 62, 70, 58, 74].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-sm bg-[var(--zeon-blue)]/80"
                  style={{ height: `${h}%` }}
                />
                <span className="font-mono text-[9px] text-[var(--zeon-fog)]">
                  {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "flow",
    label: "Workflows",
    panel: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-medium">Supplier invoice workflow</p>
          <span className="rounded-full bg-[var(--zeon-teal)]/15 px-2.5 py-1 text-[11px] text-[var(--zeon-teal)]">
            Running
          </span>
        </div>
        <ol className="space-y-2">
          {[
            ["Ingest", "done"],
            ["Extract", "done"],
            ["Match", "done"],
            ["Rules", "done"],
            ["Approve — Human approval", "active"],
            ["Post", "todo"],
          ].map(([stage, state]) => (
            <li
              key={stage}
              className={`rounded-xl border px-4 py-3 text-[13px] ${
                state === "active"
                  ? "border-[var(--zeon-blue)] bg-[var(--zeon-blue)]/5 text-[var(--zeon-ink)]"
                  : "border-[var(--zeon-line)] text-[var(--zeon-ink70)]"
              }`}
            >
              {stage}
            </li>
          ))}
        </ol>
      </div>
    ),
  },
  {
    id: "contract",
    label: "Contract Intelligence",
    panel: (
      <div className="space-y-4">
        <div>
          <p className="text-[14px] font-medium">Supplier-agreement-v3.pdf</p>
          <p className="mt-1 text-[12px] text-[var(--zeon-fog)]">
            From AI Drive, Legal
          </p>
        </div>
        <div className="space-y-2">
          {[
            ["Renewal", "It renews automatically unless either party gives 90 days notice."],
            ["Payment", "Invoices are payable within 45 days of receipt."],
            [
              "Liability, flagged",
              "Liability is limited to the fees paid in the prior 12 months.",
            ],
          ].map(([title, body]) => (
            <div
              key={title}
              className="rounded-xl border border-[var(--zeon-line)] bg-white p-4"
            >
              <p
                className={`text-[12px] font-medium ${
                  title.includes("flagged")
                    ? "text-[var(--zeon-ember)]"
                    : "text-[var(--zeon-ink)]"
                }`}
              >
                {title}
              </p>
              <p className="mt-1 text-[13px] leading-[1.45] text-[var(--zeon-ink70)]">
                {body}
              </p>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-[var(--zeon-ember)]">
          Risk flag: Liability cap above policy
        </p>
      </div>
    ),
  },
] as const;

export function WorkspaceTour() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(true);

  return (
    <section id="platform" className="bg-[var(--zeon-paper)] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[640px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--zeon-fog)]">
              AI Workspace
            </p>
            <h2 className="mt-3 text-[36px] leading-[1.08] tracking-[-0.035em] text-[var(--zeon-ink)] md:text-[52px]">
              See the platform at work
            </h2>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.55] text-[var(--zeon-ink70)]">
              Sample data from AI Workspace. Switch between product areas to
              see how answers, agents, apps, dashboards, workflows and contracts
              stay governed.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[var(--zeon-line)] px-3 py-1.5 font-mono text-[11px] text-[var(--zeon-fog)]">
              Sample data
            </span>
            <button
              type="button"
              className="rounded-full border border-[var(--zeon-line)] px-3 py-1.5 text-[12px] text-[var(--zeon-ink70)]"
              onClick={() => setPaused((v) => !v)}
              aria-pressed={paused}
            >
              {paused ? "Paused" : "Pause the capability tour"}
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[240px_1fr]">
          <div
            role="tablist"
            aria-label="AI Workspace areas"
            className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
          >
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`shrink-0 rounded-full px-4 py-2.5 text-left text-[13px] transition-colors ${
                  active === i
                    ? "bg-[var(--zeon-ink)] text-white"
                    : "bg-[var(--zeon-mist)] text-[var(--zeon-ink70)] hover:text-[var(--zeon-ink)]"
                }`}
                onClick={() => setActive(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            className="min-h-[420px] rounded-2xl border border-[var(--zeon-line)] bg-[var(--zeon-mist)]/30 p-5 md:p-6"
          >
            {TABS[active].panel}
          </div>
        </div>
      </div>
    </section>
  );
}
