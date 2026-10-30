"use client";

import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SmoothScroll } from "./smooth-scroll";
import { ZeonLinkButton } from "./zeon-ui";

type PageShellProps = {
  children: ReactNode;
  /** Dark ink hero band — optional class on outer wrapper */
  className?: string;
};

/** Shared chrome for supporting pages — matches homepage design system. */
export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <SmoothScroll>
      <div className={`v7-site min-h-screen bg-white text-[#111318] ${className}`}>
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
    <header className="border-b border-[#DCE1E0] bg-white px-5 py-16 text-[#111318] md:px-8 md:py-24">
      <div className="mx-auto max-w-[1180px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-[18ch] font-[family-name:var(--font-aeonik)] text-[40px] leading-[1.05] tracking-[-0.04em] md:text-[56px]">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.55] text-[#5B6766]">
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
      className={`px-5 py-16 md:px-8 md:py-20 ${
        dark ? "bg-[#010F0F] text-white" : "bg-[#F6F4EF] text-[#111318]"
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[40rem]">
          <h2 className="font-[family-name:var(--font-aeonik)] text-[28px] leading-[1.15] tracking-[-0.03em] md:text-[36px]">
            {title}
          </h2>
          <p
            className={`mt-3 text-[16px] leading-[1.55] ${
              dark ? "text-white/55" : "text-[#5B6766]"
            }`}
          >
            {body}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ZeonLinkButton
            href={primaryHref}
            tone={dark ? "light" : "ink"}
          >
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
