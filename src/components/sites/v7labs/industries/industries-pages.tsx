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
import {
  VIDEO_ASSETS,
  VideoSection,
  getVideoAsset,
  industryVideoId,
} from "@/components/sites/v7labs/video";

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
            className="!min-h-0 border-b border-[#E9EAEB]"
          >
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <FadeUp delay={staggerDelay(0, 0, 0.05)}>
                <ChapterLabel tone={tone}>{industry.platform}</ChapterLabel>
                <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[36px] leading-[1.05] tracking-[-0.035em] text-[#181D27] md:text-[48px]">
                  {industry.label}
                </h2>
                <p className="mt-4 max-w-[42ch] text-[16px] leading-[1.55] text-[#535862]">
                  {industry.intro}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {industry.process.map((step, si) => (
                    <span
                      key={step}
                      className="inline-flex items-center gap-2 text-[13px] text-[#181D27]"
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
      <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#E9EAEB]">
        <ChapterLabel tone="paper">Same platform</ChapterLabel>
        <ChapterTitle>Sector agents. Shared governance.</ChapterTitle>
        <ChapterLead tone="paper">
          Financial services, superannuation, media, government, defense,
          manufacturing, construction, telco, and medtech — each with agents, one
          control plane.
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
  const sectorVideoId = industryVideoId(industry.id);
  const hasSectorVideo = sectorVideoId in VIDEO_ASSETS;
  const sectorVideoAsset = hasSectorVideo
    ? getVideoAsset(sectorVideoId)
    : null;

  return (
    <PageShell>
      <SecondaryHero
        label={`Industry · ${industry.label}`}
        title={industry.label}
        lead={industry.intro}
        tone="ink"
        secondaryHref="/industries"
        secondaryLabel="All industries"
        visual={hasSectorVideo ? undefined : industryVisual(industry.id)}
      />

      {hasSectorVideo && sectorVideoAsset ? (
        <Chapter tone="paper" min={false} className="!min-h-0">
          <VideoSection
            assetId={sectorVideoId}
            eyebrow="Sector workflow"
            headline={industry.label}
            body={industry.intro}
            after={`Sample flow: ${industry.process.join(" → ")}. ${sectorVideoAsset.description}`}
            layout="split"
            cta={
              <Link href="/demo" className="zeon-btn zeon-btn-ink">
                Book a demo
              </Link>
            }
          />
        </Chapter>
      ) : null}

      {"sectorProblem" in industry && industry.sectorProblem ? (
        <Chapter tone="paper" min={false} className="!min-h-0 border-b border-[#E9EAEB]">
          <ChapterLabel>Sector problem</ChapterLabel>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.55] text-[#535862]">
            {industry.sectorProblem}
          </p>
          {"workedExample" in industry && industry.workedExample ? (
            <div className="mt-10">
              <ChapterLabel>Worked example</ChapterLabel>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.55] text-[#535862]">
                {industry.workedExample}
              </p>
            </div>
          ) : null}
          {"howAgentsAddress" in industry && industry.howAgentsAddress ? (
            <div className="mt-10">
              <ChapterLabel>How agents address it</ChapterLabel>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.55] text-[#535862]">
                {industry.howAgentsAddress}
              </p>
            </div>
          ) : null}
          {"relevantProduct" in industry && industry.relevantProduct ? (
            <p className="mt-8 font-mono text-[13px] text-[#1B46F5]">
              {industry.relevantProduct}
            </p>
          ) : null}
        </Chapter>
      ) : null}

      <Chapter tone="cream" min={false} className="!min-h-0">
        <div className="grid gap-8 border-b border-[#E9EAEB] pb-10 md:grid-cols-2">
          <div>
            <ChapterLabel tone="cream">Process</ChapterLabel>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {industry.process.map((step, i) => (
                <span
                  key={step}
                  className="inline-flex items-center gap-2 text-[18px] tracking-[-0.02em] text-[#181D27]"
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
            <p className="mt-4 text-[18px] text-[#181D27]">{industry.platform}</p>
          </div>
        </div>
        <ChapterLabel tone="cream">Use cases</ChapterLabel>
        <ChapterTitle>Agents for this sector.</ChapterTitle>
        <div className="mt-10 grid gap-0 md:grid-cols-2">
          {industry.useCases.map((uc, i) => (
            <article
              key={uc.title}
              className={`border-[#E9EAEB] p-6 md:p-8 ${
                i % 2 === 0 ? "md:border-r" : ""
              } border-b`}
            >
              <h3 className="font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
                {uc.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.55] text-[#535862]">
                {uc.body}
              </p>
              <p className="mt-4 text-[13px] text-[#535862]">
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
