"use client";

import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const PROGRESSIVE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function isMobileViewport() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches
  );
}

function clearRevealStyles(el: HTMLElement) {
  el.style.removeProperty("opacity");
  el.style.removeProperty("transform");
  el.style.removeProperty("transition");
  el.style.removeProperty("will-change");
}

/**
 * Shared IntersectionObserver + GPU-composited CSS transition batch engine.
 * - Waits until elements cross meaningfully into the viewport (rootMargin bottom -22% desktop / -14% mobile).
 * - Batches cards entering together (e.g. a grid row) in DOM order and animates them
 *   on the compositor thread with an intentional pause (`delay`) + deliberate `stagger` + smooth rise.
 * - Clears inline transform/transition after settle so card hover lifts remain unaffected.
 * - Immune to Lenis, overflow-x:clip, dynamic heights, and background tab RAF throttling.
 */
function observeProgressiveBatch(
  items: HTMLElement[],
  options: {
    delay: number;
    stagger: number;
    duration: number;
    y: number;
    scale: number;
    reduceMotion: boolean;
  },
) {
  if (!items.length) return () => {};

  if (options.reduceMotion) {
    items.forEach(clearRevealStyles);
    return () => {};
  }

  const mobile = isMobileViewport();
  const travel = mobile ? Math.round(options.y * 0.6) : options.y;
  const durMs = Math.round(
    (mobile ? Math.min(options.duration, 0.66) : options.duration) * 1000,
  );
  const stepMs = Math.round(
    (mobile ? Math.min(options.stagger, 0.14) : options.stagger) * 1000,
  );
  const leadDelayMs = Math.round(
    (mobile ? Math.min(options.delay, 0.22) : options.delay) * 1000,
  );
  const startScale = mobile ? Math.max(options.scale, 0.98) : options.scale;
  const bottomMarginPct = mobile ? 14 : 22;

  const revealed = new WeakSet<HTMLElement>();
  const indexMap = new Map<HTMLElement, number>(items.map((el, i) => [el, i]));
  const timers: number[] = [];
  let revealedCount = 0;
  let scrollRaf = 0;

  const detachScroll = () => {
    window.removeEventListener("scroll", scheduleCheck);
    window.removeEventListener("resize", scheduleCheck);
    if (scrollRaf) {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = 0;
    }
  };

  items.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = `translate3d(0, ${travel}px, 0) scale(${startScale})`;
    el.style.willChange = "opacity, transform";
    el.style.transition = "none";
  });

  const animateBatch = (batch: HTMLElement[]) => {
    const pending = batch
      .filter((el) => !revealed.has(el))
      .sort((a, b) => (indexMap.get(a) ?? 0) - (indexMap.get(b) ?? 0));
    if (!pending.length) return;

    pending.forEach((el) => {
      revealed.add(el);
      revealedCount += 1;
      io.unobserve(el);
    });

    if (revealedCount >= items.length) {
      detachScroll();
    }

    // Force a style flush so the initial hidden state commits before transitioning
    void pending[0]?.offsetHeight;

    pending.forEach((el, idx) => {
      const itemDelayMs = leadDelayMs + idx * stepMs;
      el.style.transition = `opacity ${durMs}ms ${PROGRESSIVE_EASE} ${itemDelayMs}ms, transform ${durMs}ms ${PROGRESSIVE_EASE} ${itemDelayMs}ms`;
      el.style.opacity = "1";
      el.style.transform = "translate3d(0, 0, 0) scale(1)";

      const cleanTimer = window.setTimeout(() => {
        clearRevealStyles(el);
      }, durMs + itemDelayMs + 80);
      timers.push(cleanTimer);
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      const entering = entries
        .filter((e) => e.isIntersecting)
        .map((e) => e.target as HTMLElement);
      if (entering.length) animateBatch(entering);
    },
    {
      threshold: 0.01,
      rootMargin: `0px 0px -${bottomMarginPct}% 0px`,
    },
  );

  items.forEach((el) => io.observe(el));

  const checkVisibleOrBottom = () => {
    scrollRaf = 0;
    if (revealedCount >= items.length) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const atBottom =
      window.scrollY + vh >= document.documentElement.scrollHeight - 24;
    const triggerY = vh * (1 - bottomMarginPct / 100);
    const ready = items.filter((el) => {
      if (revealed.has(el)) return false;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return false;
      return rect.top <= triggerY || (atBottom && rect.top <= vh);
    });
    if (ready.length) animateBatch(ready);
  };

  const scheduleCheck = () => {
    if (scrollRaf || revealedCount >= items.length) return;
    scrollRaf = requestAnimationFrame(checkVisibleOrBottom);
  };

  const initTimer = window.setTimeout(checkVisibleOrBottom, 30);
  timers.push(initTimer);
  window.addEventListener("scroll", scheduleCheck, { passive: true });
  window.addEventListener("resize", scheduleCheck, { passive: true });

  return () => {
    timers.forEach((t) => window.clearTimeout(t));
    io.disconnect();
    detachScroll();
    items.forEach(clearRevealStyles);
  };
}

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  /** Initial pause after entering viewport before reveal begins (seconds) */
  delay?: number;
  /** Vertical travel in px — desktop value; lighter on mobile */
  y?: number;
  /** Subtle starting scale (1 = no scale) */
  scale?: number;
  /** Kept for API compatibility */
  start?: string;
  once?: boolean;
};

/**
 * Progressive scroll entrance for section headers & content blocks.
 * Content stays visible if JS fails; reduced-motion skips movement cleanly.
 */
export function ScrollReveal({
  children,
  className,
  style,
  as: Tag = "div",
  delay = 0.14,
  y = 28,
  scale = 1,
}: ScrollRevealProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    return observeProgressiveBatch([el], {
      delay,
      stagger: 0,
      duration: 0.82,
      y,
      scale,
      reduceMotion,
    });
  }, [reduceMotion, delay, y, scale]);

  return (
    <Tag
      ref={rootRef}
      className={cn("zeon-reveal", className)}
      style={style}
      data-reveal=""
    >
      {children}
    </Tag>
  );
}

type ScrollRevealStaggerProps = {
  children: ReactNode;
  className?: string;
  /** Child selector scoped to this root */
  childSelector?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  scale?: number;
  start?: string;
};

/**
 * Deliberate progressive stagger for card carousels and single-row groups.
 * Pauses ~420ms after entering view, then reveals cards in sequence (220ms stagger, 900ms rise).
 */
export function ScrollRevealStagger({
  children,
  className,
  childSelector = "[data-reveal-child]",
  delay = 0.42,
  stagger = 0.22,
  y = 40,
  scale = 0.96,
}: ScrollRevealStaggerProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(childSelector));
    if (!items.length) return;
    return observeProgressiveBatch(items, {
      delay,
      stagger,
      duration: 0.9,
      y,
      scale,
      reduceMotion,
    });
  }, [reduceMotion, childSelector, delay, stagger, y, scale]);

  return (
    <div ref={rootRef as Ref<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
}

type ScrollRevealGridProps<T extends "div" | "ul" = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  /** Direct children (`:scope > *`) by default, or a custom selector inside the grid */
  itemSelector?: string;
  /** Intentional pause after row enters viewport before cards begin populating (seconds) */
  delay?: number;
  stagger?: number;
  y?: number;
  /** Subtle starting scale on desktop (e.g. 0.96 for cards) */
  scale?: number;
  start?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Row-aware progressive card/grid reveal.
 * Waits until each row is meaningfully in view, pauses 420ms, then populates
 * cards one by one (220ms stagger, 900ms smooth rise).
 */
export function ScrollRevealGrid<T extends "div" | "ul" = "div">({
  as,
  children,
  className,
  itemSelector = ":scope > *",
  delay = 0.42,
  stagger = 0.22,
  y = 40,
  scale = 0.96,
  start: _start,
  ...rest
}: ScrollRevealGridProps<T>) {
  void _start;
  const Tag = (as ?? "div") as ElementType;
  const reduceMotion = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(itemSelector));
    if (!items.length) return;
    return observeProgressiveBatch(items, {
      delay,
      stagger,
      duration: 0.9,
      y,
      scale,
      reduceMotion,
    });
  }, [reduceMotion, itemSelector, delay, stagger, y, scale]);

  return (
    <Tag ref={rootRef} className={className} data-reveal-grid="" {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Progressive, row-aware reveals for repeated card grids inside a page container
 * (e.g. PageShell <main> or TechnologyPage).
 * Automatically skips elements already controlled by ScrollReveal/ScrollRevealGrid,
 * dialogs, tabpanels, and headers to guarantee zero duplicate triggers.
 */
export function useAutoCardReveals(
  containerRef: RefObject<HTMLElement | null>,
  selector = "section .grid > article, section ul.grid > li, section .grid > a",
) {
  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const candidates = Array.from(
      root.querySelectorAll<HTMLElement>(selector),
    ).filter((el) => {
      if (
        el.closest(
          "[data-reveal], [data-reveal-grid], [data-no-auto-reveal], [role='dialog'], [role='tabpanel'], header",
        )
      ) {
        return false;
      }
      return true;
    });

    if (!candidates.length) return;

    return observeProgressiveBatch(candidates, {
      delay: 0.42,
      stagger: 0.22,
      duration: 0.88,
      y: 38,
      scale: 0.96,
      reduceMotion,
    });
  }, [containerRef, reduceMotion, selector]);
}
