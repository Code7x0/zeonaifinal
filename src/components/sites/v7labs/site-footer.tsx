"use client";

import Image from "next/image";
import Link from "next/link";
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

const PARTNERS = [
  {
    name: "Manifest AI",
    src: "/sites/v7labs/partners/manifest-ai.png",
    width: 128,
    height: 128,
    markClass: "h-4 w-4 shrink-0",
    showName: true,
  },
  {
    name: "Datec",
    src: "/sites/v7labs/partners/datec.png",
    width: 280,
    height: 60,
    markClass: "h-3.5 w-auto max-w-[80px]",
    showName: false,
  },
  {
    name: "Upekkha",
    src: "/sites/v7labs/partners/upekkha.png",
    width: 280,
    height: 72,
    markClass: "h-3.5 w-auto max-w-[86px]",
    showName: false,
  },
  {
    name: "Amii",
    src: "/sites/v7labs/partners/amii.png",
    width: 160,
    height: 160,
    markClass: "h-4 w-4 shrink-0",
    showName: true,
  },
] as const;

const FLAG_SRC: Record<string, string> = {
  India: "/sites/zeonai/flags/in.svg",
  "United Arab Emirates": "/sites/zeonai/flags/ae.svg",
};

const cellBorder = "border-[#E5E7EB]";
const linkClass =
  "group/link inline-flex items-center gap-1.5 text-[13.5px] text-[#3F4654] no-underline transition-colors duration-200 hover:text-[#1B46F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B46F5]";

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
    <nav aria-label={title} className={cn("flex flex-col", className)}>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#717680]">
        {title}
      </p>
      <ul className="mt-2.5 space-y-1.5">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <FooterLink href={item.href}>{item.label}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function LocationsBlock({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#717680]">
        Locations
      </p>
      <ul className="mt-2.5 space-y-2.5">
        {offices.map((office) => (
          <li key={office.code} className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-[12px] w-[17px] shrink-0 overflow-hidden rounded-[2px] border border-[#E5E7EB]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FLAG_SRC[office.region]}
                alt=""
                width={17}
                height={12}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-medium leading-tight text-[#181D27]">
                <span className="mr-1 font-mono text-[10px] tracking-[0.06em] text-[#717680]">
                  {office.code}
                </span>
                {office.region}
              </span>
              <span className="mt-0.5 block text-[11.5px] leading-[1.35] text-[#717680]">
                {office.address}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[1] border-t border-[#E5E7EB] bg-[var(--dp-gray-50)] text-[#181D27]">
      <div
        className={cn(
          "mx-auto max-w-[var(--zeon-container-wide,1280px)]",
          `md:border-x ${cellBorder}`,
        )}
      >
        {/* Row 1 — Desktop: 4 aligned columns (Identity | Company | Platform | Resources) */}
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr]",
            `divide-y ${cellBorder} lg:divide-x lg:divide-y-0`,
          )}
        >
          {/* Identity */}
          <div className="flex flex-col justify-between p-5 md:p-6">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B46F5]"
                aria-label="ZeonAI home"
              >
                <Image
                  src="/sites/zeonai/mark.png"
                  alt=""
                  width={26}
                  height={26}
                  className="h-6 w-auto"
                />
                <span className="font-[family-name:var(--font-aeonik)] text-[17px] tracking-[-0.02em] text-[#181D27]">
                  ZeonAI
                </span>
              </Link>
              <p className="mt-3 max-w-[26ch] font-[family-name:var(--font-aeonik)] text-[17px] leading-[1.25] tracking-[-0.025em] text-[#181D27] md:text-[19px]">
                Governed AI agents for enterprise.
              </p>
              <p className="mt-1.5 max-w-[34ch] text-[13px] leading-[1.45] text-[#535862]">
                AI Workspace connects knowledge, agents and people on one
                governed platform.
              </p>
            </div>
            <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#717680]">
              India · UAE
            </p>
          </div>

          {/* Mobile 2x2 (Company | Platform / Resources | Locations) -> Desktop 3 nav columns */}
          <div className="grid grid-cols-2 lg:col-span-3 lg:grid-cols-[0.9fr_0.9fr_1fr]">
            <NavColumn
              title="Company"
              items={COMPANY}
              className={`border-b border-r ${cellBorder} p-5 md:p-6 lg:border-b-0`}
            />
            <NavColumn
              title="Platform"
              items={PLATFORM}
              className={`border-b ${cellBorder} p-5 md:p-6 lg:border-b-0 lg:border-r`}
            />
            <NavColumn
              title="Resources"
              items={RESOURCES}
              className={`border-r ${cellBorder} p-5 md:p-6 lg:border-r-0`}
            />
            <LocationsBlock className="p-5 md:p-6 lg:hidden" />
          </div>
        </div>

        {/* Row 2 — Desktop: 4 aligned columns (Locations | Contact | Social | Partners) */}
        <div
          className={cn(
            `border-t ${cellBorder}`,
            "grid grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr]",
          )}
        >
          <LocationsBlock
            className={`hidden border-r ${cellBorder} p-5 md:p-6 lg:block`}
          />

          <div className={`border-r ${cellBorder} p-5 md:p-6`}>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#717680]">
              Contact
            </p>
            <ul className="mt-2.5 space-y-1.5">
              <li>
                <a href="mailto:contact@zeonai.com" className={linkClass}>
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

          <div className={`p-5 md:p-6 lg:border-r ${cellBorder}`}>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#717680]">
              Social
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`col-span-2 border-t ${cellBorder} p-5 md:p-6 lg:col-span-1 lg:border-t-0`}
          >
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#717680]">
              Partners and programmes
            </p>
            <ul className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-4 lg:grid-cols-2">
              {PARTNERS.map((partner) => (
                <li key={partner.name} className="flex items-center gap-2">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className={`object-contain opacity-90 ${partner.markClass}`}
                  />
                  {partner.showName ? (
                    <span
                      aria-hidden
                      className="text-[13px] font-medium text-[#3F4654]"
                    >
                      {partner.name}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal strip */}
        <div
          className={cn(
            `border-t ${cellBorder}`,
            "flex flex-col gap-2 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between md:px-6",
          )}
        >
          <p className="text-[12px] leading-[1.4] text-[#717680]">
            © {year} ZeonAI Labs Private Ltd. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
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
