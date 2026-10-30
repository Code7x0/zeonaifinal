import type { Metadata } from "next";
import { DeploymentPage } from "@/components/sites/v7labs/ia-pages";

export const metadata: Metadata = {
  title: "Deployment options | ZeonAI",
  description:
    "On-premises, private cloud and major clouds — confirm per engagement.",
};

export default function DeploymentRoute() {
  return <DeploymentPage />;
}
