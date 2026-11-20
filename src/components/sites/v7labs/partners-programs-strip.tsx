import Image from "next/image";

const PARTNER_PROGRAMS = [
  {
    name: "Manifest AI",
    src: "/sites/v7labs/partners/manifest-ai.png",
    width: 128,
    height: 128,
    markClass: "h-6 w-6",
    showName: true,
  },
  {
    name: "Datec",
    src: "/sites/v7labs/partners/datec.png",
    width: 280,
    height: 60,
    markClass: "h-5 w-auto max-w-[108px]",
    showName: false,
  },
  {
    name: "Upekkha",
    src: "/sites/v7labs/partners/upekkha.png",
    width: 280,
    height: 72,
    markClass: "h-5 w-auto max-w-[120px]",
    showName: false,
  },
  {
    name: "Amii",
    src: "/sites/v7labs/partners/amii.png",
    width: 160,
    height: 160,
    markClass: "h-6 w-6",
    showName: true,
  },
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
          {PARTNER_PROGRAMS.map((partner) => (
            <li
              key={partner.name}
              className="zeon-surface flex list-none items-center gap-2.5 px-5 py-3.5"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className={`object-contain ${partner.markClass}`}
              />
              {partner.showName ? (
                <span aria-hidden className="text-[14px] font-medium text-[#535862]">
                  {partner.name}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
