"use client";

import { useId, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Bell,
  Bot,
  Check,
  FileSearch,
  FolderLock,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Search,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  durationEnter,
  durationHover,
  durationUi,
  easeOut,
  enterY,
  enterYSoft,
} from "./motion";

type RoleId = "finance" | "executive";

const MODULES = [
  { name: "Agent Hub", icon: Bot },
  { name: "Workflows", icon: Workflow },
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "AI Drive", icon: FolderLock },
  { name: "Ask AI", icon: MessageSquare },
  { name: "AI Dashboards", icon: LayoutDashboard },
  { name: "Notifications", icon: Bell },
  { name: "Search", icon: Search },
  { name: "Contract Intelligence", icon: FileSearch },
] as const;

/** Existing live-site role configurations — do not invent. */
const ROLE_ACCESS: Record<RoleId, ReadonlySet<string>> = {
  finance: new Set([
    "Agent Hub",
    "Workflows",
    "Dashboard",
    "AI Drive",
    "Ask AI",
  ]),
  executive: new Set([
    "Dashboard",
    "Ask AI",
    "AI Dashboards",
    "Notifications",
  ]),
};

const AUDIT_EVENTS = [
  {
    time: "09:14:02",
    actor: "finance.manager",
    detail: "Asked about capital spend approvals.",
    emphasis: false,
  },
  {
    time: "09:14:02",
    actor: "access.check",
    detail: "Role and sensitivity rules applied.",
    emphasis: true,
  },
  {
    time: "09:14:03",
    actor: "retrieval",
    detail: "2 documents withheld: outside access.",
    emphasis: false,
  },
  {
    time: "09:14:04",
    actor: "answer",
    detail: "Answered with 2 cited sources.",
    emphasis: false,
  },
  {
    time: "09:16:40",
    actor: "finance.manager",
    detail: "Exported the cited answer.",
    emphasis: false,
  },
] as const;

const ACCESS_STEPS = [
  {
    n: "01",
    title: "Admin defines roles",
    body: "Set up the roles your teams need, once.",
  },
  {
    n: "02",
    title: "Roles map to modules",
    body: "Each role gets only the modules it needs.",
  },
  {
    n: "03",
    title: "People see only what their role allows",
    body: "Access is checked before anything is retrieved.",
  },
] as const;

const chip =
  "inline-flex items-center rounded-[2px] border border-[#2A2A2A] bg-[#111111] px-2 py-1 font-mono text-[9px] text-[#F5F5F5]";
const chipMuted =
  "inline-flex items-center rounded-[2px] border border-[#2A2A2A] bg-[#0A0A0A] px-2 py-1 font-mono text-[9px] text-[#888888]";
const chipActive =
  "inline-flex items-center gap-1 rounded-[2px] border border-[#F5F5F5] bg-[#111111] px-2 py-1 font-mono text-[9px] text-[#F5F5F5]";

export function TrustSection() {
  const baseId = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const [role, setRole] = useState<RoleId>("finance");

  const permitted = ROLE_ACCESS[role];
  const availableCount = useMemo(
    () => MODULES.filter((m) => permitted.has(m.name)).length,
    [permitted],
  );
  const roleLabel = role === "finance" ? "Finance" : "Executive";

  return (
    <section
      id="trust"
      className="relative z-[1] scroll-mt-24 border-t border-[#1A1A1A] bg-[#050505] text-[#F5F5F5]"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="relative mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        <motion.div
          className="max-w-[40rem]"
          initial={reduceMotion ? false : { opacity: 0, y: enterY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: durationEnter, ease: easeOut }}
        >
          <h2
            id={`${baseId}-heading`}
            className="font-[family-name:var(--font-aeonik)] text-[36px] leading-[1.06] tracking-[-0.035em] text-[#F5F5F5] md:text-[52px]"
          >
            Governed by design, not added afterwards
          </h2>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-[#A3A3A3] md:text-[17px]">
            Access control, human review and an audit log are built into every
            part of AI Workspace, from the first search to the record posted in
            your ERP.
          </p>
        </motion.div>

        <AccessFlow reduceMotion={reduceMotion} />

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch lg:gap-6">
          <PermissionsPanel
            role={role}
            roleLabel={roleLabel}
            availableCount={availableCount}
            permitted={permitted}
            onRoleChange={setRole}
            reduceMotion={reduceMotion}
          />
          <AuditTrail reduceMotion={reduceMotion} />
        </div>

        <AccessVerification reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}

function AccessFlow({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="mt-12 overflow-hidden rounded-[2px] border border-[#2A2A2A] bg-[#0A0A0A]"
      initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: durationEnter, ease: easeOut }}
    >
      <div className="flex items-center justify-between border-b border-[#2A2A2A] bg-[#0A0A0A] px-4 py-2.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#888888]">
          Access you control
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#888888]">
          Role → module → retrieval
        </p>
      </div>

      <div className="grid gap-0 md:grid-cols-3">
        {ACCESS_STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            className="relative border-b border-[#1F1F1F] p-5 last:border-b-0 md:border-b-0 md:border-r md:border-[#1F1F1F] md:last:border-r-0 md:p-6"
            initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              delay: reduceMotion ? 0 : 0.12 * i,
              duration: durationUi,
              ease: easeOut,
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#888888]">
              {step.n}
            </p>
            <h3 className="mt-2 text-[15px] font-medium tracking-[-0.015em] text-[#F5F5F5]">
              {step.title}
            </h3>
            <p className="mt-2 text-[13px] leading-[1.5] text-[#A3A3A3]">
              {step.body}
            </p>
            <div className="mt-5">
              <StepVisual index={i} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="flex items-center gap-2">
        <span className={chipActive}>admin</span>
        <span className="font-mono text-[9px] text-[#888888]" aria-hidden>
          →
        </span>
        <span className={chipMuted}>roles[]</span>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={chipActive}>finance</span>
        <span className="font-mono text-[9px] text-[#888888]" aria-hidden>
          →
        </span>
        {["Ask AI", "AI Drive", "Workflows"].map((m, i) => (
          <span key={m} className="inline-flex items-center gap-1.5">
            {i > 0 ? (
              <span className="font-mono text-[8px] text-[#888888]" aria-hidden>
                ·
              </span>
            ) : null}
            <span className={chip}>{m}</span>
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className={chipMuted}>request</span>
      <span className="font-mono text-[9px] text-[#888888]" aria-hidden>
        →
      </span>
      <span className={chipActive}>
        <ShieldCheck className="size-2.5" aria-hidden />
        check
      </span>
      <span className="font-mono text-[9px] text-[#888888]" aria-hidden>
        →
      </span>
      <span className={chipMuted}>withhold</span>
    </div>
  );
}

function PermissionsPanel({
  role,
  roleLabel,
  availableCount,
  permitted,
  onRoleChange,
  reduceMotion,
}: {
  role: RoleId;
  roleLabel: string;
  availableCount: number;
  permitted: ReadonlySet<string>;
  onRoleChange: (r: RoleId) => void;
  reduceMotion: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-col overflow-hidden rounded-[2px] border border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2A2A] px-4 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#888888]">
            Role permissions
          </p>
          <p className="mt-0.5 text-[12px] text-[#A3A3A3]">{roleLabel}</p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#F5F5F5]">
          <span className="font-medium">{availableCount}</span>
          <span className="text-[#888888]"> of 9 modules available</span>
        </p>
      </div>

      <div className="border-b border-[#1F1F1F] px-4 py-3">
        <div
          role="radiogroup"
          aria-label="View permissions as role"
          className="inline-flex rounded-[3px] border border-[#2A2A2A] bg-[#050505] p-0.5"
        >
          {(["finance", "executive"] as const).map((id) => {
            const selected = role === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onRoleChange(id)}
                className={`rounded-[2px] px-3.5 py-1.5 text-[12px] font-medium capitalize transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  selected
                    ? "bg-[#F5F5F5] text-[#050505]"
                    : "bg-transparent text-[#A3A3A3] hover:text-[#F5F5F5]"
                }`}
              >
                {id === "finance" ? "Finance" : "Executive"}
              </button>
            );
          })}
        </div>
        <p className="mt-2.5 text-[11px] text-[#888888]">
          Roles shown are examples, not customer data.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={role}
          className="flex flex-1 flex-col gap-1.5 p-3"
          initial={reduceMotion ? false : { opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: durationUi, ease: easeOut }}
        >
          {MODULES.map((mod) => {
            const allowed = permitted.has(mod.name);
            const Icon = mod.icon as LucideIcon;
            return (
              <li key={mod.name}>
                <div
                  className={`flex items-center gap-2.5 rounded-[2px] border px-3 py-2 transition hover:border-[#555555] ${
                    allowed
                      ? "border-[#2A2A2A] bg-[#111111]"
                      : "border-[#1F1F1F] bg-[#080808]"
                  }`}
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-[2px] border ${
                      allowed
                        ? "border-[#3A3A3A] text-[#F5F5F5]"
                        : "border-[#2A2A2A] text-[#666666]"
                    }`}
                  >
                    <Icon className="size-3" aria-hidden />
                  </span>
                  <span
                    className={`min-w-0 flex-1 text-[12.5px] font-medium tracking-[-0.01em] ${
                      allowed ? "text-[#F5F5F5]" : "text-[#777777]"
                    }`}
                  >
                    {mod.name}
                  </span>
                  {allowed ? (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#F5F5F5]">
                      <span className="flex size-3.5 items-center justify-center rounded-[2px] border border-[#F5F5F5] bg-[#F5F5F5] text-[#050505]">
                        <Check className="size-2 stroke-[3]" aria-hidden />
                      </span>
                      Access granted
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#666666]">
                      <Lock className="size-3" aria-hidden />
                      Restricted
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </motion.ul>
      </AnimatePresence>

      <p className="border-t border-[#2A2A2A] px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#888888]">
        Permissions are checked before document retrieval.
      </p>
    </div>
  );
}

function AuditTrail({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="flex min-h-0 flex-col overflow-hidden rounded-[2px] border border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2A2A2A] px-4 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#F5F5F5]">
            AI Workspace / Admin / Audit trail
          </p>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#888888]">
            today · read only
          </p>
        </div>
        <span className="rounded-[2px] border border-[#2A2A2A] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#888888]">
          Sample data
        </span>
      </div>

      <ol className="relative flex-1 px-4 py-5">
        <div
          className="absolute bottom-7 left-[27px] top-7 w-px bg-[#2A2A2A]"
          aria-hidden
        />
        {AUDIT_EVENTS.map((event, i) => (
          <motion.li
            key={`${event.time}-${event.actor}-${i}`}
            className={`relative flex gap-3 pb-5 last:pb-0 ${
              event.emphasis
                ? "-mx-2 rounded-[2px] bg-[#111111] px-2 py-2"
                : ""
            }`}
            initial={reduceMotion ? false : { opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: reduceMotion ? 0 : 0.08 * i,
              duration: durationUi,
              ease: easeOut,
            }}
          >
            <span
              className={`relative z-[1] mt-1.5 size-2.5 shrink-0 rounded-[2px] border ${
                event.emphasis
                  ? "border-[#F5F5F5] bg-[#F5F5F5]"
                  : "border-[#3A3A3A] bg-[#0A0A0A]"
              }`}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p
                className={`font-mono text-[11px] tracking-[-0.01em] ${
                  event.emphasis ? "text-[#F5F5F5]" : "text-[#A3A3A3]"
                }`}
              >
                {event.time}
                <span className="text-[#666666]"> · </span>
                {event.actor}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-[#F5F5F5]">
                {event.detail}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function AccessVerification({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="mt-5 overflow-hidden rounded-[2px] border border-[#2A2A2A] bg-[#0A0A0A] px-4 py-4 md:px-5"
      initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: durationUi, ease: easeOut }}
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#888888]">
        Access verification
      </p>
      <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          {(
            [
              ["User request", false],
              ["Access check", true],
              ["Permitted documents", true],
            ] as const
          ).map(([label, active], i) => (
            <div key={label} className="flex items-center gap-1.5">
              <motion.span
                className={`rounded-[2px] border px-2.5 py-1.5 font-mono uppercase tracking-[0.08em] ${
                  active
                    ? "border-[#F5F5F5] bg-[#F5F5F5] text-[#050505]"
                    : "border-[#2A2A2A] bg-[#111111] text-[#A3A3A3]"
                }`}
                initial={reduceMotion ? false : { opacity: 0.35 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: reduceMotion ? 0 : 0.15 * i,
                  duration: durationHover,
                }}
              >
                {label}
              </motion.span>
              {i < 2 ? (
                <span className="text-[#888888]" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <motion.p
          className="font-mono text-[11px] text-[#888888]"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reduceMotion ? 0 : 0.45, duration: durationHover }}
        >
          Restricted documents → withheld
          <span className="ml-2 text-[#A3A3A3]">· 2 outside access</span>
        </motion.p>
      </div>
    </motion.div>
  );
}
