"use client";

import Link from "next/link";
import {
  architectureLayers,
  capabilities,
  integrations,
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
import {
  ArchitectureRail,
  IntegrationMesh,
  OutputIndex,
} from "./secondary/product-mocks";
import { FadeUp } from "./fade-up";
import { staggerDelay } from "./motion";

const AGENT_SAMPLES = [
  {
    title: "Invoice processing and 3-way match",
    body: "Matches invoices to purchase orders and goods receipts, with people on the exceptions.",
  },
  {
    title: "Mortgage application automation",
    body: "Reads application packs and checks them against lending policy before human approval.",
  },
  {
    title: "Contract intelligence agent",
    body: "Reads clauses, extracts key terms and flags risks for legal review.",
  },
] as const;

export function PlatformPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Product · AI Workspace"
        title="Governed knowledge and workflows on one platform."
        lead="Answers cite every source. Agents move paperwork from inbox to ERP. People approve what matters — with access control and an audit log built in."
        secondaryHref="#capabilities"
        secondaryLabel="See capabilities"
        align="center"
      />

      <Chapter tone="cream" id="capabilities" min={false} className="!min-h-0">
        <ChapterLabel tone="cream">What the platform produces</ChapterLabel>
        <ChapterTitle>Live outputs, not slideware.</ChapterTitle>
        <ChapterLead tone="cream">
          Select an output. The sheet on the right is an HTML product fragment —
          labels and flows from the ZeonAI brief, not invented metrics.
        </ChapterLead>
        <div className="mt-12">
          <OutputIndex />
        </div>
      </Chapter>

      <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#DCE1E0]">
        <div className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
          <ChapterLabel>Modules</ChapterLabel>
          <ChapterTitle className="mx-auto">Capabilities on AI Workspace.</ChapterTitle>
          <ChapterLead>
            Each module has a dedicated page. Start with Ask AI, Drive, or
            Workflows — then expand.
          </ChapterLead>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <FadeUp key={cap.id} delay={staggerDelay(i, 0, 0.04)}>
              <Link
                href={`/platform/${cap.id}`}
                className="zeon-surface-interactive group flex h-full flex-col p-5"
              >
                <span className="font-mono text-[11px] text-[#8A9493]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em]">
                  {cap.title}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-[1.5] text-[#5B6766]">
                  {cap.summary}
                </p>
                <span className="zeon-link-arrow mt-5 text-[13px]">
                  Open module
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </Chapter>

      <Chapter tone="ink" id="architecture" className="!bg-black">
        <ChapterLabel tone="ink">Reference architecture</ChapterLabel>
        <ChapterTitle>Six layers from sources to safe outputs.</ChapterTitle>
        <ChapterLead tone="ink">
          Select a layer to see what it does. The same stack underpins Ask AI,
          agents and audit.
        </ChapterLead>
        <div className="mt-12">
          <ArchitectureRail
            dark
            layers={architectureLayers.map((l) => ({
              id: l.id,
              title: l.title,
              description: l.description,
            }))}
          />
        </div>
        <Link
          href="/architecture"
          className="zeon-link-arrow mt-10 inline-flex !text-white"
        >
          Full architecture page
        </Link>
      </Chapter>

      <Chapter tone="royal" min={false} className="!min-h-0">
        <ChapterLabel tone="royal">Why the stack matters</ChapterLabel>
        <ChapterTitle>Governance is structural, not bolted on.</ChapterTitle>
        <ChapterLead tone="royal">
          Access checks, human review and the audit trail sit in the layers —
          so every module inherits the same controls.
        </ChapterLead>
      </Chapter>

      <Chapter tone="mist" min={false} className="!min-h-0">
        <ChapterLabel tone="mist">Agent Hub</ChapterLabel>
        <ChapterTitle>Agents for the paperwork that piles up.</ChapterTitle>
        <ChapterLead tone="mist">
          Portfolio examples — maturity varies by engagement. People stay on
          the exceptions.
        </ChapterLead>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {AGENT_SAMPLES.map((a) => (
            <article
              key={a.title}
              className="rounded-[12px] border border-[#DCE1E0] bg-white p-6"
            >
              <h3 className="font-[family-name:var(--font-aeonik)] text-[20px] tracking-[-0.02em]">
                {a.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.5] text-[#5B6766]">
                {a.body}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/agents" className="zeon-link-arrow">
            Agent Hub
          </Link>
          <Link href="/agent-library" className="zeon-link-arrow">
            Agent library
          </Link>
        </div>
      </Chapter>

      <Chapter tone="sky" min={false} className="!min-h-0">
        <ChapterLabel tone="sky">Integrations</ChapterLabel>
        <ChapterTitle>Systems of record, connected with care.</ChapterTitle>
        <ChapterLead tone="sky">
          Connectors are scoped per engagement — not a universal plug-and-play
          claim.
        </ChapterLead>
        <div className="mt-12">
          <IntegrationMesh items={integrations} />
        </div>
        <Link href="/integrations" className="zeon-link-arrow mt-8 inline-flex">
          Integration details
        </Link>
      </Chapter>

      <SecondaryCta
        tone="midnight"
        title="See AI Workspace on your workflow."
        body="Bring a process that costs you time. We will show the platform on a scenario from your sector."
        secondaryHref="/products"
        secondaryLabel="All capabilities"
      />
    </PageShell>
  );
}
