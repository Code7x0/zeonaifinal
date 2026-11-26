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
  id: "product" | "technology" | "industries" | "company" | "trust";
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
          "AI Workspace, Agent Hub, and platform modules.",
      },
      {
        label: "AI Workspace",
        href: "/products/ai-workspace",
        description:
          "Governed answers from your repositories with citations and access checks.",
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
    id: "technology",
    label: "Technology",
    items: [
      {
        label: "Technology overview",
        href: "/technology#architecture",
        description: "Five layers and one governance rail.",
      },
      {
        label: "Agent runtime",
        href: "/technology#runtime",
        description: "Our own runtime: frozen logic, rerun from any step.",
      },
      {
        label: "Retrieval",
        href: "/technology#retrieval",
        description: "Context-aware indexing with cited answers.",
      },
      {
        label: "Memory",
        href: "/technology#memory",
        description: "Personal and organization memory, working together.",
      },
      {
        label: "AI-assisted determinism",
        href: "/technology#determinism",
        description: "Models interpret; rules and code execute.",
      },
      {
        label: "Model router",
        href: "/technology#router",
        description: "The right model for each step, inside your policy.",
      },
      {
        label: "Token economics",
        href: "/technology#tokens",
        description: "Every model call metered and budgeted.",
      },
      {
        label: "Agent security",
        href: "/technology#security",
        description: "Five gates between an agent and your systems.",
      },
      {
        label: "Sovereign deployment",
        href: "/technology#sovereign",
        description: "Your cloud, private cloud or air-gapped.",
      },
      {
        label: "Connectors",
        href: "/technology#connectors",
        description: "ERP, data warehouses and document stores.",
      },
      {
        label: "Agent evaluation",
        href: "/technology#evaluation",
        description: "No agent ships on a demo.",
      },
      {
        label: "Rule builder",
        href: "/technology#rules",
        description: "Rules written by an agent, proved before they run.",
      },
    ],
  },
  {
    id: "industries",
    label: "Industry Solutions",
    items: [
      {
        label: "All industry solutions",
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
        label: "Defense",
        href: "/industries/defence",
        description:
          "Knowledge discovery for classified environments on your infrastructure.",
      },
      {
        label: "Construction",
        href: "/industries/construction",
        description:
          "Plans, permits and vendor paperwork with governed extraction.",
      },
      {
        label: "Telco",
        href: "/industries/telco",
        description:
          "Service records, contracts and operational documents at scale.",
      },
      {
        label: "Medtech",
        href: "/industries/medtech",
        description:
          "Regulated document packs with human review on exceptions.",
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
          "Product lab and platform. Manifest AI is a channel partner.",
      },
      {
        label: "How we work",
        href: "/about#how-we-work",
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
        href: "/trust",
        description:
          "Documented security practices and certified compliance programs.",
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
          "On-premises, private cloud and major clouds — scoped during discovery.",
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
