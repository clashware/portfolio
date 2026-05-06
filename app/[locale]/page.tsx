import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import CTA from "@/components/sections/CTA";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-obsidian overflow-x-clip">
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
