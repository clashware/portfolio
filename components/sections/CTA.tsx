"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("cta");
  const tNav = useTranslations("nav");

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-brand opacity-10" />
      <div className="absolute inset-0 bg-obsidian/90" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-light/20 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-snow mb-4">
            {t("title")}
          </h2>

          <p className="text-lg text-zinc max-w-2xl mx-auto mb-10">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-brand text-snow hover:opacity-90 transition-opacity px-8 py-6 text-lg rounded-xl group"
              asChild
            >
              <a href="mailto:contact@clashware.com">
                <Mail className="w-5 h-5 mr-2" />
                {tNav("getInTouch")}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-edge text-zinc hover:bg-slate-elevated hover:text-snow transition-colors px-8 py-6 text-lg rounded-xl"
              asChild
            >
              <a
                href="https://linkedin.com/company/107706302/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow Us
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
