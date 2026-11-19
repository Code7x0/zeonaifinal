import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getProduct,
  PRODUCT_ROUTE_SLUGS,
  type ProductRouteSlug,
} from "@/components/sites/v7labs/products/product-data";
import { ProductPage } from "@/components/sites/v7labs/products/product-page";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCT_ROUTE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product | ZeonAI" };
  return {
    title: `${product.brand} | ZeonAI`,
    description: product.lead,
  };
}

export default async function ProductRoute({ params }: Props) {
  const { slug } = await params;
  if (slug === "deepprobe") {
    redirect("/products/ai-workspace");
  }
  const product = getProduct(slug);
  if (!product || !PRODUCT_ROUTE_SLUGS.includes(slug as ProductRouteSlug)) {
    notFound();
  }
  return <ProductPage product={product} />;
}
