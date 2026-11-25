"use client";

import Link from "next/link";
import {
  Landmark,
  BookOpen,
  Factory,
  Scale,
  type LucideIcon,
} from "lucide-react";
import {
  agentCatalogNote,
  agentCategories,
  architectureLayers,
  capabilities,
  deployments,
  getCapability,
  processSteps,
  solutions,
  trustItems,
  trustLabels,
  type AgentCategory,
} from "@/components/sites/zeonai/content";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { cn } from "@/lib/utils";
import {
  Band,
  BlueprintClose,
  Corners,
  DrawingIndex,
  Eyebrow,
  Lead,
  Panel,
  SheetFooter,
  SheetMeta,
  StrokeWord,
  Title,
} from "./blueprint";
import { ModuleGlyph, ProductGlyph } from "./drawing-glyphs";
import { CapabilityDetailPage } from "./capabilities/capability-detail-page";
import { FadeUp } from "./fade-up";
import { PageShell } from "./page-shell";
import {
  Chapter,
  ChapterLabel,
  ChapterLead,
  ChapterTitle,
  SecondaryCta,
  SecondaryHero,
} from "./secondary/chapter";
import { ZeonLinkButton } from "./zeon-ui";
import {
  ArchitectureRail,
  AskAiMock,
  AuditMock,
  GovernanceStack,
  IntegrationMesh,
  WorkflowMock,
} from "./secondary/product-mocks";
import { ArchitectureFlow } from "./secondary/architecture-flow";
import {
  ConnectorLogoCatalogue,
  IntegrationEcosystem,
} from "./integrations/integration-ecosystem";

export function ProductsPage() {
  return (
    <PageShell className="bg-[var(--dp-gray-50)]">
      <FluidParticlesBackground
        tone="zeon"
        particleCount={1100}
        className="min-h-[min(680px,100svh)] border-b border-white/10"
      >
        <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#8EB8FF]">
              Product · Capabilities
            </p>
            <h1 className="mt-4 max-w-[13ch] font-[family-name:var(--font-aeonik)] text-[clamp(2.4rem,1.5rem+3.2vw,3.75rem)] leading-[1.02] tracking-[-0.045em] text-white">
              Modules on one governed platform.
            </h1>
            <p className="mt-5 max-w-[42ch] text-[16px] leading-[1.6] text-white/65">
              Agent Hub products and AI Workspace capabilities — each page pairs
              the claim with a real product surface.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ZeonLinkButton href="/demo" tone="light" size="lg">
                Book a demo
              </ZeonLinkButton>
              <ZeonLinkButton href="/platform" tone="ghost-dark" size="lg">
                Platform overview
              </ZeonLinkButton>
            </div>
          </div>
          <div className="relative border border-white/12 bg-[#0B0B0B]/55 backdrop-blur-sm">
            <Corners tone="light" />
            <dl className="px-5 py-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 md:px-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <dt>DWG</dt>
                <dd className="text-white/70">ZEON-PRD-INDEX</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 py-3">
                <dt>Agent Hub</dt>
                <dd className="text-white/70">{solutions.length} products</dd>
              </div>
              <div className="flex items-center justify-between pt-3">
                <dt>Workspace</dt>
                <dd className="text-white/70">{capabilities.length} modules</dd>
              </div>
            </dl>
          </div>
        </div>
      </FluidParticlesBackground>

      <Band tone="sky" id="agent-hub">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>01 · Agent Hub</Eyebrow>
            <Title>
              Four product{" "}
              <StrokeWord color="var(--zeon-royal)">surfaces.</StrokeWord>
            </Title>
            <Lead>
              Document understanding, invoices, cash-flow visibility and governed
              enterprise search.
            </Lead>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 01 / 03 · Agent Hub
          </p>
        </div>

        <Panel className="mt-12">
          <SheetMeta left="DWG NO. ZEON-PRD-HUB" right="AGENT HUB" />
          <div className="grid md:grid-cols-2">
            {solutions.map((s, i) => (
              <Link
                key={s.id}
                href={s.href}
                className={cn(
                  "group flex flex-col border-b border-[#E5E7EB] p-6 no-underline transition-colors hover:bg-[color-mix(in_srgb,var(--zeon-sky)_65%,white)] md:p-8",
                  "md:odd:border-r",
                  i >= solutions.length - 2 && "md:border-b-0",
                )}
              >
                <DrawingIndex n={i + 1} />
                <div className="mt-5 border border-[#E5E7EB] bg-[var(--dp-gray-50)] px-3 py-2">
                  <ProductGlyph id={s.id} />
                </div>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--zeon-royal)]">
                  {s.brand}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.025em] text-[#181D27] transition-colors group-hover:text-[var(--zeon-royal)] md:text-[24px]">
                  {s.title}
                </h2>
                <p className="mt-2 flex-1 text-[14.5px] leading-[1.55] text-[#535862]">
                  {s.body}
                </p>
                <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[#A4A7AE] transition-colors group-hover:text-[var(--zeon-royal)]">
                  Open product →
                </span>
              </Link>
            ))}
          </div>
          <SheetFooter center="Scale 1:1" right="4 surfaces" />
        </Panel>
      </Band>

      <Band tone="mist" id="workspace">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>02 · AI Workspace</Eyebrow>
            <Title>
              Capabilities on{" "}
              <StrokeWord color="var(--zeon-royal)">AI Workspace.</StrokeWord>
            </Title>
            <Lead>
              Modules share access control, human review and the audit log.
            </Lead>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 02 / 03 · Modules
          </p>
        </div>

        <Panel className="mt-10">
          <SheetMeta
            left="DWG NO. ZEON-PRD-MOD"
            right={`${capabilities.length} MODULES`}
          />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => (
              <li
                key={cap.id}
                className={cn(
                  "list-none border-b border-[#E5E7EB]",
                  "sm:border-r sm:[&:nth-child(2n)]:border-r-0",
                  "lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0",
                )}
              >
                <Link
                  href={`/platform/${cap.id}`}
                  className="group relative flex h-full min-h-[210px] flex-col p-5 no-underline transition-colors hover:bg-white md:p-6"
                >
                  <DrawingIndex n={i + 1} />
                  <div className="mt-4 border border-[#E5E7EB] bg-[var(--dp-gray-50)] px-2 py-2 transition-colors group-hover:border-[var(--zeon-border-blue)]">
                    <ModuleGlyph id={cap.id} />
                  </div>
                  <h2 className="mt-4 font-[family-name:var(--font-aeonik)] text-[20px] tracking-[-0.025em] text-[#181D27] transition-colors group-hover:text-[var(--zeon-royal)]">
                    {cap.title}
                  </h2>
                  <p className="mt-2 flex-1 text-[13.5px] leading-[1.5] text-[#535862]">
                    {cap.summary}
                  </p>
                  <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#A4A7AE] transition-colors group-hover:text-[var(--zeon-royal)]">
                    Open module →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <SheetFooter center="Workspace" right="Tol. ±0.0%" />
        </Panel>
      </Band>

      <Band tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow tone="dark">03 · One platform</Eyebrow>
            <Title tone="dark">
              Every module inherits the same{" "}
              <StrokeWord>controls.</StrokeWord>
            </Title>
            <Lead tone="dark">
              Role-based access, human checkpoints and an audit log are shared
              across Ask AI, Drive, Workflows and Agent Hub.
            </Lead>
          </div>
          <Panel tone="dark">
            <SheetMeta tone="dark" left="DWG NO. ZEON-PRD-CTL" right="CONTROL" />
            <ul className="space-y-0 px-5 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-white/55 md:px-6">
              <li className="flex justify-between border-b border-white/10 py-4">
                <span>Access</span>
                <span className="text-[#8EB8FF]">Roles first</span>
              </li>
              <li className="flex justify-between border-b border-white/10 py-4">
                <span>Checkpoints</span>
                <span className="text-[#8EB8FF]">Human review</span>
              </li>
              <li className="flex justify-between py-4">
                <span>Audit</span>
                <span className="text-[#8EB8FF]">Append only</span>
              </li>
            </ul>
            <SheetFooter tone="dark" right="Sheet 03 / 03" />
          </Panel>
        </div>
      </Band>

      <BlueprintClose
        title="See these capabilities in a demo"
        body="Pick the modules that matter to your role."
        secondaryHref="/platform"
        secondaryLabel="Platform overview"
        sheet="Products / Final"
      />
    </PageShell>
  );
}

import { EngineeringSection } from "./engineering/engineering-section";

export function AgentsPage() {
  const agentHub = getCapability("agent-hub");
  if (agentHub) {
    return (
      <CapabilityDetailPage
        capability={agentHub}
        afterWorkflow={<EngineeringSection />}
      />
    );
  }
  return null;
}

const AGENT_CATEGORY_ICONS: Record<AgentCategory["icon"], LucideIcon> = {
  finance: Landmark,
  lending: Scale,
  operations: Factory,
  knowledge: BookOpen,
};

export function AgentLibraryPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Product · Agent library"
        title="Agents by function."
        lead="Agents grouped by function — each runs a governed workflow with people on the exceptions."
        tone="ink"
        align="center"
      />
      <Chapter tone="paper" min={false} className="!min-h-0">
        <p className="max-w-[60ch] text-[15px] leading-[1.55] text-[#535862]">
          {agentCatalogNote}
        </p>
        <div className="mt-12 space-y-14">
          {agentCategories.map((cat) => {
            const Icon = AGENT_CATEGORY_ICONS[cat.icon];
            return (
              <div key={cat.title}>
                <div className="flex items-center gap-3">
                  <span className="zeon-surface flex size-10 items-center justify-center text-[#1B46F5]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h2 className="font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em] md:text-[36px]">
                    {cat.title}
                  </h2>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.agents.map((agent, ai) => (
                    <FadeUp
                      key={agent.name}
                      delay={Math.min(0.04 * ai, 0.24)}
                      as="li"
                    >
                      <div className="zeon-surface-quiet flex h-full flex-col p-4">
                        <p className="text-[15px] font-medium text-[var(--zeon-ink)]">
                          {agent.name}
                        </p>
                        <p className="mt-2 text-[13px] leading-[1.45] text-[var(--zeon-muted)]">
                          <span className="zeon-type-meta">Reads</span>
                          <br />
                          {agent.reads}
                        </p>
                        <p className="mt-2 text-[13px] leading-[1.45] text-[var(--zeon-muted)]">
                          <span className="zeon-type-meta">Produces</span>
                          <br />
                          {agent.produces}
                        </p>
                      </div>
                    </FadeUp>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <Link href="/agents" className="zeon-link-arrow mt-6 inline-flex">
          How Agent Hub works
        </Link>
      </Chapter>
      <SecondaryCta
        tone="ink"
        title="Find the right agent for your workflow"
        body="We start with one high-value use case on Agent Hub."
      />
    </PageShell>
  );
}

export function ArchitecturePage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Technology · Architecture"
        title="The platform in one picture."
        lead="Every document moves through the same six layers. The language model can be swapped. The layers underneath make the output safe to act on."
        tone="midnight"
        secondaryHref="/#architecture"
        secondaryLabel="Homepage interactive view"
        visual={<AskAiMock />}
      />
      <Chapter tone="ink" min={false} className="!min-h-0">
        <ChapterLabel tone="ink">Interactive stack</ChapterLabel>
        <ChapterTitle>Follow a document through the layers.</ChapterTitle>
        <ChapterLead tone="ink">
          Select a layer. Connections draw in sequence so the stack reads as a
          system — not a list of cards.
        </ChapterLead>
        <div className="mt-12">
          <ArchitectureFlow
            layers={architectureLayers.map((l) => ({
              id: l.id,
              title: l.title,
              description: l.description,
              details: l.details,
            }))}
          />
        </div>
      </Chapter>
      <Chapter tone="sky" min={false} className="!min-h-0">
        <ChapterLabel tone="sky">Layer detail</ChapterLabel>
        <ChapterTitle>What each layer owns.</ChapterTitle>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {architectureLayers.map((layer) => (
            <article
              key={layer.key}
              className="zeon-surface p-6"
            >
              <p className="font-mono text-[11px] text-[var(--zeon-royal)]">
                {layer.id}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em]">
                {layer.title}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#535862]">
                {layer.description}
              </p>
              <ul className="mt-4 space-y-1.5">
                {layer.details.map((d) => (
                  <li
                    key={d}
                    className="border-l-2 border-[var(--zeon-accent)]/40 pl-3 text-[13px] leading-[1.45] text-[#535862]"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <Link href="/engineering" className="zeon-link-arrow mt-10 inline-flex">
          Engineering detail
        </Link>
      </Chapter>
      <SecondaryCta
        tone="royal"
        title="Walk through the architecture in a demo"
        body="We can show how a document moves through each layer on a workflow from your sector."
      />
    </PageShell>
  );
}

export function IntegrationsPage() {
  return (
    <PageShell>
      {/* Hero: connectors graphic first, copy beneath — no chapter labels */}
      <Chapter tone="sky" min={false} className="!min-h-0 pt-10 md:pt-14">
        <IntegrationEcosystem />
        <ChapterTitle className="mt-10 max-w-[22ch]">
          Your systems. One intelligent workspace.
        </ChapterTitle>
        <ChapterLead tone="sky">
          Bring your enterprise systems together through governed AI agents.
          Connect the ERP, data warehouse and document platforms your teams
          already rely on.
        </ChapterLead>
      </Chapter>
      {/* Former hero — catalogue sits just below the connectors hero */}
      <Chapter tone="paper" min={false} className="!min-h-0">
        <ChapterTitle>Systems you already run.</ChapterTitle>
        <ChapterLead>
          Results land in a dashboard, a report, an export, or your ERP.
          Connectors are scoped per engagement — not assumed universal.
        </ChapterLead>
        <div className="mt-10">
          <ConnectorLogoCatalogue />
        </div>
      </Chapter>
      <SecondaryCta
        tone="ink"
        title="Map your systems of record"
        body="Bring the ERP, inbox or repository that holds the work."
        secondaryHref="/architecture"
        secondaryLabel="Architecture"
      />
    </PageShell>
  );
}

export function HowWeWorkPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Company · Delivery"
        title="Problem. Ideation. Solution."
        lead="The same three steps on every engagement. Manifest AI is a channel partner and separate company that runs discovery and delivery beside the ZeonAI Labs product team."
        tone="ink"
        secondaryHref="/about"
        secondaryLabel="About ZeonAI"
      />
      <Chapter tone="paper" min={false} className="!min-h-0">
        <div className="grid gap-0 border border-[var(--zeon-border)] md:grid-cols-3">
          {processSteps.map((step, i) => (
            <FadeUp key={step.id} delay={0.06 * i} as="article">
              <div
                className={`h-full p-6 md:p-8 ${
                  i < processSteps.length - 1 ? "md:border-r md:border-[var(--zeon-border)]" : ""
                } border-b border-[var(--zeon-border)] md:border-b-0`}
              >
                <p className="zeon-type-meta text-[var(--zeon-royal)]">{step.id}</p>
                <h2 className="zeon-type-sub mt-4">{step.title}</h2>
                <p className="mt-2 text-[length:var(--zeon-text-caption)] text-[var(--zeon-muted-soft)]">
                  {step.timing}
                </p>
                <p className="mt-6 text-[length:var(--zeon-text-body)] leading-[var(--zeon-leading-body)] text-[var(--zeon-muted)]">
                  {step.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
        <p className="mt-10 text-[length:var(--zeon-text-caption)] text-[var(--zeon-muted)]">
          Typical timeline; confirmed during discovery.
        </p>
      </Chapter>
      <Chapter tone="sky" min={false} className="!min-h-0">
        <FadeUp>
          <ChapterLabel tone="sky">Delivery pattern</ChapterLabel>
          <ChapterTitle>Discovery beside the product team.</ChapterTitle>
          <ChapterLead tone="sky">
            Manifest AI is a channel partner. ZeonAI Labs builds the platform both
            teams ship on.
          </ChapterLead>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Manifest AI",
                body: "Runs discovery and delivery with your stakeholders.",
              },
              {
                title: "ZeonAI Labs",
                body: "Builds the governed platform both teams ship on.",
              },
              {
                title: "One use case first",
                body: "Map friction, design the agent and checkpoint, then go live.",
              },
            ].map((item) => (
              <li key={item.title} className="zeon-surface p-5">
                <h3 className="text-[15px] font-medium text-[var(--zeon-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.5] text-[var(--zeon-muted)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </Chapter>
      <SecondaryCta
        tone="royal"
        title="Start with one use case"
        body="Map the friction, design the agent and human checkpoint, then take one workflow live."
        secondaryHref="/about"
        secondaryLabel="About ZeonAI"
      />
    </PageShell>
  );
}

import { ContactForm } from "./contact-form";

export function ContactPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Company · Contact"
        title="Talk to our team."
        lead="Tell us about the workflow or knowledge problem that costs you most."
        align="center"
        primaryHref="#contact-form"
        primaryLabel="Send an enquiry"
        secondaryHref="/demo"
        secondaryLabel="Book a demo"
      />
      <Chapter
        id="contact-form"
        tone="mist"
        min={false}
        className="!min-h-0 border-t border-[var(--zeon-border)]"
      >
        <div className="mx-auto grid max-w-[1040px] items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <div className="space-y-4">
            <FadeUp as="article">
              <div className="zeon-surface p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2962FF]">
                  Direct email
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-aeonik)] text-[20px] font-normal tracking-[-0.02em] text-[#181D27]">
                  General enquiry
                </h2>
                <p className="mt-2 text-[length:var(--zeon-text-body-sm)] leading-[var(--zeon-leading-body)] text-[var(--zeon-muted)]">
                  Product questions, partnerships and press — email the team
                  directly.
                </p>
                <a
                  href="mailto:contact@zeonai.com"
                  className="zeon-link-arrow mt-4 inline-flex"
                >
                  contact@zeonai.com
                </a>
              </div>
            </FadeUp>
            <FadeUp delay={0.08} as="article">
              <div className="zeon-surface p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2962FF]">
                  Guided walkthrough
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-aeonik)] text-[20px] font-normal tracking-[-0.02em] text-[#181D27]">
                  Demo request
                </h2>
                <p className="mt-2 text-[length:var(--zeon-text-body-sm)] leading-[var(--zeon-leading-body)] text-[var(--zeon-muted)]">
                  Prefer a structured request with role and process context? Use
                  the demo page.
                </p>
                <Link href="/demo" className="zeon-link-arrow mt-4 inline-flex">
                  Book a demo
                </Link>
              </div>
            </FadeUp>
          </div>

          <ContactForm />
        </div>
      </Chapter>
    </PageShell>
  );
}

export function SecurityPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Trust · Security"
        title="Security practices."
        lead="Access control, encryption, authentication and audit capabilities built into AI Workspace."
        tone="ink"
        visual={<AuditMock />}
      />
      <Chapter tone="sky" min={false} className="!min-h-0">
        <ul className="flex flex-wrap gap-2">
          {trustLabels.map((label) => (
            <li
              key={label.name}
              className="rounded-full border border-[var(--zeon-border-blue)] bg-white px-4 py-2 text-[13px]"
            >
              <span className="font-medium text-[#181D27]">{label.name}</span>
              <span className="text-[var(--zeon-muted-soft)]"> · {label.note}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item, i) => (
            <FadeUp key={item.title} delay={0.04 * i} as="article">
              <div className="zeon-surface h-full p-5">
                <h2 className="text-[18px] font-medium tracking-[-0.02em] text-[var(--zeon-ink)]">
                  {item.title}
                </h2>
                <p className="mt-2 text-[14px] leading-[1.55] text-[var(--zeon-muted)]">
                  {item.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Chapter>
      <SecondaryCta
        title="Discuss controls for your environment"
        body="Bring classification, residency and audit requirements into the conversation."
        secondaryHref="/trust"
        secondaryLabel="Trust Centre"
      />
    </PageShell>
  );
}

export function ResponsibleAiPage() {
  const principles = [
    {
      title: "People decide",
      body: "Agents extract, match and draft. Anything that changes a record of value goes to a named person first, and the log says who.",
    },
    {
      title: "Source-aware answers",
      body: "Answers are drawn only from documents the person can already open, and each one cites its sources.",
    },
    {
      title: "Access before retrieval",
      body: "Roles and visibility tiers are checked before anything is retrieved.",
    },
    {
      title: "Read-only audit",
      body: "Every action is written to an activity log nobody can edit.",
    },
  ] as const;

  return (
    <PageShell>
      <SecondaryHero
        label="Trust · Responsible AI"
        title="Governed AI, not bolt-on ethics."
        lead="Responsible use is product behaviour: role-based access, citations, human review and an immutable audit trail."
        tone="ink"
        visual={<GovernanceStack />}
      />
      <Chapter tone="paper" min={false} className="!min-h-0">
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((p, i) => (
            <FadeUp key={p.title} delay={0.05 * i} as="article">
              <div className="zeon-surface h-full p-6">
                <p className="zeon-type-meta text-[var(--zeon-royal)]">
                  0{i + 1}
                </p>
                <h2 className="zeon-type-sub mt-2">{p.title}</h2>
                <p className="mt-3 text-[length:var(--zeon-text-body-sm)] leading-[var(--zeon-leading-body)] text-[var(--zeon-muted)]">
                  {p.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Chapter>
      <SecondaryCta
        tone="ink"
        title="See governance in the product"
        body="A demo can walk through access checks, citations and the audit trail."
        secondaryHref="/engineering"
        secondaryLabel="Engineering"
      />
    </PageShell>
  );
}

export function DeploymentPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Trust · Deployment"
        title="Deployment on your terms."
        lead="On-premises, private cloud and major public clouds — scoped to your environment."
        tone="cream"
      />
      <Chapter tone="ink" min={false} className="!min-h-0">
        <FadeUp>
          <ChapterLabel tone="ink">Environments</ChapterLabel>
          <ChapterTitle className="text-white">
            Scoped to your residency rules.
          </ChapterTitle>
        </FadeUp>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {deployments.map((d, i) => (
            <FadeUp key={d} delay={0.05 * i} as="li">
              <div className="border border-white/12 bg-white/[0.06] px-5 py-8 text-center text-[length:var(--zeon-text-sub)] font-medium tracking-[-0.02em] text-white">
                {d}
              </div>
            </FadeUp>
          ))}
        </ul>
        <p className="mt-8 max-w-[52ch] text-[length:var(--zeon-text-caption)] leading-[1.5] text-white/45">
          Deployment is scoped during discovery. Controls and audit stay with
          the Trust Centre wherever you host.
        </p>
        <Link href="/trust" className="zeon-link-arrow mt-6 inline-flex text-white">
          Trust Centre
        </Link>
      </Chapter>
      <SecondaryCta
        tone="paper"
        title="Talk through deployment constraints"
        body="Residency, private cloud and on-premises needs should be on the table early."
        secondaryHref="/trust"
        secondaryLabel="Trust Centre"
      />
    </PageShell>
  );
}
