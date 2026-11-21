"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import {
  durationEnter,
  easeOut,
  enterY,
  pressScale,
  pressTransition,
  staggerEnter,
} from "./motion";
import { SectionMeta } from "./blueprint";
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
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[var(--dp-gradient-hero,#EEF4FF)]">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(41,98,255,0.14), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 90%, rgba(97,114,243,0.10), transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #EEF4FF 48%, #FAFAFA 100%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-50 max-md:hidden">
        {/* Skip WebGL hills on small / touch screens — major mobile cost */}
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

      <div className="relative z-10 mx-auto flex max-w-[var(--zeon-container,1180px)] flex-col px-[var(--zeon-gutter,1.25rem)] pb-12 pt-12 sm:pb-16 sm:pt-14 md:pb-24 md:pt-20">
        <div className="mx-auto max-w-[52rem] text-center">
          <motion.div
            className="flex justify-center"
            initial={reduceMotion ? false : { opacity: 0, y: enterY }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: durationEnter, delay: 0.02, ease: easeOut }
            }
          >
            <SectionMeta
              left="ZeonAI"
              right="Sheet · Home"
              align="center"
              className="!mb-0"
            />
          </motion.div>

          <motion.h1
            className="zeon-type-hero mt-4 text-balance text-[#181D27]"
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

        <motion.div
          className="mx-auto mt-12 w-full max-w-[920px] md:mt-14"
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
          <ProductVideo assetId="home-hero" tone="light" tilt preferAutoplay />
          <p className="mt-3 text-center text-[12px] leading-[1.45] text-[#717680]">
            Ask AI answering from governed documents — citations appear with the
            claim. Sample data.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
