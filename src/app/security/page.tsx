import type { Metadata } from "next";
import { SecurityPage } from "@/components/sites/v7labs/ia-pages";

export const metadata: Metadata = {
  title: "Security and compliance | ZeonAI",
  description:
    "Documented security practices for AI Workspace. Certification status requires confirmation.",
};

export default function SecurityRoute() {
  return <SecurityPage />;
}
