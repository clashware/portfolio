import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import { buildPageMetadata, buildPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, jsonLd] = await Promise.all([
    getTranslations({ locale, namespace: "contact" }),
    buildPageJsonLd(locale, "contact", "/contact"),
  ]);

  const contactMethods = [
    {
      icon: Mail,
      title: t("email.title"),
      value: "contact@clashware.com",
      href: "mailto:contact@clashware.com",
      description: t("email.description"),
    },
    {
      icon: Phone,
      title: t("phone.title"),
      value: "+41 79 580 78 99",
      href: "tel:+41795807899",
      description: t("phone.description"),
    },
    {
      icon: MapPin,
      title: t("office.title"),
      value: "Lausanne, Switzerland",
      href: "https://maps.google.com/?q=Avenue+de+Jurigoz+15,+1006+Lausanne",
      description: t("office.description"),
    },
    {
      icon: Clock,
      title: t("hours.title"),
      value: t("hours.value"),
      href: null,
      description: t("hours.description"),
    },
  ];

  return (
    <PageLayout>
      <JsonLd data={jsonLd} />
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-24 flex flex-col md:flex-row gap-8 justify-between items-start md:items-end">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="text-[#FAFAFA]">{t("title").split(" ").slice(0, -1).join(" ")} </span>
            <span className="text-[#D03232]">
              {t("title").split(" ").slice(-1)}
            </span>
          </h1>
          <p className="text-lg text-zinc max-w-md">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 border-t border-l border-[#27272A] mb-24">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.title} className="p-8 border-b border-r border-[#27272A] bg-transparent">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#D03232]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-zinc mb-2">{method.title}</h3>
                    {method.href ? (
                      <a
                        href={method.href}
                        target={method.href.startsWith("http") ? "_blank" : undefined}
                        rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-mono text-[#FAFAFA] hover:text-[#D03232] transition-colors block mb-2"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="font-mono text-[#FAFAFA] block mb-2">{method.value}</span>
                    )}
                    <p className="text-sm text-zinc">{method.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-transparent border border-[#27272A] p-8 md:p-12 text-center flex flex-col items-center">
          <h2 className="text-2xl font-bold text-[#FAFAFA] mb-4 font-mono uppercase tracking-wider">
            {t("cta.title")}
          </h2>
          <p className="text-zinc mb-8 max-w-xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <a 
            href="mailto:contact@clashware.com"
            className="inline-flex items-center gap-2 border border-[#27272A] px-8 py-4 font-mono uppercase tracking-wider text-[#FAFAFA] hover:border-[#D03232] hover:text-[#D03232] transition-colors"
          >
            <Mail className="w-4 h-4" />
            {t("cta.button")}
          </a>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 border border-[#27272A] bg-transparent px-4 py-2 font-mono text-sm text-[#FAFAFA]">
            <div className="w-4 h-4 bg-[#D03232] flex items-center justify-center">
              <div className="relative w-2 h-2">
                <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-white -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 w-[1.5px] h-full bg-white -translate-x-1/2" />
              </div>
            </div>
            {t("location")}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
