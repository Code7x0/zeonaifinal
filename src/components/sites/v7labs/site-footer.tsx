"use client";

import { offices } from "@/components/sites/zeonai/content";
import { FadeUp } from "./fade-up";
import { V7Logo } from "./logo";

const NAV = [
  { label: "ZeonAI", href: "/" },
  { label: "Platform", href: "/platform" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Architecture", href: "/architecture" },
  { label: "Case studies", href: "/customers" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Trust", href: "/trust" },
  { label: "Contact", href: "/contact" },
  { label: "Book a demo", href: "/demo" },
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
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
] as const;

const mutedLink =
  "text-[#8A8A8A] no-underline transition hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function SiteFooter() {
  return (
    <footer className="relative z-[1] overflow-hidden border-t border-[#1A1A1A] bg-[#0A090A] text-[#F5F5F5]">
      {/* Utility band — brand, nav, offices */}
      <div className="relative z-20 mx-auto max-w-[1180px] px-5 md:px-8">
        <FadeUp className="grid gap-12 border-b border-[#1F1F1F] py-14 md:py-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:gap-20">
          <div className="max-w-[34rem]">
            <a
              href="/"
              className="inline-flex text-white no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="ZeonAI home"
            >
              <V7Logo className="text-[18px]" />
            </a>

            <p className="mt-6 max-w-[36ch] text-[16px] leading-[1.45] tracking-[-0.015em] text-[#F5F5F5] md:text-[18px]">
              Governed AI for enterprise knowledge and workflows.
            </p>
            <p className="mt-2 text-[14px] leading-[1.5] text-[#8A8A8A]">
              AI Workspace, the enterprise AI platform.
            </p>

            <a
              href="mailto:contact@zeonai.com"
              className="mt-7 inline-block text-[15px] font-medium text-white no-underline transition hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              contact@zeonai.com
            </a>
            <p className="mt-2">
              <a
                href="mailto:contact@zeonai.com"
                className="text-[13px] text-[#8A8A8A] no-underline transition hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Talk to our team
              </a>
            </p>
          </div>

          <nav aria-label="Footer" className="lg:pt-1">
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[15px] text-[#F0F0F0] no-underline transition hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </FadeUp>

        <FadeUp delay={0.08} className="border-b border-[#1F1F1F] py-10 md:py-12">
          <h2 className="font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em] text-white md:text-[20px]">
            Offices
          </h2>
          <div className="mt-6 grid gap-0 sm:grid-cols-3">
            {offices.map((office, i) => (
              <div
                key={office.region}
                className={`py-5 sm:py-0 ${
                  i < offices.length - 1
                    ? "border-b border-[#222222] sm:border-b-0 sm:border-r sm:border-[#222222] sm:pr-8 lg:pr-10"
                    : ""
                } ${i > 0 ? "sm:pl-8 lg:pl-10" : ""}`}
              >
                <p className="flex items-center gap-2 text-[14px] font-medium text-white">
                  <span aria-hidden className="text-[16px] leading-none">
                    {office.flag}
                  </span>
                  {office.region}
                </p>
                <p className="mt-2 max-w-[28ch] text-[13px] leading-[1.55] text-[#8A8A8A]">
                  {office.address}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp
          delay={0.12}
          className="flex flex-col gap-5 py-6 text-[12px] md:flex-row md:items-center md:justify-between md:gap-8 md:py-7"
        >
          <p className="text-[#8A8A8A]">
            © 2026 ZeonAI Labs Private Ltd. All Rights Reserved
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <a href="mailto:contact@zeonai.com" className={mutedLink}>
                contact@zeonai.com
              </a>
            </li>
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={mutedLink}
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
            {LEGAL.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={mutedLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </footer>
  );
}
