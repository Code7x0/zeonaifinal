"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from "react";
import { FadeUp } from "./fade-up";
import { ZeonButton } from "./zeon-ui";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4";

const PARTICLE_POSTER = "/sites/v7labs/demo-particle.png";

const NEXT_STEPS = [
  {
    n: "01",
    title: "A conversation about your process",
    body: "We start with the workflow or knowledge problem that costs you most.",
  },
  {
    n: "02",
    title: "The platform on a relevant workflow",
    body: "We show AI Workspace on a scenario from your sector, or on a sample of your documents if you share one.",
  },
  {
    n: "03",
    title: "Deployment and governance answers",
    body: "Cloud, private cloud or on-premises, and how role-based access, review and audit work in your environment.",
  },
] as const;

const ROLE_OPTIONS = [
  "Finance manager",
  "Legal and contracts lead",
  "Procurement and tenders lead",
  "Compliance and KYC officer",
  "Operations head",
  "Credit analyst",
  "Something else",
] as const;

const INTEREST_OPTIONS = ["AI Workspace", "Agent Hub", "Both"] as const;

const fieldClass =
  "zeon-field !mt-1.5 !h-11 !rounded-[10px] !border-white/[0.1] !bg-[#12161F]";

export function FinalCta() {
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const [interest, setInterest] = useState<string>("AI Workspace");
  const videoRef = useRef<HTMLVideoElement>(null);
  const sculptureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const root = sculptureRef.current;
    if (!video || !root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      video.pause();
      return;
    }

    video.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play().catch(() => {
            /* autoplay may be blocked */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = new FormData(form).get("website");
    // Silent reject if honeypot was filled (bot traffic).
    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      setStatus("idle");
      return;
    }
    // No form endpoint is configured — do not claim success or store data.
    setStatus("error");
  }

  return (
    <section
      id="demo"
      className="zeon-section-white relative z-[1] scroll-mt-24 border-t border-[#E9EAEB] [background-image:radial-gradient(ellipse_50%_40%_at_0%_0%,rgba(41,98,255,0.08),transparent_55%),radial-gradient(ellipse_40%_35%_at_100%_100%,rgba(21,183,158,0.06),transparent_50%)]"
      aria-labelledby="demo-heading"
    >
      {/*
        Mobile order: intro → particle → form → steps
        Desktop: left intro+steps+form, right particle (sticky)
      */}
      <div className="zeon-section-pad mx-auto grid max-w-[var(--zeon-container-wide,1280px)] items-start gap-8 px-[var(--zeon-gutter,1.25rem)] md:gap-12 lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] lg:gap-20">
        <FadeUp as="header" className="order-1 min-w-0">
          <h2
            id="demo-heading"
            className="zeon-type-hero text-balance text-[#181D27]"
          >
            Book a demo
          </h2>
          <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.55] text-[#535862] md:text-[16px]">
            See AI Workspace on a workflow that matters to you. Tell us a little
            about your team and we will arrange a time.
          </p>
        </FadeUp>

        <FadeUp
          delay={0.08}
          className="order-2 min-w-0 lg:row-span-3 lg:self-start lg:sticky lg:top-28"
        >
          <ParticleSculpture
            videoRef={videoRef}
            sculptureRef={sculptureRef}
          />
        </FadeUp>

        <FadeUp delay={0.1} className="order-4 min-w-0 lg:order-3">
          <h3 className="font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em] text-[#181D27] md:text-[20px]">
            What happens next
          </h3>
          <ol className="mt-4 border-y border-[#D9D9D9]">
            {NEXT_STEPS.map((step) => (
              <li
                key={step.n}
                className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-3 border-b border-[#E0E0E0] py-5 last:border-b-0"
              >
                <span className="font-mono text-[13px] text-[#2962FF]">
                  {step.n}
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-[#181D27]">
                    {step.title}
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-[1.55] text-[#535862]">
                    {step.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </FadeUp>

        <FadeUp delay={0.12} className="order-3 min-w-0 lg:order-4">
          <form
            onSubmit={onSubmit}
            autoComplete="on"
            className="relative min-w-0 overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#12161F] p-5 sm:p-7"
            noValidate
            aria-labelledby="demo-form-title"
          >
            <div className="border-b border-white/[0.08] pb-5">
              <h3
                id="demo-form-title"
                className="font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.025em] text-[#F5F6F8]"
              >
                Your details
              </h3>
              <p className="mt-1.5 text-[13px] leading-snug text-[#8B93A1]">
                Required unless marked optional.
              </p>
            </div>

            <input type="hidden" name="form" value="demo" />

            <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5">
              <Field label="Name" name="name" autoComplete="name" required />
              <Field
                label="Work email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
              <Field
                label="Company"
                name="company"
                autoComplete="organization"
                required
              />
              <label className="block">
                <span className="text-[13px] font-medium text-[#E8EAEB]">
                  Role{" "}
                  <span className="font-normal text-[#727B8B]">(optional)</span>
                </span>
                <select
                  name="role"
                  autoComplete="organization-title"
                  defaultValue=""
                  className={fieldClass}
                >
                  <option value="">Choose your role</option>
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-[13px] font-medium text-[#E8EAEB]">
                Your role or team{" "}
                <span className="font-normal text-[#727B8B]">(optional)</span>
              </span>
              <input name="team" type="text" className={fieldClass} />
            </label>

            <fieldset className="mt-5">
              <legend className="text-[13px] font-medium text-[#E8EAEB]">
                Interested in
              </legend>
              <div
                role="radiogroup"
                aria-label="Interested in"
                className="mt-2.5 flex rounded-[12px] border border-white/[0.08] bg-[#0C1018] p-1"
              >
                {INTEREST_OPTIONS.map((opt) => {
                  const selected = interest === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setInterest(opt)}
                      className={`min-h-[40px] flex-1 rounded-[8px] px-3 text-[13px] font-medium tracking-[-0.01em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2962FF] ${
                        selected
                          ? "bg-[#1B46F5] text-white"
                          : "text-[#8B93A1] hover:text-[#F5F6F8]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                name="interest"
                value={interest}
                required
                tabIndex={-1}
                aria-hidden
                className="pointer-events-none absolute h-px w-px opacity-0"
                onChange={() => {}}
              />
            </fieldset>

            <label className="mt-5 block">
              <span className="text-[13px] font-medium text-[#E8EAEB]">
                Message{" "}
                <span className="font-normal text-[#727B8B]">(optional)</span>
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder="What workflow should we walk through?"
                className={`${fieldClass} !mt-1.5 !h-auto min-h-[6.5rem] resize-y !py-3 placeholder:text-[#5A6270]`}
              />
            </label>

            <label
              className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
              aria-hidden
            >
              Leave this field empty
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <label className="mt-6 flex items-start gap-2.5 text-[12px] leading-[1.5] text-[#8B93A1]">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 size-4 shrink-0 rounded-[3px] border-white/20 bg-[#0C1018] accent-[#2962FF]"
              />
              <span>
                I agree that ZeonAI Labs may contact me about this request. See
                the{" "}
                <a
                  href="/privacy-policy"
                  className="font-medium text-[#8EB8FF] underline underline-offset-2"
                >
                  privacy policy
                </a>
                .
              </span>
            </label>

            {status === "error" ? (
              <div
                role="alert"
                className="mt-5 rounded-[10px] border border-white/12 bg-white/[0.04] px-4 py-3 text-[13px] text-[#F5F6F8]"
              >
                <p className="font-medium">We could not send your request.</p>
                <p className="mt-1 text-[#8B93A1]">
                  Email us at{" "}
                  <a
                    href="mailto:contact@zeonai.com"
                    className="font-medium text-[#8EB8FF] underline underline-offset-2"
                  >
                    contact@zeonai.com
                  </a>{" "}
                  and we will reply directly.
                </p>
                <p className="mt-2 text-[11px] text-[#5A6270]">
                  Staging build: no form endpoint is configured, so nothing was
                  sent or stored.
                </p>
              </div>
            ) : null}

            <ZeonButton
              type="submit"
              tone="accent"
              block
              className="mt-6 !h-12 !rounded-[10px] !text-[15px]"
            >
              Book a demo
            </ZeonButton>
            <noscript>
              <p className="mt-3 text-[12px] text-[#8B93A1]">
                This form needs JavaScript. Email us at contact@zeonai.com
                instead.
              </p>
            </noscript>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

function ParticleSculpture({
  videoRef,
  sculptureRef,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  sculptureRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={sculptureRef}
      className="relative aspect-[5/4] w-full overflow-hidden bg-white max-lg:max-h-[340px] lg:aspect-square lg:h-[min(560px,42vw)] lg:max-h-[560px]"
      style={{
        maskImage:
          "radial-gradient(ellipse 78% 72% at 50% 48%, #000 42%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 78% 72% at 50% 48%, #000 42%, transparent 78%)",
      }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full max-w-full scale-[1.22] object-cover object-center"
        src={VIDEO_SRC}
        poster={PARTICLE_POSTER}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="ZeonAI governed intelligence particle sculpture"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 48%, transparent 35%, rgba(255,255,255,0.55) 72%, #fff 100%)",
        }}
      />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-[#E8EAEB]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </label>
  );
}
