import type { Metadata } from "next";
import { aeonik } from "@/components/sites/v7labs/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeonAI | Governed enterprise AI",
  description:
    "The governed AI platform for enterprise knowledge and workflows. AI Workspace answers from your documents, with citations, agents and audit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${aeonik.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-[family-name:var(--font-aeonik)]">
        {children}
      </body>
    </html>
  );
}
