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

import {
  AppShell,
  PLATFORM_SCREENS,
  PLATFORM_SCREEN_TITLES,
  type PlatformScreenId,
} from "@/components/blocks/platform-screens";
import { FadeUp } from "@/components/sites/v7labs/fade-up";
import { durationUi, easeOut } from "@/components/sites/v7labs/motion";

/** Per-scene dwell so Ask AI answer/citations can be read. */
const SCENE_MS: Record<string, number> = {
  "ask-ai": 9000,
  "ai-drive": 7000,
  workflows: 7000,
  dashboards: 7000,
  contracts: 7000,
  "agent-hub": 7000,
};
const DEFAULT_SCENE_MS = 7000;
const MANUAL_PAUSE_MS = 12000;
const CROSSFADE_MS = 320;

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
  const shellTitle =
    (screenId && PLATFORM_SCREEN_TITLES[screenId]) ||
    `ZeonAI · ${activeTab?.label ?? "Workspace"}`;
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

  const onTogglePlay = () => {
    if (tourPaused) {
      setTourPaused(false);
      softPauseUntil.current = 0;
      setProgress(0);
    } else {
      setTourPaused(true);
    }
  };

  return (
    <div
      ref={sectionRef}
      className="bg-white px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[42rem] text-center">
          <FadeUp
            as="h2"
            className="font-[family-name:var(--font-aeonik)] text-[32px] font-medium leading-[1.06] tracking-[-0.03em] text-[#111318] md:text-[44px]"
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
              className="flex w-full flex-wrap items-center justify-center gap-1 border-b border-black/8 pb-0"
              aria-label="Platform modules"
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative flex items-center gap-2 rounded-full px-3 py-2.5 text-[13px] font-medium text-black/40 outline-none transition-[color,background-color,transform] duration-[var(--zeon-duration-hover,220ms)] ease-out after:absolute after:inset-x-2 after:-bottom-px after:h-[2px] after:rounded-full after:bg-[#356DFF] after:opacity-0 after:transition-opacity hover:bg-black/[0.03] hover:text-[#111318] focus-visible:ring-2 focus-visible:ring-[#356DFF]/35 active:scale-[0.98] data-[state=active]:text-[#111318] data-[state=active]:after:opacity-100"
                >
                  {tab.icon}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {autoplay && !reduceMotion ? (
              <div
                id={progressRegionId}
                className="mt-0 h-0.5 w-full overflow-hidden bg-black/6"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                aria-label="Product tour progress"
              >
                <div
                  className="h-full bg-[#356DFF]"
                  style={{
                    width: `${progress}%`,
                    transition: progress === 0 ? "none" : "width 100ms linear",
                  }}
                />
              </div>
            ) : null}
          </div>

          {/* Compact scene caption — product screen is the hero */}
          <div className="mt-5 flex flex-wrap items-end justify-center gap-3 text-center sm:justify-between sm:text-left">
            <div className="relative mx-auto min-h-[1.5em] w-full max-w-[48ch] sm:mx-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active}
                  className="text-[15px] font-medium tracking-[-0.015em] text-[#111318] md:text-[16px]"
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduceMotion ? undefined : { opacity: 0, y: -6 }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: durationUi, ease: easeOut }
                  }
                >
                  {activeTab?.content.title}
                </motion.p>
              </AnimatePresence>
            </div>
            <a
              href="/demo"
              className="zeon-btn zeon-btn-soft zeon-btn-sm !rounded-[8px]"
            >
              {activeTab?.content.buttonText}
            </a>
          </div>

          <div className="mt-5 w-full">
            <AppShell
              title={shellTitle}
              moduleLabel={activeTab?.label}
              playing={!tourPaused && autoplay && !reduceMotion && inView}
              onTogglePlay={onTogglePlay}
              showPlayControl={autoplay && !reduceMotion}
            >
              {tabs.map((tab) => {
                const id = tab.content.screenId;
                const Screen = id ? PLATFORM_SCREENS[id] : null;
                if (!Screen) return null;
                const isActive = tab.value === active;
                return (
                  <div
                    key={tab.value}
                    className="absolute inset-0"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform:
                        reduceMotion || isActive
                          ? "translateY(0)"
                          : "translateY(6px)",
                      transition: reduceMotion
                        ? "none"
                        : `opacity ${CROSSFADE_MS}ms ease, transform ${CROSSFADE_MS}ms ease`,
                      pointerEvents: isActive ? "auto" : "none",
                      zIndex: isActive ? 1 : 0,
                    }}
                    aria-hidden={!isActive}
                    {...(!isActive ? { inert: true } : {})}
                  >
                    <Screen
                      active={isActive}
                      progress={isActive ? progress : 0}
                      reduceMotion={reduceMotion}
                    />
                  </div>
                );
              })}
            </AppShell>
            <p className="sr-only" aria-live="polite">
              Showing {activeTab?.label}
            </p>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export { Feature108 };
export type { Feature108Props, Tab, TabContent };
