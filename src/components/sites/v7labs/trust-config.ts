/**
 * Config for the compact "Governed by design" section.
 * Facts match existing live-site examples — do not invent claims.
 */

export const TRUST_MODULES = [
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

export type TrustModule = (typeof TRUST_MODULES)[number];

export const TRUST_CONFIG = {
  role: {
    label: "Finance",
    modules: TRUST_MODULES,
    granted: [
      "Agent Hub",
      "Workflows",
      "AI Drive",
      "Ask AI",
      "AI Dashboards",
    ] as const satisfies readonly TrustModule[],
  },
  steps: [
    { n: "01", label: "Define Role" },
    { n: "02", label: "Map to Module" },
    { n: "03", label: "Audit" },
  ] as const,
  flow: {
    permitted: ["Capital expenditure policy v4.pdf", "Delegation matrix.xlsx"],
    withheld: ["Board pack · Exec only", "HR compensation pack"],
  },
  audit: [
    {
      time: "09:14:02",
      actor: "finance.manager",
      detail: "Asked about capital spend approvals.",
    },
    {
      time: "09:14:02",
      actor: "access.check",
      detail: "Role and sensitivity rules applied.",
    },
    {
      time: "09:14:03",
      actor: "retrieval",
      detail: "2 documents withheld: outside access.",
    },
    {
      time: "09:14:04",
      actor: "answer",
      detail: "Answered with 2 cited sources.",
    },
    {
      time: "09:16:40",
      actor: "finance.manager",
      detail: "Exported the cited answer.",
    },
  ] as const,
  caption: "Access is checked before anything is retrieved.",
  disclaimer: "Roles shown are examples, not customer data.",
  subtitle:
    "Access control, human review and an audit log — built into every request.",
} as const;

export const TRUST_PLAYBACK_MS = 3000;