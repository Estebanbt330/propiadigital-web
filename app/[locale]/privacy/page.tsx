import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { TbArrowLeft } from "react-icons/tb";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL } from "@/lib/constants";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return { title: `${t("title")} — Propia Digital` };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  const sections = [
    { title: t("dataTitle"), text: t("dataText") },
    { title: t("useTitle"), text: t("useText") },
    { title: t("storageTitle"), text: t("storageText") },
    { title: t("operatorTitle"), text: t("operatorText") },
  ];

  return (
    <main className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-petrol transition-colors hover:text-accent"
        >
          <TbArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        <h1 className="mt-8 text-3xl font-bold text-petrol sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-muted">{t("updated")}</p>

        <p className="mt-8 text-lg leading-relaxed text-ink/85">{t("intro")}</p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-bold text-ink">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </section>
          ))}

          <section>
            <h2 className="text-xl font-bold text-ink">{t("deleteTitle")}</h2>
            <p className="mt-2 leading-relaxed text-muted">
              {t("deleteText")}{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-petrol underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
