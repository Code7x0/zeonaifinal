"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ComponentType } from "react";
import { motion, useReducedMotion } from "motion/react";
import { engineering } from "@/components/sites/zeonai/content";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { AccessMatrix } from "./access-matrix";
import { AuditLog } from "./audit-log";
import { ConfigWorkbench } from "./config-workbench";
import { DelegationCase } from "./delegation-case";
import { PipelineDiagram } from "./pipeline-diagram";
import { RulesTransform } from "./rules-transform";
import { Z } from "./tokens";
import { durationEnter, easeOut, enterY } from "../motion";

const VISUALS: Record<string, ComponentType> = {
  "01": PipelineDiagram,
  "02": ConfigWorkbench,
  "03": RulesTransform,
  "04": AccessMatrix,
  "05": DelegationCase,
  "06": AuditLog,
};

export function EngineeringDetailPage() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="v7-site min-h-screen bg-white text-black">
      <SiteHeader />
      <main>
        {/* Hero */}
        <header className="relative overflow-hidden bg-white text-[#111318]">
          <div className="relative mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-24">
            <Link
              href="/#engineering"
              className="inline-flex items-center gap-2 text-[13px] text-[#5B6766] transition hover:text-[#111318]"
            >
              <ArrowLeft className="size-3.5" />
              Back to overview
            </Link>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              03 · Engineering
            </p>
            <h1 className="mt-3 max-w-[18ch] font-[family-name:var(--font-aeonik)] text-[40px] leading-[1.05] tracking-[-0.04em] md:text-[64px]">
              How it works under the hood
            </h1>
            <p className="mt-5 max-w-[48ch] text-[17px] leading-[1.55] text-[#5B6766] md:text-[19px]">
              Six pieces, in the order a document meets them — from the hub that
              runs the agents to the audit log nobody can edit.
            </p>
            <nav
              className="mt-10 flex flex-wrap gap-2"
              aria-label="Jump to engineering topic"
            >
              {engineering.map((item) => (
                <a
                  key={item.id}
                  href={`#eng-${item.id}`}
                  className="border border-[#DCE1E0] bg-transparent px-3.5 py-1.5 text-[12px] text-[#111318] transition hover:border-[#111318]"
                >
                  {item.id} · {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* Topics */}
        <div className="bg-[var(--zeon-paper,#fff)]">
          {engineering.map((item, index) => {
            const Visual = VISUALS[item.id];
            const reverse = index % 2 === 1;
            return (
              <section
                key={item.id}
                id={`eng-${item.id}`}
                className="scroll-mt-24 border-b border-[var(--zeon-line,#DCE1E0)]"
              >
                <div
                  className={`mx-auto grid max-w-[1200px] items-start gap-10 px-5 py-16 md:gap-14 md:px-8 md:py-24 lg:grid-cols-2 ${
                    reverse ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  <motion.div
                    className={reverse ? "lg:[direction:ltr]" : ""}
                    initial={reduceMotion ? false : { opacity: 0, y: enterY }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: durationEnter, ease: easeOut }}
                  >
                    <p
                      className="font-mono text-[11px] uppercase tracking-[0.16em]"
                      style={{ color: Z.blue }}
                    >
                      {item.id} · {item.label}
                    </p>
                    <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[32px] leading-[1.1] tracking-[-0.03em] text-[var(--zeon-ink,#010F0F)] md:text-[42px]">
                      {item.title}
                    </h2>
                    <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-[var(--zeon-ink70,#5B6766)] md:text-[17px]">
                      {item.body}
                    </p>
                  </motion.div>

                  <motion.div
                    className={`overflow-hidden rounded-2xl border border-[var(--zeon-line,#DCE1E0)] bg-white shadow-[0_24px_60px_rgba(1,15,15,0.08)] ${
                      reverse ? "lg:[direction:ltr]" : ""
                    }`}
                    initial={reduceMotion ? false : { opacity: 0, y: enterY }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: durationEnter,
                      delay: reduceMotion ? 0 : 0.08,
                      ease: easeOut,
                    }}
                  >
                    <div className="max-h-[520px] overflow-auto md:max-h-none">
                      {Visual ? <Visual /> : null}
                    </div>
                  </motion.div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Closing CTA */}
        <section
          className="px-5 py-20 text-center text-white md:px-8 md:py-28"
          style={{ backgroundColor: Z.ink }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            Next step
          </p>
          <h2 className="mx-auto mt-3 max-w-[18ch] font-[family-name:var(--font-aeonik)] text-[32px] tracking-[-0.03em] md:text-[44px]">
            See the platform on a workflow that matters to you.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#demo"
              className="zeon-btn zeon-btn-light"
            >
              Book a demo
            </Link>
            <Link
              href="/#architecture"
              className="zeon-btn zeon-btn-ghost-dark"
            >
              View architecture
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
