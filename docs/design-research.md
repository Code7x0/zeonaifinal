# Design research — non-homepage redesign

Homepage preserved. Tokens follow the **approved homepage** (`#111318` / `#245BDB` family in `.v7-site`), not the alternate teal pack in older briefs.

| Reference | Useful observation | ZeonAI reinterpretation |
| --- | --- | --- |
| [ZeonAI preview](https://zeonai-website-preview.vercel.app/) | Sample UI labelled as sample; Ask AI with citations + access boundary; Agent Hub sub-agent steps; six-layer architecture | Keep sample disclaimers; product pages show the same evidence pattern (cite → source → permission) |
| [Manifest AI](https://manifestai.com.au/) | Layered platform storytelling, industry workspaces, calm proof-of-value CTA, no decorative AI art | Pacing + trust language; never copy Manifest metrics, certifications, or violet |
| [Manifest Agent Library](https://manifestai.com.au/agent-library.html) | Catalogue by function, maturity honesty | Already mirrored on `/agent-library`; keep maturity caveat |
| [V7 Labs](https://www.v7labs.com/) | Editorial whitespace, product UI that reads as real software | Light-first heroes, sharp product frames, short line lengths |
| [V7 Skills](https://www.v7labs.com/skills) | Capability pages with concrete workflow UI | DeepDelve product pages get signature interfaces (viewer, invoice match, cash dashboard, cited Ask) |

## Skills used

- `design-taste-frontend` — anti-slop layout, substance over ornament
- `emil-design-eng` — short ease-out hovers, active press, purposeful motion only
- Project `AGENTS.md` — Next 16 / App Router conventions

## Dependencies (already installed)

- `animejs@4.5.0` — workflow/field reveals
- `matter-js@0.20.0` — only Integrations vignette (existing); not added site-wide
- `motion` — existing page enters; do not replace

## Open-source assets

- Lucide React (ISC) — existing icon family only
- No third-party photos hotlinked for this pass
