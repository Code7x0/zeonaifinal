"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  Check,
  Database,
  FileSearch,
  FileText,
  Pause,
  Play,
  Scale,
  ScrollText,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { HOOD, HOOD_STAGES } from "./hood-config";

const ICONS = [
  Database,
  FileSearch,
  Scale,
  Workflow,
  ShieldCheck,
  ScrollText,
] as const;

const EASE = HOOD.ease;
const H = HOOD;

/**
 * Deep-tech six-layer document journey.
 * Behaviour: select layer, Play walkthrough, CAPEX-2291 on the rail.
 * Visual: ZeonAI brand palette, sharp geometry, one-viewport density.
 */
export function EngineeringSection() {
  const baseId = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const revealed = useInView(sectionRef, { once: true, amount: 0.2 });

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [walkDone, setWalkDone] = useState(false);
  const [layout, setLayout] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const playRef = useRef<number | null>(null);
  const stageIndexRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      if (w >= 1200) setLayout("desktop");
      else if (w >= 768) setLayout("tablet");
      else setLayout("mobile");
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  const stage = HOOD_STAGES[active]!;

  const stopPlayback = useCallback(() => {
    if (playRef.current != null) {
      window.clearInterval(playRef.current);
      playRef.current = null;
    }
    setPlaying(false);
  }, []);

  const startPlayback = useCallback(() => {
    if (reduceMotion) return;
    stopPlayback();
    setWalkDone(false);
    stageIndexRef.current = 0;
    setActive(0);
    setPlaying(true);
    playRef.current = window.setInterval(() => {
      if (pausedRef.current) return;
      stageIndexRef.current += 1;
      if (stageIndexRef.current >= HOOD_STAGES.length) {
        stopPlayback();
        setActive(HOOD_STAGES.length - 1);
        setWalkDone(true);
        return;
      }
      setActive(stageIndexRef.current);
    }, H.stageMs);
  }, [reduceMotion, stopPlayback]);

  useEffect(() => () => stopPlayback(), [stopPlayback]);

  const select = useCallback(
    (i: number) => {
      stopPlayback();
      setWalkDone(false);
      setActive(i);
    },
    [stopPlayback],
  );

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      next = (i + 1) % HOOD_STAGES.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      next = (i - 1 + HOOD_STAGES.length) % HOOD_STAGES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = HOOD_STAGES.length - 1;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(i);
      return;
    } else {
      return;
    }
    select(next);
    tabRefs.current[next]?.focus();
  };

  const progressPct = (active / (HOOD_STAGES.length - 1)) * 100;

  return (
    <section
      ref={sectionRef}
      id="engineering"
      className="relative overflow-hidden"
      style={
        {
          color: H.gray900,
          backgroundColor: H.blue50,
          backgroundImage: `
            radial-gradient(ellipse 70% 55% at 50% -10%, ${H.blue100} 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 50% 40%, transparent 40%, ${H.blue50} 75%),
            linear-gradient(rgba(41,98,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(41,98,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 24px 24px, 24px 24px",
        } as CSSProperties
      }
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="relative mx-auto max-w-[1200px] px-5 pb-20 pt-12 md:px-8 md:pb-24 md:pt-16">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-[560px] text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={revealed ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <p
            className="inline-flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{ color: H.blue500, fontFamily: H.mono }}
          >
            03 · Under the hood
            <span
              aria-hidden
              className="hidden h-px w-9 sm:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(188,211,255,0.9), transparent)",
              }}
            />
            <span style={{ color: H.gray400 }}>Sheet · Journey</span>
          </p>
          <h2
            id={`${baseId}-heading`}
            className="mt-2 font-[family-name:var(--font-aeonik)] text-[36px] font-normal leading-[1.06] tracking-[-0.035em] text-[#181D27] max-md:whitespace-normal md:whitespace-nowrap md:text-[52px]"
          >
            How it works under the hood
          </h2>
          <p className="mt-4">
            <Link
              href="/architecture"
              className="text-[14px] font-medium text-[#1B46F5] underline-offset-4 hover:underline"
            >
              Explore the six-layer reference architecture
            </Link>
          </p>
          <p
            className="mx-auto mt-2 max-w-[560px] text-[18px] leading-[1.5]"
            style={{ color: H.gray600 }}
          >
            Follow one document through the six governed stages, from upload to
            the audited record.
          </p>
        </motion.div>

        {/* Worked-example bar */}
        <motion.div
          className="mx-auto mt-6 flex h-10 max-w-fit items-center gap-2.5 overflow-hidden whitespace-nowrap px-3"
          style={{
            background: H.white,
            border: `1px solid ${H.gray200}`,
            borderRadius: H.radius.card,
          }}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={revealed ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.35, delay: reduceMotion ? 0 : 0.04, ease: EASE }}
        >
          <FileText className="size-4 shrink-0" style={{ color: H.blue500 }} aria-hidden />
          <span className="text-[14px]" style={{ color: H.gray900 }}>
            Worked example
          </span>
          <span
            className="inline-flex items-center px-1.5 py-0.5"
            style={{
              fontFamily: H.mono,
              fontSize: 13,
              background: H.blue50,
              color: H.blue700,
              borderRadius: H.radius.sm,
            }}
          >
            CAPEX-2291
          </span>
          <span className="text-[14px]" style={{ color: H.gray600 }}>
            $186,400
          </span>
          <span className="text-[14px]" style={{ color: H.gray900 }}>
            Contoso plant upgrade
          </span>
          <span
            className="px-1.5 py-0.5 text-[12px]"
            style={{
              color: H.gray500,
              background: "#F5F5F5",
              borderRadius: H.radius.sm,
            }}
          >
            Sample data
          </span>
        </motion.div>

        {/* Desktop / tablet: rail + cards + inspector */}
        {layout !== "mobile" ? (
          <>
            <div
              className="mt-6"
              onMouseEnter={() => {
                if (playing) pausedRef.current = true;
              }}
              onMouseLeave={() => {
                pausedRef.current = false;
              }}
              onFocusCapture={() => {
                if (playing) pausedRef.current = true;
              }}
              onBlurCapture={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  pausedRef.current = false;
                }
              }}
            >
              <Rail
                active={active}
                walkDone={walkDone}
                progressPct={progressPct}
                reduceMotion={reduceMotion}
              />

              <div
                role="tablist"
                aria-label="Six governed stages"
                className={`mt-4 grid gap-3 ${
                  layout === "desktop"
                    ? "grid-cols-6"
                    : "grid-cols-3"
                }`}
              >
                {HOOD_STAGES.map((s, i) => (
                  <StageCard
                    key={s.id}
                    index={i}
                    stage={s}
                    selected={active === i}
                    completed={
                      (playing || walkDone) && i < active
                        ? true
                        : walkDone && i === active
                    }
                    reduceMotion={reduceMotion}
                    revealed={revealed}
                    tabId={`${baseId}-tab-${i}`}
                    panelId={`${baseId}-panel`}
                    buttonRef={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    onSelect={() => select(i)}
                    onKeyDown={(e) => onTabKeyDown(e, i)}
                  />
                ))}
              </div>
            </div>

            <Inspector
              baseId={baseId}
              stage={stage}
              active={active}
              layout={layout}
              reduceMotion={reduceMotion}
            />
          </>
        ) : (
          <MobileTimeline
            baseId={baseId}
            active={active}
            select={select}
            walkDone={walkDone}
            playing={playing}
            tabRefs={tabRefs}
            onTabKeyDown={onTabKeyDown}
            reduceMotion={reduceMotion}
          />
        )}

        {/* Buttons */}
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-6">
          {!reduceMotion ? (
            <button
              type="button"
              onClick={() => (playing ? stopPlayback() : startPlayback())}
              aria-pressed={playing}
              className="inline-flex h-11 min-h-[44px] items-center justify-center gap-2 px-5 text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                borderRadius: H.radius.card,
                background: H.white,
                border: `1px solid ${H.gray300}`,
                color: H.gray900,
                outlineColor: H.blue500,
              }}
            >
              {playing ? (
                <>
                  <Pause className="size-4" aria-hidden />
                  Pause
                </>
              ) : walkDone ? (
                <>
                  <Check className="size-4" style={{ color: H.success }} aria-hidden />
                  Play walkthrough
                </>
              ) : (
                <>
                  <Play className="size-4" aria-hidden />
                  Play walkthrough
                </>
              )}
            </button>
          ) : null}
          <Link
            href="/engineering"
            className="inline-flex h-11 min-h-[44px] items-center justify-center gap-2 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#1433E1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              borderRadius: H.radius.card,
              background: H.blue600,
              outlineColor: H.blue500,
            }}
          >
            Read more
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Rail({
  active,
  walkDone,
  progressPct,
  reduceMotion,
}: {
  active: number;
  walkDone: boolean;
  progressPct: number;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative mx-auto max-w-[1100px] px-1">
      <div className="mb-2 flex items-center justify-between gap-4">
        <span
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ color: H.gray600 }}
        >
          <FileText className="size-3.5" aria-hidden />
          Document in
        </span>
        <span
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ color: H.gray600 }}
        >
          <Check className="size-3.5" aria-hidden />
          Record posted · Audit trail
        </span>
      </div>

      <div className="relative h-10">
        <div
          className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2"
          style={{ background: H.gray200 }}
          aria-hidden
        />
        <motion.div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2"
          style={{ backgroundImage: H.logoGradient }}
          animate={{ width: `${progressPct}%` }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: H.moveMs / 1000, ease: EASE }
          }
          aria-hidden
        />

        <div className="absolute inset-0 flex items-center justify-between">
          {HOOD_STAGES.map((s, i) => {
            const done = i < active || (walkDone && i <= active);
            const on = i === active;
            return (
              <span
                key={s.id}
                className="relative z-[1] flex size-3 items-center justify-center rounded-full"
                style={{
                  background: done
                    ? H.blue500
                    : on
                      ? H.white
                      : H.white,
                  border: done
                    ? "none"
                    : on
                      ? `2px solid ${H.blue500}`
                      : `2px solid ${H.gray300}`,
                  boxShadow: on ? H.nodeHalo : undefined,
                }}
                aria-hidden
              >
                {done ? (
                  <Check className="size-2 text-white stroke-[3]" />
                ) : null}
              </span>
            );
          })}
        </div>

        {/* CAPEX chip above active node */}
        <motion.div
          className="pointer-events-none absolute z-[2] -translate-x-1/2"
          style={{ top: 0 }}
          animate={{ left: `${progressPct}%` }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: H.moveMs / 1000, ease: EASE }
          }
          aria-hidden
        >
          <span
            className="relative inline-flex h-7 items-center whitespace-nowrap px-2"
            style={{
              background: H.white,
              border: `1px solid ${H.blue200}`,
              borderRadius: H.radius.md,
              fontFamily: H.mono,
              fontSize: 12,
              color: H.blue700,
            }}
          >
            CAPEX-2291
            <span
              className="absolute left-1/2 top-full -mt-px h-1.5 w-1.5 -translate-x-1/2 rotate-45"
              style={{
                background: H.white,
                borderRight: `1px solid ${H.blue200}`,
                borderBottom: `1px solid ${H.blue200}`,
              }}
            />
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function StageCard({
  index,
  stage,
  selected,
  completed,
  reduceMotion,
  revealed,
  tabId,
  panelId,
  buttonRef,
  onSelect,
  onKeyDown,
}: {
  index: number;
  stage: (typeof HOOD_STAGES)[number];
  selected: boolean;
  completed?: boolean;
  reduceMotion: boolean;
  revealed: boolean;
  tabId: string;
  panelId: string;
  buttonRef: (el: HTMLButtonElement | null) => void;
  onSelect: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
}) {
  const Icon = ICONS[index]!;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.3,
        delay: reduceMotion ? 0 : index * 0.04,
        ease: EASE,
      }}
      className="h-full"
    >
      <button
        ref={buttonRef}
        type="button"
        role="tab"
        id={tabId}
        aria-selected={selected}
        aria-controls={panelId}
        tabIndex={selected ? 0 : -1}
        onClick={onSelect}
        onKeyDown={onKeyDown}
        className="relative flex h-36 w-full flex-col p-4 text-left transition-[transform,border-color,box-shadow] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          borderRadius: H.radius.card,
          background: H.white,
          border: `1px solid ${selected ? H.blue500 : H.gray200}`,
          boxShadow: selected ? `${H.shadow}, ${H.activeRing}` : H.shadow,
          transform: selected ? undefined : undefined,
          outlineColor: H.blue500,
          opacity: 1,
        }}
        onMouseEnter={(e) => {
          if (selected) return;
          e.currentTarget.style.borderColor = H.blue200;
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          if (selected) return;
          e.currentTarget.style.borderColor = H.gray200;
          e.currentTarget.style.transform = "";
        }}
      >
        {selected ? (
          <span
            className="absolute inset-x-0 top-0 h-0.5"
            style={{
              backgroundImage: H.logoGradient,
              borderRadius: `${H.radius.card}px ${H.radius.card}px 0 0`,
            }}
            aria-hidden
          />
        ) : null}

        <div className="flex items-start justify-between gap-2">
          <span
            className="flex size-8 items-center justify-center"
            style={{
              borderRadius: H.radius.md,
              background: selected ? undefined : H.blue50,
              backgroundImage: selected ? H.logoGradient : undefined,
            }}
            aria-hidden
          >
            <Icon
              className="size-4 stroke-[1.75]"
              style={{ color: selected ? H.white : H.blue600 }}
            />
          </span>
          <span className="inline-flex items-center gap-1">
            {completed ? (
              <Check
                className="size-3"
                style={{ color: H.success }}
                aria-hidden
              />
            ) : null}
            <span
              className="tabular-nums"
              style={{
                fontFamily: H.mono,
                fontSize: 12,
                color: H.gray500,
              }}
            >
              {stage.id}
            </span>
          </span>
        </div>

        <span
          className="mt-2 text-[16px] font-semibold leading-[1.25] text-balance"
          style={{ color: H.gray900 }}
        >
          {stage.name}
        </span>
        <span
          className="mt-1 line-clamp-2 text-[14px] leading-[1.45]"
          style={{ color: H.gray600 }}
        >
          {stage.card}
        </span>
      </button>
    </motion.div>
  );
}

function Inspector({
  baseId,
  stage,
  active,
  layout,
  reduceMotion,
}: {
  baseId: string;
  stage: (typeof HOOD_STAGES)[number];
  active: number;
  layout: "desktop" | "tablet" | "mobile";
  reduceMotion: boolean;
}) {
  return (
    <div
      id={`${baseId}-panel`}
      role="tabpanel"
      aria-labelledby={`${baseId}-tab-${active}`}
      aria-live="polite"
      className="relative mt-4 min-h-[180px] overflow-hidden p-6"
      style={{
        background: H.gray900,
        borderRadius: H.radius.panel,
        border: `1px solid ${H.gray800}`,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
    >
      <span
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ backgroundImage: H.logoGradient }}
        aria-hidden
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.15, ease: EASE }}
          className={`grid gap-5 ${
            layout === "desktop"
              ? "grid-cols-[4fr_3fr_3fr] gap-0"
              : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          <div
            className={layout === "desktop" ? "pr-6" : ""}
            style={
              layout === "desktop"
                ? { borderRight: `1px solid ${H.gray800}` }
                : undefined
            }
          >
            <p
              className="tabular-nums"
              style={{
                fontFamily: H.mono,
                fontSize: 12,
                color: H.blue400,
              }}
            >
              LAYER {stage.id}
            </p>
            <h3 className="mt-1 text-[24px] font-semibold leading-tight text-white">
              {stage.name}
            </h3>
            <p
              className="mt-2 text-[16px] leading-[1.5] [@media(min-width:1200px)_and_(max-height:768px)]:line-clamp-1"
              style={{ color: H.gray300 }}
            >
              {stage.lead}
            </p>
            <Link
              href="/architecture"
              className="mt-3 inline-flex min-h-[44px] items-center text-[14px] transition-colors hover:text-[#D9E6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ color: H.blue300, outlineColor: H.blue400 }}
            >
              See this layer in the full architecture diagram →
            </Link>
          </div>

          <div
            className={layout === "desktop" ? "px-6" : ""}
            style={
              layout === "desktop"
                ? { borderRight: `1px solid ${H.gray800}` }
                : undefined
            }
          >
            <p
              className="mb-3"
              style={{
                fontFamily: H.mono,
                fontSize: 12,
                color: H.gray400,
              }}
            >
              In → Out
            </p>
            <div className="space-y-3">
              <div>
                <p
                  style={{
                    fontFamily: H.mono,
                    fontSize: 12,
                    color: H.gray400,
                  }}
                >
                  IN
                </p>
                <p className="mt-0.5 whitespace-nowrap text-[16px] font-medium text-white">
                  {stage.receive}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: H.mono,
                    fontSize: 12,
                    color: H.gray400,
                  }}
                >
                  OUT
                </p>
                <p className="mt-0.5 flex items-center gap-2 whitespace-nowrap text-[16px] font-medium text-white">
                  <span
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ background: H.teal500 }}
                    aria-hidden
                  />
                  {stage.handoff}
                </p>
              </div>
            </div>
          </div>

          <div className={layout === "desktop" ? "pl-6 sm:col-span-1" : "sm:col-span-2"}>
            <p
              style={{
                fontFamily: H.mono,
                fontSize: 12,
                color: H.blue300,
              }}
            >
              For CAPEX-2291
            </p>
            <p
              className="mt-2 text-[15px] leading-[1.5]"
              style={{ color: H.gray300 }}
            >
              {stage.forCapex}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MobileTimeline({
  baseId,
  active,
  select,
  walkDone,
  playing,
  tabRefs,
  onTabKeyDown,
  reduceMotion,
}: {
  baseId: string;
  active: number;
  select: (i: number) => void;
  walkDone: boolean;
  playing: boolean;
  tabRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  onTabKeyDown: (e: KeyboardEvent<HTMLButtonElement>, i: number) => void;
  reduceMotion: boolean;
}) {
  return (
    <div
      role="tablist"
      aria-label="Six governed stages"
      className="relative mt-8 space-y-2"
    >
      <div
        className="absolute bottom-2 left-[15px] top-2 w-0.5"
        style={{ background: H.gray200 }}
        aria-hidden
      />
      <div
        className="absolute left-[15px] top-2 w-0.5"
        style={{
          backgroundImage: H.logoGradient,
          height: `calc(${(active / (HOOD_STAGES.length - 1)) * 100}% )`,
        }}
        aria-hidden
      />

      {HOOD_STAGES.map((s, i) => {
        const selected = active === i;
        const Icon = ICONS[i]!;
        const done = (playing || walkDone) && i < active;
        return (
          <div key={s.id} className="relative pl-10">
            <span
              className="absolute left-2 top-5 size-3 rounded-full"
              style={{
                background: done || selected ? H.blue500 : H.white,
                border: `2px solid ${done || selected ? H.blue500 : H.gray300}`,
              }}
              aria-hidden
            />
            <button
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={selected ? `${baseId}-panel` : undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className="flex h-[72px] w-full items-center gap-3 px-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                borderRadius: H.radius.card,
                background: H.white,
                border: `1px solid ${selected ? H.blue500 : H.gray200}`,
                outlineColor: H.blue500,
              }}
            >
              <span
                className="flex size-8 shrink-0 items-center justify-center"
                style={{
                  borderRadius: H.radius.md,
                  background: selected ? undefined : H.blue50,
                  backgroundImage: selected ? H.logoGradient : undefined,
                }}
                aria-hidden
              >
                <Icon
                  className="size-4 stroke-[1.75]"
                  style={{ color: selected ? H.white : H.blue600 }}
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[16px] font-semibold" style={{ color: H.gray900 }}>
                  {s.name}
                </span>
                <span className="block truncate text-[14px]" style={{ color: H.gray600 }}>
                  {s.card}
                </span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {selected ? (
                <motion.div
                  id={`${baseId}-panel`}
                  role="tabpanel"
                  aria-labelledby={`${baseId}-tab-${i}`}
                  aria-live="polite"
                  initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.15, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div
                    className="mt-2 space-y-3 p-4"
                    style={{
                      background: H.gray900,
                      borderRadius: H.radius.panel,
                      border: `1px solid ${H.gray800}`,
                    }}
                  >
                    <p className="text-[15px] leading-[1.5]" style={{ color: H.gray300 }}>
                      {s.lead}
                    </p>
                    <p className="text-[14px] text-white">
                      <span style={{ fontFamily: H.mono, fontSize: 12, color: H.gray400 }}>
                        IN{" "}
                      </span>
                      {s.receive}
                      <span className="mx-2" style={{ color: H.gray500 }}>
                        →
                      </span>
                      <span style={{ fontFamily: H.mono, fontSize: 12, color: H.gray400 }}>
                        OUT{" "}
                      </span>
                      {s.handoff}
                    </p>
                    <p className="text-[14px]" style={{ color: H.gray300 }}>
                      <span style={{ fontFamily: H.mono, fontSize: 12, color: H.blue300 }}>
                        For CAPEX-2291 ·{" "}
                      </span>
                      {s.forCapex}
                    </p>
                    <Link
                      href="/architecture"
                      className="inline-flex min-h-[44px] items-center text-[14px]"
                      style={{ color: H.blue300 }}
                    >
                      See this layer in the architecture diagram →
                    </Link>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
