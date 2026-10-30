"use client";

import Link from "next/link";
import {
  deployments,
  trustItems,
  trustLabels,
} from "@/components/sites/zeonai/content";
import { PageCtaBand, PageHero, PageShell } from "./page-shell";
import { TrustSection } from "./trust-section";

const GOVERNANCE_STEPS = [
  {
    title: "Admin defines roles",
    body: "Set up the roles your teams need, once.",
  },
  {
    title: "Roles map to modules",
    body: "Each role gets only the modules it needs.",
  },
  {
    title: "People see only what their role allows",
    body: "Access is checked before anything is retrieved.",
  },
] as const;

const VISIBILITY = [
  {
    tier: "General",
    see: "Everyone in the organisation",
    act: "The current holder",
  },
  {
    tier: "Protected",
    see: "Roles cleared for protected cases",
    act: "The current holder",
  },
  {
    tier: "Restricted",
    see: "One owner",
    act: "That owner only",
  },
] as const;

export function TrustPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="06 · Governance"
        title="Governed by design, not added afterwards"
        intro="Access control, human review and an audit log are built into every part of AI Workspace, from the first search to the record posted in your ERP."
        dark
      />

      <section className="border-b border-[#DCE1E0] px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
            Access you control
          </p>
          <h2 className="mt-3 max-w-[20ch] font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em] md:text-[36px]">
            Roles, modules and visibility tiers
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {GOVERNANCE_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="list-none zeon-surface p-5"
              >
                <p className="font-mono text-[11px] text-[#0977B3]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-[#5B6766]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#DCE1E0]">
                  <th className="py-3 pr-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A9493]">
                    Tier
                  </th>
                  <th className="py-3 pr-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A9493]">
                    Who can see it
                  </th>
                  <th className="py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A9493]">
                    Who can act
                  </th>
                </tr>
              </thead>
              <tbody>
                {VISIBILITY.map((row) => (
                  <tr key={row.tier} className="border-b border-[#ECECEC]">
                    <td className="py-3 pr-4 font-medium text-[#111318]">
                      {row.tier}
                    </td>
                    <td className="py-3 pr-4 text-[#5B6766]">{row.see}</td>
                    <td className="py-3 text-[#5B6766]">{row.act}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[13px] text-[#5B6766]">
              Administrator override is an explicit permission, not available on
              restricted cases.
            </p>
          </div>
        </div>
      </section>

      {/* Reuse interactive homepage trust demos */}
      <TrustSection />

      <section
        id="security"
        className="scroll-mt-24 border-t border-[#DCE1E0] bg-[#F7F7F7] px-5 py-14 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-[1180px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
            Security and compliance
          </p>
          <h2 className="mt-3 max-w-[22ch] font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em] md:text-[36px]">
            Enterprise-grade security and compliance
          </h2>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.55] text-[#5B6766]">
            Upholding strict data security and privacy standards is at the core
            of everything we do.
          </p>
          {/* TODO: verify certification status with security owner before public claims */}
          <ul className="mt-8 flex flex-wrap gap-2">
            {trustLabels.map((label) => (
              <li
                key={label.name}
                className="zeon-surface px-3 py-2 text-[13px] text-[#111318]"
              >
                <span className="font-medium">{label.name}</span>
                <span className="text-[#8A9493]"> · {label.note}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item) => (
              <article
                key={item.title}
                className="zeon-surface p-5"
              >
                <h3 className="font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-[#5B6766]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
          <blockquote className="mt-12 max-w-[52ch] border-l-2 border-[#0977B3] pl-5 text-[17px] leading-[1.55] text-[#111318]">
            Answers are drawn only from the documents and repositories the
            person can already open, and each one cites its sources. Check an
            output against the source before you act on it.
          </blockquote>
          <div className="mt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              Deployment options
            </p>
            {/* TODO: confirm supported deployment environments with product owner */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {deployments.map((d) => (
                <li
                  key={d}
                  className="zeon-surface px-3 py-2 text-[13px]"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 text-[12px] leading-[1.5] text-[#8A9493]">
            Certification status, encryption implementation, two-factor
            authentication, archiving, disaster recovery, data sovereignty and
            supported deployment environments require confirmation with the
            product/security owner before public launch.
          </p>
          <Link
            href="/engineering"
            className="mt-6 inline-flex text-[14px] font-medium text-[#0977B3] no-underline"
          >
            How engineering enforces governance →
          </Link>
        </div>
      </section>

      <PageCtaBand
        title="Talk through governance for your environment"
        body="Bring your roles, classifications and deployment constraints. We will show how AI Workspace maps to them."
        secondaryHref="/#demo"
        secondaryLabel="Homepage form"
      />
    </PageShell>
  );
}
