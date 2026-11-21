"use client";

import {
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type Ref,
} from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { gsap, registerGsap, useGSAP } from "./gsap-register";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  /** Stagger delay before this block starts (seconds) */
  delay?: number;
  /** Vertical travel in px — keep small */
  y?: number;
  /** Fraction of element that must enter before playing */
  start?: string;
  once?: boolean;
};

/**
 * Once-only scroll entrance (opacity + y). Content stays visible if JS fails
 * via CSS fallback; reduced-motion skips the tween.
 */
export function ScrollReveal({
  children,
  className,
  style,
  as: Tag = "div",
  delay = 0,
  y = 18,
  start = "top 88%",
  once = true,
}: ScrollRevealProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = rootRef.current;
      if (!el || reduceMotion) {
        if (el) gsap.set(el, { clearProps: "opacity,transform" });
        return;
      }

      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: el,
            start,
            once,
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: rootRef, dependencies: [reduceMotion, delay, y, start, once] },
  );

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
  stagger?: number;
  y?: number;
  start?: string;
};

/** Stagger children that match `childSelector` as the section enters view. */
export function ScrollRevealStagger({
  children,
  className,
  childSelector = "[data-reveal-child]",
  stagger = 0.08,
  y = 16,
  start = "top 85%",
}: ScrollRevealStaggerProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root || reduceMotion) return;

      const items = root.querySelectorAll(childSelector);
      if (!items.length) return;

      gsap.fromTo(
        items,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: root,
            start,
            once: true,
            toggleActions: "play none none none",
          },
        },
      );
    },
    {
      scope: rootRef,
      dependencies: [reduceMotion, childSelector, stagger, y, start],
    },
  );

  return (
    <div ref={rootRef as Ref<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
}
