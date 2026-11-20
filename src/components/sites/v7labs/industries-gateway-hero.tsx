"use client";

import { useReducedMotion } from "motion/react";
import GatewayFlow from "@/components/ui/gateway-flow";
import { industries } from "@/components/sites/zeonai/content";
import { ZeonLinkButton } from "./zeon-ui";

type IndustriesGatewayHeroProps = {
  label: string;
  title: string;
  lead: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

/**
 * Industries index hero — Gateway Flow field + Heron/Trust open type layout.
 */
export function IndustriesGatewayHero({
  label,
  title,
  lead,
  primaryHref = "/demo",
  primaryLabel = "Book a demo",
  secondaryHref,
  secondaryLabel,
}: IndustriesGatewayHeroProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <header className="relative isolate min-h-[min(72vh,720px)] overflow-hidden border-b border-white/10 bg-[#05070C] text-white">
      <div className="absolute inset-0 z-0" aria-hidden>
        {reduceMotion ? (
          <div className="h-full w-full bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(41,98,255,0.22)_0%,#05070C_70%)]" />
        ) : (
          <GatewayFlow
            className="h-full w-full"
            mode="dark"
            density={0.85}
            speed={0.85}
            opacity={0.72}
            hue={210}
            saturation={1.35}
            brightness={1.05}
          />
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_55%_at_50%_42%,rgba(41,98,255,0.18)_0%,transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#05070C]/25 via-transparent to-[#05070C]/85"
      />

      <div className="relative z-10 mx-auto grid min-h-[min(72vh,720px)] w-full max-w-[1180px] items-end gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#8EB8FF]">
            {label}
          </p>
          <h1 className="mt-4 max-w-[13ch] font-[family-name:var(--font-aeonik)] text-[clamp(2.4rem,1.5rem+3.2vw,3.75rem)] leading-[1.02] tracking-[-0.045em] text-white">
            {title}
          </h1>
          <p className="mt-5 max-w-[42ch] text-[16px] leading-[1.6] text-white/65">
            {lead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ZeonLinkButton href={primaryHref} tone="light" size="lg">
              {primaryLabel}
            </ZeonLinkButton>
            {secondaryHref && secondaryLabel ? (
              <ZeonLinkButton href={secondaryHref} tone="ghost-dark" size="lg">
                {secondaryLabel}
              </ZeonLinkButton>
            ) : null}
          </div>
        </div>

        <div className="relative border border-white/12 bg-[#0B0B0B]/55 backdrop-blur-sm">
          <span aria-hidden className="pointer-events-none absolute inset-0">
            <i className="absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-white/40" />
            <i className="absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-white/40" />
            <i className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-white/40" />
            <i className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-white/40" />
          </span>
          <dl className="px-5 py-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 md:px-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <dt>DWG</dt>
              <dd className="text-white/70">ZEON-IND-00</dd>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 py-3">
              <dt>Sectors</dt>
              <dd className="text-white/70">{industries.length}</dd>
            </div>
            <div className="flex items-center justify-between pt-3">
              <dt>Sheet</dt>
              <dd className="text-white/70">Industries / 01</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  );
}
