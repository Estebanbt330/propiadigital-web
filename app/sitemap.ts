import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://propiadigital.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${BASE_URL}/${locale}`]),
  );

  return routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}
