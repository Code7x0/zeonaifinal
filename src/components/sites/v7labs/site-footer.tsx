"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { offices } from "@/components/sites/zeonai/content";
import { cn } from "@/lib/utils";

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "How we work", href: "/about#how-we-work" },
  { label: "Contact", href: "/contact" },
] as const;

const PLATFORM = [
  { label: "AI Workspace", href: "/products/ai-workspace" },
  { label: "Agent Hub", href: "/agents" },
  { label: "Products", href: "/products" },
  { label: "Integrations", href: "/integrations" },
  { label: "Technology", href: "/technology" },
  { label: "Architecture", href: "/architecture" },
] as const;

const RESOURCES = [
  { label: "Engineering", href: "/engineering" },
  { label: "Resources", href: "/resources" },
  { label: "Trust", href: "/trust" },
  { label: "Deployment", href: "/deployment" },
] as const;

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/zeonai-labs",
  },
  { label: "X", href: "https://x.com/LabsZeonai" },
  { label: "Facebook", href: "https://www.facebook.com/zeonailabs" },
] as const;

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms" },
] as const;

const PARTNERS = ["Manifest AI", "Datec", "Upekkha", "Amii"] as const;

const FLAG_SRC: Record<string, string> = {
  India: "/sites/zeonai/flags/in.svg",
  "United Arab Emirates": "/sites/zeonai/flags/ae.svg",
  Canada: "/sites/zeonai/flags/ca.svg",
};

const cellBorder = "border-[#E5E7EB]";
const linkClass =
  "group/link inline-flex items-center gap-1.5 text-[14px] text-[#3F4654] no-underline transition-colors duration-200 hover:text-[#1B46F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B46F5]";

function FooterLink({ href, children }: { href: string; children: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={linkClass}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="translate-x-0 text-[11px] text-[#A4A7AE] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:text-[#1B46F5]"
      >
        →
      </span>
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

function NavColumn({
  title,
  items,
  className,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav
      aria-label={title}
      className={cn("flex flex-col p-6 md:p-7 lg:p-8", className)}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#717680]">
        {title}
      </p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <FooterLink href={item.href}>{item.label}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Oversized outlined ZEONAI — architectural stroke wordmark */
function OutlineWordmark({ reveal }: { reveal: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12",
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
        reveal ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
      aria-hidden
    >
      {/* Construction ticks */}
      <div className="pointer-events-none absolute inset-x-4 top-3 flex justify-between md:inset-x-6 lg:inset-x-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 w-px bg-[#D0D5DD]",
              i === 0 || i === 8 ? "h-3 bg-[#98A2B3]" : "",
            )}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-4 bottom-3 flex justify-between md:inset-x-6 lg:inset-x-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 w-px bg-[#D0D5DD]",
              i === 0 || i === 8 ? "h-3 bg-[#98A2B3]" : "",
            )}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-4 left-3 flex flex-col justify-between md:inset-y-6 lg:inset-y-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="h-px w-2 bg-[#D0D5DD]" />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-4 right-3 flex flex-col justify-between md:inset-y-6 lg:inset-y-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="h-px w-2 bg-[#D0D5DD]" />
        ))}
      </div>

      <p
        className="select-none text-center font-[family-name:var(--font-aeonik)] font-medium uppercase leading-none tracking-[-0.04em] text-transparent"
        style={{
          fontSize: "clamp(3.25rem, 14.5vw, 11.5rem)",
          WebkitTextStroke: "1.35px #181D27",
        }}
      >
        ZEONAI
      </p>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#98A2B3]">
        ZeonAI Labs · Governed enterprise AI
      </p>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const reduceMotion = useReducedMotion() ?? false;
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setReveal(true);
      return;
    }
    const el = wordmarkRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setReveal(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <footer className="relative z-[1] border-t border-[#E5E7EB] bg-[var(--dp-gray-50)] text-[#181D27]">
      <div className={`mx-auto max-w-[1280px] border-x ${cellBorder}`}>
        {/* Top editorial nav grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,0.75fr)]",
            `divide-y ${cellBorder} lg:divide-x lg:divide-y-0`,
          )}
        >
          {/* Identity */}
          <div className="flex flex-col justify-between p-6 md:p-7 lg:p-8">
            <div>
              <a
                href="/"
                className="inline-flex items-center gap-2.5 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B46F5]"
                aria-label="ZeonAI home"
              >
                <Image
                  src="/sites/zeonai/mark.png"
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-auto"
                />
                <span className="font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em] text-[#181D27]">
                  ZeonAI
                </span>
              </a>
              <p className="mt-6 max-w-[22ch] font-[family-name:var(--font-aeonik)] text-[20px] leading-[1.25] tracking-[-0.03em] text-[#181D27] md:text-[22px]">
                Governed AI agents for enterprise.
              </p>
              <p className="mt-3 max-w-[32ch] text-[14px] leading-[1.5] text-[#535862]">
                AI Workspace connects knowledge, agents and people on one
                governed platform.
              </p>
            </div>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-[#717680]">
              India · UAE · Canada
            </p>
          </div>

          <NavColumn
            title="Company"
            items={COMPANY}
            className={`sm:border-l ${cellBorder} lg:border-l-0`}
          />
          <NavColumn
            title="Platform"
            items={PLATFORM}
            className={`sm:border-l-0 lg:border-l-0`}
          />
          <NavColumn title="Resources" items={RESOURCES} />

          {/* Brand mark panel */}
          <div
            className={cn(
              "flex items-center justify-center p-8 sm:col-span-2 lg:col-span-1",
              `border-t ${cellBorder} sm:border-t-0 lg:border-t-0`,
            )}
          >
            <a
              href="/"
              className="group/mark block transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B46F5]"
              aria-label="ZeonAI home"
            >
              <Image
                src="/sites/zeonai/mark.png"
                alt=""
                width={140}
                height={140}
                className="h-[100px] w-auto opacity-90 transition-opacity duration-300 group-hover/mark:opacity-100 md:h-[120px]"
              />
            </a>
          </div>
        </div>

        {/* Middle information grid */}
        <div
          className={cn(
            `border-t ${cellBorder}`,
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
            `divide-y ${cellBorder} lg:divide-x lg:divide-y-0`,
          )}
        >
          {/* Locations */}
          <div className="p-6 md:p-7 lg:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#717680]">
              Locations
            </p>
            <ul className="mt-5 space-y-4">
              {offices.map((office) => (
                <li key={office.code} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-[14px] w-[20px] shrink-0 overflow-hidden rounded-[2px] border border-[#E5E7EB] shadow-[0_1px_0_rgba(16,24,40,0.04)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={FLAG_SRC[office.region]}
                      alt=""
                      width={20}
                      height={14}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium text-[#181D27]">
                      <span className="mr-1.5 font-mono text-[11px] tracking-[0.08em] text-[#717680]">
                        {office.code}
                      </span>
                      {office.region}
                    </span>
                    <span className="mt-0.5 block max-w-[28ch] text-[12px] leading-[1.45] text-[#717680]">
                      {office.address}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="p-6 md:p-7 lg:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#717680]">
              Contact
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:contact@zeonai.com"
                  className={linkClass}
                >
                  contact@zeonai.com
                </a>
              </li>
              <li>
                <FooterLink href="/contact">Contact page</FooterLink>
              </li>
              <li>
                <FooterLink href="/demo">Book a demo</FooterLink>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="p-6 md:p-7 lg:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#717680]">
              Social
            </p>
            <ul className="mt-5 space-y-3">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div className="p-6 md:p-7 lg:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#717680]">
              Partners and programmes
            </p>
            <ul className="mt-5 space-y-2.5">
              {PARTNERS.map((name) => (
                <li
                  key={name}
                  className="text-[14px] font-medium text-[#3F4654]"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized outlined wordmark */}
        <div ref={wordmarkRef} className={`border-t ${cellBorder}`}>
          <OutlineWordmark reveal={reveal} />
        </div>

        {/* Legal strip */}
        <div
          className={cn(
            `border-t ${cellBorder}`,
            "flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-4",
          )}
        >
          <p className="text-[12px] leading-[1.45] text-[#717680]">
            © {year} ZeonAI Labs Private Ltd. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[12px] text-[#535862] no-underline transition-colors hover:text-[#1B46F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B46F5]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
