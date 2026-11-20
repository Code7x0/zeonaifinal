"use client";

import Link from "next/link";
import { capabilities, integrations } from "@/components/sites/zeonai/content";
import { cn } from "@/lib/utils";
import {
  Band,
  BlueprintClose,
  DrawingIndex,
  Eyebrow,
  Lead,
  Panel,
  SheetFooter,
  SheetMeta,
  StrokeWord,
  Title,
} from "./blueprint";
import { ModuleGlyph } from "./drawing-glyphs";
import { PageShell } from "./page-shell";
import { ProductVortexHero } from "./product-vortex-hero";
import { ReferenceArchitectureVisual } from "./reference-architecture-visual";
import { IntegrationMesh, OutputIndex } from "./secondary/product-mocks";
import {
  Chapter,
  ChapterLabel,
  ChapterLead,
  ChapterTitle,
} from "./secondary/chapter";
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
    <PageShell className="bg-[var(--dp-gray-50)]">
      <ProductVortexHero
        label="Product · AI Workspace"
        title="Governed knowledge and workflows on one platform."
        lead="Answers cite every source. Agents move paperwork from inbox to ERP. People approve what matters — with access control and an audit log built in."
        secondaryHref="#capabilities"
        secondaryLabel="See capabilities"
      />

      <Chapter
        tone="cream"
        id="capabilities"
        min={false}
        className="!min-h-0 !py-0"
      >
        <OutputIndex
          header={
            <>
              <ChapterLabel tone="cream">What the platform produces</ChapterLabel>
              <ChapterTitle>Live product outputs.</ChapterTitle>
              <ChapterLead tone="cream">
                Scroll through each output. The sheet on the right shows a real
                product surface.
              </ChapterLead>
            </>
          }
        />
      </Chapter>

      {/* Modules — white sheet + elevated dark cells (no radius) */}
      <Band tone="paper" id="modules" className="!bg-[var(--dp-gray-50)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Modules</Eyebrow>
            <Title>
              Capabilities on{" "}
              <StrokeWord color="var(--zeon-royal)">AI Workspace.</StrokeWord>
            </Title>
            <Lead>
              Each module has a dedicated page. Start with Ask AI, Drive, or
              Workflows — then expand.
            </Lead>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 01 · {capabilities.length} modules
          </p>
        </div>

        <Panel className="mt-12 !border-[#E5E7EB] !bg-white">
          <SheetMeta
            left="DWG NO. ZEON-PLT-MOD"
            right={`${capabilities.length} CAPABILITIES`}
          />
          <ul className="grid gap-3 p-3 sm:grid-cols-2 sm:gap-3 sm:p-4 lg:grid-cols-3">
            {capabilities.map((cap, i) => (
              <li key={cap.id} className="list-none">
                <Link
                  href={`/platform/${cap.id}`}
                  className={cn(
                    "group relative flex h-full min-h-[220px] flex-col rounded-none border border-[#E5E7EB] bg-white p-5 no-underline md:p-6",
                    "shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_14px_32px_-22px_rgba(24,29,39,0.35),0_0_0_1px_rgba(24,29,39,0.04)]",
                    "transition-[transform,box-shadow,border-color,background-color] duration-300",
                    "hover:-translate-y-0.5 hover:border-[var(--zeon-royal)] hover:bg-[var(--dp-gray-50)]",
                    "hover:shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_22px_44px_-24px_rgba(24,29,39,0.4),0_0_0_1px_color-mix(in_srgb,var(--zeon-royal)_25%,transparent)]",
                  )}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                  >
                    <i className="absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-[var(--zeon-royal)]" />
                    <i className="absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-[var(--zeon-royal)]" />
                    <i className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-[var(--zeon-royal)]" />
                    <i className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-[var(--zeon-royal)]" />
                  </span>
                  <DrawingIndex n={i + 1} />
                  <div className="mt-5 border border-[#E5E7EB] bg-[var(--dp-gray-50)] px-2 py-2 transition-colors group-hover:border-[var(--zeon-border-blue)]">
                    <ModuleGlyph id={cap.id} />
                  </div>
                  <h3 className="mt-5 font-[family-name:var(--font-aeonik)] text-[21px] tracking-[-0.025em] text-[#181D27] transition-colors group-hover:text-[var(--zeon-royal)]">
                    {cap.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-[1.5] text-[#535862]">
                    {cap.summary}
                  </p>
                  <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680] transition-colors group-hover:text-[var(--zeon-royal)]">
                    Open module →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <SheetFooter center="Scale 1:1" right="Tol. ±0.0%" />
        </Panel>
      </Band>

      <Band tone="ink" id="architecture">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <div>
            <Eyebrow tone="dark">Reference architecture</Eyebrow>
            <Title tone="dark">
              Six layers from sources to{" "}
              <StrokeWord>safe outputs.</StrokeWord>
            </Title>
            <Lead tone="dark">
              Connectors, governed knowledge, agents, runtime, calculation, and
              outputs sit on one stack.
            </Lead>
            <Link
              href="/architecture"
              className="zeon-link-arrow mt-8 inline-flex !text-white"
            >
              View architecture
            </Link>
          </div>
          <Panel tone="dark" className="p-3 md:p-4">
            <ReferenceArchitectureVisual className="w-full" />
          </Panel>
        </div>
      </Band>

      <Band tone="mist">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Agent Hub</Eyebrow>
            <Title>Agents for the paperwork that piles up.</Title>
            <Lead>
              Repeatable agents for document-heavy work. People stay on the
              exceptions.
            </Lead>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 02 · Agents
          </p>
        </div>

        <Panel className="mt-12">
          <SheetMeta left="DWG NO. ZEON-PLT-AGT" right="SAMPLES" />
          <div className="grid md:grid-cols-3 md:divide-x md:divide-[#E5E7EB]">
            {AGENT_SAMPLES.map((a, i) => (
              <article
                key={a.title}
                className="border-b border-[#E5E7EB] p-6 last:border-b-0 md:border-b-0 md:p-7"
              >
                <DrawingIndex n={i + 1} />
                <h3 className="mt-5 font-[family-name:var(--font-aeonik)] text-[20px] tracking-[-0.02em] text-[#181D27]">
                  {a.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.5] text-[#535862]">
                  {a.body}
                </p>
              </article>
            ))}
          </div>
          <SheetFooter
            center={
              <span className="flex gap-4">
                <Link href="/agents" className="text-[var(--zeon-royal)] no-underline">
                  Agent Hub
                </Link>
                <Link
                  href="/agent-library"
                  className="text-[var(--zeon-royal)] no-underline"
                >
                  Library
                </Link>
              </span>
            }
          />
        </Panel>
      </Band>

      <Band tone="paper" className="!bg-[#F3F5F8]">
        <Eyebrow>Integrations</Eyebrow>
        <Title>Systems of record, connected with care.</Title>
        <Lead>Connectors are scoped per engagement.</Lead>
        <Panel
          tone="glass"
          className="mt-10 !rounded-none !border-white/20 !bg-[rgba(8,10,14,0.42)] !shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_24px_48px_-28px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <SheetMeta
            tone="dark"
            className="!border-white/20 !text-white"
            left="DWG NO. ZEON-PLT-INT"
            right="CONNECTORS"
          />
          <div className="p-5 md:p-7">
            <IntegrationMesh items={integrations} />
          </div>
          <SheetFooter
            tone="dark"
            className="!border-white/20 !text-white"
            right={
              <Link href="/integrations" className="text-[#8EB8FF] no-underline">
                Integration details →
              </Link>
            }
          />
        </Panel>
      </Band>

      <BlueprintClose
        title="See AI Workspace on your workflow."
        body="Bring a process that costs you time. We will show the platform on a scenario from your sector."
        secondaryHref="/products"
        secondaryLabel="All capabilities"
        sheet="Platform / Final"
      />
    </PageShell>
  );
}
