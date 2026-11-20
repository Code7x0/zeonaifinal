"use client";

/**
 * Secondary-page product UI fragments only.
 * Achromatic ledger chrome (taste-skill app sheet) — brand blue reserved for the primary data signal.
 * Never imported by homepage sections.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { durationUi, easeOut } from "../motion";
import {
  LiveAuditTrail,
  LiveCitedAnswer,
  LiveClauseExtract,
  LiveExceptionQueue,
} from "./live-outputs";

export function ProductChrome({
  title,
  module,
  children,
  className,
}: {
  title: string;
  module?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-ui
      className={cn(
        "zeon-window overflow-hidden bg-[#F2F4F7]",
        className,
      )}
    >
      <div className="relative z-[3] flex h-11 items-center justify-between border-b border-[#E4E4E4]/90 bg-white/80 px-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#181D27]" aria-hidden />
          <span className="text-[12px] font-medium tracking-[-0.01em] text-[#181D27]">
            {title}
          </span>
          {module ? (
            <span className="rounded-[4px] bg-[#F2F4F7] px-1.5 py-0.5 font-mono text-[10px] text-[#535862]">
              {module}
            </span>
          ) : null}
        </div>
        <div className="flex gap-1" aria-hidden>
          <span className="h-1.5 w-8 rounded-full bg-[#E4E4E4]" />
          <span className="h-1.5 w-4 rounded-full bg-[#E4E4E4]" />
        </div>
      </div>
      <div className="bg-white p-3 md:p-4">{children}</div>
    </div>
  );
}

export function AskAiMock({ className }: { className?: string }) {
  return (
    <ProductChrome title="AI Workspace" module="Ask AI" className={className}>
      <p className="text-[12px] text-[#535862]">Query</p>
      <div className="mt-1.5 rounded-[6px] border border-[#E4E4E4] bg-[#F8F8F8] px-3 py-2.5 text-[13px] text-[#181D27]">
        What does the credit policy say about LVR above 80% for self-employed
        applicants?
      </div>
      <div className="mt-4 space-y-3">
        <div className="rounded-[6px] border border-[#E4E4E4] p-3">
          <p className="text-[13px] leading-[1.5] text-[#181D27]">
            Policy 4.2 requires a senior credit override when LVR exceeds 80%
            for self-employed applicants, with two years of tax returns on
            file.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Lending Policy v3.4 · p.12", "Override matrix · §B"].map((c) => (
              <span
                key={c}
                className="rounded-[4px] border border-[#E9EAEB] bg-[#F2F4F7] px-2 py-1 font-mono text-[10px] text-[#1d5fbf]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-[#535862]">
          <span>Access: Credit · Policy</span>
          <span className="font-mono text-[#1d5fbf]">Cited · 2 sources</span>
        </div>
      </div>
    </ProductChrome>
  );
}

export function WorkflowMock({ className }: { className?: string }) {
  const steps = [
    { label: "Inbox intake", state: "done" as const },
    { label: "Extract + match", state: "done" as const },
    { label: "Exception review", state: "active" as const },
    { label: "ERP post", state: "queued" as const },
  ];
  return (
    <ProductChrome title="AI Workspace" module="Workflows" className={className}>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "flex items-center gap-3 rounded-[6px] border px-3 py-2.5",
              s.state === "active"
                ? "border-[#1d5fbf]/35 bg-[#F2F4F7]"
                : "border-[#E4E4E4] bg-white",
            )}
          >
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full font-mono text-[10px]",
                s.state === "done" && "bg-[#181D27] text-white",
                s.state === "active" && "bg-[#1d5fbf] text-white",
                s.state === "queued" && "bg-[#E4E4E4] text-[#535862]",
              )}
            >
              {i + 1}
            </span>
            <span className="flex-1 text-[13px] text-[#181D27]">{s.label}</span>
            <span className="font-mono text-[10px] uppercase text-[#535862]">
              {s.state}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-[#E4E4E4] pt-3">
        <span className="text-[12px] text-[#535862]">
          Human checkpoint · Sarah Chen
        </span>
        <span className="inline-flex h-8 items-center rounded-full bg-[#181D27] px-3 text-[11px] font-medium text-white">
          Approve exception
        </span>
      </div>
    </ProductChrome>
  );
}

export function AuditMock({ className }: { className?: string }) {
  const rows = [
    { t: "14:02", a: "Ask AI answer", u: "finance.ops", d: "Cited 3 sources" },
    { t: "14:06", a: "Exception opened", u: "agent.invoice", d: "PO mismatch" },
    { t: "14:11", a: "Human approve", u: "ap.lead", d: "Case #1842" },
    { t: "14:18", a: "ERP post", u: "connector.sap", d: "Document locked" },
  ];
  return (
    <ProductChrome title="Trust Centre" module="Audit log" className={className}>
      <div className="overflow-hidden rounded-[6px] border border-[#E4E4E4]">
        <div className="grid grid-cols-[52px_1.2fr_1fr_1.2fr] gap-2 border-b border-[#E4E4E4] bg-[#F8F8F8] px-3 py-2 font-mono text-[10px] text-[#535862]">
          <span>Time</span>
          <span>Action</span>
          <span>Actor</span>
          <span>Detail</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.t + r.a}
            className="grid grid-cols-[52px_1.2fr_1fr_1.2fr] gap-2 border-b border-[#E4E4E4] px-3 py-2.5 text-[12px] last:border-b-0"
          >
            <span className="font-mono text-[#535862]">{r.t}</span>
            <span className="text-[#181D27]">{r.a}</span>
            <span className="text-[#535862]">{r.u}</span>
            <span className="text-[#181D27]">{r.d}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-[#535862]">
        Sample data
      </p>
    </ProductChrome>
  );
}

export function ContractMock({ className }: { className?: string }) {
  return (
    <ProductChrome title="Contracts" module="Clause review" className={className}>
      <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[6px] border border-[#E4E4E4] bg-[#F8F8F8] p-3">
          <p className="font-mono text-[10px] text-[#535862]">Document</p>
          <p className="mt-2 text-[13px] leading-[1.55] text-[#181D27]">
            …Supplier shall notify the Buyer of any{" "}
            <mark className="bg-[#1d5fbf]/15 text-[#181D27]">
              material change in pricing
            </mark>{" "}
            no less than thirty (30) days prior…
          </p>
        </div>
        <div className="space-y-2">
          {[
            { k: "Notice period", v: "30 days" },
            { k: "Risk", v: "Commercial — review" },
            { k: "Owner", v: "Legal" },
          ].map((row) => (
            <div
              key={row.k}
              className="flex items-center justify-between rounded-[6px] border border-[#E4E4E4] px-3 py-2"
            >
              <span className="text-[12px] text-[#535862]">{row.k}</span>
              <span className="text-[12px] font-medium text-[#181D27]">
                {row.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ProductChrome>
  );
}

const OUTPUTS = [
  {
    id: "answer",
    label: "Cited answer",
    node: <LiveCitedAnswer />,
  },
  {
    id: "workflow",
    label: "Exception queue",
    node: <LiveExceptionQueue />,
  },
  {
    id: "contract",
    label: "Clause extract",
    node: <LiveClauseExtract />,
  },
  {
    id: "audit",
    label: "Audit trail",
    node: <LiveAuditTrail />,
  },
] as const;

type OutputId = (typeof OUTPUTS)[number]["id"];

const OUTPUT_COUNT = OUTPUTS.length;
/** Pin distance per output — one deliberate scroll beat each. */
const DESKTOP_VH_PER_OUTPUT = 70;

function indexFromProgress(progress: number) {
  return Math.min(
    OUTPUT_COUNT - 1,
    Math.max(0, Math.floor(progress * OUTPUT_COUNT + 1e-6)),
  );
}

/**
 * Live product outputs — desktop sticky scroll story (Lenis-synced).
 * Mobile / reduced-motion: click to switch, no pin.
 */
export function OutputIndex({
  className,
  header,
}: {
  className?: string;
  /** Section chrome rendered inside the sticky viewport */
  header?: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const lenis = useLenis();
  const lastIndexRef = useRef(0);

  const pinEnabled = isDesktop && !reduceMotion;
  const current = OUTPUTS[activeIndex] ?? OUTPUTS[0]!;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const viewH = window.innerHeight;
    if (track.offsetHeight <= viewH * 1.5) return;

    const rect = track.getBoundingClientRect();
    const scrollable = Math.max(1, track.offsetHeight - viewH);
    const progressed = Math.min(1, Math.max(0, -rect.top / scrollable));
    const idx = indexFromProgress(progressed);

    track.dataset.progress = progressed.toFixed(3);
    track.dataset.outputIndex = String(idx);

    if (idx !== lastIndexRef.current) {
      lastIndexRef.current = idx;
      setActiveIndex(idx);
    }
  }, []);

  useLenis(() => {
    if (!pinEnabled) return;
    syncFromScroll();
  }, [pinEnabled, syncFromScroll]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !pinEnabled) return;

    let raf = 0;
    let observing = false;

    const loop = () => {
      syncFromScroll();
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (!observing) {
            observing = true;
            raf = requestAnimationFrame(loop);
          }
        } else if (observing) {
          observing = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );

    io.observe(track);
    syncFromScroll();
    raf = requestAnimationFrame(loop);
    observing = true;
    window.addEventListener("resize", syncFromScroll, { passive: true });

    return () => {
      observing = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", syncFromScroll);
    };
  }, [pinEnabled, syncFromScroll]);

  const selectOutput = useCallback(
    (id: OutputId) => {
      const idx = OUTPUTS.findIndex((o) => o.id === id);
      if (idx < 0) return;

      if (!pinEnabled) {
        lastIndexRef.current = idx;
        setActiveIndex(idx);
        return;
      }

      const track = trackRef.current;
      if (!track) return;
      const currentScroll = lenis?.scroll ?? window.scrollY;
      const trackTop = track.getBoundingClientRect().top + currentScroll;
      const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
      const target = trackTop + ((idx + 0.22) / OUTPUT_COUNT) * scrollable;

      if (lenis) {
        lenis.scrollTo(target, { duration: 0.9 });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    },
    [pinEnabled, lenis],
  );

  const trackStyle: CSSProperties | undefined = pinEnabled
    ? { height: `${OUTPUT_COUNT * DESKTOP_VH_PER_OUTPUT}vh` }
    : undefined;

  return (
    <div
      ref={trackRef}
      className={cn("relative", className)}
      style={trackStyle}
      data-active-output={current.id}
    >
      <div
        className={
          pinEnabled
            ? "sticky top-0 flex min-h-screen flex-col justify-center py-12 md:py-16"
            : "relative"
        }
      >
        {header ? <div className="mb-10 max-w-[40rem]">{header}</div> : null}
        <div
          className={cn(
            "grid w-full items-center gap-8 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-12",
          )}
        >
          <div
            role="listbox"
            aria-label="Product outputs"
            aria-orientation="vertical"
            className="space-y-1"
          >
            {OUTPUTS.map((o, i) => {
              const selected = i === activeIndex;
              return (
                <button
                  key={o.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => selectOutput(o.id)}
                  className={cn(
                    "block w-full rounded-[4px] px-2 py-2 text-left font-[family-name:var(--font-aeonik)] text-[28px] leading-[1.1] tracking-[-0.03em] outline-none transition-[color,opacity,transform] duration-300 ease-out md:text-[36px] lg:text-[44px]",
                    "focus-visible:ring-2 focus-visible:ring-[#2962FF]/35 focus-visible:ring-offset-2",
                    selected
                      ? "translate-x-0 text-[#181D27]"
                      : "text-[#181D27]/22 hover:text-[#181D27]/5",
                  )}
                >
                  <span className="inline-flex items-baseline gap-3">
                    <span
                      className={cn(
                        "font-mono text-[11px] uppercase tracking-[0.14em] transition-opacity duration-300",
                        selected ? "text-[#2962FF] opacity-100" : "opacity-0",
                      )}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {o.label}
                  </span>
                </button>
              );
            })}
            <p className="mt-6 hidden text-[12px] leading-[1.45] text-[#8A9493] lg:block">
              {pinEnabled
                ? "Scroll to step through each output — or click a label."
                : "Select an output to preview the product surface."}
            </p>
          </div>

          <div
            className="relative min-h-[420px] overflow-hidden rounded-[14px] p-4 shadow-[0_18px_48px_rgba(15,23,42,0.18)] md:min-h-[520px] md:p-6"
            style={{
              background: "#0c1018",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                className="w-full"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{
                  duration: reduceMotion ? 0 : durationUi,
                  ease: easeOut,
                }}
              >
                {current.node}
              </motion.div>
            </AnimatePresence>

            {/* Quiet progress ticks */}
            {pinEnabled ? (
              <div
                className="pointer-events-none absolute bottom-4 right-5 flex gap-1.5"
                aria-hidden
              >
                {OUTPUTS.map((o, i) => (
                  <span
                    key={o.id}
                    className={cn(
                      "h-1 w-4 rounded-full transition-colors duration-300",
                      i === activeIndex ? "bg-[#2962FF]" : "bg-white/15",
                    )}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArchitectureRail({
  layers,
  className,
  dark = false,
}: {
  layers: readonly { id: string; title: string; description: string }[];
  className?: string;
  /** Use on midnight / ink chapters */
  dark?: boolean;
}) {
  const [i, setI] = useState(0);
  const active = layers[i] ?? layers[0];

  return (
    <div className={cn("grid items-stretch gap-6 md:grid-cols-[0.9fr_1.1fr] md:gap-8", className)}>
      <ol className="space-y-1">
        {layers.map((layer, idx) => {
          const on = idx === i;
          return (
            <li key={layer.id}>
              <button
                type="button"
                onClick={() => setI(idx)}
                className={cn(
                  "flex w-full items-start gap-3 border px-3 py-3 text-left transition-colors duration-200",
                  dark
                    ? on
                      ? "border-white bg-white text-black"
                      : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
                    : on
                      ? "border-[#181D27] bg-[#181D27] text-white"
                      : "border-transparent text-[#181D27]/70 hover:bg-[#181D27]/[0.04] hover:text-[#181D27]",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[11px]",
                    on
                      ? dark
                        ? "text-black/45"
                        : "text-white/45"
                      : dark
                        ? "text-white/40"
                        : "text-[#181D27]/40",
                  )}
                >
                  {layer.id}
                </span>
                <span className="text-[15px] font-medium">{layer.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div
        key={active?.id}
        className={cn(
          "relative min-h-[280px] overflow-hidden border p-6 text-white md:p-8",
          dark ? "border-white/20 bg-black" : "border-[#E9EAEB] bg-[#181D27]",
        )}
      >
        <div className="platform-view-enter">
          <p className="font-mono text-[11px] text-white/40">{active?.id}</p>
          <h3 className="mt-3 font-[family-name:var(--font-aeonik)] text-[28px] tracking-[-0.03em] md:text-[36px]">
            {active?.title}
          </h3>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.55] text-white/65">
            {active?.description}
          </p>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/10 to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}

export function IntegrationMesh({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-black bg-black text-white",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/15 px-5 py-3 md:px-6">
        <p className="font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase">
          Connector catalogue
        </p>
        <p className="font-mono text-[10px] tracking-[0.08em] text-white/35">
          {String(items.length).padStart(2, "0")} systems · scoped
        </p>
      </div>

      <div className="flex flex-col gap-6 p-5 md:flex-row md:items-center md:gap-8 md:p-7">
        <div className="flex shrink-0 flex-col justify-center border border-white bg-white px-5 py-6 text-black md:min-h-[168px] md:w-[188px]">
          <p className="font-mono text-[10px] tracking-[0.14em] text-black/40 uppercase">
            Hub
          </p>
          <p className="mt-2 font-[family-name:var(--font-aeonik)] text-[24px] leading-[1.05] tracking-[-0.03em]">
            AI Workspace
          </p>
          <p className="mt-4 text-[12px] leading-[1.45] text-black/50">
            Governed edge for every system of record.
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-3 font-mono text-[10px] tracking-[0.12em] text-white/35 uppercase">
            Connected systems
          </p>
          <ul className="flex flex-wrap gap-2">
            {items.map((name) => (
              <li key={name}>
                <span className="inline-flex border border-white/20 bg-transparent px-3.5 py-2 text-[13px] font-medium tracking-[-0.01em] text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-black">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="border-t border-white/15 px-5 py-3 text-[12px] leading-[1.45] text-white/40 md:px-6">
        Connectors are scoped per engagement.
      </p>
    </div>
  );
}

export function GovernanceStack({ className }: { className?: string }) {
  const layers = [
    { title: "Role-based access", body: "Answers and actions respect who can see which documents." },
    { title: "Human checkpoints", body: "People approve exceptions before systems of record change." },
    { title: "Audit log", body: "A read-only trail of what the system and people did." },
  ];
  return (
    <div className={cn("space-y-3", className)}>
      {layers.map((l, i) => (
        <div
          key={l.title}
          className="rounded-[12px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md"
          style={{ marginLeft: `${i * 12}px` }}
        >
          <p className="font-mono text-[11px] text-[#8EB8FF]">0{i + 1}</p>
          <h3 className="mt-2 text-[18px] font-medium tracking-[-0.02em] text-white">
            {l.title}
          </h3>
          <p className="mt-2 max-w-[40ch] text-[14px] leading-[1.5] text-white/60">
            {l.body}
          </p>
        </div>
      ))}
    </div>
  );
}
