"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { caseStudies } from "@/components/sites/zeonai/content";
import { cn } from "@/lib/utils";
import { durationEnter, easeOut, enterY, viewportOnce } from "../motion";
import { ScrollRevealStagger } from "../motion/scroll-reveal";
import { CaseVisual } from "./case-visuals";

const AUTOPLAY_MS = 4500;
const INTERACTION_PAUSE_MS = 8000;

export function CustomerStoriesSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const inView = useInView(sectionRef, { amount: 0.2 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const pauseUntilRef = useRef(0);
  const scrollRafRef = useRef<number | null>(null);

  const count = caseStudies.length;

  const scrollToIndex = useCallback(
    (index: number, manual = false) => {
      const track = trackRef.current;
      const card = cardRefs.current[index];
      if (!track || !card) return;
      if (manual) {
        pauseUntilRef.current = Date.now() + INTERACTION_PAUSE_MS;
      }
      const left = card.offsetLeft - track.offsetLeft;
      track.scrollTo({
        left,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      setActiveIndex(index);
    },
    [reduceMotion],
  );

  const syncActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const elCenter = el.offsetLeft - track.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(center - elCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });
    setActiveIndex(bestIdx);
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollRafRef.current != null) return;
    scrollRafRef.current = window.requestAnimationFrame(() => {
      scrollRafRef.current = null;
      syncActiveFromScroll();
    });
  }, [syncActiveFromScroll]);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current != null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView || hovered || focused || count <= 1) return;
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % count;
        const track = trackRef.current;
        const card = cardRefs.current[next];
        if (track && card) {
          track.scrollTo({
            left: card.offsetLeft - track.offsetLeft,
            behavior: "smooth",
          });
        }
        return next;
      });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, inView, hovered, focused, count]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex((activeIndex + 1) % count, true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex((activeIndex - 1 + count) % count, true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="customers"
      className="zeon-section-tint relative scroll-mt-24 overflow-hidden border-t border-[#E9EAEB] text-[#181D27]"
      aria-labelledby="customers-heading"
    >
      <div className="zeon-section-pad relative mx-auto max-w-[var(--zeon-container,1180px)] px-[var(--zeon-gutter,1.25rem)]">
        <motion.div
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          initial={reduceMotion ? false : { opacity: 0, y: enterY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: durationEnter, ease: easeOut }}
        >
          <div className="max-w-[40rem]">
            <h2
              id="customers-heading"
              className="zeon-type-section text-balance"
            >
              Customers and case studies
            </h2>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.6] text-[#697386] md:text-[17px]">
              Real deployments across lending, finance and media, with the
              results each one delivered.
            </p>
          </div>
          <Link href="/customers" className="zeon-link-arrow shrink-0">
            See all case studies
            <ArrowUpRight className="size-3.5" />
          </Link>
        </motion.div>

        <ScrollRevealStagger
          childSelector="[data-case-card]"
          delay={0.42}
          stagger={0.24}
          className="mt-12"
        >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setFocused(false);
            }
          }}
          onKeyDown={onKeyDown}
        >
          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client case studies"
            tabIndex={0}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2962FF] [&::-webkit-scrollbar]:hidden"
          >
            {caseStudies.map((study, idx) => {
              const altDark = idx % 2 === 1;
              return (
                <article
                  key={study.slug}
                  data-case-card=""
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className={cn(
                    "group relative flex w-[min(360px,84vw)] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--zeon-radius-card)] border border-white/[0.08] text-white sm:w-[400px] lg:w-[420px]",
                    altDark
                      ? "bg-[linear-gradient(160deg,#252B37_0%,#1A1F2A_55%,#141820_100%)]"
                      : "bg-[linear-gradient(160deg,#1A2030_0%,#12161F_55%,#0E1219_100%)]",
                  )}
                >
                  <Link
                    href={`/customers/${study.slug}`}
                    className="flex h-full flex-col p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                        {study.industry}
                      </span>
                      <span className="font-mono text-[10px] text-white/30">
                        ·
                      </span>
                      <span className="text-[12px] text-white/65">
                        {study.customer}
                      </span>
                    </div>

                    <h3 className="mt-4 line-clamp-2 font-[family-name:var(--font-aeonik)] text-[22px] leading-[1.18] tracking-[-0.025em]">
                      {study.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-[13.5px] leading-[1.55] text-white/65">
                      {study.summary}
                    </p>

                    <div className="mt-5 flex items-baseline gap-2.5">
                      <span className="font-[family-name:var(--font-aeonik)] text-[30px] leading-none tracking-[-0.03em] text-white">
                        {study.metricShort}
                      </span>
                      <span className="text-[12px] text-white/55">
                        {study.metricLabel}
                      </span>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-[3px] bg-white/95 p-1">
                      <CaseVisual study={study} compact />
                    </div>

                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-medium text-white transition-[gap] duration-300 ease-out group-hover:gap-2.5">
                      Read case study
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Connected scroll / position indicator */}
          {count > 1 ? (
            <div
              className="mt-4 flex items-center justify-center gap-0.5"
              role="tablist"
              aria-label="Case study slides"
            >
              {caseStudies.map((study, idx) => {
                const active = activeIndex === idx;
                return (
                  <button
                    key={study.slug}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Show case study ${idx + 1}: ${study.title}`}
                    onClick={() => scrollToIndex(idx, true)}
                    className="group/dot inline-flex min-h-[44px] min-w-[28px] items-center justify-center rounded-full px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#181D27]"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "block h-2 rounded-full transition-all duration-300",
                        active
                          ? "w-7 bg-[#181D27]"
                          : "w-2 bg-[#D5D7DA] group-hover/dot:bg-[#A4A7AE]",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
