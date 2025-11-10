import { createI18nClient } from "next-international/client";

export const { useI18n, I18nProviderClient, useScopedI18n } = createI18nClient({
  en: () => import("./dictionaries/en"),
  ar: () => import("./dictionaries/ar"),
});
