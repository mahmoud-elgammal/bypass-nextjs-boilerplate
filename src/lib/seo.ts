import { NextIntlConfig } from "@/i18n/config";
import type { DefaultSeoProps } from "next-seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const defaultSeo: DefaultSeoProps = {
  titleTemplate: "%s | next-edge",
  defaultTitle: "Next Edge — Minimal Next.js Starter",
  description: "A clean, minimalist Next.js starter with Tailwind and dark mode.",
  openGraph: {
    type: "website",
    locale: NextIntlConfig.defaultLocale,
    url: siteUrl,
    site_name: "next-edge",
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

