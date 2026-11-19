"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useReducedMotion } from "motion/react";

type TiltOptions = {
  /** Max tilt in degrees on each axis. Keep small (4–8). */
  maxDeg?: number;
  /** Perspective distance in px */
  perspective?: number;
  /** Extra translateZ in px while hovering */
  lift?: number;
  enabled?: boolean;
};

/**
 * Subtle pointer-follow tilt for large visual cards / product windows.
 * Disabled on coarse pointers, reduced-motion, and when enabled=false.
 */
export function usePointerTilt({
  maxDeg = 5,
  perspective = 900,
  lift = 6,
  enabled = true,
}: TiltOptions = {}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setCoarse(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const active = enabled && !reduceMotion && !coarse;

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (!active) return;
      const el = ref.current ?? e.currentTarget;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 2 * maxDeg;
      const rotateX = (0.5 - py) * 2 * maxDeg;
      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(${lift}px)`,
        transition: "transform 80ms linear",
        willChange: "transform",
      });
    },
    [active, lift, maxDeg, perspective],
  );

  const onPointerLeave = useCallback(() => {
    if (!active) return;
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0)`,
      transition: "transform 320ms cubic-bezier(0.23, 1, 0.32, 1)",
      willChange: "auto",
    });
  }, [active, perspective]);

  return {
    ref,
    style: active ? style : undefined,
    onPointerMove: active ? onPointerMove : undefined,
    onPointerLeave: active ? onPointerLeave : undefined,
    className: active ? "zeon-tilt" : undefined,
  } as const;
}
