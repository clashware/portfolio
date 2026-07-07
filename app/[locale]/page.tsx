import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata, buildPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import CTA from "@/components/sections/CTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "home", "/");
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = await buildPageJsonLd(locale, "home", "/");

  return (
    <div className="min-h-screen bg-obsidian overflow-x-clip">
      <JsonLd data={jsonLd} />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <div className="border-b border-[#27272A]" />
        <Products />
        <div className="border-b border-[#27272A]" />
        <About />
        <div className="border-b border-[#27272A]" />
        <Team />
        <div className="border-b border-[#27272A]" />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
