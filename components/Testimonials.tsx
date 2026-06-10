import Image from "next/image";
import { useTranslations } from "next-intl";
import { TbStarFilled, TbQuote } from "react-icons/tb";

type Item = { name: string; city: string; text: string };

// Placeholder portraits — replace with real client photos when available.
const PHOTOS = [
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
];

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const items = t.raw("items") as Item[];

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-petrol sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("subtitle")}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative flex flex-col rounded-2xl border border-black/5 bg-cream/60 p-8 shadow-sm"
            >
              <TbQuote className="h-9 w-9 text-accent/30" />
              <p className="mt-3 flex-1 leading-relaxed text-ink/85">
                “{item.text}”
              </p>
              <div className="mt-5 flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, s) => (
                  <TbStarFilled key={s} className="h-4 w-4" />
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 border-t border-black/5 pt-5">
                <Image
                  src={PHOTOS[i]}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="text-sm text-muted">{item.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
