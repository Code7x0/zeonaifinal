"use client";

import {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
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
  DEPLOYMENT,
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

function DeploymentBoundary() {
  return (
    <svg
      viewBox="0 0 280 160"
      className="h-auto w-full max-w-[280px]"
      role="img"
      aria-label="Deployment boundary: platform, models and data inside your environment"
    >
      <rect
        x="8"
        y="8"
        width="264"
        height="144"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <text
        x="20"
        y="28"
        fill="#8B93A1"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.12em"
      >
        YOUR ENVIRONMENT
      </text>
      <rect
        x="40"
        y="48"
        width="200"
        height="88"
        fill="#111C32"
        stroke={ACCENT}
        strokeWidth="1"
      />
      <text
        x="140"
        y="78"
        textAnchor="middle"
        fill="#F5F6F8"
        fontSize="11"
        fontWeight="600"
      >
        ZeonAI platform
      </text>
      <text
        x="140"
        y="98"
        textAnchor="middle"
        fill="#A0A7B4"
        fontSize="10"
      >
        Models · Data · Workloads
      </text>
      <text
        x="140"
        y="118"
        textAnchor="middle"
        fill="#727B8B"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.08em"
      >
        BOUNDARY DIAGRAM · SAMPLE
      </text>
    </svg>
  );
}

export function SecurityComplianceSection() {
  const baseId = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const [deployIndex, setDeployIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, top: 0, height: 0 });

  const selected = DEPLOYMENT[deployIndex]!;

  const measurePill = useCallback(() => {
    const el = tabRefs.current[deployIndex];
    const list = tablistRef.current;
    if (!el || !list) return;
    const listBox = list.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    setPill({
      left: box.left - listBox.left + list.scrollLeft,
      top: box.top - listBox.top + list.scrollTop,
      width: box.width,
      height: box.height,
    });
  }, [deployIndex]);

  useLayoutEffect(() => {
    measurePill();
  }, [measurePill]);

  useLayoutEffect(() => {
    window.addEventListener("resize", measurePill);
    return () => window.removeEventListener("resize", measurePill);
  }, [measurePill]);

  const onDeployKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const last = DEPLOYMENT.length - 1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setDeployIndex((i) => (i >= last ? 0 : i + 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setDeployIndex((i) => (i <= 0 ? last : i - 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        setDeployIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setDeployIndex(last);
      }
    },
    [],
  );

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
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#727B8B]">
            Security and compliance
          </p>
          <h2
            id={`${baseId}-heading`}
            className="mt-3 font-[family-name:var(--font-aeonik)] text-[32px] leading-[1.08] tracking-[-0.03em] text-[#F5F6F8] sm:text-[40px] md:text-[48px]"
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

          {/* Group 3 — Deployment */}
          <motion.div id="deployment" className="scroll-mt-24" {...groupMotion(2)}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#727B8B]">
              Deployment
            </h3>
            <div className="mt-3 border border-white/10 bg-[#12161F] p-4 md:p-6">
              <div
                ref={tablistRef}
                role="tablist"
                aria-label="Deployment options"
                onKeyDown={onDeployKeyDown}
                className="relative flex gap-1 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute z-0 rounded-[6px] border border-[#2962FF] bg-[#111C32]"
                  animate={{
                    left: pill.left,
                    top: pill.top,
                    width: pill.width,
                    height: pill.height,
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.25, ease: easeOut }
                  }
                />
                {DEPLOYMENT.map((opt, i) => {
                  const on = deployIndex === i;
                  return (
                    <button
                      key={opt.id}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`${baseId}-deploy-${opt.id}`}
                      aria-selected={on}
                      aria-controls={`${baseId}-deploy-panel`}
                      tabIndex={on ? 0 : -1}
                      onClick={() => {
                        setDeployIndex(i);
                        tabRefs.current[i]?.scrollIntoView({
                          behavior: reduceMotion ? "auto" : "smooth",
                          inline: "center",
                          block: "nearest",
                        });
                      }}
                      className={`relative z-[1] min-h-[44px] shrink-0 rounded-[6px] px-3.5 py-2.5 text-[13px] font-medium tracking-[-0.01em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2962FF] ${
                        on ? "text-[#F5F6F8]" : "text-[#A0A7B4] hover:text-[#F5F6F8]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
                <div
                  id={`${baseId}-deploy-panel`}
                  role="tabpanel"
                  aria-labelledby={`${baseId}-deploy-${selected.id}`}
                  aria-live="polite"
                  className="min-h-[96px]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selected.id}
                      initial={
                        reduceMotion ? false : { opacity: 0, y: enterYSoft }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.18,
                        ease: easeOut,
                      }}
                    >
                      <p className="text-[15px] font-medium tracking-[-0.015em] text-[#F5F6F8]">
                        {selected.label}
                      </p>
                      <p className="mt-2 max-w-[48ch] text-[14px] leading-[1.55] text-[#A0A7B4]">
                        {selected.detail}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <DeploymentBoundary />
                </div>
              </div>
            </div>
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
