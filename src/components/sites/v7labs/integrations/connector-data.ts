/**
 * Approved connector inventory for the AI Workspace ecosystem visual.
 * Logos are official Simple Icons SVGs with brand fills when available.
 */

export type ConnectorItem = {
  name: string;
  /** Short label when no logo / for tight tiles */
  shortName?: string;
  logoSrc?: string;
};

export type ConnectorGroup = {
  id: "erp" | "data" | "documents";
  title: string;
  /** Short label for orbital markers */
  shortTitle: string;
  items: readonly ConnectorItem[];
};

const L = (file: string) => `/sites/zeonai/connectors/${file}`;

export const CONNECTOR_GROUPS: readonly ConnectorGroup[] = [
  {
    id: "erp",
    title: "ERP systems",
    shortTitle: "ERP",
    items: [
      { name: "SAP", logoSrc: L("sap.svg") },
      { name: "Oracle", logoSrc: L("oracle.svg") },
      { name: "Dynamics 365", shortName: "Dynamics", logoSrc: L("dynamics365.svg") },
      { name: "NetSuite", shortName: "NetSuite" },
      { name: "Xero", logoSrc: L("xero.svg") },
      { name: "Yardi", shortName: "Yardi" },
      { name: "Pronto", shortName: "Pronto" },
      { name: "TechnologyOne", shortName: "TechOne" },
      { name: "MYOB", logoSrc: L("myob.svg") },
      { name: "Sage", logoSrc: L("sage.svg") },
      { name: "Infor", shortName: "Infor" },
      { name: "Epicor", shortName: "Epicor" },
      { name: "Workday", shortName: "Workday" },
    ],
  },
  {
    id: "data",
    title: "Data platforms",
    shortTitle: "Data",
    items: [
      { name: "Oracle data warehouse", shortName: "Oracle DW", logoSrc: L("oracle.svg") },
      { name: "Snowflake", logoSrc: L("snowflake.svg") },
      { name: "Databricks", logoSrc: L("databricks.svg") },
      { name: "SQL Server", shortName: "SQL Server", logoSrc: L("sqlserver.svg") },
      { name: "PostgreSQL", logoSrc: L("postgresql.svg") },
      { name: "MySQL", logoSrc: L("mysql.svg") },
      { name: "BigQuery", logoSrc: L("bigquery.svg") },
      { name: "Redshift", logoSrc: L("redshift.svg") },
      { name: "Teradata", logoSrc: L("teradata.svg") },
    ],
  },
  {
    id: "documents",
    title: "Documents and collaboration",
    shortTitle: "Docs",
    items: [
      { name: "SharePoint", logoSrc: L("sharepoint.svg") },
      { name: "OneDrive", logoSrc: L("onedrive.svg") },
      { name: "Google Drive", logoSrc: L("googledrive.svg") },
      { name: "Email", shortName: "Email" },
    ],
  },
] as const;

export const CONNECTOR_COUNT = CONNECTOR_GROUPS.reduce(
  (n, g) => n + g.items.length,
  0,
);
