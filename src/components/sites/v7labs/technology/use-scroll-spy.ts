"use client";

import { useEffect, useState, type RefObject } from "react";

export function useScrollSpy(
  sectionIds: readonly string[],
  chipsRef: RefObject<HTMLElement | null>,
) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = e.target.id;
          setActiveId(id);
          const wrap = chipsRef.current;
          const chip = wrap?.querySelector<HTMLElement>(
            `a[href="#${id}"]`,
          );
          if (wrap && chip) {
            wrap.scrollTo({
              left: chip.offsetLeft - wrap.clientWidth / 2 + chip.clientWidth / 2,
              behavior: reduceMotion ? "auto" : "smooth",
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, [sectionIds, chipsRef]);

  return activeId;
}
