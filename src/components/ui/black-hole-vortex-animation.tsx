"use client";

import { useMemo, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type VortexPath = {
  id: number;
  d: string;
  width: number;
  opacity: number;
  duration: number;
  delay: number;
};

type BlackHoleEffectProps = {
  className?: string;
  /** Particle stroke class — Zeon blue-tinted on dark heroes */
  particleClassName?: string;
  /** Path count; lower is quieter on marketing pages */
  density?: number;
};

function buildPaths(count: number): VortexPath[] {
  return Array.from({ length: count }, (_, i) => {
    const startAngle = Math.random() * Math.PI * 2;
    const startRadius = 220 + Math.random() * 280;
    const startX = 348 + startRadius * Math.cos(startAngle);
    const startY = 158 + startRadius * Math.sin(startAngle) * 0.52;
    const endX = 348;
    const endY = 158;

    const twist = Math.PI / 2 + (Math.random() - 0.5) * (Math.PI / 2);
    const cp1Angle = startAngle - twist;
    const cp1Radius = startRadius * 0.7;
    const cp1x = 348 + cp1Radius * Math.cos(cp1Angle);
    const cp1y = 158 + cp1Radius * Math.sin(cp1Angle) * 0.6;

    const cp2Angle = startAngle - twist / 2;
    const cp2Radius = startRadius * 0.3;
    const cp2x = 348 + cp2Radius * Math.cos(cp2Angle);
    const cp2y = 158 + cp2Radius * Math.sin(cp2Angle) * 0.8;

    return {
      id: i,
      d: `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`,
      width: 0.2 + Math.random() * 0.55,
      opacity: 0.08 + Math.random() * 0.35,
      duration: 7 + Math.random() * 9,
      delay: Math.random() * 12,
    };
  });
}

/**
 * Atmospheric black-hole vortex — background layer only.
 * Uses Motion (project already ships `motion`; no separate framer-motion install).
 */
export function BlackHoleEffect({
  className,
  particleClassName = "text-slate-300/80",
  density = 96,
}: BlackHoleEffectProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const paths = useMemo(
    () => buildPaths(reduceMotion ? 0 : density),
    [density, reduceMotion],
  );

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <svg
        className={cn("h-full w-full", particleClassName)}
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Black hole vortex</title>
        <defs>
          <radialGradient
            id="zeonBlackHoleCore"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="rgba(0,0,0,1)" />
            <stop offset="42%" stopColor="rgba(8,10,18,1)" />
            <stop offset="68%" stopColor="rgba(15,23,42,0.85)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0)" />
          </radialGradient>
          <radialGradient id="zeonBlackHoleHalo" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="rgba(41,98,255,0)" />
            <stop offset="78%" stopColor="rgba(41,98,255,0.12)" />
            <stop offset="100%" stopColor="rgba(41,98,255,0)" />
          </radialGradient>
        </defs>

        <circle cx="348" cy="158" r="92" fill="url(#zeonBlackHoleHalo)" />
        <circle cx="348" cy="158" r="44" fill="url(#zeonBlackHoleCore)" />
        <circle cx="348" cy="158" r="6" fill="#000" />

        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: path.delay,
            }}
          />
        ))}
      </svg>

      {/* Readability vignette — keeps copy crisp over the vortex */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.82)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

type BlackHoleSceneProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
};

/** Full-bleed demo scene. Prefer BlackHoleEffect behind product heroes. */
export function BlackHoleScene({
  title = "Into the Void",
  children,
  className,
}: BlackHoleSceneProps) {
  const words = title.split(" ");
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white",
        className,
      )}
    >
      <BlackHoleEffect />
      <div className="relative z-10 container mx-auto px-4 text-center md:px-6">
        {children ?? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mx-auto max-w-4xl"
          >
            <h1
              className="mb-8 text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl"
              style={{
                textShadow:
                  "0 0 15px rgba(255, 255, 255, 0.35), 0 0 28px rgba(41, 98, 255, 0.18)",
              }}
            >
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="mr-4 inline-block last:mr-0">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={
                        reduceMotion ? false : { scale: 0.5, opacity: 0 }
                      }
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: reduceMotion
                          ? 0
                          : 0.4 + wordIndex * 0.08 + letterIndex * 0.03,
                        type: "spring",
                        stiffness: 150,
                        damping: 16,
                      }}
                      className="inline-block bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>
          </motion.div>
        )}
      </div>
    </div>
  );
}
