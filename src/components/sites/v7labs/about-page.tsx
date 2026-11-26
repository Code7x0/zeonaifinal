"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  aboutCopy,
  offices,
  processSteps,
} from "@/components/sites/zeonai/content";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { cn } from "@/lib/utils";
import { PageShell } from "./page-shell";
import { VideoSection } from "@/components/sites/v7labs/video";
import { ZeonLinkButton } from "./zeon-ui";

/* ------------------------------------------------------------------ data */

const PARTNER_PROGRAMS = [
  {
    name: "Manifest AI",
    src: "/sites/v7labs/partners/manifest-ai.png",
    width: 128,
    height: 128,
    markClass: "h-6 w-6",
    showName: true,
  },
  {
    name: "Datec",
    src: "/sites/v7labs/partners/datec.png",
    width: 280,
    height: 60,
    markClass: "h-5 w-auto max-w-[108px]",
    showName: false,
  },
  {
    name: "Upekkha",
    src: "/sites/v7labs/partners/upekkha.png",
    width: 280,
    height: 72,
    markClass: "h-5 w-auto max-w-[120px]",
    showName: false,
  },
  {
    name: "Amii",
    src: "/sites/v7labs/partners/amii.png",
    width: 160,
    height: 160,
    markClass: "h-6 w-6",
    showName: true,
  },
] as const;

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

const SECTORS = [
  "Financial services",
  "Superannuation",
  "Media",
  "Government",
  "Defense",
  "Metals and manufacturing",
  "Construction",
  "Medtech",
  "Telco",
  "Property",
] as const;

const FLAG_SRC: Record<string, string> = {
  India: "/sites/zeonai/flags/in.svg",
  "United Arab Emirates": "/sites/zeonai/flags/ae.svg",
};

const COMPANY_PILLARS = [
  { label: "Vision", body: aboutCopy.vision },
  { label: "Expertise", body: aboutCopy.expertise },
  { label: "Approach", body: aboutCopy.approach },
] as const;

/* ---------------------------------------------------------- trust DS */

function Corners({
  className,
  tone = "blue",
}: {
  className?: string;
  tone?: "blue" | "ink" | "muted" | "light";
}) {
  const border =
    tone === "blue"
      ? "border-[var(--zeon-royal)]"
      : tone === "ink"
        ? "border-[#181D27]"
        : tone === "light"
          ? "border-white/40"
          : "border-[#A4A7AE]";
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <i className={cn("absolute left-0 top-0 h-2.5 w-2.5 border-l border-t", border)} />
      <i className={cn("absolute right-0 top-0 h-2.5 w-2.5 border-r border-t", border)} />
      <i className={cn("absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l", border)} />
      <i className={cn("absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r", border)} />
    </span>
  );
}

function SheetMeta({
  left,
  right,
  tone = "light",
}: {
  left: string;
  right?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] md:px-5",
        tone === "light"
          ? "border-[#E5E7EB] text-[#717680]"
          : "border-white/10 text-white/45",
      )}
    >
      <span>{left}</span>
      {right ? <span>{right}</span> : null}
    </div>
  );
}

function Band({
  tone = "paper",
  children,
  className,
  id,
}: {
  tone?: "paper" | "sky" | "ink" | "mist";
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const bg =
    tone === "ink"
      ? "bg-[#0B0B0B] text-white"
      : tone === "sky"
        ? "bg-[var(--zeon-sky)] text-[var(--zeon-ink)]"
        : tone === "mist"
          ? "bg-[#F3F5F8] text-[var(--zeon-ink)]"
          : "bg-[var(--dp-gray-50)] text-[var(--zeon-ink)]";
  return (
    <section id={id} className={cn(bg, className)}>
      <div className="zeon-section-pad mx-auto max-w-[var(--zeon-container,1180px)] px-[var(--zeon-gutter,1.25rem)]">
        {children}
      </div>
    </section>
  );
}

function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] font-medium uppercase tracking-[0.16em]",
        tone === "dark" ? "text-[#8EB8FF]" : "text-[var(--zeon-royal)]",
      )}
    >
      {children}
    </p>
  );
}

function Title({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mt-3 max-w-[18ch] font-[family-name:var(--font-aeonik)] text-[clamp(1.85rem,1.2rem+2vw,2.75rem)] leading-[1.08] tracking-[-0.035em]",
        tone === "dark" ? "text-white" : "text-[#181D27]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Lead({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-4 max-w-[48ch] text-[15.5px] leading-[1.6]",
        tone === "dark" ? "text-white/65" : "text-[#535862]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Drawing panel — same as Trust, not a floating card */
function Panel({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border",
        tone === "light"
          ? "border-[#E5E7EB] bg-white"
          : "border-white/12 bg-[#121212]",
        className,
      )}
    >
      <Corners tone={tone === "light" ? "blue" : "light"} />
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- page */

export function AboutPage() {
  return (
    <PageShell className="bg-[var(--dp-gray-50)]">
      {/* Hero — particles field + open type (Heron), Trust sheet chrome */}
      <FluidParticlesBackground
        tone="zeon"
        particleCount={1100}
        className="min-h-[min(680px,100svh)] border-b border-white/10"
      >
        <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#8EB8FF]">
              About ZeonAI
            </p>
            <h1 className="mt-4 max-w-[13ch] font-[family-name:var(--font-aeonik)] text-[clamp(2.4rem,1.5rem+3.2vw,3.75rem)] leading-[1.02] tracking-[-0.045em] text-white">
              Built with the people who&apos;ll use it.
            </h1>
            <p className="mt-5 max-w-[42ch] text-[16px] leading-[1.6] text-white/65">
              ZeonAI Labs builds AI Workspace. Manifest AI is a channel partner
              and separate company that discovers friction, designs agents and
              takes use cases into production on the same platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ZeonLinkButton href="/demo" tone="light" size="lg">
                Talk to our team
              </ZeonLinkButton>
              <ZeonLinkButton
                href="/about#how-we-work"
                tone="ghost-dark"
                size="lg"
              >
                How we work
              </ZeonLinkButton>
            </div>
          </div>

          <dl className="border border-white/12 bg-[#0B0B0B]/55 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 backdrop-blur-sm md:px-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <dt>DWG</dt>
              <dd className="text-white/70">ZEON-CO-01</dd>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 py-3">
              <dt>Presence</dt>
              <dd className="text-right text-white/70">
                {aboutCopy.locations.join(" · ")}
              </dd>
            </div>
            <div className="flex items-center justify-between pt-3">
              <dt>Sheet</dt>
              <dd className="text-white/70">Company / 01</dd>
            </div>
          </dl>
        </div>
      </FluidParticlesBackground>

      {/* 01 — Company pillars as one drawing sheet */}
      <Band tone="sky" id="company">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>01 · Company</Eyebrow>
            <Title>What we hold the centre of.</Title>
            <Lead>
              Labs builds the platform. Partners take use cases into production
              beside the product team.
            </Lead>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 01 / 05 · Company
          </p>
        </div>

        <Panel className="mt-12">
          <SheetMeta left="DWG NO. ZEON-CO-02" right="REV. PILLARS" />
          <div className="grid md:grid-cols-3 md:divide-x md:divide-[#E5E7EB]">
            {COMPANY_PILLARS.map((pillar, i) => (
              <article
                key={pillar.label}
                className="border-b border-[#E5E7EB] p-6 last:border-b-0 md:border-b-0 md:p-8"
              >
                <p className="font-mono text-[12px] text-[var(--zeon-royal)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em] text-[#181D27]">
                  {pillar.label}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.55] text-[#535862]">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </Panel>
      </Band>

      {/* Video — clean band, no glass shell */}
      <Band tone="paper">
        <VideoSection
          assetId="about-founder"
          eyebrow="Governed AI"
          headline="Why governed AI matters."
          body="We work alongside customers on document-heavy workflows — access control, human review and an audit log are part of the platform, not an afterthought."
          after="How ZeonAI partners through discovery and into production."
          layout="split"
          cta={
            <Link href="/demo" className="zeon-btn zeon-btn-ink">
              Talk to our team
            </Link>
          }
        />
      </Band>

      {/* Ecosystem — quiet strip, Heron/footer density */}
      <Band tone="mist">
        <Eyebrow>Ecosystem</Eyebrow>
        <Title>Partners and programs.</Title>
        <ul className="mt-8 flex flex-wrap gap-2">
          {PARTNER_PROGRAMS.map((partner) => (
            <li
              key={partner.name}
              className="flex list-none items-center gap-2.5 border border-[#E5E7EB] bg-white px-5 py-3"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className={`object-contain ${partner.markClass}`}
              />
              {partner.showName ? (
                <span aria-hidden className="text-[14px] font-medium text-[#181D27]">
                  {partner.name}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </Band>

      {/* 02 — Presence + sectors (Trust ink split) */}
      <Band tone="ink" id="presence">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow tone="dark">02 · Presence</Eyebrow>
            <Title tone="dark">
              India ·{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.1px #8EB8FF" }}
              >
                UAE
              </span>
            </Title>
            <Lead tone="dark">
              Two regions. One platform. Offices that sit with the work, not
              beside it.
            </Lead>
            <ul className="mt-10 space-y-5 border-t border-white/10 pt-8">
              {offices.map((office) => (
                <li key={office.code} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-[14px] w-[20px] shrink-0 overflow-hidden rounded-[2px] border border-white/15">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={FLAG_SRC[office.region]}
                      alt=""
                      width={20}
                      height={14}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium text-white">
                      {office.region}
                    </span>
                    <span className="mt-1 block text-[13px] leading-[1.45] text-white/55">
                      {office.address}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Eyebrow tone="dark">Sectors</Eyebrow>
            <Title tone="dark" className="max-w-[14ch]">
              The industries we ship into.
            </Title>
            <ul className="mt-10 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2">
              {SECTORS.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    "list-none border-b border-white/10 py-3.5 text-[14px] text-white/80",
                    i % 2 === 0 && "sm:border-r sm:pr-4",
                    i % 2 === 1 && "sm:pl-4",
                  )}
                >
                  <span className="mr-3 font-mono text-[10px] text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Band>

      {/* 03 — Principles as one sheet */}
      <Band tone="paper" id="principles">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>03 · Principles</Eyebrow>
            <Title>Three things we hold to.</Title>
            <Lead>How we decide what ships, what we say, and who acts.</Lead>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 03 / 05
          </p>
        </div>

        <Panel className="mt-12">
          <SheetMeta left="DWG NO. ZEON-CO-03" right="REV. PRINCIPLES" />
          <ol className="grid md:grid-cols-3 md:divide-x md:divide-[#E5E7EB]">
            {PRINCIPLES.map((item) => (
              <li
                key={item.id}
                className="list-none border-b border-[#E5E7EB] p-6 last:border-b-0 md:border-b-0 md:p-8"
              >
                <p className="font-mono text-[12px] text-[var(--zeon-royal)]">
                  {item.id}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.025em] text-[#181D27]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#535862]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Panel>
      </Band>

      {/* 04 — How we work */}
      <Band tone="mist" id="how-we-work">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>04 · How we work</Eyebrow>
            <Title>Problem to production.</Title>
            <Lead>
              Manifest AI is a channel partner and separate company that runs
              discovery and delivery beside the ZeonAI Labs product team.
            </Lead>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 04 / 05 · Delivery
          </p>
        </div>

        <Panel className="mt-12">
          <SheetMeta left="DWG NO. ZEON-CO-04" right="SCALE 1:1" />
          <ol className="grid md:grid-cols-3 md:divide-x md:divide-[#E5E7EB]">
            {processSteps.map((step) => (
              <li
                key={step.id}
                className="list-none border-b border-[#E5E7EB] p-6 last:border-b-0 md:border-b-0 md:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[12px] text-[var(--zeon-royal)]">
                    {step.id}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#717680]">
                    {step.timing}
                  </span>
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-aeonik)] text-[24px] tracking-[-0.025em] text-[#181D27]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#535862]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Panel>
      </Band>

      {/* Close — match Trust */}
      <section className="border-t border-[#E5E7EB] bg-[#0B0B0B] text-white">
        <div className="mx-auto grid max-w-[1180px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="border-b border-white/10 px-5 py-16 md:px-8 md:py-20 lg:border-b-0 lg:border-r">
            <Eyebrow tone="dark">Next conversation</Eyebrow>
            <h2 className="mt-3 max-w-[16ch] font-[family-name:var(--font-aeonik)] text-[clamp(1.9rem,1.25rem+2vw,2.85rem)] leading-[1.08] tracking-[-0.035em]">
              Ready to move from pilot to production?
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15.5px] leading-[1.6] text-white/65">
              Pick one high-value use case. We run a proof of value with a clear
              path to scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ZeonLinkButton href="/demo" tone="light">
                Talk to our team
              </ZeonLinkButton>
              <ZeonLinkButton href="/customers" tone="ghost-dark">
                Case studies
              </ZeonLinkButton>
            </div>
          </div>
          <div className="relative flex flex-col justify-between px-5 py-10 md:px-8 md:py-12">
            <div className="pointer-events-none absolute inset-x-5 top-4 flex justify-between md:inset-x-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-2 w-px bg-white/20",
                    (i === 0 || i === 6) && "h-3 bg-white/35",
                  )}
                />
              ))}
            </div>
            <p
              className="mt-6 select-none text-center font-[family-name:var(--font-aeonik)] font-medium uppercase leading-none tracking-[-0.04em] text-transparent md:mt-8"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                WebkitTextStroke: "1.2px rgba(255,255,255,0.55)",
              }}
              aria-hidden
            >
              ZEONAI
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
              <div>
                <dt>Partner</dt>
                <dd className="mt-1 text-white/70">Manifest AI</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd className="mt-1 text-[#8EB8FF]">In production</dd>
              </div>
              <div>
                <dt>Next</dt>
                <dd className="mt-1 text-white/70">/demo</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
