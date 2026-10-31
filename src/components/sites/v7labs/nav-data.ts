/**
 * Site navigation for the desktop mega-menu and mobile accordion.
 * Descriptions are short IA blurbs for the menu — page bodies use brief SoT copy.
 */

export type NavItem = {
  label: string;
  href: string;
  description: string;
};

export type NavGroup = {
  id: "product" | "industries" | "company" | "trust";
  label: string;
  items: readonly NavItem[];
};

export const NAV_GROUPS: readonly NavGroup[] = [
  {
    id: "product",
    label: "Product",
    items: [
      {
        label: "Platform overview",
        href: "/platform",
        description:
          "AI Workspace — governed knowledge, agents and human approval on one platform.",
      },
      {
        label: "Products and capabilities",
        href: "/products",
        description:
          "DeepDelve DocAI, InvoiceAI, CashfloAI, DeepProbe and AI Workspace modules.",
      },
      {
        label: "DeepProbe",
        href: "/products/deepprobe",
        description:
          "Governed answers from your repositories with citations and access checks.",
      },
      {
        label: "DocAI",
        href: "/products/docai",
        description:
          "Unstructured documents to structured, reviewable fields.",
      },
      {
        label: "InvoiceAI",
        href: "/products/invoiceai",
        description:
          "Extract, match and route invoices with people on exceptions.",
      },
      {
        label: "CashfloAI",
        href: "/products/cashfloai",
        description:
          "Cash-flow visibility from bank statements for lending review.",
      },
      {
        label: "Agent Hub",
        href: "/agents",
        description:
          "Agents that extract, match and act — with people on the exceptions.",
      },
      {
        label: "Agent library",
        href: "/agent-library",
        description:
          "Portfolio examples by function: finance, lending, operations, knowledge.",
      },
      {
        label: "Reference architecture",
        href: "/architecture",
        description:
          "Six layers from data sources to outputs — what makes results safe to act on.",
      },
      {
        label: "Integrations",
        href: "/integrations",
        description:
          "Connectors into systems of record — scoped per engagement.",
      },
      {
        label: "Engineering",
        href: "/engineering",
        description:
          "Pipeline, document processing, rules, access, delegation and audit.",
      },
    ],
  },
  {
    id: "industries",
    label: "Industries",
    items: [
      {
        label: "All industries",
        href: "/industries",
        description:
          "Regulated, document-heavy sectors on the same platform.",
      },
      {
        label: "Financial services and lending",
        href: "/industries/financial",
        description:
          "Faster, better-documented credit decisions without adding headcount.",
      },
      {
        label: "Superannuation and finance",
        href: "/industries/super",
        description:
          "Clean payables and reconciliations with an audit trail.",
      },
      {
        label: "Media and publishing",
        href: "/industries/media",
        description:
          "More output from the same newsroom, with checks before publish.",
      },
      {
        label: "Government and public sector",
        href: "/industries/gov",
        description:
          "Answers from policy and data, with classification-aware access.",
      },
      {
        label: "Defence",
        href: "/industries/defence",
        description:
          "Knowledge discovery for classified environments on your infrastructure.",
      },
      {
        label: "Metals and manufacturing",
        href: "/industries/metals",
        description:
          "Less paperwork between the plant floor and finance.",
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    items: [
      {
        label: "About ZeonAI",
        href: "/about",
        description:
          "Product lab and platform. Manifest AI is the consulting arm.",
      },
      {
        label: "How we work",
        href: "/how-we-work",
        description:
          "Problem, ideation, solution — friction mapped with your team.",
      },
      {
        label: "Case studies",
        href: "/case-studies",
        description:
          "Lending, finance and media deployments from the product brief.",
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Talk to the team about a workflow that matters.",
      },
      {
        label: "Book a demo",
        href: "/demo",
        description: "See AI Workspace on a scenario from your sector.",
      },
      {
        label: "Resources",
        href: "/resources",
        description:
          "Editorial index for articles and notes — populated as content is approved.",
      },
    ],
  },
  {
    id: "trust",
    label: "Trust",
    items: [
      {
        label: "Trust Centre",
        href: "/trust",
        description:
          "Access control, human review and an audit log — built in.",
      },
      {
        label: "Security and compliance",
        href: "/security",
        description:
          "Documented security practices — certification status pending confirmation.",
      },
      {
        label: "Responsible AI",
        href: "/responsible-ai",
        description:
          "Governed answers, human checkpoints and read-only audit trails.",
      },
      {
        label: "Deployment options",
        href: "/deployment",
        description:
          "On-premises, private cloud and major clouds — confirm per engagement.",
      },
      {
        label: "Privacy policy",
        href: "/privacy-policy",
        description: "How personal information on this site is handled.",
      },
      {
        label: "Terms",
        href: "/terms",
        description: "Website terms of use.",
      },
    ],
  },
] as const;
