"use client";

import { useReducedMotion } from "motion/react";

/* Outcomes from ZeonAI brief case studies — confirm before public launch */
const QUOTES = [
  {
    quote:
      "70%+ reduction in manual effort on loan application forms. Processing time fell by 70%, so loan approvals arrive sooner.",
    by: "Lending · Australian credit asset management firm",
  },
  {
    quote:
      "80% reduction in manual processing of partner billing. Partners are paid 60% faster, with 99%+ accuracy.",
    by: "Lending · Lending bank in the US",
  },
  {
    quote:
      "80–85% reduction in daily receipting time. Staff review only the exceptions, with human review keeping compliance in place.",
    by: "Superannuation and finance · Leading superannuation fund",
  },
  {
    quote:
      "20–28% lower operating cost. Error rates fell from 20% to under 1%. The same team serves 5x more customers.",
    by: "Media · Leading Australian media agency",
  },
] as const;

function QuoteCard({
  item,
}: {
  item: (typeof QUOTES)[number];
}) {
  return (
    <figure className="w-[min(520px,80vw)] shrink-0 border border-white/10 bg-[#111] p-6 md:p-7">
      <blockquote className="font-[family-name:var(--font-aeonik)] text-[20px] leading-[1.3] tracking-[-0.02em] text-white md:text-[22px]">
        {item.quote}
      </blockquote>
      <figcaption className="mt-5 border-t border-white/10 pt-4 text-[12px] text-white/45">
        {item.by}
      </figcaption>
    </figure>
  );
}

export function QuoteMarquee() {
  const reduceMotion = useReducedMotion();
  const row = [...QUOTES, ...QUOTES];

  return (
    <section
      aria-label="Customer outcomes"
      className="overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-12 md:py-14"
    >
      <div className="mx-auto mb-6 max-w-[1180px] px-5 md:px-8">
        <p className="text-[12px] leading-[1.45] text-white/40">
          Outcomes from selected deployments. Figures to confirm before public
          launch.
        </p>
      </div>

      {reduceMotion ? (
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 md:flex-row md:overflow-x-auto md:px-8">
          {QUOTES.map((item) => (
            <QuoteCard key={item.by} item={item} />
          ))}
        </div>
      ) : (
        <div className="group/quotes">
          <div className="v7-marquee v7-marquee-slow flex w-max gap-4 px-4 md:gap-5 motion-safe:group-hover/quotes:[animation-play-state:paused] motion-safe:group-focus-within/quotes:[animation-play-state:paused]">
            {row.map((item, i) => (
              <QuoteCard key={`${item.by}-${i}`} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
