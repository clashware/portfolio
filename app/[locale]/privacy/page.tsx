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
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-light flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-snow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-snow mb-4 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-zinc">{t("lastUpdated")}</p>
        </div>

        {/* Quick Summary */}
        <Card className="bg-slate-dark border-edge mb-12">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-brand-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-snow mb-2">{t("summary.title")}</h3>
                <p className="text-zinc text-sm">
                  {t("summary.content")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="space-y-12">
          <section>
            <p className="text-zinc leading-relaxed">
              {t("intro")}
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-brand-primary" />
              <h2 className="text-2xl font-bold text-snow">{t("collection.title")}</h2>
            </div>
            <p className="text-zinc leading-relaxed">
              {t("collection.content")}
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-brand-primary" />
              <h2 className="text-2xl font-bold text-snow">{t("useOfData.title")}</h2>
            </div>
            <p className="text-zinc leading-relaxed mb-4">
              {t("useOfData.intro")}
            </p>
            <ul className="space-y-3">
              {dataUsageItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-zinc">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-brand-primary" />
              <h2 className="text-2xl font-bold text-snow">{t("security.title")}</h2>
            </div>
            <p className="text-zinc leading-relaxed">
              {t("security.content")}
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-brand-primary" />
              <h2 className="text-2xl font-bold text-snow">{t("contactUs.title")}</h2>
            </div>
            <p className="text-zinc leading-relaxed">
              If you have any questions about this Privacy Policy, please{" "}
              <Link href="/contact" className="text-brand-light hover:text-brand-primary transition-colors">
                contact us
              </Link>{" "}
              through our website.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-edge">
          <div className="flex items-center justify-center gap-2 text-stone text-sm">
            <div className="w-4 h-4 bg-brand-primary rounded-sm flex items-center justify-center">
              <div className="relative w-2.5 h-2.5">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-snow -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-snow -translate-x-1/2" />
              </div>
            </div>
            Clashware Sàrl, Lausanne, Switzerland
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
