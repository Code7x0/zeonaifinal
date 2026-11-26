"use client";

import type { ReactNode } from "react";
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
import {
  VIDEO_ASSETS,
  VideoSection,
  capabilityVideoId,
  getVideoAsset,
} from "@/components/sites/v7labs/video";

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
              className="zeon-surface-interactive group flex flex-col p-6"
            >
              <p className="font-mono text-[11px] text-[var(--zeon-royal)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em]">
                {cap.title}
              </h2>
              <p className="mt-2 flex-1 text-[14px] leading-[1.5] text-[#535862]">
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
  afterWorkflow,
}: {
  capability: Capability;
  afterWorkflow?: ReactNode;
}) {
  const related = capability.related
    .map((id) => getCapability(id))
    .filter((c): c is Capability => Boolean(c));

  const walkthroughId = capabilityVideoId(capability.id);
  const walkthroughAsset =
    walkthroughId in VIDEO_ASSETS ? getVideoAsset(walkthroughId) : null;
  const hasWalkthrough = Boolean(
    walkthroughAsset?.status === "ready" && walkthroughAsset.src,
  );

  return (
    <PageShell>
      <SecondaryHero
        label={`Capability · ${capability.title}`}
        title={capability.title}
        lead={capability.summary}
        tone="ink"
        align={hasWalkthrough ? "center" : "start"}
        secondaryHref="/platform"
        secondaryLabel="Platform overview"
        visual={hasWalkthrough ? undefined : mockFor(capability.id)}
      />

      {hasWalkthrough && walkthroughAsset ? (
        <Chapter tone="sky" min={false} className="!min-h-0">
          <VideoSection
            assetId={walkthroughId}
            eyebrow="Product walkthrough"
            headline={walkthroughAsset.topic}
            body={walkthroughAsset.description}
            layout="split"
            cta={
              <Link href="/demo" className="zeon-btn zeon-btn-ink">
                Book a demo
              </Link>
            }
          />
        </Chapter>
      ) : null}

      <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#E9EAEB]">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[12px] border border-[#E9EAEB] bg-[#FAFAFA] p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2962FF]">
              01 · The problem
            </p>
            <p className="mt-3 text-[18px] leading-[1.5] tracking-[-0.015em] text-[#181D27] md:text-[20px]">
              {capability.problem}
            </p>
          </div>
          <div className="rounded-[12px] border border-[#E9EAEB] bg-white p-6 shadow-[0_8px_24px_rgba(24,29,39,0.04)] md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2962FF]">
              02 · What it does
            </p>
            <p className="mt-3 text-[18px] leading-[1.5] tracking-[-0.015em] text-[#181D27] md:text-[20px]">
              {capability.does}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#E9EAEB] pt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <ChapterLabel>How the workflow works</ChapterLabel>
              <ChapterTitle>Steps on the platform.</ChapterTitle>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
              {capability.sampleNote}
            </p>
          </div>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {capability.workflow.map((step, i) => (
              <li
                key={step}
                className="flex flex-col justify-between rounded-[10px] border border-[#E9EAEB] bg-white p-5 shadow-[0_1px_2px_rgba(24,29,39,0.04)]"
              >
                <span className="inline-flex size-7 items-center justify-center rounded-[6px] bg-[#EEF4FF] font-mono text-[11px] font-medium text-[#1B46F5]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-4 text-[15px] font-medium leading-[1.45] text-[#181D27]">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Chapter>

      {afterWorkflow}

      <Chapter tone="ink" min={false} className="!min-h-0 border-t border-white/10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
          <div>
            <ChapterLabel tone="ink">Governance</ChapterLabel>
            <h2 className="mt-3 max-w-[26ch] font-[family-name:var(--font-aeonik)] text-[26px] leading-[1.2] tracking-[-0.025em] text-white md:text-[32px]">
              {capability.governance}
            </h2>
            <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.55] text-white/65">
              <span className="font-medium text-white/90">Persona · </span>
              {capability.persona}
            </p>
          </div>
          <div className="min-w-0 overflow-x-auto">
            <AuditMock />
          </div>
        </div>
      </Chapter>

      {related.length > 0 ? (
        <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#E9EAEB]">
          <ChapterLabel>Related capabilities</ChapterLabel>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((cap) => (
              <Link
                key={cap.id}
                href={`/platform/${cap.id}`}
                className="zeon-surface-interactive flex flex-col justify-between p-6"
              >
                <div>
                  <h3 className="font-[family-name:var(--font-aeonik)] text-[19px] tracking-[-0.02em] text-[#181D27]">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.5] text-[#535862]">
                    {cap.summary}
                  </p>
                </div>
                <span className="zeon-link-arrow mt-5 text-[13px]">
                  Explore
                </span>
              </Link>
            ))}
          </div>
        </Chapter>
      ) : null}

      <SecondaryCta
        tone="ink"
        title={`Book a demo of ${capability.title}`}
        body="We will show this capability on a workflow from your role and sector."
        secondaryHref="/products"
        secondaryLabel="All capabilities"
      />
    </PageShell>
  );
}
