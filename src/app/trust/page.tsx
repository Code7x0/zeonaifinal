import type { Metadata } from "next";
import { TrustPage } from "@/components/sites/v7labs/trust-page";

export const metadata: Metadata = {
  title: "Trust and governance | ZeonAI",
  description:
    "Access control, human review and an audit log are built into every part of AI Workspace.",
};

export default function TrustRoutePage() {
  return <TrustPage />;
}
