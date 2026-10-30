import Image from "next/image";

export function V7Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[15px] font-medium tracking-[-0.02em] leading-none ${className}`}
    >
      <Image
        src="/sites/zeonai/mark.png"
        alt=""
        width={112}
        height={116}
        className="h-[1.4em] w-auto shrink-0"
        priority
      />
      <span>ZeonAI</span>
    </span>
  );
}
