"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { TbArrowRight } from "react-icons/tb";

const MIN = 5000;
const MAX = 150000;
const STEP = 1000;
const DEFAULT = 35000;

// Yearly cost with Propia Digital (Professional annual plan reference).
const PROPIA_YEARLY = 1560;
const AIRBNB_RATE = 0.2;

export default function Calculator() {
  const t = useTranslations("Calculator");
  const locale = useLocale();
  const [value, setValue] = useState(DEFAULT);

  const fmt = (n: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  const airbnbFee = value * AIRBNB_RATE;
  const savings = Math.max(0, airbnbFee - PROPIA_YEARLY);
  const pct = ((value - MIN) / (MAX - MIN)) * 100;

  return (
    <section className="bg-petrol py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-white/70">{t("subtitle")}</p>
        </div>

        <div className="mt-12 rounded-2xl bg-petrol-dark/60 p-7 ring-1 ring-white/10 sm:p-10">
          <label className="flex flex-col gap-4">
            <span className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-base text-white/80">{t("sliderLabel")}</span>
              <span className="font-display text-3xl font-bold text-white">
                {fmt(value)}
              </span>
            </span>
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={STEP}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="savings-slider"
              style={{
                background: `linear-gradient(to right, #e8843a 0%, #e8843a ${pct}%, rgba(255,255,255,0.25) ${pct}%, rgba(255,255,255,0.25) 100%)`,
              }}
            />
          </label>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white/5 p-5">
              <p className="text-sm text-white/60">{t("airbnbLabel")}</p>
              <p className="mt-1 text-2xl font-bold text-white">
                -{fmt(airbnbFee)}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-5">
              <p className="text-sm text-white/60">{t("propiaLabel")}</p>
              <p className="mt-1 text-2xl font-bold text-white">
                -{fmt(PROPIA_YEARLY)}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-accent/10 p-6 text-center ring-1 ring-accent/30">
            <p className="text-sm uppercase tracking-wide text-accent">
              {t("savingsLabel")}
            </p>
            <p className="mt-1 font-display text-5xl font-bold text-accent sm:text-6xl">
              {fmt(savings)}
            </p>
          </div>

          <div className="mt-8 text-center">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-accent-dark hover:shadow-xl"
            >
              {t("cta")}
              <TbArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
