"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { homeNav, nav } from "./content";
import { ZeonLogo } from "./logo";

export function SiteHeader({
  dark = false,
  homeAnchors = false,
}: {
  dark?: boolean;
  homeAnchors?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = homeAnchors ? homeNav : nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open || !dark;
  const ink = solid || !dark;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        solid
          ? "border-[var(--zeon-line)] bg-[var(--zeon-paper)]/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-8">
        <a href="/" className="no-underline">
          <ZeonLogo variant={ink ? "dark" : "light"} showTagline />
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-[14px] no-underline transition-colors ${
                ink
                  ? "text-[var(--zeon-ink70)] hover:text-[var(--zeon-ink)]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/demo"
            className="inline-flex h-10 items-center rounded-full bg-[var(--zeon-blue)] px-4 text-[14px] font-medium text-white no-underline md:px-5"
          >
            Book a demo
          </a>
          <button
            type="button"
            className={`inline-flex size-10 items-center justify-center rounded-full border lg:hidden ${
              ink
                ? "border-[var(--zeon-line)] text-[var(--zeon-ink)]"
                : "border-white/20 text-white"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--zeon-line)] bg-[var(--zeon-paper)] px-5 py-4 lg:hidden">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-2.5 text-[16px] text-[var(--zeon-ink)] no-underline"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/about"
            className="block py-2.5 text-[16px] text-[var(--zeon-ink)] no-underline"
            onClick={() => setOpen(false)}
          >
            About
          </a>
        </div>
      ) : null}
    </header>
  );
}
