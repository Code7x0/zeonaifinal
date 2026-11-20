"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Site-wide Lenis smooth scrolling, driven by Motion's frame loop
 * so scroll-linked animations stay in sync.
 * Disabled when prefers-reduced-motion is set — native scroll only.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduceMotion]);

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        /* Slightly silkier wheel than before — Amrit-like inertia without lag */
        lerp: 0.065,
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 1.15,
        wheelMultiplier: 0.88,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
