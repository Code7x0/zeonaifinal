"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Layout, Pointer, Zap } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { PlatformScreenId } from "@/components/blocks/platform-screens";
import { FadeUp } from "@/components/sites/v7labs/fade-up";
import { durationUi, easeOut } from "@/components/sites/v7labs/motion";
import {
  HOME_TAB_VIDEO,
  ProductVideo,
} from "@/components/sites/v7labs/video";
import { cn } from "@/lib/utils";

/** Per-scene dwell — snappy when real product films are looping. */
const SCENE_MS: Record<string, number> = {
  "ask-ai": 5200,
  "ai-drive": 4800,
  workflows: 4800,
  dashboards: 4800,
  contracts: 4800,
  "agent-hub": 4800,
};
const DEFAULT_SCENE_MS = 4800;
const MANUAL_PAUSE_MS = 10000;
const CROSSFADE_MS = 220;

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc?: string;
  imageAlt?: string;
  screenId?: PlatformScreenId;
}

interface Tab {
  value: string;
  icon: ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
  /** Auto-advance tabs like a looping product video. Default true. */
  autoplay?: boolean;
  /** Optional blueprint-style sheet label above the heading. */
  sheetLeft?: string;
  sheetRight?: string;
}

const Feature108 = ({
  badge = "shadcnblocks.com",
  heading = "A Collection of Components Built With Shadcn & Tailwind",
  description = "Join us to build flawless web solutions.",
  tabs = [
    {
      value: "tab-1",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "Boost Revenue",
      content: {
        badge: "Modern Tactics",
        title: "Make your site a true standout.",
        description:
          "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
        buttonText: "See Plans",
        screenId: "dashboards",
      },
    },
    {
      value: "tab-2",
      icon: <Pointer className="h-auto w-4 shrink-0" />,
      label: "Higher Engagement",
      content: {
        badge: "Expert Features",
        title: "Boost your site with top-tier design.",
        description:
          "Use stellar design to easily engage users and strengthen their loyalty. Create a seamless experience that keeps them coming back for more.",
        buttonText: "See Tools",
        screenId: "ask-ai",
      },
    },
    {
      value: "tab-3",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: "Stunning Layouts",
      content: {
        badge: "Elite Solutions",
        title: "Build an advanced web experience.",
        description:
          "Lift your brand with modern tech that grabs attention and drives action. Create a digital experience that stands out from the crowd.",
        buttonText: "See Options",
        screenId: "workflows",
      },
    },
  ],
  autoplay = true,
  sheetLeft,
  sheetRight,
}: Feature108Props) => {
  const [active, setActive] = useState(tabs[0]?.value ?? "");
  const [tourPaused, setTourPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);
  const [inView, setInView] = useState(true);
  const softPauseUntil = useRef(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const progressRegionId = useId();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting && entry.intersectionRatio > 0.2));
      },
      { threshold: [0, 0.2, 0.4] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const activeTab = tabs.find((t) => t.value === active) ?? tabs[0];
  const screenId = activeTab?.content.screenId;
  const sceneMs =
    (screenId && SCENE_MS[screenId]) ||
    SCENE_MS[active] ||
    DEFAULT_SCENE_MS;

  const goNext = useCallback(() => {
    if (!tabs.length) return;
    const idx = tabs.findIndex((t) => t.value === active);
    const next = tabs[(idx + 1) % tabs.length];
    setActive(next!.value);
    setProgress(0);
  }, [active, tabs]);

  const canAutoplay =
    autoplay &&
    !tourPaused &&
    !reduceMotion &&
    inView &&
    tabs.length >= 2;

  useEffect(() => {
    if (!canAutoplay) return;

    let frame = 0;
    let accumulated = 0;
    let last = performance.now();

    const tick = (now: number) => {
      if (Date.now() < softPauseUntil.current) {
        last = now;
        setProgress(0);
        frame = requestAnimationFrame(tick);
        return;
      }

      const delta = now - last;
      last = now;
      accumulated += delta;
      const pct = Math.min(100, (accumulated / sceneMs) * 100);
      setProgress(pct);

      if (accumulated >= sceneMs) {
        goNext();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, canAutoplay, goNext, sceneMs]);

  const onManualSelect = (value: string) => {
    setActive(value);
    setProgress(0);
    softPauseUntil.current = Date.now() + MANUAL_PAUSE_MS;
  };

  return (
    <div
      ref={sectionRef}
      className="px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[42rem] text-center">
          {sheetLeft ? (
            <FadeUp className="mb-3 flex justify-center">
              <p className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#2962FF]">
                {sheetLeft}
                <span
                  aria-hidden
                  className="hidden h-px w-9 bg-[linear-gradient(90deg,#BCD3FF,transparent)] sm:block"
                />
                {sheetRight ? (
                  <span className="text-[#A4A7AE]">{sheetRight}</span>
                ) : null}
              </p>
            </FadeUp>
          ) : null}
          <FadeUp
            as="h2"
            className="font-[family-name:var(--font-aeonik)] text-[32px] font-medium leading-[1.06] tracking-[-0.03em] text-[#181D27] md:text-[44px]"
          >
            {heading}
          </FadeUp>
          <FadeUp
            as="p"
            delay={0.08}
            className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-[1.55] text-black/60 md:text-[16px]"
          >
            {description}
          </FadeUp>
        </div>

        <Tabs value={active} onValueChange={onManualSelect} className="mt-12">
          <div className="w-full">
            <TabsList
              className="mx-auto flex w-full max-w-[980px] flex-wrap items-center justify-center gap-3 bg-transparent p-0"
              aria-label="Platform modules"
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative isolate flex items-center gap-2 rounded-[11px] border border-[#E4E7EC] bg-white px-4 py-2.5 text-[13px] font-medium text-[#667085] shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_1px_2px_rgba(16,24,40,0.05),0_6px_14px_rgba(16,24,40,0.05)] outline-none transition-[color,background-color,border-color,box-shadow,transform] duration-[var(--zeon-duration-hover,280ms)] ease-[var(--zeon-ease-spring)] hover:-translate-y-px hover:border-[#D0D5DD] hover:text-[#181D27] hover:shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_8px_18px_rgba(16,24,40,0.09)] focus-visible:ring-2 focus-visible:ring-[#2962FF]/35 active:translate-y-0 active:scale-[0.98] data-[state=active]:border-[#2962FF]/45 data-[state=active]:bg-[#EFF4FF] data-[state=active]:text-[#181D27] data-[state=active]:shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_0_0_1px_rgba(41,98,255,0.16),0_10px_22px_rgba(41,98,255,0.14)] [&_svg]:opacity-45 data-[state=active]:[&_svg]:text-[#2962FF] data-[state=active]:[&_svg]:opacity-100"
                >
                  {tab.icon}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Compact scene caption — product screen is the hero */}
          <div className="mt-8 flex flex-wrap items-end justify-center gap-4 text-center sm:justify-between sm:text-left">
            <div className="relative mx-auto min-h-[3.25rem] w-full max-w-[48ch] sm:mx-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: durationUi, ease: easeOut }
                  }
                >
                  <p className="text-[15px] font-medium tracking-[-0.015em] text-[#181D27] md:text-[16px]">
                    {activeTab?.content.title}
                  </p>
                  {activeTab?.content.description ? (
                    <p className="mt-1.5 text-[13px] leading-[1.5] text-[#717680]">
                      {activeTab.content.description}
                    </p>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
            <a
              href="/demo"
              className="zeon-btn zeon-btn-accent zeon-btn-sm !rounded-[10px] !shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_8px_20px_rgba(41,98,255,0.28)]"
            >
              {activeTab?.content.buttonText}
            </a>
          </div>

          <div className="relative mt-5 w-full">
            {/* Mount only the active tab film to avoid six concurrent downloads */}
            {(() => {
              const activeTabDef = tabs.find((t) => t.value === active);
              const id =
                (activeTabDef &&
                  (HOME_TAB_VIDEO[activeTabDef.value] ??
                    (activeTabDef.content.screenId
                      ? HOME_TAB_VIDEO[activeTabDef.content.screenId]
                      : undefined))) ||
                undefined;
              if (!id) return null;
              return (
                <ProductVideo
                  key={id}
                  assetId={id}
                  active={inView && !tourPaused}
                  tone="ink"
                />
              );
            })()}

            {/* Segmented tour progress — one tick per module clip */}
            {autoplay && tabs.length >= 2 ? (
              <div
                id={progressRegionId}
                className="mt-3 flex gap-1.5"
                role="group"
                aria-label="Product module tour"
              >
                {tabs.map((tab, index) => {
                  const activeIndex = tabs.findIndex((t) => t.value === active);
                  const isActive = tab.value === active;
                  const isPast = index < activeIndex;
                  const fill = reduceMotion
                    ? isActive
                      ? 100
                      : isPast
                        ? 100
                        : 0
                    : isPast
                      ? 100
                      : isActive
                        ? progress
                        : 0;

                  return (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => onManualSelect(tab.value)}
                      className={cn(
                        "relative h-1 min-w-0 flex-1 overflow-hidden rounded-full outline-none transition-[height] duration-150",
                        "bg-[#E9EAEB] hover:h-1.5 focus-visible:ring-2 focus-visible:ring-[#2962FF]/40 focus-visible:ring-offset-2",
                        isActive && "bg-[#D0D5DD]",
                      )}
                      aria-current={isActive ? "true" : undefined}
                      aria-label={
                        isActive
                          ? `${tab.label}, ${Math.round(fill)}% through this module`
                          : `Show ${tab.label}`
                      }
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-y-0 left-0 rounded-full bg-[#2962FF]",
                          !reduceMotion && isActive
                            ? "transition-[width] duration-75 ease-linear"
                            : null,
                        )}
                        style={{ width: `${fill}%` }}
                      />
                    </button>
                  );
                })}
                <span className="sr-only" aria-live="polite">
                  Showing {activeTab?.label}
                  {canAutoplay ? `, ${Math.round(progress)}% through` : ""}
                </span>
              </div>
            ) : (
              <p className="sr-only" aria-live="polite">
                Showing {activeTab?.label}
              </p>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export { Feature108 };
export type { Feature108Props, Tab, TabContent };