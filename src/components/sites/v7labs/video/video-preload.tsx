"use client";

import { useEffect } from "react";
import { PRODUCT_FILM_PATHS } from "./product-films";

/**
 * Warm the browser cache for product films so slots open on a real frame,
 * not an empty chrome flash.
 */
export function VideoPreload() {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    const videos: HTMLVideoElement[] = [];

    for (const href of PRODUCT_FILM_PATHS) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = href;
      link.type = "video/mp4";
      document.head.appendChild(link);
      links.push(link);

      const v = document.createElement("video");
      v.muted = true;
      v.playsInline = true;
      v.preload = "auto";
      v.setAttribute("playsinline", "");
      v.src = href;
      void v.load();
      videos.push(v);
    }

    return () => {
      for (const link of links) link.remove();
      for (const v of videos) {
        v.removeAttribute("src");
        v.load();
      }
    };
  }, []);

  return null;
}
