"use client";

import { useEffect, useRef } from "react";

const CONFIG = {
  lineColor: "#E6E6E6",
  signalColor: "#FF6300",
  lineOpacity: 0.065,
  lineWidth: 0.75,
  lineCount: 80,
  signalCount: 90,
  convergeX: 0.46,
  convergeY: 0.58,
  spreadTop: -0.12,
  spreadBottom: 1.12,
  curvePower: 2.4,
  waveHeight: 0.012,
  waveSpeed: 0.35,
  speedMin: 0.035,
  speedMax: 0.11,
  trailLength: 14,
  signalWidth: 0.85,
  continueShare: 0.3,
} as const;

type Signal = {
  line: number;
  s: number;
  speed: number;
  alpha: number;
  continues: boolean;
};

export function SignalFunnel({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const SEGMENTS = 90;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let SPLIT = 0.5;
    let last = performance.now();
    let running = true;
    let rafId = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const newSignal = (spreadOut: boolean): Signal => ({
      line: Math.floor(Math.random() * CONFIG.lineCount),
      s: spreadOut ? Math.random() : rand(-0.15, 0),
      speed: rand(CONFIG.speedMin, CONFIG.speedMax),
      alpha: rand(0.55, 1),
      continues: Math.random() < CONFIG.continueShare,
    });
    const signals = Array.from({ length: CONFIG.signalCount }, () =>
      newSignal(true),
    );

    const lineStartY = (i: number) => {
      const t = i / Math.max(1, CONFIG.lineCount - 1);
      return (
        (CONFIG.spreadTop + (CONFIG.spreadBottom - CONFIG.spreadTop) * t) * H
      );
    };

    const curvePoint = (i: number, u: number, time: number) => {
      const cx = CONFIG.convergeX * W;
      const cy = CONFIG.convergeY * H;
      const y0 = lineStartY(i);
      const g = Math.pow(1 - u, CONFIG.curvePower);
      const wave =
        Math.sin(u * Math.PI * 3 - time * CONFIG.waveSpeed + i * 0.21) *
        CONFIG.waveHeight *
        H *
        g;
      return { x: u * cx, y: cy + (y0 - cy) * g + wave };
    };

    const pathPoint = (i: number, s: number, time: number) => {
      if (s <= SPLIT) return curvePoint(i, s / SPLIT, time);
      const cx = CONFIG.convergeX * W;
      const u = (s - SPLIT) / (1 - SPLIT);
      return { x: cx + u * (W - cx), y: CONFIG.convergeY * H };
    };

    const drawLines = (time: number) => {
      ctx.save();
      ctx.globalAlpha = CONFIG.lineOpacity;
      ctx.strokeStyle = CONFIG.lineColor;
      ctx.lineWidth = CONFIG.lineWidth;
      ctx.beginPath();
      for (let i = 0; i < CONFIG.lineCount; i++) {
        for (let k = 0; k <= SEGMENTS; k++) {
          const p = curvePoint(i, k / SEGMENTS, time);
          if (k === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
      }
      const cy = CONFIG.convergeY * H;
      ctx.moveTo(CONFIG.convergeX * W, cy);
      ctx.lineTo(W, cy);
      ctx.stroke();
      ctx.restore();
    };

    const drawSignals = (time: number) => {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = CONFIG.signalWidth;
      const pathLen =
        CONFIG.convergeX * W * 1.15 + (1 - CONFIG.convergeX) * W;
      const trailS = CONFIG.trailLength / pathLen;
      const active = Math.round(
        signals.length * Math.min(1, Math.max(0.35, W / 1440)),
      );
      for (let j = 0; j < active; j++) {
        const sg = signals[j];
        if (sg.s < 0 || sg.s > 1) continue;
        if (!sg.continues && sg.s > SPLIT + 0.01) continue;
        const head = pathPoint(sg.line, sg.s, time);
        const tail = pathPoint(sg.line, Math.max(0, sg.s - trailS), time);
        let edge = Math.min(1, sg.s / 0.04);
        if (sg.continues) {
          const u = Math.max(0, (sg.s - SPLIT) / (1 - SPLIT));
          edge = Math.min(edge, (1 - sg.s) / 0.04, 1 - 0.55 * u);
        } else {
          edge = Math.min(edge, (SPLIT + 0.01 - sg.s) / 0.06);
        }
        if (edge <= 0) continue;
        const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        grad.addColorStop(0, `${CONFIG.signalColor}00`);
        grad.addColorStop(1, CONFIG.signalColor);
        ctx.globalAlpha = sg.alpha * edge;
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(head.x, head.y);
        ctx.stroke();
      }
      ctx.restore();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, W, H);
      drawLines(time);
      drawSignals(time);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const curveLen = CONFIG.convergeX * W * 1.15;
      const straightLen = (1 - CONFIG.convergeX) * W;
      SPLIT = curveLen / (curveLen + straightLen);
      if (reduceMotion) draw(0);
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const time = now / 1000;
      for (let j = 0; j < signals.length; j++) {
        const sg = signals[j];
        sg.s += sg.speed * dt;
        const end = sg.continues ? 1 : SPLIT + 0.01;
        if (sg.s > end) signals[j] = newSignal(false);
      }
      draw(time);
      if (running) rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduceMotion || (running && rafId)) return;
      running = true;
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onVisibility = () => (document.hidden ? stop() : start());
    const io = new IntersectionObserver(([e]) =>
      e.isIntersecting ? start() : stop(),
    );

    if (reduceMotion) {
      draw(0);
    } else {
      rafId = requestAnimationFrame(frame);
      document.addEventListener("visibilitychange", onVisibility);
      io.observe(canvas);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "pointer-events-none absolute inset-0 size-full"}
    />
  );
}
