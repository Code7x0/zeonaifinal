import type { Metadata } from "next";
import { AgentsPage } from "@/components/sites/v7labs/ia-pages";

export const metadata: Metadata = {
  title: "Agent Hub | ZeonAI",
  description:
    "Agents that plan, extract, match and act — with people on the exceptions.",
};

export default function AgentsRoute() {
  return <AgentsPage />;
}
