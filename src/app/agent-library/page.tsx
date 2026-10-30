import type { Metadata } from "next";
import { AgentLibraryPage } from "@/components/sites/v7labs/ia-pages";

export const metadata: Metadata = {
  title: "Agent library | ZeonAI",
  description:
    "ZeonAI agent portfolio examples by function — finance, lending, operations, knowledge and more.",
};

export default function AgentLibraryRoute() {
  return <AgentLibraryPage />;
}
