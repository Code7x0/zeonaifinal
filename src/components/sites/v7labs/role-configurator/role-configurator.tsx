"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  BadgeCheck,
  Briefcase,
  Check,
  ClipboardCheck,
  FileText,
  Gavel,
  Scale,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

import { roles } from "@/components/sites/zeonai/content";
import { ModulePreview } from "./module-preview";
import { SystemMap } from "./system-map";
import {
  durationEnter,
  durationUi,
  easeOut,
  enterY,
  enterYSoft,
} from "../motion";

const ROLE_ICONS: Record<string, LucideIcon> = {
  finance: Briefcase,
  legal: Gavel,
  procurement: ShoppingCart,
  compliance: Scale,
  ops: ClipboardCheck,
  credit: FileText,
};

const MODULE_ICON_FALLBACK = BadgeCheck;

export function RoleConfigurator() {
  const baseId = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const [focusModule, setFocusModule] = useState<string | null>(null);

  const role = roles[active]!;
  const includedCount = useMemo(
    () => role.modules.filter((m) => m.status === "included").length,
    [role],
  );
  const agentCount = role.agents.length;
  const previewName =
    focusModule &&
    role.modules.some((m) => m.name === focusModule)
      ? focusModule
      : (role.modules.find((m) => m.status === "included")?.name ??
        role.modules[0]!.name);

  const mapModules = role.modules.map((m) => ({
    name: m.name,
    included: m.status === "included",
  }));

  return (
    <section
      id="who-are-you"
      className="relative scroll-mt-24 overflow-hidden border-t border-[#202630] bg-[#090B0F] text-[#F5F6F8]"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="relative mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        <motion.div
          className="max-w-[40rem]"
          initial={reduceMotion ? false : { opacity: 0, y: enterY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: durationEnter, ease: easeOut }}
        >
          <h2
            id={`${baseId}-heading`}
            className="font-[family-name:var(--font-aeonik)] text-[36px] leading-[1.06] tracking-[-0.035em] text-[#F5F6F8] md:text-[52px]"
          >
            Who are you?
          </h2>
          <p className="mt-3 font-[family-name:var(--font-aeonik)] text-[22px] leading-snug tracking-[-0.025em] text-[#F5F6F8] md:text-[28px]">
            Intelligence built around your role.
          </p>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-[#A0A7B4] md:text-[17px]">
            Choose your function. ZeonAI brings the relevant modules and agents
            into focus, so you can start with what matters and expand when
            you&apos;re ready.
          </p>
        </motion.div>

        <div className="mt-8 h-px w-full bg-[#202630]" aria-hidden />

        {/* Top: industry selector + module grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-6">
          <aside className="flex flex-col rounded-[12px] border border-white/10 bg-[#101318]/85 p-3.5 shadow-[var(--zeon-shadow-soft)] backdrop-blur-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#727B8B]">
              Select industry
            </p>
            <div
              role="radiogroup"
              aria-label="Professional role"
              className="mt-3 flex flex-col gap-1"
            >
              {roles.map((r, i) => {
                const Icon = ROLE_ICONS[r.id] ?? MODULE_ICON_FALLBACK;
                const selected = active === i;
                return (
                  <button
                    key={r.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      setActive(i);
                      setFocusModule(null);
                    }}
                    className={`group flex w-full items-center gap-2.5 rounded-[8px] border px-2.5 py-2 text-left transition-[background-color,border-color,transform] duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#356DFF] active:scale-[0.98] ${
                      selected
                        ? "border-[#356DFF] bg-[#111C32]"
                        : "border-transparent bg-transparent hover:border-[#292F3A] hover:bg-[#151922]/80"
                    }`}
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-[3px] border ${
                        selected
                          ? "border-[#356DFF]/40 bg-[#151922] text-[#356DFF]"
                          : "border-[#292F3A] bg-[#151922] text-[#727B8B]"
                      }`}
                    >
                      <Icon className="size-3.5" aria-hidden />
                    </span>
                    <span
                      className={`min-w-0 flex-1 text-[12.5px] font-medium leading-snug tracking-[-0.01em] ${
                        selected ? "text-[#F5F6F8]" : "text-[#A0A7B4]"
                      }`}
                    >
                      {r.label}
                    </span>
                    <span
                      className={`size-1.5 shrink-0 rounded-full ${
                        selected ? "bg-[#356DFF]" : "bg-[#292F3A]"
                      }`}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-5 border-t border-[#202630] pt-4">
              <Link
                href={`/?role=${role.id}#demo`}
                className="zeon-btn zeon-btn-accent zeon-btn-block !rounded-[8px] !text-[13px]"
              >
                Book a demo with these modules
                <span className="zeon-btn-arrow" aria-hidden>→</span>
              </Link>
              <p className="mt-2.5 text-[12px] leading-snug text-[#727B8B]">
                Start with what you need. Add more later.
              </p>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#727B8B]">
                {includedCount} modules · {agentCount} agents
              </p>
            </div>
          </aside>

          {/* Primary module configuration */}
          <div className="min-w-0 rounded-[12px] border border-white/10 bg-[#101318]/85 p-4 shadow-[var(--zeon-shadow-soft)] backdrop-blur-xl md:p-5">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#727B8B]">
                  Modules
                </p>
                <p className="mt-1 text-[14px] text-[#A0A7B4]">
                  Included for {role.label}
                </p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#F5F6F8]">
                <span className="text-[#356DFF]">{includedCount}</span>
                <span className="text-[#727B8B]">
                  {" "}
                  / {role.modules.length} active
                </span>
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={role.id}
                className="grid gap-2 md:grid-cols-2 lg:grid-cols-3"
                initial={reduceMotion ? false : { opacity: 0.55 }}
                animate={{ opacity: 1 }}
                transition={{ duration: durationUi, ease: easeOut }}
              >
                {role.modules.map((mod) => {
                  const included = mod.status === "included";
                  const focused = previewName === mod.name;
                  return (
                    <button
                      key={mod.name}
                      type="button"
                      onClick={() => setFocusModule(mod.name)}
                      onFocus={() => setFocusModule(mod.name)}
                      aria-pressed={included}
                      className={`relative rounded-[4px] border px-3 py-2.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#356DFF] ${
                        included
                          ? focused
                            ? "border-[#356DFF] bg-[#111C32] shadow-[0_0_0_1px_rgba(53,109,255,0.16)]"
                            : "border-[#356DFF] bg-[#111C32] hover:shadow-[0_0_0_1px_rgba(53,109,255,0.16)]"
                          : focused
                            ? "border-[#292F3A] bg-[#151922]"
                            : "border-[#292F3A] bg-[#151922] hover:border-[#356DFF]/35"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 pr-1">
                        <p
                          className={`text-[13px] font-medium leading-snug tracking-[-0.01em] ${
                            included ? "text-[#F5F6F8]" : "text-[#A0A7B4]"
                          }`}
                        >
                          {mod.name}
                        </p>
                        {included ? (
                          <span
                            className="flex size-4 shrink-0 items-center justify-center rounded-[2px] bg-[#356DFF] text-white"
                            aria-hidden
                          >
                            <Check className="size-2.5 stroke-[3]" />
                          </span>
                        ) : (
                          <span
                            className="mt-0.5 size-1.5 shrink-0 rounded-full bg-[#292F3A]"
                            aria-hidden
                          />
                        )}
                      </div>
                      <p
                        className={`mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] ${
                          included ? "text-[#356DFF]" : "text-[#727B8B]"
                        }`}
                      >
                        {included ? "INCLUDED" : "NOT INCLUDED"}
                      </p>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom: diagram + Ask AI */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="min-w-0">
            <SystemMap modules={mapModules} roleLabel={role.label} />
          </div>
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${role.id}-${previewName}`}
                className="h-full"
                initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: durationUi, ease: easeOut }}
              >
                <ModulePreview
                  moduleName={previewName}
                  roleLabel={role.label}
                  agentCount={agentCount}
                  agents={role.agents}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
