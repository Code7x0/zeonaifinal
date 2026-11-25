"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type VideoProgressBarProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  /** Accessible name for the scrubber (e.g. asset title) */
  label: string;
  className?: string;
  /** Hide until the film has started (keeps poster-only state clean) */
  visible?: boolean;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Manifest-style pill seek bar for ProductVideo.
 * Single continuous track: 1.5px tall, full-width, solid white fill.
 * Positioned at the bottom of the video frame — no heavy gradient overlay.
 * Thumb appears only on hover/focus. Non-intrusive by default.
 */
export function VideoProgressBar({
  videoRef,
  label,
  className,
  visible = true,
}: VideoProgressBarProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const labelId = useRef(`vpb-${Math.random().toString(36).slice(2)}`).current;

  const syncDuration = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const d = v.duration;
    if (Number.isFinite(d) && d > 0) setDuration(d);
  }, [videoRef]);

  const syncTime = useCallback(() => {
    const v = videoRef.current;
    if (!v || draggingRef.current) return;
    setCurrent(v.currentTime);
  }, [videoRef]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    syncDuration();
    syncTime();

    const onMeta = () => syncDuration();
    const onTime = () => syncTime();

    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("durationchange", onMeta);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("seeked", onTime);
    v.addEventListener("play", onTime);
    v.addEventListener("pause", onTime);

    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("durationchange", onMeta);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("seeked", onTime);
      v.removeEventListener("play", onTime);
      v.removeEventListener("pause", onTime);
    };
  }, [videoRef, syncDuration, syncTime]);

  /* Smooth fill via rAF while playing */
  useEffect(() => {
    if (reduceMotion || dragging) return;
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && !v.paused && !v.ended && !draggingRef.current) {
        setCurrent(v.currentTime);
        if (Number.isFinite(v.duration) && v.duration > 0) {
          setDuration(v.duration);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [videoRef, reduceMotion, dragging]);

  const seekToRatio = useCallback(
    (ratio: number) => {
      const v = videoRef.current;
      if (!v || !Number.isFinite(v.duration) || v.duration <= 0) return;
      const next = Math.min(1, Math.max(0, ratio)) * v.duration;
      v.currentTime = next;
      setCurrent(next);
    },
    [videoRef],
  );

  const ratioFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    if (rect.width <= 0) return 0;
    return (clientX - rect.left) / rect.width;
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!duration) return;
    e.preventDefault();
    e.stopPropagation();
    draggingRef.current = true;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    seekToRatio(ratioFromClientX(e.clientX));
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    seekToRatio(ratioFromClientX(e.clientX));
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    e.stopPropagation();
    draggingRef.current = false;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!duration) return;
    const step = e.shiftKey ? 5 : 2;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      seekToRatio((current + step) / duration);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      seekToRatio((current - step) / duration);
    } else if (e.key === "Home") {
      e.preventDefault();
      seekToRatio(0);
    } else if (e.key === "End") {
      e.preventDefault();
      seekToRatio(1);
    }
  };

  if (!visible) return null;

  const pct = duration > 0 ? Math.min(100, Math.max(0, (current / duration) * 100)) : 0;
  const ready = duration > 0;
  const interactive = hovering || dragging || focused;

  return (
    /*
     * Manifest-style: slim pill anchored to the bottom-left of the video.
     * No heavy gradient overlay — just a thin frosted pill.
     * The hit target is expanded via padding; visible bar is 1.5px.
     */
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-[5] px-3 pb-3",
        className,
      )}
    >
      {/* Pill container — matches Manifest's ~10% white bg, no blur */}
      <div
        className={cn(
          "inline-flex w-full items-center rounded-full px-0 py-0",
          "transition-opacity duration-300",
          interactive ? "opacity-100" : "opacity-60",
        )}
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        {/* Seekable track */}
        <div
          ref={trackRef}
          role="slider"
          tabIndex={ready ? 0 : -1}
          aria-label={`${label} playback position`}
          aria-valuemin={0}
          aria-valuemax={ready ? Math.round(duration) : 0}
          aria-valuenow={ready ? Math.round(current) : 0}
          aria-valuetext={
            ready
              ? `${formatTime(current)} of ${formatTime(duration)}`
              : "Duration unavailable"
          }
          aria-disabled={!ready}
          id={labelId}
          className={cn(
            "pointer-events-auto relative w-full touch-none select-none outline-none",
            /* Generous hit target — 20px tall; visible track is 1.5px via the inner span */
            "h-5",
            ready ? "cursor-pointer" : "cursor-default",
          )}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => { if (!dragging) setHovering(false); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          {/* Visible track — 1.5px, matches Manifest 4px/pill ratio scaled to our context */}
          <span
            aria-hidden
            className={cn(
              "absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden rounded-full",
              interactive ? "h-[2px]" : "h-[1.5px]",
              "transition-[height] duration-150",
            )}
            style={{ background: "rgba(255,255,255,0.22)" }}
          >
            {/* Fill — solid white, no gradient, smooth width transition */}
            <span
              aria-hidden
              className={cn(
                "absolute inset-y-0 left-0 rounded-full bg-white",
                !reduceMotion && !dragging
                  ? "transition-[width] duration-75 ease-linear"
                  : undefined,
              )}
              style={{ width: `${pct}%` }}
            />
          </span>

          {/* Thumb — appears only when hovering/dragging/focused */}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white",
              "shadow-[0_1px_3px_rgba(0,0,0,0.4)]",
              "transition-[opacity,transform] duration-150",
              interactive ? "scale-100 opacity-100" : "scale-50 opacity-0",
            )}
            style={{ left: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
