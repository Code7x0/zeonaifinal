import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getIndustry,
  industries,
} from "@/components/sites/zeonai/content";
import { IndustryDetailPage } from "@/components/sites/v7labs/industries/industries-pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industry | ZeonAI" };
  return {
    title: `${industry.label} | ZeonAI`,
    description: industry.intro,
  };
}

export default async function IndustryRoutePage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  return <IndustryDetailPage industry={industry} />;
}
