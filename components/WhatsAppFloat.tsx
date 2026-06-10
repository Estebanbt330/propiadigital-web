"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { TbBrandWhatsapp } from "react-icons/tb";
import { whatsappUrl } from "@/lib/constants";

export default function WhatsAppFloat() {
  const tw = useTranslations("Whatsapp");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl(tw("prefill"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tw("aria")}
      className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <TbBrandWhatsapp className="h-8 w-8 sm:h-9 sm:w-9" />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
    </a>
  );
}
