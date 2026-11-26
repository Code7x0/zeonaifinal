"use client";

import { useReducedMotion } from "motion/react";

type Brand = {
  src: string;
  alt: string;
};

const BRANDS: readonly Brand[] = [
  { src: "/sites/zeonai/brands/mcl.png", alt: "MCL" },
  { src: "/sites/zeonai/brands/aidea-labs-color.png", alt: "aiDea LABS" },
  { src: "/sites/zeonai/brands/latrobe-financial.svg", alt: "La Trobe Financial" },
  { src: "/sites/zeonai/brands/quantum-lending.png", alt: "Quantum" },
  { src: "/sites/zeonai/brands/fujitsu.svg", alt: "Fujitsu" },
  { src: "/sites/zeonai/brands/indian-air-force.png", alt: "Indian Air Force" },
  { src: "/sites/zeonai/brands/nasfund.png", alt: "Nasfund" },
  { src: "/sites/zeonai/brands/telikom.png", alt: "Telikom" },
  { src: "/sites/zeonai/brands/nuvola-color.png", alt: "Nuvola" },
  { src: "/sites/zeonai/brands/paladin-energy.png", alt: "Paladin Energy" },
  { src: "/sites/zeonai/brands/hl-landscape.png", alt: "HL Landscape" },
  { src: "/sites/zeonai/brands/color/hindalco.svg", alt: "Hindalco" },
  { src: "/sites/zeonai/brands/brisbane-city-council.png", alt: "Brisbane City Council" },
  { src: "/sites/zeonai/brands/news-corp.png", alt: "News Corp" },
  { src: "/sites/zeonai/brands/ncdc.png", alt: "National Capital District Commission" },
  { src: "/sites/zeonai/brands/prime-ministers-office.png", alt: "Prime Minister's Office PNG" },
  { src: "/sites/zeonai/brands/mymedia.png", alt: "MyMedia" },
  { src: "/sites/zeonai/brands/orthocell.png", alt: "Orthocell" },
];

/**
 * Every logo item shares identical container dimensions and shared max bounds,
 * preserving intrinsic aspect ratio with object-contain and uniform center alignment.
 */
function BrandCell({ brand }: { brand: Brand }) {
  return (
    <div className="flex h-14 w-auto shrink-0 items-center justify-center md:h-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={brand.src}
        alt={brand.alt}
        loading="eager"
        draggable={false}
        className="h-auto !max-h-9 w-auto !max-w-[116px] object-contain opacity-85 mix-blend-multiply md:!max-h-10 md:!max-w-[132px]"
      />
    </div>
  );
}

export function LogoTicker() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="zeon-section-surface overflow-hidden border-y border-[var(--dp-gray-200,#E9EAEB)] py-12 md:py-14"
      aria-label="Organizations we work with"
    >
      <div className="px-4 sm:px-6 md:px-[var(--zeon-gutter,1.25rem)]">
        <div className="mx-auto max-w-[1180px] text-left">
          <p className="text-[13px] font-medium tracking-[0.04em] text-[var(--dp-gray-500,#717680)] md:text-[14px]">
            Our clients
          </p>
        </div>
      </div>

      <div className="group/marquee relative mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#FAFAFA] to-transparent md:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#FAFAFA] to-transparent md:w-16" />

        {reduceMotion ? (
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 md:gap-x-14">
            {BRANDS.map((brand) => (
              <BrandCell key={brand.alt} brand={brand} />
            ))}
          </div>
        ) : (
          /* Two identical sub-tracks with a single controlled gap ensure -50% loops seamlessly. */
          <div className="v7-marquee flex w-max items-center motion-safe:group-hover/marquee:[animation-play-state:paused] motion-safe:group-focus-within/marquee:[animation-play-state:paused]">
            <div className="flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14">
              {BRANDS.map((brand) => (
                <BrandCell key={`a-${brand.alt}`} brand={brand} />
              ))}
            </div>
            <div
              className="flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14"
              aria-hidden
            >
              {BRANDS.map((brand) => (
                <BrandCell key={`b-${brand.alt}`} brand={brand} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
