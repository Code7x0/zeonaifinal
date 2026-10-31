import type { Metadata } from "next";
import { ResourcesPage } from "@/components/sites/v7labs/resources-page";

export const metadata: Metadata = {
  title: "Resources | ZeonAI",
  description:
    "Editorial resources and product notes. Case studies and DeepDelve product pages while articles are prepared.",
};

export default function ResourcesRoute() {
  return <ResourcesPage />;
}
