import { createI18nServer } from "next-international/server";

export { setStaticParamsLocale } from "next-international/server";

export const { getI18n, getScopedI18n, getCurrentLocale, getStaticParams } =
  createI18nServer({
    en: () => import("./dictionaries/en"),
    ar: () => import("./dictionaries/ar"),
  });
