"use client";

import Link from "next/link";
import { industries } from "@/components/sites/zeonai/content";
import { FadeUp } from "./fade-up";
import { staggerDelay } from "./motion";

export function Industries() {
  return (
    <section id="industries" className="bg-white px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1336px]">
        <FadeUp
          as="h2"
          className="max-w-[720px] font-[family-name:var(--font-aeonik)] text-[36px] leading-[1.05] tracking-[-0.02em] text-[#292929] md:text-[48px]"
        >
          Built for regulated, document-heavy sectors
        </FadeUp>
        <FadeUp
          delay={0.08}
          as="p"
          className="mt-4 max-w-[48ch] text-[16px] leading-[1.55] text-black/60"
        >
          The same platform, with agents built for each sector. Examples from
          our agent portfolio.
        </FadeUp>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((item, i) => (
            <FadeUp
              key={item.id}
              as="article"
              delay={staggerDelay(i, 0.06, 0.08)}
              className="zeon-surface flex min-h-[300px] flex-col !rounded-[18px] bg-white/90 p-6 shadow-[var(--zeon-shadow-soft)] backdrop-blur-sm md:p-7"
            >
              <h3 className="font-[family-name:var(--font-aeonik)] text-[22px] font-normal tracking-[-0.02em] text-black md:text-[24px]">
                {item.label}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.45] text-black/70">
                {item.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.useCases.slice(0, 3).map((uc) => (
                  <span
                    key={uc.title}
                    className="rounded-full bg-[#f3f3f3] px-3 py-1.5 text-[12px] text-black/75"
                  >
                    {uc.title}
                  </span>
                ))}
              </div>
              <Link
                href={`/industries/${item.id}`}
                className="zeon-link-arrow mt-auto pt-8 !text-[12px] !text-black"
              >
                Explore {item.label.split(" ")[0]?.toLowerCase() ?? "industry"}
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="mt-10">
          <Link href="/industries" className="zeon-link-arrow">
            See all industries
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
