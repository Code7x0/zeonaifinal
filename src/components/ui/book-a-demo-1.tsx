"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4";

const PARTICLE_POSTER = "/sites/v7labs/demo-particle.png";

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

const DEMO_HIGHLIGHTS = [
  {
    lead: "Schedule a consultation with a ",
    bold: "solutions architect",
  },
  {
    lead: "Map out your document workflows and ",
    bold: "automation opportunities",
  },
  {
    lead: "Walk through AI Workspace on a ",
    bold: "scenario from your sector",
  },
  {
    lead: "Review cloud, private cloud, or air-gapped on-premises deployment",
    bold: null,
  },
  {
    lead: "Verify role-based access controls, citations, and audit trails",
    bold: null,
  },
  {
    lead: "Start with a governed pilot scoped to real enterprise workflows",
    bold: null,
  },
] as const;

const Bookademo4 = () => {
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const [interest, setInterest] = useState<string>("AI Workspace");
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const root = mediaRef.current;
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
    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      setStatus("idle");
      return;
    }
    setStatus("error");
  }

  return (
    <section
      id="demo"
      className="zeon-section-white relative z-[1] scroll-mt-24 border-t border-[#E5E7EB] bg-white text-[#181D27]"
      aria-labelledby="demo-heading"
    >
      <div className="mx-auto max-w-[1280px] border-[#E5E7EB] lg:border-x">
        {/* Top centered display heading */}
        <div className="border-b border-[#E5E7EB] px-4 py-10 sm:px-6 md:py-14">
          <h2
            id="demo-heading"
            className="w-full text-center font-[family-name:var(--font-aeonik)] text-4xl font-normal tracking-[-0.03em] text-[#181D27] sm:text-5xl lg:text-6xl"
          >
            Book a Demo
          </h2>
        </div>

        {/* Two-column architectural split */}
        <div className="grid lg:grid-cols-2">
          {/* Left column: value points & visual preview */}
          <div className="flex flex-col justify-between space-y-10 p-6 sm:p-10 xl:p-16">
            <div className="space-y-8">
              <p className="max-w-[48ch] text-[15px] leading-[1.6] text-[#535862]">
                See how ZeonAI helps regulated teams process documents faster,
                enforce governance, and deploy trusted AI agents at scale:
              </p>

              <ul className="space-y-3.5">
                {DEMO_HIGHLIGHTS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2962FF]">
                      <Check className="size-3.5 stroke-[2.25]" aria-hidden />
                    </span>
                    <p className="text-[14px] leading-[1.55] text-[#344054]">
                      {item.lead}
                      {item.bold ? (
                        <span className="font-semibold text-[#181D27]">
                          {item.bold}
                        </span>
                      ) : null}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-[family-name:var(--font-aeonik)] text-2xl font-medium tracking-[-0.02em] text-[#181D27] sm:text-[26px]">
                Get a demo today
              </h3>
              <div
                ref={mediaRef}
                className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-3 shadow-[0_1px_3px_rgba(16,24,40,0.05)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-white">
                  <video
                    ref={videoRef}
                    className="h-full w-full scale-[1.12] object-cover object-center"
                    src={VIDEO_SRC}
                    poster={PARTICLE_POSTER}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="ZeonAI governed intelligence preview"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_50%,transparent_45%,rgba(255,255,255,0.45)_100%)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right column: clean light structured form */}
          <div className="relative border-t border-[#E5E7EB] bg-[#FAFBFC] p-6 sm:p-10 lg:border-l lg:border-t-0 xl:p-16">
            <form
              onSubmit={onSubmit}
              autoComplete="on"
              noValidate
              aria-labelledby="demo-form-title"
              className="mx-auto max-w-[520px] space-y-6 rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,0.05),0_8px_24px_-4px_rgba(16,24,40,0.06)] sm:p-8"
            >
              <div>
                <h3
                  id="demo-form-title"
                  className="font-[family-name:var(--font-aeonik)] text-xl font-medium tracking-[-0.02em] text-[#181D27]"
                >
                  Your details
                </h3>
                <p className="mt-1 text-[13px] text-[#717680]">
                  Tell us about your team and we will arrange a tailored session.
                </p>
              </div>

              <input type="hidden" name="form" value="demo" />

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="demo-name">Full name</Label>
                  <Input
                    id="demo-name"
                    name="name"
                    type="text"
                    placeholder="Jane Smith"
                    autoComplete="name"
                    className="mt-1.5"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="demo-email">Work email</Label>
                  <Input
                    id="demo-email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    autoComplete="email"
                    className="mt-1.5"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="demo-company">Company</Label>
                    <Input
                      id="demo-company"
                      name="company"
                      type="text"
                      placeholder="Acme Financial"
                      autoComplete="organization"
                      className="mt-1.5"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="demo-role">Role</Label>
                    <select
                      id="demo-role"
                      name="role"
                      autoComplete="organization-title"
                      defaultValue=""
                      className="mt-1.5 flex h-10 w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#181D27] focus-visible:border-[#2962FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2962FF]/20"
                    >
                      <option value="">Choose your role</option>
                      {ROLE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <fieldset>
                  <legend className="text-[13px] font-medium text-[#181D27]">
                    Interested in
                  </legend>
                  <div
                    role="radiogroup"
                    aria-label="Interested in"
                    className="mt-1.5 flex rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-1"
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
                          className={`min-h-[36px] flex-1 whitespace-nowrap rounded-md px-2 text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2962FF] sm:px-2.5 sm:text-[13px] ${
                            selected
                              ? "bg-[#1B46F5] text-white shadow-xs"
                              : "text-[#535862] hover:text-[#181D27]"
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

                <div>
                  <Label htmlFor="demo-message">
                    Workflow or message{" "}
                    <span className="font-normal text-[#717680]">
                      (optional)
                    </span>
                  </Label>
                  <textarea
                    id="demo-message"
                    name="message"
                    rows={3}
                    placeholder="What workflow should we walk through?"
                    className="mt-1.5 flex w-full resize-y rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#181D27] placeholder:text-[#9CA3AF] focus-visible:border-[#2962FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2962FF]/20"
                  />
                </div>
              </div>

              {/* Honeypot */}
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

              <p className="text-[12px] leading-[1.55] text-[#717680]">
                By submitting this form, I agree that ZeonAI Labs may contact me
                about this request. See our{" "}
                <a
                  href="/privacy-policy"
                  className="font-medium text-[#1B46F5] underline underline-offset-2 hover:text-[#1433E1]"
                >
                  privacy policy
                </a>
                .
              </p>

              {status === "error" ? (
                <div
                  role="alert"
                  className="rounded-lg border border-[#DCE8FF] bg-[#EEF4FF] px-4 py-3 text-[13px] text-[#181D27]"
                >
                  <p className="font-medium">We could not send your request.</p>
                  <p className="mt-1 text-[#535862]">
                    Email us at{" "}
                    <a
                      href="mailto:contact@zeonai.com"
                      className="font-medium text-[#1B46F5] underline underline-offset-2"
                    >
                      contact@zeonai.com
                    </a>{" "}
                    and we will reply directly.
                  </p>
                  <p className="mt-1.5 text-[11px] text-[#717680]">
                    Staging build: no form endpoint is configured, so nothing
                    was sent or stored.
                  </p>
                </div>
              ) : null}

              <Button
                type="submit"
                className="h-11 w-full rounded-lg bg-[#1B46F5] text-[15px] font-medium text-white hover:bg-[#1433E1]"
              >
                Book Demo
              </Button>

              <noscript>
                <p className="text-[12px] text-[#717680]">
                  This form needs JavaScript. Email us at contact@zeonai.com
                  instead.
                </p>
              </noscript>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Bookademo4 };
export default Bookademo4;
