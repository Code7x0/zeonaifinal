"use client";

import { ArrowUp, Sparkles } from "lucide-react";

type ModulePreviewProps = {
  moduleName: string;
  roleLabel: string;
  agentCount: number;
  agents: readonly string[];
};

/** Compact enterprise product surface grounded in existing ZeonAI content. */
export function ModulePreview({
  moduleName,
  roleLabel,
  agentCount,
  agents,
}: ModulePreviewProps) {
  const isAskAi = moduleName === "Ask AI";

  return (
    <div className="flex h-full min-h-[340px] flex-col overflow-hidden rounded-[6px] border border-[#292F3A] bg-[#101318]">
      <div className="flex items-center justify-between gap-3 border-b border-[#202630] bg-[#151922] px-3.5 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-[3px] border border-[#292F3A] bg-[#111C32] text-[#356DFF]">
            <Sparkles className="size-3" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate font-mono text-[11px] uppercase tracking-[0.14em] text-[#F5F6F8]">
              {isAskAi ? "Ask AI" : moduleName}
            </p>
            <p className="mt-0.5 truncate font-mono text-[8px] uppercase tracking-[0.12em] text-[#727B8B]">
              {roleLabel}
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-[#727B8B]">
          <span className="size-1.5 rounded-full bg-[#356DFF]" aria-hidden />
          Live preview
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${isAskAi ? "min-h-0" : "p-3.5"}`}>
        {isAskAi ? <AskAiChat /> : renderPreview(moduleName)}
      </div>

      <div className="border-t border-[#202630] bg-[#151922] px-3.5 py-2.5">
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#727B8B]">
          Configured agents · {agentCount}
        </p>
        {agents.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {agents.map((agent) => (
              <li
                key={agent}
                className="rounded-[3px] border border-[#292F3A] bg-[#101318] px-2 py-0.5 text-[10px] tracking-[-0.01em] text-[#A0A7B4]"
              >
                {agent}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function AskAiChat() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-hidden px-3.5 py-3.5">
        <div className="space-y-1.5">
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#727B8B]">
            You
          </p>
          <div className="flex w-full justify-end">
            <p className="ml-auto max-w-[90%] rounded-[5px] border border-[#292F3A] bg-[#151922] px-3 py-2 text-left text-[12px] leading-snug tracking-[-0.01em] text-[#F5F6F8]">
              What approval do I need for capital spend above budget?
            </p>
          </div>
        </div>

        <div className="max-w-[96%] space-y-2">
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#727B8B]">
            ZeonAI
          </p>
          <p className="text-[12px] leading-[1.55] text-[#F5F6F8]">
            Spend above the approved budget needs CFO sign-off past the
            delegated limit.
          </p>
          <p className="text-[12px] leading-[1.55] text-[#A0A7B4]">
            Raise a variation in Workflows and attach the revised business case.
          </p>
          <button
            type="button"
            tabIndex={-1}
            className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#292F3A] bg-[#151922] px-2.5 py-1.5 text-left font-mono text-[9px] tracking-[0.02em] text-[#A0A7B4] transition hover:border-[#356DFF]/40"
            aria-label="Source: Capital expenditure policy v4.pdf section 4.2"
          >
            <span className="text-[#356DFF]">[1]</span>
            Capital expenditure policy v4.pdf · §4.2
          </button>
        </div>
      </div>

      <div className="border-t border-[#202630] bg-[#101318] px-3 py-2.5">
        <div
          className="flex items-center gap-2 rounded-[4px] border border-[#292F3A] bg-[#151922] px-2.5 py-2"
          aria-hidden
        >
          <span className="min-w-0 flex-1 text-[11px] text-[#727B8B]">
            Ask about your organisation…
          </span>
          <span className="flex size-6 shrink-0 items-center justify-center rounded-[3px] bg-[#356DFF] text-white">
            <ArrowUp className="size-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

function renderPreview(name: string) {
  switch (name) {
    case "AI Drive":
      return (
        <ul className="space-y-2 text-[12px]">
          {[
            ["Capital_policy_v4.pdf", "Policy"],
            ["Delegation_matrix.xlsx", "Spreadsheet"],
            ["Master_services_v2.pdf", "Contract"],
          ].map(([file, kind]) => (
            <li
              key={file}
              className="flex items-center justify-between rounded-[4px] border border-[#292F3A] bg-[#151922] px-2.5 py-2"
            >
              <span className="font-medium tracking-[-0.01em] text-[#F5F6F8]">
                {file}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#727B8B]">
                {kind}
              </span>
            </li>
          ))}
        </ul>
      );
    case "Workflows":
      return (
        <div className="space-y-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#727B8B]">
            Invoice processing
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            {["Ingest", "Extract", "Match", "Rules", "Approve"].map(
              (step, i) => (
                <div key={step} className="flex items-center gap-1.5">
                  <span
                    className={`rounded-[3px] border px-2 py-1 ${
                      i < 3
                        ? "border-[#292F3A] bg-[#111C32] text-[#356DFF]"
                        : i === 3
                          ? "border-[#356DFF] bg-[#356DFF] text-white"
                          : "border-[#292F3A] bg-[#151922] text-[#727B8B]"
                    }`}
                  >
                    {step}
                  </span>
                  {i < 4 ? (
                    <span className="text-[#292F3A]" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ),
            )}
          </div>
          <p className="text-[11px] text-[#727B8B]">
            Contoso · $48,220 · PO-9811
          </p>
        </div>
      );
    case "AI Dashboards":
    case "Dashboard":
      return (
        <div className="grid grid-cols-3 gap-2 text-[11px]">
          {[
            ["Processed", "12,486"],
            ["Completion", "94.8%"],
            ["Pending", "128"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[4px] border border-[#292F3A] bg-[#151922] px-2 py-2.5"
            >
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#727B8B]">
                {label}
              </p>
              <p className="mt-1.5 text-[15px] font-medium tracking-[-0.02em] text-[#F5F6F8]">
                {value}
              </p>
            </div>
          ))}
        </div>
      );
    case "Contract Intelligence":
      return (
        <div className="space-y-2.5 text-[12px]">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#727B8B]">
            Contoso_MSA_v4.pdf · page 7
          </p>
          <p className="leading-relaxed text-[#F5F6F8]">
            Aggregate liability shall not exceed fees paid in the twelve months
            preceding the claim…
          </p>
          <span className="inline-flex rounded-[3px] border border-[#292F3A] bg-[#111C32] px-2 py-0.5 text-[10px] font-medium text-[#356DFF]">
            Risk · liability cap
          </span>
        </div>
      );
    case "Agent Hub":
      return (
        <ul className="space-y-1.5 text-[12px]">
          {[
            ["Invoice 3-way match", "Verified"],
            ["Bank-ERP reconciliation", "Verified"],
            ["KYC intelligence", "Review"],
          ].map(([agent, status]) => (
            <li
              key={agent}
              className="flex items-center justify-between gap-2 rounded-[4px] border border-[#292F3A] bg-[#151922] px-2.5 py-2"
            >
              <span className="flex items-center gap-2 text-[#F5F6F8]">
                <span className="size-1.5 rounded-full bg-[#356DFF]" />
                {agent}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#727B8B]">
                {status}
              </span>
            </li>
          ))}
        </ul>
      );
    case "Opportunity Management":
      return (
        <ul className="space-y-1.5 text-[12px]">
          {[
            ["RFQ-4811 · Contoso", "Open"],
            ["Tender · NSW Health", "Review"],
            ["Quote pack · Apex", "Draft"],
          ].map(([row, state]) => (
            <li
              key={row}
              className="flex items-center justify-between rounded-[4px] border border-[#292F3A] bg-[#151922] px-2.5 py-2"
            >
              <span className="text-[#F5F6F8]">{row}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#727B8B]">
                {state}
              </span>
            </li>
          ))}
        </ul>
      );
    case "Quote Management":
      return (
        <div className="space-y-2 text-[12px]">
          <div className="flex items-center justify-between rounded-[4px] border border-[#292F3A] bg-[#151922] px-2.5 py-2">
            <span className="text-[#F5F6F8]">Q-2291 · Supplier pack</span>
            <span className="rounded-[3px] border border-[#292F3A] bg-[#111C32] px-2 py-0.5 text-[10px] text-[#356DFF]">
              Pending
            </span>
          </div>
          <p className="text-[#727B8B]">Line items assembled from AI Drive.</p>
        </div>
      );
    case "Search":
      return (
        <div className="space-y-2 text-[12px]">
          <div className="rounded-[4px] border border-[#292F3A] bg-[#151922] px-2.5 py-2 text-[#727B8B]">
            Search policies, contracts, and cases…
          </div>
          <p className="text-[#727B8B]">
            Results respect role-based access from AI Drive.
          </p>
        </div>
      );
    case "Notifications":
      return (
        <ul className="space-y-1.5 text-[12px] text-[#F5F6F8]">
          <li className="rounded-[4px] border border-[#292F3A] bg-[#151922] px-2.5 py-2">
            INV-4821 rules check · 2m ago
          </li>
          <li className="rounded-[4px] border border-[#292F3A] bg-[#151922] px-2.5 py-2">
            Approval waiting · A. Chen
          </li>
        </ul>
      );
    case "App Hub":
      return (
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          {["Invoice AI", "KYC pack", "Training", "Timesheet"].map((app) => (
            <div
              key={app}
              className="rounded-[4px] border border-[#292F3A] bg-[#151922] px-2 py-2.5 text-center text-[#F5F6F8]"
            >
              {app}
            </div>
          ))}
        </div>
      );
    default:
      return (
        <p className="text-[12px] leading-relaxed text-[#727B8B]">
          Module surface for {name}, configured to the selected role.
        </p>
      );
  }
}
