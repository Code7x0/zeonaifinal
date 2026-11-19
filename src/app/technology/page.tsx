import type { Metadata } from "next";
import { TechnologyPage } from "@/components/sites/v7labs/technology/technology-page";

export const metadata: Metadata = {
  title: "Technology | ZeonAI",
  description:
    "The engineering behind governed autonomy: an in-house agent runtime, context-aware retrieval, user memory, model routing, token metering, agent security and sovereign deployment.",
};

export default function TechnologyRoute() {
  return <TechnologyPage />;
}
