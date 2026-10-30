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
import { PageCtaBand, PageHero, PageShell } from "./page-shell";

export function ProductsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Product · Capabilities"
        title="Products and capabilities"
        intro="One platform — AI Workspace — with modules for knowledge, workflows, agents and apps. Each capability below has a dedicated page."
      />
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <Link
              key={cap.id}
              href={`/platform/${cap.id}`}
              className="zeon-surface-interactive flex h-full flex-col p-5"
            >
              <p className="font-mono text-[10px] text-[#8A9493]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-aeonik)] text-[20px] tracking-[-0.02em]">
                {cap.title}
              </h2>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#5B6766]">
                {cap.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <PageCtaBand
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
      <PageHero
        eyebrow="Product · Agent library"
        title="Agents by function"
        intro="Examples from the ZeonAI agent portfolio. Maturity varies — about 30% in production, about 50% developed or in pilot, about 20% still to be developed."
        dark
      />
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px] space-y-10">
          {agentCategories.map((cat) => (
            <div key={cat.title}>
              <h2 className="font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
                {cat.title}
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {cat.agents.map((name) => (
                  <li
                    key={name}
                    className="zeon-surface-quiet px-4 py-3 text-[14px] text-[#111318]"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-[13px] text-[#5B6766]">
            Portfolio list is illustrative of the agent catalogue described in
            the product brief — not a guarantee that every agent is generally
            available.
          </p>
          <Link
            href="/agents"
            className="inline-flex text-[14px] font-medium text-[#0977B3] no-underline"
          >
            How Agent Hub works →
          </Link>
        </div>
      </section>
      <PageCtaBand
        title="Find the right agent for your workflow"
        body="We start with one high-value use case on Agent Hub."
        dark
      />
    </PageShell>
  );
}

export function ArchitecturePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="01 · Architecture"
        title="The platform in one picture"
        intro="Every document moves through the same six layers, from the file you upload to the record in your ERP. The language model can be swapped. The layers underneath are what make the output safe to act on."
        dark
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#architecture"
            className="inline-flex h-10 items-center rounded-full border border-white/20 px-4 text-[13px] text-white no-underline"
          >
            Interactive homepage view
          </Link>
          <Link
            href="/engineering"
            className="inline-flex h-10 items-center rounded-full border border-white/20 px-4 text-[13px] text-white no-underline"
          >
            Engineering detail
          </Link>
        </div>
      </PageHero>
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-2">
          {architectureLayers.map((layer) => (
            <article
              key={layer.key}
              className="zeon-surface p-6"
            >
              <p className="font-mono text-[11px] text-[#0977B3]">{layer.id}</p>
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
                    className="text-[13px] leading-[1.45] text-[#5B6766]"
                  >
                    · {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <PageCtaBand
        title="Walk through the architecture in a demo"
        body="We can show how a document moves through each layer on a workflow from your sector."
      />
    </PageShell>
  );
}

export function IntegrationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Product · Integrations"
        title="Connects to the systems you already run"
        intro="Results go where the work happens: a dashboard, a report, an export file, or your ERP through a connector. The connection you need is scoped and built per engagement — not every connector is assumed available out of the box."
      />
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {integrations.map((name) => (
              <li
                key={name}
                className="zeon-surface px-4 py-4 text-[14px] text-[#111318]"
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[52ch] text-[13px] leading-[1.5] text-[#8A9493]">
            Integration availability depends on the customer environment and
            engagement scope. Confirm supported connectors with the product
            team before publication of environment-specific claims.
          </p>
        </div>
      </section>
      <PageCtaBand
        title="Map your systems of record"
        body="Bring the ERP, inbox or repository that holds the work. We will show how AI Workspace connects."
        secondaryHref="/architecture"
        secondaryLabel="Architecture"
      />
    </PageShell>
  );
}

export function HowWeWorkPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Company · Delivery"
        title="From problem to production, in order"
        intro="The same three steps on every engagement. Friction moments come from the people who live with them. Manifest AI — the consulting arm of ZeonAI — runs discovery and delivery beside the product team."
        dark
      />
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-3">
          {processSteps.map((step) => (
            <article
              key={step.id}
              className="zeon-surface p-6"
            >
              <p className="font-mono text-[11px] text-[#0977B3]">{step.id}</p>
              <h2 className="mt-2 font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
                {step.title}
              </h2>
              <p className="mt-1 text-[12px] text-[#8A9493]">{step.timing}</p>
              <p className="mt-4 text-[15px] leading-[1.55] text-[#5B6766]">
                {step.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-[1180px] text-[13px] text-[#5B6766]">
          Timelines above are the engagement pattern described in the product
          brief — not a contractual guarantee for every project.
        </p>
      </section>
      <PageCtaBand
        title="Start with one use case"
        body="We map the friction, design the agent and human checkpoint, then take one workflow live on AI Workspace."
        dark
        secondaryHref="/about"
        secondaryLabel="About ZeonAI"
      />
    </PageShell>
  );
}

export function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Company · Contact"
        title="Talk to our team"
        intro="Tell us about the workflow or knowledge problem that costs you most. We will arrange a conversation or a demo."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:contact@zeonai.com"
            className="zeon-btn zeon-btn-ink"
          >
            contact@zeonai.com
          </a>
          <Link
            href="/demo"
            className="zeon-btn zeon-btn-ghost"
          >
            Book a demo
          </Link>
        </div>
      </PageHero>
      <section className="px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-[720px] space-y-4 text-[15px] leading-[1.6] text-[#5B6766]">
          <p>
            Prefer a structured request? Use the demo form — it collects role,
            interest and a short description of your process.
          </p>
          <p className="text-[13px] text-[#8A9493]">
            Staging note: the demo form has no submission endpoint configured
            yet. Until it does, email{" "}
            <a href="mailto:contact@zeonai.com" className="zeon-link">
              contact@zeonai.com
            </a>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}

export function SecurityPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Trust · Security"
        title="Security and compliance"
        intro="Upholding strict data security and privacy standards is at the core of everything we do. Labels below come from the product brief and require confirmation before public certification claims."
        dark
      />
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <ul className="flex flex-wrap gap-2">
            {trustLabels.map((label) => (
              <li
                key={label.name}
                className="zeon-surface px-3 py-2 text-[13px]"
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
            TODO: verify certification status, encryption implementation, 2FA,
            archiving, DR and data sovereignty with the security owner.
          </p>
        </div>
      </section>
      <PageCtaBand
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
      body: "Answers are drawn only from documents and repositories the person can already open, and each one cites its sources.",
    },
    {
      title: "Access before retrieval",
      body: "Roles and visibility tiers are checked before anything is retrieved. Matching documents outside access are withheld.",
    },
    {
      title: "Read-only audit",
      body: "Every action is written to an activity log nobody can edit. Watchers are notified but cannot act on the case.",
    },
  ] as const;

  return (
    <PageShell>
      <PageHero
        eyebrow="Trust · Responsible AI"
        title="Governed AI, not bolt-on ethics"
        intro="Responsible use is expressed in product behaviour from the brief: role-based access, citations, human review and an immutable audit trail — not a separate policy brochure."
        dark
      />
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-2">
          {principles.map((p) => (
            <article
              key={p.title}
              className="zeon-surface p-6"
            >
              <h2 className="font-[family-name:var(--font-aeonik)] text-[20px] tracking-[-0.02em]">
                {p.title}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#5B6766]">
                {p.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-[1180px] text-[13px] text-[#8A9493]">
          Formal AI ethics policies, red lines or named accountability roles
          from related company materials require confirmation before being
          published as ZeonAI product commitments.
        </p>
      </section>
      <PageCtaBand
        title="See governance in the product"
        body="A demo can walk through access checks, citations and the audit trail on a real workflow."
        secondaryHref="/engineering"
        secondaryLabel="Engineering"
      />
    </PageShell>
  );
}

export function DeploymentPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Trust · Deployment"
        title="Deployment on your terms"
        intro="Options listed in the product brief. Confirm supported configurations with the product owner for each customer environment."
      />
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {deployments.map((d) => (
              <li
                key={d}
                className="zeon-surface px-4 py-5 text-center text-[15px] font-medium text-[#111318]"
              >
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[52ch] text-[13px] leading-[1.5] text-[#8A9493]">
            Do not treat this list as a guarantee of native support in every
            region or classification. Scope deployment during discovery.
          </p>
        </div>
      </section>
      <PageCtaBand
        title="Talk through deployment constraints"
        body="Residency, private cloud and on-premises needs should be on the table early."
        secondaryHref="/security"
        secondaryLabel="Security"
      />
    </PageShell>
  );
}
