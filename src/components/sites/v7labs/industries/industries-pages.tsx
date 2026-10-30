"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  industries,
  type Industry,
} from "@/components/sites/zeonai/content";
import { PageShell } from "../page-shell";
import {
  Chapter,
  ChapterLabel,
  ChapterLead,
  ChapterTitle,
  SecondaryCta,
  SecondaryHero,
} from "../secondary/chapter";
import { industryScreen } from "../secondary/industry-screens";
import { FadeUp } from "../fade-up";
import { staggerDelay } from "../motion";

const TONES = ["paper", "paper", "paper", "paper", "paper", "paper"] as const;

function industryVisual(id: string) {
  return industryScreen(id);
}

export function IndustriesIndexPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Industries"
        title="Regulated, document-heavy work."
        lead="The same platform, with agents shaped for each sector. Examples from the ZeonAI agent portfolio."
        tone="ink"
        align="center"
        secondaryHref="/platform"
        secondaryLabel="Platform"
      />
      {industries.map((industry, i) => {
        const tone = TONES[i % TONES.length];
        return (
          <Chapter
            key={industry.id}
            tone={tone}
            min={false}
            className="!min-h-0 border-b border-[#DCE1E0]"
          >
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <FadeUp delay={staggerDelay(0, 0, 0.05)}>
                <ChapterLabel tone={tone}>{industry.platform}</ChapterLabel>
                <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[36px] leading-[1.05] tracking-[-0.035em] text-[#111318] md:text-[48px]">
                  {industry.label}
                </h2>
                <p className="mt-4 max-w-[42ch] text-[16px] leading-[1.55] text-[#5B6766]">
                  {industry.intro}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {industry.process.map((step, si) => (
                    <span
                      key={step}
                      className="inline-flex items-center gap-2 text-[13px] text-[#111318]"
                    >
                      {si > 0 ? (
                        <ArrowRight
                          className="size-3 text-[#8A9493]"
                          aria-hidden
                        />
                      ) : null}
                      {step}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/industries/${industry.id}`}
                  className="zeon-link-arrow mt-8 inline-flex"
                >
                  Explore {industry.label.split(" ")[0]?.toLowerCase() ?? "sector"}
                </Link>
              </FadeUp>
              <FadeUp delay={0.08}>{industryVisual(industry.id)}</FadeUp>
            </div>
          </Chapter>
        );
      })}
      <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#DCE1E0]">
        <ChapterLabel tone="paper">Same platform</ChapterLabel>
        <ChapterTitle>Sector agents. Shared governance.</ChapterTitle>
        <ChapterLead tone="paper">
          Financial services, superannuation, media, government, defence and
          manufacturing — each with agents, one control plane.
        </ChapterLead>
      </Chapter>
      <SecondaryCta
        tone="ink"
        title="See the fit for your sector"
        body="Tell us the workflow that costs you most."
        secondaryHref="/customers"
        secondaryLabel="Case studies"
      />
    </PageShell>
  );
}

export function IndustryDetailPage({ industry }: { industry: Industry }) {
  return (
    <PageShell>
      <SecondaryHero
        label={`Industry · ${industry.label}`}
        title={industry.label}
        lead={industry.intro}
        tone="ink"
        secondaryHref="/industries"
        secondaryLabel="All industries"
        visual={industryVisual(industry.id)}
      />
      <Chapter tone="cream" min={false} className="!min-h-0">
        <div className="grid gap-8 border-b border-[#DCE1E0] pb-10 md:grid-cols-2">
          <div>
            <ChapterLabel tone="cream">Process</ChapterLabel>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {industry.process.map((step, i) => (
                <span
                  key={step}
                  className="inline-flex items-center gap-2 text-[18px] tracking-[-0.02em] text-[#111318]"
                >
                  {i > 0 ? (
                    <ArrowRight className="size-4 text-[#8A9493]" aria-hidden />
                  ) : null}
                  {step}
                </span>
              ))}
            </div>
          </div>
          <div>
            <ChapterLabel tone="cream">Platform focus</ChapterLabel>
            <p className="mt-4 text-[18px] text-[#111318]">{industry.platform}</p>
          </div>
        </div>
        <ChapterLabel tone="cream">Use cases</ChapterLabel>
        <ChapterTitle>Agents for this sector.</ChapterTitle>
        <div className="mt-10 grid gap-0 md:grid-cols-2">
          {industry.useCases.map((uc, i) => (
            <article
              key={uc.title}
              className={`border-[#DCE1E0] p-6 md:p-8 ${
                i % 2 === 0 ? "md:border-r" : ""
              } border-b`}
            >
              <h3 className="font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
                {uc.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.55] text-[#5B6766]">
                {uc.body}
              </p>
              <p className="mt-4 text-[13px] text-[#5B6766]">
                Human review sits on the exceptions and approvals that change a
                record of value.
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/platform" className="zeon-btn zeon-btn-ghost">
            Platform capabilities
          </Link>
          <Link href="/customers" className="zeon-btn zeon-btn-ghost">
            Case studies
          </Link>
        </div>
      </Chapter>
      <SecondaryCta
        tone="ink"
        title="Book a demo for this industry"
        body="We will walk through a relevant workflow from your sector on AI Workspace."
        secondaryHref="/engineering"
        secondaryLabel="Engineering"
      />
    </PageShell>
  );
}
