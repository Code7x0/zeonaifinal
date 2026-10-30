import type { Metadata } from "next";
import { PlatformPage } from "@/components/sites/v7labs/platform-page";

export const metadata: Metadata = {
  title: "Platform · AI Workspace | ZeonAI",
  description:
    "Knowledge, agents and people on one governed layer. AI Workspace, Agent Hub, architecture and integrations.",
};

export default function PlatformRoutePage() {
  return <PlatformPage />;
}
