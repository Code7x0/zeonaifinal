"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import {
  architectureLayers,
  type ArchitectureLayerKey,
} from "@/components/sites/zeonai/content";
import { ArchitectureDiagram } from "./architecture-diagram";
import { ArchitectureDemo } from "./architecture-demos";
import { parseDetailPair } from "./architecture-illustrations";
import { easeInOut } from "./motion";

const BLACK = "#000000";
const LAYER_COUNT = architectureLayers.length;
/** Shorter pin distance so each layer resolves in ~one natural scroll gesture. */
const DESKTOP_VH_PER_LAYER = 52;
const slideEase = easeInOut;

function indexFromProgress(progress: number) {
  return Math.min(
    LAYER_COUNT - 1,
    Math.max(0, Math.floor(progress * LAYER_COUNT + 1e-6)),
  );
}

export function ArchitectureSection() {
  const baseId = useId();
  const trackRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const lenis = useLenis();
  const lastIndexRef = useRef(0);
  const activeIndexRef = useRef(0);

  const active = architectureLayers[activeIndex] ?? architectureLayers[0];
  const pinEnabled = isDesktop && !reduceMotion;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mqDesktop.matches);
    apply();
    mqDesktop.addEventListener("change", apply);
    return () => mqDesktop.removeEventListener("change", apply);
  }, []);

  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const viewH = window.innerHeight;
    // Prefer measured track height so sync works even if React state lags
    const isPinnedTrack = track.offsetHeight > viewH * 1.5;
    if (!isPinnedTrack) return;

    const rect = track.getBoundingClientRect();
    const scrollable = Math.max(1, track.offsetHeight - viewH);
    const progressed = Math.min(1, Math.max(0, -rect.top / scrollable));
    const idx = indexFromProgress(progressed);

    track.dataset.progress = progressed.toFixed(3);
    track.dataset.layerIndex = String(idx);

    if (idx !== lastIndexRef.current) {
      lastIndexRef.current = idx;
      setActiveIndex(idx);
    }
  }, []);

  // Lenis scroll ticks
  useLenis(() => {
    syncFromScroll();
  }, [syncFromScroll]);

  // rAF while the pinned track intersects the viewport — reliable with Lenis
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !pinEnabled) return;

    let raf = 0;
    let observing = false;

    const loop = () => {
      syncFromScroll();
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (!observing) {
            observing = true;
            raf = requestAnimationFrame(loop);
          }
        } else if (observing) {
          observing = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );

    io.observe(track);
    // Kick once in case already intersecting
    syncFromScroll();
    raf = requestAnimationFrame(loop);
    observing = true;

    window.addEventListener("resize", syncFromScroll, { passive: true });

    return () => {
      observing = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", syncFromScroll);
    };
  }, [pinEnabled, syncFromScroll]);

  const scrollToLayer = useCallback(
    (key: ArchitectureLayerKey) => {
      const idx = architectureLayers.findIndex((l) => l.key === key);
      if (idx < 0) return;

      if (!pinEnabled) {
        lastIndexRef.current = idx;
        setActiveIndex(idx);
        return;
      }

      const track = trackRef.current;
      if (!track) return;
      const currentScroll = lenis?.scroll ?? window.scrollY;
      const trackTop = track.getBoundingClientRect().top + currentScroll;
      const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
      const target = trackTop + ((idx + 0.2) / LAYER_COUNT) * scrollable;

      if (lenis) {
        lenis.scrollTo(target, { duration: 0.95 });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    },
    [pinEnabled, lenis],
  );

  const assembledIndex = pinEnabled ? activeIndex : LAYER_COUNT - 1;

  const trackStyle: CSSProperties | undefined = pinEnabled
    ? { height: `${LAYER_COUNT * DESKTOP_VH_PER_LAYER}vh` }
    : undefined;

  return (
    <section
      id="architecture"
      ref={trackRef}
      className="relative text-white"
      style={{ backgroundColor: BLACK, ...trackStyle }}
      aria-labelledby={`${baseId}-heading`}
      data-active-layer={active.id}
    >
      <div
        className={
          pinEnabled
            ? "sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden py-10 lg:py-12"
            : "relative overflow-hidden py-16 md:py-24"
        }
      >
        <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8">
          <div className="mx-auto max-w-[34rem] text-center">
            <h2
              id={`${baseId}-heading`}
              className="font-[family-name:var(--font-aeonik)] text-[34px] leading-[1.08] tracking-[-0.035em] text-white md:text-[44px] lg:text-[48px]"
            >
              The platform in one picture
            </h2>
            <p className="mx-auto mt-3 max-w-[44ch] text-[14px] leading-[1.55] text-white/55 md:text-[15px]">
              Every document moves through the same six layers, from the file
              you upload to the record in your ERP. The language model can be
              swapped. The layers underneath are what make the output safe to
              act on.
            </p>
          </div>

          <div className="mt-9 grid items-stretch gap-8 lg:mt-11 lg:grid-cols-[1.2fr_0.95fr_1.15fr] lg:gap-10 xl:gap-12">
            <div className="flex min-h-[320px] min-w-0 flex-col justify-center lg:min-h-[380px]">
              <ArchitectureDiagram
                assembledIndex={assembledIndex}
                activeKey={active.key}
                onSelect={scrollToLayer}
                reduceMotion={reduceMotion}
              />
            </div>

            <div className="relative min-h-[280px] min-w-0 overflow-hidden md:min-h-[320px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.key}
                  className="absolute inset-0 flex flex-col justify-center"
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    reduceMotion ? { opacity: 0 } : { opacity: 0, x: -14 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    ease: slideEase,
                  }}
                >
                  <h3 className="font-[family-name:var(--font-aeonik)] text-[26px] tracking-[-0.02em] text-white md:text-[30px]">
                    {active.title}
                  </h3>
                  <p className="mt-4 max-w-[36ch] text-[14px] leading-[1.6] text-white/60 md:text-[15px]">
                    {active.description}
                  </p>
                  <dl className="mt-6 space-y-3 border-t border-white/10 pt-5">
                    {active.details.map((detail) => {
                      const pair = parseDetailPair(detail);
                      if (!pair) {
                        return (
                          <p
                            key={detail}
                            className="text-[13px] text-white/55"
                          >
                            {detail}
                          </p>
                        );
                      }
                      return (
                        <div
                          key={detail}
                          className="grid gap-0.5 sm:grid-cols-[6.5rem_1fr] sm:gap-3"
                        >
                          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                            {pair.label}
                          </dt>
                          <dd className="text-[13px] leading-[1.45] text-white/65">
                            {pair.body}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="min-w-0">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-lg md:aspect-[4/3] lg:aspect-auto lg:h-[380px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.key}
                    className="absolute inset-0"
                    initial={
                      reduceMotion ? false : { opacity: 0, x: 28 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{
                      duration: reduceMotion ? 0 : 0.52,
                      ease: slideEase,
                    }}
                  >
                    <ArchitectureDemo layerKey={active.key} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-3 text-center text-[11px] text-white/30 lg:text-left">
                {pinEnabled
                  ? "Scroll to assemble each layer · click a brick to jump"
                  : "Select a brick to explore"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
