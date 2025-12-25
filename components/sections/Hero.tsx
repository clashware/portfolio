"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const t = useTranslations("hero");

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-obsidian">
      {/* Premium CSS Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs - smooth falloff */}
        <div
          className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full blur-[150px] animate-pulse-slow"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.3) 0%, rgba(220,38,38,0.1) 40%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full blur-[150px] animate-pulse-slow"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.06) 40%, transparent 70%)", animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle, rgba(153,27,27,0.15) 0%, rgba(153,27,27,0.05) 40%, transparent 70%)" }}
        />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Logo */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8"
        >
          <Image
            src="/logo/clashware-logo.png"
            alt="Clashware"
            width={150}
            height={150}
            className="mx-auto animate-wave rounded-2xl object-contain"
            style={{ width: 'auto', height: 'auto', maxWidth: 150, maxHeight: 150 }}
            priority
          />
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-snow mb-4"
        >
          <span className="gradient-brand-text">Clashware</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-xl sm:text-2xl lg:text-3xl text-zinc mb-4"
        >
          {t("tagline")}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-base sm:text-lg text-stone max-w-2xl mx-auto mb-10"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.6}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="gradient-brand text-snow hover:opacity-90 transition-opacity px-8 py-6 text-lg rounded-xl"
            onClick={scrollToProducts}
          >
            {t("exploreProducts")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-edge text-zinc hover:bg-slate-elevated hover:text-snow transition-colors px-8 py-6 text-lg rounded-xl"
            asChild
          >
            <a href="#about">{t("learnMore")}</a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={scrollToProducts}
          className="text-zinc hover:text-snow transition-colors"
          aria-label="Scroll to products"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
