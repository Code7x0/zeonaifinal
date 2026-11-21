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
import {
  registerVideoVisibility,
  updateVideoVisibility,
} from "./video-visibility";

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
 * Muted autoplay product film with poster-first paint and shared visibility
 * arbitration so multiple films do not fight for bandwidth/CPU.
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
  const poster = asset.poster;
  const captions = captionsSrc ?? asset.captionsSrc;
  const autoplay = Boolean(src) && preferAutoplay;
  const mode = autoplay ? "loop" : (modeOverride ?? asset.mode);
  const reduceMotion = Boolean(useReducedMotion());
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const instanceId = useId();
  const [nearView, setNearView] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [needsManual, setNeedsManual] = useState(false);
  const labelId = useId();

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
      setShowPoster(false);
      setNeedsManual(false);
    } catch {
      window.setTimeout(() => {
        void v
          .play()
          .then(() => {
            setPlaying(true);
            setShowPoster(false);
            setNeedsManual(false);
          })
          .catch(() => {
            setPlaying(false);
            setNeedsManual(true);
          });
      }, 40);
    }
  }, [error, src]);

  /* Register with the shared visibility manager */
  useEffect(() => {
    if (!src || mode !== "loop" || reduceMotion) return;
    return registerVideoVisibility({
      id: instanceId,
      ratio: 0,
      near: false,
      play: () => setShouldPlay(true),
      pause: () => setShouldPlay(false),
    });
  }, [instanceId, src, mode, reduceMotion]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNearView(true);
      updateVideoVisibility(instanceId, { near: true, ratio: 1 });
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        const near = Boolean(
          entry?.isIntersecting && (entry.intersectionRatio ?? 0) > 0.02,
        );
        setNearView(near);
        updateVideoVisibility(instanceId, {
          near,
          ratio: entry?.intersectionRatio ?? 0,
        });
      },
      {
        rootMargin: "180px 0px",
        threshold: [0, 0.02, 0.12, 0.25, 0.5, 0.75],
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [instanceId]);

  useEffect(() => {
    if (!src || mode !== "loop") return;
    const allowed = active && nearView && shouldPlay && !reduceMotion;
    if (!allowed) {
      pauseVideo();
      return;
    }
    let cancelled = false;
    const id = window.requestAnimationFrame(() => {
      if (!cancelled) void playVideo();
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
    };
  }, [
    mode,
    src,
    reduceMotion,
    active,
    nearView,
    shouldPlay,
    pauseVideo,
    playVideo,
  ]);

  useEffect(() => {
    setError(false);
    setShowPoster(true);
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

      {/* Poster paints immediately — no black flash while the film buffers */}
      {poster && showPoster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          className="absolute inset-0 z-[1] h-full w-full object-cover"
          decoding="async"
          fetchPriority={nearView ? "high" : "auto"}
        />
      ) : null}

      {showVideo ? (
        <video
          key={src}
          ref={videoRef}
          className={cn(
            "absolute inset-0 z-[2] h-full w-full max-w-full object-cover transition-opacity duration-300",
            playing && !showPoster ? "opacity-100" : "opacity-0",
          )}
          muted
          playsInline
          poster={poster}
          autoPlay={false}
          loop={mode === "loop"}
          preload={nearView ? "metadata" : "none"}
          controls={false}
          disablePictureInPicture
          onPlay={() => {
            setPlaying(true);
            setShowPoster(false);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            if (mode === "loop") void playVideo();
            else setPlaying(false);
          }}
          onLoadedData={() => {
            if (mode === "loop" && active && nearView && shouldPlay && !reduceMotion) {
              void playVideo();
            }
          }}
          onCanPlay={() => {
            if (mode === "loop" && active && nearView && shouldPlay && !reduceMotion) {
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
        <div className="absolute inset-0 z-[2] bg-[#0B0B0B]">
          {fallback ?? null}
        </div>
      )}

      {showVideo && mode === "loop" && reduceMotion ? (
        <div className="pointer-events-none absolute inset-0 z-[3] flex items-end bg-gradient-to-t from-[#181D27]/40 to-transparent p-3">
          <p className="text-[11px] text-white/85">
            Motion reduced — video paused.
          </p>
        </div>
      ) : null}

      {/* Manual fallback only when the browser blocked muted autoplay */}
      {needsManual && showVideo && !playing ? (
        <button
          type="button"
          className="absolute bottom-3 right-3 z-[4] rounded-md bg-white/90 px-2.5 py-1.5 text-[11px] font-medium text-[#181D27] shadow-sm backdrop-blur-sm"
          onClick={() => void playVideo()}
        >
          Play demo
        </button>
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
