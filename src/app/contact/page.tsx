import type { Metadata } from "next";
import { ContactPage } from "@/components/sites/v7labs/ia-pages";

export const metadata: Metadata = {
  title: "Contact | ZeonAI",
  description: "Talk to the ZeonAI team about a workflow that matters.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
