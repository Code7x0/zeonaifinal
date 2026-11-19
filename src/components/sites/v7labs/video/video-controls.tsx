"use client";

import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type VideoControlsProps = {
  playing: boolean;
  onToggle: () => void;
  label: string;
  className?: string;
  size?: "md" | "lg";
};

export function VideoControls({
  playing,
  onToggle,
  label,
  className,
  size = "lg",
}: VideoControlsProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "group absolute inset-0 z-10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2962FF] focus-visible:ring-offset-2",
        className,
      )}
      aria-label={playing ? `Pause ${label}` : `Play ${label}`}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-[#181D27]/88 text-white shadow-[0_8px_24px_rgba(24,29,39,0.28)] transition-[transform,background-color] duration-200 group-hover:bg-[#181D27] group-hover:scale-[1.04] group-active:scale-[0.98]",
          size === "lg" ? "size-14" : "size-11",
        )}
      >
        {playing ? (
          <Pause className="size-5 fill-current" aria-hidden />
        ) : (
          <Play className="ml-0.5 size-5 fill-current" aria-hidden />
        )}
      </span>
    </button>
  );
}
