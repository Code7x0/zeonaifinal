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
import {
  ArrowDown,
  ArrowRight,
  Check,
  FileText,
  Lock,
  RotateCcw,
} from "lucide-react";
import {
  TRUST_CONFIG,
  TRUST_MODULES,
  TRUST_PLAYBACK_MS,
} from "./trust-config";
import { GOVERNED_AI_NOTE } from "./security-config";
import { easeOut } from "./motion";

/** ZeonAI inverse surfaces for Governed by Design. */
const ACCENT = "#2962FF";
const ACCENT_SOFT = "#111C32";
const PRIMARY = "#F5F6F8";
const SECONDARY = "#A4A7AE";
const HAIRLINE = "rgba(255,255,255,0.10)";
const PANEL = "#12161F";
const PAGE = "#181D27";
const RESTRICTED = "#8B93A1";

const TOTAL = TRUST_MODULES.length;
const GRANTED = new Set<string>(TRUST_CONFIG.role.granted);
const GRANTED_COUNT = TRUST_CONFIG.role.granted.length;

type Phase = 0 | 1 | 2 | 3 | 4;

/**
 * Governed by Design — interactive three-panel lifecycle:
 * Define Role -> Map to Module -> Audit
 */
export function TrustSection() {
  const baseId = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
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
      className="relative z-[1] scroll-mt-24 text-[#F5F6F8]"
      style={{
        background: PAGE,
        borderTop: `1px solid ${HAIRLINE}`,
      }}
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col justify-center px-4 py-14 sm:px-6 md:px-[var(--zeon-gutter,1.25rem)] md:py-20">
        {/* Header: title left, 3-step sequence right */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="max-w-[580px] shrink-0">
            <h2
              id={`${baseId}-heading`}
              className="zeon-type-section max-w-[580px] text-balance !text-[#F5F6F8]"
            >
              Governed by design, not added afterwards
            </h2>
            <p
              className="mt-3 max-w-[520px] text-[16px] leading-[1.55] md:text-[17px]"
              style={{ color: SECONDARY }}
            >
              {TRUST_CONFIG.subtitle}
            </p>
          </div>

          <ol
            className="flex flex-wrap gap-2.5 lg:justify-end"
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
                    className="inline-flex h-10 min-h-[40px] items-center gap-2 rounded-[4px] px-3.5 text-[14px] font-medium transition-colors duration-200"
                    style={{
                      border: `1px solid ${active ? ACCENT : HAIRLINE}`,
                      background: active ? ACCENT_SOFT : "rgba(255,255,255,0.02)",
                      color: active ? PRIMARY : on ? "#D5D7DA" : SECONDARY,
                    }}
                  >
                    <span
                      className="font-mono text-[12px] tabular-nums"
                      style={{
                        color: active ? "#8EB8FF" : on ? "#8EB8FF" : SECONDARY,
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

        {/* Governed AI principle callout — introduces the interactive lifecycle */}
        <div
          className="mt-6 flex flex-col gap-2 rounded-[4px] px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-4"
          style={{
            background: "rgba(17, 28, 50, 0.55)",
            border: "1px solid rgba(41, 98, 255, 0.28)",
          }}
        >
          <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#8EB8FF]">
            Governed AI
          </span>
          <p className="text-[13.5px] leading-[1.5] text-[#D5D7DA]">
            {GOVERNED_AI_NOTE}
          </p>
        </div>

        {/* Three-panel governance grid */}
        <div
          className="mt-5 overflow-hidden rounded-[6px]"
          style={{
            background: PANEL,
            border: `1px solid ${HAIRLINE}`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[29%_45%_26%]">
            {/* Panel 1: Roles */}
            <div
              className="flex flex-col border-b p-5 sm:p-6 lg:border-b-0 lg:border-r"
              style={{ borderColor: HAIRLINE }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[17px] font-medium tracking-[-0.015em] text-[#F5F6F8]">
                  Roles
                </h3>
                <span
                  className="font-mono text-[11px] tabular-nums"
                  style={{ color: SECONDARY }}
                >
                  <span style={{ color: "#8EB8FF" }}>{GRANTED_COUNT}</span>
                  {` of ${TOTAL} modules`}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-[14px] font-medium text-[#D5D7DA]">
                  {TRUST_CONFIG.role.label}
                </span>
                <span className="rounded-[3px] border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#A4A7AE]">
                  Example role
                </span>
              </div>

              <ul className="mt-4 grid grid-cols-2 gap-2 min-[360px]:grid-cols-3">
                {TRUST_MODULES.map((name) => {
                  const granted = GRANTED.has(name);
                  return (
                    <li key={name} className="min-w-0">
                      <div
                        className="flex h-[60px] flex-col justify-between rounded-[4px] px-2 py-2"
                        style={{
                          background: granted
                            ? ACCENT_SOFT
                            : "rgba(255,255,255,0.015)",
                          border: granted
                            ? "1px solid rgba(53,109,255,0.55)"
                            : `1px dashed ${HAIRLINE}`,
                        }}
                        aria-label={`${name}, ${granted ? "access granted" : "restricted"}`}
                      >
                        <span className="flex justify-end" aria-hidden>
                          {granted ? (
                            <span
                              className="flex size-4 items-center justify-center rounded-[2px] text-white"
                              style={{ background: ACCENT }}
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
                          className="text-[11px] font-medium leading-tight sm:text-[11.5px]"
                          style={{
                            color: granted ? PRIMARY : RESTRICTED,
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
                className="mt-auto pt-4 text-[11.5px] leading-[1.45]"
                style={{ color: RESTRICTED }}
              >
                {TRUST_CONFIG.disclaimer}
              </p>
            </div>

            {/* Panel 2: Access Check */}
            <div
              className="flex flex-col border-b p-5 sm:p-6 lg:border-b-0 lg:border-r"
              style={{ borderColor: HAIRLINE }}
            >
              <div>
                <h3 className="text-[17px] font-medium tracking-[-0.015em] text-[#F5F6F8]">
                  Access Check
                </h3>
                <p
                  className="mt-1 text-[13px] leading-[1.45]"
                  style={{ color: SECONDARY }}
                >
                  {TRUST_CONFIG.caption}
                </p>
              </div>

              {/* Connected request pipeline: CAPEX Request -> User Request -> Access Check */}
              <div className="mt-5 flex flex-col items-stretch sm:items-start">
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-1.5 xl:gap-2">
                  {/* CAPEX Request */}
                  <span
                    className="inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[4px] px-2.5 font-mono text-[11.5px] font-medium lg:px-2 lg:text-[10.5px] xl:px-2.5 xl:text-[11.5px]"
                    style={{
                      background: ACCENT_SOFT,
                      border: "1px solid rgba(53,109,255,0.55)",
                      color: "#8EB8FF",
                    }}
                  >
                    <FileText className="size-3.5 shrink-0" aria-hidden />
                    CAPEX Request
                  </span>

                  <ArrowRight
                    className="hidden size-3.5 shrink-0 sm:block"
                    style={{ color: phase >= 1 ? "#8EB8FF" : SECONDARY }}
                    aria-hidden
                  />
                  <ArrowDown
                    className="ml-3 size-3.5 shrink-0 sm:hidden"
                    style={{ color: phase >= 1 ? "#8EB8FF" : SECONDARY }}
                    aria-hidden
                  />

                  {/* User Request */}
                  <FlowNode
                    label="User Request"
                    active={phase >= 1}
                    emphasize={phase === 1}
                  />

                  <ArrowRight
                    className="hidden size-3.5 shrink-0 sm:block"
                    style={{ color: phase >= 2 ? "#8EB8FF" : SECONDARY }}
                    aria-hidden
                  />
                  <ArrowDown
                    className="ml-3 size-3.5 shrink-0 sm:hidden"
                    style={{ color: phase >= 2 ? "#8EB8FF" : SECONDARY }}
                    aria-hidden
                  />

                  {/* Access Check */}
                  <FlowNode
                    label="Access Check"
                    active={phase >= 2}
                    emphasize={phase === 2}
                    icon="lock"
                  />
                </div>

                {/* Centered T-branch stem connecting request pipeline down to Permitted / Withheld */}
                <div className="ml-3 flex flex-col items-start sm:ml-0 sm:w-full sm:items-center">
                  <div
                    className="h-4 w-px transition-colors duration-200"
                    style={{
                      background:
                        phase >= 3 ? "rgba(142,184,255,0.45)" : HAIRLINE,
                    }}
                    aria-hidden
                  />
                  <div
                    className="hidden h-px w-1/2 transition-colors duration-200 sm:block"
                    style={{
                      background:
                        phase >= 3 ? "rgba(142,184,255,0.35)" : HAIRLINE,
                    }}
                    aria-hidden
                  />
                  <ArrowDown
                    className="-ml-[6.5px] -mt-1 size-3.5 transition-colors duration-200 sm:hidden"
                    style={{ color: phase >= 3 ? "#8EB8FF" : RESTRICTED }}
                    aria-hidden
                  />
                </div>

                {/* Outcomes grouped directly beneath Access Check */}
                <div className="mt-1.5 grid w-full grid-cols-1 gap-2.5 sm:mt-2 sm:grid-cols-2">
                  {/* Permitted outcome */}
                  <div
                    className="rounded-[4px] p-3 lg:p-2.5 xl:p-3 transition-all duration-200"
                    style={{
                      border: `1px solid ${
                        phase >= 3 ? "rgba(53,109,255,0.6)" : HAIRLINE
                      }`,
                      background:
                        phase >= 3 ? ACCENT_SOFT : "rgba(255,255,255,0.015)",
                      opacity: phase >= 3 ? 1 : 0.45,
                    }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#F5F6F8]">
                        <Check
                          className="size-3.5 shrink-0 text-[#8EB8FF]"
                          aria-hidden
                        />
                        Permitted
                      </span>
                      <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.06em] text-[#8EB8FF]">
                        {TRUST_CONFIG.flow.permitted.length} docs
                      </span>
                    </div>
                    <ul className="mt-2.5 space-y-1.5 border-t border-white/10 pt-2.5">
                      {TRUST_CONFIG.flow.permitted.map((doc) => (
                        <li
                          key={doc}
                          className="flex items-start gap-1.5 text-[12.5px] leading-[1.35] text-[#E4E7EC]"
                        >
                          <Check
                            className="mt-0.5 size-3 shrink-0 text-[#8EB8FF]"
                            aria-hidden
                          />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Withheld outcome */}
                  <div
                    className="rounded-[4px] p-3 lg:p-2.5 xl:p-3 transition-all duration-200"
                    style={{
                      border: `1px solid ${HAIRLINE}`,
                      background: "rgba(255,255,255,0.02)",
                      opacity: phase >= 3 ? 1 : 0.45,
                    }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-1.5 gap-y-0.5">
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#D5D7DA]">
                        <Lock
                          className="size-3.5 shrink-0 text-[#8B93A1]"
                          aria-hidden
                        />
                        Withheld
                      </span>
                      <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.06em] text-[#8B93A1] lg:text-[8.5px] lg:tracking-normal xl:text-[10px] xl:tracking-[0.06em]">
                        {TRUST_CONFIG.flow.withheld.length} outside access
                      </span>
                    </div>
                    <ul className="mt-2.5 space-y-1.5 border-t border-white/10 pt-2.5">
                      {TRUST_CONFIG.flow.withheld.map((doc) => (
                        <li
                          key={doc}
                          className="flex items-start gap-1.5 text-[12.5px] leading-[1.35] text-[#8B93A1]"
                        >
                          <Lock
                            className="mt-0.5 size-3 shrink-0 text-[#8B93A1]"
                            aria-hidden
                          />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 3: Audit Trail */}
            <div className="flex flex-col p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[17px] font-medium tracking-[-0.015em] text-[#F5F6F8]">
                  Audit Trail
                </h3>
                <span
                  className="rounded-[3px] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]"
                  style={{
                    border: `1px solid ${HAIRLINE}`,
                    color: SECONDARY,
                  }}
                >
                  Sample data
                </span>
              </div>

              <ol
                className="relative mt-4 flex flex-1 flex-col gap-3.5 border-l border-white/10 pl-4"
                aria-live={playing && !reduceMotion ? "polite" : "off"}
                aria-relevant="additions"
              >
                {TRUST_CONFIG.audit.map((row, i) => {
                  const show = i < visibleAudit;
                  const isLatest = i === visibleAudit - 1;
                  return (
                    <li
                      key={`${row.time}-${row.actor}-${i}`}
                      className="relative"
                    >
                      <span
                        aria-hidden
                        className="absolute -left-[20.5px] top-1.5 size-2 rounded-full transition-colors duration-200"
                        style={{
                          background: show
                            ? isLatest
                              ? ACCENT
                              : "#8EB8FF"
                            : "rgba(255,255,255,0.15)",
                        }}
                      />
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
                            <div className="flex flex-wrap items-baseline gap-x-2">
                              <span className="font-mono text-[11px] tabular-nums text-[#8EB8FF]">
                                {row.time}
                              </span>
                              <span className="font-mono text-[12px] font-medium text-[#F5F6F8]">
                                {row.actor}
                              </span>
                            </div>
                            <p className="mt-0.5 text-[12.5px] leading-[1.4] text-[#A4A7AE]">
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

        {/* Replay — below panel, right-aligned */}
        <div className="mt-3.5 flex justify-end">
          <button
            type="button"
            onClick={runPlayback}
            className="inline-flex h-10 min-h-[40px] items-center gap-2 rounded-[4px] px-3.5 text-[13.5px] font-medium transition-colors hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              border: `1px solid ${HAIRLINE}`,
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
  icon,
}: {
  label: string;
  active?: boolean;
  emphasize?: boolean;
  icon?: "lock" | "check";
}) {
  return (
    <div
      className="inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[4px] px-2.5 text-[13px] font-medium transition-colors duration-200 lg:px-2 lg:text-[11.5px] xl:px-2.5 xl:text-[13px]"
      style={{
        border: `1px solid ${
          emphasize
            ? ACCENT
            : active
              ? "rgba(255,255,255,0.18)"
              : HAIRLINE
        }`,
        background: emphasize
          ? ACCENT_SOFT
          : active
            ? "rgba(255,255,255,0.04)"
            : "transparent",
        color: emphasize || active ? PRIMARY : SECONDARY,
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
