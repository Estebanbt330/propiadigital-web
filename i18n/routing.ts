import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "pt"],
  defaultLocale: "es",
  pathnames: {
    "/": "/",
    "/privacy": {
      es: "/privacidad",
      en: "/privacy",
      pt: "/privacidade",
    },
  },
});
