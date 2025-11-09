"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useConsent } from "@/stores/useConsent";
import { saveConsentAction } from "@/actions/consent";

export default function ConsentManager() {
  const decided = useConsent((s) => s.decided);
  const consent = useConsent((s) => s.consent);
  const setCategory = useConsent((s) => s.setCategory);
  const acceptAll = useConsent((s) => s.acceptAll);
  const rejectAll = useConsent((s) => s.rejectAll);
  const setDecided = useConsent((s) => s.setDecided);
  const hydrateFromCookie = useConsent((s) => s.hydrateFromCookie);

  const [manageOpen, setManageOpen] = useState(false);
  const [csrf, setCsrf] = useState("");
  const [mounted, setMounted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Best-effort: read cookie if present
    hydrateFromCookie();
    setMounted(true);
    // Read CSRF token from cookie for form submission
    try {
      const m = document.cookie.match(/(?:^|; )CSRF_TOKEN=([^;]+)/);
      if (m) setCsrf(decodeURIComponent(m[1]));
    } catch {}
    // Close on Escape when manage sheet is open
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setManageOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (decided) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl p-4">
      <div
        className={`transition-all duration-300 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <div className="rounded-2xl bg-gradient-to-r from-foreground/15 via-foreground/5 to-foreground/15 p-[1px]">
          <div className="rounded-2xl border border-black/5 bg-background/95 p-4 shadow-xl backdrop-blur-md dark:border-white/10 sm:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-lg dark:bg-white/10">🔒</span>
                <div className="text-sm text-foreground">
                  <strong className="mb-0.5 block text-base font-semibold tracking-tight">
                    {"We use cookies"}
                  </strong>
                  <span className="text-zinc-600 dark:text-zinc-400">{"We use cookies to enhance your experience, analyze traffic and show relevant content."}</span>
                </div>
              </div>

              <form ref={formRef} action={saveConsentAction} className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
                <input type="hidden" name="_csrf" value={csrf} />
                <input type="hidden" name="payload" value={JSON.stringify({ analytics: consent.analytics, marketing: consent.marketing, preferences: consent.preferences })} />
                <button
                  type="button"
                  className="inline-flex h-9 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background shadow-sm transition-opacity hover:opacity-95"
                  onClick={() => {
                    acceptAll();
                    if (formRef.current) {
                      const i = formRef.current.elements.namedItem("payload") as HTMLInputElement | null;
                      if (i) i.value = JSON.stringify({ analytics: true, marketing: true, preferences: true });
                      formRef.current.requestSubmit();
                    }
                  }}
                >
                  {"Accept all"}
                </button>
                <button
                  type="button"
                  className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-medium text-foreground transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  onClick={() => {
                    rejectAll();
                    if (formRef.current) {
                      const i = formRef.current.elements.namedItem("payload") as HTMLInputElement | null;
                      if (i) i.value = JSON.stringify({ analytics: false, marketing: false, preferences: false });
                      formRef.current.requestSubmit();
                    }
                  }}
                >
                  {"Reject all"}
                </button>
                <button
                  type="button"
                  aria-expanded={manageOpen}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-transparent px-3 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  onClick={() => setManageOpen((v) => !v)}
                >
                  <span aria-hidden>⚙️</span>
                  {"Manage"}
                </button>
              </form>

              {manageOpen && (
                <div
                  role="dialog"
                  aria-modal="true"
                  className="mt-1 rounded-xl border border-black/10 p-4 transition-all dark:border-white/10 sm:p-5"
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <ConsentSwitch
                      label={"Strictly necessary"}
                      hint={"Always on"}
                      checked
                      disabled
                      tone="neutral"
                      icon="lock"
                    />
                    <ConsentSwitch
                      label={"Analytics"}
                      checked={consent.analytics}
                      onChange={(v) => setCategory("analytics", v)}
                      tone="sky"
                      icon="chart"
                    />
                    <ConsentSwitch
                      label={"Marketing"}
                      checked={consent.marketing}
                      onChange={(v) => setCategory("marketing", v)}
                      tone="pink"
                      icon="megaphone"
                    />
                    <ConsentSwitch
                      label={"Preferences"}
                      checked={consent.preferences}
                      onChange={(v) => setCategory("preferences", v)}
                      tone="amber"
                      icon="sliders"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-medium text-foreground transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                      onClick={() => setManageOpen(false)}
                    >
                      {"Close"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-9 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background shadow-sm transition-opacity hover:opacity-95"
                      onClick={() => {
                        setDecided(true);
                        // Ensure payload reflects latest toggles
                        if (formRef.current) {
                          const i = formRef.current.elements.namedItem("payload") as HTMLInputElement | null;
                          if (i)
                            i.value = JSON.stringify({ analytics: consent.analytics, marketing: consent.marketing, preferences: consent.preferences });
                          formRef.current.requestSubmit();
                        }
                      }}
                    >
                      {"Save preferences"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsentSwitch({
  label,
  hint,
  checked,
  disabled,
  onChange,
  tone = "neutral",
  icon,
}: {
  label: string;
  hint?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  tone?: "neutral" | "sky" | "pink" | "amber";
  icon?: "lock" | "chart" | "megaphone" | "sliders";
}) {
  const toneBg = useMemo(() => {
    switch (tone) {
      case "sky":
        return "bg-sky-500/15 text-sky-700 dark:text-sky-300";
      case "pink":
        return "bg-pink-500/15 text-pink-700 dark:text-pink-300";
      case "amber":
        return "bg-amber-500/15 text-amber-700 dark:text-amber-300";
      default:
        return "bg-black/5 text-foreground/80 dark:bg-white/10";
    }
  }, [tone]);

  const glyph = useMemo(() => {
    switch (icon) {
      case "chart":
        return "📈";
      case "megaphone":
        return "📣";
      case "sliders":
        return "🎚️";
      default:
        return "🔒";
    }
  }, [icon]);

  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border border-black/10 p-3 dark:border-white/10">
      <span className="flex items-start gap-3 text-sm">
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${toneBg}`}>{glyph}</span>
        <span>
          <span className="block font-medium leading-5">{label}</span>
          {hint ? (
            <span className="text-xs text-zinc-600 dark:text-zinc-400">{hint}</span>
          ) : null}
        </span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={!!checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 ${
          disabled
            ? "bg-black/10 dark:bg-white/15 cursor-not-allowed"
            : checked
              ? "bg-foreground"
              : "bg-black/15 dark:bg-white/20"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-background shadow-sm transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </label>
  );
}
