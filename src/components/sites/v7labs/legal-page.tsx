"use client";

import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

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
    <div className="v7-site min-h-screen bg-white text-[#111318]">
      <SiteHeader />
      <main>
        <header className="border-b border-[#DCE1E8] bg-white px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-[720px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5B6766]">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-aeonik)] text-[40px] leading-[1.05] tracking-[-0.04em] md:text-[52px]">
              {title}
            </h1>
            <p className="mt-5 text-[17px] leading-[1.55] text-[#5B6766]">
              {intro}
            </p>
            <dl className="mt-8 grid gap-3 border-t border-[#DCE1E8] pt-6 sm:grid-cols-3">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A9493]">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-[14px] text-[#111318]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </header>
        <article className="mx-auto max-w-[720px] space-y-8 px-5 py-14 md:px-8 md:py-16 [&_a]:text-[#155EEF] [&_a]:underline [&_a]:underline-offset-2 [&_h2]:font-[family-name:var(--font-aeonik)] [&_h2]:text-[22px] [&_h2]:tracking-[-0.02em] [&_li]:text-[15px] [&_li]:leading-[1.65] [&_li]:text-[#5B6766] [&_p]:text-[15px] [&_p]:leading-[1.65] [&_p]:text-[#5B6766] [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
