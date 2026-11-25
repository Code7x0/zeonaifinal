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
} from "lucide-react";
import {
  COMPLIANCE,
  GOVERNED_AI_NOTE,
  PROTECTION,
  type ComplianceStatus,
  type ProtectionItem,
} from "./security-config";
import { durationEnter, easeOut, enterYSoft } from "./motion";

const ACCENT = "#2962FF";
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

function statusChipClass(status: ComplianceStatus) {
  switch (status) {
    case "Certified":
      return "border-[#2962FF]/40 bg-[#111C32] text-[#8EB8FF]";
    case "In progress":
    case "Aligned":
      return "border-white/15 bg-white/[0.04] text-[#A0A7B4]";
    default:
      return "border-white/12 bg-transparent text-[#8B93A1]";
  }
}

function ProtectionTile({ item }: { item: ProtectionItem }) {
  const Icon = PROTECTION_ICONS[item.id] ?? Layers;
  const isLarge = item.size === "large";
  const isCompact = item.size === "compact";

  return (
    <li
      className={`group flex flex-col border border-white/10 bg-[#12161F] p-5 transition-[border-color,transform] duration-200 hover:-translate-y-px hover:border-white/20 md:p-6 ${
        isLarge
          ? "md:col-span-2 md:row-span-2"
          : isCompact
            ? "md:col-span-2"
            : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-8 items-center justify-center border border-white/10 text-[#8EB8FF]">
          <Icon className="size-4" aria-hidden />
        </span>
        {item.linkHref && item.linkLabel ? (
          <Link
            href={item.linkHref}
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8EB8FF] transition-colors hover:text-white"
          >
            {item.linkLabel}
          </Link>
        ) : null}
      </div>
      <h4
        className={`mt-4 font-medium tracking-[-0.015em] text-[#F5F6F8] ${
          isLarge ? "text-[18px] md:text-[20px]" : "text-[15px] md:text-[16px]"
        }`}
      >
        {item.title}
      </h4>
      <p
        className={`mt-2 leading-[1.5] text-[#A0A7B4] ${
          isLarge ? "max-w-[42ch] text-[14px] md:text-[15px]" : "text-[13px]"
        }`}
      >
        {item.summary}
      </p>
      {item.secondaryTitle && item.secondarySummary ? (
        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="flex items-start gap-2">
            <RefreshCw
              className="mt-0.5 size-3.5 shrink-0 text-[#8EB8FF]"
              aria-hidden
            />
            <div>
              <p className="text-[14px] font-medium text-[#F5F6F8]">
                {item.secondaryTitle}
              </p>
              <p className="mt-1 text-[13px] leading-[1.5] text-[#A0A7B4]">
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
      className="relative z-[1] scroll-mt-24 border-t border-[#252B37] bg-[#181D27] py-16 text-[#F5F6F8] md:py-24"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <header className="max-w-[40rem]">
          <h2
            id={`${baseId}-heading`}
            className="zeon-type-section text-balance !text-[#F5F6F8]"
          >
            Security and compliance posture
          </h2>
          <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.6] text-[#A0A7B4] md:text-[16px]">
            Data security and privacy standards sit at the core of how the
            platform is designed and operated.
          </p>
        </header>

        <div className="mt-10 space-y-8 md:mt-12 md:space-y-10">
          {/* Group 1 — Assurance */}
          <motion.div {...groupMotion(0)}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#727B8B]">
              Assurance
            </h3>
            <ul
              className="mt-3 grid gap-2 sm:grid-cols-3"
              aria-label="Compliance positioning"
            >
              {COMPLIANCE.map((item) => (
                <li
                  key={item.id}
                  className="border border-white/10 bg-[#12161F] px-4 py-4 transition-[border-color,transform] duration-200 hover:-translate-y-px hover:border-white/20 md:px-5 md:py-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[15px] font-medium tracking-[-0.015em] text-[#F5F6F8]">
                      {item.name}
                    </p>
                    <span
                      className={`shrink-0 rounded-[3px] border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] ${statusChipClass(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] leading-[1.45] text-[#8B93A1]">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Group 2 — Protection */}
          <motion.div {...groupMotion(1)}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#727B8B]">
              Protection
            </h3>
            <ul
              className="mt-3 grid gap-2 md:grid-cols-2 md:grid-rows-[auto_auto]"
              aria-label="Data protection"
            >
              {PROTECTION.map((item) => (
                <ProtectionTile key={item.id} item={item} />
              ))}
            </ul>
          </motion.div>
        </div>

        <p className="mt-8 max-w-[62ch] border-t border-white/10 pt-5 text-[13px] leading-[1.55] text-[#8B93A1] md:mt-10">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#727B8B]">
            Governed AI
          </span>
          <span className="mt-2 block">{GOVERNED_AI_NOTE}</span>
        </p>
      </div>
    </section>
  );
}
