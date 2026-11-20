export type VideoMode = "loop" | "click";

export type VideoPlacement =
  | "home-hero"
  | "home-tab-ask-ai"
  | "home-tab-ai-drive"
  | "home-tab-workflows"
  | "home-tab-dashboards"
  | "home-tab-contracts"
  | "home-tab-agent-hub"
  | `capability-${string}`
  | `case-${string}`
  | "tech-rule-builder"
  | "tech-rerun"
  | "tech-dashboard-calc"
  | `industry-${string}`
  | "about-founder"
  | "demo-expectations"
  | "product-invoiceai"
  | "product-cashfloai"
  | "product-docai"
  | "product-ai-workspace";

export type VideoAssetStatus = "ready" | "missing";

export type VideoAsset = {
  id: VideoPlacement;
  /** Human topic for inventory / Biswa handoff */
  topic: string;
  placementLabel: string;
  mode: VideoMode;
  /** Target duration guidance from the brief (seconds) */
  targetDurationSec: { min: number; max: number };
  /** Absolute site path when file exists, else null */
  src: string | null;
  poster: string;
  /** WebVTT captions path for click-to-play videos */
  captionsSrc: string | null;
  title: string;
  description: string;
  status: VideoAssetStatus;
  notes?: string;
};
