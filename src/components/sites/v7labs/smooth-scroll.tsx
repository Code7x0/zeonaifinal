"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion";
import { useEffect, useRef, type ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Site-wide Lenis smooth scrolling, driven by Motion's frame loop
 * so scroll-linked animations (useScroll) stay in sync.
 * @see https://motion.dev/docs/react-smooth-scroll
 *
 * Tuning notes:
 * - Lower lerp = more inertia / silkier wheel feel (was 0.1 → 0.075).
 * - Longer duration softens programmatic scrollTo (anchors, architecture).
 * - Slightly reduced wheelMultiplier avoids abrupt jumps on high-res mice.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        lerp: 0.075,
        duration: 1.15,
        smoothWheel: true,
        touchMultiplier: 1.2,
        wheelMultiplier: 0.9,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
