import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Database, Eye, Lock, Mail } from "lucide-react";
import { Link } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: `${t("title")} | Clashware`,
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });

  const dataUsageItems = t.raw("useOfData.items") as string[];

  return (
    <PageLayout>
      <div className="bg-[#0A0A0F] text-[#FAFAFA] min-h-screen font-sans">
        <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-8 h-8 text-[#FAFAFA]" />
              <h1 className="text-3xl md:text-4xl font-mono uppercase tracking-tight text-[#FAFAFA]">
                {t("title")}
              </h1>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#DC2626]">
              {t("lastUpdated")}
            </div>
          </header>

          <Card className="bg-transparent border-[#27272A] rounded-none shadow-none mb-12">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Lock className="w-5 h-5 text-[#FAFAFA] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#DC2626] mb-3">
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
                <span className="font-mono text-xs uppercase tracking-widest text-[#DC2626]">01</span>
                <Database className="w-5 h-5 text-[#FAFAFA]" />
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#DC2626]">
                  {t("collection.title")}
                </h2>
              </div>
              <p className="max-w-prose leading-relaxed">
                {t("collection.content")}
              </p>
            </section>

            <section className="pt-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#DC2626]">02</span>
                <Eye className="w-5 h-5 text-[#FAFAFA]" />
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#DC2626]">
                  {t("useOfData.title")}
                </h2>
              </div>
              <p className="max-w-prose leading-relaxed mb-6">
                {t("useOfData.intro")}
              </p>
              <ul className="space-y-4 max-w-prose">
                {dataUsageItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#DC2626] mt-1.5 flex-shrink-0">-</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="pt-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#DC2626]">03</span>
                <Shield className="w-5 h-5 text-[#FAFAFA]" />
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#DC2626]">
                  {t("security.title")}
                </h2>
              </div>
              <p className="max-w-prose leading-relaxed">
                {t("security.content")}
              </p>
            </section>

            <section className="pt-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#DC2626]">04</span>
                <Mail className="w-5 h-5 text-[#FAFAFA]" />
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#DC2626]">
                  {t("contactUs.title")}
                </h2>
              </div>
              <p className="max-w-prose leading-relaxed">
                If you have any questions about this Privacy Policy, please{" "}
                <Link href="/contact" className="text-[#DC2626] hover:underline underline-offset-4">
                  contact us
                </Link>{" "}
                through our website.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#27272A]">
            <div className="flex items-center justify-center gap-2 text-[#FAFAFA] text-sm font-mono">
              <div className="w-4 h-4 bg-[#DC2626] flex items-center justify-center">
                <div className="relative w-2.5 h-2.5">
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#FAFAFA] -translate-y-1/2" />
                  <div className="absolute left-1/2 top-0 w-[2px] h-full bg-[#FAFAFA] -translate-x-1/2" />
                </div>
              </div>
              Clashware Sàrl, Lausanne, Switzerland
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
