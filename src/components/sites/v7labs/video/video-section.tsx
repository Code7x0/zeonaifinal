"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { durationEnter, easeOut, enterY } from "../motion";
import { ProductVideo } from "./product-video";
import type { VideoPlacement } from "./types";

type VideoSectionProps = {
  assetId: VideoPlacement;
  eyebrow?: string;
  headline?: string;
  body?: string;
  after?: string;
  cta?: ReactNode;
  className?: string;
  /** Layout: video below copy (default) or side-by-side on desktop */
  layout?: "stack" | "split" | "split-reverse";
  tone?: "light" | "ink";
  framed?: boolean;
  children?: ReactNode;
};

/** Editorial section wrapping ProductVideo with copy hierarchy from the brief. */
export function VideoSection({
  assetId,
  eyebrow,
  headline,
  body,
  after,
  cta,
  className,
  layout = "stack",
  tone = "light",
  framed = true,
  children,
}: VideoSectionProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const split = layout === "split" || layout === "split-reverse";
  const reverse = layout === "split-reverse";

  const copy = (
    <div className={cn(split ? "min-w-0" : "mx-auto max-w-[52rem] text-center")}>
      {eyebrow ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#1B46F5]">
          {eyebrow}
        </p>
      ) : null}
      {headline ? (
        <h2
          className={cn(
            "font-[family-name:var(--font-aeonik)] tracking-[-0.03em] text-[#181D27]",
            split
              ? "mt-3 text-[28px] leading-[1.08] md:text-[36px]"
              : "mt-3 text-[32px] leading-[1.06] md:text-[40px]",
          )}
        >
          {headline}
        </h2>
      ) : null}
      {body ? (
        <p
          className={cn(
            "mt-4 text-[15px] leading-[1.55] text-[#535862] md:text-[16px]",
            !split && "mx-auto max-w-[48ch]",
          )}
        >
          {body}
        </p>
      ) : null}
      {cta ? <div className={cn("mt-6", !split && "flex justify-center")}>{cta}</div> : null}
    </div>
  );

  const video = (
    <div className="min-w-0">
      <ProductVideo assetId={assetId} tone={tone} framed={framed} />
      {after ? (
        <p className="mt-4 max-w-[52ch] text-[13px] leading-[1.5] text-[#717680]">
          {after}
        </p>
      ) : null}
      {children}
    </div>
  );

  return (
    <motion.section
      className={cn("w-full", className)}
      initial={reduceMotion ? false : { opacity: 0, y: enterY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: durationEnter, ease: easeOut }
      }
    >
      <div
        className={cn(
          split
            ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
            : "flex flex-col gap-8",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        {copy}
        {video}
      </div>
    </motion.section>
  );
}
