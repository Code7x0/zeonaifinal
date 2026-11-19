# ZeonAI elevation + glass design system

Brand palette unchanged (bright blue + dark navy). Materials only.

## Three materials

1. **Solid elevated** (`zeon-surface`, `zeon-surface-interactive`, `zeon-surface-quiet`) — most cards, readable content.
2. **Frosted glass** (`zeon-glass-nav`, `zeon-glass-panel`, `zeon-glass-float`, `zeon-surface-glass`) — nav, mega-menu, selected floating panels, product tab chrome.
3. **Ink / brand** (`zeon-surface-ink`, `zeon-surface-brand`, `zeon-window-ink`) — contrast panels and case-study tiles.

## Elevation tokens

| Level | Token | Use |
|-------|--------|-----|
| 0 | `--zeon-elev-0` | Page canvas |
| 1 | `--zeon-elev-1` | Standard cards |
| 2 | `--zeon-elev-2` | Interactive / hover |
| 3 | `--zeon-elev-3` | Floating panels, product windows |
| 4 | `--zeon-elev-4` | Modals / hero product |

Each level stacks contact + ambient + brand-tinted shadows. Surfaces add a 1px top highlight via `::after`.

## Components

- CSS utilities in `src/app/globals.css`
- `ZeonSurface` / `ZeonWindow` in `zeon-ui.tsx`
- `ElevatedCard` / `ElevatedCardLink` + `usePointerTilt` for opt-in tilt
- Buttons: primary elevation + hover lift + press settle
- Browser frames: `zeon-window` + optional tilt (`ProductVideo tilt`)

## Motion rules

- Hover lift ~2–4px (`--zeon-hover-lift`)
- Spring-like ease `--zeon-ease-spring`
- Tilt disabled on coarse pointers + `prefers-reduced-motion`
- Glass falls back to opaque white without `backdrop-filter`
