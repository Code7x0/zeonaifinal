"use client";

/**
 * Signature product interfaces for DeepDelve pages.
 * Sample data only — labelled in UI. Inline styles where needed for reliable paint.
 */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { animate, stagger } from "animejs";
import { useReducedMotion } from "motion/react";
import { architectureLayers } from "@/components/sites/zeonai/content";
import { cn } from "@/lib/utils";

const frame: CSSProperties = {
  background: "#fff",
  color: "#181D27",
  border: "1px solid #E9EAEB",
  overflow: "hidden",
};

const bar: CSSProperties = {
  display: "flex",
  height: 44,
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid #E9EAEB",
  background: "#FAFAFA",
  padding: "0 14px",
};

function ProductChrome({
  title,
  module,
  children,
  className,
}: {
  title: string;
  module: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className} style={frame}>
      <div style={bar}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            aria-hidden
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#1B46F5",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 12, fontWeight: 500 }}>{title}</span>
          <span
            style={{
              border: "1px solid #E9EAEB",
              background: "#fff",
              padding: "2px 6px",
              fontFamily: "ui-monospace, monospace",
              fontSize: 10,
              color: "#535862",
            }}
          >
            {module}
          </span>
        </div>
        <span
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            color: "#9AA8A6",
          }}
        >
          Sample data
        </span>
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}

/** DocAI — document page + extracted fields with highlight link */
export function DocExtractPreview() {
  const [active, setActive] = useState(0);
  const fields = [
    { label: "Applicant", value: "Riverstone Holdings Pty Ltd", passage: "Borrower: Riverstone Holdings Pty Ltd" },
    { label: "Facility", value: "Commercial term loan", passage: "Facility type: Commercial term loan" },
    { label: "Requested LVR", value: "82%", passage: "Requested LVR: 82% of as-is valuation" },
    { label: "Tax returns", value: "FY23 · FY24 on file", passage: "Two years of tax returns attached" },
  ] as const;

  return (
    <ProductChrome title="AI Workspace" module="DocAI">
      <div className="grid gap-3 lg:grid-cols-2">
        <div
          style={{
            border: "1px solid #E9EAEB",
            background: "#FAFAFA",
            padding: 14,
            minHeight: 220,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#535862",
            }}
          >
            Lending application · p.3
          </p>
          <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.6, color: "#181D27" }}>
            {fields.map((f, i) => (
              <span key={f.label}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="rounded-[2px] px-0.5 text-left transition-colors"
                  style={{
                    background:
                      active === i ? "rgba(36,91,219,0.18)" : "transparent",
                    color: "#181D27",
                  }}
                >
                  {f.passage}
                </button>
                {i < fields.length - 1 ? ". " : "."}
              </span>
            ))}
          </p>
        </div>
        <div className="space-y-2">
          {fields.map((f, i) => (
            <button
              key={f.label}
              type="button"
              onClick={() => setActive(i)}
              className="flex w-full items-center justify-between gap-3 border px-3 py-2.5 text-left transition-colors"
              style={{
                borderColor: active === i ? "#1B46F5" : "#E9EAEB",
                background: active === i ? "rgba(36,91,219,0.06)" : "#fff",
              }}
            >
              <span>
                <span className="block font-mono text-[10px] tracking-[0.1em] text-[#535862] uppercase">
                  {f.label}
                </span>
                <span className="mt-0.5 block text-[13px] font-medium text-[#181D27]">
                  {f.value}
                </span>
              </span>
              <span className="font-mono text-[10px] text-[#9AA8A6]">
                {active === i ? "Source" : "Open"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </ProductChrome>
  );
}

/** InvoiceAI — invoice vs PO discrepancy */
export function InvoiceMatchPreview() {
  return (
    <ProductChrome title="AI Workspace" module="InvoiceAI">
      <div className="grid gap-3 lg:grid-cols-2">
        <div style={{ border: "1px solid #E9EAEB", padding: 12 }}>
          <p className="font-mono text-[10px] tracking-[0.12em] text-[#535862] uppercase">
            Invoice · INV-4419
          </p>
          <dl className="mt-3 space-y-2 text-[13px]">
            {[
              ["Supplier", "Northline Logistics"],
              ["PO", "PO-8821"],
              ["Subtotal", "$18,400.00"],
              ["Freight", "$1,240.00"],
              ["Total", "$19,640.00"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-[#EDEDED] pb-2">
                <dt className="text-[#535862]">{k}</dt>
                <dd className="font-medium text-[#181D27]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div style={{ border: "1px solid rgba(36,91,219,0.35)", background: "rgba(36,91,219,0.05)", padding: 12 }}>
          <p className="font-mono text-[10px] tracking-[0.12em] text-[#1B46F5] uppercase">
            Exception · PO match
          </p>
          <p className="mt-3 text-[14px] font-medium text-[#181D27]">
            Freight variance +$1,240
          </p>
          <p className="mt-2 text-[13px] leading-[1.5] text-[#535862]">
            PO-8821 totals $18,400. Invoice includes freight not on the order.
            Held for AP review — not auto-posted.
          </p>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E9EAEB] pt-3">
            <span className="text-[12px] text-[#535862]">
              Checkpoint · Sarah Chen
            </span>
            <span className="inline-flex h-8 items-center bg-[#181D27] px-3 text-[11px] font-medium text-white">
              Approve exception
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 overflow-hidden border border-[#E9EAEB]">
        <div className="grid grid-cols-4 gap-2 border-b border-[#E9EAEB] bg-[#FAFAFA] px-3 py-2 font-mono text-[9px] tracking-[0.1em] text-[#535862] uppercase">
          <span>Field</span>
          <span>Extracted</span>
          <span>Expected</span>
          <span>State</span>
        </div>
        {[
          ["Invoice total", "$19,640.00", "$18,400.00", "Mismatch"],
          ["PO reference", "PO-8821", "PO-8821", "Match"],
          ["Supplier ABN", "51 824 753 556", "51 824 753 556", "Match"],
        ].map((row) => (
          <div
            key={row[0]}
            className="grid grid-cols-4 gap-2 border-b border-[#EDEDED] px-3 py-2.5 text-[12px] last:border-b-0"
          >
            <span className="text-[#535862]">{row[0]}</span>
            <span className="font-medium">{row[1]}</span>
            <span>{row[2]}</span>
            <span
              className={cn(
                "font-mono text-[10px] uppercase",
                row[3] === "Mismatch" ? "text-[#1B46F5]" : "text-[#535862]",
              )}
            >
              {row[3]}
            </span>
          </div>
        ))}
      </div>
    </ProductChrome>
  );
}

/** CashfloAI — dashboard + source panel */
export function CashflowPreview() {
  const [selected, setSelected] = useState<"in" | "out" | "due">("due");
  const detail = {
    in: {
      label: "Cash in · 30d",
      value: "$428k",
      source: "Statement · Westpac OpEx · rows 14–38",
      note: "Illustrative inflow total for the sample period.",
    },
    out: {
      label: "Cash out · 30d",
      value: "$391k",
      source: "Statement · Westpac OpEx · rows 41–72",
      note: "Illustrative outflow total for the sample period.",
    },
    due: {
      label: "Due in 7 days",
      value: "$64k",
      source: "Payables extract · batch AP-19",
      note: "Sample due items pending reviewer confirmation.",
    },
  }[selected];

  return (
    <ProductChrome title="AI Workspace" module="CashfloAI">
      <p className="mb-3 font-mono text-[10px] tracking-[0.12em] text-[#535862] uppercase">
        Finance view · sample SMB pack
      </p>
      <div className="grid gap-2 sm:grid-cols-3">
        {(
          [
            ["in", "Cash in · 30d", "$428k"],
            ["out", "Cash out · 30d", "$391k"],
            ["due", "Due in 7 days", "$64k"],
          ] as const
        ).map(([id, label, value]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelected(id)}
            className="border px-3 py-3 text-left transition-colors"
            style={{
              borderColor: selected === id ? "#1B46F5" : "#E9EAEB",
              background: selected === id ? "rgba(36,91,219,0.06)" : "#fff",
            }}
          >
            <span className="block font-mono text-[10px] text-[#535862] uppercase">
              {label}
            </span>
            <span className="mt-1 block font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em]">
              {value}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-3 border border-[#E9EAEB] p-3 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] text-[#535862] uppercase">
            Trace · {detail.label}
          </p>
          <p className="mt-2 text-[22px] font-medium tracking-[-0.02em]">
            {detail.value}
          </p>
          <p className="mt-2 text-[13px] leading-[1.5] text-[#535862]">
            {detail.note}
          </p>
        </div>
        <div style={{ background: "#FAFAFA", padding: 12 }}>
          <p className="font-mono text-[10px] text-[#535862] uppercase">
            Source document
          </p>
          <p className="mt-2 text-[13px] font-medium text-[#181D27]">
            {detail.source}
          </p>
          <p className="mt-2 text-[12px] leading-[1.45] text-[#535862]">
            Values are illustrative sample data for UI demonstration — not a
            performance claim.
          </p>
        </div>
      </div>
    </ProductChrome>
  );
}

/** DeepProbe — Ask AI with clickable citations → document highlight */
export function ProbeAskPreview() {
  const [cite, setCite] = useState(0);
  const sources = [
    {
      tag: "1",
      title: "Lending Policy v3.4",
      loc: "p.12 · AI Drive, Credit",
      passage:
        "Policy 4.2 requires a senior credit override when LVR exceeds 80% for self-employed applicants, with two years of tax returns on file.",
    },
    {
      tag: "2",
      title: "Override matrix",
      loc: "§B · AI Drive, Credit",
      passage:
        "Self-employed applicants above 80% LVR escalate to senior credit. Dual sign-off recorded on the case before commitment.",
    },
  ] as const;

  return (
    <ProductChrome title="AI Workspace" module="DeepProbe · Ask AI">
      <div
        style={{
          border: "1px solid #E9EAEB",
          background: "#FAFAFA",
          padding: "10px 12px",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        What does the credit policy say about LVR above 80% for self-employed
        applicants?
      </div>
      <div className="mt-3 border border-[#E9EAEB] p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.12em] text-[#1B46F5] uppercase">
            Answer
          </span>
          <span className="font-mono text-[10px] text-[#535862]">
            Access · Credit · Policy
          </span>
        </div>
        <p className="mt-2 text-[14px] leading-[1.55] text-[#181D27]">
          Policy 4.2 requires a senior credit override when LVR exceeds 80% for
          self-employed applicants, with two years of tax returns on file.{" "}
          {sources.map((s, i) => (
            <button
              key={s.tag}
              type="button"
              onClick={() => setCite(i)}
              className="mx-0.5 inline-flex size-5 items-center justify-center align-super font-mono text-[10px] transition-colors"
              style={{
                background: cite === i ? "#1B46F5" : "#EEF2FF",
                color: cite === i ? "#fff" : "#1B46F5",
              }}
              aria-pressed={cite === i}
              aria-label={`Citation ${s.tag}`}
            >
              {s.tag}
            </button>
          ))}
        </p>
        <p className="mt-3 text-[12px] text-[#535862]">
          1 matching document not shown: outside your access
        </p>
      </div>
      <div
        className="mt-3 border p-3 transition-colors"
        style={{
          borderColor: "#1B46F5",
          background: "rgba(36,91,219,0.04)",
        }}
      >
        <p className="font-mono text-[10px] tracking-[0.12em] text-[#535862] uppercase">
          Source · {sources[cite].title} · {sources[cite].loc}
        </p>
        <p className="mt-2 text-[13px] leading-[1.55] text-[#181D27]">
          <mark style={{ background: "rgba(36,91,219,0.2)", padding: "0 2px" }}>
            {sources[cite].passage}
          </mark>
        </p>
      </div>
    </ProductChrome>
  );
}

export function WorkflowStrip({
  steps,
}: {
  steps: readonly { id: string; title: string; body: string; human?: boolean }[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduceMotion || !rootRef.current) return;
    const items = rootRef.current.querySelectorAll("[data-step]");
    const anim = animate(items, {
      opacity: [0, 1],
      y: [10, 0],
      delay: stagger(70),
      duration: 480,
      ease: "outQuad",
    });
    return () => {
      anim.pause();
    };
  }, [reduceMotion, steps]);

  return (
    <div
      ref={rootRef}
      className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
    >
      {steps.map((s) => (
        <div
          key={s.id}
          data-step
          className="border border-[#E9EAEB] bg-white p-4"
          style={reduceMotion ? undefined : { opacity: 0 }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[11px] text-[#1B46F5]">{s.id}</span>
            {s.human ? (
              <span className="font-mono text-[9px] tracking-[0.08em] text-[#535862] uppercase">
                Human
              </span>
            ) : null}
          </div>
          <h3 className="mt-2 text-[16px] font-medium tracking-[-0.02em]">
            {s.title}
          </h3>
          <p className="mt-2 text-[13px] leading-[1.5] text-[#535862]">{s.body}</p>
        </div>
      ))}
    </div>
  );
}

export function ArchitectureDepth() {
  const [i, setI] = useState(0);
  const active = architectureLayers[i] ?? architectureLayers[0];

  return (
    <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
      <ol className="space-y-1">
        {architectureLayers.map((layer, idx) => {
          const on = idx === i;
          return (
            <li key={layer.key}>
              <button
                type="button"
                onClick={() => setI(idx)}
                className="flex w-full items-start gap-3 border px-3 py-3 text-left transition-colors duration-150"
                style={{
                  borderColor: on ? "#181D27" : "transparent",
                  background: on ? "#181D27" : "transparent",
                  color: on ? "#fff" : "#181D27",
                }}
              >
                <span
                  className="font-mono text-[11px]"
                  style={{ color: on ? "rgba(255,255,255,0.45)" : "#1B46F5" }}
                >
                  {layer.id}
                </span>
                <span className="text-[15px] font-medium">{layer.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="min-h-[260px] border border-[#E9EAEB] bg-[#FAFAFA] p-6 md:p-8">
        <p className="font-mono text-[11px] text-[#535862]">{active?.id}</p>
        <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em] md:text-[34px]">
          {active?.title}
        </h3>
        <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.55] text-[#535862]">
          {active?.description}
        </p>
        {active?.details?.length ? (
          <ul className="mt-5 space-y-2">
            {active.details.map((d) => (
              <li key={d} className="text-[13px] text-[#181D27]">
                <span className="mr-2 font-mono text-[10px] text-[#1B46F5]">
                  —
                </span>
                {d}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
