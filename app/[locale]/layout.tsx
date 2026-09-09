import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { BASE_URL, buildPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import MotionProvider from "@/components/providers/MotionProvider";
import { fontClasses } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface MetadataMessages {
  title: string;
  titleTemplate: string;
  description: string;
  keywords: string;
  author: string;
  ogImage: string;
  twitterHandle: string;
  siteUrl: string;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0F",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.metadata as MetadataMessages;

  // Per-page canonical/hreflang/OG come from each page's generateMetadata
  // (via buildPageMetadata); the layout provides home-equivalent fallbacks.
  const homeDefaults = await buildPageMetadata(locale, "home", "/");

  return {
    metadataBase: new URL(BASE_URL),
    ...homeDefaults,
    title: {
      default: meta.title,
      template: meta.titleTemplate,
    },
    description: meta.description,
    keywords: meta.keywords?.split(", ") || [],
    authors: [{ name: meta.author }],
    creator: meta.author,
    publisher: meta.author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      site: meta.twitterHandle,
      creator: meta.twitterHandle,
      images: [meta.ogImage || "/logo/clashware-small.png"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.json",
    category: "technology",
    classification: "Business",
    other: {
      "geo.region": "CH-VD",
      "geo.placename": "Lausanne",
      "geo.position": "46.5197;6.6323",
      ICBM: "46.5197, 6.6323",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const meta = messages.metadata as MetadataMessages;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Clashware",
    legalName: "Clashware Sàrl",
    url: BASE_URL,
    logo: `${BASE_URL}/logo/clashware-logo.png`,
    description: meta.description,
    foundingDate: "2025",
    founders: [
      {
        "@type": "Person",
        name: "Kamyar Taher",
        jobTitle: "Founder & CEO",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenue de Jurigoz 15",
      addressLocality: "Lausanne",
      postalCode: "1006",
      addressCountry: "CH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@clashware.com",
    },
    sameAs: [
      "https://x.com/clashware",
      "https://linkedin.com/company/107706302",
      "https://github.com/clashware",
    ],
    knowsAbout: [
      "Gaming",
      "Artificial Intelligence",
      "Cryptocurrency",
      "Blockchain",
    ],
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Clashware",
    url: BASE_URL,
    description: meta.description,
    inLanguage: locale,
    publisher: { "@id": `${BASE_URL}/#organization` },
  };

  return (
    <html lang={locale} className="dark">
      <head>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd} />
      </head>
      <body
        className={`${fontClasses} bg-[#0A0A0F] text-[#FAFAFA] antialiased font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
