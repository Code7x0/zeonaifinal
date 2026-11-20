import type { Metadata } from "next";
import { aeonik, inter } from "@/components/sites/v7labs/fonts";
import { VideoPreload } from "@/components/sites/v7labs/video/video-preload";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zeonai.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ZeonAI | Governed enterprise AI",
  description:
    "Build governed AI agents for the enterprise. AI Workspace answers from your documents, with citations, agents and audit.",
  openGraph: {
    title: "ZeonAI | Governed enterprise AI",
    description:
      "Build governed AI agents for the enterprise. AI Workspace and Agent Hub on one governed platform.",
    url: siteUrl,
    siteName: "ZeonAI",
    type: "website",
    images: [
      {
        url: "/og-home.svg",
        width: 1200,
        height: 630,
        alt: "ZeonAI — governed AI agents for the enterprise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeonAI | Governed enterprise AI",
    description:
      "Build governed AI agents for the enterprise. AI Workspace and Agent Hub on one governed platform.",
    images: ["/og-home.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${aeonik.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-[family-name:var(--font-aeonik)]">
        <VideoPreload />
        {children}
      </body>
    </html>
  );
}
