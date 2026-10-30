"use client";

import { useState, type FormEvent } from "react";

export function DemoForm() {
  const [status, setStatus] = useState<"idle" | "error">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No form endpoint is configured — do not claim success.
    setStatus("error");
  }

  return (
    <section
      id="demo"
      className="border-t border-[var(--zeon-line)] bg-[var(--zeon-paper)] px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-[36px] leading-[1.08] tracking-[-0.035em] text-[var(--zeon-ink)] md:text-[52px]">
            Book a demo
          </h2>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.55] text-[var(--zeon-ink70)]">
            See AI Workspace on a workflow that matters to you. Tell us a little
            about your team and we will arrange a time.
          </p>
          <ol className="mt-10 space-y-5">
            {[
              [
                "A conversation about your process",
                "We start with the workflow or knowledge problem that costs you most.",
              ],
              [
                "The platform on a relevant workflow",
                "We show AI Workspace on a scenario from your sector, or on a sample of your documents if you share one.",
              ],
              [
                "Deployment and governance answers",
                "Cloud, private cloud or on-premises, and how role-based access, review and audit work in your environment.",
              ],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span className="font-mono text-[12px] text-[var(--zeon-fog)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[15px] font-medium text-[var(--zeon-ink)]">
                    {title}
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.5] text-[var(--zeon-ink70)]">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <form
          onSubmit={onSubmit}
          className="relative rounded-2xl border border-[var(--zeon-line)] bg-[var(--zeon-mist)]/40 p-6 md:p-8"
          noValidate
        >
          <p className="text-[12px] text-[var(--zeon-fog)]">
            All fields are required unless marked optional.
          </p>
          <div className="mt-5 space-y-4">
            <Field label="Name" name="name" required />
            <Field label="Work email" name="email" type="email" required />
            <Field label="Company" name="company" required />
            <Field label="Role" name="role" optional />
            <Field label="Your role or team" name="team" optional />
            <fieldset>
              <legend className="text-[13px] text-[var(--zeon-ink)]">
                Interested in
              </legend>
              <div className="mt-2 flex flex-wrap gap-3 text-[13px] text-[var(--zeon-ink70)]">
                {["AI Workspace", "Agent Hub", "Both"].map((opt) => (
                  <label key={opt} className="inline-flex items-center gap-2">
                    <input type="radio" name="interest" value={opt} required />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="block">
              <span className="text-[13px] text-[var(--zeon-ink)]">
                Message <span className="text-[var(--zeon-fog)]">(optional)</span>
              </span>
              <textarea
                name="message"
                rows={3}
                className="mt-1.5 w-full rounded-xl border border-[var(--zeon-line)] bg-white px-3 py-2 text-[14px] outline-none focus:border-[var(--zeon-blue)]"
              />
            </label>
            {/* Honeypot */}
            <label className="absolute -left-[9999px] opacity-0" aria-hidden>
              Leave this field empty
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
            </label>
            <label className="flex items-start gap-2 text-[12px] text-[var(--zeon-ink70)]">
              <input type="checkbox" name="consent" required className="mt-0.5" />
              <span>
                I agree that ZeonAI Labs may contact me about this request. See
                the privacy policy.
              </span>
            </label>
          </div>

          {status === "error" ? (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-[var(--zeon-ember)]/30 bg-[var(--zeon-ember)]/5 px-4 py-3 text-[13px] text-[var(--zeon-ink)]"
            >
              <p>We could not send your request.</p>
              <p className="mt-1 text-[var(--zeon-ink70)]">
                Email us at{" "}
                <a
                  href="mailto:contact@zeonai.com"
                  className="underline underline-offset-2"
                >
                  contact@zeonai.com
                </a>{" "}
                and we will reply directly.
              </p>
              <p className="mt-2 text-[11px] text-[var(--zeon-fog)]">
                Staging build: no form endpoint is configured, so nothing was
                sent or stored.
              </p>
            </div>
          ) : null}

          <button
            type="submit"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--zeon-blue)] text-[14px] font-medium text-white"
          >
            Book a demo
          </button>
          <noscript>
            <p className="mt-3 text-[12px] text-[var(--zeon-ink70)]">
              This form needs JavaScript. Email us at contact@zeonai.com
              instead.
            </p>
          </noscript>
        </form>
      </div>
    </section>
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
      <span className="text-[13px] text-[var(--zeon-ink)]">
        {label}
        {optional ? (
          <span className="text-[var(--zeon-fog)]"> (optional)</span>
        ) : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-[var(--zeon-line)] bg-white px-3 py-2.5 text-[14px] outline-none focus:border-[var(--zeon-blue)]"
      />
    </label>
  );
}
