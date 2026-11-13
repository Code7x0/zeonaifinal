/**
 * Homepage industries bento — content only.
 * Visual tokens come from site classes (Aeonik, 2px radius, brand blue).
 */

export type IndustryCardId =
  | "financial"
  | "super"
  | "media"
  | "gov"
  | "defence"
  | "metals";

export type IndustryCard = {
  id: IndustryCardId;
  href: string;
  label: string;
  a11yName: string;
  exploreLabel: string;
  outcome: string;
  agents: readonly string[];
  featured?: boolean;
  dark?: boolean;
};

export const INDUSTRY_CARDS: readonly IndustryCard[] = [
  {
    id: "financial",
    href: "/industries/financial",
    label: "Financial services and lending",
    a11yName: "Explore financial services and lending",
    exploreLabel: "Explore financial",
    outcome:
      "Faster, better-documented credit decisions without adding headcount.",
    agents: ["Mortgage application automation", "AI underwriting"],
    featured: true,
  },
  {
    id: "super",
    href: "/industries/super",
    label: "Superannuation and finance",
    a11yName: "Explore superannuation and finance",
    exploreLabel: "Explore superannuation",
    outcome:
      "Clean payables and reconciliations, with an audit trail for every exception.",
    agents: ["Invoice processing and 3-way match"],
  },
  {
    id: "media",
    href: "/industries/media",
    label: "Media and publishing",
    a11yName: "Explore media and publishing",
    exploreLabel: "Explore media",
    outcome:
      "More output from the same newsroom, with checks before anything is published.",
    agents: ["Topic summary and insight"],
  },
  {
    id: "gov",
    href: "/industries/gov",
    label: "Government and public sector",
    a11yName: "Explore government and public sector",
    exploreLabel: "Explore government",
    outcome:
      "Answers from policy and data, with access controls that match the classification.",
    agents: ["Generative search and policy questions"],
  },
  {
    id: "defence",
    href: "/industries/defence",
    label: "Defence",
    a11yName: "Explore defence",
    exploreLabel: "Explore defence",
    outcome:
      "Knowledge discovery for classified environments, deployed on your own infrastructure.",
    agents: ["Secure knowledge discovery"],
    dark: true,
  },
  {
    id: "metals",
    href: "/industries/metals",
    label: "Metals and manufacturing",
    a11yName: "Explore metals and manufacturing",
    exploreLabel: "Explore metals",
    outcome: "Less paperwork between the plant floor and the finance team.",
    agents: ["Vendor invoice processing"],
  },
] as const;

export const LENDING_VALIDATION = [
  { field: "Applicant", status: "Verified" as const },
  { field: "Income", status: "Verified" as const },
  { field: "Employer", status: "Review" as const },
  { field: "ID check", status: "Verified" as const },
] as const;
