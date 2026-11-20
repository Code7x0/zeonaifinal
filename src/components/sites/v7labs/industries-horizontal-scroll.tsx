"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { industries } from "@/components/sites/zeonai/content";
import { industryScreen } from "./secondary/industry-screens";
import { FadeUp } from "./fade-up";
import { cn } from "@/lib/utils";

const COUNT = industries.length;
/** Scroll distance per industry while the section stays pinned. */
const DESKTOP_VH_PER_INDUSTRY = 48;

type PanelTone = {
  surface: string;
  label: string;
  title: string;
  body: string;
  step: string;
  stepArrow: string;
  link: string;
  edge: string;
};

const PANEL_TONES: PanelTone[] = [
  {
    surface: "bg-white",
    label: "text-[#717680]",
    title: "text-[#181D27]",
    body: "text-[#535862]",
    step: "text-[#181D27]",
    stepArrow: "text-[#8A9493]",
    link: "zeon-link-arrow",
    edge: "border-[#E9EAEB]",
  },
  {
    surface: "bg-[#EEF4FF]",
    label: "text-[#1B46F5]",
    title: "text-[#181D27]",
    body: "text-[#414651]",
    step: "text-[#181D27]",
    stepArrow: "text-[#5991FF]",
    link: "zeon-link-arrow",
    edge: "border-[#BCD3FF]/60",
  },
  {
    surface: "bg-[#F5F5F5]",
    label: "text-[#535862]",
    title: "text-[#181D27]",
    body: "text-[#535862]",
    step: "text-[#181D27]",
    stepArrow: "text-[#A4A7AE]",
    link: "zeon-link-arrow",
    edge: "border-[#E9EAEB]",
  },
  {
    surface:
      "bg-[linear-gradient(160deg,#FFFFFF_0%,#EEF4FF_55%,#E8ECF4_100%)]",
    label: "text-[#1433E1]",
    title: "text-[#181D27]",
    body: "text-[#414651]",
    step: "text-[#181D27]",
    stepArrow: "text-[#6172F3]",
    link: "zeon-link-arrow",
    edge: "border-[#C7D7FE]/70",
  },
];

function IndustryPanel({
  index,
  stacked,
}: {
  index: number;
  stacked?: boolean;
}) {
  const industry = industries[index]!;
  const tone = PANEL_TONES[index % PANEL_TONES.length]!;

  return (
    <article
      className={cn(
        "relative flex h-full w-full shrink-0 items-center border-b",
        stacked ? "min-h-0" : "h-full w-screen",
        tone.surface,
        tone.edge,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_40%,rgba(41,98,255,0.07)_0%,transparent_65%)]"
      />

      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-8 px-5 py-12 md:px-8 md:py-14 lg:grid-cols-2 lg:gap-14 lg:py-16">
        <FadeUp>
          <p
            className={cn(
              "text-[13px] font-medium tracking-[-0.01em]",
              tone.label,
            )}
          >
            {industry.platform}
          </p>
          <h2
            className={cn(
              "mt-3 font-[family-name:var(--font-aeonik)] text-[36px] leading-[1.05] tracking-[-0.035em] md:text-[48px]",
              tone.title,
            )}
          >
            {industry.label}
          </h2>
          <p
            className={cn(
              "mt-4 max-w-[42ch] text-[16px] leading-[1.55] md:text-[17px]",
              tone.body,
            )}
          >
            {industry.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {industry.process.map((step, si) => (
              <span
                key={step}
                className={cn(
                  "inline-flex items-center gap-2 text-[13px] md:text-[14px]",
                  tone.step,
                )}
              >
                {si > 0 ? (
                  <ArrowRight
                    className={cn("size-3", tone.stepArrow)}
                    aria-hidden
                  />
                ) : null}
                {step}
              </span>
            ))}
          </div>
          <Link
            href={`/industries/${industry.id}`}
            className={cn(tone.link, "mt-8 inline-flex")}
          >
            Explore {industry.label.split(" ")[0]?.toLowerCase() ?? "sector"}
          </Link>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-[16px] bg-[radial-gradient(ellipse_at_center,rgba(41,98,255,0.12)_0%,transparent_70%)] blur-xl"
            />
            <div className="relative">{industryScreen(industry.id)}</div>
          </div>
        </FadeUp>
      </div>
    </article>
  );
}

/**
 * Desktop: section stays pinned while vertical scroll drives a horizontal
 * pass through every industry; page continues only after the last panel.
 * Mobile / reduced-motion: original vertical stack.
 */
export function IndustriesHorizontalScroll() {
  const trackRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const pinEnabled = isDesktop && !reduceMotion;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const viewH = window.innerHeight;
    if (track.offsetHeight <= viewH * 1.5) return;

    const rect = track.getBoundingClientRect();
    const scrollable = Math.max(1, track.offsetHeight - viewH);
    const next = Math.min(1, Math.max(0, -rect.top / scrollable));
    setProgress(next);
  }, []);

  useLenis(() => {
    if (!pinEnabled) return;
    syncFromScroll();
  }, [pinEnabled, syncFromScroll]);

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

  const trackStyle: CSSProperties | undefined = pinEnabled
    ? { height: `${COUNT * DESKTOP_VH_PER_INDUSTRY}vh` }
    : undefined;

  if (!pinEnabled) {
    return (
      <section className="relative" aria-label="Industries">
        {industries.map((_, i) => (
          <IndustryPanel key={industries[i]!.id} index={i} stacked />
        ))}
      </section>
    );
  }

  const translateX = -(progress * (COUNT - 1) * 100);

  return (
    <section
      ref={trackRef}
      className="relative"
      aria-label="Industries"
      style={trackStyle}
      data-progress={progress.toFixed(3)}
    >
      <div className="sticky top-0 h-[min(520px,62svh)] overflow-hidden">
        <div
          className="flex h-full will-change-transform"
          style={{
            transform: `translate3d(${translateX}vw, 0, 0)`,
          }}
        >
          {industries.map((_, i) => (
            <IndustryPanel key={industries[i]!.id} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
