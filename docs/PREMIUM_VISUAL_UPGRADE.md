# Premium visual upgrade — decisions

## Navigation hover (chosen)

**Option A — near-black (`#111318`) with white label**

| State | Treatment |
| --- | --- |
| Default | Quiet grey text on glass |
| Hover | Near-black pill, white text |
| Open / active | Near-black + inset royal-blue ring |
| Focus | Existing `--zeon-focus-ring` |
| Mega items | Sky wash + blue border; title tips toward royal |

**Why not slate:** On a bright glass header, slate felt muddy and competed with the blue accent. Near-black reads architectural, contrasts cleanly with the light mega panel, and leaves royal blue for selection cues.

## Palette (refined)

| Role | Value |
| --- | --- |
| Royal | `#245BDB` |
| Royal deep | `#1D4ED8` |
| Accent | `#356DFF` |
| Electric | `#3B82F6` |
| Navy | `#0B1F4B` |
| Midnight | `#070B14` |
| Sky | `#EEF2FF` |
| Cream / paper | `#F6F4EF` / `#FFFFFF` |

Chapter tones for supporting pages: `ink`, `midnight`, `royal`, `blue`, `sky`, `cream`, `paper`, `mist`.

## Motion

- **Anime.js:** architecture layer reveal + connection stroke draw (`ArchitectureFlow`).
- **Matter.js:** integrations hub springs (`IntegrationPhysics`); static fallback for reduced-motion.
- **Motion (existing):** nav, FadeUp, homepage — unchanged stack where already correct.

## Skills note

Taste + Emil design-eng consulted. UI/UX Pro Max, Impeccable, Hallmark were not installed locally — not invented.
