"use client";

import Link from "next/link";
import { FadeUp } from "./fade-up";
import { PageShell } from "./page-shell";
import {
  Chapter,
  ChapterLabel,
  ChapterLead,
  ChapterTitle,
  SecondaryCta,
  SecondaryHero,
} from "./secondary/chapter";

const explore = [
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
] as const;

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

      <Chapter
        tone="paper"
        min={false}
        className="!min-h-0 border-t border-[var(--zeon-border)]"
      >
        <FadeUp>
          <ChapterLabel>Featured</ChapterLabel>
          <ChapterTitle>Engineering notes</ChapterTitle>
          <ChapterLead>
            Pipeline, access control, rules and audit — how governed AI is built
            into the platform.
          </ChapterLead>
          <Link href="/engineering" className="zeon-link-arrow mt-8 inline-flex">
            Open engineering
          </Link>
        </FadeUp>
      </Chapter>

      <Chapter tone="mist" min={false} className="!min-h-0">
        <FadeUp>
          <ChapterLabel tone="mist">Explore</ChapterLabel>
          <ChapterTitle>Read what is on the site today.</ChapterTitle>
        </FadeUp>
        <ul className="mt-10 grid gap-3 md:grid-cols-3">
          {explore.map((item, i) => (
            <FadeUp key={item.href} delay={0.06 * i} as="li">
              <Link
                href={item.href}
                className="zeon-surface-interactive block h-full p-5 no-underline"
              >
                <h3 className="zeon-type-sub text-[length:var(--zeon-text-sub)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[length:var(--zeon-text-caption)] leading-[1.5] text-[var(--zeon-muted)]">
                  {item.body}
                </p>
              </Link>
            </FadeUp>
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
