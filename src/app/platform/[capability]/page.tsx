import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  capabilities,
  getCapability,
} from "@/components/sites/zeonai/content";
import { CapabilityDetailPage } from "@/components/sites/v7labs/capabilities/capability-detail-page";

type Props = { params: Promise<{ capability: string }> };

export function generateStaticParams() {
  return capabilities.map((c) => ({ capability: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { capability: id } = await params;
  const cap = getCapability(id);
  if (!cap) return { title: "Capability | ZeonAI" };
  return {
    title: `${cap.title} | ZeonAI Platform`,
    description: cap.summary,
  };
}

export default async function CapabilityRoutePage({ params }: Props) {
  const { capability: id } = await params;
  const cap = getCapability(id);
  if (!cap) notFound();
  return <CapabilityDetailPage capability={cap} />;
}
