"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  architectureLayers,
  type ArchitectureLayerKey,
} from "@/components/sites/zeonai/content";
import { durationEnter, durationUi, easeOut } from "./motion";

const ACCENT = "#2962FF";
const ACCENT_DEEP = "#1B46F5";
const ACCENT_SIDE = "#2548D6";

/** Tiny technical marks keyed to approved layer order (sources → outputs). */
const LAYER_MARKS: Record<
  ArchitectureLayerKey,
  { kind: "ports" | "doc" | "rules" | "flow" | "shield" | "out" }
> = {
  "data-sources": { kind: "ports" },
  "document-processing": { kind: "doc" },
  "rules-engine": { kind: "rules" },
  "workflows-approvals": { kind: "flow" },
  "access-audit": { kind: "shield" },
  "outputs-integrations": { kind: "out" },
};

/** Isometric slab geometry — index 0 at bottom (sources), 5 at top (outputs). */
function slabGeom(indexFromBottom: number) {
  const dx = 162;
  const dy = 54;
  const thickness = 15;
  const gap = 44;
  const cx = 214;
  // Keep bottom slab (index 0) fully inside the viewBox — was clipping at y≈357.
  const cy = 274 - indexFromBottom * gap;

  const to = (pts: readonly (readonly [number, number])[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ") + " Z";

  const top = [
    [cx, cy],
    [cx + dx, cy + dy / 2],
    [cx, cy + dy],
    [cx - dx, cy + dy / 2],
  ] as const;

  const left = [
    [cx - dx, cy + dy / 2],
    [cx, cy + dy],
    [cx, cy + dy + thickness],
    [cx - dx, cy + dy / 2 + thickness],
  ] as const;

  const right = [
    [cx, cy + dy],
    [cx + dx, cy + dy / 2],
    [cx + dx, cy + dy / 2 + thickness],
    [cx, cy + dy + thickness],
  ] as const;

  return {
    top: to(top),
    left: to(left),
    right: to(right),
    numberX: cx - dx + 24,
    numberY: cy + dy / 2 + 4,
    titleX: cx + 4,
    titleY: cy + dy / 2 + 4,
    markX: cx + dx - 36,
    markY: cy + dy / 2 + 1,
    nodeX: cx,
    nodeY: cy + dy + thickness / 2,
    linkTopY: cy,
  };
}

function LayerMark({
  kind,
  x,
  y,
  lit,
}: {
  kind: (typeof LAYER_MARKS)[ArchitectureLayerKey]["kind"];
  x: number;
  y: number;
  lit: boolean;
}) {
  const stroke = lit ? "rgba(255,255,255,0.85)" : "rgba(145,180,255,0.45)";
  const fill = lit ? "rgba(41,98,255,0.35)" : "rgba(41,98,255,0.12)";

  if (kind === "ports") {
    return (
      <g transform={`translate(${x} ${y})`} aria-hidden>
        <rect x={-7} y={-4} width={14} height={8} rx={1.5} fill={fill} stroke={stroke} strokeWidth={0.9} />
        <circle cx={-3} cy={0} r={1.1} fill={stroke} />
        <circle cx={3} cy={0} r={1.1} fill={stroke} />
      </g>
    );
  }
  if (kind === "doc") {
    return (
      <g transform={`translate(${x} ${y})`} aria-hidden>
        <path
          d="M-5 -5.5 L2 -5.5 L5 -2.5 L5 5.5 L-5 5.5 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={0.9}
        />
        <path d="M2 -5.5 L2 -2.5 L5 -2.5" fill="none" stroke={stroke} strokeWidth={0.9} />
        <path d="M-2.5 0.5 H2.5 M-2.5 3 H1" stroke={stroke} strokeWidth={0.8} />
      </g>
    );
  }
  if (kind === "rules") {
    return (
      <g transform={`translate(${x} ${y})`} aria-hidden>
        <path
          d="M-5 0 L0 -5.5 L5 0 L0 5.5 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={0.9}
        />
        <path d="M-1.5 0 H1.5 M0 -1.5 V1.5" stroke={stroke} strokeWidth={0.9} />
      </g>
    );
  }
  if (kind === "flow") {
    return (
      <g transform={`translate(${x} ${y})`} aria-hidden>
        <path
          d="M-6 0 H3 M0 -3.5 L4 0 L0 3.5"
          fill="none"
          stroke={stroke}
          strokeWidth={1.1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    );
  }
  if (kind === "shield") {
    return (
      <g transform={`translate(${x} ${y})`} aria-hidden>
        <path
          d="M0 -6 L5.5 -3.5 V0.5 C5.5 3.5 2.5 5.5 0 6.5 C-2.5 5.5 -5.5 3.5 -5.5 0.5 V-3.5 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={0.9}
        />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden>
      <rect x={-5.5} y={-4.5} width={11} height={9} rx={1.5} fill={fill} stroke={stroke} strokeWidth={0.9} />
      <path d="M-2.5 0 H2.5 M0.5 -2.2 L3 0 L0.5 2.2" fill="none" stroke={stroke} strokeWidth={0.9} strokeLinecap="round" />
    </g>
  );
}

/**
 * Premium six-layer isometric stack for the Reference architecture band.
 * Labels come from approved `architectureLayers` — no invented names.
 */
export function ReferenceArchitectureVisual({
  className = "",
}: {
  className?: string;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState<ArchitectureLayerKey | null>(null);
  const highlight = hovered;

  return (
    <motion.div
      className={`relative overflow-hidden rounded-[16px] border border-white/[0.08] bg-[linear-gradient(165deg,#0B1220_0%,#0A0E18_48%,#070A10_100%)] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_20px_48px_rgba(0,0,0,0.4)] ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: durationEnter, ease: easeOut }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(41,98,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(41,98,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 65% at 50% 45%, #000 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(41,98,255,0.18)_0%,transparent_70%)]"
      />

      <svg
        viewBox="0 0 428 360"
        className="relative z-[1] mx-auto h-auto w-full max-w-[520px] px-2 py-5 sm:px-3 md:px-4 md:py-6"
        role="img"
        aria-label="Six-layer ZeonAI platform architecture from data sources to outputs and integrations"
      >
        <title>ZeonAI six-layer architecture</title>
        <defs>
          <linearGradient id="refArchTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#152038" />
            <stop offset="100%" stopColor="#0E1628" />
          </linearGradient>
          <linearGradient id="refArchTopLit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="55%" stopColor="#2962FF" />
            <stop offset="100%" stopColor="#1B46F5" />
          </linearGradient>
        </defs>

        {/* Vertical spine connectors */}
        {architectureLayers.slice(0, -1).map((layer, i) => {
          const from = slabGeom(i);
          const to = slabGeom(i + 1);
          const x = from.nodeX;
          const y1 = from.linkTopY + 1;
          const y2 = to.nodeY + 8;
          const len = Math.abs(y2 - y1);
          const lit =
            highlight === layer.key ||
            highlight === architectureLayers[i + 1]?.key;
          return (
            <g key={`link-${layer.key}`}>
              <motion.line
                x1={x}
                y1={y1}
                x2={x}
                y2={y2}
                stroke={lit ? ACCENT : "rgba(41,98,255,0.32)"}
                strokeWidth={lit ? 1.7 : 1}
                strokeLinecap="round"
                strokeDasharray={len}
                initial={
                  reduceMotion
                    ? false
                    : { strokeDashoffset: len, opacity: 0 }
                }
                whileInView={{ strokeDashoffset: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  delay: reduceMotion ? 0 : 0.38 + i * 0.08,
                  ease: easeOut,
                }}
              />
              {/* Directional tick toward outputs */}
              <motion.path
                d={`M${x - 3.5} ${y2 + 6} L${x} ${y2 + 1.5} L${x + 3.5} ${y2 + 6}`}
                fill="none"
                stroke={lit ? ACCENT : "rgba(41,98,255,0.4)"}
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: reduceMotion ? 0 : 0.5 + i * 0.08,
                  duration: 0.3,
                }}
              />
            </g>
          );
        })}

        {architectureLayers.map((layer, i) => {
          const geom = slabGeom(i);
          const isHot = highlight === layer.key;
          const isTop = i === architectureLayers.length - 1;
          const mark = LAYER_MARKS[layer.key];
          const titleSize =
            layer.title.length > 22 ? 11 : layer.title.length > 16 ? 11.5 : 12.5;

          return (
            <motion.g
              key={layer.key}
              role="img"
              aria-label={`Layer ${layer.id}: ${layer.title}`}
              className="outline-none"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 18, scale: 0.98 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : 0.04 + i * 0.05,
                ease: easeOut,
              }}
              onMouseEnter={() => setHovered(layer.key)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(layer.key)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              style={{
                transformOrigin: `${geom.titleX}px ${geom.titleY}px`,
                cursor: "default",
              }}
            >
              <motion.g
                animate={
                  reduceMotion
                    ? undefined
                    : { y: isHot ? -4 : 0 }
                }
                transition={{ duration: durationUi, ease: easeOut }}
              >
                <path
                  d={geom.left}
                  fill={isHot ? ACCENT_DEEP : "#0A101C"}
                  stroke={
                    isHot ? ACCENT_DEEP : "rgba(145,180,255,0.18)"
                  }
                  strokeWidth={1}
                />
                <path
                  d={geom.right}
                  fill={isHot ? ACCENT_SIDE : "#101828"}
                  stroke={
                    isHot ? ACCENT_SIDE : "rgba(145,180,255,0.16)"
                  }
                  strokeWidth={1}
                />
                <path
                  d={geom.top}
                  fill={isHot ? "url(#refArchTopLit)" : "url(#refArchTop)"}
                  stroke={
                    isHot
                      ? "rgba(255,255,255,0.5)"
                      : isTop
                        ? "rgba(41,98,255,0.55)"
                        : "rgba(145,180,255,0.28)"
                  }
                  strokeWidth={isHot || isTop ? 1.4 : 1.1}
                />
                {isTop ? (
                  <motion.path
                    d={geom.top}
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth={1.6}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: reduceMotion ? 0 : 1.05,
                      duration: 0.55,
                      ease: easeOut,
                    }}
                  />
                ) : null}

                <circle
                  cx={geom.nodeX}
                  cy={geom.nodeY}
                  r={isHot ? 3.2 : 2.4}
                  fill={isHot ? ACCENT : "rgba(41,98,255,0.65)"}
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth={0.8}
                />

                <text
                  x={geom.numberX}
                  y={geom.numberY}
                  className="select-none"
                  style={{
                    fontSize: 11,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fill: isHot
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(190,210,255,0.55)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {layer.id}
                </text>
                <text
                  x={geom.titleX}
                  y={geom.titleY}
                  textAnchor="middle"
                  className="select-none"
                  style={{
                    fontSize: titleSize,
                    fontWeight: 500,
                    fontFamily:
                      "var(--font-aeonik), ui-sans-serif, system-ui",
                    fill: isHot ? "#ffffff" : "rgba(235,240,255,0.84)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {layer.title}
                </text>

                <LayerMark
                  kind={mark.kind}
                  x={geom.markX}
                  y={geom.markY}
                  lit={isHot || isTop}
                />
              </motion.g>
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}
