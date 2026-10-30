"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import {
  durationEnter,
  easeOut,
  enterY as defaultY,
  viewportOnce,
} from "./motion";

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
  | "footer";

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

const motionTags = {
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
} as const;

export function FadeUp({
  children,
  delay = 0,
  duration = durationEnter,
  y = defaultY,
  className,
  style,
  as = "div",
  once = true,
  amount = viewportOnce.amount,
  "aria-hidden": ariaHidden,
}: FadeUpProps) {
  const reduceMotion = useReducedMotion();
  const Tag = motionTags[as] as typeof motion.div;

  const props: HTMLMotionProps<"div"> = {
    className,
    style,
    // Reduced motion: short opacity cross-fade only (Apple accessibility guidance).
    // Full motion: small rise — kept short to avoid floating content.
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once, amount },
    transition: reduceMotion
      ? { duration: 0.2, delay: 0, ease: easeOut }
      : { duration, delay, ease: easeOut },
    ...(ariaHidden !== undefined ? { "aria-hidden": ariaHidden } : {}),
  };

  return <Tag {...props}>{children}</Tag>;
}
