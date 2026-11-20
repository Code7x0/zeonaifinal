"use client";

import Link from "next/link";
import { type Industry, industries } from "@/components/sites/zeonai/content";
import { cn } from "@/lib/utils";
import {
  Band,
  BlueprintClose,
  Corners,
  DrawingIndex,
  Eyebrow,
  Lead,
  Panel,
  SheetFooter,
  SheetMeta,
  StrokeWord,
  Title,
} from "../blueprint";
import { SectorGlyph } from "../drawing-glyphs";
import { IndustriesGatewayHero } from "../industries-gateway-hero";
import { PageShell } from "../page-shell";
import { industryScreen } from "../secondary/industry-screens";
import {
  VIDEO_ASSETS,
  VideoSection,
  getVideoAsset,
  industryVideoId,
} from "@/components/sites/v7labs/video";
import { ZeonLinkButton } from "../zeon-ui";

function industryVisual(id: string) {
  return industryScreen(id);
}

export function IndustriesIndexPage() {
  return (
    <PageShell className="bg-[#FAFBFC]">
      <IndustriesGatewayHero
        label="Industries"
        title="Regulated, document-heavy work."
        lead="The same platform, with agents shaped for each sector. Examples from the ZeonAI agent portfolio."
        secondaryHref="/platform"
        secondaryLabel="Platform"
      />

      <Band tone="sky" id="sectors">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>01 · Sectors</Eyebrow>
            <Title>
              Sector agents.{" "}
              <StrokeWord color="var(--zeon-royal)">Shared governance.</StrokeWord>
            </Title>
            <Lead>
              Financial services, superannuation, media, government, defense,
              manufacturing, construction, telco, and medtech — each with agents,
              one control plane.
            </Lead>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 01 / 03 · Index
          </p>
        </div>

        <Panel className="mt-12">
          <SheetMeta
            left="DWG NO. ZEON-IND-00"
            right={`${industries.length} SECTORS`}
          />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <li
                key={ind.id}
                className={cn(
                  "list-none border-b border-[#E5E7EB]",
                  "sm:border-r sm:[&:nth-child(2n)]:border-r-0",
                  "lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0",
                )}
              >
                <Link
                  href={`/industries/${ind.id}`}
                  className="group relative flex min-h-[156px] flex-col justify-between p-5 no-underline transition-colors hover:bg-[color-mix(in_srgb,var(--zeon-sky)_70%,white)] md:p-6"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-[var(--zeon-royal)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="h-2 w-2 border-r border-t border-[var(--zeon-border-blue)] transition-colors group-hover:border-[var(--zeon-royal)]"
                    />
                  </span>
                  <span>
                    <span className="block font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em] text-[#181D27] transition-colors group-hover:text-[var(--zeon-royal)]">
                      {ind.label}
                    </span>
                    <span className="mt-2 block text-[13.5px] leading-[1.5] text-[#535862]">
                      {ind.intro}
                    </span>
                  </span>
                  <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[#A4A7AE] transition-colors group-hover:text-[var(--zeon-royal)]">
                    Open →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <SheetFooter center="Scale 1:1" right="Tol. ±0.0%" />
        </Panel>
      </Band>

      <Band tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow tone="dark">02 · Control plane</Eyebrow>
            <Title tone="dark">
              One stack. Every{" "}
              <StrokeWord>sector.</StrokeWord>
            </Title>
            <Lead tone="dark">
              Access checks, human review and the audit log travel with every
              agent — from intake to the ERP post.
            </Lead>
          </div>
          <Panel tone="dark">
            <SheetMeta tone="dark" left="DWG NO. ZEON-IND-CTL" right="PLANE" />
            <ul className="space-y-0 px-5 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-white/55 md:px-6">
              <li className="flex justify-between border-b border-white/10 py-4">
                <span>Access</span>
                <span className="text-[#8EB8FF]">Checked first</span>
              </li>
              <li className="flex justify-between border-b border-white/10 py-4">
                <span>Review</span>
                <span className="text-[#8EB8FF]">Named person</span>
              </li>
              <li className="flex justify-between py-4">
                <span>Audit</span>
                <span className="text-[#8EB8FF]">Append only</span>
              </li>
            </ul>
            <div className="border-t border-white/10 px-5 py-4 md:px-6">
              <ZeonLinkButton href="/platform" tone="light">
                Platform
              </ZeonLinkButton>
            </div>
          </Panel>
        </div>
      </Band>

      <Band tone="royal">
        <Eyebrow tone="on-royal">03 · Next</Eyebrow>
        <Title tone="on-royal" className="max-w-[16ch]">
          Pick the sector that matches your work.
        </Title>
        <Lead tone="on-royal">
          Open a sheet above, or book a demo and we will map one workflow with
          you.
        </Lead>
      </Band>

      <BlueprintClose
        title="See the fit for your sector"
        body="Tell us the workflow that costs you most."
        secondaryHref="/customers"
        secondaryLabel="Case studies"
        sheet="Industries / Final"
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
  const sheetCode = industry.id.slice(0, 6).toUpperCase();

  return (
    <PageShell className="bg-[#FAFBFC]">
      <Band tone="ink" className="!py-0">
        <div className="grid items-end gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <Eyebrow tone="dark">Industry · {industry.label}</Eyebrow>
            <h1 className="mt-4 max-w-[14ch] font-[family-name:var(--font-aeonik)] text-[clamp(2.25rem,1.4rem+2.8vw,3.5rem)] leading-[1.05] tracking-[-0.04em] text-white">
              {industry.label}
            </h1>
            <Lead tone="dark">{industry.intro}</Lead>
            <div className="mt-8 flex flex-wrap gap-3">
              <ZeonLinkButton href="/demo" tone="light" size="lg">
                Book a demo
              </ZeonLinkButton>
              <ZeonLinkButton href="/industries" tone="ghost-dark" size="lg">
                All industries
              </ZeonLinkButton>
            </div>
          </div>
          {!hasSectorVideo ? (
            <Panel tone="dark" className="p-3 md:p-4">
              <SheetMeta tone="dark" left={`ZEON-IND-${sheetCode}`} right="PREVIEW" />
              <div className="p-2">{industryVisual(industry.id)}</div>
            </Panel>
          ) : (
            <div className="relative border border-white/12 bg-[#0B0B0B]/55 backdrop-blur-sm">
              <Corners tone="light" />
              <dl className="px-5 py-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <dt>DWG</dt>
                  <dd className="text-white/70">ZEON-IND-{sheetCode}</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 py-3">
                  <dt>Platform</dt>
                  <dd className="max-w-[22ch] text-right text-white/70">
                    {industry.platform}
                  </dd>
                </div>
                <div className="flex justify-between pt-3">
                  <dt>Process</dt>
                  <dd className="text-right text-white/70">
                    {industry.process.join(" → ")}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </Band>

      {hasSectorVideo && sectorVideoAsset ? (
        <Band tone="hero">
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
        </Band>
      ) : null}

      {"sectorProblem" in industry && industry.sectorProblem ? (
        <Band tone="sky">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>01 · Context</Eyebrow>
              <Title>Problem, example, response.</Title>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
              Sheet 01 · Brief
            </p>
          </div>
          <Panel className="mt-10">
            <SheetMeta left={`DWG NO. ZEON-IND-${sheetCode}-A`} right="CONTEXT" />
            <div className="grid md:grid-cols-3 md:divide-x md:divide-[#E5E7EB]">
              <div className="border-b border-[#E5E7EB] p-6 md:border-b-0 md:p-8">
                <DrawingIndex n="01" />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--zeon-royal)]">
                  Sector problem
                </p>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#414651]">
                  {industry.sectorProblem}
                </p>
              </div>
              {"workedExample" in industry && industry.workedExample ? (
                <div className="border-b border-[#E5E7EB] p-6 md:border-b-0 md:p-8">
                  <DrawingIndex n="02" />
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--zeon-royal)]">
                    Worked example
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.55] text-[#414651]">
                    {industry.workedExample}
                  </p>
                </div>
              ) : null}
              {"howAgentsAddress" in industry && industry.howAgentsAddress ? (
                <div className="p-6 md:p-8">
                  <DrawingIndex n="03" />
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--zeon-royal)]">
                    How agents address it
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.55] text-[#414651]">
                    {industry.howAgentsAddress}
                  </p>
                  {"relevantProduct" in industry && industry.relevantProduct ? (
                    <p className="mt-6 font-mono text-[12px] text-[var(--zeon-royal)]">
                      {industry.relevantProduct}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
            <SheetFooter right={`ZEON-IND-${sheetCode}`} />
          </Panel>
        </Band>
      ) : null}

      <Band tone="paper">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>02 · Process · Platform</Eyebrow>
            <Title>
              From intake to{" "}
              <StrokeWord color="var(--zeon-royal)">approve.</StrokeWord>
            </Title>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 02 · Flow
          </p>
        </div>

        <Panel className="mt-10">
          <SheetMeta
            left={`DWG NO. ZEON-IND-${sheetCode}`}
            right={industry.platform}
          />
          <div className="grid md:grid-cols-[1.2fr_0.8fr] md:divide-x md:divide-[#E5E7EB]">
            <div className="border-b border-[#E5E7EB] p-6 md:border-b-0 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#717680]">
                Process
              </p>
              <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-3">
                {industry.process.map((step, i) => (
                  <li
                    key={step}
                    className="inline-flex list-none items-center gap-2"
                  >
                    {i > 0 ? (
                      <span
                        aria-hidden
                        className="font-mono text-[12px] text-[var(--zeon-royal)]"
                      >
                        →
                      </span>
                    ) : null}
                    <span className="relative border border-[var(--zeon-border-blue)] bg-[var(--zeon-sky)] px-3 py-1.5 font-[family-name:var(--font-aeonik)] text-[15px] tracking-[-0.02em] text-[#181D27]">
                      <Corners tone="blue" className="!inset-0 scale-90" />
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="p-6 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#717680]">
                Platform focus
              </p>
              <div className="mt-5 border border-[#E5E7EB] bg-[#FAFBFC] px-2 py-2">
                <SectorGlyph id={industry.id} />
              </div>
              <p className="mt-4 font-[family-name:var(--font-aeonik)] text-[20px] tracking-[-0.02em] text-[#181D27]">
                {industry.platform}
              </p>
            </div>
          </div>
          <SheetFooter center="Flow" right="Governed" />
        </Panel>
      </Band>

      <Band tone="mist">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>03 · Use cases</Eyebrow>
            <Title>Agents for this sector.</Title>
            <Lead>
              Human review sits on the exceptions and approvals that change a
              record of value.
            </Lead>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 03 · Cases
          </p>
        </div>

        <Panel className="mt-12">
          <SheetMeta
            left="USE CASES"
            right={`${industry.useCases.length} AGENTS`}
          />
          <div className="grid md:grid-cols-2 md:divide-x md:divide-[#E5E7EB]">
            {industry.useCases.map((uc, i) => (
              <article
                key={uc.title}
                className="border-b border-[#E5E7EB] p-6 last:border-b-0 md:p-8"
              >
                <DrawingIndex n={i + 1} />
                <h3 className="mt-5 font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em] text-[#181D27]">
                  {uc.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#535862]">
                  {uc.body}
                </p>
              </article>
            ))}
          </div>
          <SheetFooter
            center={
              <span className="flex flex-wrap gap-4">
                <Link href="/platform" className="text-[var(--zeon-royal)] no-underline">
                  Platform
                </Link>
                <Link href="/customers" className="text-[var(--zeon-royal)] no-underline">
                  Case studies
                </Link>
              </span>
            }
          />
        </Panel>
      </Band>

      <BlueprintClose
        title="Book a demo for this industry"
        body="We will walk through a relevant workflow from your sector on AI Workspace."
        secondaryHref="/engineering"
        secondaryLabel="Engineering"
        sheet={`Industries / ${industry.label}`}
      />
    </PageShell>
  );
}
