"use client";

import Image from "next/image";
import { Twitter, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

const products = [
  { name: "Metacube", href: "https://metacube.games" },
  { name: "Bonega.ai", href: "https://bonega.ai" },
  { name: "Coira.io", href: "https://coira.io" },
];

const social = [
  { name: "Twitter", href: "https://x.com/clashware", icon: Twitter },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/107706302/",
    icon: Linkedin,
  },
];

export default function Footer() {
  const t = useTranslations("footer");

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("navigation"), href: "/about" },
    { name: t("navigation"), href: "/contact" },
  ];

  const legal = [
    { name: t("termsOfService"), href: "/terms" },
    { name: t("privacyPolicy"), href: "/privacy" },
  ];

  return (
    <footer className="bg-slate-dark border-t border-edge">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo/clashware-icon.png"
                alt="Clashware"
                width={32}
                height={32}
                className="rounded-lg w-8 h-8 object-contain"
              />
              <span className="text-snow font-semibold text-lg">Clashware</span>
            </Link>

            <p className="text-zinc text-sm mb-4 max-w-xs">
              {t("description")}
            </p>

            <div className="text-stone text-sm space-y-1">
              <p>Clashware Sàrl</p>
              <p>Avenue de Jurigoz 15</p>
              <p>1006 Lausanne, Switzerland</p>
            </div>

            {/* Brand Guidelines Download */}
            <div className="mt-6">
              <Button
                variant="outline"
                size="sm"
                className="border-edge text-zinc hover:text-snow hover:bg-slate-elevated rounded-lg"
                asChild
              >
                <a href="/api/brand-guidelines" download>
                  <Download className="w-4 h-4 mr-2" />
                  {t("brandGuidelines")}
                </a>
              </Button>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-snow font-semibold mb-4">{t("navigation")}</h3>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc hover:text-snow transition-colors text-sm"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-snow font-semibold mb-4">{t("navigation")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-zinc hover:text-snow transition-colors text-sm"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-zinc hover:text-snow transition-colors text-sm"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc hover:text-snow transition-colors text-sm"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-snow font-semibold mb-4">{t("legal")}</h3>
            <ul className="space-y-3 mb-6">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-zinc hover:text-snow transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-snow font-semibold mb-4">{t("social")}</h3>
            <div className="flex gap-3">
              {social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-elevated flex items-center justify-center text-zinc hover:text-snow hover:bg-slate-elevated/80 transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-edge" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone text-sm">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>

          {/* Swiss Badge */}
          <div className="flex items-center gap-2 text-stone text-sm">
            <div className="w-4 h-4 bg-brand-primary rounded-sm flex items-center justify-center">
              <div className="relative w-2.5 h-2.5">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-snow -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-snow -translate-x-1/2" />
              </div>
            </div>
            {t("madeIn")}
          </div>
        </div>
      </div>
    </footer>
  );
}
