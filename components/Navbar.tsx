"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { TbMenu2, TbX } from "react-icons/tb";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

export default function Navbar() {
  const t = useTranslations("Nav");
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY > 40;
      setVisible(scrolled);
      if (!scrolled) setMobileOpen(false);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#problema", label: t("problem") },
    { href: "#solucion", label: t("solution") },
    { href: "#planes", label: t("plans") },
    { href: "#contacto", label: t("contact") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-cream/95 shadow-sm backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-cream/85 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 sm:px-8">
        <a href="#inicio" className="flex items-center" aria-label="Propia Digital">
          <Logo variant="navbar" />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-ink/75 transition-colors hover:bg-ink/5 hover:text-petrol"
            >
              {l.label}
            </a>
          ))}
          <div className="mx-1">
            <LanguageSwitcher />
          </div>
          <a
            href="#contacto"
            className="ml-1 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-dark hover:shadow-md"
          >
            {t("cta")}
          </a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="rounded-lg p-2 text-ink transition-colors hover:bg-ink/5"
          >
            {mobileOpen ? <TbX className="h-6 w-6" /> : <TbMenu2 className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-black/5 bg-cream px-5 pb-5 pt-2 shadow-lg lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-petrol"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-lg bg-accent px-5 py-3 text-center text-base font-semibold text-white"
          >
            {t("cta")}
          </a>
        </div>
      )}
    </header>
  );
}
