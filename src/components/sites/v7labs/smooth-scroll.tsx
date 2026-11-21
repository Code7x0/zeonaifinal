"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { registerGsap, ScrollTrigger } from "./motion/gsap-register";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Site-wide Lenis smooth scrolling, synced with GSAP ScrollTrigger.
 *
 * Uses Lenis `autoRaf: true` so wheel input always advances scroll. The earlier
 * GSAP-ticker + `autoRaf: false` path raced ReactLenis mount and left Lenis
 * preventing wheel events with no RAF — page could not scroll.
 *
 * Children stay mounted when enabling/disabling smooth wheel (no remount).
 * Disabled for reduced-motion and coarse pointers — native scroll feel.
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

  /* Bridge ScrollTrigger once Lenis exists (instance is set async by ReactLenis) */
  useEffect(() => {
    registerGsap();
    let cancelled = false;
    let removeScroll: (() => void) | undefined;
    let raf = 0;

    const bind = () => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) {
        raf = requestAnimationFrame(bind);
        return;
      }
      if (cancelled) return;

      /* Never call lenis.stop() — it blocks wheel/touch while still owning root */
      lenis.start();

      const onScroll = () => {
        ScrollTrigger.update();
      };
      lenis.on("scroll", onScroll);
      removeScroll = () => {
        lenis.off("scroll", onScroll);
      };
      ScrollTrigger.refresh();
    };

    bind();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      removeScroll?.();
    };
  }, [enabled]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: true,
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
