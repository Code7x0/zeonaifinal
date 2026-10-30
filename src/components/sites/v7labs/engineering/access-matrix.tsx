"use client";

import { useState } from "react";
import { EngChrome, EngPanel } from "./shared";
import { Z } from "./tokens";

const TIERS = [
  {
    id: "general",
    name: "General",
    see: "Everyone in the organisation",
    act: "The current holder",
    note: "Visible organisation-wide. Only the current holder can act.",
  },
  {
    id: "protected",
    name: "Protected",
    see: "Roles cleared for protected cases",
    act: "The current holder",
    note: "Limited to cleared roles. Action still stays with the holder.",
  },
  {
    id: "restricted",
    name: "Restricted",
    see: "One owner",
    act: "That owner only",
    note: "One owner only. Administrator override never reaches this tier.",
  },
] as const;

export function AccessMatrix() {
  const [active, setActive] = useState(0);
  const tier = TIERS[active] ?? TIERS[0];

  return (
    <EngPanel className="h-full min-h-[340px] lg:min-h-[400px]">
      <EngChrome title="ZeonAI · Access">
        <div className="flex h-full min-h-[300px] flex-col p-3 md:p-4">
          <div
            className="overflow-hidden rounded-lg border"
            style={{ borderColor: Z.line }}
            role="table"
            aria-label="Visibility tiers"
          >
            <div
              className="grid grid-cols-[7rem_1fr_1fr] gap-2 border-b px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] md:grid-cols-[8rem_1fr_1fr]"
              style={{ borderColor: Z.line, backgroundColor: Z.mist, color: Z.fog }}
              role="row"
            >
              <span role="columnheader">Tier</span>
              <span role="columnheader">Who can see it</span>
              <span role="columnheader">Who can act</span>
            </div>
            {TIERS.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="row"
                  onClick={() => setActive(i)}
                  className="grid w-full grid-cols-[7rem_1fr_1fr] gap-2 border-b px-3 py-2.5 text-left text-[12px] outline-none last:border-b-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0977B3]/45 md:grid-cols-[8rem_1fr_1fr]"
                  style={{
                    borderColor: Z.line,
                    backgroundColor: selected ? `${Z.blue}10` : Z.paper,
                  }}
                  aria-pressed={selected}
                >
                  <span
                    className="font-medium"
                    style={{ color: selected ? Z.blue : Z.ink }}
                    role="cell"
                  >
                    {t.name}
                  </span>
                  <span style={{ color: Z.ink70 }} role="cell">
                    {t.see}
                  </span>
                  <span style={{ color: Z.ink70 }} role="cell">
                    {t.act}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="mt-3 rounded-lg border p-3"
            style={{ borderColor: Z.line, backgroundColor: Z.mist }}
            aria-live="polite"
          >
            <p className="font-mono text-[10px]" style={{ color: Z.blue }}>
              {tier.name}
            </p>
            <p className="mt-1.5 text-[12px] leading-snug" style={{ color: Z.ink70 }}>
              {tier.note}
            </p>
            <p
              className="mt-3 border-t pt-2 text-[11px]"
              style={{ borderColor: Z.line, color: Z.ink70 }}
            >
              Administrator override: an explicit permission you grant — never
              available on restricted cases.
            </p>
          </div>
        </div>
      </EngChrome>
    </EngPanel>
  );
}
