"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  caseStudies,
  getCaseStudy,
  type CaseStudy,
} from "@/components/sites/zeonai/content";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { CaseVisual } from "./case-visuals";
import {
  durationEnter,
  easeOut,
  enterYSoft,
  staggerDelay,
} from "../motion";

const themeHero: Record<CaseStudy["heroTheme"], string> = {
  ink: "bg-white text-[var(--zeon-ink)]",
  pale: "bg-white text-[var(--zeon-ink)]",
  paper: "bg-white text-[var(--zeon-ink)]",
  mist: "bg-white text-[var(--zeon-ink)]",
};

type CaseStudyPageProps = {
  slug: string;
};

export function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const study = getCaseStudy(slug);
  const reduceMotion = useReducedMotion() ?? false;

  if (!study) {
    return (
      <div className="v7-site min-h-screen bg-white text-black">
        <SiteHeader />
        <main className="mx-auto max-w-[720px] px-5 py-24 text-center">
          <h1 className="text-[32px] tracking-[-0.03em]">Case study not found</h1>
          <Link
            href="/customers"
            className="mt-6 inline-flex text-[14px] text-[#155EEF]"
          >
            Back to customer stories
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const related = study.related
    .map((s) => getCaseStudy(s))
    .filter((c): c is CaseStudy => Boolean(c));

  return (
    <div className="v7-site min-h-screen bg-white text-[#010F0F]">
      <SiteHeader />
      <main>
        {/* Hero */}
        <header className={`relative overflow-hidden ${themeHero[study.heroTheme]}`}>
          <div className="relative mx-auto grid max-w-[1180px] gap-10 px-5 py-16 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-end md:gap-12 md:px-8 md:py-24">
            <div>
              <Link
                href="/#customers"
                className="inline-flex items-center gap-2 text-[13px] text-[#5B6766] transition hover:text-[#010F0F]"
              >
                <ArrowLeft className="size-3.5" />
                Customer stories
              </Link>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
                {study.industry}
              </p>
              <p className="mt-2 text-[14px] text-[#5B6766]">
                {study.customer}
              </p>
              <h1 className="mt-4 max-w-[18ch] font-[family-name:var(--font-aeonik)] text-[36px] leading-[1.05] tracking-[-0.04em] md:text-[52px]">
                {study.title}
              </h1>
              <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.6] text-[#5B6766] md:text-[17px]">
                {study.summary}
              </p>
              <div className="mt-8 flex flex-wrap items-baseline gap-3">
                <span className="font-[family-name:var(--font-aeonik)] text-[44px] leading-none tracking-[-0.04em] md:text-[56px]">
                  {study.metricShort}
                </span>
                <span className="text-[14px] text-[#5B6766]">
                  {study.metricLabel}
                </span>
              </div>
            </div>
            <div>
              <CaseVisual study={study} />
            </div>
          </div>
        </header>

        {/* Results */}
        <section className="border-b border-[#DCE1E0] bg-white px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5B6766]">
              Results overview
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="zeon-surface-quiet px-4 py-5"
                >
                  <p className="font-[family-name:var(--font-aeonik)] text-[32px] leading-none tracking-[-0.03em] md:text-[36px]">
                    {m.value}
                  </p>
                  <p className="mt-2 text-[13px] text-[#5B6766]">{m.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-[60ch] text-[14px] leading-[1.55] text-[#5B6766]">
              {study.context}
            </p>
          </div>
        </section>

        {/* Challenge */}
        <section className="border-b border-[#DCE1E0] bg-white px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5B6766]">
                The challenge
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[28px] leading-[1.12] tracking-[-0.03em] md:text-[34px]">
                What stood in the way
              </h2>
              <p className="mt-5 text-[16px] leading-[1.65] text-[#5B6766]">
                {study.challenge}
              </p>
            </div>
            <div className="zeon-surface-quiet p-5 md:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5B6766]">
                Before ZeonAI
              </p>
              <ul className="mt-4 space-y-3 text-[14px] leading-[1.5] text-[#010F0F]">
                {challengeBullets(study).map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#5B6766]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="border-b border-[#DCE1E0] bg-[#F6F4EF]/50 px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5B6766]">
              The ZeonAI solution
            </p>
            <h2 className="mt-3 max-w-[22ch] font-[family-name:var(--font-aeonik)] text-[28px] leading-[1.12] tracking-[-0.03em] md:text-[34px]">
              What we deployed
            </h2>
            <p className="mt-2 font-mono text-[12px] text-[#5B6766]">
              {study.products}
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-start md:gap-12">
              <p className="text-[16px] leading-[1.65] text-[#5B6766]">
                {study.deployed}
              </p>
              <CaseVisual study={study} />
            </div>
            <WorkflowStrip study={study} />
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-b border-[#DCE1E0] bg-white px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5B6766]">
              Outcomes
            </p>
            <h2 className="mt-3 max-w-[20ch] font-[family-name:var(--font-aeonik)] text-[28px] leading-[1.12] tracking-[-0.03em] md:text-[34px]">
              What changed
            </h2>
            <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.65] text-[#5B6766]">
              {study.outcome}
            </p>
            <p className="mt-8 max-w-[40ch] font-[family-name:var(--font-aeonik)] text-[22px] leading-[1.25] tracking-[-0.025em] text-[#010F0F] md:text-[26px]">
              {study.metric}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#010F0F] px-5 py-16 text-white md:px-8 md:py-20">
          <div className="mx-auto max-w-[1180px] md:flex md:items-end md:justify-between md:gap-10">
            <div>
              <h2 className="font-[family-name:var(--font-aeonik)] text-[32px] leading-[1.1] tracking-[-0.035em] md:text-[40px]">
                Bring intelligence into your workflows.
              </h2>
              <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.55] text-white/55">
                See AI Workspace on a process that matters to your team — with
                access control and an audit log built in.
              </p>
            </div>
            <Link
              href="/#demo"
              className="zeon-btn zeon-btn-light mt-8 !rounded-[8px] md:mt-0"
            >
              Book a demo
            </Link>
          </div>
        </section>

        {/* Related */}
        <section className="bg-white px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5B6766]">
              Related case studies
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {related.map((r, i) => (
                <motion.div
                  key={r.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: reduceMotion ? 0 : staggerDelay(i),
                    duration: durationEnter,
                    ease: easeOut,
                  }}
                >
                  <Link
                    href={`/customers/${r.slug}`}
                    className="zeon-surface-interactive group flex h-full flex-col p-5"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5B6766]">
                      {r.industry}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-aeonik)] text-[20px] leading-[1.2] tracking-[-0.025em]">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.5] text-[#5B6766]">
                      {r.metric}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-medium text-[#155EEF] transition-[gap] duration-300 ease-out group-hover:gap-2.5">
                      Read case study
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <Link
              href="/customers"
              className="mt-8 inline-flex text-[13px] text-[#5B6766] underline-offset-4 hover:text-[#010F0F] hover:underline"
            >
              View all customer stories
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function challengeBullets(study: CaseStudy): string[] {
  switch (study.visualType) {
    case "document":
      return [
        "Multi-page loan forms needed extensive manual extraction",
        "Validation was slow and error-prone at volume",
        "Approvals waited on paperwork that could not keep pace",
      ];
    case "billing":
      return [
        "Partner fees calculated by hand in SQL and Excel",
        "Several fee types with no consistent audit trail",
        "Disputes and late payments followed every cycle",
      ];
    case "reconciliation":
      return [
        "Employer deposits identified on statements by hand",
        "Batches prepared in spreadsheets and emailed between officers",
        "Exceptions and duplicates were hard to catch early",
      ];
    case "media":
      return [
        "Keyword search missed context across text and audio",
        "Manual summaries were costly and subjective",
        "Reports went out of date before teams could act",
      ];
  }
}

function WorkflowStrip({ study }: { study: CaseStudy }) {
  const steps =
    study.visualType === "document"
      ? ["Ingest form", "DocAI extract", "Validate", "Financial systems"]
      : study.visualType === "billing"
        ? ["Agreements", "Fee calc", "Validate", "ERP post"]
        : study.visualType === "reconciliation"
          ? ["Bank statement", "Match deposit", "Batch file", "Human review"]
          : ["Ingest content", "Summarise", "Semantic search", "Archive query"];

  return (
    <div className="zeon-surface mt-10 p-4 md:p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5B6766]">
        Workflow
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span className="rounded-[2px] border border-[#DCE1E0] bg-[#EAF1FA] px-3 py-1.5 text-[12px] text-[#12345A]">
              {step}
            </span>
            {i < steps.length - 1 ? (
              <span className="text-[#DCE1E0]" aria-hidden>
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CustomersIndexPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const featured = caseStudies[0];
  const rest = caseStudies.slice(1);

  return (
    <div className="v7-site min-h-screen bg-white text-[#010F0F]">
      <SiteHeader />
      <main>
        <header className="relative overflow-hidden bg-white text-[#111318]">
          <div className="relative mx-auto grid max-w-[1180px] gap-10 px-5 py-16 md:grid-cols-2 md:items-end md:gap-14 md:px-8 md:py-24">
            <div>
              <p className="text-[13px] font-medium text-[#5B6766]">
                Customers · {String(caseStudies.length).padStart(2, "0")} case
                studies
              </p>
              <h1 className="mt-4 max-w-[12ch] font-[family-name:var(--font-aeonik)] text-[44px] leading-[1.02] tracking-[-0.045em] md:text-[64px]">
                Evidence from the field.
              </h1>
              <p className="mt-5 max-w-[40ch] text-[17px] leading-[1.55] text-[#5B6766]">
                Deployments across lending, finance and media. Figures require
                business confirmation before public launch.
              </p>
            </div>
            {featured ? (
              <Link
                href={`/customers/${featured.slug}`}
                className="group block border border-[#DCE1E0] bg-[#F6F4EF]/60 p-6 no-underline transition hover:border-[#111318]/25"
              >
                <p className="font-mono text-[11px] text-[#5B6766]">
                  {featured.industry}
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em] text-[#111318]">
                  {featured.title}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.5] text-[#5B6766]">
                  {featured.summary}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-aeonik)] text-[36px] tracking-[-0.03em] text-[#111318]">
                    {featured.metricShort}
                  </span>
                  <span className="text-[12px] text-[#5B6766]">
                    {featured.metricLabel}
                  </span>
                </div>
                <span className="zeon-link-arrow mt-6 inline-flex">
                  Read case study
                </span>
              </Link>
            ) : null}
          </div>
        </header>
        <section className="bg-[var(--zeon-sky)] px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-3">
            {rest.map((study, i) => (
              <motion.div
                key={study.slug}
                initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: reduceMotion ? 0 : staggerDelay(i, 0, 0.08),
                  duration: durationEnter,
                  ease: easeOut,
                }}
              >
                <Link
                  href={`/customers/${study.slug}`}
                  className="group flex h-full flex-col rounded-[12px] border border-[var(--zeon-border-blue)] bg-white p-6 transition-[border-color,box-shadow] duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] hover:border-[var(--zeon-accent)] hover:shadow-[var(--zeon-shadow-elevated)]"
                >
                  <p className="font-mono text-[10px] text-[#5B6766]">
                    {study.industry}
                  </p>
                  <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[22px] leading-[1.15] tracking-[-0.025em]">
                    {study.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[14px] leading-[1.5] text-[#5B6766]">
                    {study.summary}
                  </p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em]">
                      {study.metricShort}
                    </span>
                    <span className="text-[12px] text-[#5B6766]">
                      {study.metricLabel}
                    </span>
                  </div>
                  <span className="zeon-link-arrow mt-6 text-[13px]">
                    Read case study
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
