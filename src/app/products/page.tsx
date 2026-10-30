import type { Metadata } from "next";
import { ProductsPage } from "@/components/sites/v7labs/ia-pages";

export const metadata: Metadata = {
  title: "Products and capabilities | ZeonAI",
  description:
    "Ask AI, AI Drive, Workflows, Dashboards, Contract Intelligence, App Hub, Agent Hub and more on AI Workspace.",
};

export default function ProductsRoute() {
  return <ProductsPage />;
}
