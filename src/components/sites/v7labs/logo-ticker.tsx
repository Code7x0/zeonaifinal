"use client";

import Image from "next/image";
import { FadeUp } from "./fade-up";

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

  if (isSvg) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={brand.src}
        alt={brand.alt}
        className="max-h-[48px] w-auto max-w-[140px] object-contain"
      />
    );
  }

  return (
    <Image
      src={brand.src}
      alt={brand.alt}
      width={brand.width}
      height={brand.height}
      className="max-h-[48px] w-auto max-w-[140px] object-contain"
    />
  );
}

export function LogoTicker() {
  const row = [...BRANDS, ...BRANDS];

  return (
    <section className="overflow-hidden border-y border-black/5 bg-white py-14 md:py-16">
      <div className="mx-auto max-w-[1200px] px-5 text-center md:px-8">
        <FadeUp
          as="h2"
          className="text-[22px] font-medium tracking-[-0.02em] text-[#1a1a1a] md:text-[28px]"
        >
          Trusted by Leading Organizations Worldwide
        </FadeUp>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />
        <div className="v7-marquee flex w-max items-center gap-4 px-4 md:gap-5">
          {row.map((brand, i) => (
            <div
              key={`${brand.alt}-${i}`}
              className="flex h-[80px] w-[160px] shrink-0 items-center justify-center bg-white px-4 md:h-[88px] md:w-[172px]"
            >
              <BrandMark brand={brand} />
            </div>
          ))}
        </div>
      </div>

      <FadeUp
        as="p"
        delay={0.08}
        className="mt-12 text-center text-[22px] font-medium tracking-[-0.02em] text-[#1a1a1a] md:text-[28px]"
      >
        Faster, Easier, Accurate and Efficient
      </FadeUp>
    </section>
  );
}
