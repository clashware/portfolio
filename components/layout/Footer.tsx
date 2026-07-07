"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { TwitterIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

const products = [
  { name: "Metacube", href: "https://metacube.games" },
  { name: "Bonega.ai", href: "https://bonega.ai" },
  { name: "Coira.io", href: "https://coira.io" },
  { name: "WaiverKit", href: "https://waiverkit.io" },
];

const currentYear = new Date().getFullYear();

const social = [
  { name: "Twitter", href: "https://x.com/clashware", icon: TwitterIcon },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tHero = useTranslations("hero");
  const tAbout = useTranslations("about");

  const legal = [
    { name: t("termsOfService"), href: "/terms" },
    { name: t("privacyPolicy"), href: "/privacy" },
  ];

  return (
    <footer className="bg-obsidian border-t border-[#27272A] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#27272A] border-b border-[#27272A]">
          <div className="col-span-1 md:col-span-2 p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo/clashware-small.png"
                  alt="Clashware"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-none grayscale"
                />
                <span className="text-snow font-bold text-xl uppercase tracking-widest">Clashware</span>
              </Link>

              <p className="text-[#A1A1AA] text-xs mb-8 max-w-sm uppercase leading-relaxed">
                {t("description")}
              </p>
            </div>

            <div>
              <div className="inline-flex items-center border border-[#27272A] px-3 py-1.5 mb-6 bg-[#18181B]">
                <span className="text-xs uppercase text-[#FAFAFA] tracking-widest">{tHero("epflBadge")}</span>
              </div>
              
              <div className="text-[#A1A1AA] text-xs space-y-1 uppercase tracking-widest">
                <p>Clashware Sàrl</p>
                <p>Avenue de Jurigoz 15</p>
                <p>1006 Lausanne, {tAbout("companyInfo.countryValue")}</p>
                <p className="mt-2 text-[#E05656]">CHE-178.795.076</p>
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <h3 className="text-snow font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#D03232] pl-3">{t("products")}</h3>
            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors text-xs uppercase tracking-wider"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 lg:p-12">
            <h3 className="text-snow font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#D03232] pl-3">{t("navigation")}</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors text-xs uppercase tracking-wider"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors text-xs uppercase tracking-wider"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors text-xs uppercase tracking-wider"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-8 lg:p-12">
            <h3 className="text-snow font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#D03232] pl-3">{t("legal")}</h3>
            <ul className="space-y-4 mb-10">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors text-xs uppercase tracking-wider"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-snow font-bold mb-6 uppercase text-xs tracking-widest border-l-2 border-[#D03232] pl-3">{t("social")}</h3>
            <div className="flex gap-3">
              {social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#27272A] p-2 rounded-none text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#FAFAFA] hover:bg-[#18181B] transition-all"
                    aria-label={item.name}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>

            <div className="mt-8">
              <Button
                variant="outline"
                className="w-full border border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B] rounded-none font-mono text-xs uppercase tracking-wider"
                asChild
              >
                <a href="/api/brand-guidelines" download>
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t("brandGuidelines")}
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[#A1A1AA] text-xs uppercase tracking-widest">
          <p>
            {t("copyright", { year: currentYear })}
          </p>

          <div className="flex items-center gap-4">
            <p>STACK // NEXT.JS . REACT_19 . TW_4</p>
            <div className="hidden md:block w-px h-3 bg-[#27272A]" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#D03232] rounded-none flex items-center justify-center">
                <div className="relative w-1.5 h-1.5">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-snow -translate-y-1/2" />
                  <div className="absolute left-1/2 top-0 w-[1px] h-full bg-snow -translate-x-1/2" />
                </div>
              </div>
              {t("madeIn")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
