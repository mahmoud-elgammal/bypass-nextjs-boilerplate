"use server";

import { cookies, headers } from "next/headers";
import { CSRF_COOKIE } from "@/lib/csrf";

const CONSENT_COOKIE = "CONSENT";
const LOCALE_COOKIE = "NEXT_LOCALE";

async function assertCsrf(formData: FormData) {
  const csrfFromForm = formData.get("_csrf");
  const cookie = await cookies();
  const csrfCookie = cookie.get(CSRF_COOKIE)?.value;
  if (
    !csrfFromForm ||
    typeof csrfFromForm !== "string" ||
    !csrfCookie ||
    csrfFromForm !== csrfCookie
  ) {
    throw new Error("Invalid CSRF token");
  }
}

export async function saveConsentAction(formData: FormData) {
  assertCsrf(formData);
  const payload = formData.get("payload");
  if (typeof payload !== "string") return;
  try {
    const parsed = JSON.parse(payload) as {
      analytics?: boolean;
      marketing?: boolean;
      preferences?: boolean;
    };
    // Always include necessary: true
    const value = encodeURIComponent(
      JSON.stringify({
        necessary: true,
        analytics: !!parsed.analytics,
        marketing: !!parsed.marketing,
        preferences: !!parsed.preferences,
      }),
    );
    const maxAge = 60 * 60 * 24 * 180; // 180 days
    const cookie = await cookies();
    cookie.set(CONSENT_COOKIE, value, { path: "/", maxAge });
  } catch {
    // ignore
  }
}

export async function setLocaleAction(formData: FormData) {
  assertCsrf(formData);
  const locale = formData.get("locale");
  if (typeof locale !== "string") return;
  const cookie = await cookies();
  cookie.set(LOCALE_COOKIE, locale, { path: "/" });
}
