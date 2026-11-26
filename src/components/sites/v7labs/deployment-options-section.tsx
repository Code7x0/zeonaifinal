"use client";

import Link from "next/link";
import { Cloud, Server, ShieldCheck } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "./motion/scroll-reveal";

const CLOUD_PROVIDERS = [
  {
    name: "Amazon Web Services (AWS)",
    short: "AWS",
    logo: "/sites/zeonai/connectors/aws.svg?v=2",
  },
  {
    name: "Google Cloud Platform (GCP)",
    short: "Google Cloud",
    logo: "/sites/zeonai/connectors/googlecloud.svg?v=2",
  },
  {
    name: "Microsoft Azure",
    short: "Microsoft Azure",
    logo: "/sites/zeonai/connectors/azure.svg?v=2",
  },
] as const;

const DEPLOYMENT_MODES = [
  {
    id: "01",
    title: "Your Cloud",
    body: "Run inside your AWS, Google Cloud, or Microsoft Azure account with your own identity provider and network perimeter.",
    icon: Cloud,
  },
  {
    id: "02",
    title: "Private Cloud",
    body: "Dedicated single-tenant environment with isolated storage, private networking, and customer-controlled keys.",
    icon: ShieldCheck,
  },
  {
    id: "03",
    title: "On-premises",
    body: "Deploy on your own infrastructure for classified, sovereign, or air-gapped environments where data stays on site.",
    icon: Server,
  },
] as const;

export function DeploymentOptionsSection() {
  return (
    <section
      id="deployment-options"
      className="relative z-[1] scroll-mt-24 border-t border-[#E9EAEB] bg-white py-16 text-[#181D27] md:py-24"
      aria-labelledby="deployment-options-heading"
    >
      <div className="px-4 sm:px-6 md:px-[var(--zeon-gutter,1.25rem)]">
        <div className="mx-auto max-w-[1180px]">
          <ScrollReveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <header className="max-w-[40rem]">
              <h2
                id="deployment-options-heading"
                className="zeon-type-section text-balance"
              >
                Deployment Options
              </h2>
              <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.6] text-[#535862] md:text-[16px]">
                Your cloud, private cloud, or on-premises — scoped during
                discovery so documents and models stay inside your boundary.
              </p>
            </header>
            <Link href="/deployment" className="zeon-link-arrow shrink-0">
              Explore deployment options
            </Link>
          </ScrollReveal>

          {/* 01 — Supported Cloud Environments */}
          <div className="mt-10 rounded-[12px] border border-[#E9EAEB] bg-[#FAFAFA] p-5 md:p-6">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#717680]">
              Supported Cloud Environments
            </h3>
            <ScrollRevealGrid
              as="ul"
              y={34}
              delay={0.42}
              stagger={0.22}
              className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {CLOUD_PROVIDERS.map((provider) => (
                <li
                  key={provider.short}
                  className="flex items-center gap-4 rounded-[8px] border border-[#E9EAEB] bg-white px-5 py-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[8px] border border-[#ECEEF2] bg-[#F8FAFC]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-medium text-[#181D27]">
                      {provider.short}
                    </span>
                    <span className="block truncate text-[12px] text-[#717680]">
                      {provider.name}
                    </span>
                  </span>
                </li>
              ))}
            </ScrollRevealGrid>
          </div>

          {/* 02 — Deployment Models */}
          <div className="mt-8">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#717680]">
              Deployment Models
            </h3>
            <ScrollRevealGrid
              delay={0.42}
              stagger={0.24}
              className="mt-3.5 grid gap-4 md:grid-cols-3"
            >
              {DEPLOYMENT_MODES.map((mode) => {
                const Icon = mode.icon;
                return (
                  <div
                    key={mode.id}
                    className="zeon-surface flex flex-col p-6"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex size-8 items-center justify-center rounded-[8px] bg-[#EEF4FF] text-[#1B46F5]">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className="font-mono text-[11px] text-[#717680]">
                        MODE {mode.id}
                      </span>
                    </div>
                    <h4 className="mt-4 font-[family-name:var(--font-aeonik)] text-[20px] font-normal tracking-[-0.02em] text-[#181D27]">
                      {mode.title}
                    </h4>
                    <p className="mt-2 text-[14px] leading-[1.55] text-[#535862]">
                      {mode.body}
                    </p>
                  </div>
                );
              })}
            </ScrollRevealGrid>
          </div>
        </div>
      </div>
    </section>
  );
}
