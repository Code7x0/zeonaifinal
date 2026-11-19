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

export function ResourcesPage() {
  return (
    <PageShell>
      <SecondaryHero
        label="Company · Resources"
        title="Notes from the work."
        lead="Articles and engineering notes as they are published. Until then, explore case studies, the platform architecture and product pages."
        align="center"
        primaryHref="/case-studies"
        primaryLabel="Case studies"
        secondaryHref="/demo"
        secondaryLabel="Book a demo"
      />

      <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#E9EAEB]">
        <ChapterLabel>Featured</ChapterLabel>
        <ChapterTitle>Engineering notes</ChapterTitle>
        <ChapterLead>
          Pipeline, access control, rules and audit — how governed AI is built
          into the platform.
        </ChapterLead>
        <Link href="/engineering" className="zeon-link-arrow mt-8 inline-flex">
          Open engineering
        </Link>
      </Chapter>

      <Chapter tone="mist" min={false} className="!min-h-0">
        <ChapterLabel tone="mist">Explore</ChapterLabel>
        <ChapterTitle>Read what is on the site today.</ChapterTitle>
        <ul className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            {
              href: "/case-studies",
              title: "Case studies",
              body: "Lending, finance and media deployments.",
            },
            {
              href: "/products/ai-workspace",
              title: "AI Workspace",
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
                className="block h-full border border-[#E9EAEB] bg-white p-5 no-underline transition-colors hover:bg-[#FAFAFA]"
              >
                <h3 className="text-[18px] font-medium tracking-[-0.02em] text-[#181D27]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.5] text-[#535862]">
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