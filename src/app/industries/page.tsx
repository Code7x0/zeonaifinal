import type { Metadata } from "next";
import { IndustriesIndexPage } from "@/components/sites/v7labs/industries/industries-pages";

export const metadata: Metadata = {
  title: "Industries | ZeonAI",
  description:
    "Built for regulated, document-heavy sectors — financial services, superannuation, media, government, defence, and manufacturing.",
};

export default function IndustriesRoutePage() {
  return <IndustriesIndexPage />;
}
