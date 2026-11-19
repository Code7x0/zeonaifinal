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
import { CapabilityDetailPage } from "./capabilities/capability-detail-page";
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
    <PageShell>
      <SecondaryHero
        label="Product · Capabilities"
        title="Modules on one governed platform."
        lead="Agent Hub products and AI Workspace capabilities — each page pairs the claim with a real product surface."
        align="center"
        secondaryHref="/platform"
        secondaryLabel="Platform overview"
      />
      <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#E9EAEB]">
        <ChapterLabel>Agent Hub</ChapterLabel>
        <ChapterTitle>Four product surfaces.</ChapterTitle>
        <ChapterLead>
          Document understanding, invoices, cash-flow visibility and governed
          enterprise search.
        </ChapterLead>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {solutions.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className="zeon-surface-interactive group flex h-full flex-col p-6 no-underline"
            >
              <p className="font-mono text-[11px] text-[#1B46F5]">{s.brand}</p>
              <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em] text-[#181D27]">
                {s.title}
              </h2>
              <p className="mt-2 flex-1 text-[14px] leading-[1.5] text-[#535862]">
                {s.body}
              </p>
              <span className="zeon-link-arrow mt-6 text-[13px]">Open product</span>
            </Link>
          ))}
        </div>
      </Chapter>
      <Chapter tone="sky" min={false} className="!min-h-0">
        <ChapterLabel tone="sky">AI Workspace modules</ChapterLabel>
        <ChapterTitle>Open a capability.</ChapterTitle>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <Link
              key={cap.id}
              href={`/platform/${cap.id}`}
              className="zeon-surface-interactive group flex h-full flex-col p-6"
            >
              <p className="font-mono text-[11px] text-[#1B46F5]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
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
      <Chapter tone="blue" min={false} className="!min-h-0">
        <ChapterLabel tone="blue">One platform</ChapterLabel>
        <ChapterTitle>Every module inherits the same controls.</ChapterTitle>
        <ChapterLead tone="blue">
          Role-based access, human checkpoints and an audit log are shared
          across Ask AI, Drive, Workflows and Agent Hub.
        </ChapterLead>
      </Chapter>
      <SecondaryCta
        tone="ink"
        title="See these capabilities in a demo"
        body="Pick the modules that matter to your role."
        secondaryHref="/platform"
        secondaryLabel="Platform overview"
      />
    </PageShell>
  );
}

export function AgentsPage() {
  const agentHub = getCapability("agent-hub");
  if (agentHub) {
    return <CapabilityDetailPage capability={agentHub} />;
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
                  {cat.agents.map((agent) => (
                    <li
                      key={agent.name}
                      className="zeon-surface-quiet flex h-full flex-col p-4"
                    >
                      <p className="text-[15px] font-medium text-[#181D27]">
                        {agent.name}
                      </p>
                      <p className="mt-2 text-[13px] leading-[1.45] text-[#535862]">
                        <span className="font-mono text-[11px] uppercase tracking-wide text-[#8A9493]">
                          Reads
                        </span>
                        <br />
                        {agent.reads}
                      </p>
                      <p className="mt-2 text-[13px] leading-[1.45] text-[#535862]">
                        <span className="font-mono text-[11px] uppercase tracking-wide text-[#8A9493]">
                          Produces
                        </span>
                        <br />
                        {agent.produces}
                      </p>
                    </li>
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
      <SecondaryHero
        label="Product · Integrations"
        title="Systems you already run."
        lead="Results land in a dashboard, a report, an export, or your ERP. Connectors are scoped per engagement — not assumed universal."
        tone="royal"
        visual={<WorkflowMock />}
      />
      <Chapter tone="sky" min={false} className="!min-h-0">
        <ChapterLabel tone="sky">09 · Connectors</ChapterLabel>
        <ChapterTitle>Your systems. One intelligent workspace.</ChapterTitle>
        <ChapterLead tone="sky">
          Bring your enterprise systems together through governed AI agents.
          Connect the ERP, data warehouse and document platforms your teams
          already rely on.
        </ChapterLead>
        <div className="mt-10">
          <IntegrationEcosystem />
        </div>
      </Chapter>
      <Chapter tone="paper" min={false} className="!min-h-0">
        <ChapterLabel>Catalogue</ChapterLabel>
        <ChapterLead>Connectors are scoped per engagement.</ChapterLead>
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
      <Chapter tone="paper" min>
        <div className="grid gap-0 md:grid-cols-3">
          {processSteps.map((step, i) => (
            <article
              key={step.id}
              className={`border-[#E9EAEB] p-6 md:p-8 ${
                i < processSteps.length - 1 ? "md:border-r" : ""
              } border-b md:border-b-0`}
            >
              <p className="font-mono text-[12px] text-[#1d5fbf]">{step.id}</p>
              <h2 className="mt-4 font-[family-name:var(--font-aeonik)] text-[32px] tracking-[-0.03em]">
                {step.title}
              </h2>
              <p className="mt-2 text-[13px] text-[#8A9493]">{step.timing}</p>
              <p className="mt-6 text-[16px] leading-[1.55] text-[#535862]">
                {step.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-[13px] text-[#535862]">
          Typical timeline; confirmed during discovery.
        </p>
      </Chapter>
      <Chapter tone="sky" min={false} className="!min-h-0">
        <ChapterLabel tone="sky">Delivery pattern</ChapterLabel>
        <ChapterTitle>Discovery beside the product team.</ChapterTitle>
        <ChapterLead tone="sky">
          Manifest AI is a channel partner. ZeonAI Labs builds the platform both
          teams ship on.
        </ChapterLead>
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

export function ContactPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Company · Contact"
        title="Talk to our team."
        lead="Tell us about the workflow or knowledge problem that costs you most."
        align="center"
        primaryHref="mailto:contact@zeonai.com"
        primaryLabel="Email contact@zeonai.com"
        secondaryHref="/demo"
        secondaryLabel="Book a demo"
      />
      <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#E9EAEB]">
        <div className="mx-auto grid max-w-[900px] gap-8 md:grid-cols-2">
          <article className="border-t border-[#E9EAEB] pt-6">
            <h2 className="font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
              General enquiry
            </h2>
            <p className="mt-3 text-[15px] leading-[1.55] text-[#535862]">
              Product questions, partnerships and press — email the team
              directly.
            </p>
            <a
              href="mailto:contact@zeonai.com"
              className="zeon-link-arrow mt-5 inline-flex"
            >
              contact@zeonai.com
            </a>
          </article>
          <article className="border-t border-[#E9EAEB] pt-6">
            <h2 className="font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
              Demo request
            </h2>
            <p className="mt-3 text-[15px] leading-[1.55] text-[#535862]">
              Prefer a structured request with role and process context? Use
              the demo page.
            </p>
            <Link href="/demo" className="zeon-link-arrow mt-5 inline-flex">
              Book a demo
            </Link>
          </article>
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
              <h2 className="font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em]">
                {item.title}
              </h2>
              <p className="mt-2 text-[14px] leading-[1.55] text-[#535862]">
                {item.body}
              </p>
            </article>
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
        <div className="grid gap-6 md:grid-cols-2">
          {principles.map((p, i) => (
            <article key={p.title} className="border-t border-[#E9EAEB] pt-6">
              <p className="font-mono text-[11px] text-[#1d5fbf]">
                0{i + 1}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
                {p.title}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#535862]">
                {p.body}
              </p>
            </article>
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
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {deployments.map((d) => (
            <li
              key={d}
              className="zeon-glass-float border-white/12 bg-[rgba(255,255,255,0.08)] px-5 py-8 text-center text-[18px] font-medium tracking-[-0.02em] text-white"
            >
              {d}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[52ch] text-[13px] leading-[1.5] text-white/45">
          Deployment is scoped during discovery.
        </p>
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
