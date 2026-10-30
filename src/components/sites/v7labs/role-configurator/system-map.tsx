"use client";

import { useId, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  durationHover,
} from "../motion";

type ModuleNode = {
  name: string;
  included: boolean;
};

type SystemMapProps = {
  modules: readonly ModuleNode[];
  roleLabel: string;
};

/** Stable ring layout — positions never jump when inclusion toggles. */
function ringPositions(
  count: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
) {
  const start = -Math.PI / 2;
  return Array.from({ length: count }, (_, i) => {
    const a = start + (i / count) * Math.PI * 2;
    return {
      x: cx + Math.cos(a) * rx,
      y: cy + Math.sin(a) * ry,
      a,
    };
  });
}

function shortLabel(name: string) {
  const map: Record<string, string> = {
    "Ask AI": "Ask AI",
    "AI Drive": "AI Drive",
    Workflows: "Workflows",
    Dashboard: "Dashboard",
    "Agent Hub": "Agent Hub",
    Notifications: "Notify",
    "AI Dashboards": "Dashboards",
    "Contract Intelligence": "Contracts",
    "App Hub": "App Hub",
    "Quote Management": "Quotes",
    "Opportunity Management": "Opportunity",
    Search: "Search",
  };
  return map[name] ?? (name.length > 12 ? `${name.slice(0, 10)}…` : name);
}

export function SystemMap({ modules, roleLabel }: SystemMapProps) {
  const uid = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const cx = 220;
  const cy = 178;
  const rx = 148;
  const ry = 118;

  const nodes = useMemo(() => {
    const pts = ringPositions(modules.length, cx, cy, rx, ry);
    return modules.map((mod, i) => ({
      ...mod,
      ...pts[i]!,
      label: shortLabel(mod.name),
    }));
  }, [modules]);

  const activeCount = modules.filter((m) => m.included).length;

  return (
    <div className="relative overflow-hidden rounded-[6px] border border-[#292F3A] bg-[#101318]">
      <div className="flex items-center justify-between border-b border-[#202630] bg-[#151922] px-3.5 py-2.5">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#727B8B]">
          System architecture
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#A0A7B4]">
          <span className="text-[#356DFF]">{activeCount}</span>/{modules.length}{" "}
          active
        </p>
      </div>

      <svg
        viewBox="0 0 440 356"
        className="h-auto w-full"
        role="img"
        aria-label={`ZeonAI module configuration for ${roleLabel}`}
      >
        <defs>
          <pattern
            id={`${uid}-grid`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#202630"
              strokeWidth="0.65"
            />
          </pattern>
        </defs>
        <rect width="440" height="356" fill="#101318" />
        <rect width="440" height="356" fill={`url(#${uid}-grid)`} />

        <line
          x1={cx - 168}
          y1={cy}
          x2={cx + 168}
          y2={cy}
          stroke="#202630"
          strokeWidth="0.6"
        />
        <line
          x1={cx}
          y1={cy - 136}
          x2={cx}
          y2={cy + 136}
          stroke="#202630"
          strokeWidth="0.6"
        />

        {nodes.map((node) => {
          const dx = node.x - cx;
          const dy = node.y - cy;
          const len = Math.hypot(dx, dy) || 1;
          const hx = cx + (dx / len) * 34;
          const hy = cy + (dy / len) * 34;
          const mx = cx + dx * 0.52;
          const d = `M ${hx} ${hy} L ${mx} ${hy} L ${mx} ${node.y} L ${node.x - Math.sign(dx || 1) * 28} ${node.y}`;

          return (
            <motion.path
              key={`line-${node.name}`}
              d={d}
              fill="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              initial={false}
              animate={{
                stroke: node.included ? "#356DFF" : "#292F3A",
                strokeWidth: node.included ? 1.25 : 0.85,
                opacity: node.included ? 1 : 0.45,
              }}
              transition={{ duration: reduceMotion ? 0 : durationHover }}
            />
          );
        })}

        <rect
          x={cx - 34}
          y={cy - 16}
          width={68}
          height={32}
          rx={3}
          fill="#090B0F"
          stroke="#292F3A"
          strokeWidth={1}
        />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#F5F6F8"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.12em"
        >
          ZEONAI
        </text>

        {nodes.map((node) => {
          const w = Math.max(56, node.label.length * 5.4 + 14);
          const h = 20;
          return (
            <g key={node.name}>
              <motion.rect
                x={node.x - w / 2}
                y={node.y - h / 2}
                width={w}
                height={h}
                rx={3}
                initial={false}
                animate={{
                  fill: node.included ? "#111C32" : "#151922",
                  stroke: node.included ? "#356DFF" : "#292F3A",
                }}
                strokeWidth={1}
                transition={{ duration: reduceMotion ? 0 : durationHover }}
              />
              <motion.circle
                cx={node.x - w / 2 + 8}
                cy={node.y}
                r={2.1}
                initial={false}
                animate={{
                  fill: node.included ? "#356DFF" : "#727B8B",
                }}
                transition={{ duration: reduceMotion ? 0 : durationHover }}
              />
              <text
                x={node.x + 2}
                y={node.y + 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={node.included ? "#F5F6F8" : "#727B8B"}
                fontSize="7.5"
                fontWeight={node.included ? 600 : 400}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="absolute bottom-2.5 left-3.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#727B8B]">
        Configured for {roleLabel}
      </p>
    </div>
  );
}
