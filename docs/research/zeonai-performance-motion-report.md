# ZeonAI — Performance, Lenis, GSAP & Video Report

Date: 2026-11-21  
Local: `http://localhost:3000`  
Production reference: `https://zeonaifinal.vercel.app/`  
Motion reference studied: `https://amritpalace.com/` (pacing / reveals only — not visual copy)

## 1. Baseline (before this pass)

Measured on local Next.js 16 Turbopack after prior video-preload removal.

| Signal | Observation |
| --- | --- |
| Navigation Timing (homepage) | TTFB ~90–260ms, DCL ~280–750ms (dev server; not prod Lighthouse) |
| Videos on homepage DOM | 3 elements; only hero film playing |
| Hero film | `deepprobe-knowledge.mp4` **51.1 MB** |
| Other films | invoice 29.5 MB, financial-close 26.8 MB, agent-bricks 16.9 MB |
| Prior global preload | Had been downloading ~130MB of MP4s on every route (already removed earlier) |
| GSAP | **Not installed** — only a CDN copy inside an iframe HTML string (`gateway-flow.tsx`) |
| Animation stack | `motion` (Framer Motion successor) site-wide + Lenis |
| Lenis | Present; driven by Motion `frame` ticker; **no ScrollTrigger sync** |
| External font | `@import` Helvetica Now from `db.onlinewebfonts.com` in `globals.css` (render-blocking) |
| WebGL | `GLSLHills` on hero (desktop); `three` dependency |
| Fade / reveal | Motion `whileInView` (`FadeUp`) — no shared GSAP system |

**Honest note:** Embedded browser Performance API did not emit reliable FCP/LCP/INP numbers. Baseline below is asset + architecture based, plus Navigation Timing. Re-run Chrome Lighthouse against production after deploy for score deltas.

## 2. Main bottlenecks (priority)

1. **Oversized product MP4s** (especially 51MB hero) — dominant network/CPU cost when near-view loads.
2. **No coordinated video arbitration** — multiple films could compete when several near viewport.
3. **Missing posters in the `<video>` element** — black underlay until first frame.
4. **Lenis not synced to ScrollTrigger** — blocked a proper GSAP scroll system.
5. **External Helvetica `@import`** — extra critical-path CSS/font work vs Aeonik.
6. **Heavy homepage sections** in the initial JS graph (engineering / role configurator / security).
7. **WebGL hills** on desktop hero (acceptable if deferred; already dynamic + hidden on mobile).

## 3. Lenis changes

File: `src/components/sites/v7labs/smooth-scroll.tsx`

- Single `ReactLenis` root per page tree (unchanged pattern).
- Switched RAF driver from Motion `frame` → **GSAP ticker** (`lenis.raf(time * 1000)`).
- `lenis.on("scroll", ScrollTrigger.update)`.
- `gsap.ticker.lagSmoothing(0)`.
- Slightly snappier feel: `lerp: 0.12`, `wheelMultiplier: 0.95`.
- Still **disabled** for `prefers-reduced-motion` and `pointer: coarse` (native touch scroll).
- Stable children tree (no remount when enabling) — preserves Technology `.rv` / IO bindings.

## 4. GSAP / ScrollTrigger changes

- Installed `gsap@^3.15.1` and `@gsap/react@^2.1.2`.
- `motion/gsap-register.ts` — idempotent `ScrollTrigger` + `useGSAP` registration.
- `FadeUp` rewritten to GSAP `fromTo` + ScrollTrigger (once, opacity + y only).
- New `ScrollReveal` / `ScrollRevealStagger` helpers for section choreography.
- Reduced-motion CSS forces reveals visible.
- Verified: below-fold nodes start at opacity 0; after scroll they reach opacity 1.

## 5. Text / section animation

- Reused existing `FadeUp` call sites (Final CTA, Feature108 headers, IA pages, etc.) now on GSAP.
- Homepage wraps LogoTicker, Partners, WorksWith in `ScrollReveal` for Amrit-like pacing without restaurant styling.
- No character splitting; no pin-everything; transforms/opacity only.

## 6–7. Video autoplay & loading

Files: `product-video.tsx`, `video-visibility.ts`

- **Poster-first** paint (`<img>` + `video.poster`); film fades in after playback starts.
- `preload="none"` until near view; then `metadata`.
- `<source>` attached only when near view.
- Shared **visibility manager** — highest intersection ratio (≥0.08) wins; others pause.
- Muted + `playsInline`; `play()` promise handled; **Play demo** button only if autoplay rejected.
- Tab section still mounts **only the active** film (earlier fix).
- Videos **not removed**; quality preserved. Encoding remaster of the 51MB hero is recommended next (ffmpeg) — not done here without a tool/encode pass.

## 8. Image & font

- Removed blocking Helvetica Now remote `@import` from `globals.css`.
- Aeonik local + Inter Google remain (`font-display: swap`).
- Large brand PNGs (~260–300KB) left as-is (identity assets); candidates for WebP later.

## 9. JS / rendering

- Homepage code-splits `EngineeringSection`, `RoleConfigurator`, `SecurityComplianceSection` via `next/dynamic`.
- Hero `GLSLHills` already `dynamic(..., { ssr: false })` and `max-md:hidden`.
- Long-cache headers for `/sites/*` (prior commit).

## 10. Mobile / tablet

- Lenis off on coarse pointers → native momentum.
- Hills hidden on small screens.
- Video manager + posters apply on all viewports.
- Full device matrix Lighthouse not re-run in this session — verify on hardware after deploy.

## 11. Before / after (engineering)

| Area | Before | After |
| --- | --- | --- |
| Global MP4 preload | All films (~130MB) every route | None (earlier) |
| Homepage videos mounted | Up to 8 tab films | Active tab + hero (+ deferred others) |
| Scroll engine | Lenis + Motion RAF | Lenis + **GSAP ticker** + ScrollTrigger |
| Reveals | Motion `whileInView` | GSAP ScrollTrigger |
| Video poster | Registry only | Painted in DOM |
| Playback coordination | Independent IOs | Shared winner-takes-play |
| External Helvetica | Loaded | Removed |
| Heavy homepage sections | Eager | Dynamic import |

Local check after change: Aeonik applied, body `display: flex`, hero video playing with poster, FadeUps reveal on scroll.

## 12. Remaining issues / limits

1. **Re-encode hero MP4** (51MB → target ~4–8MB H.264/H.265) — largest remaining win; needs encode tooling.
2. Customer-story remote CloudFront MP4 still loads when that section nears view.
3. Production Lighthouse / INP / CLS numbers should be captured post-deploy (this environment’s CDP did not expose LCP reliably).
4. Motion still used for UI (menus, tabs, architecture crossfades) — intentional; GSAP owns scroll reveals + Lenis sync.
5. `THREE.Clock` deprecation warning in hills — cleanup later.
6. iOS Safari autoplay: muted inline should work; manual Play fallback covers blocks.

## Files touched (this pass)

- `package.json` / lock — `gsap`, `@gsap/react`
- `smooth-scroll.tsx`, `fade-up.tsx`, `home-page.tsx`
- `motion/gsap-register.ts`, `motion/scroll-reveal.tsx`
- `video/product-video.tsx`, `video/video-visibility.ts`
- `app/globals.css`
