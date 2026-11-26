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
      className="relative scroll-mt-24 overflow-hidden border-t border-[#E9EAEB] bg-[#FAFAF9] text-[#181D27]"
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
          <h2
            id={`${baseId}-heading`}
            className="zeon-type-section mt-3 text-balance"
          >
            Who are you?
          </h2>
          <p className="mt-3 font-[family-name:var(--font-aeonik)] text-[22px] leading-snug tracking-[-0.025em] text-[#181D27] md:text-[28px]">
            Intelligence built around your role.
          </p>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-[#535862] md:text-[17px]">
            Choose your function. Module availability updates for each role.
          </p>
        </motion.div>

        {/* Role selector */}
        <div className="mt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#717680]">
            Select your role
          </p>
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Professional role"
            aria-orientation={isMobileTabs ? "horizontal" : "horizontal"}
            onKeyDown={onRoleKeyDown}
            className="relative mt-3 flex gap-1.5 overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-[12px] border border-[#E9EAEB] bg-white p-1.5 shadow-[0_1px_2px_rgba(24,29,39,0.04)] lg:flex-wrap lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute z-0 rounded-[8px] border border-[#2962FF]/40 bg-white shadow-[0_2px_10px_rgba(41,98,255,0.16)]"
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
                    selected
                      ? "text-[#181D27]"
                      : "text-[#717680] hover:text-[#181D27]"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Module board */}
        <div
          id={`${baseId}-board`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${role.slug}`}
          className="relative mt-8 overflow-hidden rounded-[16px] border border-[#E9EAEB] bg-white p-4 shadow-[0_1px_2px_rgba(24,29,39,0.04),0_8px_24px_rgba(24,29,39,0.06)] md:p-6"
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#717680]">
                Modules
              </p>
              <p className="mt-1 text-[15px] text-[#535862]">
                Included for {role.label}
              </p>
            </div>
            <div
              className="min-w-[11rem] rounded-[10px] border border-[#E9EAEB] bg-white px-3 py-2.5"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] tabular-nums text-[#181D27]">
                <span style={{ color: ACCENT }}>{includedCount}</span>
                <span className="text-[#717680]"> / {MODULE_IDS.length} active</span>
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#717680]">
                {includedCount} modules · {agentCount} agents
              </p>
              <div
                className="mt-2 flex gap-1"
                role="img"
                aria-label={`${includedCount} of ${MODULE_IDS.length} modules active`}
              >
                {MODULE_IDS.map((id, i) => (
                  <span
                    key={id}
                    className="h-1 flex-1 rounded-[1px]"
                    style={{
                      backgroundColor:
                        i < includedCount ? ACCENT : "#E9EAEB",
                    }}
                  />
                ))}
              </div>
              <span className="sr-only">
                {role.label}: {includedCount} of ${MODULE_IDS.length} modules active
              </span>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-2.5">
            {MODULE_IDS.map((name, i) => {
              const included = isModuleIncluded(role, name as ModuleId);
              return (
                <li key={name} className="min-w-0 last:col-span-2 sm:last:col-span-1">
                  <div
                    className={`flex h-full min-h-[92px] flex-col justify-between rounded-[8px] border px-3 py-3 transition-[border-color,background-color,box-shadow,opacity,transform] duration-200 ${
                      included
                        ? "border-[#BCD3FF] bg-[#EEF4FF] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_4px_12px_rgba(41,98,255,0.08)]"
                        : "border-dashed border-[#D5D7DA] bg-white opacity-80"
                    }`}
                    aria-label={`${name}, ${included ? "included" : "not included"}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-[12.5px] font-medium leading-snug tracking-[-0.01em] md:text-[13px] ${
                          included ? "text-[#181D27]" : "text-[#A4A7AE]"
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
                              className="flex size-4 items-center justify-center rounded-[3px] text-white shadow-[0_2px_6px_rgba(41,98,255,0.35)]"
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
                              className="size-3.5 rounded-full border border-[#D5D7DA] bg-[#F5F6F8]"
                            />
                          )}
                        </AnimatePresence>
                      </span>
                    </div>
                    <p
                      className={`mt-2 font-mono text-[9px] uppercase tracking-[0.14em] ${
                        included ? "text-[#2962FF]" : "text-[#A4A7AE]"
                      }`}
                    >
                      {included ? "INCLUDED" : "NOT INCLUDED"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Configured agents */}
          <div className="mt-5 min-h-[52px] rounded-[10px] border border-[#E9EAEB] bg-white px-3 py-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#717680]">
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
                    className="rounded-[6px] border border-[#E9EAEB] bg-[#EEF0F3] px-2.5 py-1 text-[11px] tracking-[-0.01em] text-[#181D27]"
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
            className="zeon-btn zeon-btn-accent !rounded-[10px] !text-[13px]"
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
