"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  durationEnter,
  easeOut,
  enterY,
  pressScale,
  pressTransition,
  staggerEnter,
} from "./motion";
import { gsap, registerGsap, ScrollTrigger, useGSAP } from "./motion/gsap-register";
import { ProductVideo } from "./video";
import { ZeonLinkButton } from "./zeon-ui";

/* Three.js hills are heavy — load after paint, never on the critical path */
const GLSLHills = dynamic(
  () =>
    import("@/components/ui/glsl-hills").then((m) => ({
      default: m.GLSLHills,
    })),
  { ssr: false },
);

/**
 * Homepage hero — agents-first headline + Placement 1 product video
 * (`home-hero`: Ask AI with citations). Muted autoplay product film.
 * On scroll, the film expands toward full viewport width (GSAP scrub).
 */
export function Hero() {
  registerGsap();
  const reduceMotion = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      if (reduceMotion) return;

      const root = rootRef.current;
      const copy = copyRef.current;
      const stage = stageRef.current;
      const frame = frameRef.current;
      const caption = captionRef.current;
      if (!root || !copy || !stage || !frame) return;

      const clear = () => {
        gsap.set(
          [frame, copy, caption].filter(Boolean),
          { clearProps: "opacity,transform" },
        );
      };

      /*
       * Pure GPU-composited full-width expansion (zero maxWidth/padding/
       * borderRadius layout or paint thrashing on scroll).
       * The frame is laid out at its full expanded width and scaled down to
       * ~920px visually at scroll=0, then smoothly scrubbed to scale(1) on
       * the compositor thread.
       */
      const getStartScale = () => {
        const fullW = frame.offsetWidth;
        if (!fullW) return 1;
        if (window.innerWidth >= 768) {
          return Math.min(1, 920 / fullW);
        }
        return 0.96;
      };

      gsap.set(frame, {
        scale: getStartScale(),
        transformOrigin: "50% 0%",
        force3D: true,
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () =>
            `+=${Math.round(window.innerHeight * (window.innerWidth >= 768 ? 0.34 : 0.36))}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        frame,
        { scale: getStartScale, transformOrigin: "50% 0%", force3D: true },
        { scale: 1, transformOrigin: "50% 0%", force3D: true },
        0,
      );

      if (window.innerWidth >= 768) {
        tl.to(copy, { opacity: 0.38, y: -14, force3D: true }, 0);
        if (caption) tl.to(caption, { opacity: 0, y: 4, force3D: true }, 0);
      }

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        tl.scrollTrigger?.kill();
        tl.kill();
        clear();
      };
    },
    { dependencies: [reduceMotion], revertOnUpdate: true },
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-x-clip bg-[var(--dp-gradient-hero,#F0F4FC)]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(41,98,255,0.14), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 90%, rgba(97,114,243,0.10), transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #EEF4FF 48%, #FAFAFA 100%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-50 max-md:hidden">
        {reduceMotion ? null : (
          <GLSLHills
            width="100%"
            height="100%"
            cameraZ={125}
            planeSize={192}
            speed={0.35}
            className="h-full w-full"
          />
        )}
      </div>

      <div
        ref={copyRef}
        className="relative z-10 mx-auto max-w-[var(--zeon-container,1180px)] px-[var(--zeon-gutter,1.25rem)] pt-12 sm:pt-14 md:pt-20"
      >
        <div className="mx-auto max-w-[52rem] text-center">
          <motion.h1
            className="zeon-type-hero text-balance text-[#181D27]"
            initial={reduceMotion ? false : { opacity: 0, y: enterY }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: durationEnter, delay: 0.06, ease: easeOut }
            }
          >
            Build governed AI agents{" "}
            <span className="sm:inline">for the enterprise.</span>
          </motion.h1>

          <motion.p
            className="zeon-type-lead mx-auto mt-5 max-w-[48ch] text-[#535862] sm:mt-6"
            initial={reduceMotion ? false : { opacity: 0, y: enterY }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: durationEnter,
                    delay: 0.06 + staggerEnter,
                    ease: easeOut,
                  }
            }
          >
            AI Workspace answers from your repositories with citations and
            role checks. Agent Hub agents read, match, and route operational
            work — people approve what changes a record of value.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: enterY }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: durationEnter,
                    delay: 0.06 + staggerEnter * 2,
                    ease: easeOut,
                  }
            }
          >
            <motion.div
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: pressScale, transition: pressTransition }
              }
            >
              <ZeonLinkButton href="/demo" tone="accent" size="lg">
                Book a demo
              </ZeonLinkButton>
            </motion.div>
            <a href="#platform" className="zeon-link-arrow !text-[14px]">
              See the platform
            </a>
          </motion.div>
        </div>
      </div>

      <div
        ref={stageRef}
        className="relative z-10 w-full px-4 pb-10 pt-12 sm:pb-14 md:px-8 md:pb-16 md:pt-14"
      >
        <motion.div
          className="w-full"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: durationEnter,
                  delay: 0.06 + staggerEnter * 3,
                  ease: easeOut,
                }
          }
        >
          {/* Plain div is the GSAP GPU-scale target — keep Motion off this node */}
          <div
            ref={frameRef}
            className="mx-auto w-full max-w-[1680px] overflow-hidden will-change-transform"
          >
            <ProductVideo
              assetId="home-hero"
              tone="light"
              preferAutoplay
            />
            <p
              ref={captionRef}
              className="mt-3 text-center text-[12px] leading-[1.45] text-[#717680]"
            >
              Ask AI answering from governed documents — citations appear with
              the claim. Sample data.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
