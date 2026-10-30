import type { Metadata } from "next";
import { EngineeringDetailPage } from "@/components/sites/v7labs/engineering/engineering-detail-page";

export const metadata: Metadata = {
  title: "Engineering · How it works under the hood | ZeonAI",
  description:
    "Six pieces of ZeonAI engineering — hubs and agents, document processing, business rules, access, delegation, and the audit log.",
};

export default function EngineeringPage() {
  return <EngineeringDetailPage />;
}
