import { integrations } from "./content";

export function Integrations() {
  return (
    <section className="border-t border-[var(--zeon-line)] bg-[var(--zeon-mist)]/30 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--zeon-fog)]">
          Integrations
        </p>
        <h2 className="mt-3 max-w-[18ch] text-[36px] leading-[1.08] tracking-[-0.035em] text-[var(--zeon-ink)] md:text-[52px]">
          Connects to the systems you already run
        </h2>
        <p className="mt-5 max-w-[50ch] text-[17px] leading-[1.55] text-[var(--zeon-ink70)] md:text-[18px]">
          Results go where the work happens — dashboards, exports, or your ERP
          through a connector. The connection you need is scoped in the demo.
        </p>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {integrations.map((name) => (
            <li
              key={name}
              className="flex min-h-[72px] items-center justify-center rounded-xl border border-[var(--zeon-line)] bg-white px-4 text-center text-[15px] tracking-[-0.01em] text-[var(--zeon-ink)] shadow-[var(--zeon-elev-1)] transition-all duration-200 hover:border-[var(--zeon-royal)]/30 hover:shadow-[var(--zeon-elev-2)] md:min-h-[88px] md:text-[16px]"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
