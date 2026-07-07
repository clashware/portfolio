"use client";

import { m } from "framer-motion";
import { MapPin, Building2, Rocket, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { icon: Building2, label: t("stats.founded"), value: "2025" },
    { icon: MapPin, label: t("headquarters"), value: "Lausanne" },
    { icon: Rocket, label: t("stats.focusAreas"), value: t("stats.focusAreasValue") },
    { icon: Users, label: t("stats.team"), value: t("stats.teamValue") },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-obsidian">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="border-l-2 border-[#D03232] pl-6 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#A1A1AA]">
                {t("title")}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-snow mb-8 text-balance uppercase">
              {t("title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#D03232]">
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

            <div className="my-8 h-px bg-[#27272A]" />

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#D03232] rounded-none flex items-center justify-center shrink-0">
                <span className="sr-only">{t("swissFlag")}</span>
                <div className="relative w-6 h-6" aria-hidden="true">
                  <div className="absolute top-1/2 left-0 w-full h-1.5 bg-snow -translate-y-1/2" />
                  <div className="absolute left-1/2 top-0 w-1.5 h-full bg-snow -translate-x-1/2" />
                </div>
              </div>
              <div>
                <p className="text-snow font-medium uppercase font-mono text-sm">{t("madeIn")}</p>
                <p className="text-stone font-mono text-xs mt-1">
                  {t("engineeredIn", { country: t("companyInfo.countryValue") })}
                </p>
              </div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="border border-[#27272A] rounded-none p-6 sm:p-8 bg-transparent">
              <h3 className="text-xl font-bold uppercase text-snow mb-6">
                {t("companyInfo.title")}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => {
                  return (
                    <div key={stat.label} className="border border-[#27272A] p-4 flex flex-col gap-2">
                      <p className="font-mono text-xs text-[#A1A1AA] uppercase">{stat.label}</p>
                      <p className="text-snow font-mono tabular-nums text-lg">{stat.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="my-6 h-px bg-[#27272A]" />

              <div className="font-mono text-xs text-[#A1A1AA] space-y-2 uppercase leading-relaxed tracking-wider">
                <p className="text-snow font-bold">Clashware Sàrl</p>
                <p>Avenue de Jurigoz 15</p>
                <p>1006 Lausanne, {t("companyInfo.countryValue")}</p>
                <p className="mt-4">{t("companyInfo.uid")}: CHE-178.795.076</p>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
