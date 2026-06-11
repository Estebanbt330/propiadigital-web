import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.propiadigital.com";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildAlternateLinks(): string {
  const links = routing.locales.map(
    (locale) =>
      `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(`${BASE_URL}/${locale}`)}" />`,
  );

  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${BASE_URL}/${routing.defaultLocale}`)}" />`,
  );

  return links.join("\n");
}

export function GET(): Response {
  const lastModified = new Date().toISOString();
  const alternateLinks = buildAlternateLinks();

  const urls = routing.locales
    .map((locale) => {
      const loc = escapeXml(`${BASE_URL}/${locale}`);
      const priority = locale === routing.defaultLocale ? "1.0" : "0.9";

      return `  <url>
    <loc>${loc}</loc>
${alternateLinks}
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
