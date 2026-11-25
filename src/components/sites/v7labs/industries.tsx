"use client";

import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Factory,
  FileText,
  HardHat,
  HeartPulse,
  Landmark,
  Lock,
  Newspaper,
  Radio,
  Shield,
} from "lucide-react";
import {
  INDUSTRY_CARDS,
  type IndustryCard,
  type IndustryCardId,
} from "./industries/industries-home-config";
/** ZeonAI brand palette — no beige, no rainbow. */
const C = {
  white: "#FFFFFF",
  surface: "#FAFAFA",
  border: "#E9EAEB",
  heading: "#181D27",
  body: "#535862",
  muted: "#717680",
  brand: "#2962FF",
  cta: "#1B46F5",
  hover: "#1433E1",
  tint: "#EEF4FF",
  blue300: "#8EB8FF",
  blue200: "#BCD3FF",
  blue800: "#172AB6",
  blue900: "#192A8F",
  success: "#17B26A",
  warning: "#F79009",
  warningSoft: "#FEC84B",
  dark: "#181D27",
  darkBorder: "#252B37",
  gray400: "#A4A7AE",
  blue400: "#5991FF",
} as const;

const EASE = [0.2, 0, 0, 1] as const;

const ICONS: Record<IndustryCardId, typeof Building2> = {
  financial: Landmark,
  super: Building2,
  media: Newspaper,
  gov: Building2,
  defence: Shield,
  metals: Factory,
  construction: HardHat,
  telco: Radio,
  medtech: HeartPulse,
};

/**
 * Industries bento — polished composition on ZeonAI palette tokens.
 * Outcomes marquee is a separate sibling on the homepage; do not touch it.
 */
export function Industries() {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useInView(sectionRef, { once: true, amount: 0.12 });

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="zeon-section-pad bg-white px-[var(--zeon-gutter,1.25rem)]"
      style={{ color: C.heading }}
    >
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={revealed ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <h2 className="zeon-type-section max-w-[720px] text-balance font-normal">
            Built for regulated,{" "}
            <br className="hidden sm:block" />
            <span className="sm:whitespace-nowrap">document-heavy</span>{" "}
            sectors
          </h2>
          <p
            className="zeon-type-lead mt-4 max-w-[560px]"
            style={{ color: C.body }}
          >
            The same platform, with agents built for each sector. Examples from
            our agent portfolio.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-4 md:auto-rows-fr md:grid-cols-2 xl:grid-cols-3">
          {INDUSTRY_CARDS.map((card, index) => (
            <CardMotion
              key={card.id}
              index={index}
              revealed={revealed}
              reduceMotion={reduceMotion}
            >
              <SectorCard card={card} />
            </CardMotion>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/industries" className="zeon-link-arrow">
            See all industries
          </Link>
        </div>
      </div>
    </section>
  );
}

function CardMotion({
  children,
  index,
  revealed,
  reduceMotion,
  className = "",
}: {
  children: ReactNode;
  index: number;
  revealed: boolean;
  reduceMotion: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={`h-full min-h-0 ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.35,
        delay: reduceMotion ? 0 : index * 0.05,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

const VIGNETTE_IDS = new Set<IndustryCardId>([
  "financial",
  "super",
  "media",
  "gov",
  "defence",
  "metals",
  "construction",
  "telco",
  "medtech",
]);

function SectorCard({ card }: { card: IndustryCard }) {
  const dark = Boolean(card.dark);
  const Icon = ICONS[card.id];
  const hasVignette = VIGNETTE_IDS.has(card.id);

  return (
    <Link
      href={card.href}
      aria-label={card.a11yName}
      className={`group flex h-full flex-col p-6 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        dark
          ? "zeon-surface-ink zeon-lift"
          : "zeon-surface-interactive"
      }`}
      style={{
        color: dark ? C.white : C.heading,
        outlineColor: dark ? C.blue400 : C.brand,
      }}
    >
      {/* 1. Icon + title */}
      <div className="flex items-start gap-2.5">
        <Icon
          className="mt-0.5 size-5 shrink-0 stroke-[1.75]"
          style={{ color: dark ? C.blue400 : C.brand }}
          aria-hidden
        />
        <h3 className="font-[family-name:var(--font-aeonik)] text-[20px] font-normal leading-[1.25] tracking-[-0.02em]">
          {card.label}
        </h3>
      </div>

      {/* 2. Sentence */}
      <p
        className="mt-2 text-[15px] leading-[1.5]"
        style={{ color: dark ? C.gray400 : C.body }}
      >
        {card.outcome}
      </p>

      {/* 3. Quiet vignette — only when the sector has one */}
      {hasVignette ? (
        <div
          className="mt-3 px-3.5 py-3"
          style={{
            borderRadius: 2,
            background: dark ? "rgba(255,255,255,0.04)" : C.surface,
            backgroundImage: dark
              ? "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
              : undefined,
            backgroundSize: dark ? "24px 24px" : undefined,
          }}
          aria-hidden
        >
          <SectorVignette id={card.id} dark={dark} />
        </div>
      ) : null}

      {/* 4. Footer — agent + arrow */}
      <div
        className={`flex items-center justify-between gap-3 border-t pt-4 ${
          hasVignette ? "mt-auto" : "mt-5"
        }`}
        style={{
          borderColor: dark ? C.darkBorder : C.border,
        }}
      >
        <span
          className="min-w-0 text-[14px] font-medium"
          style={{ color: dark ? C.white : C.heading }}
        >
          {card.agents[0]}
        </span>
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
          style={{ color: dark ? C.blue400 : C.brand }}
          aria-hidden
        />
      </div>
    </Link>
  );
}

function SectorVignette({
  id,
  dark,
}: {
  id: IndustryCardId;
  dark?: boolean;
}) {
  const ink = dark ? C.white : C.heading;
  const muted = dark ? C.gray400 : C.muted;
  const arrow = C.gray400;

  if (id === "financial") {
    return (
      <div className="text-[13px] leading-[1.45]">
        <p style={{ color: ink }}>
          Loan_application.pdf <span style={{ color: arrow }}>→</span> Extract{" "}
          <span style={{ color: arrow }}>→</span> Verify
        </p>
        <p className="mt-1.5" style={{ color: muted }}>
          <span className="font-medium" style={{ color: ink }}>
            70%+
          </span>{" "}
          less manual effort
        </p>
      </div>
    );
  }

  if (id === "super") {
    return (
      <div className="text-[13px] leading-[1.45]">
        <p style={{ color: ink }}>
          Statement{" "}
          <span style={{ color: arrow }}>→</span> Match{" "}
          <span style={{ color: arrow }}>→</span> Batch{" "}
          <span style={{ color: arrow }}>→</span>{" "}
          <span className="inline-flex items-center gap-1">
            <span
              className="size-1.5 rounded-full"
              style={{ background: C.warning }}
            />
            Exception
          </span>
        </p>
        <p className="mt-1.5" style={{ color: muted }}>
          Matched{" "}
          <span className="font-medium" style={{ color: ink }}>
            142
          </span>
          {" · "}
          Exceptions{" "}
          <span className="font-medium" style={{ color: ink }}>
            7
          </span>
        </p>
      </div>
    );
  }

  if (id === "media") {
    return (
      <div className="text-[13px] leading-[1.45]">
        <p style={{ color: ink }}>Topic summary and insight</p>
        <div className="mt-2 space-y-1.5">
          <div
            className="h-px w-[92%]"
            style={{ background: dark ? C.darkBorder : C.border }}
          />
          <div
            className="h-px w-[72%]"
            style={{ background: dark ? C.darkBorder : C.border }}
          />
        </div>
        <p
          className="mt-2 inline-flex items-center gap-1"
          style={{ color: C.success }}
        >
          <Check className="size-3.5" strokeWidth={2.5} />
          Checked before publishing
        </p>
      </div>
    );
  }

  if (id === "gov") {
    return (
      <div className="text-[13px] leading-[1.45]">
        <p style={{ color: muted }}>What does the policy say about access?</p>
        <p className="mt-1" style={{ color: ink }}>
          Access follows the classification on each document.{" "}
          <span style={{ color: C.hover }}>[1] source</span>
        </p>
        <p
          className="mt-1.5 inline-flex items-center gap-1"
          style={{ color: ink }}
        >
          <Lock className="size-3.5" />
          Access matches classification
        </p>
      </div>
    );
  }

  if (id === "defence") {
    const lineColor = dark ? C.darkBorder : C.border;
    return (
      <div className="text-[13px] leading-[1.45]">
        <p className="inline-flex items-center gap-1.5" style={{ color: ink }}>
          <Lock className="size-3.5" />
          Deployed on your own infrastructure
        </p>
        <div className="mt-2.5 space-y-1.5">
          <div className="h-px w-[88%]" style={{ background: lineColor }} />
          <div className="h-px w-[64%]" style={{ background: lineColor }} />
        </div>
      </div>
    );
  }

  if (id === "metals") {
    return (
      <p className="text-[13px] leading-[1.45]" style={{ color: ink }}>
        Invoice <span style={{ color: arrow }}>→</span> Match{" "}
        <span style={{ color: arrow }}>→</span> Post
      </p>
    );
  }

  if (id === "construction") {
    return (
      <p className="text-[13px] leading-[1.45]" style={{ color: ink }}>
        Plan <span style={{ color: arrow }}>→</span> Extract{" "}
        <span style={{ color: arrow }}>→</span> Review
      </p>
    );
  }

  if (id === "telco") {
    return (
      <p className="text-[13px] leading-[1.45]" style={{ color: ink }}>
        Contract <span style={{ color: arrow }}>→</span> Clause{" "}
        <span style={{ color: arrow }}>→</span> Escalate
      </p>
    );
  }

  if (id === "medtech") {
    return (
      <p className="text-[13px] leading-[1.45]" style={{ color: ink }}>
        Pack <span style={{ color: arrow }}>→</span> Check{" "}
        <span style={{ color: arrow }}>→</span> Sign-off
      </p>
    );
  }

  return null;
}
