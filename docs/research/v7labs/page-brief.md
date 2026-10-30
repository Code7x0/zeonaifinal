# V7 Labs homepage brief

**Source:** https://www.v7labs.com/  
**Local route:** `/` (replaces template homepage)  
**Site key:** `v7labs`  
**Stack notes:** Framer-published marketing page; recreate in Next.js App Router.

## Route map

| Source | Local | Owner |
|--------|-------|-------|
| https://www.v7labs.com/ | `/` | `src/app/page.tsx` + `src/components/sites/v7labs/*` |
| Out-of-scope product/docs links | Keep absolute `https://www.v7labs.com/...` | disclosed in UI as external |

## Section order (desktop ~1905×7089)

1. Announcement bar (black) — “AI for Private Markets… Watch Video”
2. Header/Navigation — logo, Product/Solutions/Resources/Company, Login / Watch video / Get in Touch
3. Hero (~1080) — serif H1, subline, Book a demo, spark visual, “Shaping the *future*…”
4. Logo ticker
5. Intro / Product pillars — industry cards (Private Markets, Insurance, Real Estate)
6. Quote ticket marquee
7. Bentos — Agents / Doc gen / Knowledge / Integrations
8. Trust & Security — video testimonials, metric cards, Before/With V7/Result table, case stats, security panel
9. Final CTA — “Build once…”
10. Footer — multi-column links + “AI workflows for complex enterprise operations.”

## Typography

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Display / H1–H2 | Martina Plantijn Light | 300 | Local: `/sites/v7labs/fonts/martina-plantijn-light.woff2` |
| UI / body | STK Bureau Sans Book | 400 | Local book + medium woff2 |
| Accent italic | Instrument Serif (Google) | 400 italic | “future” in hero tagline |
| H1 | 54px / 54px lh / -1.62px tracking / #292929 | | |
| H2 | ~48px light | | |
| Nav / buttons | ~12–14px Book | pill radius 160px | |

## Colors

- Background `#fff`, text `#000` / `#292929`
- Primary button fill `#1c1c1c`
- Announcement `#171717`
- Result accent ≈ `#ed6c47`
- Borders ≈ `#e8e8e8` / `#f0f0f0`
- Soft panel fill `#f6f6f6`

## Layout

- Content max width ≈ 1336px (bento/metrics), industry cards ~440×362 in row of 3
- Hero content centered; subline ~508px wide
- Sticky header under announcement bar

## Interactions

- Nav megamenus (Product/Solutions/Resources/Company) — dropdowns on click/hover
- Quote marquee auto-scroll
- Testimonial carousel + metric carousel
- Mobile: collapse nav to menu
- Outbound: Login → go.v7labs.com; CTAs → /demo; industry → industry pages

## Assets

Mapped under `public/sites/v7labs/` — fonts, logo SVG, hero spark, portraits, integration marks, arrows. Bento product UIs recreated as HTML (source uses Framer compositions, not single downloadable screenshots).
