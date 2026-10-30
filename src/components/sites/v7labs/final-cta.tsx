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

const fieldClass = "zeon-field";

export function FinalCta() {
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const [interest, setInterest] = useState<string>("");
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
      className="relative z-[1] scroll-mt-24 border-t border-[#D9D9D9] bg-white"
      aria-labelledby="demo-heading"
    >
      {/*
        Mobile order: intro → particle → form → steps
        Desktop: left intro+steps+form, right particle (sticky)
      */}
      <div className="mx-auto grid max-w-[1360px] items-start gap-10 px-5 py-20 md:gap-12 md:px-8 md:py-28 lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] lg:gap-20">
        <FadeUp as="header" className="order-1 min-w-0">
          <h2
            id="demo-heading"
            className="font-[family-name:var(--font-aeonik)] text-[40px] leading-[1.05] tracking-[-0.03em] text-[#111111] md:text-[52px] xl:text-[56px]"
          >
            Book a demo
          </h2>
          <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.55] text-[#555555] md:text-[16px]">
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
          <h3 className="font-[family-name:var(--font-aeonik)] text-[18px] tracking-[-0.02em] text-[#111111] md:text-[20px]">
            What happens next
          </h3>
          <ol className="mt-4 border-y border-[#D9D9D9]">
            {NEXT_STEPS.map((step) => (
              <li
                key={step.n}
                className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-3 border-b border-[#E0E0E0] py-5 last:border-b-0"
              >
                <span className="font-mono text-[13px] text-[#356DFF]">
                  {step.n}
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-[#111111]">
                    {step.title}
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-[1.55] text-[#555555]">
                    {step.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </FadeUp>

        <FadeUp
          delay={0.12}
          className="order-3 min-w-0 lg:order-4"
        >
        <form
          onSubmit={onSubmit}
          autoComplete="on"
          className="relative min-w-0 overflow-hidden rounded-[12px] border border-white/12 bg-[#0A0A0C]/92 p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-7"
          style={{
            backgroundImage:
              "linear-gradient(165deg, rgba(18,18,20,0.96) 0%, rgba(10,10,12,0.94) 48%, rgba(8,8,10,0.96) 100%)",
          }}
          noValidate
          aria-labelledby="demo-form-title"
        >
          <h3
            id="demo-form-title"
            className="font-[family-name:var(--font-aeonik)] text-[20px] tracking-[-0.02em] text-[#F5F5F5]"
          >
            Your details
          </h3>
          <p className="mt-1.5 text-[13px] text-[#8A8A8A]">
            All fields are required unless marked optional.
          </p>

          <input type="hidden" name="form" value="demo" />

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
              <span className="text-[13px] font-medium text-[#E8E8E8]">
                Role{" "}
                <span className="font-normal text-[#7A7A7A]">(optional)</span>
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
            <span className="text-[13px] font-medium text-[#E8E8E8]">
              Your role or team{" "}
              <span className="font-normal text-[#7A7A7A]">(optional)</span>
            </span>
            <input name="team" type="text" className={fieldClass} />
          </label>

          <fieldset className="mt-5">
            <legend className="text-[13px] font-medium text-[#E8E8E8]">
              Interested in
            </legend>
            <div
              role="radiogroup"
              aria-label="Interested in"
              className="mt-2.5 flex flex-wrap gap-2"
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
                    className="zeon-chip"
                    data-selected={selected}
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
            <span className="text-[13px] font-medium text-[#E8E8E8]">
              Message{" "}
              <span className="font-normal text-[#7A7A7A]">(optional)</span>
            </span>
            <textarea
              name="message"
              rows={4}
              className="zeon-field mt-2 h-auto min-h-[6.5rem] resize-y py-3"
            />
          </label>

          <label className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0" aria-hidden>
            Leave this field empty
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          <label className="mt-5 flex items-start gap-2.5 text-[12px] leading-[1.5] text-[#9A9A9A]">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 size-4 shrink-0 rounded-[2px] border-white/20 bg-[#0C0C0E] accent-[#356DFF]"
            />
            <span>
              I agree that ZeonAI Labs may contact me about this request. See
              the{" "}
              <a
                href="/privacy-policy"
                className="text-[#7BA0FF] underline underline-offset-2"
              >
                privacy policy
              </a>
              .
            </span>
          </label>

          {status === "error" ? (
            <div
              role="alert"
              className="mt-5 rounded-[8px] border border-white/14 bg-white/[0.04] px-4 py-3 text-[13px] text-[#F0F0F0] backdrop-blur-sm"
            >
              <p className="font-medium">We could not send your request.</p>
              <p className="mt-1 text-[#9A9A9A]">
                Email us at{" "}
                <a
                  href="mailto:contact@zeonai.com"
                  className="text-[#7BA0FF] underline underline-offset-2"
                >
                  contact@zeonai.com
                </a>{" "}
                and we will reply directly.
              </p>
              <p className="mt-2 text-[11px] text-[#6B6B6B]">
                Staging build: no form endpoint is configured, so nothing was
                sent or stored.
              </p>
            </div>
          ) : null}

          <ZeonButton type="submit" tone="accent" block className="mt-6 !rounded-[8px]">
            Book a demo
          </ZeonButton>
          <noscript>
            <p className="mt-3 text-[12px] text-[#9A9A9A]">
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
        className="absolute inset-0 h-full w-full scale-[1.22] object-cover object-center"
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
      <span className="text-[13px] font-medium text-[#E8E8E8]">{label}</span>
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
