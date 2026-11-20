"use client";

import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SmoothScroll } from "./smooth-scroll";
import { ZeonLinkButton } from "./zeon-ui";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  /** Optional class on outer wrapper (e.g. surface tint) */
  className?: string;
};

/** Shared chrome for supporting pages — matches homepage design system. */
export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <SmoothScroll>
      <div
        className={cn(
          "v7-site min-h-screen bg-[var(--zeon-paper)] text-[var(--zeon-ink)]",
          className,
        )}
      >
        <SiteHeader />
        <main>{children}</main>
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
    <header className="border-b border-[var(--zeon-border)] bg-[var(--zeon-paper)] px-5 py-16 text-[var(--zeon-ink)] md:px-8 md:py-24">
      <div className="mx-auto max-w-[1180px]">
        <p className="zeon-type-eyebrow">{eyebrow}</p>
        <h1 className="zeon-type-page mt-4 max-w-[18ch]">{title}</h1>
        {intro ? (
          <p className="zeon-type-lead mt-5 max-w-[var(--zeon-measure-wide)]">
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
        "px-5 py-16 md:px-8 md:py-20",
        dark
          ? "bg-[var(--zeon-ink)] text-white"
          : "bg-[var(--zeon-cream)] text-[var(--zeon-ink)]",
      )}
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[40rem]">
          <h2 className="zeon-type-section">{title}</h2>
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
      </div>
    </section>
  );
}
