"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { FadeUp } from "../fade-up";
import { ZeonLinkButton } from "../zeon-ui";
import { cn } from "@/lib/utils";

/**
 * Colour chapters for supporting pages.
 * Rhythm: midnight / cream / royal / sky / paper / mist — not every page
 * uses every tone; pick by content.
 */
export type ChapterTone =
  | "ink"
  | "midnight"
  | "cream"
  | "paper"
  | "mist"
  | "sky"
  | "blue"
  | "royal";

const toneClass: Record<ChapterTone, string> = {
  ink: "bg-[var(--zeon-midnight)] text-white",
  midnight: "bg-[var(--zeon-navy)] text-white",
  cream: "bg-[var(--zeon-cream)] text-[var(--zeon-ink)]",
  paper: "bg-white text-[var(--zeon-ink)]",
  mist: "bg-[#E8ECF4] text-[var(--zeon-ink)]",
  sky: "bg-[var(--zeon-sky)] text-[var(--zeon-ink)]",
  blue: "bg-[var(--zeon-royal)] text-white",
  royal:
    "bg-[image:var(--zeon-gradient-royal)] text-white",
};

const mutedClass: Record<ChapterTone, string> = {
  ink: "text-white/65",
  midnight: "text-white/65",
  cream: "text-[var(--zeon-muted)]",
  paper: "text-[var(--zeon-muted)]",
  mist: "text-[var(--zeon-muted)]",
  sky: "text-[#475569]",
  blue: "text-white/80",
  royal: "text-white/80",
};

/** Labels on dark chapters — full white for premium contrast */
const labelClass: Record<ChapterTone, string> = {
  ink: "text-white",
  midnight: "text-white",
  cream: "text-[var(--zeon-muted)]",
  paper: "text-[var(--zeon-muted)]",
  mist: "text-[var(--zeon-muted)]",
  sky: "text-[#475569]",
  blue: "text-white",
  royal: "text-white",
};

/** Full-bleed colour chapter — secondary pages only. */
export function Chapter({
  tone = "paper",
  id,
  className,
  children,
  min = true,
}: {
  tone?: ChapterTone;
  id?: string;
  className?: string;
  children: ReactNode;
  /** At least ~one viewport of presence */
  min?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        toneClass[tone],
        min && "min-h-[min(90svh,880px)]",
        "px-5 py-16 md:px-8 md:py-24",
        className,
      )}
    >
      <div className="mx-auto max-w-[1180px]">{children}</div>
    </section>
  );
}

export function ChapterLabel({
  children,
  tone = "paper",
}: {
  children: ReactNode;
  tone?: ChapterTone;
}) {
  return (
    <p
      className={cn(
        "text-[13px] font-medium tracking-[-0.01em]",
        labelClass[tone],
      )}
    >
      {children}
    </p>
  );
}

export function ChapterTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mt-3 max-w-[16ch] font-[family-name:var(--font-aeonik)] text-[40px] leading-[1.02] tracking-[-0.04em] md:text-[56px] lg:text-[64px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function ChapterLead({
  children,
  tone = "paper",
}: {
  children: ReactNode;
  tone?: ChapterTone;
}) {
  return (
    <p
      className={cn(
        "mt-5 max-w-[46ch] text-[17px] leading-[1.55] md:text-[18px]",
        mutedClass[tone],
      )}
    >
      {children}
    </p>
  );
}

type SecondaryHeroProps = {
  label: string;
  title: string;
  lead: string;
  tone?: ChapterTone;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  visual?: ReactNode;
  /** Split sticky visual (taste split-stage) */
  split?: boolean;
  /** Centered editorial hero — no side visual */
  align?: "start" | "center";
};

export function SecondaryHero({
  label,
  title,
  lead,
  tone: _tone = "paper",
  primaryHref = "/demo",
  primaryLabel = "Book a demo",
  secondaryHref,
  secondaryLabel,
  visual,
  split = true,
  align = "start",
}: SecondaryHeroProps) {
  // Supporting-page heroes stay white; homepage uses its own Hero.
  void _tone;
  const tone: ChapterTone = "paper";
  const centered = align === "center";

  return (
    <header className={cn(toneClass[tone], "relative overflow-hidden")}>
      <div
        className={cn(
          "relative mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28",
          centered
            ? "flex flex-col items-center text-center"
            : "grid gap-10",
          !centered &&
            split &&
            visual &&
            "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 lg:py-24",
        )}
      >
        <FadeUp
          className={cn(
            "min-w-0",
            centered && "mx-auto flex w-full max-w-[44rem] flex-col items-center",
          )}
        >
          <ChapterLabel tone={tone}>{label}</ChapterLabel>
          <h1
            className={cn(
              "mt-4 font-[family-name:var(--font-aeonik)] text-[44px] leading-[1.02] tracking-[-0.045em] text-[#111318] md:text-[60px] lg:text-[68px]",
              centered ? "max-w-[16ch]" : "max-w-[14ch]",
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mt-5 text-[17px] leading-[1.55] md:text-[18px]",
              centered ? "mx-auto max-w-[40ch]" : "max-w-[42ch]",
              mutedClass[tone],
            )}
          >
            {lead}
          </p>
          <div
            className={cn(
              "mt-9 flex flex-wrap gap-3",
              centered && "justify-center",
            )}
          >
            <ZeonLinkButton href={primaryHref} tone="ink">
              {primaryLabel}
            </ZeonLinkButton>
            {secondaryHref && secondaryLabel ? (
              <ZeonLinkButton href={secondaryHref} tone="ghost">
                {secondaryLabel}
              </ZeonLinkButton>
            ) : null}
          </div>
        </FadeUp>
        {!centered && visual ? (
          <FadeUp
            delay={0.08}
            className={cn("min-w-0", split && "lg:sticky lg:top-28")}
          >
            {visual}
          </FadeUp>
        ) : null}
      </div>
    </header>
  );
}

export function SecondaryCta({
  title,
  body,
  tone = "ink",
  primaryHref = "/demo",
  primaryLabel = "Book a demo",
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  body: string;
  tone?: ChapterTone;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const dark =
    tone === "ink" ||
    tone === "blue" ||
    tone === "royal" ||
    tone === "midnight";
  return (
    <Chapter tone={tone} min={false} className="!min-h-0 py-16 md:py-20">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[36rem]">
          <h2 className="font-[family-name:var(--font-aeonik)] text-[32px] leading-[1.1] tracking-[-0.03em] md:text-[44px]">
            {title}
          </h2>
          <p className={cn("mt-3 text-[16px] leading-[1.55]", mutedClass[tone])}>
            {body}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ZeonLinkButton href={primaryHref} tone={dark ? "light" : "ink"}>
            {primaryLabel}
          </ZeonLinkButton>
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className={cn(
                "zeon-btn",
                dark ? "zeon-btn-ghost-dark" : "zeon-btn-ghost",
              )}
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </Chapter>
  );
}
