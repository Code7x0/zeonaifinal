"use client";

import { useState } from "react";
import { deployments, trustItems, trustLabels } from "./content";

export function Trust() {
  const [view, setView] = useState<"finance" | "executive">("finance");

  return (
    <section
      id="trust"
      className="border-t border-[var(--zeon-line)] bg-[var(--zeon-ink)] px-5 py-20 text-white md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
          06 · Governance
        </p>
        <h2 className="mt-3 max-w-[16ch] text-[36px] leading-[1.08] tracking-[-0.035em] md:text-[52px]">
          Governed by design, not added afterwards
        </h2>
        <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.55] text-white/65 md:text-[18px]">
          Access control, human review and an audit log are built into every
          part of AI Workspace, from the first search to the record posted in
          your ERP.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
                audit-trail
              </p>
              <span className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/55">
                Sample data
              </span>
            </div>
            <ul className="mt-6 space-y-3 font-mono text-[12px] leading-[1.5] text-white/70">
              <li>09:14:02 · finance.manager — Asked about capital spend approvals.</li>
              <li>09:14:02 · access.check — Role and sensitivity rules applied.</li>
              <li>09:14:03 · retrieval — 2 documents withheld: outside access.</li>
              <li>09:14:04 · answer — Answered with 2 cited sources.</li>
              <li>09:16:40 · finance.manager — Exported the cited answer.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[14px] font-medium">Access you control</p>
            <ol className="mt-4 space-y-3 text-[13px] text-white/70">
              <li>1. Admin defines roles — set up once.</li>
              <li>2. Roles map to modules — only what each role needs.</li>
              <li>3. People see only what their role allows — checked before retrieval.</li>
            </ol>
            <div className="mt-6 flex gap-2">
              {(["finance", "executive"] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`rounded-full px-3 py-1.5 text-[12px] capitalize ${
                    view === role
                      ? "bg-white text-[var(--zeon-ink)]"
                      : "border border-white/15 text-white/70"
                  }`}
                  onClick={() => setView(role)}
                >
                  View as {role}
                </button>
              ))}
            </div>
            <p className="mt-4 text-[13px] text-white/70">
              {view === "finance"
                ? "Finance sees 5 of 9 modules. Can open Agent Hub, Workflows, Dashboard, AI Drive, Ask AI."
                : "Executive sees a broader read view across dashboards and reports, with restricted write actions."}
            </p>
            <p className="mt-3 text-[11px] text-white/40">
              Roles shown are examples, not customer data.
            </p>
          </article>
        </div>

        <div className="mt-12">
          <p className="text-[15px] text-white/65">
            Upholding strict data security and privacy standards is at the core
            of everything we do.
          </p>
          {/* TODO: verify certification status with security owner */}
          <div className="mt-6 flex flex-wrap gap-3">
            {trustLabels.map((label) => (
              <div
                key={label.name}
                className="rounded-xl border border-white/10 px-4 py-3"
              >
                <p className="text-[14px] font-medium">{label.name}</p>
                <p className="text-[12px] text-white/45">{label.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 p-4"
              >
                <h3 className="text-[14px] font-medium">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.45] text-white/60">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <blockquote className="mt-10 max-w-[60ch] border-l-2 border-[var(--zeon-teal)] pl-5 text-[16px] leading-[1.55] text-white/80">
            Answers are drawn only from the documents and repositories the
            person can already open, and each one cites its sources. Check an
            output against the source before you act on it.
          </blockquote>
          <div className="mt-8 flex flex-wrap gap-2">
            {deployments.map((d) => (
              <span
                key={d}
                className="rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-white/70"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
