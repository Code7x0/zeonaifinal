"use client";

import { useCallback, useId, useState } from "react";
import {
  architectureLayers,
  type ArchitectureLayerKey,
} from "./content";

const ZEON_BLUE = "#0977B3";
const DEFAULT_KEY: ArchitectureLayerKey = architectureLayers[0].key;

function slabPaths(indexFromTop: number) {
  const dx = 148;
  const dy = 52;
  const thickness = 16;
  const gap = 34;
  const cx = 220;
  const cy = 36 + indexFromTop * gap;

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

  const to = (pts: readonly (readonly [number, number])[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ") + " Z";

  return {
    top: to(top),
    left: to(left),
    right: to(right),
    labelX: cx,
    labelY: cy + dy / 2 + 5,
    numberX: cx - dx + 28,
    numberY: cy + dy / 2 + 5,
  };
}

function parseDetailPair(detail: string): { label: string; body: string } | null {
  const idx = detail.indexOf(": ");
  if (idx <= 0) return null;
  return { label: detail.slice(0, idx), body: detail.slice(idx + 2) };
}

export function Architecture() {
  const [activeKey, setActiveKey] = useState<ArchitectureLayerKey>(DEFAULT_KEY);
  const baseId = useId();
  const selectLayer = useCallback((key: ArchitectureLayerKey) => {
    setActiveKey(key);
  }, []);

  return (
    <section
      id="architecture"
      className="border-t border-[var(--zeon-line)] bg-[var(--zeon-paper)] px-5 py-20 md:px-8 md:py-28"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--zeon-fog)]">
              01 · Architecture
            </p>
            <h2
              id={`${baseId}-heading`}
              className="mt-3 max-w-[16ch] text-[36px] leading-[1.08] tracking-[-0.035em] text-[var(--zeon-ink)] md:text-[52px]"
            >
              The platform in one picture
            </h2>
            <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.55] text-[var(--zeon-ink70)] md:text-[18px]">
              Every document moves through the same six layers, from the file you
              upload to the record in your ERP.
            </p>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.55] text-[var(--zeon-ink70)] md:text-[16px]">
              The language model can be swapped. The layers underneath are what
              make the output safe to act on.
            </p>
          </div>

          <div className="relative w-full">
            <svg
              viewBox="0 0 440 280"
              className="mx-auto h-auto w-full max-w-[520px]"
              role="img"
              aria-label="Six-layer ZeonAI platform architecture"
            >
              <title>ZeonAI six-layer architecture</title>
              {[...architectureLayers]
                .map((layer, i) => ({ layer, i }))
                .reverse()
                .map(({ layer, i }) => {
                  const geom = slabPaths(i);
                  const active = layer.key === activeKey;
                  return (
                    <g
                      key={layer.key}
                      className="cursor-pointer outline-none"
                      role="button"
                      tabIndex={0}
                      aria-pressed={active}
                      aria-label={`Layer ${layer.id}: ${layer.title}`}
                      onClick={() => selectLayer(layer.key)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          selectLayer(layer.key);
                        }
                      }}
                    >
                      <path
                        d={geom.left}
                        fill={active ? "#066090" : "#e8e8e8"}
                        stroke={active ? "#055a82" : "#1a1a1a"}
                        strokeWidth={1}
                        className="pointer-events-none transition-colors duration-200 motion-reduce:transition-none"
                      />
                      <path
                        d={geom.right}
                        fill={active ? "#0780bc" : "#f3f3f3"}
                        stroke={active ? "#066a9c" : "#1a1a1a"}
                        strokeWidth={1}
                        className="pointer-events-none transition-colors duration-200 motion-reduce:transition-none"
                      />
                      <path
                        d={geom.top}
                        fill={active ? ZEON_BLUE : "#ffffff"}
                        stroke="#1a1a1a"
                        strokeWidth={1.15}
                        className="transition-colors duration-200 motion-reduce:transition-none"
                      />
                      <text
                        x={geom.numberX}
                        y={geom.numberY}
                        textAnchor="start"
                        className="pointer-events-none select-none"
                        style={{
                          fontSize: 11,
                          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                          fill: active ? "rgba(255,255,255,0.75)" : "#888",
                        }}
                      >
                        {layer.id}
                      </text>
                      <text
                        x={geom.labelX}
                        y={geom.labelY}
                        textAnchor="middle"
                        className="pointer-events-none select-none"
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          fontFamily: "var(--font-aeonik), ui-sans-serif, system-ui",
                          fill: active ? "#ffffff" : "#1a1a1a",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {layer.title}
                      </text>
                    </g>
                  );
                })}
            </svg>
            <p className="mt-3 text-center text-[12px] text-[var(--zeon-fog)]">
              Select a layer to open it
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--zeon-line)] md:mt-20">
          {architectureLayers.map((layer) => {
            const open = layer.key === activeKey;
            const panelId = `${baseId}-panel-${layer.key}`;
            const buttonId = `${baseId}-btn-${layer.key}`;

            return (
              <div key={layer.key} className="border-b border-[var(--zeon-line)]">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex w-full items-center gap-4 py-5 text-left md:gap-6 md:py-6"
                    onClick={() => selectLayer(layer.key)}
                  >
                    <span className="font-mono text-[12px] tabular-nums text-[var(--zeon-fog)]">
                      {layer.id}
                    </span>
                    <span
                      className={`flex-1 text-[18px] tracking-[-0.02em] md:text-[22px] ${
                        open ? "text-[var(--zeon-blue,#0977B3)]" : "text-[var(--zeon-ink)]"
                      }`}
                    >
                      {layer.title}
                    </span>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center text-[22px] leading-none text-[var(--zeon-fog)]"
                      aria-hidden
                    >
                      {open ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                >
                  {open && (
                    <div className="grid gap-6 pb-8 md:grid-cols-[1.2fr_0.8fr] md:gap-12 md:pb-10">
                      <div>
                        <p className="max-w-[58ch] text-[15px] leading-[1.6] text-[var(--zeon-ink70)] md:text-[16px]">
                          {layer.description}
                        </p>
                        <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-[minmax(7rem,auto)_1fr]">
                          {layer.details.map((detail) => {
                            const pair = parseDetailPair(detail);
                            if (!pair) {
                              return (
                                <p key={detail} className="col-span-full text-[13px] text-[var(--zeon-ink70)]">
                                  {detail}
                                </p>
                              );
                            }
                            return (
                              <div key={detail} className="contents">
                                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--zeon-fog)]">
                                  {pair.label}
                                </dt>
                                <dd className="text-[14px] leading-[1.45] text-[var(--zeon-ink70)]">
                                  {pair.body}
                                </dd>
                              </div>
                            );
                          })}
                        </dl>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
