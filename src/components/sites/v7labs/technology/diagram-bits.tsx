import type { CSSProperties, ReactNode } from "react";

export function Dia({
  links,
  label,
  children,
  style,
}: {
  links: string;
  label: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="dia rv" data-links={links} style={style}>
      <div className="lbl">{label}</div>
      {children}
    </div>
  );
}

export function Nd({
  n,
  icon,
  title,
  sub,
  variant,
  className = "",
}: {
  n: string;
  icon?: ReactNode;
  title: string;
  sub?: ReactNode;
  variant?: "k" | "b" | "sm";
  className?: string;
}) {
  const cls = ["nd", variant, className].filter(Boolean).join(" ");
  return (
    <div className={cls} data-n={n}>
      {icon ? <span className="ic">{icon}</span> : null}
      <b>{title}</b>
      {sub ? <span>{sub}</span> : null}
    </div>
  );
}

export function Keys({
  items,
  k3,
}: {
  items: { title: string; body: string }[];
  k3?: boolean;
}) {
  return (
    <div className={`keys rv${k3 ? " k3" : ""}`}>
      {items.map((item) => (
        <div key={item.title}>
          <b>{item.title}</b>
          <span>{item.body}</span>
        </div>
      ))}
    </div>
  );
}

export function Ic({ children }: { children: ReactNode }) {
  return <span className="ic">{children}</span>;
}
