import type { Metadata } from "next";
import { ResponsibleAiPage } from "@/components/sites/v7labs/ia-pages";

export const metadata: Metadata = {
  title: "Responsible AI | ZeonAI",
  description:
    "Governed answers, human checkpoints and read-only audit trails in AI Workspace.",
};

export default function ResponsibleAiRoute() {
  return <ResponsibleAiPage />;
}
