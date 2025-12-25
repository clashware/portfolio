import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import { Building2, Target, Globe, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    { label: t("stats.founded"), value: "2023", icon: Building2 },
    { label: t("stats.products"), value: "3", icon: Target },
    { label: t("stats.focusAreas"), value: t("stats.focusAreasValue"), icon: Globe },
    { label: t("stats.team"), value: t("stats.teamValue"), icon: Users },
  ];

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-snow mb-6 tracking-tight">
            {t("title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-light">
              {t("title").split(" ").slice(-1)}
            </span>
          </h1>
          <p className="text-xl text-zinc max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-slate-dark border-edge">
                <CardContent className="p-6 text-center">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-brand-primary" />
                  <div className="text-2xl font-bold text-snow mb-1">{stat.value}</div>
                  <div className="text-sm text-zinc">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-snow mb-4">{t("mission.title")}</h2>
            <p className="text-zinc leading-relaxed">
              {t("mission.content")}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-snow mb-4">{t("vision.title")}</h2>
            <p className="text-zinc leading-relaxed">
              {t("vision.content")}
            </p>
          </div>
        </div>

        {/* Company Info Card */}
        <Card className="bg-slate-dark border-edge mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-snow mb-6">{t("companyInfo.title")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-zinc mb-1">{t("companyInfo.legalName")}</div>
                  <div className="text-snow font-medium">Clashware Sàrl</div>
                </div>
                <div>
                  <div className="text-sm text-zinc mb-1">{t("companyInfo.legalForm")}</div>
                  <div className="text-snow font-medium">{t("companyInfo.legalFormValue")}</div>
                </div>
                <div>
                  <div className="text-sm text-zinc mb-1">{t("companyInfo.uid")}</div>
                  <div className="text-snow font-medium">CHE-178.795.076</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-zinc mb-1">{t("companyInfo.address")}</div>
                  <div className="text-snow font-medium">
                    Avenue de Jurigoz 15<br />
                    1006 Lausanne, Switzerland
                  </div>
                </div>
                <div>
                  <div className="text-sm text-zinc mb-1">{t("companyInfo.country")}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-brand-primary rounded-sm flex items-center justify-center">
                      <div className="relative w-2.5 h-2.5">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-snow -translate-y-1/2" />
                        <div className="absolute left-1/2 top-0 w-0.5 h-full bg-snow -translate-x-1/2" />
                      </div>
                    </div>
                    <span className="text-snow font-medium">{t("companyInfo.countryValue")}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purpose Section */}
        <div className="bg-gradient-to-r from-brand-primary/10 to-brand-light/10 rounded-2xl p-8 border border-brand-primary/20">
          <h2 className="text-2xl font-bold text-snow mb-4">{t("purpose.title")}</h2>
          <p className="text-zinc leading-relaxed">
            {t("purpose.content")}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
