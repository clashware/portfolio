import type { MetadataRoute } from "next";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { locales } from "@/lib/i18n/config";

const routes = ["/", "/about", "/contact", "/terms", "/privacy"];

// Bump when page content meaningfully changes; avoids noisy per-build freshness signals.
const CONTENT_LAST_MODIFIED = new Date("2026-07-07");

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((href) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, href),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: href === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: href === "/" ? 1 : href === "/about" || href === "/contact" ? 0.8 : 0.5,
      alternates: {
        languages: languageAlternates(href),
      },
    })),
  );
}
