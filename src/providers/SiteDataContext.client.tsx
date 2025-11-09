"use client";
import { createContext } from "react";

export type SiteData = {
  name: string;
  description: string;
  templates: { id: string; title: string }[];
  locale: string;
};

const Ctx = createContext<SiteData | null>(null);

export function SiteDataProvider({
  value,
  children,
}: {
  value: SiteData;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSiteData() {
  // const v = useContext(Ctx);
  // if (!v) throw new Error("useSiteData must be used inside <SiteDataProvider>");
  return null; //v;
}
