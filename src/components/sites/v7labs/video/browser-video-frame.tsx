"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePointerTilt } from "../use-pointer-tilt";

type BrowserVideoFrameProps = {
  title: string;
  children: ReactNode;
  className?: string;
  /** Show sample-data badge (always true for product surfaces) */
  sample?: boolean;
  tone?: "light" | "ink";
  /** Subtle pointer tilt for hero / feature placements */
  tilt?: boolean;
};

/** Consistent 16:9 product browser chrome for all video placements. */
export function BrowserVideoFrame({
  title,
  children,
  className,
  sample = true,
  tone = "light",
  tilt = false,
}: BrowserVideoFrameProps) {
  const ink = tone === "ink";
  const tiltApi = usePointerTilt({ maxDeg: 4, lift: 8, enabled: tilt });

  return (
    <figure
      ref={tiltApi.ref as never}
      className={cn(
        "zeon-window w-full min-w-0 max-w-full overflow-hidden",
        ink && "zeon-window-ink",
        tiltApi.className,
        className,
      )}
      style={tiltApi.style}
      onPointerMove={tiltApi.onPointerMove}
      onPointerLeave={tiltApi.onPointerLeave}
    >
      <figcaption
        className={cn(
          "relative z-[3] flex items-center gap-3 border-b px-3.5 py-2.5",
          ink
            ? "border-white/10 bg-white/[0.03]"
            : "border-[#E9EAEB]/80 bg-white/70 backdrop-blur-md",
        )}
      >
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2.5 rounded-full bg-[#FF5F57] shadow-[inset_0_-0.5px_0_rgba(0,0,0,0.15)]" />
          <i className="size-2.5 rounded-full bg-[#FEBC2E] shadow-[inset_0_-0.5px_0_rgba(0,0,0,0.15)]" />
          <i className="size-2.5 rounded-full bg-[#28C840] shadow-[inset_0_-0.5px_0_rgba(0,0,0,0.15)]" />
        </span>
        <span
          className={cn(
            "min-w-0 flex-1 truncate rounded-md px-2.5 py-1 font-mono text-[11px] tracking-[0.02em]",
            ink
              ? "bg-white/[0.06] text-white/55"
              : "bg-[#F5F5F5]/90 text-[#717680]",
          )}
        >
          {title}
        </span>
        {sample ? (
          <span
            className={cn(
              "shrink-0 rounded-[6px] border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em]",
              ink
                ? "border-white/15 text-white/45"
                : "border-[#E9EAEB] text-[#717680]",
            )}
          >
            Sample
          </span>
        ) : null}
      </figcaption>
      <div className="relative z-[1] aspect-video w-full min-w-0 overflow-hidden bg-[#0B0B0B]">
        {children}
      </div>
    </figure>
  );
}
