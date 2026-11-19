import type { Metadata } from "next";
import { SecurityPage } from "@/components/sites/v7labs/ia-pages";

export const metadata: Metadata = {
  title: "Security and compliance | ZeonAI",
  description:
    "Documented security practices and certified compliance programs for AI Workspace.",
};

export default function SecurityRoute() {
  return <SecurityPage />;
}
