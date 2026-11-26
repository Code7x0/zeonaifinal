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
      className="border-t border-[#E9EAEB] bg-[#FAFAFA] px-4 py-12 sm:px-6 md:px-[var(--zeon-gutter,1.25rem)] md:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="works-with-heading"
              className="font-[family-name:var(--font-aeonik)] text-[22px] leading-[1.25] tracking-[-0.02em] text-[#181D27] md:text-[26px]"
            >
              Integrates with the systems your business already uses
            </h2>
            <p className="mt-2 max-w-[38rem] text-[14px] leading-[1.55] text-[#535862]">
              Connectors are scoped per engagement. These are common systems of
              record we connect to AI Workspace.
            </p>
          </div>
          <Link
            href="/integrations"
            className="zeon-link-arrow shrink-0 text-[13px]"
          >
            Full integration catalogue
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-8 sm:grid-cols-5 lg:flex lg:items-center lg:justify-between lg:gap-6">
          {WORKS_WITH.map((item) => {
            const isWordmark = item.name === "TechnologyOne";
            return (
              <li
                key={item.name}
                className="flex h-11 list-none items-center justify-center"
                title={item.name}
              >
                {item.logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element -- static brand SVGs from /public
                  <img
                    src={item.logoSrc}
                    alt={item.name}
                    width={140}
                    height={40}
                    className={`w-auto object-contain ${
                      isWordmark
                        ? "h-6 max-w-[124px] md:h-7 md:max-w-[132px]"
                        : "h-9 max-w-[104px] md:h-10 md:max-w-[116px]"
                    }`}
                    draggable={false}
                  />
                ) : (
                  <span className="text-center text-[15px] font-medium text-[#535862]">
                    {item.shortName ?? item.name}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
