"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";

type Brand = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const BRANDS: Brand[] = [
  { src: "/sites/zeonai/brands/mcl-color.png", alt: "MCL", width: 220, height: 68 },
  {
    src: "/sites/zeonai/brands/aidea-labs-color.png",
    alt: "aiDea LABS",
    width: 220,
    height: 58,
  },
  {
    src: "/sites/zeonai/brands/latrobe-financial.svg",
    alt: "La Trobe Financial",
    width: 200,
    height: 48,
  },
  {
    src: "/sites/zeonai/brands/quantum-lending.svg",
    alt: "Quantum Lending Solutions",
    width: 200,
    height: 84,
  },
  {
    src: "/sites/zeonai/brands/fujitsu.svg",
    alt: "Fujitsu",
    width: 200,
    height: 46,
  },
  {
    src: "/sites/zeonai/brands/indian-air-force.png",
    alt: "Indian Air Force",
    width: 96,
    height: 96,
  },
  {
    src: "/sites/zeonai/brands/nuvola-color.png",
    alt: "Nuvola",
    width: 200,
    height: 46,
  },
  {
    src: "/sites/zeonai/brands/ergonomics.svg",
    alt: "ergonomics",
    width: 180,
    height: 44,
  },
  {
    src: "/sites/zeonai/brands/hindalco.png",
    alt: "Aditya Birla Hindalco",
    width: 96,
    height: 96,
  },
  {
    src: "/sites/zeonai/brands/ncdc.png",
    alt: "National Capital District Commission",
    width: 220,
    height: 70,
  },
];

function BrandMark({ brand }: { brand: Brand }) {
  const isSvg = brand.src.endsWith(".svg");
  const markClass =
    "max-h-[36px] w-auto max-w-[120px] object-contain opacity-80 md:max-h-[40px] md:max-w-[132px]";

  if (isSvg) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={brand.src} alt={brand.alt} className={markClass} />
    );
  }

  return (
    <Image
      src={brand.src}
      alt={brand.alt}
      width={brand.width}
      height={brand.height}
      className={markClass}
    />
  );
}

function BrandCell({ brand }: { brand: Brand }) {
  return (
    <div className="flex h-[64px] w-[148px] shrink-0 items-center justify-center px-3 md:h-[72px] md:w-[160px]">
      <BrandMark brand={brand} />
    </div>
  );
}

export function LogoTicker() {
  const reduceMotion = useReducedMotion();
  const row = [...BRANDS, ...BRANDS];

  return (
    <section
      className="overflow-hidden border-y border-black/5 bg-white py-12 md:py-14"
      aria-label="Organizations we work with"
    >
      <div className="mx-auto max-w-[1200px] px-5 text-center md:px-8">
        <p className="text-[13px] font-medium tracking-[0.04em] text-black/45 md:text-[14px]">
          Selected organizations we work with
        </p>
      </div>

      <div className="relative mt-8 group/marquee">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />

        {reduceMotion ? (
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4">
            {BRANDS.map((brand) => (
              <BrandCell key={brand.alt} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="v7-marquee flex w-max items-center gap-2 px-4 md:gap-3 motion-safe:group-hover/marquee:[animation-play-state:paused] motion-safe:group-focus-within/marquee:[animation-play-state:paused]">
            {row.map((brand, i) => (
              <BrandCell key={`${brand.alt}-${i}`} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
