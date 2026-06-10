import { useTranslations } from "next-intl";
import { TbLockOff, TbReceiptTax, TbUsersGroup } from "react-icons/tb";
import type { IconType } from "react-icons";

type Card = { title: string; text: string };

const ICONS: IconType[] = [TbLockOff, TbReceiptTax, TbUsersGroup];

export default function Problem() {
  const t = useTranslations("Problem");
  const cards = t.raw("cards") as Card[];

  return (
    <section id="problema" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-petrol sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("subtitle")}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                className="rounded-lg border border-black/5 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-ink">{card.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{card.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
