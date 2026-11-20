"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  deployments,
  trustItems,
  trustLabels,
} from "@/components/sites/zeonai/content";
import InkOrbitHero from "@/components/ui/ink-orbit-hero";
import { cn } from "@/lib/utils";
import { PageShell } from "./page-shell";
import { AuditMock } from "./secondary/product-mocks";
import { ZeonLinkButton } from "./zeon-ui";

/* ------------------------------------------------------------------ data */

const TRUST_DEMO_STEPS = [
  {
    label: "Roles",
    detail: "Admin defines the roles your teams need, once.",
  },
  {
    label: "Modules",
    detail: "Each role gets only the modules it needs.",
  },
  {
    label: "Access",
    detail: "Access is checked before anything is retrieved.",
  },
  {
    label: "Review",
    detail: "Human review is built into the path from search to the ERP record.",
  },
  {
    label: "Audit",
    detail: "Activity is written as it happens; watchers cannot rewrite the log.",
  },
] as const;

const GOVERNANCE_STEPS = [
  {
    title: "Admin defines roles",
    body: "Set up the roles your teams need, once.",
  },
  {
    title: "Roles map to modules",
    body: "Each role gets only the modules it needs.",
  },
  {
    title: "People see only what their role allows",
    body: "Access is checked before anything is retrieved.",
  },
] as const;

const VISIBILITY = [
  {
    tier: "General",
    see: "Everyone in the organization",
    act: "The current holder",
  },
  {
    tier: "Protected",
    see: "Roles cleared for protected cases",
    act: "The current holder",
  },
  {
    tier: "Restricted",
    see: "One owner",
    act: "That owner only",
  },
] as const;

const PRACTICE_CODES = ["RBAC", "ENC", "2FA", "ARC", "DR", "DEP"] as const;

/* ---------------------------------------------------------- blueprint UI */

function Corners({
  className,
  tone = "blue",
}: {
  className?: string;
  tone?: "blue" | "ink" | "muted";
}) {
  const border =
    tone === "blue"
      ? "border-[var(--zeon-royal)]"
      : tone === "ink"
        ? "border-[#181D27]"
        : "border-[#A4A7AE]";
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <i
        className={cn(
          "absolute left-0 top-0 h-2.5 w-2.5 border-l border-t",
          border,
        )}
      />
      <i
        className={cn(
          "absolute right-0 top-0 h-2.5 w-2.5 border-r border-t",
          border,
        )}
      />
      <i
        className={cn(
          "absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l",
          border,
        )}
      />
      <i
        className={cn(
          "absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r",
          border,
        )}
      />
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

function TrustBand({
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

function SectionTitle({
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
          ? "border-[#E5E7EB] bg-white/90"
          : "border-white/12 bg-[#121212]/90",
        className,
      )}
    >
      <Corners tone={tone === "light" ? "blue" : "muted"} />
      {children}
    </div>
  );
}

function ComplianceBadge({ short }: { short: string }) {
  return (
    <div className="relative mx-auto flex h-[88px] w-[88px] items-center justify-center">
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border border-white/15 bg-[#161616]"
      />
      <Corners tone="blue" className="inset-1" />
      <span className="relative font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white">
        {short}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- page */

export function TrustPage() {
  const router = useRouter();

  return (
    <PageShell className="bg-[var(--dp-gray-50)]">
      <InkOrbitHero
        theme="dark"
        palette="zeon"
        titleTop="Governed by"
        titleAccent={["design.", "access control.", "human review."]}
        description="Access control, human review and an audit log are built into every part of AI Workspace — from the first search to the record posted in your ERP."
        primaryCta="Book a demo"
        onPrimary={() => router.push("/demo")}
        secondaryCta="Watch Demo"
        demoSteps={[...TRUST_DEMO_STEPS]}
        proof={null}
        sculptureLabel="ZEON · TRUST"
        sculptureHint="Drag to rotate · Click to reforge"
        sculptureInk="#ececec"
        sculptureBackground="#121212"
        minHeight="min(620px, 100svh)"
      />

      {/* 01 — Access */}
      <TrustBand tone="sky" id="access">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>01 · Access you control</Eyebrow>
            <SectionTitle>Roles, modules, visibility.</SectionTitle>
            <Lead>
              Access is checked before anything is retrieved — roles first,
              modules next, visibility last.
            </Lead>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 01 / 05 · Access
          </p>
        </div>

        <Panel className="mt-12">
          <SheetMeta left="DWG NO. ZEON-TRUST-01" right="REV. ACCESS" />
          <ol className="grid md:grid-cols-3 md:divide-x md:divide-[#E5E7EB]">
            {GOVERNANCE_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="relative list-none border-b border-[#E5E7EB] p-6 last:border-b-0 md:border-b-0 md:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[12px] text-[var(--zeon-royal)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1 bg-[linear-gradient(90deg,var(--zeon-border-blue),transparent)]"
                  />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-aeonik)] text-[21px] leading-[1.2] tracking-[-0.025em] text-[#181D27]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.55] text-[#535862]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Panel>
      </TrustBand>

      {/* 02 — Visibility */}
      <TrustBand tone="paper" id="visibility">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div>
            <Eyebrow>02 · Visibility tiers</Eyebrow>
            <SectionTitle>See and act are separate axes.</SectionTitle>
            <Lead>
              Who can see a case is separate from who can act on it.
            </Lead>
          </div>
          <p className="max-w-[36ch] font-mono text-[11px] leading-[1.6] uppercase tracking-[0.12em] text-[#717680] lg:justify-self-end lg:text-right">
            Matrix · Tier × capability
            <br />
            Sheet 02 / 05
          </p>
        </div>

        <Panel className="mt-12">
          <SheetMeta left="DWG NO. ZEON-TRUST-02" right="SCALE 1:1" />
          {/* Mobile: stacked cards — avoid forced min-width horizontal scroll */}
          <ul className="divide-y divide-[#E5E7EB] md:hidden">
            {VISIBILITY.map((row) => (
              <li key={row.tier} className="list-none space-y-3 px-4 py-5">
                <p className="flex items-center gap-2 text-[15px] font-medium text-[#181D27]">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--zeon-royal)]"
                  />
                  {row.tier}
                </p>
                <dl className="grid gap-2 text-[14px]">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#717680]">
                      Can see
                    </dt>
                    <dd className="mt-0.5 text-[#535862]">{row.see}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#717680]">
                      Can act
                    </dt>
                    <dd className="mt-0.5 text-[#535862]">{row.act}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <div className="hidden overflow-x-auto md:block">
            <div className="min-w-0">
              <div className="grid grid-cols-3 border-b border-[#E5E7EB] bg-[#F5F7FA] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#717680] md:px-6">
                <span>Tier</span>
                <span>Can see</span>
                <span>Can act</span>
              </div>
              {VISIBILITY.map((row, i) => (
                <div
                  key={row.tier}
                  className={cn(
                    "grid grid-cols-3 gap-0 px-4 py-5 text-[14px] md:px-6",
                    i < VISIBILITY.length - 1 && "border-b border-[#E5E7EB]",
                  )}
                >
                  <span className="flex items-center gap-2 font-medium text-[#181D27]">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--zeon-royal)]"
                    />
                    {row.tier}
                  </span>
                  <span className="text-[#535862]">{row.see}</span>
                  <span className="text-[#535862]">{row.act}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </TrustBand>

      {/* 03 — Audit */}
      <TrustBand tone="ink" id="audit">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow tone="dark">03 · Audit</Eyebrow>
            <SectionTitle tone="dark">
              A trail you can read,{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.15px #8EB8FF" }}
              >
                not edit.
              </span>
            </SectionTitle>
            <Lead tone="dark">
              Activity is written as it happens. Watchers can be notified; they
              cannot rewrite the log.
            </Lead>
            <Link
              href="/responsible-ai"
              className="zeon-link-arrow mt-8 inline-flex !text-white"
            >
              Responsible AI
            </Link>
            <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
              <div>
                <dt>Write mode</dt>
                <dd className="mt-1 text-[12px] tracking-[0.08em] text-white/80">
                  Append only
                </dd>
              </div>
              <div>
                <dt>Sheet</dt>
                <dd className="mt-1 text-[12px] tracking-[0.08em] text-white/80">
                  03 / 05
                </dd>
              </div>
            </dl>
          </div>
          <Panel tone="dark" className="p-3 md:p-4">
            <AuditMock />
          </Panel>
        </div>
      </TrustBand>

      {/* 04 — Enterprise trust */}
      <TrustBand tone="ink" id="security" className="!pt-10 md:!pt-14">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <div>
            <Eyebrow tone="dark">04 · Designed for regulated work</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-aeonik)] text-[clamp(2rem,1.3rem+2.4vw,3.25rem)] leading-[1.05] tracking-[-0.04em]">
              <span className="text-white">Enterprise-grade </span>
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.2px #5991FF" }}
              >
                trust
              </span>
            </h2>
          </div>
          <div className="lg:pb-1">
            <Lead tone="dark" className="mt-0 lg:ml-auto lg:text-right">
              Classification, residency and audit requirements belong in the
              first conversation — not as an afterthought.
            </Lead>
            <div className="mt-4 flex lg:justify-end">
              <Link
                href="/security"
                className="zeon-link-arrow inline-flex !text-[#8EB8FF]"
              >
                Security
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-0 grid border-b border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {trustLabels.map((label) => {
            const short = label.name.includes("42001")
              ? "42001"
              : label.name.includes("27001")
                ? "ISO"
                : label.name.includes("Type II")
                  ? "SOC 2"
                  : "SOC 2";
            return (
              <article
                key={label.name}
                className="relative border-b border-white/10 p-6 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
              >
                <ComplianceBadge short={short} />
                <h3 className="mt-6 text-center font-[family-name:var(--font-aeonik)] text-[17px] tracking-[-0.02em] text-white">
                  {label.name}
                </h3>
                <p className="mt-2 text-center text-[13px] leading-[1.5] text-white/55">
                  {label.note}
                </p>
              </article>
            );
          })}
        </div>

        <div className="relative mt-0 border border-t-0 border-white/10">
          <SheetMeta
            tone="dark"
            left="DWG NO. ZEON-TRUST-04"
            right="IN PRODUCTION"
          />
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item, i) => (
              <article
                key={item.title}
                className={cn(
                  "relative border-b border-white/10 p-6 md:p-7",
                  "sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8EB8FF]">
                    {PRACTICE_CODES[i] ?? String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 border-r border-t border-[var(--zeon-royal)]"
                  />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em] text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-white/55">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
          <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40 md:px-5">
            <span>Sheet 04 / 05</span>
            <span>Tol. ±0.0%</span>
          </div>
        </div>
      </TrustBand>

      {/* 05 — Deployment */}
      <TrustBand tone="mist" id="deployment">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>05 · Deployment options</Eyebrow>
            <SectionTitle>On your terms.</SectionTitle>
            <Lead>
              On-premises or private cloud deployment with full data and model
              sovereignty.
            </Lead>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#717680]">
            Sheet 05 / 05 · Deploy
          </p>
        </div>

        <Panel className="mt-12">
          <SheetMeta left="DWG NO. ZEON-TRUST-05" right="UNITS: REGIONS" />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-5">
            {deployments.map((d, i) => (
              <li
                key={d}
                className={cn(
                  "list-none border-b border-[#E5E7EB] sm:border-r",
                  "sm:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(5n)]:border-r-0",
                )}
              >
                <Link
                  href="/deployment"
                  className="group relative flex min-h-[120px] flex-col justify-between p-5 no-underline transition-colors hover:bg-[var(--zeon-sky)]"
                >
                  <span className="font-mono text-[10px] text-[#717680]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-[family-name:var(--font-aeonik)] text-[17px] tracking-[-0.02em] text-[#181D27] transition-colors group-hover:text-[var(--zeon-royal)]">
                    {d}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#A4A7AE] transition-colors group-hover:text-[var(--zeon-royal)]">
                    Open →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </TrustBand>

      {/* Close CTA */}
      <section className="border-t border-[#E5E7EB] bg-[#0B0B0B] text-white">
        <div className="mx-auto grid max-w-[1180px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="border-b border-white/10 px-5 py-16 md:px-8 md:py-20 lg:border-b-0 lg:border-r">
            <Eyebrow tone="dark">Next conversation</Eyebrow>
            <h2 className="mt-3 max-w-[16ch] font-[family-name:var(--font-aeonik)] text-[clamp(1.9rem,1.25rem+2vw,2.85rem)] leading-[1.08] tracking-[-0.035em]">
              Discuss trust requirements.
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15.5px] leading-[1.6] text-white/65">
              Bring classification, residency and audit needs into the first
              conversation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ZeonLinkButton href="/demo" tone="light">
                Book a demo
              </ZeonLinkButton>
              <ZeonLinkButton href="/security" tone="ghost-dark">
                Security
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
                <dt>Sheet</dt>
                <dd className="mt-1 text-white/70">Trust / Final</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd className="mt-1 text-[#8EB8FF]">Governed</dd>
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
