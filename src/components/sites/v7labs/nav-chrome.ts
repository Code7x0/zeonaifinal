/**
 * Shared chrome offset for sticky page rails (e.g. Technology chips).
 * SiteHeader writes these CSS variables on <html>; consumers only read.
 *
 * Values are memoized so scroll ticks never trigger redundant root-level
 * style recalculations when the header offset has not changed.
 */

export const HEADER_OFFSET_VAR = "--zeon-header-offset";
export const HEADER_HEIGHT_VAR = "--zeon-header-height";
export const TECH_CHIPS_HEIGHT_VAR = "--zeon-tech-chips-height";

let lastOffsetPx = -1;
let lastHeightPx = -1;
let lastChipsPx = -1;

export function setHeaderChromeOffset(offsetPx: number, heightPx: number) {
  if (typeof document === "undefined") return;
  const nextOffset = Math.max(0, Math.round(offsetPx));
  const nextHeight = Math.max(0, Math.round(heightPx));
  const root = document.documentElement;
  if (nextOffset !== lastOffsetPx) {
    lastOffsetPx = nextOffset;
    root.style.setProperty(HEADER_OFFSET_VAR, `${nextOffset}px`);
  }
  if (nextHeight !== lastHeightPx) {
    lastHeightPx = nextHeight;
    root.style.setProperty(HEADER_HEIGHT_VAR, `${nextHeight}px`);
  }
}

export function setTechChipsHeight(heightPx: number) {
  if (typeof document === "undefined") return;
  const nextChips = Math.max(0, Math.round(heightPx));
  if (nextChips === lastChipsPx) return;
  lastChipsPx = nextChips;
  document.documentElement.style.setProperty(
    TECH_CHIPS_HEIGHT_VAR,
    `${nextChips}px`,
  );
}

export function clearHeaderChromeOffset() {
  if (typeof document === "undefined") return;
  lastOffsetPx = -1;
  lastHeightPx = -1;
  const root = document.documentElement;
  root.style.removeProperty(HEADER_OFFSET_VAR);
  root.style.removeProperty(HEADER_HEIGHT_VAR);
}
