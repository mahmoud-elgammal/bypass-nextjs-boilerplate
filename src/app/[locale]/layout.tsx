import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import ClientInit from "@/components/ClientInit";
import { NextIntlConfig } from "@/i18n/config";
import { I18nProviderClient } from "@/i18n/next-international.client";
import ServerSiteData from "@/providers/ServerSiteData";
import SWRProvider from "@/providers/SWRProvider.client";
import { getSiteInfo } from "@/queries/site";

// Load consent manager on client only to avoid SSR mismatch
const ConsentManager = dynamic(() => import("@/components/ConsentManager"));
const ConsentControl = dynamic(() => import("@/components/ConsentControl"));
const Analytics = dynamic(() => import("@/components/Analytics"));

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = NextIntlConfig.rtl.includes(locale) ? "rtl" : "ltr";
  const site = await getSiteInfo();

  return (
    <div dir={dir}>
      <SWRProvider fallback={{ "/api/site": site }}>
        <I18nProviderClient locale={locale}>
          <ClientInit locale={locale} />
          <ServerSiteData locale={locale}>{children}</ServerSiteData>
          <ConsentManager />
          <ConsentControl />
          <Analytics />
        </I18nProviderClient>
      </SWRProvider>
    </div>
  );
}
