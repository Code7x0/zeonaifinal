"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ParticleGlobe } from "./particle-globe";
import {
  durationEnter,
  durationUi,
  easeOut,
  enterY,
  enterYSoft,
} from "../motion";

const THREAD = "#1A1A1A";
const THREAD_TIP = "#111111";

const LABELS = [
  { id: "01", name: "Pipeline", side: "left" as const, top: "5%", rank: 0 },
  {
    id: "02",
    name: "Document processing",
    side: "left" as const,
    top: "38%",
    rank: 1,
  },
  {
    id: "03",
    name: "Business rules",
    side: "left" as const,
    top: "71%",
    rank: 2,
  },
  { id: "04", name: "Access", side: "right" as const, top: "5%", rank: 0 },
  {
    id: "05",
    name: "Delegation",
    side: "right" as const,
    top: "38%",
    rank: 1,
  },
  {
    id: "06",
    name: "Audit & notifications",
    side: "right" as const,
    top: "71%",
    rank: 2,
  },
];

const glassCard =
  "inline-flex w-max max-w-[230px] items-center rounded-[2px] border border-black/10 bg-[rgba(17,19,24,0.88)] px-3.5 py-2 text-[13px] font-medium tracking-[-0.015em] text-white md:text-[13.5px]";

/**
 * Angular path from outer label to a precise point on the hub box edge.
 * Elbow sits outside the particle field so the final run into the hub
 * is a clear horizontal segment across the globe — not a rim dead-end.
 */
function angularThreadPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  side: "left" | "right",
  rank: number,
  globeLeft: number,
  globeRight: number,
) {
  const toward = side === "left" ? 1 : -1;
  // Keep the elbow just outside the globe silhouette
  const margin = 18;
  const elbowX =
    side === "left"
      ? Math.min(x1 + toward * Math.abs(x2 - x1) * 0.55, globeLeft - margin)
      : Math.max(x1 + toward * Math.abs(x2 - x1) * 0.55, globeRight + margin);

  if (rank === 1) {
    if (Math.abs(y2 - y1) < 1.5) {
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    }
    return `M ${x1} ${y1} L ${elbowX} ${y1} L ${elbowX} ${y2} L ${x2} ${y2}`;
  }

  // Upper / lower: horizontal to elbow → vertical align → straight into hub edge
  return `M ${x1} ${y1} L ${elbowX} ${y1} L ${elbowX} ${y2} L ${x2} ${y2}`;
}

/** Attach point on the hub card's outer border (not the globe rim). */
function attachOnHub(
  hubLeft: number,
  hubTop: number,
  hubW: number,
  hubH: number,
  side: "left" | "right",
  rank: number,
) {
  // Fan along the facing vertical edge: upper / mid / lower
  const yFrac = rank === 0 ? 0.2 : rank === 2 ? 0.8 : 0.5;
  const y = hubTop + hubH * yFrac;
  // Sit 1px outside the border so the endpoint marker stays visible
  const x = side === "left" ? hubLeft - 1 : hubLeft + hubW + 1;
  return { x, y };
}

/** Choreography windows (ms from ready). */
const T = {
  hub: 1200,
  labels: 1650,
  labelStagger: 70,
  threads: 2300,
  threadDur: 680,
  threadStagger: 110,
} as const;

export function EngineeringSection() {
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const desktopStageRef = useRef<HTMLDivElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const tipRefs = useRef<(SVGCircleElement | null)[]>([]);
  const hubTipRefs = useRef<(SVGCircleElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const startRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  const reduceMotion = useReducedMotion() ?? false;
  const inView = useInView(stageRef, { once: true, amount: 0.2 });
  const [ready, setReady] = useState(false);
  const [hubVisible, setHubVisible] = useState(false);
  const [labelsVisible, setLabelsVisible] = useState(false);

  useEffect(() => {
    if (inView) setReady(true);
  }, [inView]);

  // Timed stage reveals after globe starts forming
  useEffect(() => {
    if (!ready) return;
    if (reduceMotion) {
      setHubVisible(true);
      setLabelsVisible(true);
      return;
    }
    const t1 = window.setTimeout(() => setHubVisible(true), T.hub);
    const t2 = window.setTimeout(() => setLabelsVisible(true), T.labels);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [ready, reduceMotion]);

  // Measure + draw connectors to hub edges (timer starts once; layout deps do not reset it)
  useEffect(() => {
    if (!ready) return;
    let raf = 0;
    let running = true;
    if (startRef.current == null) {
      startRef.current = performance.now();
    }
    doneRef.current = false;

    const layout = () => {
      const stage = desktopStageRef.current;
      const hub = hubRef.current;
      const globe = globeWrapRef.current;
      const svg = svgRef.current;
      if (!stage || !hub || !svg) return false;

      const stageBox = stage.getBoundingClientRect();
      const hubBox = hub.getBoundingClientRect();
      const globeBox = globe?.getBoundingClientRect();
      const w = stageBox.width;
      const h = stageBox.height;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(h));

      const hubLeft = hubBox.left - stageBox.left;
      const hubTop = hubBox.top - stageBox.top;
      const globeLeft = globeBox
        ? globeBox.left - stageBox.left
        : hubLeft - 120;
      const globeRight = globeBox
        ? globeBox.right - stageBox.left
        : hubLeft + hubBox.width + 120;

      for (let i = 0; i < 6; i++) {
        const line = pathRefs.current[i];
        const tip = tipRefs.current[i];
        const hubTip = hubTipRefs.current[i];
        const label = labelRefs.current[i];
        if (!line || !label) continue;

        const cardBox = label.getBoundingClientRect();
        const leftSide = LABELS[i]!.side === "left";
        const rank = LABELS[i]!.rank;

        const gap = 6;
        const x1 =
          cardBox.left -
          stageBox.left +
          (leftSide ? cardBox.width + gap : -gap);
        const y1 = cardBox.top - stageBox.top + cardBox.height / 2;

        const { x: x2, y: y2 } = attachOnHub(
          hubLeft,
          hubTop,
          hubBox.width,
          hubBox.height,
          LABELS[i]!.side,
          rank,
        );

        const d = angularThreadPath(
          x1,
          y1,
          x2,
          y2,
          LABELS[i]!.side,
          rank,
          globeLeft,
          globeRight,
        );
        line.setAttribute("d", d);

        tip?.setAttribute("cx", String(x1));
        tip?.setAttribute("cy", String(y1));
        hubTip?.setAttribute("cx", String(x2));
        hubTip?.setAttribute("cy", String(y2));
      }
      return true;
    };

    const paint = (now: number) => {
      if (!running) return;
      layout();

      const t0 = startRef.current ?? now;
      const elapsed = now - t0;

      for (let i = 0; i < 6; i++) {
        const line = pathRefs.current[i];
        const tip = tipRefs.current[i];
        const hubTip = hubTipRefs.current[i];
        if (!line) continue;

        const len = line.getTotalLength?.() || 0;
        if (len < 0.5) continue;

        let ease = 1;
        if (!reduceMotion) {
          const start = T.threads + i * T.threadStagger;
          const local = Math.min(
            1,
            Math.max(0, (elapsed - start) / T.threadDur),
          );
          ease = local * local * (3 - 2 * local);
        }

        // Dense dotted black stroke — readable over the particle field
        const dash = 1.6;
        const dashGap = 2.8;
        const period = dash + dashGap;
        const visible = len * ease;

        if (visible < 0.5) {
          line.style.opacity = "0";
          tip?.setAttribute("opacity", "0");
          hubTip?.setAttribute("opacity", "0");
          line.setAttribute("stroke", THREAD);
          line.style.strokeDasharray = "none";
        } else {
          const n = Math.max(1, Math.ceil(visible / period));
          const parts: number[] = [];
          for (let k = 0; k < n; k++) parts.push(dash, dashGap);
          const drawn = n * period;
          const overshoot = drawn - visible;
          if (overshoot > 0 && parts.length >= 2) {
            parts[parts.length - 1] = Math.max(0, dashGap - overshoot);
          }
          parts.push(Math.max(len, 1));
          line.style.strokeDasharray = parts.join(" ");
          line.style.strokeDashoffset = "0";
          line.style.opacity = "1";
          line.setAttribute("stroke", ease > 0.85 ? THREAD_TIP : THREAD);
          tip?.setAttribute("opacity", String(Math.min(1, ease * 1.2)));
          hubTip?.setAttribute(
            "opacity",
            String(ease > 0.92 ? (ease - 0.92) / 0.08 : 0),
          );
        }
      }

      const allDone =
        reduceMotion ||
        elapsed > T.threads + 5 * T.threadStagger + T.threadDur + 80;
      if (allDone) doneRef.current = true;

      // Keep laying out on resize even after animation completes
      raf = requestAnimationFrame(paint);
    };

    const ro = new ResizeObserver(() => {
      layout();
    });
    if (desktopStageRef.current) ro.observe(desktopStageRef.current);
    if (hubRef.current) ro.observe(hubRef.current);

    raf = requestAnimationFrame(paint);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [ready, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="engineering"
      className="relative overflow-hidden text-black"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #FFFFFF 0%, #F7F7F8 42%, #EFEFF1 78%, #E8E8EA 100%)",
      }}
      aria-labelledby={`${baseId}-heading`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(0,0,0,0.06), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1180px] px-5 pb-14 pt-20 md:px-8 md:pb-20 md:pt-28">
        <motion.div
          className="mx-auto max-w-[42rem] text-center"
          initial={reduceMotion ? false : { opacity: 0, y: enterY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: durationEnter, ease: easeOut }}
        >
          <h2
            id={`${baseId}-heading`}
            className="font-[family-name:var(--font-aeonik)] text-[34px] leading-[1.08] tracking-[-0.035em] text-black md:text-[50px]"
          >
            How it works under the hood
          </h2>
          <p className="mx-auto mt-3 max-w-[36ch] text-[15px] leading-[1.5] tracking-[-0.015em] text-black/55 md:text-[17px]">
            Six pieces, in the order a document meets them.
          </p>
        </motion.div>

        <div
          ref={stageRef}
          className="relative mx-auto mt-10 w-full max-w-[1080px] md:mt-12"
        >
          {/* Desktop diagram */}
          <div
            ref={desktopStageRef}
            className="relative hidden h-[560px] md:block lg:h-[600px]"
          >
            {/* 1. Particle globe */}
            <div
              ref={globeWrapRef}
              className="absolute left-1/2 top-1/2 z-10 size-[min(58vw,400px)] -translate-x-1/2 -translate-y-1/2 lg:size-[440px]"
            >
              {ready ? <ParticleGlobe autoPlay /> : null}
            </div>

            {/* 2. Connectors above particles, under hub + labels */}
            <svg
              ref={svgRef}
              className="pointer-events-none absolute inset-0 z-[18] h-full w-full overflow-visible"
              aria-hidden
            >
              {LABELS.map((item, i) => (
                <path
                  key={item.id}
                  ref={(el) => {
                    pathRefs.current[i] = el;
                  }}
                  d=""
                  fill="none"
                  stroke={THREAD}
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  vectorEffect="non-scaling-stroke"
                  opacity="0"
                />
              ))}
              {LABELS.map((item, i) => (
                <circle
                  key={`${item.id}-tip`}
                  ref={(el) => {
                    tipRefs.current[i] = el;
                  }}
                  cx="0"
                  cy="0"
                  r="2.4"
                  fill={THREAD_TIP}
                  opacity="0"
                />
              ))}
              {LABELS.map((item, i) => (
                <circle
                  key={`${item.id}-hub`}
                  ref={(el) => {
                    hubTipRefs.current[i] = el;
                  }}
                  cx="0"
                  cy="0"
                  r="2.25"
                  fill={THREAD_TIP}
                  opacity="0"
                />
              ))}
            </svg>

            {/* 3. Outer labels */}
            {LABELS.map((item, i) => (
              <motion.article
                key={item.id}
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                className={`absolute z-20 ${glassCard} ${
                  item.side === "left" ? "left-0" : "right-0"
                }`}
                style={{ top: item.top, position: "absolute" }}
                initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                animate={
                  labelsVisible
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: reduceMotion ? 0 : 8 }
                }
                transition={{
                  delay: reduceMotion ? 0 : i * (T.labelStagger / 1000),
                  duration: durationUi,
                  ease: easeOut,
                }}
              >
                {item.name}
              </motion.article>
            ))}

            {/* 4. Central hub — above connectors so paths terminate at its border */}
            <motion.div
              ref={hubRef}
              className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-[176px] -translate-x-1/2 -translate-y-1/2 lg:w-[188px]"
              initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
              animate={
                hubVisible
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: reduceMotion ? 0 : 10 }
              }
              transition={{
                duration: durationEnter,
                ease: easeOut,
              }}
            >
              <div className="rounded-[2px] border border-white/16 bg-[rgba(12,16,22,0.92)] px-3.5 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[12px]">
                <p className="font-[family-name:var(--font-aeonik)] text-[13px] leading-snug tracking-[-0.02em] text-white lg:text-[14px]">
                  Governed engineering layer
                </p>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#AEB6C2]">
                  powered by ZeonAI
                </p>
              </div>
            </motion.div>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <div className="relative mx-auto size-[min(78vw,300px)]">
              {ready ? <ParticleGlobe autoPlay /> : null}
              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[82%] -translate-x-1/2 -translate-y-1/2"
                initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                animate={hubVisible ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: durationUi }}
              >
                <div className="rounded-[2px] border border-white/16 bg-[rgba(12,16,22,0.92)] px-3 py-2.5 text-center backdrop-blur-[12px]">
                  <p className="text-[13px] tracking-[-0.02em] text-white">
                    Governed engineering layer
                  </p>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-[#AEB6C2]">
                    powered by ZeonAI
                  </p>
                </div>
              </motion.div>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {LABELS.map((item, i) => (
                <li key={item.id}>
                  <motion.div
                    className={glassCard}
                    initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
                    animate={labelsVisible ? { opacity: 1, y: 0 } : undefined}
                    transition={{
                      delay: reduceMotion ? 0 : i * 0.05,
                      duration: durationUi,
                    }}
                  >
                    {item.name}
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Read more — tight under the visualisation */}
          <motion.div
            className="mt-6 flex justify-center md:mt-7"
            initial={reduceMotion ? false : { opacity: 0, y: enterYSoft }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: durationUi }}
          >
            <Link
              href="/engineering"
              className="zeon-btn zeon-btn-ink group gap-2"
            >
              Read more
              <ArrowRight className="size-4 zeon-btn-arrow" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
