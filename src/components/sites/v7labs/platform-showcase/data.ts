export type UseCaseId =
  | "ask-ai"
  | "ai-drive"
  | "workflows"
  | "dashboards"
  | "contracts"
  | "opportunity"
  | "quotes"
  | "app-hub"
  | "agent-hub";

export type UseCase = {
  id: UseCaseId;
  index: string;
  title: string;
  description: string;
  module: string;
  breadcrumb: string[];
};

export const USE_CASES: UseCase[] = [
  {
    id: "ask-ai",
    index: "01",
    title: "Ask AI",
    description:
      "Persona-aware answers from your documents, with citations and access-aware filtering.",
    module: "Ask AI",
    breadcrumb: ["ZeonAI", "Workspace", "Ask AI"],
  },
  {
    id: "ai-drive",
    index: "02",
    title: "AI Drive",
    description:
      "Governed documents with versions, lineage, indexing, and role-based permissions.",
    module: "AI Drive",
    breadcrumb: ["ZeonAI", "Workspace", "AI Drive"],
  },
  {
    id: "workflows",
    index: "03",
    title: "Workflows",
    description:
      "Steps, approvals, and an audit trail — agents and people working together.",
    module: "Workflows",
    breadcrumb: ["ZeonAI", "Workspace", "Workflows"],
  },
  {
    id: "dashboards",
    index: "04",
    title: "AI Dashboards",
    description:
      "Operational analytics built from Excel and database sources your teams already trust.",
    module: "AI Dashboards",
    breadcrumb: ["ZeonAI", "Workspace", "AI Dashboards"],
  },
  {
    id: "contracts",
    index: "05",
    title: "Contract Intelligence",
    description:
      "Clauses read, key terms extracted, and risks flagged for human review.",
    module: "Contract Intelligence",
    breadcrumb: ["ZeonAI", "Workspace", "Contracts"],
  },
  {
    id: "opportunity",
    index: "06",
    title: "Opportunity Management",
    description:
      "Opportunities surfaced, qualified, and moved through a governed pipeline.",
    module: "Opportunity Management",
    breadcrumb: ["ZeonAI", "Workspace", "Opportunities"],
  },
  {
    id: "quotes",
    index: "07",
    title: "Quote Management",
    description:
      "Quotes assembled from your library and routed for pricing approval.",
    module: "Quote Management",
    breadcrumb: ["ZeonAI", "Workspace", "Quotes"],
  },
  {
    id: "app-hub",
    index: "08",
    title: "App Hub",
    description:
      "Intelligent apps, shown only for the roles that may use them.",
    module: "App Hub",
    breadcrumb: ["ZeonAI", "Workspace", "App Hub"],
  },
  {
    id: "agent-hub",
    index: "09",
    title: "Agent Hub",
    description:
      "Agents grouped by function, each running a workflow of sub-agents.",
    module: "Agent Hub",
    breadcrumb: ["ZeonAI", "Workspace", "Agent Hub"],
  },
];

export const ZEON_BLUE = "#0977B3";
export const ZEON_TEAL = "#20879D";

export const DASHBOARD_VOLUME = [
  { label: "Mon", processed: 1860, completed: 1740 },
  { label: "Tue", processed: 2120, completed: 2010 },
  { label: "Wed", processed: 1980, completed: 1880 },
  { label: "Thu", processed: 2380, completed: 2260 },
  { label: "Fri", processed: 2240, completed: 2140 },
  { label: "Sat", processed: 1680, completed: 1590 },
  { label: "Sun", processed: 1520, completed: 1440 },
] as const;

export const DASHBOARD_VOLUME_30D = [
  { label: "W1", processed: 8420, completed: 7980 },
  { label: "W2", processed: 9100, completed: 8720 },
  { label: "W3", processed: 8760, completed: 8410 },
  { label: "W4", processed: 9640, completed: 9210 },
] as const;
