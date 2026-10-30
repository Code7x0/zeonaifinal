"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Z } from "./tokens";
import { durationEnter, easeOut, enterY } from "../motion";

export function EngPanel({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border ${className}`}
      style={{
        borderColor: dark ? "rgba(255,255,255,0.12)" : Z.line,
        backgroundColor: dark ? Z.ink : Z.paper,
        boxShadow: dark
          ? "0 24px 60px rgba(1,15,15,0.35)"
          : "0 16px 40px rgba(1,15,15,0.06)",
      }}
    >
      {children}
    </div>
  );
}

export function EngChrome({
  title,
  dark = false,
  children,
}: {
  title: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        className="flex h-8 shrink-0 items-center gap-2 border-b px-3"
        style={{
          borderColor: dark ? "rgba(255,255,255,0.1)" : Z.line,
          backgroundColor: dark ? "#0a1616" : Z.mist,
        }}
      >
        <span className="flex gap-1" aria-hidden>
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: dark ? "rgba(255,255,255,0.25)" : Z.fog }}
          />
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: dark ? "rgba(255,255,255,0.25)" : Z.fog }}
          />
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: dark ? "rgba(255,255,255,0.25)" : Z.fog }}
          />
        </span>
        <p
          className="truncate font-mono text-[10px]"
          style={{ color: dark ? "rgba(255,255,255,0.4)" : Z.fog }}
        >
          {title}
        </p>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

export function EngReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: enterY }}
      animate={
        inView || reduce
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: enterY }
      }
      transition={{
        duration: reduce ? 0 : durationEnter,
        delay: reduce ? 0 : delay,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}

export function useInViewOnce(amount = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (inView) setShown(true);
  }, [inView]);
  return { ref, shown };
}

export function StatusDot({
  active,
  label,
}: {
  active?: boolean;
  label?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: active ? Z.blue : Z.fog }}
        aria-hidden
      />
      {label ? (
        <span className="font-mono text-[10px]" style={{ color: Z.fog }}>
          {label}
        </span>
      ) : null}
    </span>
  );
}
