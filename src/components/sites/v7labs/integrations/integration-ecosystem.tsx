"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  CONNECTOR_GROUPS,
  CONNECTOR_COUNT,
  type ConnectorGroup,
  type ConnectorItem,
} from "./connector-data";

type Props = {
  className?: string;
  compact?: boolean;
};

/** ViewBox for the radial stage — wide enough for orbits, short enough to fit a viewport */
const VB_W = 1120;
const VB_H = 720;
const CX = VB_W / 2;
const CY = VB_H / 2;
const HUB_R = 84;

type PlacedNode = {
  key: string;
  item: ConnectorItem;
  groupId: ConnectorGroup["id"];
  groupTitle: string;
  x: number;
  y: number;
  angle: number;
  radius: number;
  pathD: string;
};

type ArcSpec = {
  id: ConnectorGroup["id"];
  title: string;
  shortTitle: string;
  radius: number;
  /** Soft ring stroke */
  ringOpacity: number;
};

/** Three orbital radii — docs innermost, data mid, ERP outermost */
const ARCS: readonly ArcSpec[] = [
  {
    id: "documents",
    title: "Documents and collaboration",
    shortTitle: "Docs",
    radius: 168,
    ringOpacity: 0.22,
  },
  {
    id: "data",
    title: "Data platforms",
    shortTitle: "Data",
    radius: 248,
    ringOpacity: 0.18,
  },
  {
    id: "erp",
    title: "ERP systems",
    shortTitle: "ERP",
    radius: 328,
    ringOpacity: 0.14,
  },
] as const;

/** Place n items evenly on a full circle, with a phase offset (degrees). */
function placeOnOrbit(
  items: readonly ConnectorItem[],
  group: ConnectorGroup,
  radius: number,
  phaseDeg: number,
): Omit<PlacedNode, "pathD">[] {
  const n = items.length;
  return items.map((item, i) => {
    const angle = ((i / n) * 360 + phaseDeg) % 360;
    const rad = (angle * Math.PI) / 180;
    // 0° = top
    const x = CX + radius * Math.sin(rad);
    const y = CY - radius * Math.cos(rad);
    return {
      key: `${group.id}-${item.name}`,
      item,
      groupId: group.id,
      groupTitle: group.title,
      x,
      y,
      angle,
      radius,
    };
  });
}

function spokePath(x: number, y: number): string {
  const dx = x - CX;
  const dy = y - CY;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  // Start just outside hub edge
  const sx = CX + ux * (HUB_R + 6);
  const sy = CY + uy * (HUB_R + 6);
  // End just inside node tile (~28px radius)
  const ex = x - ux * 30;
  const ey = y - uy * 30;
  // Soft quadratic bend perpendicular to the spoke
  const px = -uy;
  const py = ux;
  const bend = len * 0.08;
  const mx = (sx + ex) / 2 + px * bend;
  const my = (sy + ey) / 2 + py * bend;
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

function LogoNode({
  node,
  reveal,
  delayMs,
  active,
  onEnter,
  onLeave,
}: {
  node: PlacedNode;
  reveal: boolean;
  delayMs: number;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const label = node.item.shortName ?? node.item.name;
  return (
    <li
      className="absolute list-none"
      style={{
        left: `${(node.x / VB_W) * 100}%`,
        top: `${(node.y / VB_H) * 100}%`,
        transform: "translate(-50%, -50%)",
        zIndex: active ? 5 : 2,
      }}
      title={node.item.name}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      <button
        type="button"
        className={cn(
          "flex size-[52px] items-center justify-center rounded-full bg-white",
          "border border-[#E8EAEF] shadow-[var(--zeon-elev-1)]",
          "transition-[transform,box-shadow,border-color,opacity] duration-300 ease-[var(--zeon-ease-spring)]",
          "hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--zeon-accent)_35%,#E8EAEF)] hover:shadow-[var(--zeon-elev-2)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--zeon-accent)]",
          active &&
            "border-[color-mix(in_srgb,var(--zeon-accent)_45%,#E8EAEF)] shadow-[var(--zeon-elev-2)] -translate-y-0.5",
          reveal ? "scale-100 opacity-100" : "scale-90 opacity-0",
        )}
        style={{ transitionDelay: reveal ? `${delayMs}ms` : "0ms" }}
        aria-label={`${node.item.name}, ${node.groupTitle}`}
      >
        {node.item.logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={node.item.logoSrc}
            alt=""
            width={32}
            height={32}
            className="max-h-[28px] w-auto max-w-[32px] object-contain"
            draggable={false}
          />
        ) : (
          <span className="max-w-[44px] px-0.5 text-center text-[9px] font-semibold leading-tight tracking-[-0.02em] text-[#3F4654]">
            {label}
          </span>
        )}
      </button>
    </li>
  );
}

function MobileStack({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="zeon-surface-brand relative mx-auto flex size-[148px] flex-col items-center justify-center rounded-full px-4 text-center shadow-[var(--zeon-elev-2)]">
        <div
          className="pointer-events-none absolute -inset-3 rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(41,98,255,0.35), transparent 70%)",
          }}
          aria-hidden
        />
        <p className="relative z-[1] font-mono text-[9px] uppercase tracking-[0.14em] text-white/70">
          Central layer
        </p>
        <p className="relative z-[1] mt-1 font-[family-name:var(--font-aeonik)] text-[16px] tracking-[-0.03em] text-white">
          AI Workspace
        </p>
      </div>

      {CONNECTOR_GROUPS.map((group) => (
        <section key={group.id} aria-label={group.title}>
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h3 className="font-[family-name:var(--font-aeonik)] text-[15px] tracking-[-0.02em] text-[#181D27]">
              {group.title}
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#717680]">
              {group.items.length}
            </span>
          </div>
          <ul className="grid grid-cols-4 gap-2.5 sm:grid-cols-5">
            {group.items.map((item) => (
              <li key={item.name} className="list-none" title={item.name}>
                <div className="zeon-surface flex aspect-square items-center justify-center rounded-full p-2">
                  {item.logoSrc ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.logoSrc}
                        alt=""
                        width={28}
                        height={28}
                        className="max-h-7 w-auto max-w-7 object-contain"
                        draggable={false}
                      />
                      <span className="sr-only">{item.name}</span>
                    </>
                  ) : (
                    <span className="text-center text-[9px] font-semibold leading-tight text-[#3F4654]">
                      {item.shortName ?? item.name}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

/**
 * Radial hub-and-spoke AI Workspace integration ecosystem.
 * Three orbital arcs (Docs / Data / ERP) with full-colour vendor logos.
 */
export function IntegrationEcosystem({ className, compact = false }: Props) {
  const reduceMotion = useReducedMotion() ?? false;
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(reduceMotion);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  const nodes = useMemo(() => {
    const placed: PlacedNode[] = [];
    for (const arc of ARCS) {
      const group = CONNECTOR_GROUPS.find((g) => g.id === arc.id)!;
      // Phase offsets keep rings from stacking radially on the same rays
      const phase =
        arc.id === "documents" ? 18 : arc.id === "data" ? 8 : 0;
      const orbit = placeOnOrbit(group.items, group, arc.radius, phase);
      for (const n of orbit) {
        placed.push({ ...n, pathD: spokePath(n.x, n.y) });
      }
    }
    return placed;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setReveal(true);
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setReveal(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [reduceMotion]);

  const activeGroup = activeKey
    ? nodes.find((n) => n.key === activeKey)?.groupId
    : null;

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative overflow-hidden rounded-[var(--zeon-radius-panel)] border border-[color-mix(in_srgb,var(--zeon-border)_80%,var(--dp-blue-200))] bg-[linear-gradient(180deg,#FAFBFE_0%,#FFFFFF_45%,#F5F8FC_100%)] shadow-[var(--zeon-elev-1)]",
        compact ? "p-4 md:p-5" : "p-4 sm:p-6 md:p-8",
        className,
      )}
    >
      {/* Mobile stacked */}
      <div
        className="md:hidden"
        aria-hidden={!isNarrow || undefined}
      >
        <MobileStack />
      </div>

      {/* Desktop / tablet radial */}
      <div
        className="relative mx-auto hidden w-full md:block"
        style={{ maxWidth: compact ? 1020 : 1120 }}
        aria-hidden={isNarrow || undefined}
      >
        <div
          className="relative w-full"
          style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
        >
          {/* Ambient glow behind hub */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 size-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(circle, rgba(41,98,255,0.16) 0%, rgba(41,98,255,0.05) 42%, transparent 70%)",
            }}
            aria-hidden
          />

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            aria-hidden
          >
            <defs>
              <linearGradient
                id={`spoke-${uid}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(27,70,245,0.08)" />
                <stop offset="50%" stopColor="rgba(41,98,255,0.28)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.12)" />
              </linearGradient>
              <filter
                id={`hub-glow-${uid}`}
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
              >
                <feGaussianBlur stdDeviation="10" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Orbital rings */}
            {ARCS.map((arc) => (
              <circle
                key={arc.id}
                cx={CX}
                cy={CY}
                r={arc.radius}
                fill="none"
                stroke={
                  activeGroup === arc.id
                    ? "rgba(41,98,255,0.28)"
                    : `rgba(27,70,245,${arc.ringOpacity})`
                }
                strokeWidth={activeGroup === arc.id ? 1.4 : 1}
                strokeDasharray={arc.id === "documents" ? "4 6" : undefined}
                className="transition-[stroke,stroke-width] duration-300"
              />
            ))}

            {/* Spokes */}
            {nodes.map((n, i) => {
              const isActive = activeKey === n.key;
              const dimmed = activeKey !== null && !isActive;
              return (
                <path
                  key={n.key}
                  d={n.pathD}
                  fill="none"
                  stroke={
                    isActive
                      ? "rgba(41,98,255,0.55)"
                      : `url(#spoke-${uid})`
                  }
                  strokeWidth={isActive ? 1.8 : 1.15}
                  strokeLinecap="round"
                  style={{
                    opacity: dimmed ? 0.15 : reveal ? 1 : 0,
                    strokeDasharray: 600,
                    strokeDashoffset: reveal ? 0 : 600,
                    transition: reduceMotion
                      ? "opacity 200ms ease, stroke 200ms ease"
                      : `stroke-dashoffset 700ms cubic-bezier(0.23,1,0.32,1) ${120 + i * 18}ms, opacity 250ms ease, stroke 200ms ease, stroke-width 200ms ease`,
                  }}
                />
              );
            })}
          </svg>

          {/* Category markers */}
          <div
            className={cn(
              "pointer-events-none absolute left-[7%] top-[18%] transition-opacity duration-500",
              reveal ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDelay: reveal ? "400ms" : "0ms" }}
          >
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-[#E8EAEF] bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#535862] shadow-[var(--zeon-elev-1)] backdrop-blur-sm",
                activeGroup === "erp" &&
                  "border-[color-mix(in_srgb,var(--zeon-accent)_40%,#E8EAEF)] text-[#1B46F5]",
              )}
            >
              ERP · {CONNECTOR_GROUPS[0].items.length}
            </span>
          </div>
          <div
            className={cn(
              "pointer-events-none absolute right-[6%] top-[22%] transition-opacity duration-500",
              reveal ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDelay: reveal ? "480ms" : "0ms" }}
          >
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-[#E8EAEF] bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#535862] shadow-[var(--zeon-elev-1)] backdrop-blur-sm",
                activeGroup === "data" &&
                  "border-[color-mix(in_srgb,var(--zeon-accent)_40%,#E8EAEF)] text-[#1B46F5]",
              )}
            >
              Data · {CONNECTOR_GROUPS[1].items.length}
            </span>
          </div>
          <div
            className={cn(
              "pointer-events-none absolute bottom-[7%] left-1/2 -translate-x-1/2 transition-opacity duration-500",
              reveal ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDelay: reveal ? "560ms" : "0ms" }}
          >
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-[#E8EAEF] bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#535862] shadow-[var(--zeon-elev-1)] backdrop-blur-sm",
                activeGroup === "documents" &&
                  "border-[color-mix(in_srgb,var(--zeon-accent)_40%,#E8EAEF)] text-[#1B46F5]",
              )}
            >
              Docs · {CONNECTOR_GROUPS[2].items.length}
            </span>
          </div>

          {/* Central hub */}
          <div
            className={cn(
              "absolute left-1/2 top-1/2 z-[3] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center transition-[opacity,transform] duration-500 ease-[var(--zeon-ease-out)]",
              reveal ? "scale-100 opacity-100" : "scale-90 opacity-0",
            )}
            style={{
              width: `${(HUB_R * 2 / VB_W) * 100}%`,
              aspectRatio: "1",
              background:
                "linear-gradient(145deg, #2962FF 0%, #1B46F5 48%, #172AB6 100%)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.18) inset, 0 12px 40px rgba(27,70,245,0.35), 0 4px 12px rgba(23,42,182,0.25)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sites/zeonai/mark-light.png"
              alt=""
              width={28}
              height={28}
              className="mb-1.5 size-7 object-contain opacity-95"
              draggable={false}
            />
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/70 sm:text-[9px]">
              Central layer
            </p>
            <p className="mt-0.5 px-2 font-[family-name:var(--font-aeonik)] text-[13px] leading-tight tracking-[-0.03em] text-white sm:text-[15px] md:text-[17px]">
              AI Workspace
            </p>
          </div>

          {/* Logo nodes */}
          <ul className="absolute inset-0 m-0 list-none p-0">
            {nodes.map((n, i) => (
              <LogoNode
                key={n.key}
                node={n}
                reveal={reveal}
                delayMs={180 + i * 22}
                active={activeKey === n.key}
                onEnter={() => setActiveKey(n.key)}
                onLeave={() => setActiveKey(null)}
              />
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#717680]">
        Connectors are scoped per engagement · {CONNECTOR_COUNT} systems
      </p>
    </div>
  );
}

/** Logo-tile catalogue for the Integrations page list section */
export function ConnectorLogoCatalogue({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-10", className)}>
      {CONNECTOR_GROUPS.map((group) => (
        <div key={group.id}>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em] text-[#181D27]">
              {group.title}
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#717680]">
              {group.items.length}
            </span>
          </div>
          <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {group.items.map((item) => (
              <li key={item.name} className="list-none" title={item.name}>
                <div className="zeon-surface flex h-[72px] flex-col items-center justify-center gap-1.5 rounded-[14px] px-2">
                  {item.logoSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.logoSrc}
                      alt=""
                      width={36}
                      height={36}
                      className="max-h-8 w-auto max-w-9 object-contain"
                      draggable={false}
                    />
                  ) : (
                    <span className="text-center text-[12px] font-medium text-[#535862]">
                      {item.shortName ?? item.name}
                    </span>
                  )}
                  <span className="sr-only">{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="text-[13px] text-[#717680]">
        Connectors are scoped per engagement. Official brand marks are used
        where cleared assets are available; text tiles cover the rest.
      </p>
    </div>
  );
}
