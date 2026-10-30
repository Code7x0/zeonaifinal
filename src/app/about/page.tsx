import type { Metadata } from "next";
import { AboutPage } from "@/components/sites/v7labs/about-page";

export const metadata: Metadata = {
  title: "About | ZeonAI",
  description:
    "ZeonAI is an enterprise AI company with a product lab and a senior consulting team. One platform — AI Workspace — into production.",
};

export default function AboutRoutePage() {
  return <AboutPage />;
}
