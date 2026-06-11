"use client";

import { useActionState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { TbBrandWhatsapp, TbMail, TbCircleCheck, TbAlertTriangle, TbSend } from "react-icons/tb";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/constants";
import { Link } from "@/i18n/navigation";

const initial: ContactState = { status: "idle" };

export default function Contact() {
  const t = useTranslations("Contact");
  const tw = useTranslations("Whatsapp");
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(submitContact, initial);

  const inputClass =
    "w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <section id="contacto" className="bg-cream py-12 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-petrol sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("subtitle")}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {state.status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-accent/20 bg-white p-10 text-center shadow-sm">
                <TbCircleCheck className="h-14 w-14 text-accent" />
                <p className="mt-4 text-lg font-medium text-ink">
                  {t("success")}
                </p>
              </div>
            ) : (
              <form
                action={formAction}
                className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm sm:p-8"
              >
                <input type="hidden" name="locale" value={locale} />
                <div className="grid gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">
                      {t("name")}
                    </label>
                    <input
                      name="name"
                      required
                      placeholder={t("namePlaceholder")}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink">
                        {t("email")}
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder={t("emailPlaceholder")}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink">
                        {t("whatsapp")}
                      </label>
                      <input
                        name="whatsapp"
                        placeholder={t("whatsappPlaceholder")}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">
                      {t("message")}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder={t("messagePlaceholder")}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {state.status === "error" && (
                    <p className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                      <TbAlertTriangle className="h-5 w-5 shrink-0" />
                      {t("error")}
                    </p>
                  )}

                  <label className="flex items-start gap-2.5 text-sm text-muted">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                    />
                    <span>
                      {t.rich("consent", {
                        link: (chunks) => (
                          <Link
                            href="/privacy"
                            className="font-medium text-petrol underline-offset-2 hover:underline"
                          >
                            {chunks}
                          </Link>
                        ),
                      })}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-accent-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <TbSend className="h-5 w-5" />
                    {pending ? t("sending") : t("submit")}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            <a
              href={whatsappUrl(tw("prefill"))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 rounded-2xl bg-[#25D366] p-7 text-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <TbBrandWhatsapp className="h-10 w-10" />
              <span className="mt-1 text-lg font-semibold">
                {t("whatsappButton")}
              </span>
              <span className="text-sm text-white/90">{WHATSAPP_DISPLAY}</span>
            </a>

            <div className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
              <TbMail className="h-10 w-10 text-petrol" aria-hidden />
              <span className="mt-1 text-sm text-muted">{t("emailLabel")}</span>
              <a
                href="mailto:hola@propiadigital.com"
                className="text-lg font-semibold text-petrol underline-offset-2 hover:underline"
              >
                hola@propiadigital.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
