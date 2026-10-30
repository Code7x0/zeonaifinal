"use client";

import { useState } from "react";
import { EngChrome, EngPanel } from "./shared";
import { Z } from "./tokens";

const STATES = [
  { id: "open", label: "Open" },
  { id: "sent_back", label: "Sent back" },
  { id: "resubmitted", label: "Resubmitted" },
  { id: "completed", label: "Completed" },
] as const;

export function DelegationCase() {
  const [stateIdx, setStateIdx] = useState(0);
  const state = STATES[stateIdx] ?? STATES[0];
  const canClose = state.id === "completed";

  return (
    <EngPanel className="h-full min-h-[340px] lg:min-h-[400px]">
      <EngChrome title="ZeonAI · Case · CS-1042">
        <div className="flex h-full min-h-[300px] flex-col gap-3 p-3 md:p-4">
          <div
            className="rounded-lg border p-3"
            style={{ borderColor: Z.line, backgroundColor: Z.mist }}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: Z.fog }}>
                  Case
                </p>
                <p className="mt-1 text-[14px] font-medium" style={{ color: Z.ink }}>
                  Invoice exception · CS-1042
                </p>
              </div>
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[9px]"
                style={{
                  backgroundColor: canClose ? `${Z.leaf}22` : `${Z.blue}15`,
                  color: canClose ? Z.leaf : Z.blue,
                }}
              >
                {canClose ? "Ready to close" : "Open task blocks close"}
              </span>
            </div>
            <dl className="mt-3 grid gap-2 text-[11px] sm:grid-cols-3">
              {[
                ["Holder", "A. Chen"],
                ["Case deadline", "2025-04-02"],
                ["Status", "In progress"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt style={{ color: Z.fog }}>{k}</dt>
                  <dd className="mt-0.5 font-medium" style={{ color: Z.ink }}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-lg border p-3" style={{ borderColor: Z.line }}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[13px] font-medium" style={{ color: Z.ink }}>
                  Freight variance review
                </p>
                <p className="mt-0.5 text-[11px]" style={{ color: Z.ink70 }}>
                  Assignee · J. Rao · Task deadline 2025-03-28
                </p>
              </div>
              <span
                className="rounded border px-2 py-0.5 font-mono text-[10px]"
                style={{ borderColor: `${Z.blue}44`, color: Z.blue }}
              >
                {state.label}
              </span>
            </div>

            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: Z.fog }}>
              Task lifecycle
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5" role="list">
              {STATES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="listitem"
                  onClick={() => setStateIdx(i)}
                  className="rounded-full border px-2.5 py-1 text-[10px] outline-none focus-visible:ring-2 focus-visible:ring-[#0977B3]/45"
                  style={{
                    borderColor: i === stateIdx ? Z.blue : Z.line,
                    backgroundColor: i === stateIdx ? `${Z.blue}12` : Z.paper,
                    color: i === stateIdx ? Z.blue : Z.ink70,
                  }}
                  aria-pressed={i === stateIdx}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-snug" style={{ color: Z.ink70 }}>
              The task moves. The case stays with A. Chen. Task deadline cannot
              pass the case deadline.
            </p>
          </div>
        </div>
      </EngChrome>
    </EngPanel>
  );
}
