import Image from "next/image";

type ZeonLogoProps = {
  className?: string;
  /** Use on dark backgrounds */
  variant?: "light" | "dark";
  showTagline?: boolean;
};

export function ZeonLogo({
  className = "",
  variant = "dark",
  showTagline = false,
}: ZeonLogoProps) {
  const onDark = variant === "light";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/sites/zeonai/official-mark.png"
        alt=""
        width={112}
        height={116}
        className="h-8 w-auto shrink-0 md:h-9"
        priority
      />
      <span className="flex flex-col justify-center leading-none">
        <span
          className={`text-[17px] font-medium tracking-[-0.03em] md:text-[18px] ${
            onDark ? "text-white" : "text-[var(--zeon-ink)]"
          }`}
        >
          ZeonAI
        </span>
        {showTagline ? (
          <span
            className={`mt-1 hidden text-[10px] tracking-[0.02em] sm:block md:text-[11px] ${
              onDark ? "text-white/55" : "text-[var(--zeon-ink70)]"
            }`}
          >
            Harnessing the power of AI.
          </span>
        ) : null}
      </span>
    </span>
  );
}

/** Official brand lockup for hero / about / trust moments */
export function ZeonBrandBanner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-2xl border border-white/10 bg-[var(--zeon-ink)] px-4 py-3 shadow-[0_20px_60px_rgba(1,15,15,0.18)] md:gap-4 md:px-5 md:py-4 ${className}`}
    >
      <Image
        src="/sites/zeonai/official-mark.png"
        alt=""
        width={112}
        height={116}
        className="h-11 w-auto shrink-0 md:h-14"
      />
      <div className="min-w-0">
        <p className="text-[20px] font-medium tracking-[-0.03em] text-white md:text-[24px]">
          ZeonAI
        </p>
        <p className="mt-1 text-[12px] tracking-[0.04em] text-white/55 md:text-[13px]">
          Harnessing the power of AI.
        </p>
        <div
          className="mt-2.5 h-px w-full max-w-[180px] bg-[linear-gradient(90deg,#0977B3,#20879D,#91C63B,#C78928,#E1661C)]"
          aria-hidden
        />
      </div>
    </div>
  );
}
