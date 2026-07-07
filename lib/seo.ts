import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/lib/i18n/routing";
import { locales, type Locale } from "@/lib/i18n/config";

export const BASE_URL = "https://clashware.com";

const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  de: "de_CH",
  it: "it_CH",
};

export type SeoPage = "home" | "about" | "contact" | "terms" | "privacy";

function ogAlternateLocales(locale: string): string[] {
  const out: string[] = [];
  for (const l of locales) {
    if (l !== locale) out.push(OG_LOCALES[l]);
  }
  return out;
}

/** Absolute URL for a route in a given locale, honoring localePrefix "as-needed". */
export function absoluteUrl(locale: string, href: string): string {
  return `${BASE_URL}${getPathname({ locale, href })}`;
}

/** hreflang map (all locales + x-default) for a route. */
export function languageAlternates(href: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = absoluteUrl(l, href);
  }
  languages["x-default"] = absoluteUrl("en", href);
  return languages;
}

/** Full per-page metadata (title, description, canonical, hreflang, OG, Twitter) from the seo.* namespace. */
export async function buildPageMetadata(
  locale: string,
  page: SeoPage,
  href: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const url = absoluteUrl(locale, href);

  return {
    // The home title is the full brand line; skip the "%s | Clashware" template there.
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(href),
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Clashware",
      title,
      description,
      locale: OG_LOCALES[locale as Locale] ?? "en_US",
      alternateLocale: ogAlternateLocales(locale),
      images: [
        {
          url: "/logo/clashware-small.png",
          width: 1200,
          height: 630,
          alt: "Clashware - Swiss Precision. Bold Innovation.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** WebPage (+ BreadcrumbList for subpages) JSON-LD for a route. */
export async function buildPageJsonLd(
  locale: string,
  page: SeoPage,
  href: string,
): Promise<object> {
  const t = await getTranslations({ locale, namespace: "seo" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const url = absoluteUrl(locale, href);

  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: t(`${page}.title`),
    description: t(`${page}.description`),
    inLanguage: locale,
    isPartOf: { "@id": `${BASE_URL}/#website` },
  };

  const graph: object[] = [webPage];

  if (href !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: tFooter("home"),
          item: absoluteUrl(locale, "/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: t(`${page}.title`),
          item: url,
        },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
