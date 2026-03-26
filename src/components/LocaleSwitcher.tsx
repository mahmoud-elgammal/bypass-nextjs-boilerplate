"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NextIntlConfig } from "@/i18n/config";
import { usePreferences } from "@/stores/usePreferences";

export default function LocaleSwitcher({ current }: { current: string }) {
  const pathname = usePathname();
  const locales = NextIntlConfig.locales;
  const setLocale = usePreferences((s) => s.setLocale);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const rest = (() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return ""; // only locale
    return `/${parts.slice(1).join("/")}`;
  })();

  const labels: Record<string, string> = { en: "EN", ar: "AR" };

  if (!mounted)
    return (
      <div className="h-9 w-[100px] rounded-full bg-white/5 animate-pulse" />
    );

  return (
    <nav
      aria-label="Language selection"
      className="relative flex h-9 items-center gap-1 rounded-full border border-white/10 bg-[#121214]/40 p-1 backdrop-blur-xl shadow-inner"
    >
      <div className="flex h-7 w-8 items-center justify-center text-zinc-500 pr-0.5">
        <Globe size={14} strokeWidth={2.5} />
      </div>

      {/* Sliding Background Indicator */}
      <div
        className="absolute h-7 rounded-full bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 ease-out"
        style={{
          width: "36px",
          transform: `translateX(${current === "en" ? "32px" : "72px"})`,
        }}
      />

      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          className={`relative z-10 flex h-7 w-9 items-center justify-center rounded-full text-xs font-bold transition-colors duration-200 ${
            l === current ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
          aria-label={labels[l] ?? l.toUpperCase()}
          aria-current={l === current ? "page" : undefined}
          prefetch={true}
          onClick={() => setLocale(l)}
        >
          {labels[l] ?? l.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
