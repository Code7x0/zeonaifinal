"use client";

import Link from "next/link";
import {
  deployments,
  trustItems,
  trustLabels,
} from "@/components/sites/zeonai/content";
import { PageShell } from "./page-shell";
import {
  Chapter,
  ChapterLabel,
  ChapterLead,
  ChapterTitle,
  SecondaryCta,
  SecondaryHero,
} from "./secondary/chapter";
import { AuditMock, GovernanceStack } from "./secondary/product-mocks";

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
      <SecondaryHero
        label="Trust Centre"
        title="Governed by design."
        lead="Access control, human review and an audit log are built into every part of AI Workspace — from the first search to the record posted in your ERP."
        tone="ink"
        visual={<GovernanceStack />}
      />

      <Chapter tone="sky" min={false} className="!min-h-0">
        <ChapterLabel tone="sky">Access you control</ChapterLabel>
        <ChapterTitle>Roles, modules, visibility.</ChapterTitle>
        <ol className="mt-12 grid gap-0 overflow-hidden rounded-[12px] border border-[var(--zeon-border-blue)] bg-white md:grid-cols-3">
          {GOVERNANCE_STEPS.map((step, i) => (
            <li
              key={step.title}
              className={`list-none border-[var(--zeon-border-blue)] p-6 md:p-8 ${
                i < GOVERNANCE_STEPS.length - 1 ? "md:border-r" : ""
              } border-b md:border-b-0`}
            >
              <p className="font-mono text-[12px] text-[var(--zeon-royal)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.5] text-[#5B6766]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter tone="paper" min={false} className="!min-h-0">
        <ChapterLabel>Visibility tiers</ChapterLabel>
        <ChapterLead>
          Who can see a case is separate from who can act on it.
        </ChapterLead>
        <div className="mt-10 overflow-hidden rounded-[12px] border border-[#DCE1E0]">
          <div className="grid grid-cols-3 gap-0 border-b border-[#DCE1E0] bg-[#F6F4EF] px-4 py-3 text-[12px] font-medium text-[#5B6766] md:px-6">
            <span>Tier</span>
            <span>Can see</span>
            <span>Can act</span>
          </div>
          {VISIBILITY.map((row) => (
            <div
              key={row.tier}
              className="grid grid-cols-3 gap-0 border-b border-[#DCE1E0] px-4 py-5 text-[14px] last:border-b-0 md:px-6"
            >
              <span className="font-medium text-[#111318]">{row.tier}</span>
              <span className="text-[#5B6766]">{row.see}</span>
              <span className="text-[#5B6766]">{row.act}</span>
            </div>
          ))}
        </div>
      </Chapter>

      <Chapter tone="ink" min={false} className="!min-h-0">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <ChapterLabel tone="ink">Audit</ChapterLabel>
            <ChapterTitle>A trail you can read, not edit.</ChapterTitle>
            <ChapterLead tone="ink">
              Activity is written as it happens. Watchers can be notified; they
              cannot rewrite the log.
            </ChapterLead>
            <Link
              href="/responsible-ai"
              className="zeon-link-arrow mt-8 inline-flex !text-white"
            >
              Responsible AI
            </Link>
          </div>
          <AuditMock />
        </div>
      </Chapter>

      <Chapter tone="royal" min={false} className="!min-h-0">
        <ChapterLabel tone="royal">Designed for regulated work</ChapterLabel>
        <ChapterTitle>Controls before convenience.</ChapterTitle>
        <ChapterLead tone="royal">
          Classification, residency and audit requirements belong in the first
          conversation — not as an afterthought.
        </ChapterLead>
      </Chapter>

      <Chapter tone="mist" min={false} className="!min-h-0">
        <ChapterLabel tone="mist">Practices from the brief</ChapterLabel>
        <ul className="mt-6 flex flex-wrap gap-2">
          {trustLabels.map((label) => (
            <li
              key={label.name}
              className="rounded-full border border-[var(--zeon-border-blue)] bg-white px-4 py-2 text-[13px]"
            >
              <span className="font-medium">{label.name}</span>
              <span className="text-[#8A9493]"> · {label.note} · to confirm</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[12px] border border-[#DCE1E0] bg-white p-5"
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
        <div className="mt-12">
          <ChapterLabel tone="mist">Deployment options</ChapterLabel>
          <div className="mt-4 flex flex-wrap gap-2">
            {deployments.map((d) => (
              <Link
                key={d}
                href="/deployment"
                className="rounded-full border border-[#DCE1E0] bg-white px-4 py-2 text-[13px] text-[#111318] no-underline transition hover:border-[#1d5fbf]/40"
              >
                {d}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-8 text-[12px] text-[#8A9493]">
          Certification status and environment-specific controls require
          confirmation before stronger public claims.
        </p>
      </Chapter>

      <SecondaryCta
        tone="ink"
        title="Discuss trust requirements"
        body="Bring classification, residency and audit needs into the first conversation."
        secondaryHref="/security"
        secondaryLabel="Security"
      />
    </PageShell>
  );
}
