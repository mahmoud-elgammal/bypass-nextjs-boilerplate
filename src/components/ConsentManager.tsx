"use client";

import {
  BarChart3,
  Lock,
  Settings2,
  Shield,
  SlidersHorizontal,
  Speaker,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { saveConsentAction } from "@/actions/consent";
import { playClick } from "@/lib/audio";
import { useConsent } from "@/stores/useConsent";

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
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    hydrateFromCookie();
    try {
      const m = document.cookie.match(/(?:^|; )CSRF_TOKEN=([^;]+)/);
      if (m) setCsrf(decodeURIComponent(m[1]));
    } catch {}
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setManageOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hydrateFromCookie]);

  if (decided) return null;

  return (
    <div>
      <div>
        {/* Industrial Raw: Machine Surface + Sharp Radius */}
        <div>
          <div>
            <div>
              <div>
                <Shield />
              </div>
              <div>
                <h2>Privacy System</h2>
                <p>
                  We respect the tactile nature of your privacy. <br />{" "}
                  Configure your data nodes for an optimal editorial experience.
                </p>
              </div>
            </div>

            <form ref={formRef} action={saveConsentAction}>
              <input type="hidden" name="_csrf" value={csrf} />
              <input
                type="hidden"
                name="payload"
                value={JSON.stringify(consent)}
              />

              <button
                type="button"
                onMouseDown={playClick}
                onClick={() => {
                  acceptAll();
                  if (formRef.current) {
                    const i = formRef.current.elements.namedItem(
                      "payload",
                    ) as HTMLInputElement | null;
                    if (i)
                      i.value = JSON.stringify({
                        analytics: true,
                        marketing: true,
                        preferences: true,
                      });
                    formRef.current.requestSubmit();
                  }
                }}
              >
                Accept All
              </button>
              <button
                type="button"
                onMouseDown={playClick}
                onClick={() => {
                  rejectAll();
                  if (formRef.current) {
                    const i = formRef.current.elements.namedItem(
                      "payload",
                    ) as HTMLInputElement | null;
                    if (i)
                      i.value = JSON.stringify({
                        analytics: false,
                        marketing: false,
                        preferences: false,
                      });
                    formRef.current.requestSubmit();
                  }
                }}
              >
                Decline
              </button>
              <button
                type="button"
                onMouseDown={playClick}
                onClick={() => setManageOpen((v) => !v)}
              >
                <Settings2 />
                Customize
              </button>
            </form>

            {manageOpen && (
              <div>
                <div>
                  <ConsentSwitch
                    label={"Operational"}
                    hint={"Critical System"}
                    checked
                    disabled
                  />
                  <ConsentSwitch
                    label={"Analytics"}
                    checked={consent.analytics}
                    onChange={(v) => setCategory("analytics", v)}
                    icon="chart"
                  />
                  <ConsentSwitch
                    label={"Marketing"}
                    checked={consent.marketing}
                    onChange={(v) => setCategory("marketing", v)}
                    icon="megaphone"
                  />
                  <ConsentSwitch
                    label={"Environment"}
                    checked={consent.preferences}
                    onChange={(v) => setCategory("preferences", v)}
                    icon="sliders"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onMouseDown={playClick}
                    onClick={() => {
                      setDecided(true);
                      if (formRef.current) {
                        const i = formRef.current.elements.namedItem(
                          "payload",
                        ) as HTMLInputElement | null;
                        if (i) i.value = JSON.stringify(consent);
                        formRef.current.requestSubmit();
                      }
                    }}
                  >
                    Commit Settings
                  </button>
                </div>
              </div>
            )}
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
  icon,
}: {
  label: string;
  hint?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  icon?: "lock" | "chart" | "megaphone" | "sliders";
}) {
  const glyph = useMemo(() => {
    switch (icon) {
      case "chart":
        return <BarChart3 />;
      case "megaphone":
        return <Speaker />;
      case "sliders":
        return <SlidersHorizontal />;
      default:
        return <Lock />;
    }
  }, [icon]);

  return (
    <label>
      <span>
        <span>{glyph}</span>
        <span>
          <span>{label}</span>
          {hint && <span>{hint}</span>}
        </span>
      </span>
      <button
        type="button"
        onMouseDown={playClick}
        role="switch"
        aria-checked={!!checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
      >
        <div />
      </button>
    </label>
  );
}
