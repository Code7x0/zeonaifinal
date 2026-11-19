/**
 * Shared chrome offset for sticky page rails (e.g. Technology chips).
 * SiteHeader writes these CSS variables on <html>; consumers only read.
 *
 * --zeon-header-offset: px occupied by the visible main navbar at the top
 *   (in-flow header still intersecting, or floating header shown). Else 0.
 * --zeon-header-height: measured navbar bar height (for layouts that need it).
 */

export const HEADER_OFFSET_VAR = "--zeon-header-offset";
export const HEADER_HEIGHT_VAR = "--zeon-header-height";
export const TECH_CHIPS_HEIGHT_VAR = "--zeon-tech-chips-height";

export function setHeaderChromeOffset(offsetPx: number, heightPx: number) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty(HEADER_OFFSET_VAR, `${Math.max(0, Math.round(offsetPx))}px`);
  root.style.setProperty(HEADER_HEIGHT_VAR, `${Math.max(0, Math.round(heightPx))}px`);
}

export function setTechChipsHeight(heightPx: number) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty(
    TECH_CHIPS_HEIGHT_VAR,
    `${Math.max(0, Math.round(heightPx))}px`,
  );
}

export function clearHeaderChromeOffset() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.removeProperty(HEADER_OFFSET_VAR);
  root.style.removeProperty(HEADER_HEIGHT_VAR);
}
