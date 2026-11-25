"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Brand = {
  src: string;
  alt: string;
  /** Small per-logo optical-balance box override while keeping every marquee slot identical. */
  boxClass?: string;
};

/**
 * Client marks for the homepage marquee ticker.
 * New Client Logos pack preferred when it replaces an older asset (MCL,
 * Quantum, La Trobe, IAF, Hindalco). Prior marks without a replacement
 * (aiDea, Fujitsu, Nuvola, ergonomics, NCDC) are kept.
 */
const BRANDS: Brand[] = [
  { src: "/sites/zeonai/brands/mcl.png", alt: "MCL" },
  {
    src: "/sites/zeonai/brands/aidea-labs-color.png",
    alt: "aiDea LABS",
    boxClass: "h-7 w-[124px] md:h-8 md:w-[136px]",
  },
  {
    src: "/sites/zeonai/brands/latrobe-financial.jpg",
    alt: "La Trobe Financial",
  },
  { src: "/sites/zeonai/brands/quantum.png", alt: "Quantum" },
  { src: "/sites/zeonai/brands/fujitsu.svg", alt: "Fujitsu" },
  {
    src: "/sites/zeonai/brands/indian-air-force.png",
    alt: "Indian Air Force",
    boxClass: "h-11 w-[84px] md:h-12 md:w-[96px]",
  },
  { src: "/sites/zeonai/brands/nasfund.png", alt: "Nasfund" },
  { src: "/sites/zeonai/brands/telikom.png", alt: "Telikom" },
  {
    src: "/sites/zeonai/brands/nuvola-color.png",
    alt: "Nuvola",
    boxClass: "h-7 w-[124px] md:h-8 md:w-[136px]",
  },
  {
    src: "/sites/zeonai/brands/paladin-energy.png",
    alt: "Paladin Energy",
    boxClass: "h-11 w-[84px] md:h-12 md:w-[96px]",
  },
  { src: "/sites/zeonai/brands/hl-landscape.png", alt: "HL Landscape" },
  { src: "/sites/zeonai/brands/ergonomics.svg", alt: "ergonomics" },
  {
    src: "/sites/zeonai/brands/hindalco.jpeg",
    alt: "Hindalco",
    boxClass: "h-10 w-[104px] md:h-11 md:w-[116px]",
  },
  {
    src: "/sites/zeonai/brands/brisbane-city-council.png",
    alt: "Brisbane City Council",
  },
  {
    src: "/sites/zeonai/brands/news-corp.png",
    alt: "News Corp",
    boxClass: "h-7 w-[124px] md:h-8 md:w-[136px]",
  },
  {
    src: "/sites/zeonai/brands/ncdc.png",
    alt: "National Capital District Commission",
  },
  {
    src: "/sites/zeonai/brands/prime-ministers-office.png",
    alt: "Prime Minister's Office PNG",
    boxClass: "h-11 w-[92px] md:h-12 md:w-[104px]",
  },
  { src: "/sites/zeonai/brands/mymedia.png", alt: "MyMedia" },
  { src: "/sites/zeonai/brands/orthocell.png", alt: "Orthocell" },
];

/** Equal-width, equal-height marquee slot so spacing is uniform regardless of intrinsic logo width. */
const CELL_CLASS =
  "flex h-[68px] w-[156px] shrink-0 items-center justify-center px-2 md:h-[76px] md:w-[172px]";
const DEFAULT_MARK_CLASS =
  "relative h-9 w-[120px] md:h-10 md:w-[132px]";

function BrandMark({ brand }: { brand: Brand }) {
  const isSvg = brand.src.endsWith(".svg");
  const imgClass =
    "h-full w-full object-contain object-center opacity-80";

  return (
    <span
      className={cn(
        "relative block max-w-full",
        brand.boxClass ?? DEFAULT_MARK_CLASS,
      )}
    >
      {isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element -- SVG wordmarks stay crisp without the image optimizer
        <img src={brand.src} alt={brand.alt} className={imgClass} />
      ) : (
        <Image
          src={brand.src}
          alt={brand.alt}
          fill
          sizes="(max-width: 768px) 124px, 136px"
          loading="eager"
          className={imgClass}
        />
      )}
    </span>
  );
}

function BrandCell({ brand }: { brand: Brand }) {
  return (
    <div className={CELL_CLASS}>
      <BrandMark brand={brand} />
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
      <div className="mx-auto max-w-[1200px] px-5 text-center md:px-8">
        <p className="text-[13px] font-medium tracking-[0.04em] text-[var(--dp-gray-500,#717680)] md:text-[14px]">
          Our clients
        </p>
      </div>

      <div className="relative mt-8 group/marquee">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FAFAFA] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#FAFAFA] to-transparent md:w-28" />

        {reduceMotion ? (
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-x-2 gap-y-2 px-4 md:gap-x-3">
            {BRANDS.map((brand) => (
              <BrandCell key={brand.alt} brand={brand} />
            ))}
          </div>
        ) : (
          /* Two identical sub-tracks with matching trailing gap ensure -50% loops seamlessly with zero jump. */
          <div className="v7-marquee flex w-max items-center motion-safe:group-hover/marquee:[animation-play-state:paused] motion-safe:group-focus-within/marquee:[animation-play-state:paused]">
            <div className="flex shrink-0 items-center gap-3 pr-3 md:gap-4 md:pr-4">
              {BRANDS.map((brand) => (
                <BrandCell key={`a-${brand.alt}`} brand={brand} />
              ))}
            </div>
            <div
              className="flex shrink-0 items-center gap-3 pr-3 md:gap-4 md:pr-4"
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
