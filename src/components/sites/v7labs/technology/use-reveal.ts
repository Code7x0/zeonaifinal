"use client";

import { useEffect, type RefObject } from "react";

/**
 * Reveal `.rv` blocks when they enter the viewport.
 * Resilient to Lenis remounts / late child mounts: MutationObserver +
 * immediate in-view pass so content never stays stuck at opacity: 0.
 */
export function useReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const reveal = (el: Element) => {
      el.classList.add("in");
    };

    const inView = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < vh * 0.94 && rect.bottom > 0;
    };

    let io: IntersectionObserver | null = null;

    const bind = () => {
      io?.disconnect();
      const els = [
        ...root.querySelectorAll<HTMLElement>(".rv:not(.in)"),
      ];

      if (els.length === 0) return;

      if (reduceMotion) {
        els.forEach(reveal);
        return;
      }

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry.target);
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "40px 0px" },
      );

      els.forEach((el) => {
        if (inView(el)) {
          reveal(el);
        } else {
          io?.observe(el);
        }
      });
    };

    bind();

    const mo = new MutationObserver(() => {
      // New `.rv` nodes (or remounted subtrees) need observers.
      bind();
    });
    mo.observe(root, { childList: true, subtree: true });

    const onScrollOrResize = () => {
      root.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach((el) => {
        if (inView(el)) reveal(el);
      });
    };
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    requestAnimationFrame(onScrollOrResize);
    // Failsafe: never leave content invisible after layout settles.
    const failsafe = window.setTimeout(() => {
      root.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach(reveal);
    }, 1800);

    return () => {
      io?.disconnect();
      mo.disconnect();
      window.clearTimeout(failsafe);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [rootRef]);
}
