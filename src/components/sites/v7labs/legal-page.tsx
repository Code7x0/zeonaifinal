"use client";

import type { ReactNode } from "react";
import { PageShell } from "./page-shell";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  meta: { label: string; value: string }[];
  children: ReactNode;
};

export function LegalPage({
  eyebrow,
  title,
  intro,
  meta,
  children,
}: LegalPageProps) {
  return (
    <PageShell>
      <header className="border-b border-[var(--zeon-border)] bg-[var(--zeon-paper)] px-5 py-[var(--zeon-space-section-y)] md:px-8">
        <div className="mx-auto max-w-[720px]">
          <p className="zeon-type-eyebrow">{eyebrow}</p>
          <h1 className="zeon-type-page mt-4 max-w-[18ch]">{title}</h1>
          <p className="zeon-type-lead mt-5 max-w-[var(--zeon-measure-wide)]">
            {intro}
          </p>
          <dl className="mt-8 grid gap-3 border-t border-[var(--zeon-border)] pt-6 sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="zeon-type-meta">{item.label}</dt>
                <dd className="mt-1 text-[length:var(--zeon-text-body-sm)] text-[var(--zeon-ink)]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>
      <article className="mx-auto max-w-[720px] space-y-8 px-5 py-14 md:px-8 md:py-16 [&_a]:text-[var(--color-text-link)] [&_a]:underline [&_a]:underline-offset-2 [&_h2]:font-[family-name:var(--font-aeonik)] [&_h2]:text-[length:var(--zeon-text-sub)] [&_h2]:tracking-[var(--zeon-tracking-title)] [&_h2]:text-[var(--zeon-ink)] [&_li]:text-[length:var(--zeon-text-body-sm)] [&_li]:leading-[var(--zeon-leading-body)] [&_li]:text-[var(--zeon-muted)] [&_p]:text-[length:var(--zeon-text-body-sm)] [&_p]:leading-[var(--zeon-leading-body)] [&_p]:text-[var(--zeon-muted)] [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </article>
    </PageShell>
  );
}
