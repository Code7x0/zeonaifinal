"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ZeonLinkButton } from "./zeon-ui";

/** Shared Trust/Company drawing-system primitives for secondary pages. */

export function Corners({
  className,
  tone = "blue",
}: {
  className?: string;
  tone?: "blue" | "ink" | "muted" | "light";
}) {
  const border =
    tone === "blue"
      ? "border-[var(--zeon-royal)]"
      : tone === "ink"
        ? "border-[#181D27]"
        : tone === "light"
          ? "border-white/40"
          : "border-[#A4A7AE]";
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <i className={cn("absolute left-0 top-0 h-2.5 w-2.5 border-l border-t", border)} />
      <i className={cn("absolute right-0 top-0 h-2.5 w-2.5 border-r border-t", border)} />
      <i className={cn("absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l", border)} />
      <i className={cn("absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r", border)} />
    </span>
  );
}

export function SheetMeta({
  left,
  right,
  tone = "light",
  className,
}: {
  left: string;
  right?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] md:px-5",
        tone === "light"
          ? "border-[#E5E7EB] text-[#717680]"
          : "border-white/10 text-white/45",
        className,
      )}
    >
      <span>{left}</span>
      {right ? <span>{right}</span> : null}
    </div>
  );
}

export type BandTone =
  | "paper"
  | "sky"
  | "ink"
  | "mist"
  | "royal"
  | "hero";

export function Band({
  tone = "paper",
  children,
  className,
  id,
}: {
  tone?: BandTone;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const bg =
    tone === "ink"
      ? "bg-[#0B0B0B] text-white"
      : tone === "sky"
        ? "bg-[var(--zeon-sky)] text-[var(--zeon-ink)]"
        : tone === "mist"
          ? "bg-[#F3F5F8] text-[var(--zeon-ink)]"
          : tone === "royal"
            ? "bg-[image:var(--zeon-gradient-royal)] text-white"
            : tone === "hero"
              ? "bg-[image:var(--zeon-gradient-hero)] text-[var(--zeon-ink)]"
              : "bg-[#FAFBFC] text-[var(--zeon-ink)]";
  return (
    <section id={id} className={cn("relative overflow-hidden", bg, className)}>
      {tone === "sky" || tone === "hero" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(55% 45% at 85% 15%, color-mix(in srgb, var(--dp-blue-200) 65%, transparent), transparent 70%), radial-gradient(40% 40% at 10% 90%, color-mix(in srgb, var(--dp-blue-100) 55%, transparent), transparent 65%)",
          }}
        />
      ) : null}
      {tone === "royal" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(50% 60% at 20% 30%, rgba(255,255,255,0.25), transparent 60%)",
          }}
        />
      ) : null}
      {tone === "ink" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 55% at 80% 20%, color-mix(in srgb, var(--dp-blue-600) 28%, transparent), transparent 65%)",
          }}
        />
      ) : null}
      <div className="relative mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20">
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "on-royal";
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] font-medium uppercase tracking-[0.16em]",
        tone === "dark"
          ? "text-[#8EB8FF]"
          : tone === "on-royal"
            ? "text-white/75"
            : "text-[var(--zeon-royal)]",
      )}
    >
      {children}
    </p>
  );
}

export function Title({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "on-royal";
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mt-3 max-w-[18ch] font-[family-name:var(--font-aeonik)] text-[clamp(1.85rem,1.2rem+2vw,2.75rem)] leading-[1.08] tracking-[-0.035em]",
        tone === "dark" || tone === "on-royal" ? "text-white" : "text-[#181D27]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Lead({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "on-royal";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-4 max-w-[48ch] text-[15.5px] leading-[1.6]",
        tone === "dark"
          ? "text-white/65"
          : tone === "on-royal"
            ? "text-white/80"
            : "text-[#535862]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Panel({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "glass";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border",
        tone === "light" && "border-[#E5E7EB] bg-white",
        tone === "dark" && "border-white/12 bg-[#121212]",
        tone === "glass" &&
          "border-white/20 bg-white/12 shadow-[var(--zeon-elev-ink)] backdrop-blur-xl",
        className,
      )}
    >
      <Corners
        tone={tone === "light" ? "blue" : "light"}
      />
      {children}
    </div>
  );
}

export function StrokeWord({
  children,
  color = "#8EB8FF",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <span
      className="text-transparent"
      style={{ WebkitTextStroke: `1.15px ${color}` }}
    >
      {children}
    </span>
  );
}

/** Light sheet label for section hierarchy (homepage / tech). */
export function SectionMeta({
  left,
  right,
  tone = "light",
  align = "start",
  className,
}: {
  left: string;
  right?: string;
  tone?: "light" | "dark";
  align?: "start" | "center" | "between";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-3 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] md:mb-4",
        align === "center" && "justify-center",
        align === "between" && "w-full justify-between",
        tone === "dark" ? "text-[#8EB8FF]" : "text-[var(--zeon-royal)]",
        className,
      )}
    >
      <span className="inline-flex items-center gap-3">
        {left}
        <span
          aria-hidden
          className={cn(
            "hidden h-px w-9 sm:block",
            tone === "dark"
              ? "bg-[linear-gradient(90deg,rgba(142,184,255,0.55),transparent)]"
              : "bg-[linear-gradient(90deg,var(--zeon-border-blue),transparent)]",
          )}
        />
      </span>
      {right ? (
        <span
          className={
            tone === "dark" ? "text-white/35" : "text-[#A4A7AE]"
          }
        >
          {right}
        </span>
      ) : null}
    </div>
  );
}

/** Number + fading rule — Trust sheet cells use this. */
export function DrawingIndex({
  n,
  tone = "light",
}: {
  n: string | number;
  tone?: "light" | "dark";
}) {
  const label = typeof n === "number" ? String(n).padStart(2, "0") : n;
  return (
    <div className="flex items-center justify-between gap-3">
      <span
        className={cn(
          "font-mono text-[11px] uppercase tracking-[0.14em]",
          tone === "dark" ? "text-[#8EB8FF]" : "text-[var(--zeon-royal)]",
        )}
      >
        {label}
      </span>
      <span
        aria-hidden
        className={cn(
          "h-px flex-1",
          tone === "dark"
            ? "bg-[linear-gradient(90deg,rgba(142,184,255,0.55),transparent)]"
            : "bg-[linear-gradient(90deg,var(--zeon-border-blue),transparent)]",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "h-2.5 w-2.5 border-r border-t",
          tone === "dark" ? "border-[var(--zeon-royal)]" : "border-[var(--zeon-royal)]",
        )}
      />
    </div>
  );
}

export function SheetFooter({
  left,
  center,
  right,
  tone = "light",
  className,
}: {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (left == null && center == null && right == null) return null;
  return (
    <div
      className={cn(
        "relative flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] md:px-5",
        tone === "light"
          ? "border-[#E5E7EB] text-[#A4A7AE]"
          : "border-white/10 text-white/40",
        className,
      )}
    >
      {left != null ? <span>{left}</span> : <span />}
      {center != null ? <span>{center}</span> : null}
      {right != null ? <span>{right}</span> : null}
    </div>
  );
}

/** Vertical tick rail used beside large titles (Heron / Trust). */
export function TickRail({
  count = 7,
  tone = "light",
  className,
}: {
  count?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none flex justify-between", className)}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "w-px",
            tone === "dark" ? "bg-white/20" : "bg-[#D0D5DD]",
            i === 0 || i === count - 1
              ? cn("h-3", tone === "dark" ? "bg-white/40" : "bg-[#98A2B3]")
              : "h-2",
          )}
        />
      ))}
    </div>
  );
}

export function BlueprintClose({
  eyebrow = "Next conversation",
  title,
  body,
  primaryHref = "/demo",
  primaryLabel = "Book a demo",
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Kept for call-site compat; right sheet panel removed. */
  sheet?: string;
}) {
  return (
    <section className="relative border-t border-white/10 bg-[#0B0B0B] text-white">
      <div className="relative mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20">
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <h2 className="mt-3 max-w-[16ch] font-[family-name:var(--font-aeonik)] text-[clamp(1.9rem,1.25rem+2vw,2.85rem)] leading-[1.08] tracking-[-0.035em]">
          {title}
        </h2>
        <p className="mt-4 max-w-[42ch] text-[15.5px] leading-[1.6] text-white/65">
          {body}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ZeonLinkButton href={primaryHref} tone="light">
            {primaryLabel}
          </ZeonLinkButton>
          {secondaryHref && secondaryLabel ? (
            <ZeonLinkButton href={secondaryHref} tone="ghost-dark">
              {secondaryLabel}
            </ZeonLinkButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
