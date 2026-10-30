"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 5200;
const RADIUS = 1.0;

type ParticleGlobeProps = {
  autoPlay?: boolean;
  className?: string;
};

function fibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  // Darker greys with depth — readable on white without becoming a solid mass
  const near = new THREE.Color("#2E3238");
  const primary = new THREE.Color("#454A52");
  const secondary = new THREE.Color("#636872");
  const depth = new THREE.Color("#858B95");

  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const rAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * rAtY * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * rAtY * radius;

    const roll = (i * 19) % 100;
    const c =
      roll < 10 ? near : roll < 38 ? primary : roll < 70 ? secondary : depth;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
    sizes[i] = roll < 10 ? 1.08 : 0.4 + ((i % 5) * 0.045);
  }
  return { positions, colors, sizes };
}

export function ParticleGlobe({
  autoPlay = true,
  className = "",
}: ParticleGlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ autoPlay });

  useEffect(() => {
    stateRef.current.autoPlay = autoPlay;
  }, [autoPlay]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let disposed = false;
    let raf = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let visible = true;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    // Slightly tighter framing so the organic particle silhouette fills the box
    const frustum = 1.12;
    const camera = new THREE.OrthographicCamera(
      -frustum,
      frustum,
      frustum,
      -frustum,
      0.1,
      20,
    );
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const { positions, colors, sizes } = fibonacciSphere(PARTICLE_COUNT, RADIUS);
    const target = positions.slice();
    const current = new Float32Array(PARTICLE_COUNT * 3);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(current, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.NormalBlending,
      uniforms: {
        uAssembly: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aColor;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uAssembly;
        uniform float uPixelRatio;
        void main() {
          vColor = aColor;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          // Near particles darker/stronger; far particles recede
          float depth = clamp((-mv.z - 3.2) / 2.2, 0.0, 1.0);
          vAlpha = mix(0.16, 0.98, uAssembly) * mix(0.38, 1.0, 1.0 - depth * 0.55);
          float size = aSize * uPixelRatio * 2.6 * mix(0.38, 1.0, uAssembly);
          gl_PointSize = clamp(size, 0.5, 2.9);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.45) discard;
          float soft = 1.0 - smoothstep(0.05, 0.45, d);
          gl_FragColor = vec4(vColor, vAlpha * soft);
        }
      `,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const rot = { x: 0, y: 0.12 };
    const vel = { x: 0, y: 0.0014 };
    const pointer = {
      active: false,
      id: -1,
      lastX: 0,
      lastY: 0,
    };

    const resize = () => {
      if (!renderer || !wrap) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) return;
      const side = Math.round(Math.min(w, h));
      renderer.setSize(side, side, false);
      canvas.style.width = `${side}px`;
      canvas.style.height = `${side}px`;
      camera.left = -frustum;
      camera.right = frustum;
      camera.top = frustum;
      camera.bottom = -frustum;
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { rootMargin: "100px" },
    );
    io.observe(wrap);

    const onPointerDown = (e: PointerEvent) => {
      if (reduceMotion) return;
      pointer.active = true;
      pointer.id = e.pointerId;
      pointer.lastX = e.clientX;
      pointer.lastY = e.clientY;
      vel.x = 0;
      vel.y = 0;
      wrap.setPointerCapture(e.pointerId);
      wrap.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointer.active || e.pointerId !== pointer.id) {
        if (pointer.active || reduceMotion) return;
        const rect = wrap.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        rot.x += (-ny * 0.1 - rot.x) * 0.035;
        return;
      }
      const dx = e.clientX - pointer.lastX;
      const dy = e.clientY - pointer.lastY;
      pointer.lastX = e.clientX;
      pointer.lastY = e.clientY;
      rot.y += dx * 0.0055;
      rot.x += dy * 0.004;
      rot.x = Math.max(-0.85, Math.min(0.85, rot.x));
      vel.y = dx * 0.00045;
      vel.x = dy * 0.00035;
    };

    const endPointer = (e: PointerEvent) => {
      if (e.pointerId !== pointer.id) return;
      pointer.active = false;
      wrap.style.cursor = "grab";
      try {
        wrap.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    };

    wrap.addEventListener("pointerdown", onPointerDown);
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerup", endPointer);
    wrap.addEventListener("pointercancel", endPointer);
    wrap.style.cursor = reduceMotion ? "default" : "grab";
    wrap.style.touchAction = "none";

    const t0 = performance.now();

    const tick = (now: number) => {
      if (disposed || !renderer) return;
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const elapsed = (now - t0) / 1000;
      const a = reduceMotion
        ? 1
        : Math.min(1, Math.max(0, (elapsed - 0.05) / 1.5));

      if (!reduceMotion && !pointer.active && stateRef.current.autoPlay) {
        vel.y *= 0.95;
        vel.x *= 0.92;
        if (Math.abs(vel.y) < 0.00075) vel.y = 0.0014;
        rot.y += vel.y;
        rot.x += vel.x;
        rot.x *= 0.985;
      }

      mat.uniforms.uAssembly.value = a;
      const ease = a * a * (3 - 2 * a);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3;
        current[ix] = target[ix]! * ease;
        current[ix + 1] = target[ix + 1]! * ease;
        current[ix + 2] = target[ix + 2]! * ease;
      }
      geo.attributes.position!.needsUpdate = true;

      points.rotation.y = rot.y;
      points.rotation.x = rot.x;

      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointerdown", onPointerDown);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerup", endPointer);
      wrap.removeEventListener("pointercancel", endPointer);
      geo.dispose();
      mat.dispose();
      scene.remove(points);
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative h-full w-full ${className}`}
      role="img"
      aria-label="Interactive governed engineering particle globe — drag to rotate"
    >
      <canvas
        ref={canvasRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
    </div>
  );
}
