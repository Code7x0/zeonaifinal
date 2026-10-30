/**
 * Shared motion tokens for the ZeonAI site.
 * Prefer opacity + small transforms; never animate layout for decoration.
 *
 * Curves from Emil Kowalski / easing.dev — strong ease-out for entrances,
 * strong ease-in-out for on-screen morphs. Durations skewed longer for
 * marketing reveals; UI feedback stays under ~400ms.
 *
 * Springs follow Apple fluid-interface defaults: critically damped for
 * ordinary UI; slight bounce only for momentum-driven gestures.
 */

/** Strong ease-out — entrances, exits, UI that appears */
export const easeOut = [0.23, 1, 0.32, 1] as const;

/** Strong ease-in-out — content swapping / on-screen movement */
export const easeInOut = [0.77, 0, 0.175, 1] as const;

/** Soft hover / color / underline (CSS-friendly “ease”) */
export const easeHover = [0.25, 0.1, 0.25, 1] as const;

/** Press / micro feedback — Apple: respond on pointer-down */
export const durationFast = 0.1;

/** Hover color, underlines, subtle transforms */
export const durationHover = 0.22;

/** Tabs, menus, crossfades, floating nav */
export const durationUi = 0.32;

/** Content fade-up entrances — short enough to feel authored, not habitual */
export const durationEnter = 0.55;

/** Coordinated section / hero sequences */
export const durationSequence = 0.9;

/** Floating nav slide */
export const durationNav = 0.38;

/** Mega-menu panel materialize */
export const durationMenu = 0.28;

export const staggerFast = 0.08;
export const staggerEnter = 0.1;

/** Keep entrance travel small — avoid floating content */
export const enterY = 12;
export const enterYSoft = 8;

/** Press compression (CSS also uses --zeon-press-scale) */
export const pressScale = 0.97;

export const viewportOnce = { once: true, amount: 0.2 } as const;
export const viewportLoose = { once: true, amount: 0.12 } as const;

/** Critically damped UI spring — menus, sheets, reposition */
export const springUi = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.4,
};

/** Snappier settle for nav / chrome */
export const springNav = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.32,
};

/** Slight under-damped — only after momentum / flick */
export const springMomentum = {
  type: "spring" as const,
  bounce: 0.18,
  duration: 0.4,
};

export const enterTransition = {
  duration: durationEnter,
  ease: easeOut,
} as const;

export const uiTransition = {
  duration: durationUi,
  ease: easeOut,
} as const;

export const pressTransition = {
  duration: durationFast,
  ease: easeOut,
} as const;

export const crossfadeTransition = {
  duration: durationUi,
  ease: easeInOut,
} as const;

export const menuTransition = {
  duration: durationMenu,
  ease: easeOut,
} as const;

export function staggerDelay(index: number, base = 0, step = staggerEnter) {
  return base + index * step;
}
