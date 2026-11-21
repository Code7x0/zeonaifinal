"use client";

/**
 * Intentionally empty. A previous version preloaded every product MP4 on every
 * route (`preload="auto"`), which saturated the network and made the site feel
 * slow. Films now load via ProductVideo only when near the viewport.
 */
export function VideoPreload() {
  return null;
}
