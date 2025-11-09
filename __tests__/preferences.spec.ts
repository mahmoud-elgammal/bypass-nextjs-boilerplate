import { describe, it, expect, beforeEach } from "vitest";
import { usePreferences } from "../src/stores/usePreferences";

function clearCookies() {
  const cookies = document.cookie.split(";");
  for (const c of cookies) {
    const eqPos = c.indexOf("=");
    const name = eqPos > -1 ? c.substr(0, eqPos) : c;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
}

beforeEach(() => {
  // Reset DOM hints
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.lang = "en";
  // Reset storage + cookies
  localStorage.clear();
  clearCookies();
  // Reset store to initial minimal state
  usePreferences.setState({ theme: "system", locale: "en", hydrated: false });
});

describe("usePreferences store", () => {
  it("setTheme updates state and DOM", () => {
    expect(usePreferences.getState().theme).toBe("system");
    usePreferences.getState().setTheme("dark");
    expect(usePreferences.getState().theme).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");

    usePreferences.getState().setTheme("system");
    expect(usePreferences.getState().theme).toBe("system");
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });

  it("setLocale updates state, cookie and <html lang>", () => {
    usePreferences.getState().setLocale("ar");
    expect(usePreferences.getState().locale).toBe("ar");
    expect(document.documentElement.lang).toBe("ar");
    expect(document.cookie).toContain("NEXT_LOCALE=ar");
  });

  it("hydrateFromEnv derives values from storage and cookies", () => {
    localStorage.setItem("theme", "light");
    document.cookie = "NEXT_LOCALE=ar; path=/";

    usePreferences.getState().hydrateFromEnv();

    expect(usePreferences.getState().hydrated).toBe(true);
    expect(usePreferences.getState().theme).toBe("light");
    expect(usePreferences.getState().locale).toBe("ar");
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});

