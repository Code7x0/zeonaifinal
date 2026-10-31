"use client";

import Link from "next/link";
import { PageShell } from "../page-shell";
import {
  Chapter,
  ChapterLabel,
  ChapterLead,
  ChapterTitle,
  SecondaryCta,
  SecondaryHero,
} from "../secondary/chapter";
import { industries } from "@/components/sites/zeonai/content";
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
  if (slug === "docai") return <DocExtractPreview />;
  if (slug === "invoiceai") return <InvoiceMatchPreview />;
  if (slug === "cashfloai") return <CashflowPreview />;
  return <ProbeAskPreview />;
}

export function ProductPage({ product }: { product: ProductDef }) {
  const isProbe = product.slug === "deepprobe";

  return (
    <PageShell>
      <SecondaryHero
        label={product.label}
        title={product.title}
        lead={product.lead}
        align="center"
        secondaryHref="#workflow"
        secondaryLabel="See how it works"
      />

      <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#DCE1E0]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
          <div>
            <ChapterLabel>{product.brand}</ChapterLabel>
            <ChapterTitle className="!max-w-[18ch] !text-[36px] md:!text-[48px]">
              {product.promise}
            </ChapterTitle>
            <ChapterLead>
              Interface below uses illustrative sample data so the layout stays
              readable — not a live customer claim.
            </ChapterLead>
          </div>
          <HeroVisual slug={product.slug} />
        </div>
      </Chapter>

      <Chapter
        tone="mist"
        id="workflow"
        min={false}
        className="!min-h-0"
      >
        <ChapterLabel tone="mist">From input to output</ChapterLabel>
        <ChapterTitle>How the work moves.</ChapterTitle>
        <ChapterLead tone="mist">
          Automated steps and human checkpoints stay visible. People approve
          what matters.
        </ChapterLead>
        <div className="mt-10">
          <WorkflowStrip steps={product.workflow} />
        </div>
      </Chapter>

      <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#DCE1E0]">
        <ChapterLabel>Where it applies</ChapterLabel>
        <ChapterTitle>Use cases from the product brief.</ChapterTitle>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {product.useCases.map((u) => (
            <article key={u.title} className="border-t border-[#DCE1E0] pt-5">
              <h3 className="font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em]">
                {u.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-[#5B6766]">
                {u.body}
              </p>
            </article>
          ))}
        </div>
      </Chapter>

      {isProbe ? (
        <>
          <Chapter tone="cream" min={false} className="!min-h-0">
            <ChapterLabel tone="cream">Reference architecture</ChapterLabel>
            <ChapterTitle>Six layers, in depth.</ChapterTitle>
            <ChapterLead tone="cream">
              Same stack as AI Workspace — selectable here with more detail than
              the homepage tour.
            </ChapterLead>
            <div className="mt-10">
              <ArchitectureDepth />
            </div>
            <Link
              href="/architecture"
              className="zeon-link-arrow mt-8 inline-flex"
            >
              Full architecture page
            </Link>
          </Chapter>
          <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#DCE1E0]">
            <ChapterLabel>Industries</ChapterLabel>
            <ChapterTitle>Regulated, document-heavy work.</ChapterTitle>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((ind) => (
                <Link
                  key={ind.id}
                  href={`/industries/${ind.id}`}
                  className="block border border-[#DCE1E0] p-5 no-underline transition-colors hover:bg-[#F6F4EF]"
                >
                  <h3 className="text-[16px] font-medium tracking-[-0.02em] text-[#111318]">
                    {ind.label}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5B6766]">
                    {ind.intro}
                  </p>
                </Link>
              ))}
            </div>
          </Chapter>
        </>
      ) : null}

      {product.faq.length ? (
        <Chapter tone="sky" min={false} className="!min-h-0">
          <ChapterLabel tone="sky">FAQ</ChapterLabel>
          <ChapterTitle>Straight answers.</ChapterTitle>
          <div className="mt-10 space-y-6">
            {product.faq.map((item) => (
              <div key={item.q} className="border-t border-[#DCE1E0] pt-5">
                <h3 className="text-[18px] font-medium tracking-[-0.02em]">
                  {item.q}
                </h3>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.55] text-[#5B6766]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </Chapter>
      ) : null}

      <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#DCE1E0]">
        <ChapterLabel>Related</ChapterLabel>
        <ChapterTitle>Continue on the platform.</ChapterTitle>
        <ul className="mt-8 flex flex-wrap gap-3">
          {product.crossLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex border border-[#DCE1E0] px-4 py-2 text-[14px] text-[#111318] no-underline transition-colors hover:border-[#111318]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Chapter>

      <SecondaryCta
        tone="midnight"
        title="See this product on your workflow."
        body="Bring a document pack or process. We will show the relevant DeepDelve surface with governance in view."
        secondaryHref="/products"
        secondaryLabel="All products"
      />
    </PageShell>
  );
}
