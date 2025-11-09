import { describe, it, expect, beforeEach } from "vitest";
import { useConsent } from "../src/stores/useConsent";

function clearCookies() {
  const cookies = document.cookie.split(";");
  for (const c of cookies) {
    const eqPos = c.indexOf("=");
    const name = eqPos > -1 ? c.substr(0, eqPos) : c;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
}

beforeEach(() => {
  localStorage.clear();
  clearCookies();
  useConsent.setState({
    consent: { necessary: true, analytics: false, marketing: false, preferences: false },
    decided: false,
  });
});

describe("useConsent store", () => {
  it("acceptAll enables all and sets decided + cookie", () => {
    useConsent.getState().acceptAll();
    const s = useConsent.getState();
    expect(s.decided).toBe(true);
    expect(s.consent.analytics && s.consent.marketing && s.consent.preferences).toBe(true);
    expect(document.cookie).toContain("CONSENT=");
  });

  it("rejectAll disables optional and sets decided + cookie", () => {
    useConsent.getState().rejectAll();
    const s = useConsent.getState();
    expect(s.decided).toBe(true);
    expect(s.consent.analytics || s.consent.marketing || s.consent.preferences).toBe(false);
    expect(document.cookie).toContain("CONSENT=");
  });

  it("hydrateFromCookie reads cookie and marks decided", () => {
    document.cookie = `CONSENT=${encodeURIComponent(JSON.stringify({ analytics: true, marketing: false, preferences: true }))}; path=/`;
    useConsent.getState().hydrateFromCookie();
    const s = useConsent.getState();
    expect(s.decided).toBe(true);
    expect(s.consent.analytics).toBe(true);
    expect(s.consent.marketing).toBe(false);
    expect(s.consent.preferences).toBe(true);
  });

  it("openManager flips decided to false", () => {
    useConsent.setState({ decided: true });
    expect(useConsent.getState().decided).toBe(true);
    useConsent.getState().openManager();
    expect(useConsent.getState().decided).toBe(false);
  });
});
