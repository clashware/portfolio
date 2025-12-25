import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: `${t("title")} | Clashware`,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

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
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-snow mb-6 tracking-tight">
            {t("title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-light">
              {t("title").split(" ").slice(-1)}
            </span>
          </h1>
          <p className="text-xl text-zinc max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card key={method.title} className="bg-slate-dark border-edge hover:border-brand-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-light flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-snow" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-snow mb-1">{method.title}</h3>
                      {method.href ? (
                        <a
                          href={method.href}
                          target={method.href.startsWith("http") ? "_blank" : undefined}
                          rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-brand-light hover:text-brand-primary transition-colors font-medium"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <span className="text-snow font-medium">{method.value}</span>
                      )}
                      <p className="text-sm text-zinc mt-1">{method.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-brand-primary/10 to-brand-light/10 rounded-2xl p-8 md:p-12 border border-brand-primary/20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-snow mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-zinc mb-8 max-w-xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-brand-primary to-brand-light hover:from-brand-dark hover:to-brand-primary text-snow rounded-xl px-8"
            asChild
          >
            <a href="mailto:contact@clashware.com">
              <Mail className="w-5 h-5 mr-2" />
              {t("cta.button")}
            </a>
          </Button>
        </div>

        {/* Location Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-stone text-sm">
            <div className="w-4 h-4 bg-brand-primary rounded-sm flex items-center justify-center">
              <div className="relative w-2.5 h-2.5">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-snow -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-snow -translate-x-1/2" />
              </div>
            </div>
            {t("location")}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
