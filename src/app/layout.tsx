import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

import { createClient, repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const urbanist = Urbanist({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="relative min-h-screen bg-slate-900 text-slate-100"
    >
      <body className={urbanist.className}>
        <Header />
        {children}
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
        <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
