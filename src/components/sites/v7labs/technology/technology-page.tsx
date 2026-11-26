"use client";

import { useEffect, useRef } from "react";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { SmoothScroll } from "../smooth-scroll";
import { useAutoCardReveals } from "../motion/scroll-reveal";
import { ArchitectureSection } from "./architecture-section";
import { NotesAndCta } from "./notes-cta";
import { Pillars } from "./pillars";
import { StickyNav, TECH_SECTION_IDS } from "./sticky-nav";
import { useDiagramWires } from "./use-diagram-wires";
import { useReveal } from "./use-reveal";
import { useScrollSpy } from "./use-scroll-spy";
import "./technology.css";

const FACTS = [
  {
    title: "Built in-house",
    body: "Our own agent runtime. No vendor agent framework underneath.",
  },
  {
    title: "Cited to the source",
    body: "Every claim in an answer links to the passage it came from.",
  },
  {
    title: "Deterministic by design",
    body: "Models interpret; fixed rules and code execute. Same input, same result.",
  },
  {
    title: "Air-gap ready",
    body: "Runs where there is no route to the internet at all.",
  },
] as const;

export function TechnologyPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const activeId = useScrollSpy(TECH_SECTION_IDS, chipsRef);
  useReveal(rootRef);
  useAutoCardReveals(rootRef, ".layer, .pillar .points > div");
  useDiagramWires(rootRef);

  useEffect(() => {
    // Honour deep links after hydration (Lenis / client nav).
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    });
  }, []);

  return (
    <SmoothScroll>
      <div className="v7-site min-h-screen bg-white text-[#181D27]">
        <SiteHeader />
        <main>
          <div className="zeon-tech" ref={rootRef}>
            <section className="hero">
              <div className="wrap">
                <span className="mono">Technology</span>
                <h1>The engineering behind governed autonomy.</h1>
                <p className="lede">
                  Agents are easy to demo and hard to trust. These are the
                  systems we built in-house so that an agent&apos;s work can be
                  checked, repeated and kept inside your boundary.
                </p>
                <div className="facts">
                  {FACTS.map((fact) => (
                    <div key={fact.title}>
                      <b>{fact.title}</b>
                      <span>{fact.body}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <StickyNav ref={chipsRef} activeId={activeId} />
            <ArchitectureSection />
            <Pillars />
            <NotesAndCta />
          </div>
        </main>
        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}
