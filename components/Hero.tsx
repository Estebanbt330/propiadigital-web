import Image from "next/image";
import { useTranslations } from "next-intl";
import Logo from "./Logo";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section id="inicio" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
      <Image
        src="/images/hero-sunset-punta-del-este.jpg"
        alt="Punta del Este, Uruguay — vista aérea al atardecer"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="animate-ken-burns object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[80px]"
        style={{
          background: "linear-gradient(to bottom, transparent 75%, #FAF7F2 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-up mb-4 sm:mb-8">
          <Logo variant="hero" />
        </div>

        <h1 className="animate-fade-up max-w-full text-balance text-[clamp(1.9rem,7vw,2.4rem)] font-bold leading-tight text-white drop-shadow-md lg:whitespace-nowrap lg:text-[clamp(2.25rem,4.2vw,3.75rem)] lg:leading-[1.1]">
          {t("title")}
        </h1>

        <p className="animate-fade-up mt-4 max-w-2xl text-base text-white/90 drop-shadow sm:mt-6 sm:text-lg">
          {t("subtitle")}
        </p>

        <a
          href="#contacto"
          className="animate-fade-up mt-5 inline-flex items-center rounded-lg bg-accent px-9 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-accent-dark hover:shadow-xl sm:mt-9 sm:text-lg"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
