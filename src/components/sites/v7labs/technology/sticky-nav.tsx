"use client";

import { forwardRef, useEffect, useRef } from "react";
import { setTechChipsHeight } from "../nav-chrome";

export const TECH_CHIPS = [
  { id: "architecture", label: "00 · architecture" },
  { id: "runtime", label: "01 · agent runtime" },
  { id: "retrieval", label: "02 · retrieval" },
  { id: "memory", label: "03 · memory" },
  { id: "determinism", label: "04 · ai-assisted determinism" },
  { id: "router", label: "05 · model router" },
  { id: "tokens", label: "06 · token economics" },
  { id: "security", label: "07 · agent security" },
  { id: "sovereign", label: "08 · sovereign deployment" },
  { id: "connectors", label: "09 · connectors" },
  { id: "evaluation", label: "10 · agent evaluation" },
  { id: "rules", label: "11 · rule builder" },
] as const;

export const TECH_SECTION_IDS = TECH_CHIPS.map((c) => c.id);

export const StickyNav = forwardRef<
  HTMLDivElement,
  { activeId: string }
>(function StickyNav({ activeId }, ref) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const publish = () => {
      const h = nav.getBoundingClientRect().height;
      if (h > 0) setTechChipsHeight(h);
    };

    publish();
    const ro = new ResizeObserver(() => publish());
    ro.observe(nav);
    return () => {
      ro.disconnect();
      setTechChipsHeight(0);
    };
  }, []);

  return (
    <nav ref={navRef} className="chips" aria-label="On this page">
      <div className="wrap" ref={ref}>
        {TECH_CHIPS.map((chip) => (
          <a
            key={chip.id}
            href={`#${chip.id}`}
            className={activeId === chip.id ? "on" : undefined}
          >
            {chip.label}
          </a>
        ))}
      </div>
    </nav>
  );
});
