import type { VideoAsset, VideoPlacement } from "./types";

const POSTER = (name: string) => `/sites/v7labs/video/posters/${name}.svg`;
const FILM = (name: string) => `/sites/v7labs/video/${name}.mp4`;

/** Product films supplied Nov 2026 — muted autoplay loops across matching slots. */
const FILMS = {
  knowledge: FILM("deepprobe-knowledge"),
  invoice: FILM("invoice-to-bill"),
  financial: FILM("financial-close"),
  bricks: FILM("agent-bricks"),
  hypercare: FILM("hypercare-agent"),
  about: FILM("about-founder"),
  demo: FILM("demo-expectations"),
} as const;

function ready(
  partial: Omit<VideoAsset, "src" | "status" | "mode"> & {
    src: string;
    mode?: VideoAsset["mode"];
  },
): VideoAsset {
  return {
    ...partial,
    mode: partial.mode ?? "loop",
    status: "ready",
  };
}

function pending(
  partial: Omit<VideoAsset, "src" | "status"> & { mode: VideoAsset["mode"] },
): VideoAsset {
  return {
    ...partial,
    src: null,
    status: "missing",
  };
}

/**
 * Central registry for all Video Placement Brief slots.
 * Real MP4s live under `public/sites/v7labs/video/`.
 */
export const VIDEO_ASSETS: Record<VideoPlacement, VideoAsset> = {
  "home-hero": ready({
    id: "home-hero",
    topic: "Ask AI / knowledge box — cited answers from governed documents",
    placementLabel: "Placement 1 · Homepage hero",
    targetDurationSec: { min: 20, max: 30 },
    src: FILMS.knowledge,
    poster: POSTER("home-hero-ask-ai"),
    captionsSrc: null,
    title: "Ask AI · cited answer",
    description:
      "AI Workspace knowledge box — questions answered from governed documents.",
    notes: "Film: ZeonAI_DeepProbe_Knowledge_Box_v2",
  }),
  "home-tab-ask-ai": ready({
    id: "home-tab-ask-ai",
    topic: "Ask AI product tour",
    placementLabel: "Placement 2 · Homepage tabs · Ask AI",
    targetDurationSec: { min: 10, max: 15 },
    src: FILMS.knowledge,
    poster: POSTER("tab-ask-ai"),
    captionsSrc: null,
    title: "Ask AI",
    description: "Cited answers from AI Drive.",
  }),
  "home-tab-ai-drive": ready({
    id: "home-tab-ai-drive",
    topic: "AI Drive / knowledge library",
    placementLabel: "Placement 2 · Homepage tabs · AI Drive",
    targetDurationSec: { min: 10, max: 15 },
    src: FILMS.knowledge,
    poster: POSTER("tab-ai-drive"),
    captionsSrc: null,
    title: "AI Drive",
    description: "Versions, lineage and permissions.",
  }),
  "home-tab-workflows": ready({
    id: "home-tab-workflows",
    topic: "Invoice-to-bill agentic workflow",
    placementLabel: "Placement 2 · Homepage tabs · Workflows",
    targetDurationSec: { min: 10, max: 15 },
    src: FILMS.invoice,
    poster: POSTER("tab-workflows"),
    captionsSrc: null,
    title: "Workflows",
    description: "Agents and people with an audit trail.",
  }),
  "home-tab-dashboards": ready({
    id: "home-tab-dashboards",
    topic: "Financial close / CFO dashboards",
    placementLabel: "Placement 2 · Homepage tabs · Dashboards",
    targetDurationSec: { min: 10, max: 15 },
    src: FILMS.financial,
    poster: POSTER("tab-dashboards"),
    captionsSrc: null,
    title: "AI Dashboards",
    description: "Operational views from trusted sources.",
  }),
  "home-tab-contracts": ready({
    id: "home-tab-contracts",
    topic: "Hypercare agent film",
    placementLabel: "Placement 2 · Homepage tabs · Contracts",
    targetDurationSec: { min: 10, max: 15 },
    src: FILMS.hypercare,
    poster: POSTER("tab-contracts"),
    captionsSrc: null,
    title: "Contracts",
    description: "Clause search and obligation tracking.",
  }),
  "home-tab-agent-hub": ready({
    id: "home-tab-agent-hub",
    topic: "Agent Bricks — build and release agents",
    placementLabel: "Placement 2 · Homepage tabs · Agent Hub",
    targetDurationSec: { min: 10, max: 15 },
    src: FILMS.bricks,
    poster: POSTER("tab-agent-hub"),
    captionsSrc: null,
    title: "Agent Hub",
    description: "Build, evaluate and release agents.",
  }),
  "capability-ask-ai": ready({
    id: "capability-ask-ai",
    topic: "Ask AI walkthrough",
    placementLabel: "Placement 3 · /platform/ask-ai",
    targetDurationSec: { min: 60, max: 90 },
    src: FILMS.knowledge,
    poster: POSTER("cap-ask-ai"),
    captionsSrc: null,
    title: "Walkthrough · Ask AI",
    description: "How cited answers work end to end.",
  }),
  "capability-ai-drive": ready({
    id: "capability-ai-drive",
    topic: "AI Drive walkthrough",
    placementLabel: "Placement 3 · /platform/ai-drive",
    targetDurationSec: { min: 60, max: 90 },
    src: FILMS.knowledge,
    poster: POSTER("cap-ai-drive"),
    captionsSrc: null,
    title: "Walkthrough · AI Drive",
    description: "Governed documents, versions and access.",
  }),
  "capability-workflows": ready({
    id: "capability-workflows",
    topic: "Invoice-to-bill agentic workflow",
    placementLabel: "Placement 3 · /platform/workflows",
    targetDurationSec: { min: 60, max: 90 },
    src: FILMS.invoice,
    poster: POSTER("cap-workflows"),
    captionsSrc: null,
    title: "Walkthrough · Workflows",
    description: "Agent steps, human approvals and audit.",
  }),
  "capability-dashboards": ready({
    id: "capability-dashboards",
    topic: "Financial close dashboards",
    placementLabel: "Placement 3 · /platform/dashboards",
    targetDurationSec: { min: 60, max: 90 },
    src: FILMS.financial,
    poster: POSTER("cap-dashboards"),
    captionsSrc: null,
    title: "Walkthrough · AI Dashboards",
    description: "Deterministic calculations and live views.",
  }),
  "capability-contracts": pending({
    id: "capability-contracts",
    topic: "Contracts walkthrough",
    placementLabel: "Placement 3 · /platform/contracts",
    mode: "loop",
    targetDurationSec: { min: 60, max: 90 },
    poster: POSTER("cap-contracts"),
    captionsSrc: null,
    title: "Walkthrough · Contract Intelligence",
    description: "Finding obligations and reviewing clauses.",
  }),
  "capability-agent-hub": ready({
    id: "capability-agent-hub",
    topic: "Agent Bricks walkthrough",
    placementLabel: "Placement 3 · /agents and /platform/agent-hub",
    targetDurationSec: { min: 60, max: 90 },
    src: FILMS.bricks,
    poster: POSTER("cap-agent-hub"),
    captionsSrc: null,
    title: "Walkthrough · Agent Hub",
    description: "Building and releasing governed agents.",
  }),
  "capability-opportunity": pending({
    id: "capability-opportunity",
    topic: "Opportunity Management walkthrough",
    placementLabel: "Placement 3 · /platform/opportunity",
    mode: "loop",
    targetDurationSec: { min: 60, max: 90 },
    poster: POSTER("cap-opportunity"),
    captionsSrc: null,
    title: "Walkthrough · Opportunity Management",
    description: "Pipeline visibility with governed sources.",
  }),
  "capability-quotes": pending({
    id: "capability-quotes",
    topic: "Quote Management walkthrough",
    placementLabel: "Placement 3 · /platform/quotes",
    mode: "loop",
    targetDurationSec: { min: 60, max: 90 },
    poster: POSTER("cap-quotes"),
    captionsSrc: null,
    title: "Walkthrough · Quote Management",
    description: "Quote packs assembled with review gates.",
  }),
  "capability-app-hub": ready({
    id: "capability-app-hub",
    topic: "Hypercare agent film",
    placementLabel: "Placement 3 · /platform/app-hub",
    targetDurationSec: { min: 60, max: 90 },
    src: FILMS.hypercare,
    poster: POSTER("cap-app-hub"),
    captionsSrc: null,
    title: "Walkthrough · App Hub",
    description: "Apps and outputs on the same control plane.",
  }),
  "case-mortgage-application-automation": pending({
    id: "case-mortgage-application-automation",
    topic: "Mortgage application before/after",
    placementLabel: "Placement 4 · Case study",
    mode: "loop",
    targetDurationSec: { min: 30, max: 45 },
    poster: POSTER("case-mortgage"),
    captionsSrc: null,
    title: "Case film · Mortgage automation",
    description: "Sample workflow narrative — no customer faces unless approved.",
  }),
  "case-partner-billing-automation": ready({
    id: "case-partner-billing-automation",
    topic: "Invoice-to-bill partner billing",
    placementLabel: "Placement 4 · Case study",
    targetDurationSec: { min: 30, max: 45 },
    src: FILMS.invoice,
    poster: POSTER("case-billing"),
    captionsSrc: null,
    title: "Case film · Partner billing",
    description: "Invoice-to-bill agentic workflow.",
  }),
  "case-bank-statement-receipting": pending({
    id: "case-bank-statement-receipting",
    topic: "Bank statement receipting",
    placementLabel: "Placement 4 · Case study",
    mode: "loop",
    targetDurationSec: { min: 30, max: 45 },
    poster: POSTER("case-receipting"),
    captionsSrc: null,
    title: "Case film · Bank statement receipting",
    description: "Sample workflow narrative.",
  }),
  "case-media-content-intelligence": pending({
    id: "case-media-content-intelligence",
    topic: "Media content intelligence",
    placementLabel: "Placement 4 · Case study",
    mode: "loop",
    targetDurationSec: { min: 30, max: 45 },
    poster: POSTER("case-media"),
    captionsSrc: null,
    title: "Case film · Media intelligence",
    description: "Sample workflow narrative.",
  }),
  "tech-rule-builder": pending({
    id: "tech-rule-builder",
    topic: "Rule builder: sentence in, tested rule out",
    placementLabel: "Placement 5 · Technology · Rule builder",
    mode: "loop",
    targetDurationSec: { min: 10, max: 20 },
    poster: POSTER("tech-rule-builder"),
    captionsSrc: null,
    title: "Rule builder",
    description: "Plain language becomes a frozen, tested rule.",
  }),
  "tech-rerun": pending({
    id: "tech-rerun",
    topic: "Rerun from any step",
    placementLabel: "Placement 5 · Technology · Runtime rerun",
    mode: "loop",
    targetDurationSec: { min: 10, max: 20 },
    poster: POSTER("tech-rerun"),
    captionsSrc: null,
    title: "Rerun from a step",
    description: "Fix a value and replay from there.",
  }),
  "tech-dashboard-calc": pending({
    id: "tech-dashboard-calc",
    topic: "Dashboard view calculation",
    placementLabel: "Placement 5 · Technology · Dashboard calculation",
    mode: "loop",
    targetDurationSec: { min: 10, max: 20 },
    poster: POSTER("tech-dashboard-calc"),
    captionsSrc: null,
    title: "View calculation",
    description: "Deterministic arithmetic outside the model.",
  }),
  "industry-financial": ready({
    id: "industry-financial",
    topic: "Financial close / CFO product film",
    placementLabel: "Placement 6 · /industries/financial",
    targetDurationSec: { min: 25, max: 35 },
    src: FILMS.financial,
    poster: POSTER("ind-financial"),
    captionsSrc: null,
    title: "Sector workflow · Financial services",
    description: "Month-end close and collections views.",
  }),
  "industry-super": pending({
    id: "industry-super",
    topic: "Superannuation use-case",
    placementLabel: "Placement 6 · /industries/super",
    mode: "loop",
    targetDurationSec: { min: 25, max: 35 },
    poster: POSTER("ind-super"),
    captionsSrc: null,
    title: "Sector workflow · Superannuation",
    description: "Invoice match or reconciliation sample.",
  }),
  "industry-media": pending({
    id: "industry-media",
    topic: "Media use-case",
    placementLabel: "Placement 6 · /industries/media",
    mode: "loop",
    targetDurationSec: { min: 25, max: 35 },
    poster: POSTER("ind-media"),
    captionsSrc: null,
    title: "Sector workflow · Media",
    description: "Topic summary or fact-check sample.",
  }),
  "industry-gov": pending({
    id: "industry-gov",
    topic: "Government use-case",
    placementLabel: "Placement 6 · /industries/gov",
    mode: "loop",
    targetDurationSec: { min: 25, max: 35 },
    poster: POSTER("ind-gov"),
    captionsSrc: null,
    title: "Sector workflow · Government",
    description: "Policy question sample with access control.",
  }),
  "industry-defence": pending({
    id: "industry-defence",
    topic: "Defence use-case",
    placementLabel: "Placement 6 · /industries/defence",
    mode: "loop",
    targetDurationSec: { min: 25, max: 35 },
    poster: POSTER("ind-defence"),
    captionsSrc: null,
    title: "Sector workflow · Defence",
    description: "Secure knowledge discovery sample.",
  }),
  "industry-metals": pending({
    id: "industry-metals",
    topic: "Metals / manufacturing use-case",
    placementLabel: "Placement 6 · /industries/metals",
    mode: "loop",
    targetDurationSec: { min: 25, max: 35 },
    poster: POSTER("ind-metals"),
    captionsSrc: null,
    title: "Sector workflow · Metals",
    description: "Operations document workflow sample.",
  }),
  "about-founder": ready({
    id: "about-founder",
    topic: "Founder / company atmosphere",
    placementLabel: "Placement 7 · About",
    targetDurationSec: { min: 60, max: 90 },
    src: FILMS.about,
    poster: POSTER("about-founder"),
    captionsSrc: null,
    title: "Why governed AI matters",
    description: "Atmosphere for how ZeonAI works with customers.",
  }),
  "demo-expectations": ready({
    id: "demo-expectations",
    topic: "What you will see in the demo",
    placementLabel: "Placement 8 · /demo",
    targetDurationSec: { min: 45, max: 60 },
    src: FILMS.demo,
    poster: POSTER("demo-expectations"),
    captionsSrc: null,
    title: "What you will see in the demo",
    description: "Sets expectations for the working session.",
  }),
  "product-invoiceai": ready({
    id: "product-invoiceai",
    topic: "Invoice to bill agentic product film",
    placementLabel: "Product · InvoiceAI",
    targetDurationSec: { min: 45, max: 90 },
    src: FILMS.invoice,
    poster: POSTER("tab-workflows"),
    captionsSrc: null,
    title: "InvoiceAI · invoice to bill",
    description: "Capture, match and route invoices with human review on exceptions.",
  }),
  "product-cashfloai": ready({
    id: "product-cashfloai",
    topic: "Financial close CFO product film",
    placementLabel: "Product · CashfloAI",
    targetDurationSec: { min: 45, max: 90 },
    src: FILMS.financial,
    poster: POSTER("tab-dashboards"),
    captionsSrc: null,
    title: "CashfloAI · financial close",
    description: "Collections and close views for finance leadership.",
  }),
  "product-docai": ready({
    id: "product-docai",
    topic: "Hypercare / document agent film",
    placementLabel: "Product · DocAI",
    targetDurationSec: { min: 45, max: 90 },
    src: FILMS.hypercare,
    poster: POSTER("cap-ai-drive"),
    captionsSrc: null,
    title: "DocAI · document agents",
    description: "Governed document workflows with people on the exceptions.",
  }),
  "product-ai-workspace": ready({
    id: "product-ai-workspace",
    topic: "DeepProbe knowledge box / AI Workspace",
    placementLabel: "Product · AI Workspace",
    targetDurationSec: { min: 45, max: 90 },
    src: FILMS.knowledge,
    poster: POSTER("home-hero-ask-ai"),
    captionsSrc: null,
    title: "AI Workspace · knowledge box",
    description: "Ask across governed knowledge with citations.",
  }),
};

export function getVideoAsset(id: VideoPlacement): VideoAsset {
  return VIDEO_ASSETS[id];
}

export function listMissingVideos(): VideoAsset[] {
  return Object.values(VIDEO_ASSETS).filter((a) => a.status === "missing" || !a.src);
}

export function listReadyVideos(): VideoAsset[] {
  return Object.values(VIDEO_ASSETS).filter((a) => a.status === "ready" && a.src);
}

/** Map homepage Feature108 tab value → registry id */
export const HOME_TAB_VIDEO: Record<string, VideoPlacement> = {
  "ask-ai": "home-tab-ask-ai",
  "ai-drive": "home-tab-ai-drive",
  workflows: "home-tab-workflows",
  dashboards: "home-tab-dashboards",
  contracts: "home-tab-contracts",
  "agent-hub": "home-tab-agent-hub",
};

export const PRODUCT_VIDEO: Record<string, VideoPlacement> = {
  invoiceai: "product-invoiceai",
  cashfloai: "product-cashfloai",
  docai: "product-docai",
  "ai-workspace": "product-ai-workspace",
  deepprobe: "product-ai-workspace",
};

export function capabilityVideoId(capabilityId: string): VideoPlacement {
  return `capability-${capabilityId}` as VideoPlacement;
}

export function caseVideoId(slug: string): VideoPlacement {
  return `case-${slug}` as VideoPlacement;
}

export function industryVideoId(id: string): VideoPlacement {
  return `industry-${id}` as VideoPlacement;
}
