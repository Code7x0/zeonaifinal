"use client";

import { useState } from "react";
import {
  DASHBOARD_VOLUME,
  DASHBOARD_VOLUME_30D,
  ZEON_BLUE,
  ZEON_TEAL,
  type UseCaseId,
} from "./data";
import { VolumeChart } from "./volume-chart";

function SampleBadge() {
  return (
    <span className="inline-flex items-center rounded border border-black/8 bg-[#f7f7f7] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em] text-black/50">
      Sample data
    </span>
  );
}

function StatusPill({
  tone,
  children,
}: {
  tone: "ok" | "warn" | "neutral" | "info";
  children: string;
}) {
  const styles = {
    ok: "bg-emerald-50 text-emerald-700",
    warn: "bg-amber-50 text-amber-700",
    neutral: "bg-black/[0.04] text-black/60",
    info: "bg-[#0977B3]/10 text-[#0977B3]",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

export function DashboardView() {
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const data = range === "7d" ? DASHBOARD_VOLUME : DASHBOARD_VOLUME_30D;

  const kpis = [
    {
      label: "Processed documents",
      value: "12,486",
      delta: "+8.2% vs prior period",
      tone: "ok" as const,
    },
    {
      label: "Workflow completion",
      value: "94.8%",
      delta: "+1.4 pts",
      tone: "ok" as const,
    },
    {
      label: "Avg. processing time",
      value: "2.4 min",
      delta: "−18s vs prior",
      tone: "ok" as const,
    },
    {
      label: "Pending reviews",
      value: "128",
      delta: "42 due today",
      tone: "warn" as const,
    },
  ];

  const workflows = [
    { name: "Invoice Processing", done: 842, pct: 96, status: "On track" },
    { name: "Contract Review", done: 214, pct: 88, status: "Attention" },
    { name: "Customer Onboarding", done: 156, pct: 92, status: "On track" },
    { name: "KYC Verification", done: 98, pct: 81, status: "Attention" },
  ];

  const activity = [
    {
      text: "Invoice INV-4821 cleared 3-way match",
      time: "2m ago",
      who: "Invoice agent",
      status: "Verified",
    },
    {
      text: "MSA clause flagged for legal review",
      time: "14m ago",
      who: "Contract agent",
      status: "Review",
    },
    {
      text: "Onboarding pack assembled for Contoso",
      time: "31m ago",
      who: "Workflows",
      status: "Verified",
    },
    {
      text: "KYC packet returned for missing ID page",
      time: "1h ago",
      who: "KYC agent",
      status: "Review",
    },
  ];

  return (
    <div className="space-y-2.5 p-2.5 md:p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[13px] font-medium tracking-[-0.02em] text-[#292929]">
              Operational Overview
            </h3>
            <SampleBadge />
          </div>
          <p className="mt-0.5 text-[10px] text-black/40">
            Finance workspace · illustrative metrics
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="inline-flex rounded-md border border-black/8 bg-white p-0.5"
            role="group"
            aria-label="Date range"
          >
            {(
              [
                ["7d", "7 days"],
                ["30d", "30 days"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setRange(id)}
                aria-pressed={range === id}
                className={`rounded px-2 py-1 text-[10px] transition-colors ${
                  range === id
                    ? "bg-[#0977B3] text-white"
                    : "text-black/55 hover:text-black/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="rounded-md border border-black/8 bg-white px-2 py-1 text-[10px] text-black/55"
          >
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-y divide-black/6 overflow-hidden rounded-md border border-black/8 lg:grid-cols-4 lg:divide-y-0">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white px-2.5 py-2">
            <p className="text-[10px] leading-tight text-black/45">{kpi.label}</p>
            <p className="mt-1 text-[18px] font-medium leading-none tracking-[-0.03em] text-[#292929] tabular-nums">
              {kpi.value}
            </p>
            <p
              className={`mt-1 text-[10px] leading-tight ${
                kpi.tone === "warn" ? "text-amber-700" : "text-emerald-700"
              }`}
            >
              {kpi.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-md border border-black/8 bg-white p-2.5">
        <VolumeChart
          data={data}
          rangeLabel={
            range === "7d"
              ? "Illustrative daily throughput"
              : "Illustrative weekly throughput"
          }
        />
      </div>

      <div className="grid gap-2.5 lg:grid-cols-2">
        <div className="rounded-md border border-black/8 bg-white">
          <div className="flex items-center justify-between border-b border-black/6 px-2.5 py-1.5">
            <p className="text-[11px] font-medium text-[#292929]">
              Workflow performance
            </p>
            <SampleBadge />
          </div>
          <ul className="divide-y divide-black/5">
            {workflows.map((w) => (
              <li key={w.name} className="px-2.5 py-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] text-[#292929]">{w.name}</p>
                  <StatusPill tone={w.pct >= 90 ? "ok" : "warn"}>
                    {w.status}
                  </StatusPill>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${w.pct}%`,
                        background: w.pct >= 90 ? ZEON_BLUE : ZEON_TEAL,
                      }}
                    />
                  </div>
                  <span className="w-14 text-right text-[10px] tabular-nums text-black/45">
                    {w.done} · {w.pct}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md border border-black/8 bg-white">
          <div className="flex items-center justify-between border-b border-black/6 px-2.5 py-1.5">
            <p className="text-[11px] font-medium text-[#292929]">
              Recent activity
            </p>
            <SampleBadge />
          </div>
          <ul className="divide-y divide-black/5">
            {activity.map((a) => (
              <li
                key={a.text}
                className="flex items-start justify-between gap-2 px-2.5 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-[11px] text-[#292929]">{a.text}</p>
                  <p className="mt-0.5 text-[10px] text-black/40">
                    {a.who} · {a.time}
                  </p>
                </div>
                <StatusPill tone={a.status === "Verified" ? "ok" : "warn"}>
                  {a.status}
                </StatusPill>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function QuotesView() {
  const lines = [
    { sku: "ZS-CORE", desc: "AI Workspace · Core seats", qty: 40, unit: 180 },
    { sku: "ZS-AGENT", desc: "Agent Hub · Finance pack", qty: 1, unit: 4200 },
    {
      sku: "ZS-DRIVE",
      desc: "AI Drive · governed storage (TB)",
      qty: 5,
      unit: 320,
    },
    {
      sku: "ZS-IMP",
      desc: "Implementation & enablement",
      qty: 1,
      unit: 8500,
    },
  ];
  const subtotal = lines.reduce((s, l) => s + l.qty * l.unit, 0);

  return (
    <div className="space-y-3 p-3 md:p-4">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-black/6 pb-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[14px] font-medium text-[#292929]">
              Q-2026-0482
            </h3>
            <StatusPill tone="warn">In review</StatusPill>
            <SampleBadge />
          </div>
          <p className="mt-1 text-[12px] text-black/60">
            Contoso Manufacturing · Net 30 · Valid through 30 Nov 2026
          </p>
        </div>
        <div className="text-right text-[11px] text-black/50">
          <p>
            Owner{" "}
            <span className="font-medium text-[#292929]">A. Patel</span>
          </p>
          <p className="mt-0.5">
            Approver{" "}
            <span className="font-medium text-[#292929]">M. Chen · Pricing</span>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-black/8">
        <table className="w-full min-w-[480px] border-collapse text-left text-[11px]">
          <thead>
            <tr className="border-b border-black/6 bg-[#fafafa] text-[10px] uppercase tracking-[0.04em] text-black/45">
              <th className="px-3 py-2 font-medium">SKU</th>
              <th className="px-3 py-2 font-medium">Description</th>
              <th className="px-3 py-2 text-right font-medium">Qty</th>
              <th className="px-3 py-2 text-right font-medium">Unit</th>
              <th className="px-3 py-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr key={line.sku} className="border-b border-black/5">
                <td className="px-3 py-2.5 font-medium tabular-nums text-[#292929]">
                  {line.sku}
                </td>
                <td className="px-3 py-2.5 text-black/70">{line.desc}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-[#292929]">
                  {line.qty}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-black/70">
                  ${line.unit.toLocaleString()}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums font-medium text-[#292929]">
                  ${(line.qty * line.unit).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-[280px] rounded-lg border border-black/8 bg-[#fbfbfb] px-3 py-2.5 text-[11px] text-black/60">
          Pricing notes: Agent Hub pack discounted 8% for multi-year term.
          Implementation includes two workflow playbooks.
        </div>
        <div className="min-w-[180px] rounded-lg border border-black/8 bg-white px-3 py-2.5 text-[12px]">
          <div className="flex justify-between text-black/55">
            <span>Subtotal</span>
            <span className="tabular-nums text-[#292929]">
              ${subtotal.toLocaleString()}
            </span>
          </div>
          <div className="mt-1 flex justify-between text-black/55">
            <span>Discount</span>
            <span className="tabular-nums text-[#292929]">−$336</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-black/6 pt-2 font-medium text-[#292929]">
            <span>Total</span>
            <span className="tabular-nums">
              ${(subtotal - 336).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          className="rounded-md bg-[#0977B3] px-3 py-1.5 text-[11px] font-medium text-white"
        >
          Submit for approval
        </button>
        <button
          type="button"
          className="rounded-md border border-black/8 bg-white px-3 py-1.5 text-[11px] text-black/70"
        >
          Save draft
        </button>
      </div>
    </div>
  );
}

export function ContractsView() {
  const terms = [
    { label: "Term", value: "36 months" },
    { label: "Renewal", value: "Auto · 90-day notice" },
    { label: "Liability cap", value: "12 months fees" },
    { label: "Governing law", value: "Victoria, AU" },
    { label: "Data residency", value: "AU / CA regions" },
  ];

  return (
    <div className="grid gap-3 p-3 md:grid-cols-[1.15fr_0.85fr] md:p-4">
      <div className="overflow-hidden rounded-lg border border-black/8 bg-[#f7f5f0]">
        <div className="flex items-center justify-between border-b border-black/8 bg-white/70 px-3 py-2">
          <div>
            <p className="text-[12px] font-medium text-[#292929]">
              Master Services Agreement
            </p>
            <p className="text-[10px] text-black/45">
              Contoso_MSA_v4.pdf · Page 7 of 24
            </p>
          </div>
          <SampleBadge />
        </div>
        <div className="space-y-3 p-4 font-[Georgia,Times,serif] text-[11px] leading-[1.65] text-[#2a2a2a]">
          <p className="text-[10px] uppercase tracking-[0.08em] text-black/40">
            Section 8 — Limitation of liability
          </p>
          <p>
            Except for obligations under confidentiality and data protection,
            each party’s aggregate liability arising out of this Agreement shall
            not exceed the fees paid in the twelve (12) months preceding the
            claim.
          </p>
          <p className="rounded border border-[#0977B3]/25 bg-[#0977B3]/8 px-2.5 py-2 text-[#0b3d5c] ring-1 ring-[#0977B3]/15">
            <span className="mb-1 block text-[9px] font-sans font-medium uppercase tracking-[0.06em] text-[#0977B3]">
              Highlighted clause · extraction
            </span>
            Neither party shall be liable for indirect, incidental, special, or
            consequential damages, including lost profits, even if advised of
            the possibility of such damages.
          </p>
          <p>
            The foregoing limitations shall not apply to a party’s gross
            negligence or willful misconduct, or to indemnification obligations
            for third-party intellectual property claims.
          </p>
          <p className="text-[10px] text-black/40">…continued on page 8</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg border border-black/8 bg-white">
          <div className="border-b border-black/6 px-3 py-2">
            <p className="text-[12px] font-medium text-[#292929]">
              Extracted terms
            </p>
          </div>
          <dl className="divide-y divide-black/5">
            {terms.map((t) => (
              <div
                key={t.label}
                className="flex items-center justify-between gap-3 px-3 py-2.5"
              >
                <dt className="text-[11px] text-black/45">{t.label}</dt>
                <dd className="text-right text-[11px] font-medium text-[#292929]">
                  {t.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-lg border border-black/8 bg-white p-3">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-medium text-[#292929]">
              Review queue
            </p>
            <StatusPill tone="warn">Needs legal</StatusPill>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-black/60">
            Consequential damages carve-out is broader than the standard playbook.
            Source: page 7, lines 18–24. Assigned to Legal · due Fri.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="rounded-md bg-[#0977B3] px-2.5 py-1.5 text-[10px] font-medium text-white"
            >
              Open review
            </button>
            <button
              type="button"
              className="rounded-md border border-black/8 px-2.5 py-1.5 text-[10px] text-black/65"
            >
              Accept extraction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AskAiView() {
  return (
    <div className="flex h-full min-h-[420px] flex-col p-3 md:p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-[14px] font-medium text-[#292929]">
            Finance workspace
          </h3>
          <p className="text-[11px] text-black/45">
            Persona: Finance manager · access-aware
          </p>
        </div>
        <SampleBadge />
      </div>

      <div className="flex-1 space-y-3 overflow-auto">
        <div className="rounded-lg border border-black/8 bg-[#fbfbfb] px-3 py-2.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.05em] text-black/40">
            You asked
          </p>
          <p className="mt-1 text-[13px] text-[#292929]">
            What approval do I need for capital spend above the approved budget?
          </p>
        </div>

        <div className="rounded-lg border border-black/8 bg-white px-3 py-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.05em] text-[#0977B3]">
            Ask AI
          </p>
          <p className="mt-2 text-[13px] leading-[1.55] text-black/75">
            Spend above the approved budget needs CFO sign-off once it passes
            the delegated limit. Raise a variation request in Workflows and
            attach the revised business case before procurement proceeds.
          </p>
          <div className="mt-3 border-t border-black/6 pt-3">
            <p className="text-[11px] font-medium text-[#292929]">
              Cited sources
            </p>
            <ul className="mt-2 space-y-1.5">
              {[
                "Capital expenditure policy v4.pdf — AI Drive · Finance",
                "Delegation of authority.docx — AI Drive · v12",
              ].map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-[11px] text-black/65"
                >
                  <span
                    className="mt-1 size-1.5 shrink-0 rounded-full"
                    style={{ background: ZEON_BLUE }}
                  />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[10px] text-amber-700">
              2 matching documents not shown — outside your access.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg border border-black/8 bg-white px-3 py-2">
        <span className="flex-1 text-[12px] text-black/35">
          Ask about your documents…
        </span>
        <span className="rounded-md bg-[#1c1c1c] px-2.5 py-1 text-[10px] text-white">
          Send
        </span>
      </div>
    </div>
  );
}

export function AiDriveView() {
  const files = [
    {
      name: "Capital expenditure policy v4.pdf",
      type: "PDF",
      owner: "Finance",
      ver: "v4",
      updated: "Oct 22",
    },
    {
      name: "Delegation of authority.docx",
      type: "DOCX",
      owner: "Finance",
      ver: "v12",
      updated: "Oct 18",
    },
    {
      name: "Supplier MSA — Contoso.pdf",
      type: "PDF",
      owner: "Legal",
      ver: "v3",
      updated: "Oct 12",
    },
    {
      name: "Invoice pack Q3.zip",
      type: "ZIP",
      owner: "AP",
      ver: "v1",
      updated: "Oct 9",
    },
    {
      name: "Board report Sept.pptx",
      type: "PPTX",
      owner: "FP&A",
      ver: "v2",
      updated: "Sep 30",
    },
  ];

  return (
    <div className="space-y-3 p-3 md:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-[14px] font-medium text-[#292929]">
            Governed library
          </h3>
          <p className="text-[11px] text-black/45">
            1,284 indexed · lineage on · Finance scope
          </p>
        </div>
        <SampleBadge />
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="min-w-[180px] flex-1 rounded-md border border-black/8 bg-white px-2.5 py-1.5 text-[11px] text-black/40">
          Search documents, tags, owners…
        </div>
        {["All types", "Finance", "Indexed"].map((f) => (
          <span
            key={f}
            className="rounded-md border border-black/8 bg-[#fafafa] px-2 py-1.5 text-[10px] text-black/55"
          >
            {f}
          </span>
        ))}
      </div>
      <div className="overflow-hidden rounded-lg border border-black/8">
        <div className="grid grid-cols-[1.4fr_0.5fr_0.5fr_0.4fr_0.5fr] gap-2 border-b border-black/6 bg-[#fafafa] px-3 py-2 text-[10px] uppercase tracking-[0.04em] text-black/40">
          <span>Name</span>
          <span>Type</span>
          <span>Owner</span>
          <span>Ver</span>
          <span>Updated</span>
        </div>
        {files.map((f) => (
          <div
            key={f.name}
            className="grid grid-cols-[1.4fr_0.5fr_0.5fr_0.4fr_0.5fr] gap-2 border-b border-black/5 px-3 py-2.5 text-[11px] last:border-b-0"
          >
            <span className="truncate font-medium text-[#292929]">{f.name}</span>
            <span className="text-black/50">{f.type}</span>
            <span className="text-black/50">{f.owner}</span>
            <span className="tabular-nums text-black/50">{f.ver}</span>
            <span className="text-black/50">{f.updated}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkflowsView() {
  const stages = [
    { name: "Ingest", owner: "Agent", status: "Done" },
    { name: "Extract", owner: "Agent", status: "Done" },
    { name: "Match", owner: "Agent", status: "Done" },
    { name: "Rules", owner: "Agent", status: "Running" },
    { name: "Approve", owner: "A. Patel", status: "Waiting" },
    { name: "Post ERP", owner: "System", status: "Queued" },
  ];

  return (
    <div className="space-y-3 p-3 md:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-[14px] font-medium text-[#292929]">
            Invoice processing · INV-4821
          </h3>
          <p className="text-[11px] text-black/45">
            Contoso · $48,220.00 · PO-9811
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusPill tone="info">In progress</StatusPill>
          <SampleBadge />
        </div>
      </div>

      <ol className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {stages.map((s, i) => (
          <li
            key={s.name}
            className={`rounded-lg border px-2.5 py-2.5 ${
              s.status === "Running"
                ? "border-[#0977B3]/30 bg-[#0977B3]/5"
                : "border-black/8 bg-white"
            }`}
          >
            <p className="text-[10px] text-black/40">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[12px] font-medium text-[#292929]">
              {s.name}
            </p>
            <p className="mt-1 text-[10px] text-black/50">{s.owner}</p>
            <p className="mt-2">
              <StatusPill
                tone={
                  s.status === "Done"
                    ? "ok"
                    : s.status === "Running"
                      ? "info"
                      : "neutral"
                }
              >
                {s.status}
              </StatusPill>
            </p>
          </li>
        ))}
      </ol>

      <div className="rounded-lg border border-black/8 bg-white">
        <div className="border-b border-black/6 px-3 py-2 text-[12px] font-medium text-[#292929]">
          Audit trail
        </div>
        <ul className="divide-y divide-black/5 text-[11px]">
          {[
            ["10:42", "Rules agent", "Flagged freight variance $120"],
            ["10:41", "Match agent", "3-way match passed on qty"],
            ["10:38", "Extract agent", "12 fields extracted · confidence 0.97"],
            ["10:36", "Ingest", "PDF from AP inbox · hash verified"],
          ].map(([t, who, what]) => (
            <li
              key={t + what}
              className="grid grid-cols-[52px_100px_1fr] gap-2 px-3 py-2.5"
            >
              <span className="tabular-nums text-black/40">{t}</span>
              <span className="text-black/55">{who}</span>
              <span className="text-[#292929]">{what}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function OpportunityView() {
  return (
    <div className="space-y-3 p-3 md:p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[14px] font-medium text-[#292929]">
              Contoso — AI Workspace expansion
            </h3>
            <StatusPill tone="info">Negotiation</StatusPill>
            <SampleBadge />
          </div>
          <p className="mt-1 text-[11px] text-black/50">
            Opp-8841 · Enterprise · Owner A. Patel
          </p>
        </div>
        <div className="rounded-lg border border-black/8 bg-white px-3 py-2 text-right">
          <p className="text-[10px] text-black/45">Expected value</p>
          <p className="text-[18px] font-medium tracking-[-0.02em] tabular-nums text-[#292929]">
            $186,400
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Stage", "Commercial review"],
          ["Close date", "28 Nov 2026"],
          ["Next action", "Pricing committee · Tue"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="rounded-lg border border-black/8 bg-white px-3 py-2.5"
          >
            <p className="text-[10px] text-black/45">{k}</p>
            <p className="mt-1 text-[12px] font-medium text-[#292929]">{v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-black/8 bg-white">
        <div className="border-b border-black/6 px-3 py-2 text-[12px] font-medium text-[#292929]">
          Commercial details
        </div>
        <dl className="divide-y divide-black/5 text-[11px]">
          {[
            ["Products", "Core seats · Agent Hub Finance · AI Drive"],
            ["Term", "36 months · annual billing"],
            ["Competitors", "Incumbent OCR vendor"],
            ["Risk", "Legal review on liability cap"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-[110px_1fr] gap-3 px-3 py-2.5"
            >
              <dt className="text-black/45">{k}</dt>
              <dd className="text-[#292929]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export function AppHubView() {
  const apps = [
    {
      name: "Assisted Benefits Builder",
      desc: "Draft benefit structures from policy packs.",
      state: "Connected",
    },
    {
      name: "Assisted Maintenance Planner",
      desc: "Plan maintenance windows from asset SOPs.",
      state: "Connected",
    },
    {
      name: "Training Assistant",
      desc: "Answer from approved learning materials.",
      state: "Connected",
    },
    {
      name: "Vendor Risk Review",
      desc: "Score vendor packs against playbooks.",
      state: "Setup",
    },
    {
      name: "Board Pack Composer",
      desc: "Assemble narrative from FP&A sources.",
      state: "Connected",
    },
    {
      name: "Claims Triage",
      desc: "Route claims with evidence links.",
      state: "Restricted",
    },
  ];

  return (
    <div className="space-y-3 p-3 md:p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-[14px] font-medium text-[#292929]">
            Apps for your role
          </h3>
          <p className="text-[11px] text-black/45">Finance manager · 6 apps</p>
        </div>
        <SampleBadge />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {apps.map((app) => (
          <div
            key={app.name}
            className="rounded-lg border border-black/8 bg-white px-3 py-3"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[12px] font-medium text-[#292929]">
                {app.name}
              </p>
              <StatusPill
                tone={
                  app.state === "Connected"
                    ? "ok"
                    : app.state === "Setup"
                      ? "info"
                      : "neutral"
                }
              >
                {app.state}
              </StatusPill>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-black/55">
              {app.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AgentHubView() {
  const agents = [
    {
      name: "Invoice processing and 3-way match",
      task: "Match PO · GRN · invoice",
      state: "Verified",
    },
    {
      name: "Bank-ERP reconciliation",
      task: "Daily cash match",
      state: "Verified",
    },
    {
      name: "Loan origination agent",
      task: "Package credit file",
      state: "Review",
    },
    {
      name: "KYC intelligence agent",
      task: "ID + sanctions checks",
      state: "Review",
    },
    {
      name: "Contract analysis agent",
      task: "Extract liability terms",
      state: "Verified",
    },
    {
      name: "Secure knowledge discovery",
      task: "Cited enterprise search",
      state: "Verified",
    },
  ];

  return (
    <div className="space-y-3 p-3 md:p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-[14px] font-medium text-[#292929]">
            Agent Hub portfolio
          </h3>
          <p className="text-[11px] text-black/45">
            Finance & risk · 50+ agents available
          </p>
        </div>
        <SampleBadge />
      </div>
      <ul className="overflow-hidden rounded-lg border border-black/8 bg-white">
        {agents.map((a) => (
          <li
            key={a.name}
            className="flex items-center justify-between gap-3 border-b border-black/5 px-3 py-2.5 last:border-b-0"
          >
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-[#292929]">
                {a.name}
              </p>
              <p className="mt-0.5 text-[10px] text-black/45">{a.task}</p>
            </div>
            <StatusPill tone={a.state === "Verified" ? "ok" : "warn"}>
              {a.state}
            </StatusPill>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function renderUseCaseView(id: UseCaseId) {
  switch (id) {
    case "dashboards":
      return <DashboardView />;
    case "quotes":
      return <QuotesView />;
    case "contracts":
      return <ContractsView />;
    case "ask-ai":
      return <AskAiView />;
    case "ai-drive":
      return <AiDriveView />;
    case "workflows":
      return <WorkflowsView />;
    case "opportunity":
      return <OpportunityView />;
    case "app-hub":
      return <AppHubView />;
    case "agent-hub":
      return <AgentHubView />;
  }
}
