"use client";

import { motion, useReducedMotion } from "motion/react";
import { GLSLHills } from "@/components/ui/glsl-hills";
import {
  durationEnter,
  easeOut,
  enterY,
  pressScale,
  pressTransition,
  staggerEnter,
} from "./motion";
import { ZeonLinkButton } from "./zeon-ui";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[calc(100svh-60px)] overflow-hidden bg-[var(--dp-gradient-hero,#EEF4FF)]">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(41,98,255,0.14), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 90%, rgba(97,114,243,0.10), transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #EEF4FF 48%, #FAFAFA 100%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
        {reduceMotion ? null : (
          <GLSLHills
            width="100%"
            height="100%"
            cameraZ={125}
            planeSize={256}
            speed={0.45}
            className="h-full w-full"
          />
        )}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-60px)] max-w-[1400px] flex-col items-center justify-center px-5 pb-20 pt-16 text-center md:px-8">
        <motion.h1
          className="font-[family-name:var(--font-aeonik)] text-[44px] leading-[1.02] tracking-[-0.03em] text-[#181D27] md:text-[60px] md:leading-[1.02] md:tracking-[-1.8px]"
          initial={reduceMotion ? false : { opacity: 0, y: enterY }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: durationEnter, delay: 0.06, ease: easeOut }
          }
        >
          The governed AI platform
          <br />
          for enterprise knowledge and workflows.
        </motion.h1>

        <motion.p
          className="mt-7 max-w-[48ch] text-[17px] leading-[1.55] text-[#535862] md:text-[18px]"
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
          AI Workspace answers from your documents and{" "}
          <strong className="font-medium text-[#181D27]">cites every source</strong>.
          Agents read, check and route paperwork; people approve what matters.
          Access control and an audit log are built in.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
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
    </section>
  );
}
