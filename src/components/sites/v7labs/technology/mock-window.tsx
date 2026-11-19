import type { ReactNode } from "react";

export function MockWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mock rv">
      <div className="bar">
        <i>
          <b />
        </i>
        {title}
        <em>Sample data</em>
      </div>
      <div className="body">{children}</div>
    </div>
  );
}
