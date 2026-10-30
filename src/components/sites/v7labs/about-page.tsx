"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { processSteps } from "@/components/sites/zeonai/content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import {
  durationEnter,
  easeOut,
  enterYSoft,
  staggerDelay,
} from "./motion";

const PRINCIPLES = [
  {
    id: "01",
    title: "Proof over promise",
    body: "Every claim has a number, a customer or a certification beside it. If we can't evidence it, we don't say it.",
  },
  {
    id: "02",
    title: "Action and attention",
    body: "Minimise the time something takes and the cognitive load of doing it. The page as much as the product.",
  },
  {
    id: "03",
    title: "People decide",
    body: "Agents extract, match and draft. Anything that changes a record of value goes to a named person first, and the log says who.",
  },
  {
    id: "04",
    title: "Say it once, quietly",
    body: "Short lines, one idea at a time, no superlatives. Name the workflow, give the number, never overclaim.",
  },
] as const;

export function AboutPage() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="v7-site min-h-screen bg-white text-[#111318]">
      <SiteHeader />
      <main>
        <header className="border-b border-[#DCE1E8] bg-[#010F0F] px-5 py-16 text-white md:px-8 md:py-24">
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              About ZeonAI
            </p>
            <h1 className="mt-4 max-w-[16ch] font-[family-name:var(--font-aeonik)] text-[40px] leading-[1.05] tracking-[-0.04em] md:text-[64px]">
              Built with the people who&apos;ll use it.
            </h1>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.55] text-white/60 md:text-[19px]">
              ZeonAI Labs builds AI Workspace, the governed enterprise AI
              platform. Manifest AI is the consulting arm that helps organisations
              discover friction, design agents and take use cases into production
              on the same platform — product and delivery, not two separate
              stacks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#demo"
                className="zeon-btn zeon-btn-light"
              >
                Talk to our team
              </Link>
              <Link
                href="/how-we-work"
                className="zeon-btn zeon-btn-ghost-dark"
              >
                How we work
              </Link>
            </div>
            <dl className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  Presence
                </dt>
                <dd className="mt-2 text-[15px] text-white/75">
                  Brisbane · Perth · Sydney · Melbourne · Pacific · UAE
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  Sectors
                </dt>
                <dd className="mt-2 text-[15px] text-white/75">
                  Financial services · Construction · Public sector · Medtech ·
                  Telco · Property
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="border-b border-[#DCE1E8] px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              Principles
            </p>
            <h2 className="mt-3 max-w-[20ch] font-[family-name:var(--font-aeonik)] text-[32px] leading-[1.1] tracking-[-0.03em] md:text-[44px]">
              Four things we hold ourselves to.
            </h2>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.55] text-[#5B6766]">
              They shape the product, the engagements and this website. If a
              page or a feature breaks one of them, it doesn&apos;t ship.
            </p>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {PRINCIPLES.map((item, i) => (
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
                  <p className="font-mono text-[11px] text-[#8A9493]">
                    {item.id}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-[#5B6766]">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-we-work"
          className="scroll-mt-24 border-b border-[#DCE1E8] px-5 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              How we work
            </p>
            <h2 className="mt-3 max-w-[22ch] font-[family-name:var(--font-aeonik)] text-[32px] leading-[1.1] tracking-[-0.03em] md:text-[44px]">
              From problem to production, in order.
            </h2>
            <p className="mt-4 max-w-[50ch] text-[16px] leading-[1.55] text-[#5B6766]">
              The same three steps on every engagement. Friction moments come
              from the people who live with them, not from a slide.
            </p>
            <ol className="mt-12 grid gap-4 md:grid-cols-3">
              {processSteps.map((step, i) => (
                <motion.li
                  key={step.id}
                  className="list-none zeon-surface p-6"
                  initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: reduceMotion ? 0 : staggerDelay(i),
                    duration: durationEnter,
                    ease: easeOut,
                  }}
                >
                  <p className="font-mono text-[11px] text-[#8A9493]">
                    {step.id}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-[#8A9493]">
                    {step.timing}
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.55] text-[#5B6766]">
                    {step.body}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#F6F4EF] px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[40rem]">
              <h2 className="font-[family-name:var(--font-aeonik)] text-[28px] leading-[1.15] tracking-[-0.03em] md:text-[36px]">
                Ready to move from pilot to production?
              </h2>
              <p className="mt-3 text-[16px] leading-[1.55] text-[#5B6766]">
                Pick one high-value use case. We run a proof of value with
                measurable results and a clear path to scale.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#demo"
                className="zeon-btn zeon-btn-ink"
              >
                Book a demo
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
      </main>
      <SiteFooter />
    </div>
  );
}
