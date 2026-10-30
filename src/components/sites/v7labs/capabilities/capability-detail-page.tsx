"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  capabilities,
  getCapability,
  type Capability,
} from "@/components/sites/zeonai/content";
import { PageCtaBand, PageHero, PageShell } from "../page-shell";

export function CapabilitiesIndexPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="02 · Capabilities"
        title="How ZeonAI is shaping decisions across the enterprise"
        intro="One platform, every business process, and one place to enhance them."
      />
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <Link
              key={cap.id}
              href={`/platform/${cap.id}`}
              className="zeon-surface-interactive group flex flex-col p-5"
            >
              <p className="font-mono text-[10px] text-[#8A9493]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-aeonik)] text-[20px] tracking-[-0.02em] text-[#111318]">
                {cap.title}
              </h2>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#5B6766]">
                {cap.summary}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-medium text-[#0977B3] transition-[gap] duration-300 ease-out group-hover:gap-2.5">
                Open capability
                <ArrowUpRight className="size-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <PageCtaBand
        title="See these capabilities in a demo"
        body="Pick the modules that matter to your role. We will show them on a workflow from your sector."
        secondaryHref="/#platform"
        secondaryLabel="Homepage tour"
      />
    </PageShell>
  );
}

export function CapabilityDetailPage({ capability }: { capability: Capability }) {
  const related = capability.related
    .map((id) => getCapability(id))
    .filter((c): c is Capability => Boolean(c));

  return (
    <PageShell>
      <PageHero
        eyebrow={`Capability · ${capability.title}`}
        title={capability.title}
        intro={capability.summary}
        dark
      >
        <p className="mt-6 max-w-[48ch] text-[14px] leading-[1.55] text-white/50">
          {capability.sampleNote}
        </p>
        <Link
          href="/platform"
          className="mt-6 inline-flex text-[13px] text-white/55 no-underline hover:text-white"
        >
          ← Platform overview
        </Link>
      </PageHero>

      <section className="border-b border-[#DCE1E0] px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              The problem
            </p>
            <p className="mt-3 text-[17px] leading-[1.55] text-[#111318]">
              {capability.problem}
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              What it does
            </p>
            <p className="mt-3 text-[17px] leading-[1.55] text-[#111318]">
              {capability.does}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#DCE1E0] bg-[#F6F4EF]/50 px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
            How the workflow works
          </p>
          <ol className="mt-8 grid gap-3 md:grid-cols-2">
            {capability.workflow.map((step, i) => (
              <li
                key={step}
                className="zeon-surface flex gap-4 p-5"
              >
                <span className="font-mono text-[12px] text-[#0977B3]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-[1.5] text-[#111318]">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#DCE1E0] px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
            Governance
          </p>
          <p className="mt-3 max-w-[56ch] text-[17px] leading-[1.55] text-[#111318]">
            {capability.governance}
          </p>
          <p className="mt-6 max-w-[48ch] zeon-surface-quiet p-5 text-[14px] leading-[1.55] text-[#5B6766]">
            <span className="font-medium text-[#111318]">Persona scenario · </span>
            {capability.persona}
          </p>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="px-5 py-14 md:px-8 md:py-16">
          <div className="mx-auto max-w-[1180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              Related capabilities
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {related.map((cap) => (
                <Link
                  key={cap.id}
                  href={`/platform/${cap.id}`}
                  className="zeon-surface-interactive p-4"
                >
                  <h3 className="font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em]">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5B6766]">
                    {cap.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <PageCtaBand
        title={`Book a demo of ${capability.title}`}
        body="We will show this capability on a workflow from your role and sector."
        dark
        secondaryHref="/platform"
        secondaryLabel="All capabilities"
      />
    </PageShell>
  );
}
