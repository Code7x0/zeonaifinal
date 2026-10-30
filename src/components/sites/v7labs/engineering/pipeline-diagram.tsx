"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EngPanel, useInViewOnce } from "./shared";
import { Z } from "./tokens";
import {
  durationEnter,
  durationUi,
} from "../motion";

const STAGES = [
  {
    id: "sourcing",
    title: "Data Sourcing",
    detail: "Reads files from upload or a connected repository.",
  },
  {
    id: "processing",
    title: "Document Processing",
    detail: "Configured extraction for spreadsheets and PDFs.",
  },
  {
    id: "rules",
    title: "Business Rules",
    detail: "Named rule sets draft checks a person can review.",
  },
  {
    id: "output",
    title: "Business Output",
    detail: "Results go to a dashboard, report, export, or ERP.",
  },
] as const;

const OUTPUTS = ["Dashboard", "Report", "Export", "ERP"] as const;

/** Node centres in viewBox space */
const NODES = [
  { x: 120, y: 52 },
  { x: 120, y: 118 },
  { x: 120, y: 184 },
  { x: 120, y: 250 },
] as const;

export function PipelineDiagram() {
  const { ref, shown } = useInViewOnce(0.3);
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const stage = STAGES[active] ?? STAGES[0];

  return (
    <EngPanel className="h-full min-h-[360px] lg:min-h-[420px]">
      <div ref={ref} className="flex h-full flex-col p-3 md:p-4">
        <div className="flex items-center justify-between gap-3 px-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: Z.fog }}>
            Hub · Invoice processing
          </p>
          <p className="font-mono text-[10px]" style={{ color: Z.fog }}>
            Agent · one business task
          </p>
        </div>

        <div className="mt-2 grid min-h-0 flex-1 gap-3 lg:grid-cols-[1.35fr_0.9fr]">
          <div className="relative min-h-[260px]">
            <svg
              viewBox="0 0 280 310"
              className="h-full w-full"
              role="img"
              aria-label="Hub with agent and four sequential sub-agents branching to outputs"
            >
              <title>Hubs, agents and sub-agents</title>

              {/* Hub boundary */}
              <motion.rect
                x="28"
                y="16"
                width="184"
                height="278"
                rx="10"
                fill={`${Z.mist}88`}
                stroke={Z.blue}
                strokeWidth="1.2"
                strokeDasharray="5 5"
                initial={false}
                animate={{ opacity: shown ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : durationEnter }}
              />
              <text
                x="40"
                y="34"
                style={{
                  fontSize: 9,
                  fill: Z.fog,
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                HUB
              </text>

              {/* Vertical spine */}
              {NODES.slice(0, -1).map((n, i) => (
                <motion.line
                  key={`spine-${i}`}
                  x1={n.x}
                  y1={n.y + 18}
                  x2={NODES[i + 1]!.x}
                  y2={NODES[i + 1]!.y - 18}
                  stroke={i < active ? Z.blue : Z.line}
                  strokeWidth="1.5"
                  initial={false}
                  animate={{
                    pathLength: shown ? 1 : 0,
                    opacity: shown ? 1 : 0,
                  }}
                  transition={{
                    duration: reduce ? 0 : durationUi,
                    delay: reduce ? 0 : 0.2 + i * 0.12,
                  }}
                />
              ))}

              {/* Branch to outputs from last node */}
              {OUTPUTS.map((_, i) => {
                const oy = 70 + i * 52;
                return (
                  <motion.path
                    key={`branch-${i}`}
                    d={`M138 250 C170 250, 180 ${oy}, 210 ${oy}`}
                    fill="none"
                    stroke={active === 3 ? Z.blue : Z.line}
                    strokeWidth="1.2"
                    initial={false}
                    animate={{
                      pathLength: shown ? 1 : 0,
                      opacity: shown ? 1 : 0,
                    }}
                    transition={{
                      duration: reduce ? 0 : durationUi,
                      delay: reduce ? 0 : 0.65 + i * 0.06,
                    }}
                  />
                );
              })}

              {/* Stage nodes */}
              {STAGES.map((s, i) => {
                const n = NODES[i]!;
                const isActive = i === active;
                return (
                  <g key={s.id}>
                    <motion.rect
                      x={n.x - 70}
                      y={n.y - 18}
                      width="140"
                      height="36"
                      rx="6"
                      fill={isActive ? `${Z.blue}14` : Z.paper}
                      stroke={isActive ? Z.blue : Z.line}
                      strokeWidth="1.25"
                      className="cursor-pointer"
                      initial={false}
                      animate={{
                        opacity: shown ? 1 : 0,
                        y: shown || reduce ? 0 : -8,
                      }}
                      transition={{
                        duration: reduce ? 0 : durationUi,
                        delay: reduce ? 0 : 0.15 + i * 0.1,
                      }}
                      onClick={() => setActive(i)}
                      role="button"
                      tabIndex={0}
                      aria-label={s.title}
                      aria-pressed={isActive}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(i);
                        }
                      }}
                    />
                    <text
                      x={n.x - 58}
                      y={n.y + 1}
                      className="pointer-events-none"
                      style={{
                        fontSize: 9,
                        fill: isActive ? Z.blue : Z.fog,
                        fontFamily: "ui-monospace, monospace",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </text>
                    <text
                      x={n.x - 36}
                      y={n.y + 2}
                      className="pointer-events-none"
                      style={{
                        fontSize: 11,
                        fill: Z.ink,
                        fontFamily: "var(--font-aeonik), sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {s.title}
                    </text>
                  </g>
                );
              })}

              {/* Output labels */}
              {OUTPUTS.map((o, i) => {
                const oy = 70 + i * 52;
                return (
                  <motion.g
                    key={o}
                    initial={false}
                    animate={{ opacity: shown ? 1 : 0 }}
                    transition={{
                      duration: reduce ? 0 : durationUi,
                      delay: reduce ? 0 : 0.75 + i * 0.06,
                    }}
                  >
                    <rect
                      x="210"
                      y={oy - 12}
                      width="58"
                      height="24"
                      rx="4"
                      fill={Z.paper}
                      stroke={Z.line}
                      strokeWidth="1"
                    />
                    <text
                      x="239"
                      y={oy + 3}
                      textAnchor="middle"
                      style={{
                        fontSize: 9,
                        fill: Z.ink70,
                        fontFamily: "var(--font-aeonik), sans-serif",
                      }}
                    >
                      {o}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </div>

          <div className="flex flex-col justify-center gap-2">
            {STAGES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(i)}
                className="rounded-md border px-3 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0977B3]/45"
                style={{
                  borderColor: i === active ? Z.blue : Z.line,
                  backgroundColor: i === active ? `${Z.blue}10` : Z.paper,
                }}
                aria-pressed={i === active}
              >
                <span
                  className="font-mono text-[10px]"
                  style={{ color: i === active ? Z.blue : Z.fog }}
                >
                  Sub-agent {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="mt-0.5 block text-[12px] font-medium"
                  style={{ color: Z.ink }}
                >
                  {s.title}
                </span>
              </button>
            ))}
            <div
              className="mt-1 rounded-md border px-3 py-2.5"
              style={{ borderColor: Z.line, backgroundColor: Z.mist }}
              aria-live="polite"
            >
              <p className="text-[12px] leading-snug" style={{ color: Z.ink70 }}>
                {stage.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </EngPanel>
  );
}
