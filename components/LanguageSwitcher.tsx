"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { TbWorld, TbChevronDown } from "react-icons/tb";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
};

const SHORT: Record<string, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
};

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function change(next: string) {
    setOpen(false);
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- pathname params are passed through
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Language"
        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          dark
            ? "text-white/90 hover:bg-white/10"
            : "text-ink/80 hover:bg-ink/5"
        }`}
      >
        <TbWorld className="h-4 w-4" />
        <span>{SHORT[locale]}</span>
        <TbChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-black/5 bg-white shadow-lg">
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => change(l)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-cream ${
                l === locale ? "font-semibold text-petrol" : "text-ink/80"
              }`}
            >
              {LABELS[l]}
              <span className="text-xs text-muted">{SHORT[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
