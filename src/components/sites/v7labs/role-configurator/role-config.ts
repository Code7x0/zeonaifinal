/**
 * Single source of truth for the "Who are you?" section.
 * Module ids match the fixed 9-box grid.
 */

export const MODULE_IDS = [
  "Ask AI",
  "AI Drive",
  "Workflows",
  "Agent Hub",
  "AI Dashboards",
  "Contract Intelligence",
  "App Hub",
  "Quote Management",
  "Opportunity Management",
] as const;

export type ModuleId = (typeof MODULE_IDS)[number];

export type RoleConfig = {
  slug: string;
  label: string;
  modules: readonly ModuleId[];
  agents: readonly string[];
};

export const ROLE_CONFIG: readonly RoleConfig[] = [
  {
    slug: "finance",
    label: "Finance manager",
    modules: [
      "Ask AI",
      "AI Drive",
      "Workflows",
      "Agent Hub",
      "AI Dashboards",
      "Quote Management",
    ],
    agents: [
      "InvoiceAI",
      "Bank and ERP reconciliation",
      "Budget variance review",
    ],
  },
  {
    slug: "legal",
    label: "Legal and contracts lead",
    modules: [
      "Ask AI",
      "AI Drive",
      "Contract Intelligence",
      "Workflows",
      "Agent Hub",
      "App Hub",
    ],
    agents: ["Contract analysis"],
  },
  {
    slug: "procurement",
    label: "Procurement and tenders lead",
    modules: [
      "Ask AI",
      "AI Drive",
      "Workflows",
      "Quote Management",
      "Opportunity Management",
      "Agent Hub",
    ],
    agents: ["Invoice 3-way match"],
  },
  {
    slug: "compliance",
    label: "Compliance and KYC officer",
    modules: [
      "Ask AI",
      "AI Drive",
      "Workflows",
      "Agent Hub",
      "Contract Intelligence",
      "AI Dashboards",
    ],
    agents: ["KYC intelligence"],
  },
  {
    slug: "ops",
    label: "Operations head",
    modules: [
      "Ask AI",
      "Workflows",
      "AI Dashboards",
      "Agent Hub",
      "Opportunity Management",
      "App Hub",
    ],
    agents: ["Knowledge discovery"],
  },
  {
    slug: "credit",
    label: "Credit analyst",
    modules: [
      "Ask AI",
      "AI Drive",
      "Workflows",
      "Agent Hub",
      "AI Dashboards",
      "Contract Intelligence",
    ],
    agents: ["Loan origination", "KYC intelligence"],
  },
] as const;

export function roleIndexFromSlug(slug: string | null | undefined): number {
  if (!slug) return 0;
  const i = ROLE_CONFIG.findIndex((r) => r.slug === slug);
  return i >= 0 ? i : 0;
}

export function isModuleIncluded(
  role: RoleConfig,
  moduleId: ModuleId,
): boolean {
  return role.modules.includes(moduleId);
}