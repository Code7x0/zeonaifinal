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

const STANDARD_CODES: Record<string, { code: string; sub: string }> = {
  iso42001: { code: "ISO", sub: "42001" },
  iso27001: { code: "ISO", sub: "27001" },
  "soc2-type1": { code: "SOC 2", sub: "TYPE I" },
  "soc2-type2": { code: "SOC 2", sub: "TYPE II" },
};

function statusChipClass(status: ComplianceStatus) {
  switch (status) {
    case "Certified":
      return "border-[#2962FF]/45 bg-[#111C32] text-[#8EB8FF]";
    case "In progress":
    case "Aligned":
      return "border-white/15 bg-white/[0.04] text-[#A0A7B4]";
    default:
      return "border-white/12 bg-transparent text-[#8B93A1]";
  }
}

function AssuranceCard({ item }: { item: ComplianceItem }) {
  const badge = STANDARD_CODES[item.id] ?? { code: "STD", sub: "" };

  return (
    <li className="flex h-full flex-col justify-between rounded-[6px] border border-white/10 bg-[#171D2B] p-5 transition-[border-color,transform] duration-200 hover:-translate-y-px hover:border-[#2962FF]/45">
      <div>
        <div className="flex items-start justify-between gap-3">
          {/* Clean typographic standard seal — no fabricated/misleading logos */}
          <div className="inline-flex items-center gap-2 rounded-[4px] border border-white/12 bg-[#111622] px-2.5 py-1.5">
            <ShieldCheck
              className="size-4 shrink-0 text-[#8EB8FF]"
              aria-hidden
            />
            <span className="font-mono text-[11px] font-medium tracking-[0.06em] text-[#F5F6F8]">
              {badge.code}
              {badge.sub ? (
                <span className="ml-1 text-[#8EB8FF]">{badge.sub}</span>
              ) : null}
            </span>
          </div>

          <span
            className={`shrink-0 rounded-[3px] border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] ${statusChipClass(item.status)}`}
          >
            {item.status}
          </span>
        </div>

        <p className="mt-4 text-[16px] font-medium tracking-[-0.015em] text-[#F5F6F8]">
          {item.name}
        </p>
        <p className="mt-1.5 text-[13px] leading-[1.45] text-[#A4A7AE]">
          {item.description}
        </p>
      </div>
    </li>
  );
}

function ProtectionTile({ item }: { item: ProtectionItem }) {
  const Icon = PROTECTION_ICONS[item.id] ?? Layers;

  return (
    <li className="group flex h-full flex-col rounded-[6px] border border-white/10 bg-[#171D2B] p-5 transition-[border-color,transform] duration-200 hover:-translate-y-px hover:border-white/20 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-9 items-center justify-center rounded-[4px] border border-white/12 bg-[#111622] text-[#8EB8FF]">
          <Icon className="size-4" aria-hidden />
        </span>
        {item.linkHref && item.linkLabel ? (
          <Link
            href={item.linkHref}
            className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#8EB8FF] no-underline transition-colors hover:text-white"
          >
            {item.linkLabel}
          </Link>
        ) : null}
      </div>

      <h4 className="mt-4 text-[16px] font-medium tracking-[-0.015em] text-[#F5F6F8] md:text-[17px]">
        {item.title}
      </h4>
      <p className="mt-2 text-[13.5px] leading-[1.55] text-[#A4A7AE] md:text-[14px]">
        {item.summary}
      </p>

      {item.secondaryTitle && item.secondarySummary ? (
        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="flex items-start gap-2.5">
            <RefreshCw
              className="mt-0.5 size-3.5 shrink-0 text-[#8EB8FF]"
              aria-hidden
            />
            <div>
              <p className="text-[14px] font-medium text-[#F5F6F8]">
                {item.secondaryTitle}
              </p>
              <p className="mt-1 text-[13px] leading-[1.5] text-[#A4A7AE]">
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
      className="relative z-[1] scroll-mt-24 border-t border-white/15 bg-[#121722] bg-[radial-gradient(ellipse_60%_35%_at_50%_0%,rgba(41,98,255,0.08),transparent_70%)] py-16 text-[#F5F6F8] md:py-24"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="px-4 sm:px-6 md:px-[var(--zeon-gutter,1.25rem)]">
        <div className="mx-auto max-w-[1180px]">
          <header className="max-w-[40rem]">
            <h2
              id={`${baseId}-heading`}
              className="zeon-type-section text-balance !text-[#F5F6F8]"
            >
              Security and compliance posture
            </h2>
            <p className="mt-3.5 max-w-[48ch] text-[15px] leading-[1.6] text-[#A4A7AE] md:text-[16px]">
              Data security and privacy standards sit at the core of how the
              platform is designed and operated.
            </p>
          </header>

          <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
            {/* Group 1 — Assurance (4-col desktop / 2x2 tablet / 1-col mobile) */}
            <motion.div {...groupMotion(0)}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8B93A1]">
                Assurance
              </h3>
              <ul
                className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4"
                aria-label="Compliance positioning"
              >
                {COMPLIANCE.map((item) => (
                  <AssuranceCard key={item.id} item={item} />
                ))}
              </ul>
            </motion.div>

            {/* Group 2 — Protection (balanced 2x2 grid) */}
            <motion.div {...groupMotion(1)}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8B93A1]">
                Protection
              </h3>
              <ul
                className="mt-3.5 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4"
                aria-label="Data protection"
              >
                {PROTECTION.map((item) => (
                  <ProtectionTile key={item.id} item={item} />
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
