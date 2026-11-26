"use client";

import { useRef, type ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SmoothScroll } from "./smooth-scroll";
import { ZeonLinkButton } from "./zeon-ui";
import { ScrollReveal, useAutoCardReveals } from "./motion/scroll-reveal";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  /** Optional class on outer wrapper (e.g. surface tint) */
  className?: string;
};

/** Shared chrome for supporting pages — matches homepage design system. */
export function PageShell({ children, className = "" }: PageShellProps) {
  const mainRef = useRef<HTMLElement>(null);
  useAutoCardReveals(mainRef);

  return (
    <SmoothScroll>
      <div
        className={cn(
          "v7-site min-h-screen bg-[var(--zeon-paper)] text-[var(--zeon-ink)]",
          className,
        )}
      >
        <SiteHeader />
        <main ref={mainRef}>{children}</main>
        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  intro,
  dark: _dark = false,
  children,
}: PageHeroProps) {
  void _dark;
  return (
    <header className="border-b border-[var(--zeon-border)] bg-[var(--zeon-paper)] px-[var(--zeon-gutter,1.25rem)] py-[clamp(2.75rem,2rem+3vw,6rem)] text-[var(--zeon-ink)]">
      <div className="mx-auto max-w-[var(--zeon-container,1180px)]">
        <p className="zeon-type-eyebrow">{eyebrow}</p>
        <h1 className="zeon-type-page mt-3 max-w-[18ch] text-balance sm:mt-4">
          {title}
        </h1>
        {intro ? (
          <p className="zeon-type-lead mt-4 max-w-[var(--zeon-measure-wide)] sm:mt-5">
            {intro}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  );
}

type PageCtaBandProps = {
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  dark?: boolean;
};

export function PageCtaBand({
  title,
  body,
  primaryHref = "/demo",
  primaryLabel = "Book a demo",
  secondaryHref,
  secondaryLabel,
  dark = false,
}: PageCtaBandProps) {
  return (
    <section
      className={cn(
        "zeon-section-pad px-[var(--zeon-gutter,1.25rem)]",
        dark
          ? "bg-[var(--zeon-ink)] text-white"
          : "bg-[var(--zeon-cream)] text-[var(--zeon-ink)]",
      )}
    >
      <ScrollReveal
        y={14}
        className="mx-auto flex max-w-[var(--zeon-container,1180px)] flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div className="max-w-[40rem]">
          <h2 className="zeon-type-section text-balance">{title}</h2>
          <p
            className={cn(
              "mt-3 text-[length:var(--zeon-text-body)] leading-[var(--zeon-leading-body)]",
              dark ? "text-white/55" : "text-[var(--zeon-muted)]",
            )}
          >
            {body}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ZeonLinkButton href={primaryHref} tone={dark ? "light" : "ink"}>
            {primaryLabel}
          </ZeonLinkButton>
          {secondaryHref && secondaryLabel ? (
            <ZeonLinkButton
              href={secondaryHref}
              tone={dark ? "ghost-dark" : "ghost"}
            >
              {secondaryLabel}
            </ZeonLinkButton>
          ) : null}
        </div>
      </ScrollReveal>
    </section>
  );
}
