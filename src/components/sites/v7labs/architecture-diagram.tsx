"use client";

import type { ArchitectureLayerKey } from "@/components/sites/zeonai/content";
import { architectureLayers } from "@/components/sites/zeonai/content";

const ROYAL = "#2F5BFF";
const ROYAL_DEEP = "#1A3FD0";
const ROYAL_SIDE = "#2548D6";

type ArchitectureDiagramProps = {
  /** Highest assembled layer index (0–5). Slabs 0..assembledIndex are visible. */
  assembledIndex: number;
  activeKey: ArchitectureLayerKey;
  onSelect: (key: ArchitectureLayerKey) => void;
  reduceMotion?: boolean;
};

function slabGeom(indexFromTop: number) {
  const dx = 168;
  const dy = 62;
  const thickness = 20;
  const gap = 52;
  const cx = 220;
  const cy = 36 + indexFromTop * gap;

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
    numberX: cx - dx + 28,
    numberY: cy + dy / 2 + 5,
    titleX: cx,
    titleY: cy + dy / 2 + 5,
  };
}

export function ArchitectureDiagram({
  assembledIndex,
  activeKey,
  onSelect,
  reduceMotion = false,
}: ArchitectureDiagramProps) {
  const viewH = 380;
  const viewW = 440;

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="mx-auto h-full w-full"
        role="img"
        aria-label="Six-layer ZeonAI platform architecture assembling"
        preserveAspectRatio="xMidYMid meet"
      >
        <title>ZeonAI architecture stack</title>

        {[...architectureLayers]
          .map((layer, i) => ({ layer, i }))
          .reverse()
          .map(({ layer, i }) => {
            const geom = slabGeom(i);
            const assembled = i <= assembledIndex;
            const active = layer.key === activeKey && assembled;
            const enterY = reduceMotion ? 0 : -36;

            return (
              <g
                key={layer.key}
                className="cursor-pointer outline-none"
                role="button"
                tabIndex={assembled ? 0 : -1}
                aria-pressed={active}
                aria-label={`Layer ${layer.id}: ${layer.title}`}
                aria-disabled={!assembled}
                onClick={() => {
                  if (assembled) onSelect(layer.key);
                }}
                onKeyDown={(e) => {
                  if (!assembled) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(layer.key);
                  }
                }}
                style={{
                  opacity: assembled ? 1 : 0,
                  transform: assembled
                    ? "translateY(0px)"
                    : `translateY(${enterY}px)`,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transition: reduceMotion
                    ? "none"
                    : "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 560ms cubic-bezier(0.22, 1, 0.36, 1), fill 400ms ease",
                  pointerEvents: assembled ? "auto" : "none",
                }}
              >
                <path
                  d={geom.left}
                  fill={active ? ROYAL_DEEP : "#0c0c0c"}
                  stroke={active ? ROYAL_DEEP : "rgba(255,255,255,0.12)"}
                  strokeWidth={1}
                  className="pointer-events-none"
                  style={{
                    transition: reduceMotion ? "none" : "fill 400ms ease",
                  }}
                />
                <path
                  d={geom.right}
                  fill={active ? ROYAL_SIDE : "#141414"}
                  stroke={active ? ROYAL_SIDE : "rgba(255,255,255,0.12)"}
                  strokeWidth={1}
                  className="pointer-events-none"
                  style={{
                    transition: reduceMotion ? "none" : "fill 400ms ease",
                  }}
                />
                <path
                  d={geom.top}
                  fill={active ? ROYAL : "#1a1a1a"}
                  stroke={
                    active
                      ? "rgba(255,255,255,0.35)"
                      : "rgba(255,255,255,0.16)"
                  }
                  strokeWidth={1.2}
                  style={{
                    transition: reduceMotion ? "none" : "fill 400ms ease",
                  }}
                />
                <text
                  x={geom.numberX}
                  y={geom.numberY}
                  className="pointer-events-none select-none"
                  style={{
                    fontSize: 12,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fill: active
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.4)",
                  }}
                >
                  {layer.id}
                </text>
                <text
                  x={geom.titleX}
                  y={geom.titleY}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily:
                      "var(--font-aeonik), ui-sans-serif, system-ui",
                    fill: active ? "#ffffff" : "rgba(255,255,255,0.7)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {layer.title}
                </text>
              </g>
            );
          })}
      </svg>
    </div>
  );
}
