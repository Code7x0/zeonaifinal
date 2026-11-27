"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { PageShell } from "./page-shell";
import {
  Chapter,
  ChapterLabel,
  ChapterLead,
  ChapterTitle,
  SecondaryHero,
} from "./secondary/chapter";
import { ZeonButton } from "./zeon-ui";
import { VideoSection } from "@/components/sites/v7labs/video";

const AGENDA = [
  {
    n: "01",
    title: "Your process",
    body: "We start with the workflow or knowledge problem that costs you most.",
  },
  {
    n: "02",
    title: "Platform on a relevant scenario",
    body: "AI Workspace on a sector sample — or documents you choose to share.",
  },
  {
    n: "03",
    title: "Governance and deployment",
    body: "Access, review, audit, and how cloud or on-premises would be scoped.",
  },
] as const;

const INTEREST = ["AI Workspace", "Agent Hub", "Both"] as const;

/**
 * Dedicated demo conversion page — does not reuse homepage FinalCta video band.
 * No fake success: form has no backend endpoint.
 */
export function DemoPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = String(formData.get("website") ?? "").trim();
    if (honeypot.length > 0) {
      setStatus("idle");
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const role = String(formData.get("role") ?? "").trim();
    const interest = String(formData.get("interest") ?? "").trim();
    const processText = String(formData.get("process") ?? "").trim();

    if (!name || !email || !company || !interest || !processText) {
      setErrorMessage("Please complete all required fields.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          role,
          interest,
          process: processText,
          website: honeypot,
          source: "demo-page",
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!res.ok || !data?.ok) {
        setErrorMessage(
          data?.error || "We could not send your request. Please try again.",
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage("Network error. Please try again or email us directly.");
      setStatus("error");
    }
  }

  return (
    <PageShell>
      <SecondaryHero
        label="Company · Book a demo"
        title="See AI Workspace on your workflow."
        lead="A calm walkthrough of governed answers, agents and human checkpoints — not a generic pitch deck."
        align="center"
        primaryHref="#request"
        primaryLabel="Request a time"
        secondaryHref="/products/ai-workspace"
        secondaryLabel="Explore AI Workspace"
      />

      <Chapter tone="paper" min={false} className="!min-h-0 border-t border-[#E9EAEB]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
          <div>
            <ChapterLabel>What we cover</ChapterLabel>
            <ChapterTitle>Proposed meeting agenda.</ChapterTitle>
            <ol className="mt-10 space-y-6">
              {AGENDA.map((item) => (
                <li key={item.n} className="flex gap-4 border-t border-[#E9EAEB] pt-5">
                  <span className="font-mono text-[12px] text-[#1B46F5]">
                    {item.n}
                  </span>
                  <div>
                    <p className="text-[16px] font-medium tracking-[-0.02em]">
                      {item.title}
                    </p>
                    <p className="mt-1 max-w-[40ch] text-[14px] leading-[1.5] text-[#535862]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <VideoSection
            assetId="demo-expectations"
            eyebrow="Preview"
            headline="What you will see in the demo"
            body="A governed walkthrough aligned to the agenda — cited answers, agents and human checkpoints on a workflow that matters to your team."
            after="Preview of the session — cited answers, agents and human checkpoints."
            layout="stack"
          />
        </div>
      </Chapter>

      <Chapter tone="mist" id="request" min={false} className="!min-h-0">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12">
          <div>
            <ChapterLabel tone="mist">Request</ChapterLabel>
            <ChapterTitle>Tell us a little.</ChapterTitle>
            <ChapterLead tone="mist">
              Share your role and workflow context. We respond by email.
            </ChapterLead>
            <p className="mt-6 text-[14px] text-[#535862]">
              Prefer email now:{" "}
              <a href="mailto:contact@zeonai.com" className="zeon-link">
                contact@zeonai.com
              </a>
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="border border-[#E9EAEB] bg-white p-6 md:p-8"
          >
            <p className="text-[12px] text-[#9AA8A6]">
              Required unless marked optional.
            </p>
            <div className="mt-5 space-y-4">
              <Field label="Name" name="name" required />
              <Field label="Work email" name="email" type="email" required />
              <Field label="Company" name="company" required />
              <Field label="Role or team" name="role" optional />
              <fieldset>
                <legend className="text-[13px] text-[#181D27]">
                  Interested in
                </legend>
                <div className="mt-2 flex flex-wrap gap-3 text-[13px] text-[#535862]">
                  {INTEREST.map((opt) => (
                    <label key={opt} className="inline-flex items-center gap-2">
                      <input type="radio" name="interest" value={opt} required />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block">
                <span className="text-[13px] text-[#181D27]">
                  Process to discuss
                </span>
                <textarea
                  name="process"
                  required
                  rows={4}
                  className="zeon-field mt-1.5 min-h-[110px] resize-y"
                />
              </label>
              <div className="hidden" aria-hidden>
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
            </div>

            {status === "success" ? (
              <p
                role="status"
                aria-live="polite"
                className="mt-4 border border-[#E9EAEB] bg-[#FAFAFA] px-3 py-3 text-[13px] leading-[1.5] text-[#181D27]"
              >
                Demo request received. Our team will reply to your work email
                shortly.
              </p>
            ) : null}

            {status === "error" ? (
              <p
                role="alert"
                className="mt-4 border border-[#E9EAEB] bg-[#FAFAFA] px-3 py-3 text-[13px] leading-[1.5] text-[#535862]"
              >
                {errorMessage || "We could not send your request."}{" "}
                You can also email{" "}
                <a href="mailto:contact@zeonai.com" className="zeon-link">
                  contact@zeonai.com
                </a>{" "}
                with the same details.
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <ZeonButton
                type="submit"
                tone="ink"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Submit request"}
              </ZeonButton>
              <Link href="/privacy-policy" className="text-[12px] text-[#535862]">
                Privacy policy
              </Link>
            </div>
          </form>
        </div>
      </Chapter>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[13px] text-[#181D27]">
        {label}
        {optional ? (
          <span className="text-[#9AA8A6]"> · optional</span>
        ) : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="zeon-field mt-1.5"
      />
    </label>
  );
}
