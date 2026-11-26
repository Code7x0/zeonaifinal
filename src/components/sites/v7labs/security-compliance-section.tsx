"use client";

import { useId, type ComponentType } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Archive,
  Fingerprint,
  KeyRound,
  Layers,
  Lock,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import {
  COMPLIANCE,
  PROTECTION,
  type ComplianceItem,
  type ComplianceStatus,
  type ProtectionItem,
} from "./security-config";
import { durationEnter, easeOut } from "./motion";

const GROUP_STAGGER = 0.06;

const PROTECTION_ICONS: Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  access: KeyRound,
  encryption: Lock,
  "auth-audit": Fingerprint,
  "archive-recovery": Archive,
};

/**
 * Restrained typographic standard marks — used instead of unverified
 * certification-body or trademarked ISO / AICPA SOC badges.
 */
const STANDARD_MARKS: Record<string, { prefix: string; code: string }> = {
  iso42001: { prefix: "ISO/IEC", code: "42001" },
  iso27001: { prefix: "ISO/IEC", code: "27001" },
  "soc2-type1": { prefix: "SOC 2", code: "TYPE I" },
  "soc2-type2": { prefix: "SOC 2", code: "TYPE II" },
};

function statusChipClass(status: ComplianceStatus) {
  switch (status) {
    case "Certified":
      return "border-[#5991FF]/40 bg-[#2962FF]/[0.12] text-[#8EB8FF]";
    case "In progress":
    case "Aligned":
      return "border-white/15 bg-white/[0.04] text-white/70";
    default:
      return "border-white/12 bg-transparent text-white/55";
  }
}

function AssuranceCard({ item }: { item: ComplianceItem }) {
  const mark = STANDARD_MARKS[item.id] ?? { prefix: "STD", code: "" };

  return (
    <li className="group flex h-full flex-col justify-between rounded-[10px] border border-white/10 bg-white/[0.025] p-5 transition-[border-color,background-color] duration-200 hover:border-[#5991FF]/45 hover:bg-[#2962FF]/[0.06] md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div
          aria-hidden="true"
          className="inline-flex items-center gap-2 rounded-[6px] border border-white/12 bg-[#0B0E14] px-2.5 py-1.5"
        >
          <ShieldCheck
            className="size-3.5 shrink-0 stroke-[1.75] text-[#8EB8FF]"
            aria-hidden
          />
          <span className="font-mono text-[11px] font-medium tracking-[0.06em] text-white/90">
            {mark.prefix}
            {mark.code ? (
              <span className="ml-1.5 text-[#8EB8FF]">{mark.code}</span>
            ) : null}
          </span>
        </div>

        <span
          className={`shrink-0 rounded-[4px] border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${statusChipClass(item.status)}`}
        >
          {item.status}
        </span>
      </div>

      <div className="mt-6">
        <h4 className="font-[family-name:var(--font-aeonik)] text-[18px] font-medium leading-[1.25] tracking-[-0.02em] text-white">
          {item.name}
        </h4>
        <p className="mt-1.5 text-[13.5px] leading-[1.5] text-white/[0.62]">
          {item.description}
        </p>
      </div>
    </li>
  );
}

function ProtectionTile({ item }: { item: ProtectionItem }) {
  const Icon = PROTECTION_ICONS[item.id] ?? Layers;

  return (
    <li className="group flex h-full flex-col rounded-[10px] border border-white/10 bg-white/[0.025] p-5 transition-[border-color,background-color] duration-200 hover:border-[#5991FF]/35 hover:bg-white/[0.04] md:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[6px] border border-[#5991FF]/25 bg-[#2962FF]/[0.08] text-[#8EB8FF]">
          <Icon className="size-4 stroke-[1.75]" aria-hidden />
        </span>

        {item.linkHref && item.linkLabel ? (
          <Link
            href={item.linkHref}
            className="inline-flex min-h-[36px] items-center rounded-[4px] px-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8EB8FF] no-underline transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2962FF]"
          >
            {item.linkLabel}
          </Link>
        ) : null}
      </div>

      <h4 className="mt-5 font-[family-name:var(--font-aeonik)] text-[18px] font-medium leading-[1.25] tracking-[-0.02em] text-white">
        {item.title}
      </h4>
      <p className="mt-2 text-[14px] leading-[1.55] text-white/[0.62]">
        {item.summary}
      </p>

      {item.secondaryTitle && item.secondarySummary ? (
        <div className="mt-5 border-t border-white/10 pt-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-[5px] border border-[#5991FF]/20 bg-[#2962FF]/[0.07] text-[#8EB8FF]">
              <RefreshCw className="size-3.5 stroke-[1.75]" aria-hidden />
            </span>
            <div>
              <h5 className="font-[family-name:var(--font-aeonik)] text-[15px] font-medium leading-[1.3] tracking-[-0.015em] text-white">
                {item.secondaryTitle}
              </h5>
              <p className="mt-1 text-[13.5px] leading-[1.5] text-white/[0.62]">
                {item.secondarySummary}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}

export function SecurityComplianceSection() {
  const baseId = useId();
  const reduceMotion = useReducedMotion() ?? false;

  const groupMotion = (i: number) =>
    reduceMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 10 } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          viewport: { once: true, amount: 0.2 } as const,
          transition: {
            delay: i * GROUP_STAGGER,
            duration: durationEnter,
            ease: easeOut,
          },
        };

  return (
    <section
      id="security"
      className="relative z-[1] scroll-mt-24 border-t border-white/[0.12] bg-[#10141C] py-20 text-white md:py-28"
      aria-labelledby={`${baseId}-heading`}
    >
      {/* Crisp top boundary hairline separating from the dark Trust section above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2962FF]/45 to-transparent"
      />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8">
        <header className="max-w-[540px] text-left">
          <h2
            id={`${baseId}-heading`}
            className="zeon-type-section !text-white"
          >
            Security and compliance posture
          </h2>
          <p className="mt-5 text-[16px] leading-[1.55] text-white/[0.62] md:text-[18px]">
            Data security and privacy standards sit at the core of how the
            platform is designed and operated.
          </p>
        </header>

        <div className="mt-12 space-y-12 md:mt-14 md:space-y-14">
          {/* Group 1 — Assurance (4-col desktop / 2x2 tablet / 1-col mobile) */}
          <motion.div {...groupMotion(0)}>
            <div className="flex items-center gap-3">
              <h3 className="font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-[#8EB8FF]">
                Assurance
              </h3>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-white/10"
              />
            </div>

            <ul
              className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 md:gap-4"
              aria-label="Compliance positioning"
            >
              {COMPLIANCE.map((item) => (
                <AssuranceCard key={item.id} item={item} />
              ))}
            </ul>
          </motion.div>

          {/* Group 2 — Protection (balanced 2x2 grid aligned to Assurance width) */}
          <motion.div {...groupMotion(1)}>
            <div className="flex items-center gap-3">
              <h3 className="font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-[#8EB8FF]">
                Protection
              </h3>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-white/10"
              />
            </div>

            <ul
              className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4"
              aria-label="Data protection"
            >
              {PROTECTION.map((item) => (
                <ProtectionTile key={item.id} item={item} />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
