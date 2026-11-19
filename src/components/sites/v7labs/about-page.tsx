"use client";

import Link from "next/link";
import { processSteps } from "@/components/sites/zeonai/content";
import { PageShell } from "./page-shell";
import {
  Chapter,
  ChapterLabel,
  ChapterLead,
  ChapterTitle,
  SecondaryCta,
  SecondaryHero,
} from "./secondary/chapter";
import { FadeUp } from "./fade-up";
import { VideoSection } from "@/components/sites/v7labs/video";
import { PartnersProgramsStrip } from "./partners-programs-strip";
import { staggerDelay } from "./motion";

const PRINCIPLES = [
  {
    id: "01",
    title: "Proof over promise",
    body: "Every claim has a number, a customer or a certification beside it. If we can't evidence it, we don't say it.",
  },
  {
    id: "02",
    title: "Action and attention",
    body: "Minimize the time something takes and the cognitive load of doing it. The page as much as the product.",
  },
  {
    id: "03",
    title: "People decide",
    body: "Agents extract, match and draft. Anything that changes a record of value goes to a named person first, and the log says who.",
  },
] as const;

export function AboutPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="About ZeonAI"
        title="Built with the people who'll use it."
        lead="ZeonAI Labs builds AI Workspace. Manifest AI is a channel partner and separate company that discovers friction, designs agents and takes use cases into production on the same platform."
        tone="ink"
        primaryHref="/demo"
        primaryLabel="Talk to our team"
        secondaryHref="/about#how-we-work"
        secondaryLabel="How we work"
      />

      <Chapter tone="paper" min={false} className="!min-h-0">
        <VideoSection
          assetId="about-founder"
          eyebrow="Governed AI"
          headline="Why governed AI matters."
          body="We work alongside customers on document-heavy workflows — access control, human review and an audit log are part of the platform, not an afterthought."
          after="What you will see when founder footage is ready: how ZeonAI partners through discovery and into production."
          layout="split"
          cta={
            <Link href="/demo" className="zeon-btn zeon-btn-ink">
              Talk to our team
            </Link>
          }
        />
      </Chapter>

      <PartnersProgramsStrip variant="paper" />

      <Chapter tone="royal" min={false} className="!min-h-0">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <ChapterLabel tone="royal">Presence</ChapterLabel>
            <p className="mt-3 text-[20px] leading-[1.4] tracking-[-0.02em] text-white">
              India · United Arab Emirates · Canada
            </p>
          </div>
          <div>
            <ChapterLabel tone="royal">Sectors</ChapterLabel>
            <p className="mt-3 text-[20px] leading-[1.4] tracking-[-0.02em] text-white">
              Financial services · Superannuation · Media · Government · Defense ·
              Metals and manufacturing · Construction · Medtech · Telco · Property
            </p>
          </div>
        </div>
      </Chapter>

      <Chapter tone="sky" min={false} className="!min-h-0">
        <ChapterLabel tone="sky">Principles</ChapterLabel>
        <ChapterTitle>Three things we hold to.</ChapterTitle>
        <div className="mt-12 grid gap-0 md:grid-cols-2">
          {PRINCIPLES.map((item, i) => (
            <FadeUp
              key={item.id}
              delay={staggerDelay(i, 0, 0.06)}
              className={`border-[#E9EAEB] p-6 md:p-8 ${
                i % 2 === 0 ? "md:border-r" : ""
              } border-b`}
            >
              <p className="font-mono text-[12px] text-[#1d5fbf]">{item.id}</p>
              <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#535862]">
                {item.body}
              </p>
            </FadeUp>
          ))}
        </div>
      </Chapter>

      <Chapter tone="paper" id="how-we-work" min={false} className="!min-h-0">
        <ChapterLabel>How we work</ChapterLabel>
        <ChapterTitle>Problem to production.</ChapterTitle>
        <ChapterLead>
          Manifest AI is a channel partner and separate company that runs
          discovery and delivery beside the ZeonAI Labs product team.
        </ChapterLead>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {processSteps.map((step) => (
            <li
              key={step.id}
              className="list-none rounded-[12px] border border-[#E9EAEB] bg-[#FAFAFA]/50 p-6"
            >
              <p className="font-mono text-[11px] text-[#1d5fbf]">{step.id}</p>
              <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-1 text-[12px] text-[#8A9493]">{step.timing}</p>
              <p className="mt-4 text-[15px] leading-[1.55] text-[#535862]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-[13px] text-[#535862]">
          Full delivery steps are on this page — see{" "}
          <a href="#how-we-work" className="zeon-link">
            How we work
          </a>
          .
        </p>
      </Chapter>

      <SecondaryCta
        tone="ink"
        title="Ready to move from pilot to production?"
        body="Pick one high-value use case. We run a proof of value with a clear path to scale."
        secondaryHref="/customers"
        secondaryLabel="Case studies"
      />
    </PageShell>
  );
}
