import { processSteps } from "./content";

export function Process() {
  return (
    <section className="border-t border-[var(--zeon-line)] bg-[var(--zeon-mist)]/35 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--zeon-fog)]">
          How we work
        </p>
        <h2 className="mt-3 max-w-[16ch] text-[36px] leading-[1.08] tracking-[-0.035em] text-[var(--zeon-ink)] md:text-[52px]">
          Rapid idea to execution
        </h2>
        <p className="mt-5 max-w-[48ch] text-[17px] leading-[1.55] text-[var(--zeon-ink70)] md:text-[18px]">
          Three steps, in order, with the people who will use it in the room.
          First value in weeks, then scale on the same platform.
        </p>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {processSteps.map((step) => (
            <li
              key={step.id}
              className="rounded-2xl border border-[var(--zeon-line)] bg-white p-6 md:p-7"
            >
              <p className="font-mono text-[12px] text-[var(--zeon-fog)]">
                {step.id}
              </p>
              <h3 className="mt-3 text-[24px] tracking-[-0.03em] text-[var(--zeon-ink)] md:text-[28px]">
                {step.title}
              </h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--zeon-blue)]">
                {step.timing}
              </p>
              <p className="mt-4 text-[15px] leading-[1.55] text-[var(--zeon-ink70)] md:text-[16px]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
