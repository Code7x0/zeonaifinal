"use client";

import type { CaseStudy } from "@/components/sites/zeonai/content";

type VisualProps = {
  study: CaseStudy;
  compact?: boolean;
};

/** Case-specific product visuals — HTML/SVG only, grounded in real content. */
export function CaseVisual({ study, compact = false }: VisualProps) {
  switch (study.visualType) {
    case "document":
      return <DocumentVisual compact={compact} />;
    case "billing":
      return <BillingVisual compact={compact} />;
    case "reconciliation":
      return <ReconciliationVisual compact={compact} />;
    case "media":
      return <MediaVisual compact={compact} />;
    default:
      return null;
  }
}

function DocumentVisual({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`zeon-surface overflow-hidden ${compact ? "p-3" : "p-4"}`}
      aria-hidden
    >
      <div className="flex gap-3">
        <div className="min-w-0 flex-[1.1] rounded-[2px] border border-[#DCE1E0] bg-[#F6F4EF] p-2.5">
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#5B6766]">
            Loan_application.pdf
          </p>
          <div className="mt-2 space-y-1.5">
            {[92, 78, 100, 64, 86].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-[#DCE1E0]"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <div className="mt-3 rounded-[2px] border border-dashed border-[#155EEF]/40 bg-[#EAF1FA] px-2 py-1.5">
            <p className="font-mono text-[8px] text-[#12345A]">
              DocAI · extracting fields
            </p>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#5B6766]">
            Validation
          </p>
          {[
            ["Applicant", "Verified"],
            ["Income", "Verified"],
            ["Employer", "Review"],
            ["ID check", "Verified"],
          ].map(([field, status]) => (
            <div
              key={field}
              className="flex items-center justify-between rounded-[2px] border border-[#DCE1E0] bg-[#FBFAF7] px-2 py-1.5"
            >
              <span className="text-[10px] text-[#010F0F]">{field}</span>
              <span
                className={`font-mono text-[8px] uppercase tracking-[0.1em] ${
                  status === "Verified" ? "text-[#155EEF]" : "text-[#5B6766]"
                }`}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BillingVisual({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`zeon-surface overflow-hidden ${compact ? "p-3" : "p-4"}`}
      aria-hidden
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#5B6766]">
          Partner fee pack · InvoiceAI
        </p>
        <span className="rounded-[2px] bg-[#EAF1FA] px-1.5 py-0.5 font-mono text-[8px] text-[#12345A]">
          ERP post
        </span>
      </div>
      <div className="mt-3 overflow-hidden rounded-[2px] border border-[#DCE1E0]">
        <div className="grid grid-cols-[1.4fr_0.8fr_0.7fr] gap-0 border-b border-[#DCE1E0] bg-[#F6F4EF] px-2 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-[#5B6766]">
          <span>Fee type</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        {[
          ["Origination", "$48,220", "Posted"],
          ["Servicing", "$12,400", "Posted"],
          ["Trailer", "$6,810", "Review"],
        ].map(([type, amt, status]) => (
          <div
            key={type}
            className="grid grid-cols-[1.4fr_0.8fr_0.7fr] border-b border-[#EDEDED] px-2 py-1.5 text-[10px] last:border-b-0"
          >
            <span className="text-[#010F0F]">{type}</span>
            <span className="text-[#5B6766]">{amt}</span>
            <span
              className={
                status === "Posted" ? "text-[#155EEF]" : "text-[#5B6766]"
              }
            >
              {status}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[9px] text-[#5B6766]">
        <span className="size-1.5 rounded-full bg-[#155EEF]" />
        Audit trail attached · 99%+ accuracy
      </div>
    </div>
  );
}

function ReconciliationVisual({ compact }: { compact?: boolean }) {
  const steps = [
    ["Statement", "Done"],
    ["Match", "Done"],
    ["Batch", "Running"],
    ["Exception", "Waiting"],
  ];
  return (
    <div
      className={`zeon-surface overflow-hidden ${compact ? "p-3" : "p-4"}`}
      aria-hidden
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#5B6766]">
        Daily receipting · Reconciliation agent
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {steps.map(([label, state], i) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className={`rounded-[2px] border px-2 py-1 text-[10px] ${
                state === "Done"
                  ? "border-[#155EEF]/30 bg-[#EAF1FA] text-[#12345A]"
                  : state === "Running"
                    ? "border-[#155EEF] bg-[#155EEF] text-white"
                    : "border-[#DCE1E0] bg-[#F6F4EF] text-[#5B6766]"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 ? (
              <span className="text-[#DCE1E0]" aria-hidden>
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-[2px] border border-[#DCE1E0] bg-[#F6F4EF] px-2.5 py-2">
          <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#5B6766]">
            Matched
          </p>
          <p className="mt-1 text-[16px] font-medium tracking-[-0.02em] text-[#010F0F]">
            142
          </p>
        </div>
        <div className="rounded-[2px] border border-[#DCE1E0] bg-white px-2.5 py-2">
          <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#5B6766]">
            Exceptions
          </p>
          <p className="mt-1 text-[16px] font-medium tracking-[-0.02em] text-[#010F0F]">
            7
          </p>
        </div>
      </div>
    </div>
  );
}

function MediaVisual({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`zeon-surface overflow-hidden ${compact ? "p-3" : "p-4"}`}
      aria-hidden
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#5B6766]">
          AI Workspace · Summary
        </p>
        <span className="font-mono text-[8px] text-[#155EEF]">Semantic</span>
      </div>
      <div className="mt-3 space-y-2">
        <div className="rounded-[2px] border border-[#DCE1E0] bg-[#F6F4EF] px-2.5 py-2">
          <p className="text-[10px] leading-snug text-[#010F0F]">
            Briefing pack synthesised from text and audio sources in the
            archive…
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Sentiment · stable", "Sources · 12", "Error · under 1%"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-[2px] border border-[#DCE1E0] bg-[#EAF1FA] px-2 py-0.5 font-mono text-[8px] text-[#12345A]"
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </div>
      <svg viewBox="0 0 200 48" className="mt-3 h-10 w-full" aria-hidden>
        <path
          d="M4 36 L28 30 L52 32 L76 18 L100 22 L124 12 L148 16 L172 8 L196 14"
          fill="none"
          stroke="#155EEF"
          strokeWidth="1.5"
        />
        <path
          d="M4 40 L28 38 L52 39 L76 34 L100 35 L124 30 L148 31 L172 28 L196 29"
          fill="none"
          stroke="#DCE1E0"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
