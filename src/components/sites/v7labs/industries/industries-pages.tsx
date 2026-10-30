"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  industries,
  type Industry,
} from "@/components/sites/zeonai/content";
import {
  durationEnter,
  easeOut,
  enterYSoft,
  staggerDelay,
} from "../motion";
import { PageCtaBand, PageHero, PageShell } from "../page-shell";

export function IndustriesIndexPage() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <PageShell>
      <PageHero
        eyebrow="04 · Industries"
        title="Built for regulated, document-heavy sectors"
        intro="The same platform, with agents built for each sector. Examples from our agent portfolio."
      />
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.id}
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
                href={`/industries/${industry.id}`}
                className="zeon-surface-interactive group flex h-full flex-col p-6"
              >
                <h2 className="font-[family-name:var(--font-aeonik)] text-[22px] leading-[1.15] tracking-[-0.025em] text-[#111318]">
                  {industry.label}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.55] text-[#5B6766]">
                  {industry.intro}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A9493]">
                  {industry.platform}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] font-medium text-[#0977B3] transition-[gap] duration-300 ease-out group-hover:gap-2.5">
                  Explore industry
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <PageCtaBand
        title="See the fit for your sector"
        body="Tell us the workflow that costs you most. We will show AI Workspace on a scenario from your industry."
        secondaryHref="/platform"
        secondaryLabel="Platform overview"
      />
    </PageShell>
  );
}

export function IndustryDetailPage({ industry }: { industry: Industry }) {
  return (
    <PageShell>
      <PageHero
        eyebrow={`Industry · ${industry.label}`}
        title={industry.label}
        intro={industry.intro}
        dark
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/industries"
            className="inline-flex h-10 items-center text-[13px] text-white/55 no-underline hover:text-white"
          >
            ← All industries
          </Link>
        </div>
        <dl className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
              Process
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {industry.process.map((step, i) => (
                <span
                  key={step}
                  className="inline-flex items-center gap-2 text-[14px] text-white/75"
                >
                  {i > 0 ? (
                    <ArrowRight className="size-3 text-white/30" aria-hidden />
                  ) : null}
                  {step}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
              Platform
            </dt>
            <dd className="mt-2 text-[14px] text-white/75">{industry.platform}</dd>
          </div>
        </dl>
      </PageHero>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
            Use cases
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em] md:text-[36px]">
            Agents built for this sector
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {industry.useCases.map((uc) => (
              <article
                key={uc.title}
                className="zeon-surface-quiet p-6"
              >
                <h3 className="font-[family-name:var(--font-aeonik)] text-[20px] tracking-[-0.02em]">
                  {uc.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#5B6766]">
                  {uc.body}
                </p>
                <p className="mt-4 text-[13px] text-[#5B6766]">
                  Human review sits on the exceptions and approvals that change
                  a record of value.
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/platform"
              className="zeon-btn zeon-btn-ghost"
            >
              Platform capabilities
            </Link>
            <Link
              href="/customers"
              className="zeon-btn zeon-btn-ghost"
            >
              Case studies
            </Link>
          </div>
        </div>
      </section>

      <PageCtaBand
        title="Book a demo for this industry"
        body="We will walk through a relevant workflow from your sector on AI Workspace."
        dark
        secondaryHref="/engineering"
        secondaryLabel="Engineering"
      />
    </PageShell>
  );
}
