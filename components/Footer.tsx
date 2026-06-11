import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");

  const links = [
    { href: "#inicio", label: t("home") },
    { href: "#planes", label: t("plans") },
    { href: "#contacto", label: t("contact") },
  ];

  return (
    <footer className="bg-petrol text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col items-center sm:items-start">
            <span className="flex flex-col items-center leading-none sm:items-start">
              <span className="font-display text-5xl font-bold tracking-tight text-accent">
                PROPIA
              </span>
              <span className="mt-2 font-sans text-lg font-medium uppercase tracking-[0.5em] text-white">
                DIGITAL
              </span>
            </span>
            <p className="mt-5 max-w-xs text-center text-sm text-white/60 sm:text-left">
              {t("madeFor")}
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/80 transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/privacy"
              className="text-sm text-white/80 transition-colors hover:text-accent"
            >
              {t("privacy")}
            </Link>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          {t("rights")}
        </div>
      </div>
    </footer>
  );
}
