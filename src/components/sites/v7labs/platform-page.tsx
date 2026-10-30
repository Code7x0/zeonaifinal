"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  architectureLayers,
  capabilities,
  integrations,
} from "@/components/sites/zeonai/content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import {
  durationEnter,
  easeOut,
  enterYSoft,
  staggerDelay,
} from "./motion";
import { SmoothScroll } from "./smooth-scroll";

const HIGHLIGHTS = [
  {
    id: "ask-ai",
    title: "Ask AI",
    body: "A persona-aware copilot that answers from your documents, with citations and access-aware filtering.",
  },
  {
    id: "ai-drive",
    title: "AI Drive",
    body: "Governed documents with versions, lineage, indexing and permissions.",
  },
  {
    id: "workflows",
    title: "Workflows",
    body: "Steps, approvals and an audit trail, with agents and people working together.",
  },
] as const;

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
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <SmoothScroll>
    <div className="v7-site min-h-screen bg-white text-[#111318]">
      <SiteHeader />
      <main>
        <header className="border-b border-[#DCE1E8] bg-[#010F0F] px-5 py-16 text-white md:px-8 md:py-24">
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              Product · AI Workspace
            </p>
            <h1 className="mt-4 max-w-[18ch] font-[family-name:var(--font-aeonik)] text-[40px] leading-[1.05] tracking-[-0.04em] md:text-[64px]">
              The governed AI platform for enterprise knowledge and workflows.
            </h1>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.55] text-white/60 md:text-[19px]">
              AI Workspace answers questions from your own documents and cites
              every source. Its agents read, check and route the paperwork
              behind a process, from the inbox to your ERP, and people approve
              what matters. Access control and an audit log are part of the
              platform, not an add-on.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="zeon-btn zeon-btn-light"
              >
                Book a demo
              </Link>
              <a
                href="#capabilities"
                className="zeon-btn zeon-btn-ghost-dark"
              >
                See capabilities
              </a>
            </div>
          </div>
        </header>

        <section
          id="capabilities"
          className="scroll-mt-24 border-b border-[#DCE1E8] px-5 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              02 · Capabilities
            </p>
            <h2 className="mt-3 max-w-[22ch] font-[family-name:var(--font-aeonik)] text-[32px] leading-[1.1] tracking-[-0.03em] md:text-[44px]">
              How ZeonAI is shaping decisions across the enterprise
            </h2>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.55] text-[#5B6766]">
              One platform, every business process, and one place to enhance
              them.
            </p>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.id}
                  initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: reduceMotion ? 0 : staggerDelay(i, 0, 0.06),
                    duration: durationEnter,
                    ease: easeOut,
                  }}
                >
                  <Link
                    href={`/platform/${cap.id}`}
                    className="zeon-surface-interactive flex h-full flex-col p-5"
                  >
                    <p className="font-mono text-[10px] text-[#8A9493]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em]">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.5] text-[#5B6766]">
                      {cap.summary}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="ask"
          className="scroll-mt-24 border-b border-[#DCE1E8] px-5 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              Introducing
            </p>
            <h2 className="mt-3 max-w-[22ch] font-[family-name:var(--font-aeonik)] text-[32px] leading-[1.1] tracking-[-0.03em] md:text-[44px]">
              Where your people and your agents work in the same place.
            </h2>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.55] text-[#5B6766]">
              Search across every governed source, open a document with its full
              lineage, ask a question and get an answer with the evidence beside
              it. Files, reports and dashboards created in real time.
            </p>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {HIGHLIGHTS.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="zeon-surface-quiet p-6"
                  initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: reduceMotion ? 0 : staggerDelay(i),
                    duration: durationEnter,
                    ease: easeOut,
                  }}
                >
                  <h3 className="font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-[#5B6766]">
                    {item.body}
                  </p>
                  <Link
                    href={`/platform/${item.id}`}
                    className="mt-4 inline-flex text-[13px] font-medium text-[#0977B3] no-underline"
                  >
                    Open capability →
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="agent-hub"
          className="scroll-mt-24 border-b border-[#DCE1E8] bg-[#F6F4EF] px-5 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              Agent Hub
            </p>
            <h2 className="mt-3 max-w-[24ch] font-[family-name:var(--font-aeonik)] text-[32px] leading-[1.1] tracking-[-0.03em] md:text-[44px]">
              Agents that plan, extract, match and act — with people on the
              exceptions.
            </h2>
            <p className="mt-4 max-w-[50ch] text-[16px] leading-[1.55] text-[#5B6766]">
              Start from a pre-built agent or build one on the same platform. An
              agent can read, match and draft on its own. Anything that changes
              a record of value goes to a named person first.
            </p>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {AGENT_SAMPLES.map((agent, i) => (
                <motion.div
                  key={agent.title}
                  className="zeon-surface p-6"
                  initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: reduceMotion ? 0 : staggerDelay(i),
                    duration: durationEnter,
                    ease: easeOut,
                  }}
                >
                  <h3 className="font-[family-name:var(--font-aeonik)] text-[20px] tracking-[-0.02em]">
                    {agent.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-[#5B6766]">
                    {agent.body}
                  </p>
                </motion.div>
              ))}
            </div>
            <p className="mt-6 text-[13px] text-[#5B6766]">
              Portfolio note from the product brief: about 30% in production,
              about 50% developed or in pilot, about 20% still to be developed.
            </p>
            <Link
              href="/platform/agent-hub"
              className="mt-4 inline-flex text-[14px] font-medium text-[#0977B3] no-underline"
            >
              Agent Hub detail →
            </Link>
          </div>
        </section>

        <section
          id="architecture"
          className="scroll-mt-24 border-b border-[#DCE1E8] px-5 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              01 · Architecture
            </p>
            <h2 className="mt-3 max-w-[22ch] font-[family-name:var(--font-aeonik)] text-[32px] leading-[1.1] tracking-[-0.03em] md:text-[44px]">
              The platform in one picture
            </h2>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.55] text-[#5B6766]">
              Every document moves through the same six layers, from the file
              you upload to the record in your ERP. The language model can be
              swapped. The layers underneath are what make the output safe to
              act on.
            </p>
            <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {architectureLayers.map((layer, i) => (
                <motion.div
                  key={layer.key}
                  className="zeon-surface p-5"
                  initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: reduceMotion ? 0 : staggerDelay(i, 0, 0.08),
                    duration: durationEnter,
                    ease: easeOut,
                  }}
                >
                  <p className="font-mono text-[11px] text-[#8A9493]">
                    {layer.id}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em]">
                    {layer.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#5B6766]">
                    {layer.description}
                  </p>
                </motion.div>
              ))}
            </div>
            <Link
              href="/#architecture"
              className="mt-8 inline-flex text-[14px] font-medium text-[#0977B3] no-underline"
            >
              Interactive architecture on the homepage →
            </Link>
            <Link
              href="/engineering"
              className="mt-3 ml-0 block text-[14px] font-medium text-[#0977B3] no-underline md:ml-6 md:inline-flex"
            >
              Engineering under the hood →
            </Link>
          </div>
        </section>

        <section
          id="integrations"
          className="scroll-mt-24 border-b border-[#DCE1E8] bg-[#F6F4EF] px-5 py-16 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              Integrations
            </p>
            <h2 className="mt-3 max-w-[20ch] font-[family-name:var(--font-aeonik)] text-[32px] leading-[1.1] tracking-[-0.03em] md:text-[40px]">
              Connects to the systems you already run.
            </h2>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.55] text-[#5B6766]">
              Results go where the work happens: a dashboard, a report, an
              export file, or your ERP through a connector. Connection scope is
              confirmed per engagement.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {integrations.map((name) => (
                <li
                  key={name}
                  className="zeon-surface px-4 py-3 text-[14px] text-[#111318]"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#010F0F] px-5 py-16 text-white md:px-8 md:py-20">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[40rem]">
              <h2 className="font-[family-name:var(--font-aeonik)] text-[28px] leading-[1.15] tracking-[-0.03em] md:text-[36px]">
                Book a demo
              </h2>
              <p className="mt-3 text-[16px] leading-[1.55] text-white/55">
                See AI Workspace on a workflow that matters to you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="zeon-btn zeon-btn-light"
              >
                Book a demo
              </Link>
              <Link
                href="/engineering"
                className="zeon-btn zeon-btn-ghost-dark"
              >
                Engineering
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
    </SmoothScroll>
  );
}
