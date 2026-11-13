/**
 * Security & compliance section config.
 * Status and deployment copy are editable here without touching layout.
 * Never set status to "Certified" unless the ZeonAI team confirms.
 */

export type ComplianceStatus =
  | "Certified"
  | "In progress"
  | "Aligned"
  | "Status to confirm";

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
  /** True when detail is awaiting team confirmation */
  placeholder?: boolean;
};

export const COMPLIANCE: readonly ComplianceItem[] = [
  {
    id: "soc2",
    name: "SOC 2",
    description: "Compliance",
    status: "Status to confirm",
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    description: "Information security management",
    status: "Status to confirm",
  },
  {
    id: "gdpr",
    name: "GDPR",
    description: "GDPR-ready systems",
    status: "Status to confirm",
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

/** Deployment detail: only published claims; others flagged as placeholders. */
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
    detail: "AWS is listed as a deployment option. Detail to confirm with the team.",
    placeholder: true,
  },
  {
    id: "gcp",
    label: "GCP",
    detail: "GCP is listed as a deployment option. Detail to confirm with the team.",
    placeholder: true,
  },
  {
    id: "azure",
    label: "Azure",
    detail:
      "Azure is listed as a deployment option. Detail to confirm with the team.",
    placeholder: true,
  },
] as const;

export const GOVERNED_AI_NOTE =
  "Answers are drawn only from the documents and repositories the person can already open, and each one cites its sources. Check an output against the source before you act on it.";
