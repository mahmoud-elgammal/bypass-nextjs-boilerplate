"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

type State = {
  theme: Theme;
  locale: string;
  // Initialized flag to avoid hydration jitter
  hydrated: boolean;
};

type Actions = {
  setTheme: (theme: Theme) => void;
  setLocale: (locale: string) => void;
  hydrateFromEnv: (opts?: { locale?: string }) => void;
};

function applyThemeToDom(theme: Theme) {
  try {
    const d = document.documentElement;
    if (theme === "light" || theme === "dark") {
      d.dataset.theme = theme;
    } else {
      d.removeAttribute("data-theme");
    }
  } catch {
    // noop for SSR
  }
}

export const usePreferences = create<State & Actions>()(
  persist(
    (set, get) => ({
      theme: "system",
      locale: "en",
      hydrated: false,
      setTheme: (theme) => {
        set({ theme });
        // Keep compatibility with early theme init script
        try {
          localStorage.setItem("theme", theme);
        } catch {
          // ignore
        }
        // Reflect immediately in DOM
        if (typeof window !== "undefined") applyThemeToDom(theme);
      },
      setLocale: (locale) => {
        set({ locale });
        // Store a cookie so middleware can pick it up on SSR navigations
        try {
          document.cookie = `Next-Locale=${locale}; path=/`;
          document.cookie = `NEXT_LOCALE=${locale}; path=/`;
          // Also reflect in <html lang> when possible (non-blocking)
          document.documentElement.lang = locale;
        } catch {
          // ignore
        }
      },
      hydrateFromEnv: (opts) => {
        // Use existing persisted values if present, else derive
        let theme = get().theme;
        let locale = get().locale;

        try {
          const stored = (localStorage.getItem("theme") as Theme | null) ?? null;
          if (stored === "light" || stored === "dark") theme = stored;
          else theme = "system";
        } catch {
          // ignore
        }

        if (opts?.locale) locale = opts.locale;
        else {
          try {
            const m1 = document.cookie.match(/(?:^|; )Next-Locale=([^;]+)/);
            const m2 = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);
            const v = m1?.[1] ?? m2?.[1];
            if (v) locale = decodeURIComponent(v);
          } catch {
            // ignore
          }
        }

        set({ theme, locale, hydrated: true });
        if (typeof window !== "undefined") applyThemeToDom(theme);
      },
    }),
    {
      name: "preferences",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ theme: s.theme, locale: s.locale }),
      onRehydrateStorage: () => (state, error) => {
        if (!state || error) return;
        // When rehydrated, ensure DOM matches stored theme
        try {
          applyThemeToDom(state.theme);
        } catch {
          // ignore
        }
      },
    },
  ),
);
