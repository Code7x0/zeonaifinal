"use client";

/**
 * Architecture layer reveal — Anime.js timeline for supporting pages.
 * Explains layer order; respects prefers-reduced-motion.
 */

import { useEffect, useId, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Layer = {
  id: string;
  title: string;
  description: string;
  details?: readonly string[];
};

export function ArchitectureFlow({
  layers,
  className,
}: {
  layers: readonly Layer[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const baseId = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const played = useRef(false);

  useEffect(() => {
    if (reduceMotion || played.current) return;
    const root = stageRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll("[data-flow-node]");
    const links = root.querySelectorAll("[data-flow-link]");
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || played.current) return;
        played.current = true;

        animate(nodes, {
          opacity: [0, 1],
          y: [12, 0],
          delay: stagger(70),
          duration: 480,
          ease: "outQuad",
        });

        if (links.length) {
          animate(links, {
            strokeDashoffset: [120, 0],
            opacity: [0, 1],
            delay: stagger(55, { start: 160 }),
            duration: 520,
            ease: "inOutQuad",
          });
        }
      },
      { threshold: 0.35 },
    );

    io.observe(root);
    return () => io.disconnect();
  }, [reduceMotion, layers]);

  const current = layers[active] ?? layers[0];

  return (
    <div className={cn("grid gap-10 lg:grid-cols-[1.05fr_0.95fr]", className)}>
      <div ref={stageRef} className="min-w-0">
        <div
          className="relative max-w-[520px]"
          role="listbox"
          aria-label="Architecture layers"
          aria-labelledby={`${baseId}-title`}
        >
          <p id={`${baseId}-title`} className="sr-only">
            Six architecture layers from sources to safe outputs
          </p>
          <svg
            viewBox="0 0 40 360"
            className="pointer-events-none absolute left-3 top-0 h-full w-10"
            aria-hidden
          >
            {layers.slice(0, -1).map((_, i) => {
              const y1 = 28 + i * 56;
              const y2 = y1 + 56;
              return (
                <line
                  key={`link-${i}`}
                  data-flow-link
                  x1="20"
                  y1={y1 + 18}
                  x2="20"
                  y2={y2}
                  stroke="rgba(53,109,255,0.55)"
                  strokeWidth="2"
                  strokeDasharray="120"
                  strokeDashoffset={reduceMotion ? 0 : 120}
                  opacity={reduceMotion ? 1 : 0}
                />
              );
            })}
          </svg>
          <ol className="space-y-3 pl-10">
            {layers.map((layer, i) => {
              const on = i === active;
              return (
                <li key={layer.id} data-flow-node style={{ opacity: reduceMotion ? 1 : 0 }}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-[8px] border px-3 py-3 text-left transition-colors duration-200",
                      on
                        ? "border-[#7BA0FF]/55 bg-[#245BDB]"
                        : "border-white/12 bg-white/[0.04] hover:bg-white/[0.08]",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[11px]",
                        on ? "text-white/80" : "text-white/45",
                      )}
                    >
                      {layer.id}
                    </span>
                    <span className="text-[15px] font-medium text-white">
                      {layer.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="mt-3 text-[12px] text-white/40">
          Select a layer to read what it owns.
        </p>
      </div>

      <div className="rounded-[12px] border border-white/12 bg-white/[0.04] p-6 md:p-8">
        <p className="font-mono text-[11px] text-[#7BA0FF]">{current?.id}</p>
        <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em] text-white md:text-[34px]">
          {current?.title}
        </h3>
        <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.55] text-white/65">
          {current?.description}
        </p>
        {current?.details?.length ? (
          <ul className="mt-6 space-y-2">
            {current.details.map((d) => (
              <li
                key={d}
                className="border-l-2 border-[#356DFF]/60 pl-3 text-[13px] leading-[1.45] text-white/55"
              >
                {d}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
