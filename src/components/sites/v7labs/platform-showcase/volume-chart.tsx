"use client";

import { useId, useMemo, useState } from "react";
import { ZEON_BLUE, ZEON_TEAL } from "./data";

type Point = { label: string; processed: number; completed: number };

type VolumeChartProps = {
  data: readonly Point[];
  rangeLabel: string;
};

export function VolumeChart({ data, rangeLabel }: VolumeChartProps) {
  const gradId = useId();
  const [hover, setHover] = useState<number | null>(null);

  const { max, processedPath, completedPath, areaPath, points, yTicks } =
    useMemo(() => {
      const peak = Math.max(
        ...data.map((d) => Math.max(d.processed, d.completed)),
      );
      const maxVal = peak * 1.12;
      const w = 100;
      const h = 100;
      const padX = 1.5;
      const padTop = 6;
      const padBottom = 4;
      const innerW = w - padX * 2;
      const innerH = h - padTop - padBottom;

      const pts = data.map((d, i) => {
        const x =
          padX +
          (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
        const yP = padTop + innerH - (d.processed / maxVal) * innerH;
        const yC = padTop + innerH - (d.completed / maxVal) * innerH;
        return { ...d, x, yP, yC };
      });

      const toPath = (key: "yP" | "yC") =>
        pts
          .map(
            (p, i) =>
              `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p[key].toFixed(2)}`,
          )
          .join(" ");

      const area =
        `${toPath("yP")} L ${pts[pts.length - 1].x.toFixed(2)} ${(padTop + innerH).toFixed(2)}` +
        ` L ${pts[0].x.toFixed(2)} ${(padTop + innerH).toFixed(2)} Z`;

      const ticks = [0.33, 0.66, 1].map((t) => ({
        y: padTop + innerH * (1 - t),
        value: Math.round(maxVal * t),
      }));

      return {
        max: maxVal,
        processedPath: toPath("yP"),
        completedPath: toPath("yC"),
        areaPath: area,
        points: pts,
        yTicks: ticks,
      };
    }, [data]);

  const active = hover !== null ? points[hover] : null;

  return (
    <div className="relative">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium text-[#292929]">
            Workflow volume over time
          </p>
          <p className="mt-0.5 text-[10px] text-black/40">{rangeLabel}</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-black/50">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block size-1.5 rounded-full"
              style={{ background: ZEON_BLUE }}
            />
            Processed
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block size-1.5 rounded-full"
              style={{ background: ZEON_TEAL }}
            />
            Completed
          </span>
        </div>
      </div>

      <div className="relative h-[118px] w-full sm:h-[128px]">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          role="img"
          aria-label="Illustrative workflow volume chart"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ZEON_BLUE} stopOpacity="0.12" />
              <stop offset="100%" stopColor={ZEON_BLUE} stopOpacity="0" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => (
            <line
              key={tick.value}
              x1="1.5"
              x2="98.5"
              y1={tick.y}
              y2={tick.y}
              stroke="rgba(0,0,0,0.05)"
              strokeWidth="0.35"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path d={areaPath} fill={`url(#${gradId})`} />
          <path
            d={completedPath}
            fill="none"
            stroke={ZEON_TEAL}
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={processedPath}
            fill="none"
            stroke={ZEON_BLUE}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {points.map((p, i) => (
            <g key={p.label}>
              <circle
                cx={p.x}
                cy={p.yP}
                r={hover === i ? 1.6 : 1.05}
                fill="#fff"
                stroke={ZEON_BLUE}
                strokeWidth="1.15"
                vectorEffect="non-scaling-stroke"
                className="pointer-events-none"
              />
              <rect
                x={p.x - 4}
                y="0"
                width="8"
                height="100"
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                tabIndex={0}
                role="button"
                aria-label={`${p.label}: processed ${p.processed.toLocaleString()}, completed ${p.completed.toLocaleString()}`}
              />
            </g>
          ))}
        </svg>

        {active ? (
          <div
            className="pointer-events-none absolute top-1 z-10 min-w-[124px] rounded-md border border-black/8 bg-white px-2 py-1.5 text-[10px] shadow-sm"
            style={{
              left: `clamp(0px, calc(${active.x}% - 62px), calc(100% - 132px))`,
            }}
          >
            <p className="font-medium text-[#292929]">{active.label}</p>
            <p className="mt-0.5 text-black/55">
              Processed{" "}
              <span className="font-medium tabular-nums text-[#292929]">
                {active.processed.toLocaleString()}
              </span>
            </p>
            <p className="text-black/55">
              Completed{" "}
              <span className="font-medium tabular-nums text-[#292929]">
                {active.completed.toLocaleString()}
              </span>
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-1 flex justify-between px-0.5 text-[10px] tabular-nums text-black/35">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
      <p className="sr-only">Peak illustrative volume near {Math.round(max)}</p>
    </div>
  );
}
