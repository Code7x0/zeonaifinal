"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
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
import { ScrollReveal, ScrollRevealGrid } from "./motion/scroll-reveal";

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
 * Industries — aligned 2-col / 3x3 elevated card grid on tablet & desktop,
 * smooth scroll-driven stacked card deck on mobile (with vertical list
 * fallback when reduced motion is enabled).
 */
export function Industries() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="industries"
      className="border-y border-[#E5E7EB] bg-[#F4F6FA] py-0 text-[#181D27] md:py-[var(--zeon-space-section-y,5.5rem)]"
    >
      {/* Mobile (<768px): smooth scroll-driven stacked card deck */}
      {!reduceMotion ? (
        <MobileIndustriesStack />
      ) : (
        <div className="px-4 py-8 sm:px-6 md:hidden">
          <div className="mx-auto w-full max-w-[1180px]">
            <IndustriesHeader />
            <div className="mt-8 grid grid-cols-1 gap-4">
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

      {/* Tablet & Desktop (>=768px): aligned 2-col / 3x3 elevated card grid with progressive row-by-row reveal */}
      <div className="hidden px-4 sm:px-6 md:block md:px-[var(--zeon-gutter,1.25rem)]">
        <div className="mx-auto max-w-[1180px]">
          <ScrollReveal>
            <IndustriesHeader />
          </ScrollReveal>

          <ScrollRevealGrid
            delay={0.42}
            stagger={0.22}
            y={40}
            scale={0.96}
            className="mt-12 grid auto-rows-fr grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-6"
          >
            {INDUSTRY_CARDS.map((card) => (
              <div key={card.id} className="h-full min-h-0">
                <SectorCard card={card} />
              </div>
            ))}
          </ScrollRevealGrid>

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
            ? "!text-[1.75rem] !leading-[1.16] !tracking-[-0.025em]"
            : ""
        }`}
      >
        Built for regulated,{" "}
        <br className="hidden sm:block" />
        <span className="sm:whitespace-nowrap">document-heavy</span> sectors
      </h2>
      <p
        className={`zeon-type-lead max-w-[560px] text-[#535862] ${
          compact ? "mt-3 !text-[15px] !leading-[1.55]" : "mt-3.5 md:mt-4"
        }`}
      >
        The same platform, with agents built for each sector. Examples from our
        agent portfolio.
      </p>
    </>
  );
}

/** Scroll travel per card — balanced pace without dragging. */
const MOBILE_STACK_VH_PER_STEP = 44;

/**
 * Roomy mobile card stage matching the approved mockup proportions,
 * including 24px top deck-peek clearance so cards feel spacious without
 * leaving a large empty void beneath the section CTA.
 */
const MOBILE_CARD_H = "h-[clamp(316px,42svh,384px)]";

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/**
 * Maps raw step fraction [0..1] to a dwell + smooth glide curve:
 * - [0.00..0.32]: active card rests completely settled (no half-clipped incoming card)
 * - [0.32..0.92]: next card glides smoothly up onto the deck
 * - [0.92..1.00]: next card settles cleanly
 */
function glideCurve(raw: number) {
  if (raw <= 0.32) return 0;
  if (raw >= 0.92) return 1;
  return smoothstep((raw - 0.32) / 0.6);
}

function MobileIndustriesStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastActiveRef = useRef(0);
  const smoothedFloatRef = useRef(0);
  const hasInitRef = useRef(false);
  const count = INDUSTRY_CARDS.length;
  const trackHeightVh = (count - 1) * MOBILE_STACK_VH_PER_STEP + 72;

  const syncFromScroll = useCallback(
    (snap = false) => {
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return;

      const stickyH = sticky.offsetHeight;
      const topOffset = parseFloat(getComputedStyle(sticky).top) || 56;
      const scrollable = Math.max(1, track.offsetHeight - stickyH - topOffset);
      const rect = track.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (topOffset - rect.top) / scrollable));
      const targetFloat = progress * (count - 1);

      if (!hasInitRef.current || snap) {
        smoothedFloatRef.current = targetFloat;
        hasInitRef.current = true;
      } else {
        // Silky Lenis-style inertia lerp on every frame
        const diff = targetFloat - smoothedFloatRef.current;
        smoothedFloatRef.current =
          Math.abs(diff) < 0.001
            ? targetFloat
            : smoothedFloatRef.current + diff * 0.22;
      }

      const floatIndex = smoothedFloatRef.current;

      // Compute effective deck position using the dwell+glide curve
      const base = Math.min(count - 1, Math.floor(floatIndex));
      const frac = floatIndex - base;
      const effectiveIndex = base + glideCurve(frac);
      const rounded = Math.min(
        count - 1,
        Math.max(0, Math.round(effectiveIndex)),
      );

      if (rounded !== lastActiveRef.current) {
        lastActiveRef.current = rounded;
        setActiveIndex(rounded);
      }

      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const delta = effectiveIndex - i;

        if (delta < -0.999) {
          el.style.transform = "translate3d(0, 114%, 0) scale(1)";
          el.style.opacity = "1";
          el.style.visibility = "hidden";
          el.style.pointerEvents = "none";
        } else if (delta <= 0) {
          const enter = 1 + delta;
          const yPct = i === 0 ? 0 : (1 - enter) * 114;
          el.style.transform = `translate3d(0, ${yPct.toFixed(2)}%, 0) scale(1)`;
          el.style.opacity = "1";
          el.style.visibility = "visible";
          el.style.pointerEvents = rounded === i ? "auto" : "none";
        } else if (delta <= 2.15) {
          const clamped = Math.min(2, delta);
          const shiftY = -(clamped * 10);
          const scale = 1 - clamped * 0.035;
          el.style.transform = `translate3d(0, ${shiftY.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
          el.style.opacity = "1";
          el.style.visibility = "visible";
          el.style.pointerEvents = rounded === i ? "auto" : "none";
        } else {
          el.style.transform = "translate3d(0, -20px, 0) scale(0.93)";
          el.style.opacity = "1";
          el.style.visibility = "hidden";
          el.style.pointerEvents = "none";
        }
      }
    },
    [count],
  );

  useLenis(() => {
    syncFromScroll(false);
  }, [syncFromScroll]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let active = false;

    const loop = () => {
      syncFromScroll(false);
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

    const onResize = () => syncFromScroll(true);

    io.observe(track);
    syncFromScroll(true);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [syncFromScroll]);

  return (
    <div
      ref={trackRef}
      className="relative md:hidden"
      style={{ height: `${trackHeightVh}svh` }}
    >
      <div
        ref={stickyRef}
        className="sticky px-5 pb-8 pt-7 sm:px-6"
        style={{ top: "var(--zeon-header-offset, 56px)" }}
      >
        <div className="mx-auto w-full max-w-[430px]">
          <div className="relative z-30 bg-[#F4F6FA]">
            <IndustriesHeader compact />

            <div className="mt-6 flex items-center justify-between pb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#717680]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1.5" aria-hidden>
                {INDUSTRY_CARDS.map((c, idx) => (
                  <span
                    key={c.id}
                    className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out ${
                      idx === activeIndex
                        ? "w-5 bg-[#1B46F5]"
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
                      : "translate3d(0, 114%, 0) scale(1)",
                  opacity: 1,
                  visibility: i === 0 ? "visible" : "hidden",
                }}
              >
                <SectorCard card={card} />
              </div>
            ))}
          </div>

          <div className="relative z-30 mt-5 bg-[#F4F6FA] pt-1">
            <Link href="/industries" className="zeon-link-arrow">
              See all industries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectorCard({ card }: { card: IndustryCard }) {
  const Icon = ICONS[card.id];

  return (
    <Link
      href={card.href}
      aria-label={card.a11yName}
      className="group flex h-full flex-col rounded-[16px] border border-[#DFE3EA] bg-white p-6 text-[#181D27] no-underline shadow-[0_1px_2px_rgba(16,24,40,0.06),0_4px_12px_-2px_rgba(16,24,40,0.07),0_12px_24px_-4px_rgba(24,29,39,0.05)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-[#BCD3FF] hover:shadow-[0_4px_10px_rgba(27,70,245,0.08),0_16px_32px_-4px_rgba(27,70,245,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2962FF] md:min-h-[212px] md:rounded-[12px] lg:p-7"
    >
      {/* 1. Restrained blue icon badge */}
      <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-[#D4E2FF] bg-[#EEF4FF] text-[#2962FF] shadow-[0_1px_2px_rgba(27,70,245,0.08)] transition-colors duration-200 group-hover:border-[#BCD3FF] group-hover:bg-[#E4EEFF] md:size-10 md:rounded-[8px]">
        <Icon className="size-5 stroke-[1.75]" aria-hidden />
      </div>

      {/* 2. Title */}
      <h3 className="mt-5 font-[family-name:var(--font-aeonik)] text-[20px] font-medium leading-[1.28] tracking-[-0.015em] text-[#181D27]">
        {card.label}
      </h3>

      {/* 3. Short description */}
      <p className="mt-2.5 text-[15px] leading-[1.58] text-[#535862] md:leading-[1.6]">
        {card.outcome}
      </p>

      {/* 4. Agent link footer */}
      <div className="mt-auto pt-5 md:pt-6">
        <div className="flex items-center justify-between gap-3 border-t border-[#F0F1F3] pt-4">
          <span className="min-w-0 text-[14px] font-medium text-[#181D27] transition-colors duration-150 group-hover:text-[#1B46F5]">
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
