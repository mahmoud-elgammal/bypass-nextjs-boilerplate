"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ConsentCategory =
  | "necessary"
  | "analytics"
  | "marketing"
  | "preferences";

type Consent = Record<Exclude<ConsentCategory, "necessary">, boolean> & {
  necessary: true;
};

type State = {
  consent: Consent;
  decided: boolean;
};

type Actions = {
  acceptAll: () => void;
  rejectAll: () => void;
  setCategory: (k: Exclude<ConsentCategory, "necessary">, v: boolean) => void;
  setDecided: (v: boolean) => void;
  hydrateFromCookie: () => void;
  openManager: () => void;
};

function readCookie(name: string): string | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
    return m?.[1] ? decodeURIComponent(m[1]) : null;
  } catch {
    return null;
  }
}

function writeConsentCookie(consent: Consent) {
  try {
    const value = encodeURIComponent(JSON.stringify(consent));
    const maxAge = 60 * 60 * 24 * 180; // 180 days
    document.cookie = `CONSENT=${value}; Path=/; Max-Age=${maxAge}`;
  } catch {
    // ignore
  }
}

const defaultConsent: Consent = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

export const useConsent = create<State & Actions>()(
  persist(
    (set, get) => ({
      consent: defaultConsent,
      decided: false,
      acceptAll: () => {
        const next: Consent = {
          necessary: true,
          analytics: true,
          marketing: true,
          preferences: true,
        };
        set({ consent: next, decided: true });
        writeConsentCookie(next);
      },
      rejectAll: () => {
        const next: Consent = {
          necessary: true,
          analytics: false,
          marketing: false,
          preferences: false,
        };
        set({ consent: next, decided: true });
        writeConsentCookie(next);
      },
      setCategory: (k, v) => {
        const current = get().consent;
        const next = { ...current, [k]: v } as Consent;
        set({ consent: next });
        writeConsentCookie(next);
      },
      setDecided: (v) => set({ decided: v }),
      openManager: () => set({ decided: false }),
      hydrateFromCookie: () => {
        const raw = readCookie("CONSENT");
        if (!raw) return;
        try {
          const parsed = JSON.parse(raw) as Partial<Consent> | null;
          if (parsed && typeof parsed === "object") {
            const next: Consent = {
              necessary: true,
              analytics: !!parsed.analytics,
              marketing: !!parsed.marketing,
              preferences: !!parsed.preferences,
            };
            set({ consent: next, decided: true });
          }
        } catch {
          // ignore invalid cookie
        }
      },
    }),
    {
      name: "consent",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ consent: s.consent, decided: s.decided }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        try {
          writeConsentCookie(state.consent);
        } catch {
          // ignore
        }
      },
    },
  ),
);
