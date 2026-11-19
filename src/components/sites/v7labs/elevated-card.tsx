"use client";

import type {
  AnchorHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { usePointerTilt } from "./use-pointer-tilt";

type Material = "solid" | "ink" | "brand" | "glass";

const materialClass: Record<Material, string> = {
  solid: "zeon-surface",
  ink: "zeon-surface-ink",
  brand: "zeon-surface-brand",
  glass: "zeon-surface-glass",
};

type ElevatedCardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li" | "section" | "figure";
  material?: Material;
  /** Interactive lift on hover (for clickable cards that are not links) */
  interactive?: boolean;
  /** Pointer tilt — only on large visual cards */
  tilt?: boolean;
  tiltMax?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Solid elevated card by default. Glass only when material="glass".
 * Tilt is opt-in and disabled on touch / reduced-motion.
 */
export function ElevatedCard({
  as: Tag = "div",
  material = "solid",
  interactive = false,
  tilt = false,
  tiltMax = 5,
  className,
  style,
  children,
  ...rest
}: ElevatedCardProps) {
  const tiltApi = usePointerTilt({ maxDeg: tiltMax, enabled: tilt });

  return (
    <Tag
      ref={tiltApi.ref as never}
      className={cn(
        interactive ? "zeon-surface-interactive" : materialClass[material],
        tiltApi.className,
        className,
      )}
      style={{ ...style, ...tiltApi.style }}
      onPointerMove={tiltApi.onPointerMove}
      onPointerLeave={tiltApi.onPointerLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type ElevatedCardLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  material?: Exclude<Material, "glass">;
  tilt?: boolean;
  tiltMax?: number;
  children: ReactNode;
};

export function ElevatedCardLink({
  material = "solid",
  tilt = false,
  tiltMax = 4,
  className,
  style,
  children,
  ...props
}: ElevatedCardLinkProps) {
  const tiltApi = usePointerTilt({ maxDeg: tiltMax, enabled: tilt });

  return (
    <a
      ref={tiltApi.ref as never}
      className={cn(
        material === "solid"
          ? "zeon-surface-interactive"
          : materialClass[material],
        material !== "solid" && "zeon-lift block no-underline",
        tiltApi.className,
        className,
      )}
      style={{ ...style, ...tiltApi.style }}
      onPointerMove={tiltApi.onPointerMove}
      onPointerLeave={tiltApi.onPointerLeave}
      {...props}
    >
      {children}
    </a>
  );
}
