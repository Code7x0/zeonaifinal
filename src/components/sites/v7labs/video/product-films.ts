/** Canonical product film files under /public/sites/v7labs/video/ */
export const PRODUCT_FILM_FILES = [
  "deepprobe-knowledge.mp4",
  "invoice-to-bill.mp4",
  "financial-close.mp4",
  "agent-bricks.mp4",
  "hypercare-agent.mp4",
] as const;

export const PRODUCT_FILM_PATHS = PRODUCT_FILM_FILES.map(
  (file) => `/sites/v7labs/video/${file}` as const,
);
