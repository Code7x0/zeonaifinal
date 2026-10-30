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
    <section className="relative isolate min-h-[calc(100svh-60px)] overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
        <GLSLHills
          width="100%"
          height="100%"
          cameraZ={125}
          planeSize={256}
          speed={0.45}
          className="h-full w-full"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-60px)] max-w-[1400px] flex-col items-center justify-center px-5 pb-20 pt-16 text-center md:px-8">
        <motion.h1
          className="font-[family-name:var(--font-aeonik)] text-[44px] leading-[1.02] tracking-[-0.03em] text-[#292929] md:text-[60px] md:leading-[1.02] md:tracking-[-1.8px]"
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
          className="mt-7 max-w-[560px] text-[16px] leading-[1.5] text-black md:text-[18px]"
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
          AI Workspace answers questions from your own documents and{" "}
          <strong className="font-medium">cites every source</strong>. Its
          agents read, check and route the paperwork behind a process, from the
          inbox to your ERP, and people approve what matters.{" "}
          <strong className="font-medium">Access control and an audit log</strong>{" "}
          are part of the platform, not an add-on.
        </motion.p>

        <motion.div
          className="mt-10"
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
          whileTap={
            reduceMotion
              ? undefined
              : { scale: pressScale, transition: pressTransition }
          }
        >
          <ZeonLinkButton href="/demo" tone="soft" size="lg">
            Book a demo
          </ZeonLinkButton>
        </motion.div>
      </div>
    </section>
  );
}
