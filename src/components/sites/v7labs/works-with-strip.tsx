import Link from "next/link";
import {
  CONNECTOR_GROUPS,
  type ConnectorItem,
} from "./integrations/connector-data";

const byName = (name: string): ConnectorItem | undefined => {
  for (const group of CONNECTOR_GROUPS) {
    const hit = group.items.find((item) => item.name === name);
    if (hit) return hit;
  }
  return undefined;
};

/** Homepage strip — matches visible inventory with cleared connector marks. */
const WORKS_WITH: ConnectorItem[] = [
  byName("SAP"),
  byName("Oracle"),
  byName("Dynamics 365"),
  byName("Xero"),
  byName("TechnologyOne"),
  byName("Snowflake"),
  byName("Databricks"),
  byName("PostgreSQL"),
  byName("SharePoint"),
  byName("OneDrive"),
].filter((item): item is ConnectorItem => Boolean(item));

export function WorksWithStrip() {
  return (
    <section
      aria-labelledby="works-with-heading"
      className="border-t border-[#E9EAEB] bg-[#FAFAFA] px-5 py-12 md:px-8"
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#717680]">
              Integrations
            </p>
            <h2
              id="works-with-heading"
              className="mt-2 font-[family-name:var(--font-aeonik)] text-[22px] tracking-[-0.02em] text-[#181D27] md:text-[26px]"
            >
              Works with
            </h2>
            <p className="mt-2 max-w-[36rem] text-[14px] leading-[1.5] text-[#535862]">
              Connectors are scoped per engagement. These are common systems of
              record we connect to AI Workspace.
            </p>
          </div>
          <Link href="/integrations" className="zeon-link-arrow shrink-0 text-[13px]">
            Full integration catalogue
          </Link>
        </div>
        <ul className="mt-8 flex flex-wrap gap-3">
          {WORKS_WITH.map((item) => (
            <li key={item.name} className="list-none" title={item.name}>
              <div className="zeon-surface flex h-14 min-w-[7.5rem] items-center justify-center gap-2.5 rounded-[12px] px-4 py-3">
                {item.logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element -- static brand SVGs from /public
                  <img
                    src={item.logoSrc}
                    alt=""
                    width={120}
                    height={28}
                    className="h-7 w-auto max-w-[7.5rem] object-contain"
                    draggable={false}
                  />
                ) : (
                  <span className="text-[14px] font-medium text-[#535862]">
                    {item.shortName ?? item.name}
                  </span>
                )}
                <span className="sr-only">{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
