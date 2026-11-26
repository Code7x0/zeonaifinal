"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, registerGsap, ScrollTrigger } from "./motion/gsap-register";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Site-wide Lenis smooth scrolling, frame-locked to a single GSAP ticker loop.
 *
 * - Uses `lerp: 0.16` (omitting conflicting `duration`) and `wheelMultiplier: 1.12`
 *   so wheel and trackpad gestures feel prompt, controlled, and effortless without
 *   heavy resistance or floaty overshoot.
 * - Single coordinated RAF loop: `gsap.ticker` drives `lenis.raf()` and updates
 *   `ScrollTrigger` on the same frame, eliminating dual-RAF jitter.
 * - Disabled for reduced-motion and coarse pointers (native mobile touch momentum).
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    registerGsap();
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

  /* Single coordinated RAF loop: GSAP ticker drives Lenis + ScrollTrigger in lockstep */
  useEffect(() => {
    registerGsap();
    gsap.ticker.lagSmoothing(0);

    let boundLenis: ReturnType<
      NonNullable<LenisRef["lenis"]>["on"]
    > extends never
      ? never
      : NonNullable<LenisRef["lenis"]> | null = null;

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };

    const tick = (time: number) => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;

      if (boundLenis !== lenis) {
        if (boundLenis) {
          boundLenis.off("scroll", onLenisScroll);
        }
        boundLenis = lenis;
        lenis.start();
        lenis.on("scroll", onLenisScroll);
        ScrollTrigger.refresh();
      }

      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      if (boundLenis) {
        boundLenis.off("scroll", onLenisScroll);
        boundLenis = null;
      }
    };
  }, [enabled]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        lerp: 0.16,
        smoothWheel: enabled,
        wheelMultiplier: 1.12,
        touchMultiplier: 1,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
