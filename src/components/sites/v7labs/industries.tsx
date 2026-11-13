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
  Landmark,
  Lock,
  Newspaper,
  Shield,
} from "lucide-react";
import {
  INDUSTRY_CARDS,
  LENDING_VALIDATION,
  type IndustryCard,
  type IndustryCardId,
} from "./industries/industries-home-config";

/** DeepProbe palette — no beige, no rainbow. */
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
};

/**
 * Industries bento — polished composition on DeepProbe tokens.
 * Outcomes marquee is a separate sibling on the homepage; do not touch it.
 */
export function Industries() {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useInView(sectionRef, { once: true, amount: 0.12 });

  const featured = INDUSTRY_CARDS.find((c) => c.featured)!;
  const rest = INDUSTRY_CARDS.filter((c) => !c.featured);
  const [superCard, mediaCard, govCard, defenceCard, metalsCard] = rest;

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="bg-white px-5 py-20 md:px-8 md:py-24"
      style={{ color: C.heading }}
    >
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={revealed ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <h2 className="max-w-[720px] text-balance font-[family-name:var(--font-aeonik)] text-[36px] font-normal leading-[1.06] tracking-[-0.035em] md:text-[52px]">
            Built for regulated,{" "}
            <br className="hidden sm:block" />
            <span className="whitespace-nowrap">document-heavy</span> sectors
          </h2>
          <p
            className="mt-4 max-w-[560px] text-[16px] leading-[1.6] md:text-[17px]"
            style={{ color: C.body }}
          >
            The same platform, with agents built for each sector. Examples from
            our agent portfolio.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          <CardMotion index={0} revealed={revealed} reduceMotion={reduceMotion} className="md:col-span-2 xl:col-span-2 xl:row-span-2">
            <FeaturedCard card={featured} revealed={revealed} reduceMotion={reduceMotion} />
          </CardMotion>

          <CardMotion index={1} revealed={revealed} reduceMotion={reduceMotion}>
            <SectorCard card={superCard!} />
          </CardMotion>
          <CardMotion index={2} revealed={revealed} reduceMotion={reduceMotion}>
            <SectorCard card={mediaCard!} />
          </CardMotion>
          <CardMotion index={3} revealed={revealed} reduceMotion={reduceMotion}>
            <SectorCard card={govCard!} />
          </CardMotion>
          <CardMotion index={4} revealed={revealed} reduceMotion={reduceMotion}>
            <SectorCard card={defenceCard!} />
          </CardMotion>
          <CardMotion index={5} revealed={revealed} reduceMotion={reduceMotion} className="md:col-span-2 xl:col-span-1">
            <SectorCard card={metalsCard!} />
          </CardMotion>
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

function FeaturedCard({
  card,
  revealed,
  reduceMotion,
}: {
  card: IndustryCard;
  revealed: boolean;
  reduceMotion: boolean;
}) {
  return (
    <Link
      href={card.href}
      aria-label={card.a11yName}
      className="group relative flex h-full flex-col overflow-hidden p-8 text-white no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2962FF] xl:min-h-[526px] xl:flex-row xl:gap-8"
      style={{
        borderRadius: 2,
        background:
          "linear-gradient(135deg, #172AB6 0%, #1B46F5 60%, #2962FF 100%)",
      }}
    >
      {/* 32px grid overlay, fades toward bottom-left */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 100% 0%, #000 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 100% 0%, #000 20%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-[1] flex min-w-0 flex-col xl:max-w-[46%] xl:flex-1 xl:justify-between">
        <div>
          <p
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em]"
            style={{ color: C.blue300 }}
          >
            <span
              className="size-1.5 shrink-0"
              style={{ background: C.blue300, borderRadius: 1 }}
              aria-hidden
            />
            Featured
          </p>
          <h3 className="mt-5 font-[family-name:var(--font-aeonik)] text-[28px] font-normal leading-[1.15] tracking-[-0.02em] md:text-[36px]">
            {card.label}
          </h3>
          <p
            className="mt-3 max-w-[36ch] text-[18px] leading-[1.5]"
            style={{ color: "#D9E6FF" }}
          >
            {card.outcome}
          </p>
        </div>

        <div className="mt-8 xl:mt-0">
          <p className="text-[14px]" style={{ color: "#D9E6FF" }}>
            {card.agents.join(" · ")}
          </p>
          <span
            className="mt-5 inline-flex h-11 min-h-[44px] w-full items-center justify-center gap-2 bg-white px-5 text-[14px] font-medium text-[#192A8F] transition-colors group-hover:bg-[#EEF4FF] sm:w-auto xl:h-10 xl:min-h-[40px]"
            style={{ borderRadius: 2 }}
          >
            {card.exploreLabel}
            <ArrowRight
              className="size-3.5 transition-transform duration-150 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </div>

      <div className="relative z-[1] mt-8 flex min-h-[280px] w-full min-w-0 flex-1 self-stretch xl:mt-0 xl:max-w-[54%]">
        <FeaturedVignette revealed={revealed} reduceMotion={reduceMotion} />
      </div>
    </Link>
  );
}

function FeaturedVignette({
  revealed,
  reduceMotion,
}: {
  revealed: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div
      className="flex h-full w-full flex-col"
      style={{
        borderRadius: 2,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.16)",
      }}
      aria-hidden
    >
      <div
        className="flex h-12 shrink-0 items-center justify-between gap-3 px-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.16)" }}
      >
        <span className="inline-flex items-center gap-2 text-[14px] font-medium text-white">
          <FileText className="size-3.5" />
          Loan_application.pdf
        </span>
        <span
          className="font-mono text-[12px]"
          style={{ color: C.blue200 }}
        >
          DocAI extracting fields
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-evenly">
        {LENDING_VALIDATION.map((row, i) => {
          const review = row.status === "Review";
          return (
            <motion.div
              key={row.field}
              className="flex min-h-[60px] items-center justify-between px-4"
              style={{
                borderBottom:
                  i < LENDING_VALIDATION.length - 1
                    ? "1px solid rgba(255,255,255,0.12)"
                    : undefined,
                background: review ? "rgba(255,255,255,0.08)" : undefined,
                boxShadow: review
                  ? `inset 2px 0 0 ${C.warningSoft}`
                  : undefined,
              }}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={revealed ? { opacity: 1 } : undefined}
              transition={{
                duration: 0.2,
                delay: reduceMotion ? 0 : 0.15 + i * 0.12,
                ease: EASE,
              }}
            >
              <span className="text-[15px] text-white">{row.field}</span>
              <span className="inline-flex items-center gap-1.5 text-[14px]">
                {review ? (
                  <>
                    <span
                      className="size-1.5 shrink-0 rounded-full"
                      style={{ background: C.warningSoft }}
                    />
                    <span style={{ color: C.warningSoft }}>Review</span>
                  </>
                ) : (
                  <>
                    <Check
                      className="size-3.5 text-white"
                      strokeWidth={2.5}
                    />
                    <span className="text-white">Verified</span>
                  </>
                )}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div
        className="flex min-h-[88px] shrink-0 items-baseline gap-3 px-4 py-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.16)" }}
      >
        <span className="font-[family-name:var(--font-aeonik)] text-[40px] leading-none tracking-[-0.03em] text-white">
          70%+
        </span>
        <span className="text-[14px]" style={{ color: "#D9E6FF" }}>
          less manual effort
        </span>
      </div>
    </div>
  );
}

function SectorCard({ card }: { card: IndustryCard }) {
  const dark = Boolean(card.dark);
  const Icon = ICONS[card.id];

  return (
    <Link
      href={card.href}
      aria-label={card.a11yName}
      className="group flex h-full min-h-[240px] flex-col p-6 no-underline transition-[border-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-h-[255px]"
      style={{
        borderRadius: 2,
        background: dark ? C.dark : C.white,
        border: `1px solid ${dark ? C.darkBorder : C.border}`,
        color: dark ? C.white : C.heading,
        outlineColor: dark ? C.blue400 : C.brand,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = dark ? C.blue400 : C.brand;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = dark ? C.darkBorder : C.border;
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

      {/* 3. Quiet vignette — one level only, no border */}
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

      {/* 4. Footer — agent + arrow */}
      <div
        className="mt-auto flex items-center justify-between gap-3 pt-4"
        style={{
          borderTop: `1px solid ${dark ? C.darkBorder : C.border}`,
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
    return (
      <div className="text-[13px] leading-[1.45]">
        <p className="inline-flex items-center gap-1.5 text-white">
          <Lock className="size-3.5" />
          Deployed on your own infrastructure
        </p>
        <div className="mt-2.5 space-y-1.5">
          <div className="h-px w-[88%]" style={{ background: C.darkBorder }} />
          <div className="h-px w-[64%]" style={{ background: C.darkBorder }} />
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

  return null;
}
