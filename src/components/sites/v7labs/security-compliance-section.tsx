"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  deployments,
  trustItems,
  trustLabels,
} from "@/components/sites/zeonai/content";
import {
  durationEnter,
  durationUi,
  easeOut,
  enterYSoft,
} from "./motion";

const GOVERNED_AI_COPY =
  "Answers are drawn only from the documents and repositories the person can already open, and each one cites its sources. Check an output against the source before you act on it.";

export function SecurityComplianceSection() {
  const baseId = useId();
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="security"
      className="relative z-[1] scroll-mt-24 bg-[#F7F7F7] py-16 md:py-24"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <motion.div
          className="overflow-hidden rounded-[2px] border border-[#D8D8D8] bg-white text-[#111111]"
          initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: durationEnter, ease: easeOut }}
        >
          {/* Editorial header */}
          <header className="border-b border-[#D9D9D9] px-6 py-10 sm:px-8 md:px-12 md:py-14">
            <h2
              id={`${baseId}-heading`}
              className="max-w-[18ch] font-[family-name:var(--font-aeonik)] text-[32px] leading-[1.08] tracking-[-0.03em] text-[#111111] sm:text-[40px] md:text-[48px]"
            >
              Enterprise-grade security and compliance
            </h2>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.6] text-[#4F4F4F] md:text-[16px]">
              Upholding strict data security and privacy standards is at the
              core of everything we do.
            </p>
          </header>

          {/* Compliance highlight row — TODO: verify certification status */}
          <div
            className="grid border-b border-[#D9D9D9] sm:grid-cols-3"
            role="list"
            aria-label="Compliance positioning"
          >
            {trustLabels.map((label, i) => (
              <motion.div
                key={label.name}
                role="listitem"
                className={
                  i < trustLabels.length - 1
                    ? "border-b border-[#D9D9D9] px-6 py-8 sm:border-b-0 sm:border-r sm:px-8 sm:py-10 md:px-10 md:py-11"
                    : "px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-11"
                }
                initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.06 * i,
                  duration: durationUi,
                  ease: easeOut,
                }}
              >
                <p className="font-[family-name:var(--font-aeonik)] text-[28px] leading-none tracking-[-0.03em] text-[#111111] md:text-[34px]">
                  {label.name}
                </p>
                <p className="mt-3 text-[13px] leading-[1.45] text-[#4F4F4F]">
                  {label.note}
                </p>
              </motion.div>
            ))}
          </div>

          {/*
            Continuous capability grid: each cell draws bottom + right border;
            overflow-hidden on the panel clips the outer edges so shared
            dividers stay single-thickness.
          */}
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Security capabilities"
          >
            {trustItems.map((item, i) => {
              const n = String(i + 1).padStart(2, "0");
              const borderY = [
                i < 5 ? "border-b" : "border-b-0",
                i < 4 ? "sm:border-b" : "sm:border-b-0",
                i < 3 ? "lg:border-b" : "lg:border-b-0",
              ].join(" ");
              return (
                <motion.article
                  key={item.title}
                  role="listitem"
                  className={`border-r border-[#D9D9D9] px-6 py-8 sm:px-8 md:px-10 md:py-11 ${borderY}`}
                  initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.05 * i,
                    duration: durationUi,
                    ease: easeOut,
                  }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4F4F4F]">
                    {n}
                  </p>
                  <h3 className="mt-3 text-[16px] font-medium tracking-[-0.015em] text-[#111111] md:text-[17px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-[13px] leading-[1.55] text-[#4F4F4F] md:text-[14px]">
                    {item.body}
                  </p>
                </motion.article>
              );
            })}
          </div>

          {/* Governed AI + Deployment — strong editorial divider */}
          <div className="grid border-t-2 border-[#222222] md:grid-cols-2">
            <div className="border-b border-[#D9D9D9] px-6 py-10 sm:px-8 md:border-b-0 md:border-r md:border-[#D9D9D9] md:px-10 md:py-12">
              <h3 className="font-[family-name:var(--font-aeonik)] text-[22px] leading-[1.15] tracking-[-0.02em] text-[#111111] md:text-[26px]">
                Governed AI
              </h3>
              <p className="mt-4 max-w-[48ch] text-[14px] leading-[1.65] text-[#4F4F4F] md:text-[15px]">
                {GOVERNED_AI_COPY}
              </p>
            </div>

            <div
              id="deployment"
              className="scroll-mt-24 px-6 py-10 sm:px-8 md:px-10 md:py-12"
            >
              <h3 className="font-[family-name:var(--font-aeonik)] text-[22px] leading-[1.15] tracking-[-0.02em] text-[#111111] md:text-[26px]">
                Deployment options
              </h3>
              <ul className="mt-6 flex flex-wrap items-center gap-y-3">
                {deployments.map((d, i) => (
                  <li key={d} className="flex items-center">
                    {i > 0 ? (
                      <span
                        className="mx-3.5 h-3.5 w-px bg-[#D9D9D9]"
                        aria-hidden
                      />
                    ) : null}
                    <span className="text-[14px] tracking-[-0.01em] text-[#111111] md:text-[15px]">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
