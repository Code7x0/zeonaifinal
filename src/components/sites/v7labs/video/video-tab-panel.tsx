"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { durationUi, easeOut } from "../motion";
import { ProductVideo } from "./product-video";
import type { VideoPlacement } from "./types";

type VideoTabPanelProps = {
  assetId: VideoPlacement;
  active: boolean;
  title?: string;
  description?: string;
  className?: string;
  tone?: "light" | "ink";
};

/** Active-tab gated ProductVideo for the homepage six-tab section. */
export function VideoTabPanel({
  assetId,
  active,
  title,
  description,
  className,
  tone = "ink",
}: VideoTabPanelProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div className={cn("relative w-full", className)}>
      {(title || description) && (
        <div className="mb-4 min-h-[3.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            {active ? (
              <motion.div
                key={assetId}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: durationUi, ease: easeOut }
                }
              >
                {title ? (
                  <p className="text-[15px] font-medium tracking-[-0.015em] text-[#181D27] md:text-[16px]">
                    {title}
                  </p>
                ) : null}
                {description ? (
                  <p className="mt-1 max-w-[52ch] text-[13px] leading-[1.45] text-[#717680]">
                    {description}
                  </p>
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )}
      <div
        className={cn(
          "transition-opacity duration-300",
          active ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
        )}
        aria-hidden={!active}
        {...(!active ? { inert: true } : {})}
      >
        <ProductVideo assetId={assetId} active={active} tone={tone} />
      </div>
    </div>
  );
}
