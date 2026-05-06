import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { routing } from "@/lib/i18n/routing";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.metadata as MetadataMessages;
  const baseUrl = meta.siteUrl || "https://clashware.com";

  return {
    metadataBase: new URL(baseUrl),
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
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      url: baseUrl,
      siteName: "Clashware",
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: meta.ogImage || "/logo/clashware-small.png",
          width: 1200,
          height: 630,
          alt: "Clashware - Swiss Precision. Bold Innovation.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      site: meta.twitterHandle,
      creator: meta.twitterHandle,
      images: [meta.ogImage || "/logo/clashware-small.png"],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
        "x-default": `${baseUrl}/en`,
      },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Clashware",
    legalName: "Clashware Sàrl",
    url: meta.siteUrl || "https://clashware.com",
    logo: `${meta.siteUrl || "https://clashware.com"}/logo/clashware-logo.png`,
    description: meta.description,
    foundingDate: "2025",
    founders: [
      {
        "@type": "Person",
        name: "Kamyar Taher",
        jobTitle: "Co-founder & CEO",
      },
      {
        "@type": "Person",
        name: "Bastien Faivre",
        jobTitle: "Co-founder & Systems Engineer",
      },
      {
        "@type": "Person",
        name: "Nils Delage",
        jobTitle: "Co-founder & Full-Stack Developer",
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

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} bg-[#0A0A0F] text-[#FAFAFA] antialiased font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
