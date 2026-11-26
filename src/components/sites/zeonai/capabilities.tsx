"use client";

import { useState } from "react";
import { agentCategories, capabilities } from "./content";

export function Capabilities() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-[var(--zeon-line)] bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--zeon-royal)]">
          02 · Capabilities
        </p>
        <h2 className="mt-3 max-w-[18ch] text-[36px] leading-[1.08] tracking-[-0.035em] text-[var(--zeon-ink)] md:text-[52px]">
          How ZeonAI is shaping decisions across the enterprise
        </h2>
        <p className="mt-5 max-w-[48ch] text-[17px] leading-[1.55] text-[var(--zeon-ink70)] md:text-[18px]">
          One platform, every business process, and one place to enhance them.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`rounded-2xl border p-5 text-left transition-all duration-200 ${
                active === i
                  ? "border-[var(--zeon-royal)] bg-white text-[var(--zeon-ink)] shadow-[var(--zeon-elev-1)] ring-1 ring-[var(--zeon-royal)]/20"
                  : "border-[var(--zeon-line)] bg-[var(--zeon-mist)]/40 text-[var(--zeon-ink)] hover:border-[var(--zeon-royal)]/40 hover:bg-white"
              }`}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              <p className="text-[16px] tracking-[-0.02em]">{item.title}</p>
              <p
                className={`mt-2 text-[13px] leading-[1.45] ${
                  active === i ? "text-[var(--zeon-muted)]" : "text-[var(--zeon-ink70)]"
                }`}
              >
                {item.summary}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-[var(--zeon-line)] bg-white p-6 shadow-[var(--zeon-elev-1)] md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-[22px] tracking-[-0.02em] text-[var(--zeon-ink)]">
                Agent portfolio
              </h3>
              <p className="mt-2 text-[14px] text-[var(--zeon-ink70)]">
                50+ agents in our portfolio
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {agentCategories.map((cat) => (
              <div key={cat.title}>
                <p className="text-[13px] font-medium text-[var(--zeon-ink)]">
                  {cat.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {cat.agents.map((agent) => (
                    <li
                      key={agent.name}
                      className="border-t border-[var(--zeon-line)] pt-2 text-[13px] text-[var(--zeon-ink70)]"
                    >
                      {agent.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
