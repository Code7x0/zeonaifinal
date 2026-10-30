import type { Metadata } from "next";
import { DemoPage } from "@/components/sites/v7labs/demo-page";

export const metadata: Metadata = {
  title: "Book a demo | ZeonAI",
  description:
    "See AI Workspace on a workflow that matters to you. Tell us a little about your team and we will arrange a time.",
};

export default function DemoRoutePage() {
  return <DemoPage />;
}
