"use client";

import { FinalCta } from "./final-cta";
import { PageShell } from "./page-shell";

/** Dedicated demo route — reuses the homepage conversion form (no fake success). */
export function DemoPage() {
  return (
    <PageShell>
      <FinalCta />
    </PageShell>
  );
}
