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
import { VideoControls } from "./video-controls";

type ProductVideoProps = {
  assetId: VideoPlacement;
  className?: string;
  frameClassName?: string;
  /** Force mode override */
  mode?: "loop" | "click";
  /** Only load/play when this is true (e.g. active tab) */
  active?: boolean;
  /** Optional caption track override */
  captionsSrc?: string | null;
  /** Custom poster overlay when asset poster is a generic fallback */
  fallback?: ReactNode;
  tone?: "light" | "ink";
  /** Show browser chrome */
  framed?: boolean;
  /** Subtle pointer tilt on the browser frame (hero / large placements) */
  tilt?: boolean;
};

/**
 * Shared product video player.
 * - Loop: muted, playsInline, lazy-load near viewport, pause off-screen / reduced-motion.
 * - Click: never autoplays; captions when provided; poster until play.
 * When `src` is missing, shows the poster (or custom fallback) without claiming a live demo.
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
}: ProductVideoProps) {
  const asset = getVideoAsset(assetId);
  const mode = modeOverride ?? asset.mode;
  const src = asset.src;
  const poster = asset.poster;
  const captions = captionsSrc ?? asset.captionsSrc;
  const reduceMotion = Boolean(useReducedMotion());
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [nearView, setNearView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
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
        const visible = Boolean(
          entry?.isIntersecting && (entry.intersectionRatio ?? 0) > 0.15,
        );
        setNearView(visible);
        if (visible) setShouldLoad(true);
      },
      { rootMargin: "200px 0px", threshold: [0, 0.15, 0.4] },
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
    try {
      await v.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, [error, src]);

  // Loop autoplay when near view, active, and motion allowed
  useEffect(() => {
    if (mode !== "loop") return;
    if (!src || !shouldLoad) return;
    if (reduceMotion || !active || !nearView) {
      pauseVideo();
      return;
    }
    void playVideo();
  }, [
    mode,
    src,
    shouldLoad,
    reduceMotion,
    active,
    nearView,
    pauseVideo,
    playVideo,
  ]);

  // Pause click videos when leaving viewport or becoming inactive
  useEffect(() => {
    if (mode !== "click") return;
    if (!active || !nearView) pauseVideo();
  }, [mode, active, nearView, pauseVideo]);

  const onToggleClick = () => {
    if (!src || error) return;
    if (playing) {
      pauseVideo();
    } else {
      setShouldLoad(true);
      void playVideo();
    }
  };

  const media = (
    <div
      ref={rootRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
      aria-labelledby={labelId}
    >
      <span id={labelId} className="sr-only">
        {asset.title}. {asset.description}
      </span>

      {!src || error ? (
        <div className="absolute inset-0">
          {fallback ?? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          )}
          {!fallback ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#181D27]/55 to-transparent px-4 pb-3.5 pt-10">
              <p className="font-[family-name:var(--font-aeonik)] text-[14px] tracking-[-0.02em] text-white md:text-[15px]">
                {asset.title}
              </p>
              <p className="mt-0.5 max-w-[48ch] text-[12px] leading-[1.4] text-white/75">
                Product recording pending — sample interface still.
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <>
          {(shouldLoad && active) || mode === "click" ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              poster={poster}
              muted={mode === "loop"}
              playsInline
              loop={mode === "loop"}
              preload={shouldLoad && active ? "metadata" : "none"}
              controls={mode === "click" && playing}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onError={() => setError(true)}
            >
              {shouldLoad && active ? <source src={src} type="video/mp4" /> : null}
              {captions ? (
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
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          )}

          {mode === "click" && !playing ? (
            <VideoControls
              playing={false}
              onToggle={onToggleClick}
              label={asset.title}
            />
          ) : null}

          {mode === "loop" && reduceMotion ? (
            <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-[#181D27]/40 to-transparent p-3">
              <p className="text-[11px] text-white/85">
                Motion reduced — showing still frame.
              </p>
            </div>
          ) : null}
        </>
      )}
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
