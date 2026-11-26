"use client";

import { motion, useReducedMotion } from "motion/react";
import { BlackHoleEffect } from "@/components/ui/black-hole-vortex-animation";
import { durationEnter, easeOut, enterY } from "./motion";
import { ZeonLinkButton } from "./zeon-ui";

type ProductVortexHeroProps = {
  label: string;
  title: string;
  lead: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

/**
 * Premium dark product hero — vortex atmosphere behind ZeonAI copy and CTAs.
 */
export function ProductVortexHero({
  label,
  title,
  lead,
  primaryHref = "/demo",
  primaryLabel = "Book a demo",
  secondaryHref,
  secondaryLabel,
}: ProductVortexHeroProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <header className="relative isolate min-h-[min(88vh,820px)] overflow-hidden bg-[#05070C] text-white">
      <BlackHoleEffect
        density={88}
        particleClassName="text-[#C5D4F5]/70"
      />

      {/* Soft blue wash for brand depth without washing out the void */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_42%,rgba(41,98,255,0.16)_0%,transparent_62%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[min(88vh,820px)] max-w-[1180px] flex-col items-center justify-center px-5 py-24 text-center md:px-8 md:py-32">
        <motion.div
          className="flex w-full max-w-[42rem] flex-col items-center"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: durationEnter, ease: easeOut }
          }
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8EB8FF]">
            {label}
          </p>

          <h1
            className="zeon-type-hero mt-5 text-balance !text-white"
            style={{
              textShadow:
                "0 0 40px rgba(41,98,255,0.22), 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {title}
          </h1>

          <p className="mt-6 max-w-[40ch] text-[16px] leading-[1.6] text-white/65 md:text-[17px]">
            {lead}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ZeonLinkButton
              href={primaryHref}
              tone="accent"
              className="!rounded-[12px] !shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_12px_32px_rgba(41,98,255,0.42),0_2px_8px_rgba(0,0,0,0.45)]"
            >
              {primaryLabel}
            </ZeonLinkButton>
            {secondaryHref && secondaryLabel ? (
              <ZeonLinkButton
                href={secondaryHref}
                tone="ghost-dark"
                className="!rounded-[12px] !border-white/20 !bg-white/[0.04] !backdrop-blur-sm hover:!border-white/35 hover:!bg-white/[0.08]"
              >
                {secondaryLabel}
              </ZeonLinkButton>
            ) : null}
          </div>
        </motion.div>
      </div>
    </header>
  );
}
