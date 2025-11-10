import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { NextIntlConfig } from "./i18n/config";
import { CSRF_COOKIE } from "./lib/csrf";

function negotiateLocale(req: NextRequest) {
  const locales = (NextIntlConfig as any).locales as string[];
  const cookiePref = req.cookies.get("Next-Locale")?.value;
  if (cookiePref && locales.includes(cookiePref)) return cookiePref;

  const header = req.headers.get("accept-language") || "";
  const lower = header.toLowerCase();
  for (const l of locales) {
    if (lower.includes(`${l}`)) return l;
  }
  return (NextIntlConfig as any).defaultLocale as string;
}

function ensureCsrf(req: NextRequest, res: NextResponse) {
  const cookie = req.cookies.get(CSRF_COOKIE)?.value;
  if (!cookie) {
    // Generate a random token synchronously using Web Crypto
    let token = "";
    try {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      token = Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } catch {
      token = Math.random().toString(36).slice(2);
    }
    res.cookies.set(CSRF_COOKIE, token, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: false,
    });
  }
  return res;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // // Skip Next internals, API, and file requests
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.[\w-]+$/.test(pathname)
  ) {
    return ensureCsrf(req, NextResponse.next());
  }

  const first = pathname.split("/")[1] || "";

  const isLocale = NextIntlConfig.locales.includes(first);

  if (isLocale) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("X-Next-Locale", first);
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    const existing = req.cookies.get("Next-Locale")?.value;
    if (existing !== first) {
      res.cookies.set("Next-Locale", first, {
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
    return ensureCsrf(req, res);
  }

  const locale = (NextIntlConfig as any).defaultLocale || "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  const res = NextResponse.redirect(url);
  res.headers.set("X-Next-Locale", locale);
  res.cookies.set("Next-Locale", locale, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return ensureCsrf(req, res);
}

export const config = {
  matcher: ["/:path*"],
};
