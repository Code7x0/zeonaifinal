import { ZeonBrandBanner } from "./logo";
import { hero } from "./content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--zeon-ink)] text-white">
      <div
        className="zeon-gradient-bar pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-24 size-[420px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(9,119,179,0.55), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-10 size-[320px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(225,102,28,0.45), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1200px] gap-12 px-5 pb-16 pt-28 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-10 md:px-8 md:pb-24 md:pt-36">
        <div>
          <ZeonBrandBanner className="mb-8" />
          <p className="mb-5 font-mono text-[12px] uppercase tracking-[0.2em] text-white/45">
            {hero.eyebrow}
          </p>
          <h1 className="max-w-[16ch] text-[44px] font-normal leading-[1.02] tracking-[-0.04em] text-white md:text-[68px]">
            {hero.headline}
          </h1>
          <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.55] text-white/72 md:text-[19px]">
            {hero.body}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[15px] font-medium !text-[var(--zeon-ink)] no-underline"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-[15px] text-white no-underline"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
              AI Workspace · sample
            </p>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/70">
              Ask AI
            </span>
          </div>
          <div className="rounded-xl border border-white/10 bg-[var(--zeon-ink)] p-4">
            <p className="text-[12px] text-white/45">Question</p>
            <p className="mt-2 text-[15px] leading-[1.45] text-white/90">
              What approval do I need for capital spend above budget?
            </p>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                Finance manager · cited answer
              </p>
              <p className="mt-2 text-[14px] leading-[1.5] text-white/75">
                Spend above the approved budget needs CFO sign-off once it
                passes the delegated limit. Raise a variation request in
                Workflows and attach the revised business case.
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <p className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white/65">
                Capital expenditure policy v4.pdf · AI Drive
              </p>
              <p className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white/65">
                Delegation of authority.docx · AI Drive
              </p>
              <p className="text-[12px] text-[var(--zeon-ember)]">
                2 matching documents not shown: outside your access
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
