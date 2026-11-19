# ZeonAI Content Review — Final Handoff

Implemented against Content Review (Biswa, 17 Nov 2026) and Video Placement Brief.
`npm run typecheck` passes. No commit created (awaiting your request).

## 1. Pages changed

Homepage, Platform, Products (+ DocAI, InvoiceAI, CashfloAI, AI Workspace), Technology, Industries (+ Construction, Telco, Medtech), Agent Hub (`/agents`), Agent library, Integrations, Architecture, Engineering, About, Trust, Responsible AI, Deployment, Demo, Contact, Resources, Customers/case studies (copy hygiene), layout metadata.

## 2. Pages merged or redirected

| From | To |
|------|-----|
| `/products/deepprobe` | `/products/ai-workspace` |
| `/how-we-work` | `/about` (`#how-we-work` on About) |
| `/security` | `/trust` |
| `/platform/agent-hub` | `/agents` |

Homepage: removed duplicate six-layer `ArchitectureSection`; engineering links to `/architecture`.
Platform: six-layer rail replaced with link to `/architecture`.

## 3. Internal notes removed

All listed drafting notes (figures-to-confirm, STATUS TO CONFIRM, module-box instruction, AFTER THE PLATFORM, HTML fragment, portfolio maturity %, illustrative catalogue, drag-a-node, contact form internals, Principle 04, Practices from the brief, verification instructions, demo guarantee framing, etc.). Claims retained where approved.

## 4. Product naming

- DeepDelve → **Agent Hub** (no ®)
- DeepProbe → **AI Workspace**
- Nav, products, FAQs, demo interests, mock labels, resources, cross-links updated
- Closing CTA: “We will show the relevant Agent Hub product with governance in view.”

## 5. Discrepancies reconciled

- Manifest AI = channel partner, separate company
- Certs: ISO/IEC 42001, ISO 27001, SOC 2 Type I & II — Certified
- 9 modules (Dashboard, Notifications, Search removed from role picker + trust widget)
- Locations: India, UAE, Australia / Pacific, USA (Canada removed)
- Sectors: six existing + Construction, Telco, Medtech; About sector line aligned
- Connectors: full ERP / data / documents lists; “Connectors are scoped per engagement.”
- American English (organization, defense, minimize, etc.)
- Defense anonymity: IAF logo removed from ticker; copy uses “a national defense customer”

## 6. New components

- `works-with-strip.tsx`
- `partners-programs-strip.tsx`
- Existing video system retained (`ProductVideo`, registry, posters)

## 7. Visuals and logos

- Homepage logo ticker: grey + equal height, color on hover; IAF removed
- Works with: 10 connector text chips
- Partners and programs: Manifest, Datec, Upekkha, Amii (text)
- Integrations: grouped chip wall (no vendor logo files yet)
- Certs: text claims (official marks not in repo)

## 8. Video placements

Reusable registry covers all 8 brief categories with poster fallbacks. Most `src: null` until Biswa footage. See `docs/research/missing-assets.md` and `video/registry.ts`.

## 9. Missing assets and approvals

1. Cleared customer names + logos for case studies (October list not confirmed in-repo)
2. Official connector SVGs + ISO/SOC badge artwork
3. Product loop + founder + industry videos
4. Optional `og-home.png`
5. Legal review of Privacy + Terms
6. Agent library: ~20 described agents vs “50+” claim (page notes growth; no fabricated agents)
7. Partner logo files
8. Founder photos / map / 2021 timeline (not invented)

## 10. SEO and routing

- `src/app/robots.ts`, `src/app/sitemap.ts` (canonical routes only)
- Open Graph via `layout.tsx` + `public/og-home.svg`
- Redirects in `next.config.ts`

## 11. QA results

- Final grep: no visitor-facing DeepDelve / STATUS TO CONFIRM / consulting arm / Canada / drafting phrases
- `deepprobe` remains only in redirect/alias paths
- Typecheck: pass

## 12. Remaining launch blockers

1. Biswa: approve customer names/logos for case studies + logo strip alignment
2. Record/publish product videos for registry slots
3. Official cert marks + connector brand assets (usage rights)
4. Legal: Privacy & Terms
5. Close or rephrase 50+ vs catalogue depth once full agent list is provided
6. Optional: PNG OG image; richer About (founders, timeline) when verified

Checklist: `docs/research/content-review-checklist.md`
Missing assets: `docs/research/missing-assets.md`
