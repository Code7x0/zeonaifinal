"use client";

import Link from "next/link";
import {
  capabilities,
  getCapability,
  type Capability,
} from "@/components/sites/zeonai/content";
import { PageShell } from "../page-shell";
import {
  Chapter,
  ChapterLabel,
  ChapterTitle,
  SecondaryCta,
  SecondaryHero,
} from "../secondary/chapter";
import {
  AskAiMock,
  AuditMock,
  ContractMock,
  WorkflowMock,
} from "../secondary/product-mocks";

function mockFor(id: string) {
  if (id === "ask-ai" || id === "ai-drive" || id === "app-hub") {
    return <AskAiMock />;
  }
  if (id === "contracts") return <ContractMock />;
  if (id === "dashboards" || id.includes("audit")) return <AuditMock />;
  return <WorkflowMock />;
}

export function CapabilitiesIndexPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Capabilities"
        title="How decisions get shaped."
        lead="One platform, every business process, and one place to enhance them — with access control and an audit log built in."
        tone="ink"
        visual={<AskAiMock />}
      />
      <Chapter tone="sky" min={false} className="!min-h-0">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <Link
              key={cap.id}
              href={`/platform/${cap.id}`}
              className="group flex flex-col rounded-[12px] border border-[var(--zeon-border-blue)] bg-white p-6 transition-[border-color,box-shadow] duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] hover:border-[var(--zeon-accent)] hover:shadow-[var(--zeon-shadow-elevated)]"
            >
              <p className="font-mono text-[11px] text-[var(--zeon-royal)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em]">
                {cap.title}
              </h2>
              <p className="mt-2 flex-1 text-[14px] leading-[1.5] text-[#5B6766]">
                {cap.summary}
              </p>
              <span className="zeon-link-arrow mt-6 text-[13px]">
                Open capability
              </span>
            </Link>
          ))}
        </div>
      </Chapter>
      <SecondaryCta
        tone="royal"
        title="See these capabilities in a demo"
        body="Pick the modules that matter to your role."
        secondaryHref="/platform"
        secondaryLabel="Platform overview"
      />
    </PageShell>
  );
}

export function CapabilityDetailPage({
  capability,
}: {
  capability: Capability;
}) {
  const related = capability.related
    .map((id) => getCapability(id))
    .filter((c): c is Capability => Boolean(c));

  return (
    <PageShell>
      <SecondaryHero
        label={`Capability · ${capability.title}`}
        title={capability.title}
        lead={capability.summary}
        tone="ink"
        secondaryHref="/platform"
        secondaryLabel="Platform overview"
        visual={mockFor(capability.id)}
      />

      <Chapter tone="paper" min={false} className="!min-h-0">
        <p className="max-w-[52ch] text-[14px] leading-[1.55] text-[#5B6766]">
          {capability.sampleNote}
        </p>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <ChapterLabel>The problem</ChapterLabel>
            <p className="mt-4 text-[20px] leading-[1.45] tracking-[-0.02em] text-[#111318] md:text-[24px]">
              {capability.problem}
            </p>
          </div>
          <div>
            <ChapterLabel>What it does</ChapterLabel>
            <p className="mt-4 text-[20px] leading-[1.45] tracking-[-0.02em] text-[#111318] md:text-[24px]">
              {capability.does}
            </p>
          </div>
        </div>
      </Chapter>

      <Chapter tone="sky" min={false} className="!min-h-0">
        <ChapterLabel tone="sky">How the workflow works</ChapterLabel>
        <ChapterTitle>Steps on the platform.</ChapterTitle>
        <ol className="mt-10 space-y-0 rounded-[12px] border border-[var(--zeon-border-blue)] bg-white px-5 md:px-8">
          {capability.workflow.map((step, i) => (
            <li
              key={step}
              className="grid grid-cols-[4rem_minmax(0,1fr)] gap-4 border-t border-[var(--zeon-border-blue)] py-6 first:border-t-0"
            >
              <span className="font-mono text-[13px] text-[var(--zeon-royal)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[17px] leading-[1.5] text-[#111318]">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter tone="midnight" min={false} className="!min-h-0">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <ChapterLabel tone="midnight">Governance</ChapterLabel>
            <p className="mt-4 max-w-[40ch] text-[22px] leading-[1.4] tracking-[-0.02em] text-white md:text-[28px]">
              {capability.governance}
            </p>
            <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.55] text-white/55">
              <span className="text-white/80">Persona · </span>
              {capability.persona}
            </p>
          </div>
          <AuditMock />
        </div>
      </Chapter>

      {related.length > 0 ? (
        <Chapter tone="cream" min={false} className="!min-h-0">
          <ChapterLabel tone="cream">Related</ChapterLabel>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {related.map((cap) => (
              <Link
                key={cap.id}
                href={`/platform/${cap.id}`}
                className="rounded-[12px] border border-[var(--zeon-border-blue)] bg-white p-5 transition-[border-color] duration-[var(--zeon-duration-hover)] hover:border-[var(--zeon-accent)]"
              >
                <h3 className="font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em]">
                  {cap.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.5] text-[#5B6766]">
                  {cap.summary}
                </p>
              </Link>
            ))}
          </div>
        </Chapter>
      ) : null}

      <SecondaryCta
        tone="royal"
        title={`Book a demo of ${capability.title}`}
        body="We will show this capability on a workflow from your role and sector."
        secondaryHref="/products"
        secondaryLabel="All capabilities"
      />
    </PageShell>
  );
}
