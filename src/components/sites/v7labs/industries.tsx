"use client";

import Link from "next/link";
import { industries } from "@/components/sites/zeonai/content";
import { FadeUp } from "./fade-up";

export function Industries() {
  const [featured, ...rest] = industries;

  return (
    <section id="industries" className="bg-white px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1336px]">
        <FadeUp
          as="h2"
          className="max-w-[720px] font-[family-name:var(--font-aeonik)] text-[36px] leading-[1.05] tracking-[-0.02em] text-[#111318] md:text-[48px]"
        >
          Built for regulated, document-heavy sectors
        </FadeUp>
        <FadeUp
          delay={0.06}
          as="p"
          className="mt-4 max-w-[48ch] text-[16px] leading-[1.55] text-black/60"
        >
          The same platform, with agents built for each sector. Examples from
          our agent portfolio.
        </FadeUp>

        {featured ? (
          <article className="relative mt-12 flex flex-col overflow-hidden border border-[#1D4ED8]/40 bg-[image:var(--zeon-gradient-royal)] p-7 text-white shadow-[0_24px_48px_-28px_rgba(29,78,216,0.55)] md:flex-row md:items-end md:justify-between md:gap-10 md:p-9">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 70% 80% at 100% 0%, rgba(255,255,255,0.18), transparent 55%)",
              }}
              aria-hidden
            />
            <div className="relative max-w-[40rem]">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                Featured
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[26px] font-normal tracking-[-0.02em] text-white md:text-[32px]">
                {featured.label}
              </h3>
              <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.5] text-white/75 md:text-[16px]">
                {featured.intro}
              </p>
              <p className="mt-5 text-[14px] leading-[1.5] text-white/55">
                {featured.useCases[0]?.title}
                {featured.useCases[1] ? ` · ${featured.useCases[1].title}` : ""}
              </p>
            </div>
            <Link
              href={`/industries/${featured.id}`}
              className="zeon-link-arrow relative mt-8 shrink-0 !text-[13px] !text-white md:mt-0"
            >
              Explore {featured.label.split(" ")[0]?.toLowerCase() ?? "industry"}
            </Link>
          </article>
        ) : null}

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <article
              key={item.id}
              className="flex min-h-[240px] flex-col border border-[#DCE1E0] bg-white p-6 md:p-7"
            >
              <h3 className="font-[family-name:var(--font-aeonik)] text-[20px] font-normal tracking-[-0.02em] text-black md:text-[22px]">
                {item.label}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.45] text-black/65">
                {item.intro}
              </p>
              <p className="mt-5 text-[13px] leading-[1.45] text-black/45">
                {item.useCases[0]?.title}
              </p>
              <Link
                href={`/industries/${item.id}`}
                className="zeon-link-arrow mt-auto pt-8 !text-[12px] !text-black"
              >
                Explore {item.label.split(" ")[0]?.toLowerCase() ?? "industry"}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/industries" className="zeon-link-arrow">
            See all industries
          </Link>
        </div>
      </div>
    </section>
  );
}
