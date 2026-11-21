"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, registerGsap, ScrollTrigger } from "./motion/gsap-register";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Site-wide Lenis smooth scrolling, driven by GSAP's ticker and synced with
 * ScrollTrigger. One instance per page tree; children never remount when
 * smooth scroll enables/disables (avoids orphaned IntersectionObservers).
 *
 * Disabled for reduced-motion and coarse pointers — native scroll only.
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

  useEffect(() => {
    registerGsap();
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    if (!enabled) {
      lenis.stop();
      ScrollTrigger.refresh();
      return;
    }

    lenis.start();

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    /* Official Lenis ↔ GSAP loop: one ticker, no lag smoothing */
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      lenis.stop();
    };
  }, [enabled]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        /* Snappier than 0.08 — visitor stays in control */
        lerp: 0.12,
        duration: 1.0,
        smoothWheel: enabled,
        touchMultiplier: 1,
        wheelMultiplier: 0.95,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
