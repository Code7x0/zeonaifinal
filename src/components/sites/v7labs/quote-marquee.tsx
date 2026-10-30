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
  {
    quote:
      "Answers are drawn only from the documents the person can already open, and each one cites its sources.",
    by: "Governed AI · AI Workspace",
  },
  {
    quote:
      "Access control and an audit log are part of the platform, not an add-on.",
    by: "Governance · ZeonAI",
  },
] as const;

export function QuoteMarquee() {
  const row = [...QUOTES, ...QUOTES];
  return (
    <section
      aria-label="Customer outcomes"
      className="overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-12 md:py-14"
    >
      <div className="v7-marquee flex w-max gap-4 px-4 md:gap-5">
        {row.map((item, i) => (
          <figure
            key={`${item.by}-${i}`}
            className="w-[min(540px,80vw)] shrink-0 border border-white/12 bg-[#111] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] md:p-7"
          >
            <blockquote className="font-[family-name:var(--font-aeonik)] text-[22px] leading-[1.25] tracking-[-0.02em] text-white md:text-[24px]">
              {item.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-white/10 pt-4 text-[12px] text-white/45">
              {item.by}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
