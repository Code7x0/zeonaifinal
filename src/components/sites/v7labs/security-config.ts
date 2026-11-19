/**
 * Security & compliance section config.
 * Status and deployment copy are editable here without touching layout.
 */

export type ComplianceStatus =
  | "Certified"
  | "In progress"
  | "Aligned";

export type ComplianceItem = {
  id: string;
  name: string;
  description: string;
  status: ComplianceStatus;
};

export type ProtectionSize = "large" | "medium" | "compact";

export type ProtectionItem = {
  id: string;
  title: string;
  summary: string;
  size: ProtectionSize;
  /** Optional in-page anchor, e.g. #trust */
  linkHref?: string;
  linkLabel?: string;
  /** Optional second row for dual compact content */
  secondaryTitle?: string;
  secondarySummary?: string;
};

export type DeploymentOption = {
  id: string;
  label: string;
  detail: string;
};

export const COMPLIANCE: readonly ComplianceItem[] = [
  {
    id: "iso42001",
    name: "ISO/IEC 42001",
    description: "AI management system",
    status: "Certified",
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    description: "Information security management",
    status: "Certified",
  },
  {
    id: "soc2-type1",
    name: "SOC 2 Type I",
    description: "Compliance",
    status: "Certified",
  },
  {
    id: "soc2-type2",
    name: "SOC 2 Type II",
    description: "Compliance",
    status: "Certified",
  },
] as const;

export const PROTECTION: readonly ProtectionItem[] = [
  {
    id: "access",
    title: "Access control",
    summary:
      "Granular permission controls ensure users only access what they need. Access is checked before anything is retrieved.",
    size: "large",
    linkHref: "#trust",
    linkLabel: "How access works ↑",
  },
  {
    id: "encryption",
    title: "Encryption",
    summary: "End-to-end encryption for data at rest and in transit.",
    size: "medium",
  },
  {
    id: "auth-audit",
    title: "Two-factor authentication and audit logs",
    summary: "Two-factor authentication and comprehensive audit trails.",
    size: "medium",
  },
  {
    id: "archive-recovery",
    title: "Legal archiving",
    summary: "Compliant data retention and GDPR-ready systems.",
    size: "compact",
    secondaryTitle: "Disaster recovery",
    secondarySummary:
      "Robust backup systems and business continuity planning.",
  },
] as const;

export const DEPLOYMENT: readonly DeploymentOption[] = [
  {
    id: "on-premises",
    label: "On-premises",
    detail:
      "On-premises or private cloud deployment with full data and model sovereignty.",
  },
  {
    id: "private-cloud",
    label: "Private cloud",
    detail:
      "On-premises or private cloud deployment with full data and model sovereignty.",
  },
  {
    id: "aws",
    label: "AWS",
    detail: "Available as a cloud deployment option.",
  },
  {
    id: "gcp",
    label: "GCP",
    detail: "Available as a cloud deployment option.",
  },
  {
    id: "azure",
    label: "Azure",
    detail: "Available as a cloud deployment option.",
  },
] as const;

export const GOVERNED_AI_NOTE =
  "Answers are drawn only from the documents and repositories the person can already open, and each one cites its sources. Check an output against the source before you act on it.";