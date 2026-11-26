"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLenis } from "lenis/react";
import {
  ArrowRight,
  Building2,
  Factory,
  HardHat,
  HeartPulse,
  Landmark,
  Newspaper,
  Radio,
  Shield,
} from "lucide-react";
import {
  INDUSTRY_CARDS,
  type IndustryCard,
  type IndustryCardId,
} from "./industries/industries-home-config";

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
 * Industries — aligned 3/3/3 elevated card grid on desktop,
 * scroll-driven sticky stacked cards on mobile (with vertical fallback
 * when reduced motion is enabled).
 */
export function Industries() {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useInView(sectionRef, { once: true, amount: 0.08 });

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="border-y border-[#E5E7EB] bg-[#F4F6FA] py-6 text-[#181D27] md:py-[var(--zeon-space-section-y,5.5rem)]"
    >
      {/* Mobile (<768px): scroll-driven sticky stacked cards (falls back to vertical list on reduced motion) */}
      {!reduceMotion ? (
        <MobileIndustriesStack />
      ) : (
        <div className="px-4 sm:px-6 md:hidden">
          <div className="mx-auto w-full max-w-[1180px]">
            <IndustriesHeader />
            <div className="mt-8 grid grid-cols-1 gap-5">
              {INDUSTRY_CARDS.map((card) => (
                <SectorCard key={card.id} card={card} />
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

      {/* Tablet & Desktop (>=768px): aligned 2-col / 3x3 elevated card grid */}
      <div className="hidden px-4 sm:px-6 md:block md:px-[var(--zeon-gutter,1.25rem)]">
        <div className="mx-auto max-w-[1180px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={revealed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <IndustriesHeader />
          </motion.div>

          <div className="mt-12 grid auto-rows-fr grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-6">
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
        className={`zeon-type-lead max-w-[560px] text-[#535862] ${
          compact ? "mt-2 text-[14px] leading-[1.45]" : "mt-3.5 md:mt-4"
        }`}
      >
        The same platform, with agents built for each sector. Examples from our
        agent portfolio.
      </p>
    </>
  );
}

/** Scroll distance per card — smooth travel without excess trailing space. */
const MOBILE_STACK_VH_PER_STEP = 44;

/**
 * Fixed stage height — includes top 24px deck-peek clearance so 2 underlying
 * solid cards visibly stack behind the active card.
 */
const MOBILE_CARD_H = "h-[clamp(324px,42svh,392px)]";

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
  const trackHeightVh = (count - 1) * MOBILE_STACK_VH_PER_STEP + 100;

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
      const depth = floatIndex - i;

      if (i > 0 && rawEnter <= 0.001) {
        // Waiting below stage
        el.style.transform = "translate3d(0, 112%, 0) scale(1)";
        el.style.opacity = "1";
        el.style.visibility = "hidden";
        el.style.pointerEvents = "none";
      } else if (depth > 2.15) {
        // Deeply buried cards hidden for clean deck
        el.style.transform = "translate3d(0, -20px, 0) scale(0.93)";
        el.style.opacity = "1";
        el.style.visibility = "hidden";
        el.style.pointerEvents = "none";
      } else if (depth > 0) {
        // Real solid cards stacked behind the active card
        const clampedDepth = Math.min(2, depth);
        const shiftY = -(clampedDepth * 10);
        const scale = 1 - clampedDepth * 0.035;
        el.style.transform = `translate3d(0, ${shiftY.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.style.pointerEvents = rounded === i ? "auto" : "none";
      } else {
        // Active or incoming solid card sliding smoothly into place
        const yPct = i === 0 ? 0 : (1 - enter) * 112;
        el.style.transform = `translate3d(0, ${yPct.toFixed(2)}%, 0) scale(1)`;
        el.style.opacity = "1";
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
      <div
        className="sticky flex min-h-[calc(100svh-var(--zeon-header-offset,56px))] flex-col justify-center px-4 py-6 sm:px-5"
        style={{ top: "var(--zeon-header-offset, 56px)" }}
      >
        <div className="mx-auto w-full max-w-[430px]">
          <div className="relative z-30 bg-[#F4F6FA]">
            <IndustriesHeader compact />

            <div className="mt-3 flex items-center justify-between pb-2">
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

          {/* Stage with top peek allowance for stacked deck edges and horizontal shadow bleed */}
          <div
            className={`relative z-10 -mx-2 w-[calc(100%+16px)] overflow-hidden ${MOBILE_CARD_H}`}
          >
            {INDUSTRY_CARDS.map((card, i) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute inset-x-2 bottom-2 top-6 origin-top will-change-transform"
                style={{
                  zIndex: i + 1,
                  transform:
                    i === 0
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(0, 112%, 0) scale(1)",
                  opacity: 1,
                  visibility: i === 0 ? "visible" : "hidden",
                }}
              >
                <SectorCard card={card} />
              </div>
            ))}
          </div>

          <div className="relative z-30 mt-3 bg-[#F4F6FA] pt-1">
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
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.32,
        delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.24),
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

function SectorCard({ card }: { card: IndustryCard }) {
  const Icon = ICONS[card.id];

  return (
    <Link
      href={card.href}
      aria-label={card.a11yName}
      className="group flex h-full min-h-[212px] flex-col rounded-[12px] border border-[#DFE3EA] bg-white p-6 text-[#181D27] no-underline shadow-[0_1px_2px_rgba(16,24,40,0.06),0_4px_12px_-2px_rgba(16,24,40,0.07),0_12px_24px_-4px_rgba(24,29,39,0.05)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-[#BCD3FF] hover:shadow-[0_4px_10px_rgba(27,70,245,0.08),0_16px_32px_-4px_rgba(27,70,245,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2962FF] sm:p-7"
    >
      {/* 1. Restrained blue icon badge */}
      <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-[8px] border border-[#D4E2FF] bg-[#EEF4FF] text-[#2962FF] shadow-[0_1px_2px_rgba(27,70,245,0.08)] transition-colors duration-200 group-hover:border-[#BCD3FF] group-hover:bg-[#E4EEFF]">
        <Icon className="size-5 stroke-[1.75]" aria-hidden />
      </div>

      {/* 2. Title */}
      <h3 className="mt-5 font-[family-name:var(--font-aeonik)] text-[19px] font-medium leading-[1.3] tracking-[-0.015em] text-[#181D27] sm:text-[20px]">
        {card.label}
      </h3>

      {/* 3. Short description */}
      <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[#535862] sm:text-[15px]">
        {card.outcome}
      </p>

      {/* 4. Agent link footer */}
      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between gap-3 border-t border-[#F0F1F3] pt-4">
          <span className="min-w-0 text-[13.5px] font-medium text-[#181D27] transition-colors duration-150 group-hover:text-[#1B46F5] sm:text-[14px]">
            {card.agents[0]}
          </span>
          <ArrowRight
            className="size-4 shrink-0 text-[#2962FF] transition-transform duration-150 group-hover:translate-x-1"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}
