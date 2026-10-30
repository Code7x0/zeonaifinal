"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EngChrome, EngPanel } from "./shared";
import { Z } from "./tokens";
import {
  durationUi,
} from "../motion";

const COLUMNS = [
  { column: "Inv No", label: "Invoice number", type: "alphabetic" },
  { column: "Date", label: "Invoice date", type: "date" },
  { column: "Total", label: "Amount", type: "numeric" },
  { column: "Tax", label: "Rate", type: "percentage" },
] as const;

type Mode = "spreadsheet" | "pdf";

export function ConfigWorkbench() {
  const [mode, setMode] = useState<Mode>("spreadsheet");
  const [selected, setSelected] = useState(0);
  const reduce = useReducedMotion() ?? false;
  const col = COLUMNS[selected] ?? COLUMNS[0];

  return (
    <EngPanel className="h-full min-h-[340px] lg:min-h-[400px]">
      <EngChrome title="ZeonAI · Document processing">
        <div className="flex h-full min-h-[300px] flex-col p-3 md:p-4">
          <div
            className="inline-flex w-fit gap-1 rounded-full p-1"
            style={{ backgroundColor: Z.mist }}
            role="tablist"
            aria-label="Document type"
          >
            {(
              [
                ["spreadsheet", "Spreadsheet"],
                ["pdf", "PDF"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={mode === id}
                onClick={() => setMode(id)}
                className="rounded-full px-3 py-1.5 text-[11px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#0977B3]/45"
                style={{
                  backgroundColor: mode === id ? Z.paper : "transparent",
                  color: mode === id ? Z.ink : Z.ink70,
                  boxShadow: mode === id ? "0 1px 2px rgba(1,15,15,0.08)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="relative mt-3 min-h-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {mode === "spreadsheet" ? (
                <motion.div
                  key="sheet"
                  className="absolute inset-0 grid gap-3 sm:grid-cols-[1.15fr_0.85fr]"
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: reduce ? 0 : durationUi }}
                >
                  <div
                    className="overflow-hidden rounded-lg border"
                    style={{ borderColor: Z.line }}
                  >
                    <div
                      className="border-b px-2.5 py-1.5 font-mono text-[10px]"
                      style={{ borderColor: Z.line, color: Z.fog, backgroundColor: Z.mist }}
                    >
                      sheet: Finance · header_row: 0
                    </div>
                    <table className="w-full text-left text-[11px]">
                      <thead>
                        <tr style={{ backgroundColor: `${Z.blue}10` }}>
                          {COLUMNS.map((c, i) => (
                            <th
                              key={c.column}
                              className="cursor-pointer border-b px-2 py-1.5 font-medium"
                              style={{
                                borderColor: Z.line,
                                color: i === selected ? Z.blue : Z.ink,
                                backgroundColor:
                                  i === selected ? `${Z.blue}18` : "transparent",
                              }}
                              onClick={() => setSelected(i)}
                            >
                              {c.column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody style={{ color: Z.ink70 }}>
                        {[
                          ["INV-4821", "2025-03-12", "48220", "18%"],
                          ["INV-4822", "2025-03-14", "1260", "18%"],
                          ["INV-4823", "2025-03-18", "8900", "18%"],
                        ].map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, i) => (
                              <td
                                key={cell}
                                className="border-b px-2 py-1.5"
                                style={{
                                  borderColor: Z.line,
                                  backgroundColor:
                                    i === selected ? `${Z.blue}08` : "transparent",
                                }}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="px-2.5 py-1.5 font-mono text-[9px]" style={{ color: Z.fog }}>
                      Illustrative preview
                    </p>
                  </div>

                  <div
                    className="rounded-lg border p-3"
                    style={{ borderColor: Z.line, backgroundColor: Z.mist }}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: Z.fog }}>
                      Column config
                    </p>
                    <dl className="mt-2 space-y-2 text-[11px]">
                      {[
                        ["column", col.column],
                        ["meaning", col.label],
                        ["type", col.type],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-2">
                          <dt style={{ color: Z.fog }}>{k}</dt>
                          <dd className="font-medium" style={{ color: Z.ink }}>
                            {v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="pdf"
                  className="absolute inset-0 grid gap-3 sm:grid-cols-[1.1fr_0.9fr]"
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: reduce ? 0 : durationUi }}
                >
                  <div
                    className="rounded-lg border p-3"
                    style={{ borderColor: Z.line, backgroundColor: Z.mist }}
                  >
                    <p className="font-mono text-[9px]" style={{ color: Z.fog }}>
                      Invoice_pack · page 1
                    </p>
                    <p className="mt-3 text-[11px] leading-relaxed" style={{ color: Z.ink70 }}>
                      Supplier invoice for goods received…
                    </p>
                    <p
                      className="mt-2 inline-block rounded border px-1.5 py-0.5 text-[10px]"
                      style={{
                        borderColor: `${Z.blue}55`,
                        backgroundColor: `${Z.blue}14`,
                        color: Z.ink,
                      }}
                    >
                      Invoice No.
                    </p>{" "}
                    <p
                      className="mt-1 inline-block rounded border px-1.5 py-0.5 text-[10px]"
                      style={{
                        borderColor: `${Z.blue}55`,
                        backgroundColor: `${Z.blue}14`,
                        color: Z.ink,
                      }}
                    >
                      PO No.
                    </p>
                  </div>
                  <div
                    className="space-y-2 rounded-lg border p-3"
                    style={{ borderColor: Z.line }}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: Z.fog }}>
                      Extraction
                    </p>
                    <p className="text-[11px]" style={{ color: Z.ink70 }}>
                      Category · <span style={{ color: Z.ink }}>Invoice</span>
                    </p>
                    <ul className="space-y-1.5 text-[11px]" style={{ color: Z.ink70 }}>
                      {["Whole document", "Page by page", "Fixed layout"].map(
                        (opt, i) => (
                          <li
                            key={opt}
                            className="rounded border px-2 py-1.5"
                            style={{
                              borderColor: i === 0 ? Z.blue : Z.line,
                              backgroundColor: i === 0 ? `${Z.blue}10` : Z.paper,
                            }}
                          >
                            {opt}
                          </li>
                        ),
                      )}
                    </ul>
                    <p className="font-mono text-[10px]" style={{ color: Z.blue }}>
                      merge_adjacent: true
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </EngChrome>
    </EngPanel>
  );
}
