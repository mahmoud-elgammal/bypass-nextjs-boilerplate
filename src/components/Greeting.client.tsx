"use client";
import { useSiteData } from "@/providers/SiteDataContext.client";

export default function Greeting() {
  const _site = useSiteData();
  return (
    <p className="text-sm text-zinc-600 dark:text-zinc-400">
      Hello World!
      {/*Server provided: <strong>{site.name}</strong> — {site.description} [*/}
      {/*{site.locale}]*/}
    </p>
  );
}
