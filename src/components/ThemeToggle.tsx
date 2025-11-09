"use client";

import { usePreferences, type Theme } from "@/stores/usePreferences";

export default function ThemeToggle() {
  const theme = usePreferences((s) => s.theme);
  const setTheme = usePreferences((s) => s.setTheme);

  const active = (v: Theme) =>
    theme === v
      ? "bg-foreground text-background"
      : "text-foreground hover:bg-black/[.04] dark:hover:bg-white/[.06]";

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex h-9 items-center gap-1 rounded-full border border-black/10 p-1 text-sm dark:border-white/15"
    >
      <button
        type="button"
        onClick={() => setTheme("system")}
        className={`inline-flex h-7 items-center gap-1 rounded-full px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 ${active(
          "system",
        )}`}
        aria-pressed={theme === "system"}
      >
        <span>🖥️</span>
        {"System"}
      </button>
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`inline-flex h-7 items-center gap-1 rounded-full px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 ${active(
          "light",
        )}`}
        aria-pressed={theme === "light"}
      >
        <span>☀️</span>
        {"Light"}
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`inline-flex h-7 items-center gap-1 rounded-full px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 ${active(
          "dark",
        )}`}
        aria-pressed={theme === "dark"}
      >
        <span>🌙</span>
        {"Dark"}
      </button>
    </div>
  );
}
