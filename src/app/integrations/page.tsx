import type { Metadata } from "next";
import { IntegrationsPage } from "@/components/sites/v7labs/ia-pages";

export const metadata: Metadata = {
  title: "Integrations | ZeonAI",
  description:
    "Connect AI Workspace to systems of record — scoped per engagement.",
};

export default function IntegrationsRoute() {
  return <IntegrationsPage />;
}
