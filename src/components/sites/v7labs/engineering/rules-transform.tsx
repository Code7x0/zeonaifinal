"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EngChrome, EngPanel, useInViewOnce } from "./shared";
import { Z } from "./tokens";
import {
  durationUi,
} from "../motion";

const TYPES = [
  "Calculation",
  "Validation",
  "Transformation",
  "Assignment",
] as const;

export function RulesTransform() {
  const [type, setType] = useState<(typeof TYPES)[number]>("Calculation");
  const { ref, shown } = useInViewOnce(0.3);
  const reduce = useReducedMotion() ?? false;

  return (
    <EngPanel className="h-full min-h-[340px] lg:min-h-[400px]">
      <EngChrome title="ZeonAI · Rules">
        <div ref={ref} className="flex h-full min-h-[300px] flex-col gap-3 p-3 md:p-4">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Rule type">
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={type === t}
                onClick={() => setType(t)}
                className="rounded-full border px-2.5 py-1 text-[10px] outline-none focus-visible:ring-2 focus-visible:ring-[#0977B3]/45"
                style={{
                  borderColor: type === t ? Z.blue : Z.line,
                  backgroundColor: type === t ? `${Z.blue}12` : Z.paper,
                  color: type === t ? Z.blue : Z.ink70,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
            <motion.div
              className="rounded-lg border p-3"
              style={{ borderColor: Z.line, backgroundColor: Z.mist }}
              initial={false}
              animate={{ opacity: shown ? 1 : 0, y: shown || reduce ? 0 : 10 }}
              transition={{ duration: reduce ? 0 : durationUi }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: Z.fog }}>
                Plain-language prompt
              </p>
              <p
                className="mt-3 rounded-md border bg-white px-3 py-3 text-[13px] leading-relaxed"
                style={{ borderColor: Z.line, color: Z.ink }}
              >
                Calculate GST at 18% on the invoice total
              </p>
            </motion.div>

            <div className="hidden items-center justify-center md:flex" aria-hidden>
              <motion.div
                className="h-px w-8"
                style={{ backgroundColor: Z.blue }}
                initial={false}
                animate={{ scaleX: shown ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : durationUi, delay: reduce ? 0 : 0.2 }}
              />
            </div>

            <motion.div
              className="rounded-lg border p-3"
              style={{ borderColor: Z.line }}
              initial={false}
              animate={{ opacity: shown ? 1 : 0, y: shown || reduce ? 0 : 10 }}
              transition={{
                duration: reduce ? 0 : durationUi,
                delay: reduce ? 0 : 0.2,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: Z.fog }}>
                  Drafted rule
                </p>
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[9px]"
                  style={{ backgroundColor: `${Z.gold}22`, color: Z.gold }}
                >
                  draft · review before saving
                </span>
              </div>
              <pre
                className="mt-3 overflow-auto rounded-md border p-3 font-mono text-[11px] leading-[1.55]"
                style={{
                  borderColor: Z.line,
                  backgroundColor: Z.mist,
                  color: Z.ink,
                }}
              >
                {`rule_set:  Invoice checks
type:      ${type}
output:    gst_amount

gst_amount = invoice_total * 0.18`}
              </pre>
              <p className="mt-2 text-[11px]" style={{ color: Z.ink70 }}>
                A person reviews the draft before it is saved.
              </p>
            </motion.div>
          </div>
        </div>
      </EngChrome>
    </EngPanel>
  );
}
