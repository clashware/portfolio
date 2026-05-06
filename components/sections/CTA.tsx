"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("cta");
  const tNav = useTranslations("nav");

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-b border-[#27272A] bg-obsidian">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-center">
             <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest border border-[#27272A] px-3 py-1">
               Engineered in Lausanne
             </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-snow mb-8 uppercase tracking-tight text-balance">
            {t("title")}
          </h2>

          <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto mb-12 text-balance font-mono uppercase">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-[#DC2626] hover:bg-[#B91C1C] text-[#FAFAFA] rounded-none font-mono uppercase px-8 py-6 text-base group transition-colors"
              asChild
            >
              <a href="mailto:contact@clashware.com">
                <Mail className="w-5 h-5 mr-3" aria-hidden="true" />
                {tNav("getInTouch")}
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border border-[#27272A] text-[#A1A1AA] hover:bg-[#18181B] hover:text-snow rounded-none font-mono uppercase px-8 py-6 text-base transition-colors bg-transparent"
              asChild
            >
              <a
                href="https://x.com/clashware"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("followUs")}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
