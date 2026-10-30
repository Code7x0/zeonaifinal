import { solutions } from "./content";

export function Solutions() {
  return (
    <section
      id="solutions"
      className="border-t border-[var(--zeon-line)] bg-[var(--zeon-paper)] px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--zeon-fog)]">
          Solutions
        </p>
        <h2 className="mt-3 max-w-[18ch] text-[36px] leading-[1.08] tracking-[-0.035em] text-[var(--zeon-ink)] md:text-[52px]">
          Our business solutions
        </h2>
        <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.55] text-[var(--zeon-ink70)] md:text-[18px]">
          DeepDelve® products for invoices, cash-flow underwriting, document
          intelligence and governed enterprise search — on the same AI Workspace
          foundation.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {solutions.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group rounded-2xl border border-[var(--zeon-line)] bg-[var(--zeon-mist)]/30 p-6 no-underline transition-colors hover:border-[var(--zeon-ink)] md:p-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--zeon-blue)]">
                {item.brand}
              </p>
              <h3 className="mt-3 text-[22px] leading-[1.2] tracking-[-0.025em] text-[var(--zeon-ink)] md:text-[26px]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-[var(--zeon-ink70)] md:text-[16px]">
                {item.body}
              </p>
              <p className="mt-5 text-[14px] text-[var(--zeon-ink)] group-hover:underline">
                Read more →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
