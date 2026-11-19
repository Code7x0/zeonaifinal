# ZeonAI video asset inventory

Source of truth for placements: **ZeonAI Website — Video Placement Brief**.  
Runtime registry: `src/components/sites/v7labs/video/registry.ts`.

## Existing media in the repository

| Asset | Topic | Duration | Aspect | Loop / click | Placement fit | Poster / captions |
|-------|-------|----------|--------|--------------|---------------|-------------------|
| CloudFront MP4 used by homepage `FinalCta` | Decorative particle sculpture | Unknown | ~1:1 crop in UI | Loop (muted) | Ambient CTA art only | `/sites/v7labs/demo-particle.png` |
| `public/sites/v7labs/video/demo-expectations.mp4` | Generated ambient office (Grok Imagine) | ~8s | 16:9 | Click | Demo expectations until product film arrives | SVG poster |
| `public/sites/v7labs/video/about-founder.mp4` | Generated ambient conference room | ~8s | 16:9 | Click | About section until on-camera founder film arrives | SVG poster |

**Product UI demos on the site:** live HTML `AppShell` / `PLATFORM_SCREENS` / Technology `MockWindow` fragments (product-performs). Not stock SaaS dashboards.

No real ZeonAI product screen recordings from Biswa yet. Personal / unrelated videos in Downloads are **not** used.

## Placement status (all product slots)

Every product placement is registered with `src: null` and a generated 16:9 SVG poster under `public/sites/v7labs/video/posters/`.  
`ProductVideo` shows the poster until a real file is set on the registry entry.

### Placement 1 — Homepage hero

| ID | Needed | Duration | Mode |
|----|--------|----------|------|
| `home-hero` | Ask AI answering with citations appearing | 20–30s | Loop |

### Placement 2 — Homepage six tabs

| ID | Needed | Duration | Mode |
|----|--------|----------|------|
| `home-tab-ask-ai` | Ask AI | 10–15s | Loop |
| `home-tab-ai-drive` | AI Drive | 10–15s | Loop |
| `home-tab-workflows` | Workflows | 10–15s | Loop |
| `home-tab-dashboards` | Dashboards | 10–15s | Loop |
| `home-tab-contracts` | Contracts | 10–15s | Loop |
| `home-tab-agent-hub` | Agent Hub | 10–15s | Loop |

### Placement 3 — Capability walkthroughs (click + captions)

| ID | Route |
|----|-------|
| `capability-ask-ai` | `/platform/ask-ai` |
| `capability-ai-drive` | `/platform/ai-drive` |
| `capability-workflows` | `/platform/workflows` |
| `capability-dashboards` | `/platform/dashboards` |
| `capability-contracts` | `/platform/contracts` |
| `capability-opportunity` | `/platform/opportunity` |
| `capability-quotes` | `/platform/quotes` |
| `capability-app-hub` | `/platform/app-hub` |
| `capability-agent-hub` | `/agents`, `/platform/agent-hub` |

Target: 60–90s each, WebVTT captions required when published.

### Placement 4 — Case studies (30–45s)

| ID | Route |
|----|-------|
| `case-mortgage-application-automation` | `/customers/mortgage-application-automation` |
| `case-partner-billing-automation` | `/customers/partner-billing-automation` |
| `case-bank-statement-receipting` | `/customers/bank-statement-receipting` |
| `case-media-content-intelligence` | `/customers/media-content-intelligence` |

### Placement 5 — Technology (10–20s loops)

| ID | Section |
|----|---------|
| `tech-rerun` | `#runtime` — rerun from any step |
| `tech-dashboard-calc` | `#determinism` — view calculation |
| `tech-rule-builder` | `#rules` — sentence → tested rule |

Architecture diagrams are **not** replaced by video.

### Placement 6 — Industries (~30s)

| ID | Route |
|----|-------|
| `industry-financial` | `/industries/financial` |
| `industry-super` | `/industries/super` |
| `industry-media` | `/industries/media` |
| `industry-gov` | `/industries/gov` |
| `industry-defence` | `/industries/defence` |
| `industry-metals` | `/industries/metals` |

### Placement 7 — About

| ID | Needed |
|----|--------|
| `about-founder` | Founder on governed AI + how ZeonAI works with customers (60–90s, captions) |

### Placement 8 — Demo

| ID | Needed |
|----|--------|
| `demo-expectations` | “What you will see in the demo” (45–60s, captions) |

## How to publish a recording

1. Place file at e.g. `public/sites/v7labs/video/<id>.mp4` (H.264, 16:9).
2. Optional captions: `public/sites/v7labs/video/<id>.en.vtt`.
3. Optional custom poster PNG: `public/sites/v7labs/video/posters/<name>.png` (update registry `poster`).
4. In `registry.ts`, set `src`, `captionsSrc`, and `status: "ready"`.

No page component changes required.

## Still required from Biswa

- All rows above (31 product slots).
- First-frame poster stills from the real UI (replace SVG placeholders).
- English captions (`.vtt`) for every click-to-play asset.
- Confirmation that case-study films use sample data only (no unapproved customer faces or figures).

## Explicitly out of scope (no video)

Trust, security, responsible AI, legal, and architecture diagram sections.
