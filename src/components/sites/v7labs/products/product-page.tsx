"use client";

import Link from "next/link";
import { industries } from "@/components/sites/zeonai/content";
import { cn } from "@/lib/utils";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
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
  TickRail,
  Title,
} from "../blueprint";
import { ProductGlyph } from "../drawing-glyphs";
import { PageShell } from "../page-shell";
import { ProductVortexHero } from "../product-vortex-hero";
import { ZeonLinkButton } from "../zeon-ui";
import { PRODUCT_VIDEO, ProductVideo, getVideoAsset } from "@/components/sites/v7labs/video";
import type { ProductDef } from "./product-data";
import {
  ArchitectureDepth,
  CashflowPreview,
  DocExtractPreview,
  InvoiceMatchPreview,
  ProbeAskPreview,
  WorkflowStrip,
} from "./product-ui";

function HeroVisual({ slug }: { slug: ProductDef["slug"] }) {
  const videoId = PRODUCT_VIDEO[slug];
  if (videoId) {
    const asset = getVideoAsset(videoId);
    if (asset.status === "ready" && asset.src) {
      return (
        <ProductVideo
          assetId={videoId}
          tone="light"
          preferAutoplay
          frameClassName="!shadow-none"
        />
      );
    }
  }
  if (slug === "docai") return <DocExtractPreview />;
  if (slug === "invoiceai") return <InvoiceMatchPreview />;
  if (slug === "cashfloai") return <CashflowPreview />;
  return <ProbeAskPreview />;
}

export function ProductPage({ product }: { product: ProductDef }) {
  const isProbe = product.slug === "ai-workspace";
  const code = product.slug.replace(/[^a-z]/gi, "").slice(0, 6).toUpperCase();

  return (
    <PageShell className="bg-[var(--dp-gray-50)]">
      {isProbe ? (
        <ProductVortexHero
          label={product.label}
          title={product.title}
          lead={product.lead}
          secondaryHref="#workflow"
          secondaryLabel="See how it works"
        />
      ) : (
        <FluidParticlesBackground
          tone="zeon"
          particleCount={1000}
          className="min-h-[min(640px,100svh)] border-b border-white/10"
        >
          <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#8EB8FF]">
                {product.label}
              </p>
              <h1 className="mt-4 max-w-[15ch] font-[family-name:var(--font-aeonik)] text-[clamp(2.2rem,1.4rem+2.8vw,3.4rem)] leading-[1.04] tracking-[-0.04em] text-white">
                {product.title}
              </h1>
              <p className="mt-5 max-w-[42ch] text-[16px] leading-[1.6] text-white/65">
                {product.lead}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ZeonLinkButton href="/demo" tone="light" size="lg">
                  Book a demo
                </ZeonLinkButton>
                <ZeonLinkButton href="#workflow" tone="ghost-dark" size="lg">
                  See how it works
                </ZeonLinkButton>
              </div>
            </div>
            <div className="relative border border-white/12 bg-[#0B0B0B]/55 backdrop-blur-sm">
              <Corners tone="light" />
              <dl className="px-5 py-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 md:px-6">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <dt>Brand</dt>
                  <dd className="text-white/75">{product.brand}</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 py-3">
                  <dt>DWG</dt>
                  <dd className="text-white/75">ZEON-PRD-{code}</dd>
                </div>
                <div className="flex justify-between pt-3">
                  <dt>Sheet</dt>
                  <dd className="text-white/75">Product / 01</dd>
                </div>
              </dl>
              <div className="border-t border-white/10 px-3 py-3">
                <ProductGlyph id={product.slug} tone="dark" />
              </div>
            </div>
          </div>
        </FluidParticlesBackground>
      )}

      {/* Promise + preview */}
      <Band tone="hero">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
          <div>
            <Eyebrow>{product.brand}</Eyebrow>
            <Title className="!max-w-[18ch]">
              {product.promise}
            </Title>
            <Lead>Sample data.</Lead>
            <TickRail className="mt-8 max-w-[280px]" />
          </div>
          <Panel className="p-3 md:p-4">
            <SheetMeta left="LIVE PREVIEW" right="SAMPLE DATA" />
            <div className="p-2 md:p-3">
              <HeroVisual slug={product.slug} />
            </div>
            <SheetFooter right={`ZEON-PRD-${code}`} />
          </Panel>
        </div>
      </Band>

      {/* Workflow */}
      <Band tone="mist" id="workflow">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>From input to output</Eyebrow>
            <Title>
              How the work{" "}
              <StrokeWord color="var(--zeon-royal)">moves.</StrokeWord>
            </Title>
            <Lead>
              Automated steps and human checkpoints stay visible. People approve
              what matters.
            </Lead>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 02 · Workflow
          </p>
        </div>

        <Panel className="mt-12">
          <SheetMeta
            left={`DWG NO. ZEON-PRD-${code}-WF`}
            right={`${product.workflow.length} STEPS`}
          />
          <div className="p-5 md:p-7">
            <WorkflowStrip steps={product.workflow} />
          </div>
          <SheetFooter center="Governed path" right="Human on exceptions" />
        </Panel>
      </Band>

      {/* Use cases */}
      <Band tone="sky">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Where it applies</Eyebrow>
            <Title>
              Use{" "}
              <StrokeWord color="var(--zeon-royal)">cases.</StrokeWord>
            </Title>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 03 · Cases
          </p>
        </div>
        <Panel className="mt-10">
          <SheetMeta left="USE CASES" right="GOVERNED" />
          <div className="grid md:grid-cols-3 md:divide-x md:divide-[#E5E7EB]">
            {product.useCases.map((u, i) => (
              <article
                key={u.title}
                className="border-b border-[#E5E7EB] p-6 last:border-b-0 md:border-b-0 md:p-7"
              >
                <DrawingIndex n={i + 1} />
                <h3 className="mt-5 font-[family-name:var(--font-aeonik)] text-[20px] tracking-[-0.02em] text-[#181D27]">
                  {u.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.55] text-[#535862]">
                  {u.body}
                </p>
              </article>
            ))}
          </div>
          <SheetFooter right={`${product.useCases.length} cases`} />
        </Panel>
      </Band>

      {isProbe ? (
        <>
          <Band tone="paper">
            <Eyebrow>Reference architecture</Eyebrow>
            <Title>
              Six layers, in{" "}
              <StrokeWord color="var(--zeon-royal)">depth.</StrokeWord>
            </Title>
            <Lead>
              Same stack as AI Workspace — selectable here with more detail than
              the homepage tour.
            </Lead>
            <div className="mt-10">
              <ArchitectureDepth />
            </div>
            <Link
              href="/architecture"
              className="zeon-link-arrow mt-8 inline-flex"
            >
              Full architecture page
            </Link>
          </Band>

          <Band tone="ink" className="!bg-[#181D27]">
            <Eyebrow tone="dark">Industries</Eyebrow>
            <Title tone="dark">Regulated, document-heavy work.</Title>
            <Lead tone="dark">
              Open a sector to see agents shaped for that workflow.
            </Lead>
            <Panel tone="dark" className="mt-10 border-white/15 bg-[#12161F]">
              <SheetMeta
                tone="dark"
                left="DWG NO. ZEON-PRD-IND"
                right="SECTORS"
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                {industries.map((ind, i) => (
                  <Link
                    key={ind.id}
                    href={`/industries/${ind.id}`}
                    className={cn(
                      "block border-b border-white/10 p-5 no-underline transition hover:bg-[#2962FF]/12 sm:border-r",
                      "sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0",
                    )}
                  >
                    <DrawingIndex n={i + 1} tone="dark" />
                    <h3 className="mt-4 text-[15px] font-medium tracking-[-0.02em] text-white">
                      {ind.label}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.5] text-[#CBD5E1]">
                      {ind.intro}
                    </p>
                  </Link>
                ))}
              </div>
              <SheetFooter tone="dark" right="All sectors" />
            </Panel>
          </Band>
        </>
      ) : null}

      {product.faq.length ? (
        <Band tone="paper">
          <Eyebrow>FAQ</Eyebrow>
          <Title>Straight answers.</Title>
          <Panel className="mt-10">
            <SheetMeta left="FAQ" right="PRODUCT" />
            <div>
              {product.faq.map((item, i) => (
                <div
                  key={item.q}
                  className={cn(
                    "px-5 py-5 md:px-7 md:py-6",
                    i < product.faq.length - 1 && "border-b border-[#E5E7EB]",
                  )}
                >
                  <DrawingIndex n={i + 1} />
                  <h3 className="mt-4 text-[17px] font-medium tracking-[-0.02em] text-[#181D27]">
                    {item.q}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.55] text-[#535862]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
            <SheetFooter right="Product FAQ" />
          </Panel>
        </Band>
      ) : null}

      <Band tone="mist">
        <Eyebrow>Related</Eyebrow>
        <Title>Continue on the platform.</Title>
        <Panel className="mt-8">
          <SheetMeta left="RELATED" right="LINKS" />
          <ul className="flex flex-wrap gap-0">
            {product.crossLinks.map((l, i) => (
              <li
                key={l.href}
                className={cn(
                  "list-none border-b border-[#E5E7EB] sm:border-r",
                  "sm:[&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(3n)]:border-r-0",
                )}
              >
                <Link
                  href={l.href}
                  className="flex items-center gap-3 px-5 py-4 text-[14px] text-[#181D27] no-underline transition hover:bg-white hover:text-[var(--zeon-royal)]"
                >
                  <span className="font-mono text-[10px] text-[var(--zeon-royal)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </Band>

      <BlueprintClose
        title="See this product on your workflow."
        body="We will show the relevant Agent Hub product with governance in view."
        secondaryHref="/products"
        secondaryLabel="All products"
        sheet={`Product / ${product.brand}`}
      />
    </PageShell>
  );
}
