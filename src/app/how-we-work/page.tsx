import type { Metadata } from "next";
import { HowWeWorkPage } from "@/components/sites/v7labs/ia-pages";

export const metadata: Metadata = {
  title: "How we work | ZeonAI",
  description:
    "Problem, ideation, solution — from friction map to a live use case on AI Workspace.",
};

export default function HowWeWorkRoute() {
  return <HowWeWorkPage />;
}
