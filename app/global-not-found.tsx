import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { fontClasses } from "./fonts";

// Next 16 routing-level 404 (experimental.globalNotFound). Serves every URL
// that matches no route — replaces the old app/[locale]/[...rest] catch-all,
// and unlike a notFound() throw it is fully server-rendered (vercel/next.js
// issue #62228 makes notFound() 404s client-rendered with an empty SSR body).
// It bypasses all layouts, so it must render <html>/<body> itself.
// Locale comes from the x-next-intl-locale header set by the next-intl proxy.
export const metadata: Metadata = {
  title: "404 | Clashware",
  robots: { index: false },
};

export default async function GlobalNotFound() {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-next-intl-locale");
  const locale = hasLocale(routing.locales, headerLocale)
    ? headerLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "notFound" });
  const homeHref = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return (
    <html lang={locale} className="dark">
      <body
        className={`${fontClasses} bg-[#0A0A0F] text-[#FAFAFA] antialiased font-sans`}
      >
        <div className="min-h-dvh flex items-center justify-center p-4">
          <div className="relative border border-[#27272A] p-8 w-full max-w-lg font-mono">
            <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-[#EF4444]" />
            <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-[#EF4444]" />
            <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-[#EF4444]" />
            <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-[#EF4444]" />

            <div className="mb-8">
              <h1 className="text-[#EF4444] text-xl font-bold mb-2">
                [ERR_404]
              </h1>
              <p className="text-[#A1A1AA] text-sm">{t("message")}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={homeHref}
                className="border border-[#EF4444] text-[#EF4444] bg-transparent px-4 py-2 rounded-none font-mono text-xs uppercase hover:bg-[#EF4444]/10 transition-colors inline-block"
              >
                {t("goHome")}
              </a>
              <div className="text-[#A1A1AA] text-xs">
                &gt; {t("redirecting")}
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
