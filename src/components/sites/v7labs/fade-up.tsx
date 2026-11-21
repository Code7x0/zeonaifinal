"use client";

import {
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { durationEnter, enterY as defaultY } from "./motion";
import { gsap, registerGsap, useGSAP } from "./motion/gsap-register";

type FadeUpTag =
  | "div"
  | "section"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "nav"
  | "article"
  | "header"
  | "footer"
  | "li"
  | "ul";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: FadeUpTag;
  once?: boolean;
  amount?: number;
  "aria-hidden"?: boolean | "true" | "false";
};

/**
 * Section/text entrance via GSAP ScrollTrigger (opacity + y).
 * Falls back to immediate visibility when reduced-motion is on.
 * Content remains in the document for screen readers at all times.
 */
export function FadeUp({
  children,
  delay = 0,
  duration = durationEnter,
  y = defaultY,
  className,
  style,
  as: Tag = "div",
  once = true,
  amount = 0.2,
  "aria-hidden": ariaHidden,
}: FadeUpProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      if (reduceMotion) {
        gsap.set(el, { clearProps: "opacity,transform,visibility" });
        return;
      }

      const startPct = Math.round((1 - Math.min(Math.max(amount, 0.05), 0.9)) * 100);

      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: el,
            start: `top ${startPct}%`,
            once,
            toggleActions: "play none none none",
          },
        },
      );
    },
    {
      dependencies: [reduceMotion, delay, duration, y, once, amount],
    },
  );

  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref}
      className={cn("zeon-fade-up", className)}
      style={style}
      {...(ariaHidden !== undefined ? { "aria-hidden": ariaHidden } : {})}
    >
      {children}
    </Component>
  );
}
