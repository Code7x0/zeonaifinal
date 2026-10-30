import type { Metadata } from "next";
import { CustomersIndexPage } from "@/components/sites/v7labs/customer-stories";

export const metadata: Metadata = {
  title: "Customers and case studies | ZeonAI",
  description:
    "Real deployments across lending, finance and media, with the results each one delivered.",
};

export default function CustomersPage() {
  return <CustomersIndexPage />;
}
