import type { DefaultSeoProps } from "next-seo";
import { NextIntlConfig } from "@/i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const defaultSeo: DefaultSeoProps = {
  titleTemplate: "%s | bypass",
  defaultTitle: "Bypass — High-Performance Next.js Boilerplate",
  description:
    "The elite Next.js 15 starter to bypass the boring setup. Optimized for edge performance with clean architecture.",
  openGraph: {
    type: "website",
    locale: NextIntlConfig.defaultLocale,
    url: siteUrl,
    site_name: "bypass",
  },
  twitter: {
    cardType: "summary_large_image",
  },
};
