import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import { buildPageMetadata, buildPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Database, Eye, Lock, Mail } from "lucide-react";
import { Link } from "@/lib/i18n/routing";

const contactLink = (chunks: React.ReactNode) => (
  <Link
    href="/contact"
    className="text-[#D03232] hover:underline underline-offset-4"
  >
    {chunks}
  </Link>
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "privacy", "/privacy");
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tAbout, jsonLd] = await Promise.all([
    getTranslations({ locale, namespace: "privacy" }),
    getTranslations({ locale, namespace: "about" }),
    buildPageJsonLd(locale, "privacy", "/privacy"),
  ]);

  const dataUsageItems = t.raw("useOfData.items") as string[];


  return (
    <PageLayout>
      <JsonLd data={jsonLd} />
      <div className="bg-[#0A0A0F] text-[#FAFAFA] min-h-screen font-sans">
        <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-8 h-8 text-[#FAFAFA]" />
              <h1 className="text-3xl md:text-4xl font-mono uppercase tracking-tight text-[#FAFAFA]">
                {t("title")}
              </h1>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#D03232]">
              {t("lastUpdated")}
            </div>
          </header>

          <Card className="bg-transparent border-[#27272A] rounded-none shadow-none mb-12">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Lock className="w-5 h-5 text-[#FAFAFA] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#D03232] mb-3">
                    {t("summary.title")}
                  </h3>
                  <p className="max-w-prose leading-relaxed">
                    {t("summary.content")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-12 divide-y divide-[#27272A]">
            <section className="pt-0">
              <p className="max-w-prose leading-relaxed">
                {t("intro")}
              </p>
            </section>

            <section className="pt-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D03232]">01</span>
                <Database className="w-5 h-5 text-[#FAFAFA]" />
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#D03232]">
                  {t("collection.title")}
                </h2>
              </div>
              <p className="max-w-prose leading-relaxed">
                {t("collection.content")}
              </p>
            </section>

            <section className="pt-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D03232]">02</span>
                <Eye className="w-5 h-5 text-[#FAFAFA]" />
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#D03232]">
                  {t("useOfData.title")}
                </h2>
              </div>
              <p className="max-w-prose leading-relaxed mb-6">
                {t("useOfData.intro")}
              </p>
              <ul className="space-y-4 max-w-prose">
                {dataUsageItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#D03232] mt-1.5 flex-shrink-0">-</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="pt-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D03232]">03</span>
                <Shield className="w-5 h-5 text-[#FAFAFA]" />
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#D03232]">
                  {t("security.title")}
                </h2>
              </div>
              <p className="max-w-prose leading-relaxed">
                {t("security.content")}
              </p>
            </section>

            <section className="pt-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D03232]">04</span>
                <Mail className="w-5 h-5 text-[#FAFAFA]" />
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#D03232]">
                  {t("contactUs.title")}
                </h2>
              </div>
              <p className="max-w-prose leading-relaxed">
                {t.rich("contactUs.content", { link: contactLink })}
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#27272A]">
            <div className="flex items-center justify-center gap-2 text-[#FAFAFA] text-sm font-mono">
              <div className="w-4 h-4 bg-[#D03232] flex items-center justify-center">
                <div className="relative w-2.5 h-2.5">
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#FAFAFA] -translate-y-1/2" />
                  <div className="absolute left-1/2 top-0 w-[2px] h-full bg-[#FAFAFA] -translate-x-1/2" />
                </div>
              </div>
              Clashware Sàrl, Lausanne, {tAbout("companyInfo.countryValue")}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
