/**
 * ZeonAI tokens + stage config for "How it works under the hood".
 * Palette: ZeonAI brand blues (see palette.ts).
 * Brand blue only — no per-layer rainbow tints.
 */

export const HOOD = {
  /** Motion: cubic-bezier(0.2, 0, 0, 1) */
  ease: [0.2, 0, 0, 1] as const,
  stageMs: 2500,
  microMs: 150,
  moveMs: 300,
  /** UI text inherits site Aeonik; mono only for IDs / LAYER / IN / OUT. */
  mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
  logoGradient: "linear-gradient(90deg, #0025FF 0%, #05A1FD 100%)",
  /** ZeonAI brand blues */
  blue50: "#EEF4FF",
  blue100: "#D9E6FF",
  blue200: "#BCD3FF",
  blue300: "#8EB8FF",
  blue400: "#5991FF",
  blue500: "#2962FF",
  blue600: "#1B46F5",
  blue700: "#1433E1",
  gray50: "#FAFAFA",
  gray200: "#E9EAEB",
  gray300: "#D5D7DA",
  gray400: "#A4A7AE",
  gray500: "#717680",
  gray600: "#535862",
  gray800: "#252B37",
  gray900: "#181D27",
  white: "#FFFFFF",
  teal500: "#15B79E",
  teal50: "#F0FDF9",
  success: "#17B26A",
  warning: "#F79009",
  indigo: "#6172F3",
  radius: {
    sm: 2,
    md: 4,
    card: 2,
    panel: 4,
  },
  shadow: "0 1px 2px rgba(24,29,39,0.05)",
  activeRing: "0 0 0 3px rgba(41,98,255,0.14)",
  nodeHalo: "0 0 0 4px rgba(41,98,255,0.16)",
} as const;

export type HoodStage = {
  id: string;
  name: string;
  /** Compact card descriptor (max ~2 lines at 14px). */
  card: string;
  /** Full inspector description. */
  lead: string;
  receive: string;
  handoff: string;
  /** CAPEX-2291 fact — existing site facts only. */
  forCapex: string;
};

export const HOOD_STAGES: readonly HoodStage[] = [
  {
    id: "01",
    name: "Data sources",
    card: "Upload or connect a repository",
    lead: "Files arrive by upload or from a connected repository. The original file is kept with the case.",
    receive: "CAPEX file",
    handoff: "Case opened",
    forCapex:
      "CAPEX-2291 arrives by upload or connected repository. The original file is kept with the case.",
  },
  {
    id: "02",
    name: "Document processing",
    card: "Read category and key fields",
    lead: "Category and key fields are read from the file so the case has structured data to act on.",
    receive: "Case file",
    handoff: "Structured fields",
    forCapex:
      "Category and key fields are read — Contoso plant upgrade, $186,400.",
  },
  {
    id: "03",
    name: "Rules engine",
    card: "Check fields against policy",
    lead: "Business rules check the structured fields against policy before work continues.",
    receive: "Structured fields",
    handoff: "Approval required",
    forCapex:
      "Spend exceeds the delegated limit, so approval is required.",
  },
  {
    id: "04",
    name: "Workflows and approvals",
    card: "Route to the right approvers",
    lead: "Work routes to the people who must review or approve before anything is posted.",
    receive: "Flagged case",
    handoff: "Human decisions",
    forCapex: "Routed to Finance review, then CFO approval.",
  },
  {
    id: "05",
    name: "Access and audit",
    card: "Role-checked retrieval, full log",
    lead: "Only roles permitted to see the documents can retrieve them. Every step is logged.",
    receive: "Role request",
    handoff: "Permitted view + log",
    forCapex: "2 documents withheld: outside access.",
  },
  {
    id: "06",
    name: "Outputs and integrations",
    card: "Post results, notify people",
    lead: "Results post where work happens, and the right people are notified.",
    receive: "Approved case",
    handoff: "Record + alerts",
    forCapex: "Record posted and people notified.",
  },
] as const;
