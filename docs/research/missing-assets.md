# Missing assets (content review)

Tracked gaps where the site uses text placeholders instead of official brand files. See also `video-asset-inventory.md` and `src/components/sites/v7labs/video/registry.ts`.

## Connector logos

- No official ERP, data platform, or document connector logos are committed under `public/`.
- Homepage Works with strip, `/integrations`, and `/platform` connector sections use grey text chips only.
- Do not add vendor logos until usage rights and connector availability are confirmed per engagement.

## Certification marks

- Security section lists ISO/IEC 42001, ISO 27001, SOC 2 Type I, and SOC 2 Type II as Certified (copy in `security-config.ts`).
- Official certification badge artwork is not in `public/` yet.

## Customer logos and names

- Homepage logo ticker uses committed brand files under `public/sites/zeonai/brands/`; not every mark is cleared for public launch.
- Case studies use sector-level customer descriptors (no Telikom PNG, PMO PNG, Post-Courier, etc.) until Biswa confirms publication.
- Defense references stay at “a national defense customer” — no named defense logos on marketing pages without approval.

## Founder video

- Registry id `about-founder`: poster SVG fallback; replace with on-camera founder footage when ready.

## Product loop footage

All product placements use `ProductVideo` with `src: null` and SVG posters under `public/sites/v7labs/video/posters/` until Biswa recordings land. Priority loops:

| ID | Placement |
|----|-----------|
| `home-hero` | Homepage hero |
| `home-tab-ask-ai` … `home-tab-agent-hub` | Homepage six product tabs |
| `capability-*` | Platform capability pages (click-to-play) |
| `demo-expectations` | `/demo` (ambient placeholder MP4 may ship first) |

Full list: `listMissingVideos()` in `registry.ts`.

## Open Graph

- `public/og-home.svg` is a simple branded placeholder for social sharing.
- Optional PNG variant `public/og-home.png` is not generated yet; some networks prefer PNG.

## Legal pages

- Privacy Policy and Terms need legal review before launch (copy may change).

## Partners and programs strip

- Manifest AI, Datec, Upekkha, and Amii appear as text labels only — no partner logos committed yet.