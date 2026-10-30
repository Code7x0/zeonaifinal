"use client";

/**
 * Contained Matter.js hub + satellite nodes for Integrations page.
 * Labels stay readable; reduced-motion falls back to static mesh.
 */

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  items: readonly string[];
  className?: string;
};

function StaticMesh({ items, className }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[16px] border border-[var(--zeon-border-blue)] bg-[var(--zeon-sky)] p-6 md:p-10",
        className,
      )}
    >
      <div className="relative mx-auto flex max-w-[720px] flex-wrap items-center justify-center gap-3">
        <div className="flex size-24 flex-col items-center justify-center rounded-full border border-[var(--zeon-royal)]/30 bg-white text-center shadow-[var(--zeon-shadow-elevated)]">
          <span className="text-[11px] text-[#5B6766]">Hub</span>
          <span className="mt-1 text-[13px] font-medium text-[#111318]">
            AI Workspace
          </span>
        </div>
        {items.map((name) => (
          <div
            key={name}
            className="rounded-full border border-[#DCE1E0] bg-white px-4 py-2 text-[13px] text-[#111318]"
          >
            {name}
          </div>
        ))}
      </div>
      <p className="relative mt-6 text-center text-[13px] text-[#5B6766]">
        Connectors are scoped per engagement — illustrative catalogue from the
        product brief.
      </p>
    </div>
  );
}

export function IntegrationPhysics({ items, className }: Props) {
  const reduceMotion = useReducedMotion() ?? false;
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Constraint,
      Mouse,
      MouseConstraint,
      Events,
      Body,
    } = Matter;

    const w = host.clientWidth || 720;
    const h = Math.max(360, Math.min(480, Math.round(w * 0.55)));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const engine = Engine.create({ gravity: { x: 0, y: 0 } });
    const render = Render.create({
      canvas,
      engine,
      options: {
        width: w,
        height: h,
        pixelRatio: dpr,
        background: "transparent",
        wireframes: false,
      },
    });

    const wallOpts = { isStatic: true, render: { visible: false } };
    const walls = [
      Bodies.rectangle(w / 2, -20, w, 40, wallOpts),
      Bodies.rectangle(w / 2, h + 20, w, 40, wallOpts),
      Bodies.rectangle(-20, h / 2, 40, h, wallOpts),
      Bodies.rectangle(w + 20, h / 2, 40, h, wallOpts),
    ];

    const hub = Bodies.circle(w / 2, h / 2, 42, {
      isStatic: true,
      render: {
        fillStyle: "#245BDB",
        strokeStyle: "#7BA0FF",
        lineWidth: 2,
      },
    });

    const slice = items.slice(0, 10);
    const satellites = slice.map((name, i) => {
      const angle = (i / slice.length) * Math.PI * 2;
      const r = Math.min(w, h) * 0.32;
      const x = w / 2 + Math.cos(angle) * r;
      const y = h / 2 + Math.sin(angle) * r;
      const body = Bodies.circle(x, y, 28, {
        restitution: 0.55,
        frictionAir: 0.08,
        render: {
          fillStyle: "#ffffff",
          strokeStyle: "#C7D2FE",
          lineWidth: 1.5,
        },
        label: name,
      });
      const spring = Constraint.create({
        bodyA: hub,
        bodyB: body,
        stiffness: 0.012,
        damping: 0.08,
        length: r,
        render: {
          strokeStyle: "rgba(53,109,255,0.35)",
          lineWidth: 1,
        },
      });
      return { body, spring, name };
    });

    Composite.add(engine.world, [
      ...walls,
      hub,
      ...satellites.map((s) => s.body),
      ...satellites.map((s) => s.spring),
    ]);

    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.15,
        render: { visible: false },
      },
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    Events.on(render, "afterRender", () => {
      const ctx = render.context;
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.font = "600 11px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("AI Workspace", hub.position.x, hub.position.y);
      ctx.fillStyle = "#111318";
      ctx.font = "500 10px system-ui, sans-serif";
      for (const s of satellites) {
        const short =
          s.name.length > 14 ? `${s.name.slice(0, 12)}…` : s.name;
        ctx.fillText(short, s.body.position.x, s.body.position.y);
      }
      ctx.restore();
    });

    const runner = Runner.create();
    Render.run(render);
    Runner.run(runner, engine);

    const onResize = () => {
      const nw = host.clientWidth || 720;
      const nh = Math.max(360, Math.min(480, Math.round(nw * 0.55)));
      render.bounds.max.x = nw;
      render.bounds.max.y = nh;
      render.options.width = nw;
      render.options.height = nh;
      render.canvas.width = nw * dpr;
      render.canvas.height = nh * dpr;
      render.canvas.style.width = `${nw}px`;
      render.canvas.style.height = `${nh}px`;
      Body.setPosition(hub, { x: nw / 2, y: nh / 2 });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      Runner.stop(runner);
      Render.stop(render);
      Mouse.clearSourceEvents(mouse);
      Engine.clear(engine);
      render.canvas.width = 0;
      render.canvas.height = 0;
    };
  }, [items, reduceMotion]);

  if (reduceMotion) {
    return <StaticMesh items={items} className={className} />;
  }

  return (
    <div
      ref={hostRef}
      className={cn(
        "relative overflow-hidden rounded-[16px] border border-[var(--zeon-border-blue)] bg-[var(--zeon-sky)]",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="block w-full touch-none"
        aria-label="Interactive integration map. Drag nodes around the AI Workspace hub."
      />
      <p className="border-t border-[var(--zeon-border-blue)] px-5 py-3 text-center text-[13px] text-[#5B6766]">
        Drag a system — springs keep it linked to AI Workspace. Connectors are
        scoped per engagement.
      </p>
    </div>
  );
}
