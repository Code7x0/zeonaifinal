"use client";

import { useId, useState, type FormEvent } from "react";
import { ZeonButton } from "./zeon-ui";

const TOPICS = [
  "General enquiry",
  "Product & platform",
  "Partnerships & press",
] as const;

type FieldErrors = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  consent?: string;
};

export function ContactForm() {
  const baseId = useId();
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "error">("idle");

  function validate(fd: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const consent = fd.get("consent");

    if (!name) next.name = "Please enter your name.";
    if (!email) {
      next.email = "Please enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!company) next.company = "Please enter your company name.";
    if (!message) next.message = "Please tell us a little about your enquiry.";
    if (!consent) next.consent = "Please confirm you agree to the privacy policy.";
    return next;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const honeypot = fd.get("website");
    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      setErrors({});
      setStatus("idle");
      return;
    }

    const nextErrors = validate(fd);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    // No backend form endpoint configured — report clearly without faking submission.
    setStatus("error");
  }

  const inputClass = (hasError?: string) =>
    `mt-1.5 w-full rounded-[8px] border bg-white px-3.5 py-2.5 text-[14px] text-[#181D27] outline-none transition-colors placeholder:text-[#A4A7AE] focus-visible:ring-2 focus-visible:ring-[#2962FF]/25 ${
      hasError
        ? "border-[#F04438] focus-visible:border-[#F04438]"
        : "border-[#D5D7DA] hover:border-[#A4A7AE] focus-visible:border-[#2962FF]"
    }`;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={`${baseId}-heading`}
      className="rounded-[12px] border border-[#E9EAEB] bg-white p-6 shadow-[0_8px_24px_rgba(24,29,39,0.06)] md:p-8"
    >
      <div className="border-b border-[#E9EAEB] pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2962FF]">
          Message
        </p>
        <h2
          id={`${baseId}-heading`}
          className="mt-1.5 font-[family-name:var(--font-aeonik)] text-[22px] font-normal tracking-[-0.02em] text-[#181D27]"
        >
          Send an enquiry
        </h2>
        <p className="mt-1 text-[13px] text-[#717680]">
          Fields marked optional can be left blank.
        </p>
      </div>

      <input type="hidden" name="form" value="contact" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${baseId}-name`}
            className="block text-[13px] font-medium text-[#181D27]"
          >
            Name
          </label>
          <input
            id={`${baseId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${baseId}-name-err` : undefined}
            className={inputClass(errors.name)}
            placeholder="Alex Morgan"
          />
          {errors.name ? (
            <p id={`${baseId}-name-err`} className="mt-1 text-[12px] text-[#B42318]">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${baseId}-email`}
            className="block text-[13px] font-medium text-[#181D27]"
          >
            Work email
          </label>
          <input
            id={`${baseId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${baseId}-email-err` : undefined}
            className={inputClass(errors.email)}
            placeholder="alex@company.com"
          />
          {errors.email ? (
            <p id={`${baseId}-email-err`} className="mt-1 text-[12px] text-[#B42318]">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${baseId}-company`}
            className="block text-[13px] font-medium text-[#181D27]"
          >
            Company
          </label>
          <input
            id={`${baseId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            required
            aria-invalid={Boolean(errors.company)}
            aria-describedby={
              errors.company ? `${baseId}-company-err` : undefined
            }
            className={inputClass(errors.company)}
            placeholder="Contoso Financial"
          />
          {errors.company ? (
            <p
              id={`${baseId}-company-err`}
              className="mt-1 text-[12px] text-[#B42318]"
            >
              {errors.company}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${baseId}-role`}
            className="block text-[13px] font-medium text-[#181D27]"
          >
            Role or team{" "}
            <span className="font-normal text-[#717680]">(optional)</span>
          </label>
          <input
            id={`${baseId}-role`}
            name="role"
            type="text"
            autoComplete="organization-title"
            className={inputClass()}
            placeholder="Head of Operations"
          />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="text-[13px] font-medium text-[#181D27]">
          Enquiry topic
        </legend>
        <div
          role="radiogroup"
          aria-label="Enquiry topic"
          className="mt-2 flex flex-wrap gap-2"
        >
          {TOPICS.map((opt) => {
            const active = topic === opt;
            return (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setTopic(opt)}
                className={`rounded-[6px] border px-3 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2962FF] ${
                  active
                    ? "border-[#1B46F5] bg-[#EEF4FF] text-[#1B46F5]"
                    : "border-[#E9EAEB] bg-[#FAFAFA] text-[#535862] hover:border-[#D5D7DA] hover:text-[#181D27]"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
        <input type="hidden" name="topic" value={topic} />
      </fieldset>

      <div className="mt-5">
        <label
          htmlFor={`${baseId}-message`}
          className="block text-[13px] font-medium text-[#181D27]"
        >
          Message
        </label>
        <textarea
          id={`${baseId}-message`}
          name="message"
          rows={4}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${baseId}-msg-err` : undefined}
          className={`${inputClass(errors.message)} min-h-[112px] resize-y`}
          placeholder="Tell us about the workflow, documents, or question you have in mind."
        />
        {errors.message ? (
          <p id={`${baseId}-msg-err`} className="mt-1 text-[12px] text-[#B42318]">
            {errors.message}
          </p>
        ) : null}
      </div>

      <label
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
        aria-hidden
      >
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="mt-5">
        <label className="flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-[#535862]">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={
              errors.consent ? `${baseId}-consent-err` : undefined
            }
            className="mt-0.5 size-4 shrink-0 rounded-[3px] border-[#D5D7DA] accent-[#1B46F5]"
          />
          <span>
            I agree that ZeonAI Labs may contact me about this enquiry. See the{" "}
            <a href="/privacy-policy" className="zeon-link underline">
              privacy policy
            </a>
            .
          </span>
        </label>
        {errors.consent ? (
          <p
            id={`${baseId}-consent-err`}
            className="mt-1 text-[12px] text-[#B42318]"
          >
            {errors.consent}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="mt-5 rounded-[8px] border border-[#E9EAEB] bg-[#FAFAFA] px-4 py-3 text-[13px] text-[#181D27]"
        >
          <p className="font-medium">Direct submission is not enabled here.</p>
          <p className="mt-1 text-[#535862]">
            Please email us directly at{" "}
            <a href="mailto:contact@zeonai.com" className="zeon-link underline">
              contact@zeonai.com
            </a>{" "}
            and our team will reply.
          </p>
        </div>
      ) : null}

      <ZeonButton type="submit" tone="accent" block className="mt-6 !rounded-[8px]">
        Send message
      </ZeonButton>
    </form>
  );
}
