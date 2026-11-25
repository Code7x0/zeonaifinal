"use client";

import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLenis } from "lenis/react";
import {
  ArrowRight,
  Building2,
  Check,
  Factory,
  FileText,
  HardHat,
  HeartPulse,
  Landmark,
  Lock,
  Newspaper,
  Radio,
  Shield,
} from "lucide-react";
import {
  INDUSTRY_CARDS,
  type IndustryCard,
  type IndustryCardId,
} from "./industries/industries-home-config";
/** ZeonAI brand palette — no beige, no rainbow. */
const C = {
  white: "#FFFFFF",
  surface: "#FAFAFA",
  border: "#E9EAEB",
  heading: "#181D27",
  body: "#535862",
  muted: "#717680",
  brand: "#2962FF",
  cta: "#1B46F5",
  hover: "#1433E1",
  tint: "#EEF4FF",
  blue300: "#8EB8FF",
  blue200: "#BCD3FF",
  blue800: "#172AB6",
  blue900: "#192A8F",
  success: "#17B26A",
  warning: "#F79009",
  warningSoft: "#FEC84B",
  dark: "#181D27",
  darkBorder: "#252B37",
  gray400: "#A4A7AE",
  blue400: "#5991FF",
} as const;

const EASE = [0.2, 0, 0, 1] as const;

const ICONS: Record<IndustryCardId, typeof Building2> = {
  financial: Landmark,
  super: Building2,
  media: Newspaper,
  gov: Building2,
  defence: Shield,
  metals: Factory,
  construction: HardHat,
  telco: Radio,
  medtech: HeartPulse,
};

/**
 * Industries bento — polished composition on ZeonAI palette tokens.
 * Outcomes marquee is a separate sibling on the homepage; do not touch it.
 */
export function Industries() {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useInView(sectionRef, { once: true, amount: 0.12 });

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="bg-[#ECEEF2] pt-[var(--zeon-space-section-y)] pb-[var(--zeon-space-section-y-sm)] text-[#181D27] md:bg-white md:py-0"
      style={{ color: C.heading }}
    >
      {/* Mobile (<768px): scroll-driven sticky stacked cards (falls back to vertical list on reduced motion) */}
      {!reduceMotion ? (
        <MobileIndustriesStack />
      ) : (
        <div className="zeon-section-pad px-4 md:hidden sm:px-5">
          <div className="mx-auto w-full max-w-[1180px]">
            <IndustriesHeader />
            <div className="mt-8 grid grid-cols-1 gap-4">
              {INDUSTRY_CARDS.map((card) => (
                <SectorCard key={card.id} card={card} density="mobile" />
              ))}
            </div>
            <div className="mt-8">
              <Link href="/industries" className="zeon-link-arrow">
                See all industries
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tablet & Desktop (>=768px): unchanged responsive equal-size grid */}
      <div className="zeon-section-pad hidden px-[var(--zeon-gutter,1.25rem)] md:block">
        <div className="mx-auto max-w-[1180px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={revealed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <IndustriesHeader />
          </motion.div>

          <div className="mt-12 grid items-stretch gap-4 md:auto-rows-fr md:grid-cols-2 xl:grid-cols-3">
            {INDUSTRY_CARDS.map((card, index) => (
              <CardMotion
                key={card.id}
                index={index}
                revealed={revealed}
                reduceMotion={reduceMotion}
              >
                <SectorCard card={card} />
              </CardMotion>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/industries" className="zeon-link-arrow">
              See all industries
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustriesHeader({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <h2
        className={`zeon-type-section max-w-[720px] text-balance font-normal ${
          compact
            ? "text-[1.5rem] leading-[1.2] tracking-[-0.02em]"
            : ""
        }`}
      >
        Built for regulated,{" "}
        <br className="hidden sm:block" />
        <span className="sm:whitespace-nowrap">document-heavy</span> sectors
      </h2>
      <p
        className={`zeon-type-lead max-w-[560px] ${
          compact ? "mt-2 text-[14px] leading-[1.4]" : "mt-4"
        }`}
        style={{ color: C.body }}
      >
        The same platform, with agents built for each sector. Examples from our
        agent portfolio.
      </p>
    </>
  );
}

/** Scroll distance per card — longer travel = smoother handoff. */
const MOBILE_STACK_VH_PER_STEP = 64;

/**
 * Fixed slot height — sized to the content (icon, line, vignette, footer),
 * not the viewport, so cards don’t look empty on tall phones.
 */
const MOBILE_CARD_H = "h-[clamp(320px,40svh,400px)]";

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function MobileIndustriesStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastActiveRef = useRef(0);
  const count = INDUSTRY_CARDS.length;
  /* Lean lead-in/out so tall phones don’t feel empty before/after the stack. */
  const trackHeightVh = (count - 1) * MOBILE_STACK_VH_PER_STEP + 40;

  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const viewH = window.innerHeight;
    const scrollable = Math.max(1, track.offsetHeight - viewH);
    const rect = track.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
    const floatIndex = progress * (count - 1);
    const rounded = Math.min(count - 1, Math.max(0, Math.round(floatIndex)));

    if (rounded !== lastActiveRef.current) {
      lastActiveRef.current = rounded;
      setActiveIndex(rounded);
    }

    for (let i = 0; i < count; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      const rawEnter =
        i === 0 ? 1 : Math.min(1, Math.max(0, floatIndex - (i - 1)));
      const enter = smoothstep(rawEnter);
      const covered = floatIndex - i > 0.98;

      /*
       * Strict slot lock:
       * - Incoming cards only translate from +100% → 0 (never negative Y)
       * - Fully covered past cards are hidden so they can’t peek or drift
       * - Seekbar lives outside this slot, so it can never be covered
       */
      if (i > 0 && rawEnter <= 0.001) {
        el.style.transform = "translate3d(0, 100%, 0)";
        el.style.opacity = "0";
        el.style.visibility = "hidden";
        el.style.pointerEvents = "none";
      } else if (covered) {
        el.style.transform = "translate3d(0, 0, 0)";
        el.style.opacity = "0";
        el.style.visibility = "hidden";
        el.style.pointerEvents = "none";
      } else {
        const yPct = i === 0 ? 0 : (1 - enter) * 100;
        el.style.transform = `translate3d(0, ${yPct.toFixed(2)}%, 0)`;
        el.style.opacity = String(
          i === 0 ? 1 : Math.min(1, 0.15 + enter * 0.85),
        );
        el.style.visibility = "visible";
        el.style.pointerEvents = rounded === i ? "auto" : "none";
      }
    }
  }, [count]);

  useLenis(() => {
    syncFromScroll();
  }, [syncFromScroll]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let active = false;

    const loop = () => {
      syncFromScroll();
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (!active) {
            active = true;
            raf = requestAnimationFrame(loop);
          }
        } else if (active) {
          active = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );

    io.observe(track);
    syncFromScroll();
    window.addEventListener("resize", syncFromScroll, { passive: true });

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", syncFromScroll);
    };
  }, [syncFromScroll]);

  return (
    <div
      ref={trackRef}
      className="relative md:hidden"
      style={{ height: `${trackHeightVh}svh` }}
    >
      {/*
        Content-sized sticky (no 100svh min-height) — kills the huge empty
        bands on iPhone 16 Pro Max above/below the stack.
      */}
      <div
        className="sticky px-4 pb-4 pt-1 sm:px-5"
        style={{ top: "max(0.5rem, var(--zeon-header-offset, 0px))" }}
      >
        <div className="mx-auto w-full max-w-[430px]">
          {/* Chrome stays above the card slot — solid wash so cards can’t show through. */}
          <div className="relative z-30 bg-[#ECEEF2]">
            <IndustriesHeader compact />

            <div className="mt-2 flex items-center justify-between pb-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#717680]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1" aria-hidden>
                {INDUSTRY_CARDS.map((c, idx) => (
                  <span
                    key={c.id}
                    className={`h-1 rounded-full transition-[width,background-color] duration-300 ease-out ${
                      idx === activeIndex
                        ? "w-4 bg-[#1B46F5]"
                        : idx < activeIndex
                          ? "w-1.5 bg-[#BCD3FF]"
                          : "w-1.5 bg-[#D5D7DA]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Fixed-height stage: absolute cards, clipped, never leave this box. */}
          <div
            className={`relative z-10 w-full overflow-hidden ${MOBILE_CARD_H}`}
          >
            {INDUSTRY_CARDS.map((card, i) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`absolute inset-0 ${MOBILE_CARD_H} will-change-transform`}
                style={{
                  zIndex: i + 1,
                  transform:
                    i === 0
                      ? "translate3d(0, 0, 0)"
                      : "translate3d(0, 100%, 0)",
                  opacity: i === 0 ? 1 : 0,
                  visibility: i === 0 ? "visible" : "hidden",
                }}
              >
                <SectorCard card={card} density="mobile" />
              </div>
            ))}
          </div>

          <div className="relative z-30 mt-2.5 bg-[#ECEEF2] pt-0.5">
            <Link href="/industries" className="zeon-link-arrow">
              See all industries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardMotion({
  children,
  index,
  revealed,
  reduceMotion,
  className = "",
}: {
  children: ReactNode;
  index: number;
  revealed: boolean;
  reduceMotion: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={`h-full min-h-0 ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.35,
        delay: reduceMotion ? 0 : index * 0.05,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

const VIGNETTE_IDS = new Set<IndustryCardId>([
  "financial",
  "super",
  "media",
  "gov",
  "defence",
  "metals",
  "construction",
  "telco",
  "medtech",
]);

function SectorCard({
  card,
  density = "default",
}: {
  card: IndustryCard;
  /** Mobile stack/list: larger padding and clearer surface against the section wash. */
  density?: "default" | "mobile";
}) {
  const dark = Boolean(card.dark);
  const Icon = ICONS[card.id];
  const hasVignette = VIGNETTE_IDS.has(card.id);
  const mobile = density === "mobile";

  /*
   * Mobile stack uses a plain surface (not zeon-surface-interactive) so the
   * inset highlight ::after cannot read as a second “frame” around the card.
   */
  const mobileSurface = mobile
    ? dark
      ? "zeon-surface-ink"
      : "rounded-[14px] border border-[#E9EAEB] bg-white"
    : dark
      ? "zeon-surface-ink zeon-lift"
      : "zeon-surface-interactive";

  return (
    <Link
      href={card.href}
      aria-label={card.a11yName}
      className={`group flex flex-col no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        mobile ? "h-full px-6 py-7" : "h-full p-6"
      } ${mobileSurface}`}
      style={{
        color: dark ? C.white : C.heading,
        outlineColor: dark ? C.blue400 : C.brand,
        ...(mobile && !dark
          ? {
              background: C.white,
              boxShadow:
                "0 1px 2px rgba(24, 29, 39, 0.06), 0 14px 36px rgba(24, 29, 39, 0.12)",
            }
          : null),
      }}
    >
      {/* 1. Icon + title */}
      <div className={`flex items-start ${mobile ? "gap-3" : "gap-2.5"}`}>
        <Icon
          className={`mt-0.5 shrink-0 stroke-[1.75] ${mobile ? "size-[22px]" : "size-5"}`}
          style={{ color: dark ? C.blue400 : C.brand }}
          aria-hidden
        />
        <h3
          className={`font-[family-name:var(--font-aeonik)] font-normal tracking-[-0.02em] ${
            mobile
              ? "text-[22px] leading-[1.25]"
              : "text-[20px] leading-[1.25]"
          }`}
        >
          {card.label}
        </h3>
      </div>

      {/* 2. Sentence */}
      <p
        className={`text-[15px] leading-[1.55] ${mobile ? "mt-3.5" : "mt-2"}`}
        style={{ color: dark ? C.gray400 : C.body }}
      >
        {card.outcome}
      </p>

      {/* 3. Quiet vignette — soft fill on mobile so taller cards don’t feel empty. */}
      {hasVignette ? (
        <div
          className={mobile ? "mt-5 px-4 py-4" : "mt-3 px-3.5 py-3"}
          style={{
            borderRadius: mobile ? 10 : 2,
            background: dark
              ? "rgba(255,255,255,0.04)"
              : mobile
                ? "#F4F5F7"
                : C.surface,
            backgroundImage: dark
              ? "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
              : undefined,
            backgroundSize: dark ? "24px 24px" : undefined,
          }}
          aria-hidden
        >
          <SectorVignette id={card.id} dark={dark} />
        </div>
      ) : null}

      {/* 4. Footer — agent + arrow; mt-auto pins it to the equal card height. */}
      <div
        className={`mt-auto flex items-center justify-between gap-3 border-t ${
          mobile ? "pt-5" : "pt-4"
        }`}
        style={{
          borderColor: dark ? C.darkBorder : C.border,
        }}
      >
        <span
          className={`min-w-0 font-medium ${mobile ? "text-[15px]" : "text-[14px]"}`}
          style={{ color: dark ? C.white : C.heading }}
        >
          {card.agents[0]}
        </span>
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
          style={{ color: dark ? C.blue400 : C.brand }}
          aria-hidden
        />
      </div>
    </Link>
  );
}

function SectorVignette({
  id,
  dark,
}: {
  id: IndustryCardId;
  dark?: boolean;
}) {
  const ink = dark ? C.white : C.heading;
  const muted = dark ? C.gray400 : C.muted;
  const arrow = C.gray400;

  if (id === "financial") {
    return (
      <div className="text-[13px] leading-[1.45]">
        <p style={{ color: ink }}>
          Loan_application.pdf <span style={{ color: arrow }}>→</span> Extract{" "}
          <span style={{ color: arrow }}>→</span> Verify
        </p>
        <p className="mt-1.5" style={{ color: muted }}>
          <span className="font-medium" style={{ color: ink }}>
            70%+
          </span>{" "}
          less manual effort
        </p>
      </div>
    );
  }

  if (id === "super") {
    return (
      <div className="text-[13px] leading-[1.45]">
        <p style={{ color: ink }}>
          Statement{" "}
          <span style={{ color: arrow }}>→</span> Match{" "}
          <span style={{ color: arrow }}>→</span> Batch{" "}
          <span style={{ color: arrow }}>→</span>{" "}
          <span className="inline-flex items-center gap-1">
            <span
              className="size-1.5 rounded-full"
              style={{ background: C.warning }}
            />
            Exception
          </span>
        </p>
        <p className="mt-1.5" style={{ color: muted }}>
          Matched{" "}
          <span className="font-medium" style={{ color: ink }}>
            142
          </span>
          {" · "}
          Exceptions{" "}
          <span className="font-medium" style={{ color: ink }}>
            7
          </span>
        </p>
      </div>
    );
  }

  if (id === "media") {
    return (
      <div className="text-[13px] leading-[1.45]">
        <p style={{ color: ink }}>Topic summary and insight</p>
        <div className="mt-2 space-y-1.5">
          <div
            className="h-px w-[92%]"
            style={{ background: dark ? C.darkBorder : C.border }}
          />
          <div
            className="h-px w-[72%]"
            style={{ background: dark ? C.darkBorder : C.border }}
          />
        </div>
        <p
          className="mt-2 inline-flex items-center gap-1"
          style={{ color: C.success }}
        >
          <Check className="size-3.5" strokeWidth={2.5} />
          Checked before publishing
        </p>
      </div>
    );
  }

  if (id === "gov") {
    return (
      <div className="text-[13px] leading-[1.45]">
        <p style={{ color: muted }}>What does the policy say about access?</p>
        <p className="mt-1" style={{ color: ink }}>
          Access follows the classification on each document.{" "}
          <span style={{ color: C.hover }}>[1] source</span>
        </p>
        <p
          className="mt-1.5 inline-flex items-center gap-1"
          style={{ color: ink }}
        >
          <Lock className="size-3.5" />
          Access matches classification
        </p>
      </div>
    );
  }

  if (id === "defence") {
    const lineColor = dark ? C.darkBorder : C.border;
    return (
      <div className="text-[13px] leading-[1.45]">
        <p className="inline-flex items-center gap-1.5" style={{ color: ink }}>
          <Lock className="size-3.5" />
          Deployed on your own infrastructure
        </p>
        <div className="mt-2.5 space-y-1.5">
          <div className="h-px w-[88%]" style={{ background: lineColor }} />
          <div className="h-px w-[64%]" style={{ background: lineColor }} />
        </div>
      </div>
    );
  }

  if (id === "metals") {
    return (
      <p className="text-[13px] leading-[1.45]" style={{ color: ink }}>
        Invoice <span style={{ color: arrow }}>→</span> Match{" "}
        <span style={{ color: arrow }}>→</span> Post
      </p>
    );
  }

  if (id === "construction") {
    return (
      <p className="text-[13px] leading-[1.45]" style={{ color: ink }}>
        Plan <span style={{ color: arrow }}>→</span> Extract{" "}
        <span style={{ color: arrow }}>→</span> Review
      </p>
    );
  }

  if (id === "telco") {
    return (
      <p className="text-[13px] leading-[1.45]" style={{ color: ink }}>
        Contract <span style={{ color: arrow }}>→</span> Clause{" "}
        <span style={{ color: arrow }}>→</span> Escalate
      </p>
    );
  }

  if (id === "medtech") {
    return (
      <p className="text-[13px] leading-[1.45]" style={{ color: ink }}>
        Pack <span style={{ color: arrow }}>→</span> Check{" "}
        <span style={{ color: arrow }}>→</span> Sign-off
      </p>
    );
  }

  return null;
}
