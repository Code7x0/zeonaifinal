"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { durationUi, easeOut, enterY as defaultY } from "./motion";

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

const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  nav: motion.nav,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  li: motion.li,
  ul: motion.ul,
} as const;

/**
 * Reliable scroll entrance using Motion whileInView.
 * Uses a low intersection threshold so tall sections never get stuck invisible.
 */
export function FadeUp({
  children,
  delay = 0,
  duration = durationUi,
  y = defaultY,
  className,
  style,
  as: Tag = "div",
  once = true,
  amount = 0.05,
  "aria-hidden": ariaHidden,
}: FadeUpProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const Component = MOTION_TAGS[Tag];

  return (
    <Component
      className={cn("zeon-fade-up", className)}
      style={style}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: Math.min(amount, 0.1) }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: Math.min(duration, 0.42), delay, ease: easeOut }
      }
      {...(ariaHidden !== undefined ? { "aria-hidden": ariaHidden } : {})}
    >
      {children}
    </Component>
  );
}
