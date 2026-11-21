"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Site-wide Lenis smooth scrolling, driven by Motion's frame loop.
 *
 * Always wraps children in a stable ReactLenis tree so enabling/disabling
 * smooth scroll never remounts page content (which previously orphaned
 * IntersectionObservers and left Technology `.rv` blocks at opacity: 0).
 *
 * Disabled for reduced-motion and coarse pointers — native scroll only.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const sync = () => {
      setEnabled(!motionMq.matches && !coarseMq.matches);
    };
    sync();
    motionMq.addEventListener("change", sync);
    coarseMq.addEventListener("change", sync);
    return () => {
      motionMq.removeEventListener("change", sync);
      coarseMq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    if (!enabled) {
      lenis.stop();
      return;
    }

    lenis.start();
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }
    frame.update(update, true);
    return () => {
      cancelFrame(update);
      lenisRef.current?.lenis?.stop();
    };
  }, [enabled]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        lerp: 0.08,
        duration: 1.05,
        smoothWheel: enabled,
        touchMultiplier: 1,
        wheelMultiplier: 0.9,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
