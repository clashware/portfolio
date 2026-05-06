import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import { Building2, Target, Globe, Users } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: `${t("title")} | Clashware`,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  const stats = [
    { label: t("stats.founded"), value: "2025", icon: Building2 },
    { label: t("stats.products"), value: "3", icon: Target },
    { label: t("stats.focusAreas"), value: t("stats.focusAreasValue"), icon: Globe },
    { label: t("stats.team"), value: t("stats.teamValue"), icon: Users },
  ];

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-24 flex flex-col md:flex-row gap-8 justify-between items-start md:items-end">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="text-[#FAFAFA]">{t("title").split(" ").slice(0, -1).join(" ")} </span>
            <span className="text-[#DC2626]">
              {t("title").split(" ").slice(-1)}
            </span>
          </h1>
          <p className="text-lg text-zinc max-w-md">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-[#27272A] divide-x divide-y md:divide-y-0 divide-[#27272A] mb-24">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="p-8 flex flex-col items-center justify-center font-mono">
                <Icon className="w-6 h-6 mb-4 text-[#DC2626]" />
                <div className="text-3xl font-bold text-[#FAFAFA] mb-2 tabular-nums">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-zinc">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 mb-24 border-y border-[#27272A] divide-y md:divide-y-0 md:divide-x divide-[#27272A]">
          <div className="py-12 md:pr-12">
            <h2 className="text-xl font-bold text-[#FAFAFA] mb-6 font-mono uppercase tracking-wider">{t("mission.title")}</h2>
            <p className="text-zinc leading-relaxed">
              {t("mission.content")}
            </p>
          </div>
          <div className="py-12 md:pl-12">
            <h2 className="text-xl font-bold text-[#FAFAFA] mb-6 font-mono uppercase tracking-wider">{t("vision.title")}</h2>
            <p className="text-zinc leading-relaxed">
              {t("vision.content")}
            </p>
          </div>
        </div>

        <div className="border border-[#27272A] mb-24 p-8 md:p-12 bg-transparent">
          <h2 className="text-xl font-bold text-[#FAFAFA] mb-8 font-mono uppercase tracking-wider">{t("companyInfo.title")}</h2>
          <div className="grid md:grid-cols-2 gap-12 font-mono text-sm">
            <div className="space-y-6">
              <div>
                <div className="text-zinc mb-2 uppercase">{t("companyInfo.legalName")}</div>
                <div className="text-[#FAFAFA]">Clashware Sàrl</div>
              </div>
              <div>
                <div className="text-zinc mb-2 uppercase">{t("companyInfo.legalForm")}</div>
                <div className="text-[#FAFAFA]">{t("companyInfo.legalFormValue")}</div>
              </div>
              <div>
                <div className="text-zinc mb-2 uppercase">{t("companyInfo.uid")}</div>
                <div className="text-[#FAFAFA] tabular-nums">CHE-178.795.076</div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="text-zinc mb-2 uppercase">{t("companyInfo.address")}</div>
                <div className="text-[#FAFAFA]">
                  Avenue de Jurigoz 15<br />
                  1006 Lausanne, Switzerland
                </div>
              </div>
              <div>
                <div className="text-zinc mb-2 uppercase">{t("companyInfo.country")}</div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#DC2626] flex items-center justify-center">
                    <div className="relative w-3 h-3">
                      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white -translate-y-1/2" />
                      <div className="absolute left-1/2 top-0 w-[2px] h-full bg-white -translate-x-1/2" />
                    </div>
                  </div>
                  <span className="text-[#FAFAFA]">{t("companyInfo.countryValue")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-l-2 border-[#DC2626] pl-8 py-2 bg-transparent">
          <h2 className="text-xl font-bold text-[#FAFAFA] mb-4 font-mono uppercase tracking-wider">{t("purpose.title")}</h2>
          <p className="text-zinc leading-relaxed max-w-3xl">
            {t("purpose.content")}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
