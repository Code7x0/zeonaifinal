export const R2_VIDEO_BASE =
  "https://pub-c1b7c901d0184675ba05b3d290e6582d.r2.dev/";

/** Canonical product film files hosted on Cloudflare R2 */
export const PRODUCT_FILM_FILES = [
  "ZeonAI_DeepProbe_Knowledge_Box_v2.mp4",
  "ZeonAI_Invoice_to_Bill_Agentic_v2.mp4",
  "ZeonAI_Financial_Close_CFO_Product_Film_v4.mp4",
  "ZeonAI_Agent_Bricks_1080p (1).mp4",
  "Hypercare_Agent_film (1).mp4",
] as const;

export const PRODUCT_FILM_PATHS = PRODUCT_FILM_FILES.map(
  (file) => `${R2_VIDEO_BASE}${encodeURIComponent(file)}`,
);
