"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { Check } from "lucide-react";

import {
  MODULE_IDS,
  ROLE_CONFIG,
  isModuleIncluded,
  roleIndexFromSlug,
  type ModuleId,
} from "./role-config";
import { durationEnter, easeOut, enterY } from "../motion";

const ACCENT = "#2962FF";
const TICK_IN = 0.22;
const TICK_OUT = 0.15;
const STAGGER = 0.035;

export function RoleConfigurator() {
  const baseId = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ top: 0, height: 0, left: 0, width: 0 });
  const [isMobileTabs, setIsMobileTabs] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      setActive(roleIndexFromSlug(params.get("role")));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setIsMobileTabs(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const role = ROLE_CONFIG[active]!;
  const includedCount = role.modules.length;
  const agentCount = role.agents.length;

  const selectRole = useCallback(
    (index: number) => {
      setActive(index);
      const slug = ROLE_CONFIG[index]!.slug;
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("role", slug);
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      } catch {
        /* ignore */
      }
      if (isMobileTabs) {
        tabRefs.current[index]?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    },
    [isMobileTabs, reduceMotion],
  );

  const measurePill = useCallback(() => {
    const el = tabRefs.current[active];
    const list = tablistRef.current;
    if (!el || !list) return;
    const listBox = list.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    setPill({
      top: box.top - listBox.top + list.scrollTop,
      left: box.left - listBox.left + list.scrollLeft,
      height: box.height,
      width: box.width,
    });
  }, [active]);

  useLayoutEffect(() => {
    measurePill();
  }, [measurePill, isMobileTabs]);

  useEffect(() => {
    window.addEventListener("resize", measurePill);
    return () => window.removeEventListener("resize", measurePill);
  }, [measurePill]);

  const onRoleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const last = ROLE_CONFIG.length - 1;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        selectRole(active >= last ? 0 : active + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        selectRole(active <= 0 ? last : active - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        selectRole(0);
      } else if (e.key === "End") {
        e.preventDefault();
        selectRole(last);
      }
    },
    [active, selectRole],
  );

  return (
    <section
      id="who-are-you"
      className="relative scroll-mt-24 overflow-hidden border-t border-[#252B37] bg-[#181D27] text-[#F5F6F8]"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="zeon-section-pad relative mx-auto max-w-[var(--zeon-container,1180px)] px-[var(--zeon-gutter,1.25rem)]">
        <motion.div
          className="max-w-[40rem]"
          initial={reduceMotion ? false : { opacity: 0, y: enterY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: durationEnter, ease: easeOut }}
        >
          <p className="mb-1 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8EB8FF]">
            Roles
            <span
              aria-hidden
              className="hidden h-px w-9 bg-[linear-gradient(90deg,rgba(142,184,255,0.55),transparent)] sm:block"
            />
            <span className="text-white/35">Sheet · Access</span>
          </p>
          <h2
            id={`${baseId}-heading`}
            className="zeon-type-section mt-3 text-balance !text-[#F5F6F8]"
          >
            Who are you?
          </h2>
          <p className="mt-3 font-[family-name:var(--font-aeonik)] text-[22px] leading-snug tracking-[-0.025em] text-[#F5F6F8] md:text-[28px]">
            Intelligence built around your role.
          </p>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-[#A0A7B4] md:text-[17px]">
            Choose your function. Module availability updates for each role.
          </p>
        </motion.div>

        {/* Role selector */}
        <div className="mt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#727B8B]">
            Select your role
          </p>
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Professional role"
            aria-orientation={isMobileTabs ? "horizontal" : "horizontal"}
            onKeyDown={onRoleKeyDown}
            className="relative mt-3 flex gap-1.5 overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-[12px] border border-white/[0.06] bg-[#12161F] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_24px_rgba(0,0,0,0.28)] lg:flex-wrap lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute z-0 rounded-[8px] border border-[#2962FF]/70 bg-[#16233F] shadow-[0_4px_14px_rgba(41,98,255,0.28),inset_0_1px_0_rgba(255,255,255,0.08)]"
              animate={{
                top: pill.top,
                left: pill.left,
                width: pill.width,
                height: pill.height,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.3, ease: easeOut }
              }
            />
            {ROLE_CONFIG.map((r, i) => {
              const selected = active === i;
              return (
                <button
                  key={r.slug}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${r.slug}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-board`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectRole(i)}
                  className={`relative z-[1] snap-center shrink-0 rounded-[8px] px-4 py-3 text-left text-[13px] font-medium tracking-[-0.01em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2962FF] min-h-[44px] ${
                    selected ? "text-[#F5F6F8]" : "text-[#8B93A1] hover:text-[#F5F6F8]"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Module board — dark elevated panel (not light glass) */}
        <div
          id={`${baseId}-board`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${role.slug}`}
          className="relative mt-8 overflow-hidden rounded-[16px] border border-white/[0.08] bg-[linear-gradient(165deg,#1A2030_0%,#131820_48%,#0E1219_100%)] p-4 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_18px_48px_rgba(0,0,0,0.45),0_4px_12px_rgba(0,0,0,0.35)] md:p-6"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#727B8B]">
                Modules
              </p>
              <p className="mt-1 text-[15px] text-[#A0A7B4]">
                Included for {role.label}
              </p>
            </div>
            <div
              className="min-w-[11rem] rounded-[10px] border border-white/[0.06] bg-[#0C1018]/80 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] tabular-nums text-[#F5F6F8]">
                <span style={{ color: ACCENT }}>{includedCount}</span>
                <span className="text-[#727B8B]"> / 12 active</span>
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#727B8B]">
                {includedCount} modules · {agentCount} agents
              </p>
              <div
                className="mt-2 flex gap-1"
                role="img"
                aria-label={`${includedCount} of 12 modules active`}
              >
                {MODULE_IDS.map((id, i) => (
                  <span
                    key={id}
                    className="h-1 flex-1 rounded-[1px]"
                    style={{
                      backgroundColor:
                        i < includedCount ? ACCENT : "#292F3A",
                    }}
                  />
                ))}
              </div>
              <span className="sr-only">
                {role.label}: {includedCount} of 12 modules active
              </span>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-2.5">
            {MODULE_IDS.map((name, i) => {
              const included = isModuleIncluded(role, name as ModuleId);
              return (
                <li key={name} className="min-w-0">
                  <div
                    className={`flex h-full min-h-[92px] flex-col justify-between rounded-[8px] border px-3 py-3 transition-[border-color,background-color,box-shadow,opacity,transform] duration-200 ${
                      included
                        ? "border-[#2962FF]/55 bg-[linear-gradient(160deg,#182544_0%,#111C32_55%,#0E1628_100%)] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_8px_20px_rgba(0,0,0,0.35),0_0_0_1px_rgba(41,98,255,0.12)]"
                        : "border-dashed border-[#2A3140] bg-[#0F131B] opacity-75 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                    }`}
                    aria-label={`${name}, ${included ? "included" : "not included"}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-[12.5px] font-medium leading-snug tracking-[-0.01em] md:text-[13px] ${
                          included ? "text-[#F5F6F8]" : "text-[#6B7382]"
                        }`}
                      >
                        {name}
                      </p>
                      <span
                        className="relative flex size-4 shrink-0 items-center justify-center"
                        aria-hidden
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {included ? (
                            <motion.span
                              key={`${role.slug}-${name}-on`}
                              initial={
                                reduceMotion
                                  ? false
                                  : { scale: 0.4, opacity: 0 }
                              }
                              animate={{ scale: 1, opacity: 1 }}
                              exit={
                                reduceMotion
                                  ? undefined
                                  : { scale: 0.5, opacity: 0 }
                              }
                              transition={{
                                duration: reduceMotion ? 0 : TICK_IN,
                                delay: reduceMotion ? 0 : i * STAGGER,
                                ease: [0.23, 1.2, 0.32, 1],
                              }}
                              className="flex size-4 items-center justify-center rounded-[3px] text-white shadow-[0_2px_6px_rgba(41,98,255,0.45)]"
                              style={{ backgroundColor: ACCENT }}
                            >
                              <Check className="size-2.5 stroke-[3]" />
                            </motion.span>
                          ) : (
                            <motion.span
                              key={`${role.slug}-${name}-off`}
                              initial={
                                reduceMotion ? false : { opacity: 0 }
                              }
                              animate={{ opacity: 1 }}
                              exit={
                                reduceMotion ? undefined : { opacity: 0 }
                              }
                              transition={{
                                duration: reduceMotion ? 0 : TICK_OUT,
                                delay: reduceMotion ? 0 : i * STAGGER,
                              }}
                              className="size-3.5 rounded-full border border-[#3D4656] bg-[#161B26]"
                            />
                          )}
                        </AnimatePresence>
                      </span>
                    </div>
                    <p
                      className={`mt-2 font-mono text-[9px] uppercase tracking-[0.14em] ${
                        included ? "text-[#8EB8FF]" : "text-[#4F5868]"
                      }`}
                    >
                      {included ? "INCLUDED" : "NOT INCLUDED"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Configured agents — recessed tray */}
          <div className="mt-5 min-h-[52px] rounded-[10px] border border-white/[0.05] bg-[#0A0E14]/90 px-3 py-3 shadow-[inset_0_2px_8px_rgba(0,0,0,0.35)]">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#727B8B]">
              Configured agents · {agentCount}
            </p>
            <ul className="mt-2 flex min-h-[28px] flex-wrap gap-1.5">
              <AnimatePresence mode="popLayout" initial={false}>
                {role.agents.map((agent) => (
                  <motion.li
                    key={`${role.slug}-${agent}`}
                    layout={!reduceMotion}
                    initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2, ease: easeOut }}
                    className="rounded-[6px] border border-white/[0.08] bg-[linear-gradient(180deg,#1A2230_0%,#121820_100%)] px-2.5 py-1 text-[11px] tracking-[-0.01em] text-[#C4CAD6] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_2px_6px_rgba(0,0,0,0.35)]"
                  >
                    {agent}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-start">
          <Link
            href={`/?role=${role.slug}#demo`}
            className="zeon-btn zeon-btn-accent !rounded-[10px] !text-[13px] !shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_10px_28px_rgba(41,98,255,0.38),0_2px_8px_rgba(0,0,0,0.35)]"
          >
            Book a demo with these modules
            <span className="zeon-btn-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
