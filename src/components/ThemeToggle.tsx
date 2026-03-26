"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { type Theme, usePreferences } from "@/stores/usePreferences";

export default function ThemeToggle() {
  const theme = usePreferences((s) => s.theme);
  const setTheme = usePreferences((s) => s.setTheme);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="h-9 w-[120px] rounded-full bg-white/5 animate-pulse" />
    );

  const themes: { id: Theme; icon: typeof Sun; label: string }[] = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "dark", icon: Moon, label: "Dark" },
    { id: "system", icon: Monitor, label: "System" },
  ];

  return (
    <fieldset className="relative flex h-9 items-center gap-1 rounded-full border border-white/10 bg-[#121214]/40 p-1 backdrop-blur-xl shadow-inner">
      <legend className="sr-only">Theme selection</legend>
      {/* Sliding Background Indicator */}
      <div
        className="absolute h-7 rounded-full bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 ease-out"
        style={{
          width: "32px",
          transform: `translateX(${
            theme === "light" ? "0px" : theme === "dark" ? "36px" : "72px"
          })`,
        }}
      />

      {themes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => setTheme(id)}
          className={`relative z-10 flex h-7 w-8 items-center justify-center rounded-full transition-colors duration-200 ${
            theme === id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
          aria-label={`Switch to ${label} mode`}
          aria-pressed={theme === id}
        >
          <Icon size={16} strokeWidth={2.5} />
        </button>
      ))}
    </fieldset>
  );
}
