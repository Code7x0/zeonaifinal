"use client";

import { useState } from "react";
import { industries } from "./content";

export function Industries() {
  const [active, setActive] = useState(0);
  const item = industries[active];

  return (
    <section
      id="industries"
      className="border-t border-[var(--zeon-line)] bg-[var(--zeon-paper)] px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--zeon-fog)]">
          04 · Industries
        </p>
        <h2 className="mt-3 max-w-[18ch] text-[36px] leading-[1.08] tracking-[-0.035em] text-[var(--zeon-ink)] md:text-[52px]">
          Built for regulated, document-heavy sectors
        </h2>
        <p className="mt-5 max-w-[48ch] text-[17px] leading-[1.55] text-[var(--zeon-ink70)] md:text-[18px]">
          The same platform, with agents built for each sector. Examples from
          our agent portfolio.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {industries.map((ind, i) => (
              <button
                key={ind.id}
                type="button"
                className={`shrink-0 rounded-xl border px-4 py-3 text-left text-[13px] ${
                  active === i
                    ? "border-[var(--zeon-ink)] bg-[var(--zeon-ink)] text-white"
                    : "border-[var(--zeon-line)] bg-white text-[var(--zeon-ink70)]"
                }`}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                {ind.label}
              </button>
            ))}
          </div>

          <article className="rounded-2xl border border-[var(--zeon-line)] bg-[var(--zeon-mist)]/40 p-6 md:p-8">
            <p className="text-[15px] leading-[1.55] text-[var(--zeon-ink70)]">
              {item.intro}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.process.map((step) => (
                <span
                  key={step}
                  className="rounded-full bg-white px-3 py-1.5 text-[12px] text-[var(--zeon-ink)] ring-1 ring-[var(--zeon-line)]"
                >
                  {step}
                </span>
              ))}
            </div>
            <p className="mt-4 font-mono text-[11px] text-[var(--zeon-fog)]">
              {item.platform}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {item.useCases.map((uc) => (
                <div
                  key={uc.title}
                  className="rounded-xl border border-[var(--zeon-line)] bg-white p-4"
                >
                  <h3 className="text-[15px] tracking-[-0.01em] text-[var(--zeon-ink)]">
                    {uc.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.45] text-[var(--zeon-ink70)]">
                    {uc.body}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
