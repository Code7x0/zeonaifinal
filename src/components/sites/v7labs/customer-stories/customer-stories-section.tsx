"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { caseStudies } from "@/components/sites/zeonai/content";
import { durationEnter, easeOut, enterY, viewportOnce } from "../motion";
import { CaseVisual } from "./case-visuals";

const [featured, secondary, wide, compact] = caseStudies;

/** Homepage bento: two black, two royal blue — checkerboard for contrast. */
type CardTone = "black" | "royal";

const cardTone: Record<"featured" | "secondary" | "compact" | "wide", CardTone> =
  {
    featured: "black",
    secondary: "royal",
    compact: "black",
    wide: "royal",
  };

const toneSurface: Record<CardTone, string> = {
  black: "bg-[#151922] text-white border-[#151922]",
  royal: "bg-[#245BDB] text-white border-[#245BDB]",
};

export function CustomerStoriesSection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="customers"
      className="relative scroll-mt-24 overflow-hidden border-t border-[#DCE1E8] bg-white text-[#111318]"
      aria-labelledby="customers-heading"
    >
      <div className="relative mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        <motion.div
          className="max-w-[40rem]"
          initial={reduceMotion ? false : { opacity: 0, y: enterY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: durationEnter, ease: easeOut }}
        >
          <h2
            id="customers-heading"
            className="font-[family-name:var(--font-aeonik)] text-[36px] leading-[1.06] tracking-[-0.035em] md:text-[52px]"
          >
            Customers and case studies
          </h2>
          <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.6] text-[#697386] md:text-[17px]">
            Real deployments across lending, finance and media, with the results
            each one delivered.
          </p>
          <p className="mt-3 max-w-[48ch] text-[12px] leading-[1.45] text-[#97A0AE]">
            Outcome figures from selected deployments — confirm before public
            launch.
          </p>
          <Link href="/customers" className="zeon-link-arrow mt-5">
            See all case studies
            <ArrowUpRight className="size-3.5" />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-5">
          {featured ? (
            <article
              className={`group relative flex flex-col overflow-hidden rounded-[10px] border shadow-[var(--zeon-shadow-soft)] transition-[box-shadow] duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] hover:shadow-[var(--zeon-shadow-elevated)] md:col-span-7 md:row-span-2 ${toneSurface[cardTone.featured]}`}
            >
              <Link
                href={`/customers/${featured.slug}`}
                className="flex h-full flex-col p-5 md:p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                    {featured.industry}
                  </span>
                  <span className="font-mono text-[10px] text-white/30">·</span>
                  <span className="text-[12px] text-white/55">
                    {featured.customer}
                  </span>
                </div>
                <h3 className="mt-4 max-w-[18ch] font-[family-name:var(--font-aeonik)] text-[26px] leading-[1.12] tracking-[-0.03em] md:text-[32px]">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.55] text-white/55">
                  {featured.summary}
                </p>
                <div className="mt-6">
                  <p className="font-[family-name:var(--font-aeonik)] text-[40px] leading-none tracking-[-0.04em] text-white md:text-[52px]">
                    {featured.metricShort}
                  </p>
                  <p className="mt-2 text-[13px] text-white/45">
                    {featured.metricLabel}
                  </p>
                </div>
                <div className="mt-6 rounded-[3px] bg-white/95 p-1">
                  <CaseVisual study={featured} />
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] font-medium text-white transition-[gap] duration-300 ease-out group-hover:gap-2.5">
                  Read case study
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </article>
          ) : null}

          {secondary ? (
            <article
              className={`group relative flex flex-col overflow-hidden rounded-[10px] border shadow-[var(--zeon-shadow-soft)] transition-[box-shadow] duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] hover:shadow-[var(--zeon-shadow-elevated)] md:col-span-5 ${toneSurface[cardTone.secondary]}`}
            >
              <Link
                href={`/customers/${secondary.slug}`}
                className="flex h-full flex-col p-5 md:p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {secondary.industry}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[20px] leading-[1.15] tracking-[-0.025em] md:text-[22px]">
                  {secondary.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.5] text-white/55">
                  {secondary.summary}
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em] text-white">
                    {secondary.metricShort}
                  </span>
                  <span className="text-[12px] text-white/45">
                    {secondary.metricLabel}
                  </span>
                </div>
                <div className="mt-4 overflow-hidden rounded-[3px] bg-white/95">
                  <CaseVisual study={secondary} compact />
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-medium text-white transition-[gap] duration-300 ease-out group-hover:gap-2.5">
                  Read case study
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </article>
          ) : null}

          {compact ? (
            <article
              className={`group relative flex flex-col overflow-hidden rounded-[10px] border shadow-[var(--zeon-shadow-soft)] transition-[box-shadow] duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] hover:shadow-[var(--zeon-shadow-elevated)] md:col-span-5 ${toneSurface[cardTone.compact]}`}
            >
              <Link
                href={`/customers/${compact.slug}`}
                className="flex h-full flex-col p-5 md:p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {compact.industry}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[20px] leading-[1.15] tracking-[-0.025em]">
                  {compact.title}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em] text-white">
                    {compact.metricShort}
                  </span>
                  <span className="text-[12px] text-white/45">
                    {compact.metricLabel}
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-[1.5] text-white/55">
                  {compact.customer}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-medium text-white transition-[gap] duration-300 ease-out group-hover:gap-2.5">
                  Read case study
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </article>
          ) : null}

          {wide ? (
            <article
              className={`group relative overflow-hidden rounded-[10px] border shadow-[var(--zeon-shadow-soft)] transition-[box-shadow] duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] hover:shadow-[var(--zeon-shadow-elevated)] md:col-span-12 ${toneSurface[cardTone.wide]}`}
            >
              <Link
                href={`/customers/${wide.slug}`}
                className="grid gap-6 p-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] md:items-center md:gap-10 md:p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                    {wide.industry}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[22px] leading-[1.15] tracking-[-0.025em] md:text-[28px]">
                    {wide.title}
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-[14px] leading-[1.55] text-white/55">
                    {wide.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-[family-name:var(--font-aeonik)] text-[32px] tracking-[-0.03em] text-white">
                      {wide.metricShort}
                    </span>
                    <span className="text-[13px] text-white/45">
                      {wide.metricLabel}
                    </span>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-white transition-[gap] duration-300 ease-out group-hover:gap-2.5">
                    Read case study
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
                <div className="overflow-hidden rounded-[3px] bg-white/95">
                  <CaseVisual study={wide} />
                </div>
              </Link>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
