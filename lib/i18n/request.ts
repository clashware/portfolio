import { getRequestConfig } from "next-intl/server";
import { locales, type Locale } from "./config";

// Static import paths (one per locale) so the bundler can code-split each
// messages file into its own chunk; a template-literal path cannot be split.
const messageImports: Record<Locale, () => Promise<{ default: unknown }>> = {
  en: () => import("@/messages/en.json"),
  fr: () => import("@/messages/fr.json"),
  de: () => import("@/messages/de.json"),
  it: () => import("@/messages/it.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale =
    requested && locales.includes(requested as Locale)
      ? (requested as Locale)
      : "en";

  return {
    locale,
    messages: (await messageImports[locale]()).default as Record<string, unknown>,
  };
});
