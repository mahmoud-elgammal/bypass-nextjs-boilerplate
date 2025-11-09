import type { ReactNode } from "react";
import { getSiteInfo } from "@/queries/site";
import { SiteDataProvider } from "@/providers/SiteDataContext.client";

export default async function ServerSiteData({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  const site = await getSiteInfo();
  return (
    <SiteDataProvider value={{ ...site, locale }}>{children}</SiteDataProvider>
  );
}
