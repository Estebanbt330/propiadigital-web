import { useTranslations } from "next-intl";
import { TbCheck, TbStar } from "react-icons/tb";
import { whatsappUrl } from "@/lib/constants";

type Plan = { name: string; price: string; features: string[] };

const PLAN_KEYS = ["essential", "professional", "premium"] as const;

export default function Pricing() {
  const t = useTranslations("Pricing");
  const tw = useTranslations("Whatsapp");

  return (
    <section id="planes" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-petrol sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("subtitle")}</p>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {PLAN_KEYS.map((key) => {
            const plan = t.raw(`plans.${key}`) as Plan;
            const popular = key === "professional";
            return (
              <div
                key={key}
                className={`relative flex h-full flex-col rounded-2xl border p-8 transition-shadow ${
                  popular
                    ? "border-accent bg-white shadow-xl lg:-mt-4 lg:mb-4"
                    : "border-black/5 bg-white shadow-sm hover:shadow-md"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white shadow">
                    <TbStar className="h-3.5 w-3.5" />
                    {t("popular")}
                  </span>
                )}

                <h3 className="text-xl font-bold text-petrol">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold text-ink">
                    {plan.price}
                  </span>
                  <span className="text-muted">{t("perMonth")}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{t("setup")}</p>

                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <TbCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm leading-relaxed text-ink/80">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappUrl(`${tw("prefill")} (${plan.name})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 block rounded-lg px-6 py-3.5 text-center text-base font-semibold transition-all ${
                    popular
                      ? "bg-accent text-white shadow-md hover:bg-accent-dark hover:shadow-lg"
                      : "bg-petrol text-white hover:bg-petrol-dark"
                  }`}
                >
                  {t("cta")}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
