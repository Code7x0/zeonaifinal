import Link from "next/link";
import { integrationGroups } from "@/components/sites/zeonai/content";
/** ERP, data platforms, and documents — text chips only (no vendor logos yet). */
const WORKS_WITH_NAMES = [
  integrationGroups[0].items[0], // SAP
  integrationGroups[0].items[1], // Oracle
  integrationGroups[0].items[2], // Microsoft Dynamics 365
  integrationGroups[0].items[4], // Xero
  integrationGroups[0].items[7], // Workday
  integrationGroups[1].items[1], // Snowflake
  integrationGroups[1].items[2], // Databricks
  integrationGroups[1].items[4], // SQL Server
  integrationGroups[2].items[0], // Microsoft 365
  integrationGroups[2].items[1], // SharePoint
] as const;

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
          {WORKS_WITH_NAMES.map((name) => (
            <li
              key={name}
              className="zeon-surface list-none px-4 py-3 text-center text-[14px] font-medium text-[#535862]"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}