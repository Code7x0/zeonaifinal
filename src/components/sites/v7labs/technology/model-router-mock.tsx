"use client";

import { useState } from "react";
import { MockWindow } from "./mock-window";

const ROUTES = {
  cloud: {
    note: "3 tiers · chosen per step",
    rows: [
      ["Plan the pack", "Reasoning", "r"],
      ["Extract 240 invoices", "Fast · parallel", "f"],
      ["Classify exceptions", "Small", "s"],
      ["Write the summary", "Reasoning", "r"],
    ],
  },
  one: {
    note: "1 approved model · via your gateway",
    rows: [
      ["Plan the pack", "Approved model", "r"],
      ["Extract 240 invoices", "Approved model · parallel", "r"],
      ["Classify exceptions", "Approved model", "r"],
      ["Write the summary", "Approved model", "r"],
    ],
  },
  air: {
    note: "Open-weight · on your GPUs",
    rows: [
      ["Plan the pack", "Local · large", "r"],
      ["Extract 240 invoices", "Local · large · parallel", "r"],
      ["Classify exceptions", "Local · small", "s"],
      ["Write the summary", "Local · large", "r"],
    ],
  },
} as const;

type Policy = keyof typeof ROUTES;

const POLICIES: { id: Policy; label: string }[] = [
  { id: "cloud", label: "Cloud policy" },
  { id: "one", label: "Single approved model" },
  { id: "air", label: "Air-gapped" },
];

export function ModelRouterMock() {
  const [policy, setPolicy] = useState<Policy>("cloud");
  const route = ROUTES[policy];

  return (
    <MockWindow title="Routing · month-end pack">
      <div className="seg" role="tablist" aria-label="Routing policy">
        {POLICIES.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={policy === p.id}
            className={policy === p.id ? "on" : undefined}
            onClick={() => setPolicy(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div>
        {route.rows.map((row, i) => (
          <div className="row" key={row[0]}>
            <span className="num">0{i + 1}</span>
            <span className="grow">{row[0]}</span>
            <span className={`tier ${row[2]}`}>{row[1]}</span>
          </div>
        ))}
      </div>
      <div className="foot">
        <span>{route.note}</span>
        <span className="pill ok">Within policy</span>
      </div>
    </MockWindow>
  );
}
