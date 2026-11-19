const PARTNER_PROGRAMS = [
  "Manifest AI",
  "Datec",
  "Upekkha",
  "Amii",
] as const;

type PartnersProgramsStripProps = {
  /** Slight tone shift for dark homepage sections vs paper About page */
  variant?: "light" | "paper";
};

export function PartnersProgramsStrip({
  variant = "light",
}: PartnersProgramsStripProps) {
  const shell =
    variant === "paper"
      ? "border-y border-[#E9EAEB] bg-white px-5 py-12 md:px-8"
      : "border-y border-[#E9EAEB] bg-[#FAFAFA] px-5 py-10 md:px-8";

  return (
    <section aria-labelledby="partners-programs-heading" className={shell}>
      <div className="mx-auto max-w-[1120px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#717680]">
          Ecosystem
        </p>
        <h2
          id="partners-programs-heading"
          className="mt-2 font-[family-name:var(--font-aeonik)] text-[20px] tracking-[-0.02em] text-[#181D27] md:text-[22px]"
        >
          Partners and programs
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {PARTNER_PROGRAMS.map((name) => (
            <li
              key={name}
              className="zeon-surface list-none px-4 py-3 text-[14px] font-medium text-[#535862]"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}