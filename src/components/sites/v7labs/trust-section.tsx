"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, Check, FileText, Lock, RotateCcw } from "lucide-react";
import {
  TRUST_CONFIG,
  TRUST_MODULES,
  TRUST_PLAYBACK_MS,
} from "./trust-config";
import { easeOut } from "./motion";

/** ZeonAI inverse surfaces for Governed by Design. */
const ACCENT = "#2962FF";
const ACCENT_SOFT = "#111C32";
const PRIMARY = "#F5F6F8";
const SECONDARY = "#A4A7AE";
const HAIRLINE = "rgba(255,255,255,0.10)";
const PANEL = "#12161F";
const PAGE = "#181D27";
const RESTRICTED = "#A4A7AE";

const TOTAL = TRUST_MODULES.length;
const GRANTED = new Set<string>(TRUST_CONFIG.role.granted);
const GRANTED_COUNT = TRUST_CONFIG.role.granted.length;

type Phase = 0 | 1 | 2 | 3 | 4;

/**
 * Original compact lifecycle strip — sizes/spacing only bumped ~15–25%.
 * Fonts inherit the site. Geometry stays sharp 2px.
 */
export function TrustSection() {
  const baseId = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const [phase, setPhase] = useState<Phase>(4);
  const [playing, setPlaying] = useState(false);
  const timers = useRef<number[]>([]);
  const autoStarted = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const runPlayback = useCallback(() => {
    clearTimers();
    if (reduceMotion) {
      setPhase(4);
      setPlaying(false);
      return;
    }
    setPlaying(true);
    setPhase(0);
    const slice = TRUST_PLAYBACK_MS / 5;
    for (let i = 1; i <= 4; i++) {
      timers.current.push(
        window.setTimeout(() => {
          setPhase(i as Phase);
          if (i === 4) setPlaying(false);
        }, slice * i),
      );
    }
  }, [clearTimers, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      setPhase(4);
      return;
    }
    if (!inView || autoStarted.current) return;
    autoStarted.current = true;
    runPlayback();
  }, [inView, reduceMotion, runPlayback]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const stepIndex = phase <= 1 ? 0 : phase === 2 ? 1 : 2;
  const visibleAudit =
    phase >= 4
      ? TRUST_CONFIG.audit.length
      : phase === 0
        ? 0
        : phase === 1
          ? 1
          : phase === 2
            ? 2
            : 4;

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="relative z-[1] scroll-mt-24 text-[#F5F6F8] [@media(min-width:1200px)_and_(min-height:768px)]:max-h-[100svh] [@media(min-width:1200px)_and_(min-height:768px)]:overflow-hidden"
      style={{
        background: PAGE,
        borderTop: `1px solid ${HAIRLINE}`,
      }}
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="relative mx-auto flex w-full max-w-[1320px] flex-col justify-center px-5 pb-10 pt-12 md:px-8 [@media(min-width:1200px)_and_(max-height:819px)]:gap-0 [@media(min-width:1200px)_and_(max-height:819px)]:pb-6 [@media(min-width:1200px)_and_(max-height:819px)]:pt-8">
        {/* Header: title left, steps right — original layout */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8 [@media(min-width:1200px)_and_(max-height:819px)]:gap-3">
          <div className="max-w-[640px] shrink-0">
            <p className="mb-3 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8EB8FF]">
              04 · Trust
              <span
                aria-hidden
                className="hidden h-px w-9 bg-[linear-gradient(90deg,rgba(142,184,255,0.55),transparent)] sm:block"
              />
              <span className="text-white/35">Sheet · Governance</span>
            </p>
            <h2
              id={`${baseId}-heading`}
              className="max-w-[640px] font-[family-name:var(--font-aeonik)] text-[36px] leading-[1.06] tracking-[-0.035em] text-[#F5F6F8] md:text-[52px]"
            >
              Governed by design, not added afterwards
            </h2>
            <p
              className="mt-3 max-w-[560px] text-[18px] leading-[1.5]"
              style={{ color: SECONDARY }}
            >
              {TRUST_CONFIG.subtitle}
            </p>
          </div>

          <ol
            className="flex flex-wrap gap-3 lg:justify-end"
            aria-label="Governance steps"
          >
            {TRUST_CONFIG.steps.map((step, i) => {
              const on = i <= stepIndex;
              const current = i === stepIndex && playing;
              const active =
                current || (on && !playing && i === stepIndex);
              return (
                <li key={step.n}>
                  <span
                    className="inline-flex h-11 min-h-[44px] items-center gap-2 px-3 transition-colors duration-200"
                    style={{
                      borderRadius: 2,
                      border: `1px solid ${active ? ACCENT : HAIRLINE}`,
                      background: active ? ACCENT_SOFT : "transparent",
                      fontSize: 15,
                      fontWeight: 500,
                      color: on ? PRIMARY : SECONDARY,
                    }}
                  >
                    <span
                      className="font-mono tabular-nums"
                      style={{
                        fontSize: 12,
                        color: on ? "#8EB8FF" : SECONDARY,
                      }}
                    >
                      {step.n}
                    </span>
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* One panel · three columns — no extra header row */}
        <div
          className="mt-7 min-h-[340px] overflow-hidden xl:min-h-[380px] [@media(min-width:1200px)_and_(max-height:819px)]:mt-4 [@media(min-width:1200px)_and_(max-height:819px)]:min-h-[340px]"
          style={{
            borderRadius: 2,
            background: PANEL,
            border: `1px solid ${HAIRLINE}`,
          }}
        >
          <div className="grid md:grid-cols-2 xl:grid-cols-[31%_42%_27%]">
            {/* Role */}
            <div
              className="flex flex-col border-b p-6 md:border-r xl:border-b-0"
              style={{ borderColor: HAIRLINE }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p
                  className="font-mono uppercase tracking-[0.14em]"
                  style={{ fontSize: 11, color: SECONDARY }}
                >
                  Role
                </p>
                <p
                  className="font-mono tabular-nums"
                  style={{ fontSize: 12, color: SECONDARY }}
                >
                  <span style={{ color: "#8EB8FF" }}>{GRANTED_COUNT}</span>
                  {` of ${TOTAL} modules`}
                </p>
              </div>
              <p
                className="mt-2 tracking-[-0.015em]"
                style={{ fontSize: 20, fontWeight: 500, color: PRIMARY }}
              >
                {TRUST_CONFIG.role.label}
              </p>

              <ul className="mt-3 grid grid-cols-3 gap-1.5">
                {TRUST_MODULES.map((name) => {
                  const granted = GRANTED.has(name);
                  return (
                    <li key={name} className="min-w-0">
                      <div
                        className="flex h-14 flex-col justify-between px-1.5 py-1.5"
                        style={{
                          borderRadius: 2,
                          background: granted ? ACCENT_SOFT : "transparent",
                          border: granted
                            ? `1px solid rgba(53,109,255,0.5)`
                            : `1px dashed ${HAIRLINE}`,
                        }}
                        aria-label={`${name}, ${granted ? "access granted" : "restricted"}`}
                      >
                        <span className="flex justify-end" aria-hidden>
                          {granted ? (
                            <span
                              className="flex size-4 items-center justify-center text-white"
                              style={{ borderRadius: 2, background: ACCENT }}
                            >
                              <Check className="size-2.5 stroke-[3]" />
                            </span>
                          ) : (
                            <Lock
                              className="size-3.5"
                              style={{ color: RESTRICTED }}
                            />
                          )}
                        </span>
                        <span
                          className="leading-tight"
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: granted ? PRIMARY : RESTRICTED,
                            wordBreak: "normal",
                            overflowWrap: "normal",
                            hyphens: "manual",
                          }}
                        >
                          {name}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p
                className="mt-3 font-mono uppercase tracking-[0.12em]"
                style={{ fontSize: 11, color: SECONDARY, lineHeight: 1.45 }}
              >
                {TRUST_CONFIG.disclaimer}
              </p>
            </div>

            {/* Access check */}
            <div
              className="flex flex-col border-b p-6 xl:border-b-0 xl:border-r"
              style={{ borderColor: HAIRLINE }}
            >
              <p
                className="font-mono uppercase tracking-[0.14em]"
                style={{ fontSize: 11, color: SECONDARY }}
              >
                Access check
              </p>

              {/* Reserved lane for travelling chip — never overlaps nodes */}
              <div className="relative mt-3 h-7">
                <motion.div
                  className="absolute top-0"
                  animate={{
                    left:
                      phase <= 1
                        ? "0%"
                        : phase === 2
                          ? "42%"
                          : "72%",
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.22, ease: easeOut }
                  }
                >
                  <span
                    className="inline-flex h-6 items-center gap-1.5 whitespace-nowrap px-2 font-mono"
                    style={{
                      borderRadius: 2,
                      fontSize: 11,
                      background: ACCENT_SOFT,
                      border: `1px solid rgba(53,109,255,0.5)`,
                      color: "#8EB8FF",
                    }}
                  >
                    <FileText className="size-3 shrink-0" aria-hidden />
                    CAPEX request
                  </span>
                </motion.div>
              </div>

              {/* Row 1: User request → Access check */}
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <FlowNode
                  label="User request"
                  active={phase >= 1}
                  emphasize={phase === 1}
                />
                <ArrowRight
                  className="hidden size-3.5 shrink-0 sm:block"
                  style={{ color: phase >= 2 ? "#8EB8FF" : SECONDARY }}
                  aria-hidden
                />
                <FlowNode
                  label="Access check"
                  active={phase >= 2}
                  emphasize={phase === 2}
                  icon="lock"
                />
              </div>

              {/* Elbow branches under Access check */}
              <div className="mt-2.5 flex gap-3 sm:pl-[calc(36px+1rem)]">
                <div
                  className="hidden w-px shrink-0 self-stretch sm:block"
                  style={{ background: HAIRLINE, minHeight: 76 }}
                  aria-hidden
                />
                <div className="flex flex-col gap-1.5">
                  <FlowNode
                    label="Permitted documents"
                    active={phase >= 3}
                    emphasize={phase >= 3}
                    icon="check"
                  />
                  <FlowNode
                    label="Withheld: 2 outside access"
                    active={phase >= 3}
                    muted
                    icon="lock"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-0">
                {TRUST_CONFIG.flow.permitted.map((doc) => (
                  <p
                    key={doc}
                    className="flex h-7 items-center gap-2 transition-opacity duration-200"
                    style={{
                      fontSize: 14,
                      color: phase >= 3 ? PRIMARY : SECONDARY,
                      opacity: phase >= 3 ? 1 : 0.4,
                    }}
                  >
                    <Check
                      className="size-3.5 shrink-0"
                      style={{ color: "#8EB8FF" }}
                      aria-hidden
                    />
                    {doc}
                  </p>
                ))}
                {TRUST_CONFIG.flow.withheld.map((doc) => (
                  <p
                    key={doc}
                    className="flex h-7 items-center gap-2 transition-opacity duration-200"
                    style={{
                      fontSize: 14,
                      color: RESTRICTED,
                      opacity: phase >= 3 ? 1 : 0.4,
                    }}
                  >
                    <Lock className="size-3.5 shrink-0" aria-hidden />
                    {doc}
                  </p>
                ))}
              </div>

              <p
                className="mt-3 font-mono uppercase tracking-[0.12em]"
                style={{ fontSize: 11, color: SECONDARY }}
              >
                {TRUST_CONFIG.caption}
              </p>
            </div>

            {/* Audit trail */}
            <div className="flex flex-col p-6 md:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between gap-3">
                <p
                  className="font-mono uppercase tracking-[0.14em]"
                  style={{ fontSize: 11, color: SECONDARY }}
                >
                  Audit trail
                </p>
                <span
                  className="px-1.5 py-0.5 font-mono uppercase tracking-[0.1em]"
                  style={{
                    borderRadius: 2,
                    border: `1px solid ${HAIRLINE}`,
                    fontSize: 11,
                    color: SECONDARY,
                  }}
                >
                  Sample data
                </span>
              </div>

              <ol
                className="mt-3 flex flex-1 flex-col gap-3"
                aria-live={playing && !reduceMotion ? "polite" : "off"}
                aria-relevant="additions"
              >
                {TRUST_CONFIG.audit.map((row, i) => {
                  const show = i < visibleAudit;
                  return (
                    <li key={`${row.time}-${row.actor}-${i}`}>
                      <AnimatePresence initial={false}>
                        {show ? (
                          <motion.div
                            initial={
                              reduceMotion ? false : { opacity: 0, y: 4 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.18,
                              ease: easeOut,
                            }}
                          >
                            <p className="flex flex-wrap items-baseline gap-x-2">
                              <span
                                className="font-mono tabular-nums"
                                style={{ fontSize: 11, color: "#8EB8FF" }}
                              >
                                {row.time}
                              </span>
                              <span
                                className="font-mono"
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  color: PRIMARY,
                                }}
                              >
                                {row.actor}
                              </span>
                            </p>
                            <p
                              className="mt-0.5 leading-snug"
                              style={{ fontSize: 13, color: SECONDARY }}
                            >
                              {row.detail}
                            </p>
                          </motion.div>
                        ) : (
                          <span className="block h-9" aria-hidden />
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        {/* Replay — below panel, right-aligned (original position) */}
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={runPlayback}
            className="inline-flex h-10 min-h-[40px] items-center gap-2 px-3.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              borderRadius: 2,
              border: `1px solid ${HAIRLINE}`,
              fontSize: 14,
              color: SECONDARY,
              outlineColor: ACCENT,
            }}
            aria-label="Replay access check"
          >
            <RotateCcw className="size-3.5" aria-hidden />
            Replay
          </button>
        </div>
      </div>
    </section>
  );
}

function FlowNode({
  label,
  active,
  emphasize,
  muted,
  icon,
}: {
  label: string;
  active?: boolean;
  emphasize?: boolean;
  muted?: boolean;
  icon?: "lock" | "check";
}) {
  return (
    <div
      className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap px-3 transition-colors duration-200"
      style={{
        borderRadius: 2,
        fontSize: 14,
        fontWeight: 500,
        border: `1px solid ${
          emphasize
            ? ACCENT
            : muted && active
              ? HAIRLINE
              : active
                ? "rgba(255,255,255,0.16)"
                : HAIRLINE
        }`,
        background: emphasize
          ? ACCENT_SOFT
          : active && !muted
            ? "rgba(255,255,255,0.04)"
            : "transparent",
        color: emphasize
          ? PRIMARY
          : muted
            ? RESTRICTED
            : active
              ? PRIMARY
              : SECONDARY,
      }}
    >
      {icon === "lock" ? (
        <Lock className="size-3.5 shrink-0" aria-hidden />
      ) : null}
      {icon === "check" ? (
        <Check
          className="size-3.5 shrink-0"
          style={{ color: "#8EB8FF" }}
          aria-hidden
        />
      ) : null}
      {label}
    </div>
  );
}
