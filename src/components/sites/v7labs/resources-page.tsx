"use client";

import Link from "next/link";
import { PageShell } from "./page-shell";
import {
  Chapter,
  ChapterLabel,
  ChapterLead,
  ChapterTitle,
  SecondaryCta,
  SecondaryHero,
} from "./secondary/chapter";

/**
 * Resources index — no fabricated articles.
 * Featured slot reserved until approved editorial content exists.
 */
export function ResourcesPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Company · Resources"
        title="Notes from the work."
        lead="An editorial index for approved articles and product notes. Until posts are published, use the case studies and product pages."
        align="center"
        primaryHref="/case-studies"
        primaryLabel="Case studies"
        secondaryHref="/demo"
        secondaryLabel="Book a demo"
      />

      <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#DCE1E0]">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <ChapterLabel>Featured</ChapterLabel>
            <ChapterTitle>Waiting on approved copy.</ChapterTitle>
            <ChapterLead>
              We do not invent thought leadership titles, authors or dates. When
              articles are cleared for publication, they will appear here in a
              reading-width layout.
            </ChapterLead>
          </div>
          <div className="border border-dashed border-[#DCE1E0] bg-[#F6F4EF]/50 p-8">
            <p className="font-mono text-[11px] tracking-[0.12em] text-[#5B6766] uppercase">
              Placeholder
            </p>
            <p className="mt-3 text-[15px] leading-[1.55] text-[#5B6766]">
              Empty state: no published resources in the local content pack yet.
            </p>
          </div>
        </div>
      </Chapter>

      <Chapter tone="mist" min={false} className="!min-h-0">
        <ChapterLabel tone="mist">Meanwhile</ChapterLabel>
        <ChapterTitle>Read what is already real.</ChapterTitle>
        <ul className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            {
              href: "/case-studies",
              title: "Case studies",
              body: "Lending, finance and media deployments from the product brief.",
            },
            {
              href: "/products/deepprobe",
              title: "DeepProbe",
              body: "Governed answers with citations and access boundaries.",
            },
            {
              href: "/architecture",
              title: "Architecture",
              body: "Six layers from sources to safe outputs.",
            },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block h-full border border-[#DCE1E0] bg-white p-5 no-underline transition-colors hover:bg-[#F6F4EF]"
              >
                <h3 className="text-[18px] font-medium tracking-[-0.02em] text-[#111318]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.5] text-[#5B6766]">
                  {item.body}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Chapter>

      <SecondaryCta
        tone="midnight"
        title="Want a briefing instead of a blog?"
        body="Book a demo and walk a real workflow with the team."
        secondaryHref="/contact"
        secondaryLabel="Contact"
      />
    </PageShell>
  );
}
