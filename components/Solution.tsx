import { useTranslations } from "next-intl";
import { TbDeviceMobile, TbChartBar, TbMailFast, TbHeartHandshake } from "react-icons/tb";
import type { IconType } from "react-icons";

type Benefit = { title: string; text: string };

const ICONS: IconType[] = [TbDeviceMobile, TbChartBar, TbMailFast, TbHeartHandshake];

export default function Solution() {
  const t = useTranslations("Solution");
  const benefits = t.raw("benefits") as Benefit[];

  return (
    <section id="solucion" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-petrol sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("subtitle")}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {benefits.map((b, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                className="flex gap-5 rounded-lg border border-black/5 bg-cream/60 p-7 transition-colors hover:bg-cream"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-petrol text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink">{b.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{b.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
