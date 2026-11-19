import type { MetadataRoute } from "next";
import { caseStudies, industries } from "@/components/sites/zeonai/content";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zeonai.com";

const STATIC_ROUTES = [
  "",
  "/platform",
  "/products",
  "/products/docai",
  "/products/invoiceai",
  "/products/cashfloai",
  "/products/ai-workspace",
  "/technology",
  "/industries",
  "/architecture",
  "/engineering",
  "/integrations",
  "/agents",
  "/agent-library",
  "/customers",
  "/about",
  "/trust",
  "/responsible-ai",
  "/deployment",
  "/demo",
  "/contact",
  "/resources",
  "/privacy-policy",
  "/terms",
  "/privacy",
] as const;

const CAPABILITY_ROUTES = [
  "/platform/ask-ai",
  "/platform/ai-drive",
  "/platform/workflows",
  "/platform/dashboards",
  "/platform/contracts",
  "/platform/opportunity",
  "/platform/quotes",
  "/platform/app-hub",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  for (const path of STATIC_ROUTES) {
    urls.push({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
    });
  }

  for (const path of CAPABILITY_ROUTES) {
    urls.push({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const industry of industries) {
    urls.push({
      url: `${BASE}/industries/${industry.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const study of caseStudies) {
    urls.push({
      url: `${BASE}/customers/${study.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return urls;
}