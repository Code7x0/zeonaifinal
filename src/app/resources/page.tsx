import type { Metadata } from "next";
import { ResourcesPage } from "@/components/sites/v7labs/resources-page";

export const metadata: Metadata = {
  title: "Resources | ZeonAI",
  description:
    "Engineering notes, case studies and product pages from ZeonAI.",
};

export default function ResourcesRoute() {
  return <ResourcesPage />;
}
