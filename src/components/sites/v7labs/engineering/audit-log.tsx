"use client";

import { motion, useReducedMotion } from "motion/react";
import { EngChrome, EngPanel, useInViewOnce } from "./shared";
import { Z } from "./tokens";
import {
  durationUi,
} from "../motion";

const EVENTS = [
  { t: "09:14:02", event: "case.created", actor: "creator" },
  { t: "09:20:41", event: "case.forwarded", actor: "creator" },
  { t: "10:02:09", event: "task.delegated", actor: "holder" },
  { t: "11:47:30", event: "task.sent_back", actor: "holder" },
  { t: "13:05:18", event: "task.completed", actor: "holder" },
] as const;

export function AuditLog() {
  const { ref, shown } = useInViewOnce(0.3);
  const reduce = useReducedMotion() ?? false;

  return (
    <EngPanel className="h-full min-h-[340px] lg:min-h-[400px]" dark>
      <EngChrome title="ZeonAI · Activity log" dark>
        <div ref={ref} className="flex h-full min-h-[300px] flex-col gap-3 p-3 md:p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
              Activity log
            </p>
            <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[9px] text-white/55">
              Read only · cannot edit or delete
            </span>
          </div>

          <ol className="min-h-0 flex-1 space-y-1 overflow-hidden">
            {EVENTS.map((e, i) => {
              const latest = i === EVENTS.length - 1;
              return (
                <motion.li
                  key={e.t + e.event}
                  className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-2 rounded-md border px-2.5 py-2 text-[11px]"
                  style={{
                    borderColor: latest
                      ? "rgba(9,119,179,0.45)"
                      : "rgba(255,255,255,0.08)",
                    backgroundColor: latest
                      ? "rgba(9,119,179,0.14)"
                      : "rgba(255,255,255,0.03)",
                  }}
                  initial={false}
                  animate={{
                    opacity: shown ? 1 : 0,
                    y: shown || reduce ? 0 : 8,
                  }}
                  transition={{
                    duration: reduce ? 0 : durationUi,
                    delay: reduce ? 0 : 0.08 * i,
                  }}
                >
                  <span className="font-mono tabular-nums text-white/35">
                    {e.t}
                  </span>
                  <span className="font-mono text-white/85">{e.event}</span>
                  <span className="text-white/40">{e.actor}</span>
                </motion.li>
              );
            })}
          </ol>

          <motion.div
            className="grid gap-2 sm:grid-cols-2"
            initial={false}
            animate={{ opacity: shown ? 1 : 0 }}
            transition={{
              duration: reduce ? 0 : durationUi,
              delay: reduce ? 0 : 0.45,
            }}
          >
            {[
              ["In-app", "Watchers notified in the product"],
              ["Email", "Watchers notified by email"],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6eb8e0]">
                  {title}
                </p>
                <p className="mt-1 text-[11px] text-white/55">{body}</p>
              </div>
            ))}
          </motion.div>
          <p className="text-[10px] text-white/35">
            Watchers cannot act on the case.
          </p>
        </div>
      </EngChrome>
    </EngPanel>
  );
}
