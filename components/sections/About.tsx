"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, Rocket, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { icon: Building2, label: t("stats.founded"), value: "2025" },
    { icon: MapPin, label: "Headquarters", value: "Lausanne" },
    { icon: Rocket, label: t("stats.focusAreas"), value: t("stats.focusAreasValue") },
    { icon: Users, label: t("stats.team"), value: t("stats.teamValue") },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-obsidian">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-snow mb-6">
              {t("title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="gradient-brand-text">
                {t("title").split(" ").slice(-1)}
              </span>
            </h2>

            <div className="space-y-6 text-zinc">
              <p className="text-lg leading-relaxed">
                {t("mission.content")}
              </p>

              <p className="text-lg leading-relaxed">
                {t("vision.content")}
              </p>
            </div>

            <Separator className="my-8 bg-edge" />

            <div className="flex items-center gap-4">
              {/* Swiss Flag */}
              <div className="w-12 h-12 bg-brand-primary rounded flex items-center justify-center shrink-0">
                <div className="relative w-6 h-6">
                  <div className="absolute top-1/2 left-0 w-full h-1.5 bg-snow -translate-y-1/2" />
                  <div className="absolute left-1/2 top-0 w-1.5 h-full bg-snow -translate-x-1/2" />
                </div>
              </div>
              <div>
                <p className="text-snow font-medium">Made in Switzerland</p>
                <p className="text-stone text-sm">
                  Precision-engineered in Lausanne, {t("companyInfo.countryValue")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-snow mb-6">
                {t("companyInfo.title")}
              </h3>

              <div className="space-y-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-elevated flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-stone text-sm">{stat.label}</p>
                        <p className="text-snow font-medium">{stat.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator className="my-6 bg-edge" />

              <div className="text-sm text-stone space-y-1">
                <p className="text-zinc font-medium">Clashware Sàrl</p>
                <p>Avenue de Jurigoz 15</p>
                <p>1006 Lausanne, {t("companyInfo.countryValue")}</p>
                <p className="mt-2">{t("companyInfo.uid")}: CHE-178.795.076</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
