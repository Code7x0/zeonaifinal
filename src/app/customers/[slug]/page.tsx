import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  caseStudies,
  getCaseStudy,
} from "@/components/sites/zeonai/content";
import { CaseStudyPage } from "@/components/sites/v7labs/customer-stories";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return { title: "Case study | ZeonAI" };
  }
  return {
    title: `${study.title} | ZeonAI`,
    description: study.summary,
  };
}

export default async function CaseStudyRoute({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyPage slug={slug} />;
}
