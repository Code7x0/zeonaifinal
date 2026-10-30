"use client";

import Link from "next/link";
import {
  agentCategories,
  architectureLayers,
  capabilities,
  deployments,
  getCapability,
  integrations,
  processSteps,
  trustItems,
  trustLabels,
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
import { IntegrationPhysics } from "./secondary/integration-physics";

export function ProductsPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Product · Capabilities"
        title="Modules on one governed platform."
        lead="AI Workspace for knowledge, workflows, agents and apps. Open a module — each page pairs the claim with a product surface."
        tone="ink"
        secondaryHref="/platform"
        secondaryLabel="Platform overview"
        visual={<WorkflowMock />}
      />
      <Chapter tone="sky" min={false} className="!min-h-0">
        <ChapterLabel tone="sky">Module index</ChapterLabel>
        <ChapterTitle>Open a capability.</ChapterTitle>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <Link
              key={cap.id}
              href={`/platform/${cap.id}`}
              className="group flex h-full flex-col rounded-[12px] border border-[var(--zeon-border-blue)] bg-white p-6 transition-[border-color,box-shadow] duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] hover:border-[var(--zeon-accent)] hover:shadow-[var(--zeon-shadow-elevated)]"
            >
              <p className="font-mono text-[11px] text-[var(--zeon-royal)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
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

export function AgentLibraryPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Product · Agent library"
        title="Agents by function."
        lead="Portfolio examples from the ZeonAI brief. About 30% in production, about 50% in pilot or developed, about 20% still to be built — maturity varies."
        tone="ink"
        align="center"
      />
      <Chapter tone="paper" min={false} className="!min-h-0">
        <div className="space-y-14">
          {agentCategories.map((cat) => (
            <div key={cat.title}>
              <h2 className="font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em] md:text-[36px]">
                {cat.title}
              </h2>
              <ul className="mt-5 columns-1 gap-3 sm:columns-2 lg:columns-3">
                {cat.agents.map((name) => (
                  <li
                    key={name}
                    className="mb-2 break-inside-avoid rounded-[8px] border border-[#DCE1E0] bg-[#F6F4EF]/60 px-4 py-3 text-[14px] text-[#111318]"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-[52ch] text-[13px] text-[#5B6766]">
          Illustrative catalogue from the product brief — not a guarantee that
          every agent is generally available.
        </p>
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
              className="rounded-[12px] border border-[var(--zeon-border-blue)] bg-white p-6"
            >
              <p className="font-mono text-[11px] text-[var(--zeon-royal)]">
                {layer.id}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em]">
                {layer.title}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#5B6766]">
                {layer.description}
              </p>
              <ul className="mt-4 space-y-1.5">
                {layer.details.map((d) => (
                  <li
                    key={d}
                    className="border-l-2 border-[var(--zeon-accent)]/40 pl-3 text-[13px] leading-[1.45] text-[#5B6766]"
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
        <ChapterLabel tone="sky">Connection map</ChapterLabel>
        <ChapterTitle>Hub and systems of record.</ChapterTitle>
        <ChapterLead tone="sky">
          Drag a node to feel how each system stays linked to AI Workspace.
        </ChapterLead>
        <div className="mt-10">
          <IntegrationPhysics items={integrations} />
        </div>
      </Chapter>
      <Chapter tone="paper" min={false} className="!min-h-0">
        <ChapterLabel>Catalogue</ChapterLabel>
        <ChapterLead>
          Availability depends on the customer environment. Confirm supported
          connectors with the product team before environment-specific claims.
        </ChapterLead>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {integrations.map((name) => (
            <li
              key={name}
              className="rounded-[10px] border border-[var(--zeon-border-blue)] bg-[var(--zeon-sky)] px-4 py-5 text-[15px] font-medium text-[#111318]"
            >
              {name}
            </li>
          ))}
        </ul>
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
        lead="The same three steps on every engagement. Manifest AI — the consulting arm of ZeonAI — runs discovery and delivery beside the product team."
        tone="ink"
        secondaryHref="/about"
        secondaryLabel="About ZeonAI"
      />
      <Chapter tone="paper" min>
        <div className="grid gap-0 md:grid-cols-3">
          {processSteps.map((step, i) => (
            <article
              key={step.id}
              className={`border-[#DCE1E0] p-6 md:p-8 ${
                i < processSteps.length - 1 ? "md:border-r" : ""
              } border-b md:border-b-0`}
            >
              <p className="font-mono text-[12px] text-[#1d5fbf]">{step.id}</p>
              <h2 className="mt-4 font-[family-name:var(--font-aeonik)] text-[32px] tracking-[-0.03em]">
                {step.title}
              </h2>
              <p className="mt-2 text-[13px] text-[#8A9493]">{step.timing}</p>
              <p className="mt-6 text-[16px] leading-[1.55] text-[#5B6766]">
                {step.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-[13px] text-[#5B6766]">
          Timelines are the engagement pattern in the product brief — not a
          contractual guarantee for every project.
        </p>
      </Chapter>
      <Chapter tone="sky" min={false} className="!min-h-0">
        <ChapterLabel tone="sky">Delivery pattern</ChapterLabel>
        <ChapterTitle>Discovery beside the product team.</ChapterTitle>
        <ChapterLead tone="sky">
          Manifest AI runs the engagement. ZeonAI Labs builds the platform both
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
        tone="cream"
        primaryHref="mailto:contact@zeonai.com"
        primaryLabel="contact@zeonai.com"
        secondaryHref="/demo"
        secondaryLabel="Book a demo"
        visual={<AskAiMock />}
      />
      <Chapter tone="paper" min={false} className="!min-h-0">
        <p className="max-w-[48ch] text-[17px] leading-[1.55] text-[#5B6766]">
          Prefer a structured request? Use the demo form — it collects role,
          interest and a short description of your process.
        </p>
        <p className="mt-6 max-w-[48ch] text-[13px] text-[#8A9493]">
          Staging note: the demo form has no submission endpoint configured
          yet. Until it does, email{" "}
          <a href="mailto:contact@zeonai.com" className="zeon-link">
            contact@zeonai.com
          </a>
          .
        </p>
      </Chapter>
    </PageShell>
  );
}

export function SecurityPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Trust · Security"
        title="Security practices, stated carefully."
        lead="Labels below come from the product brief and require confirmation before public certification claims."
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
              <span className="font-medium text-[#111318]">{label.name}</span>
              <span className="text-[#8A9493]"> · {label.note} · to confirm</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[12px] border border-[var(--zeon-border-blue)] bg-white p-5"
            >
              <h2 className="font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em]">
                {item.title}
              </h2>
              <p className="mt-2 text-[14px] leading-[1.55] text-[#5B6766]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-[12px] text-[#8A9493]">
          Verify certification status, encryption, 2FA, archiving, DR and data
          sovereignty with the security owner before stronger public claims.
        </p>
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
            <article key={p.title} className="border-t border-[#DCE1E0] pt-6">
              <p className="font-mono text-[11px] text-[#1d5fbf]">
                0{i + 1}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
                {p.title}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#5B6766]">
                {p.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-[13px] text-[#8A9493]">
          Formal AI ethics policies from related company materials require
          confirmation before publication as ZeonAI product commitments.
        </p>
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
        lead="Options listed in the product brief. Confirm supported configurations with the product owner for each environment."
        tone="cream"
      />
      <Chapter tone="ink" min={false} className="!min-h-0">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {deployments.map((d) => (
            <li
              key={d}
              className="rounded-[12px] border border-white/12 bg-white/[0.04] px-5 py-8 text-center text-[18px] font-medium tracking-[-0.02em] text-white backdrop-blur-sm"
            >
              {d}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[52ch] text-[13px] leading-[1.5] text-white/45">
          Do not treat this list as a guarantee of native support in every
          region or classification. Scope deployment during discovery.
        </p>
      </Chapter>
      <SecondaryCta
        tone="paper"
        title="Talk through deployment constraints"
        body="Residency, private cloud and on-premises needs should be on the table early."
        secondaryHref="/security"
        secondaryLabel="Security"
      />
    </PageShell>
  );
}
