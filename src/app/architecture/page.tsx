import type { Metadata } from "next";
import { ArchitecturePage } from "@/components/sites/v7labs/ia-pages";

export const metadata: Metadata = {
  title: "Reference architecture | ZeonAI",
  description:
    "Six layers from data sources to outputs — what makes AI Workspace results safe to act on.",
};

export default function ArchitectureRoute() {
  return <ArchitecturePage />;
}
