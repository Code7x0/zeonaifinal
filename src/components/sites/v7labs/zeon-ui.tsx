import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type BtnTone =
  | "ink"
  | "soft"
  | "accent"
  | "light"
  | "ghost"
  | "ghost-dark";

type BtnSize = "sm" | "md" | "lg";

const toneClass: Record<BtnTone, string> = {
  ink: "zeon-btn-ink",
  soft: "zeon-btn-soft",
  accent: "zeon-btn-accent",
  light: "zeon-btn-light",
  ghost: "zeon-btn-ghost",
  "ghost-dark": "zeon-btn-ghost-dark",
};

const sizeClass: Record<BtnSize, string> = {
  sm: "zeon-btn-sm",
  md: "",
  lg: "zeon-btn-lg",
};

type ZeonButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: BtnTone;
  size?: BtnSize;
  block?: boolean;
  arrow?: boolean;
  children: ReactNode;
};

export function ZeonButton({
  tone = "ink",
  size = "md",
  block = false,
  arrow = false,
  className,
  children,
  type = "button",
  ...props
}: ZeonButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "zeon-btn",
        toneClass[tone],
        sizeClass[size],
        block && "zeon-btn-block",
        className,
      )}
      {...props}
    >
      {children}
      {arrow ? <span className="zeon-btn-arrow" aria-hidden>→</span> : null}
    </button>
  );
}

type ZeonLinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  tone?: BtnTone;
  size?: BtnSize;
  block?: boolean;
  arrow?: boolean;
  children: ReactNode;
};

export function ZeonLinkButton({
  tone = "ink",
  size = "md",
  block = false,
  arrow = false,
  className,
  children,
  ...props
}: ZeonLinkButtonProps) {
  return (
    <a
      className={cn(
        "zeon-btn",
        toneClass[tone],
        sizeClass[size],
        block && "zeon-btn-block",
        className,
      )}
      {...props}
    >
      {children}
      {arrow ? <span className="zeon-btn-arrow" aria-hidden>→</span> : null}
    </a>
  );
}

type ZeonTextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  arrow?: boolean;
  children: ReactNode;
};

export function ZeonTextLink({
  arrow = true,
  className,
  children,
  ...props
}: ZeonTextLinkProps) {
  return (
    <a className={cn(arrow ? "zeon-link-arrow" : "zeon-link", className)} {...props}>
      {children}
      {arrow ? <span aria-hidden>→</span> : null}
    </a>
  );
}

type SurfaceVariant = "default" | "quiet" | "glass" | "interactive";

const surfaceClass: Record<SurfaceVariant, string> = {
  default: "zeon-surface",
  quiet: "zeon-surface-quiet",
  glass: "zeon-surface-glass",
  interactive: "zeon-surface-interactive",
};

type ZeonSurfaceProps = {
  as?: "div" | "article" | "li" | "section";
  variant?: SurfaceVariant;
  className?: string;
  children: ReactNode;
};

export function ZeonSurface({
  as: Tag = "div",
  variant = "default",
  className,
  children,
}: ZeonSurfaceProps) {
  return (
    <Tag className={cn(surfaceClass[variant], className)}>{children}</Tag>
  );
}

type ZeonSurfaceLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function ZeonSurfaceLink({
  className,
  children,
  ...props
}: ZeonSurfaceLinkProps) {
  return (
    <a className={cn("zeon-surface-interactive", className)} {...props}>
      {children}
    </a>
  );
}
