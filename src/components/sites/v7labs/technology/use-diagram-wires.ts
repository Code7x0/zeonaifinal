"use client";

import { useEffect, type RefObject } from "react";

/** Port of zeonai-technology-v2.html wire() — curved SVG connectors between data-n nodes. */
export function useDiagramWires(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rootEl = root;
    const dias =
      rootEl.matches?.(".dia[data-links]") === true
        ? [rootEl]
        : [...rootEl.querySelectorAll<HTMLElement>(".dia[data-links]")];

    function wire(d: HTMLElement) {
      let svg = d.querySelector<SVGSVGElement>("svg.wires");
      if (!svg) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "wires");
        svg.setAttribute("aria-hidden", "true");
        d.appendChild(svg);
      }

      const R = d.getBoundingClientRect();
      const get = (id: string) =>
        d.querySelector<HTMLElement>(`[data-n="${id}"]`);
      const seen = new Set<string>();
      let lines = "";
      let ports = "";

      d.dataset.links?.split(",").forEach((l) => {
        const [a, b] = l.split(">");
        if (!a || !b) return;
        const A = get(a);
        const B = get(b);
        if (!A || !B) return;

        let ra = A.getBoundingClientRect();
        let rb = B.getBoundingClientRect();
        let x1: number;
        let y1: number;
        let x2: number;
        let y2: number;
        let p: string;

        if (rb.left >= ra.right - 2) {
          x1 = ra.right - R.left;
          y1 = ra.top + ra.height / 2 - R.top;
          x2 = rb.left - R.left;
          y2 = rb.top + rb.height / 2 - R.top;
          const c = (x2 - x1) / 2;
          p = `M${x1} ${y1}C${x1 + c} ${y1},${x2 - c} ${y2},${x2} ${y2}`;
        } else {
          const ga =
            (A.closest(".stk, .gates") as HTMLElement | null) || A;
          const gb =
            (B.closest(".stk, .gates") as HTMLElement | null) || B;
          if (ga === gb) return;
          ra = ga.getBoundingClientRect();
          rb = gb.getBoundingClientRect();
          x1 = ra.left + ra.width / 2 - R.left;
          y1 = ra.bottom - R.top;
          x2 = rb.left + rb.width / 2 - R.left;
          y2 = rb.top - R.top;
          const c = (y2 - y1) / 2;
          p = `M${x1} ${y1}C${x1} ${y1 + c},${x2} ${y2 - c},${x2} ${y2}`;
        }

        const k = [x1, y1, x2, y2].map(Math.round).join();
        if (seen.has(k)) return;
        seen.add(k);
        lines += `<path class="w0" d="${p}"/><path class="w1" d="${p}"/>`;
        if (Math.hypot(x2 - x1, y2 - y1) > 26) {
          ports += `<circle class="p0" cx="${x1}" cy="${y1}" r="2.5"/><circle class="p1" cx="${x2}" cy="${y2}" r="3.5"/>`;
        }
      });

      svg.innerHTML = lines + ports;
    }

    const redraw = () => dias.forEach(wire);
    redraw();

    const ro = new ResizeObserver((entries) => {
      entries.forEach((e) => wire(e.target as HTMLElement));
    });
    dias.forEach((d) => ro.observe(d));

    const onLoad = () => redraw();
    window.addEventListener("load", onLoad);
    const fontsReady = document.fonts?.ready?.then(redraw);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", onLoad);
      void fontsReady;
    };
  }, [rootRef]);
}
