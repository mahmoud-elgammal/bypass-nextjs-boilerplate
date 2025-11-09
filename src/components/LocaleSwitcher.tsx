"use client";

import { NextIntlConfig } from "@/i18n/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePreferences } from "@/stores/usePreferences";

export default function LocaleSwitcher({ current }: { current: string }) {
  const pathname = usePathname();
  const locales = NextIntlConfig.locales;
  const setLocale = usePreferences((s) => s.setLocale);

  const rest = (() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return ""; // only locale
    return "/" + parts.slice(1).join("/");
  })();

  const labels: Record<string, string> = { en: "English", ar: "العربية" };

  return (
    <nav aria-label="Language">
      <div className="flex items-center gap-2 rounded-full border border-black/10 p-1 dark:border-white/15">
        {locales.map((l) => (
          <Link
            key={l}
            href={`/${l}${rest}`}
            className={`inline-flex h-7 items-center justify-center rounded-full px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 ${
              l === current
                ? "bg-foreground text-background"
                : "text-foreground hover:bg-black/4 dark:hover:bg-white/6"
            }`}
            aria-current={l === current ? "page" : undefined}
            aria-label={labels[l] ?? l.toUpperCase()}
            prefetch={true}
            onClick={() => setLocale(l)}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </div>
    </nav>
  );
}
