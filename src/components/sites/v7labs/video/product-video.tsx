"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { BrowserVideoFrame } from "./browser-video-frame";
import { getVideoAsset } from "./registry";
import type { VideoPlacement } from "./types";

type ProductVideoProps = {
  assetId: VideoPlacement;
  className?: string;
  frameClassName?: string;
  mode?: "loop" | "click";
  active?: boolean;
  captionsSrc?: string | null;
  fallback?: ReactNode;
  tone?: "light" | "ink";
  framed?: boolean;
  tilt?: boolean;
  preferAutoplay?: boolean;
};

/**
 * Muted autoplay product film. Dark underlay stays behind the video so empty
 * chrome never flashes; the video itself stays visible so the first decoded
 * frame paints immediately (no opacity gate that can stick on black).
 */
export function ProductVideo({
  assetId,
  className,
  frameClassName,
  mode: modeOverride,
  active = true,
  captionsSrc,
  fallback,
  tone = "light",
  framed = true,
  tilt = false,
  preferAutoplay = true,
}: ProductVideoProps) {
  const asset = getVideoAsset(assetId);
  const src = asset.src;
  const captions = captionsSrc ?? asset.captionsSrc;
  const autoplay = Boolean(src) && preferAutoplay;
  const mode = autoplay ? "loop" : (modeOverride ?? asset.mode);
  const reduceMotion = Boolean(useReducedMotion());
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [nearView, setNearView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const labelId = useId();

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNearView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setNearView(
          Boolean(entry?.isIntersecting && (entry.intersectionRatio ?? 0) > 0.02),
        );
      },
      /* Smaller preload window — large videos were fetching far ahead of the viewport */
      { rootMargin: "200px 0px", threshold: [0, 0.02, 0.15] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pauseVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  }, []);

  const playVideo = useCallback(async () => {
    const v = videoRef.current;
    if (!v || !src || error) return;
    v.muted = true;
    v.playsInline = true;
    try {
      await v.play();
      setPlaying(true);
    } catch {
      window.setTimeout(() => {
        void v
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }, 40);
    }
  }, [error, src]);

  useEffect(() => {
    if (!src || mode !== "loop") return;
    if (reduceMotion || !active || !nearView) {
      pauseVideo();
      return;
    }
    // Wait a frame after un-hiding so layout/IO settle, then play.
    let cancelled = false;
    const id = window.requestAnimationFrame(() => {
      if (cancelled) return;
      void playVideo();
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
    };
  }, [mode, src, reduceMotion, active, nearView, pauseVideo, playVideo]);

  useEffect(() => {
    setError(false);
  }, [src]);

  const showVideo = Boolean(src) && !error;

  const media = (
    <div
      ref={rootRef}
      className={cn(
        "relative h-full w-full overflow-hidden bg-[#0B0B0B]",
        className,
      )}
      aria-labelledby={labelId}
    >
      <span id={labelId} className="sr-only">
        {asset.title}. {asset.description}
      </span>

      <div className="absolute inset-0 bg-[#0B0B0B]" aria-hidden />

      {showVideo ? (
        <video
          key={src}
          ref={videoRef}
          className="absolute inset-0 z-[1] h-full w-full max-w-full object-cover"
          muted
          playsInline
          autoPlay={
            mode === "loop" && active && nearView && !reduceMotion
          }
          loop={mode === "loop"}
          /* Avoid fetching multi‑MB films until near the viewport */
          preload={nearView ? "metadata" : "none"}
          controls={false}
          disablePictureInPicture
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            if (mode === "loop") void playVideo();
            else setPlaying(false);
          }}
          onLoadedData={() => {
            if (mode === "loop" && active && nearView && !reduceMotion) {
              void playVideo();
            }
          }}
          onCanPlay={() => {
            if (mode === "loop" && active && nearView && !reduceMotion) {
              void playVideo();
            }
          }}
          onError={() => setError(true)}
        >
          {nearView ? <source src={src!} type="video/mp4" /> : null}
          {nearView && captions ? (
            <track
              kind="captions"
              src={captions}
              srcLang="en"
              label="English"
              default
            />
          ) : null}
        </video>
      ) : (
        <div className="absolute inset-0 z-[1] bg-[#0B0B0B]">
          {fallback ?? null}
        </div>
      )}

      {showVideo && mode === "loop" && reduceMotion ? (
        <div className="pointer-events-none absolute inset-0 z-[2] flex items-end bg-gradient-to-t from-[#181D27]/40 to-transparent p-3">
          <p className="text-[11px] text-white/85">
            Motion reduced — video paused.
          </p>
        </div>
      ) : null}

      <span className="sr-only" aria-live="polite">
        {playing ? "Playing" : "Paused"}
      </span>
    </div>
  );

  if (!framed) return media;

  return (
    <BrowserVideoFrame
      title={asset.title}
      className={frameClassName}
      tone={tone}
      tilt={tilt}
    >
      {media}
    </BrowserVideoFrame>
  );
}
