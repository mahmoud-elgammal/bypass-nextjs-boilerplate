import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { NextIntlConfig } from "./i18n/config";
import { CSRF_COOKIE, randomToken } from "./lib/csrf";

function negotiateLocale(req: NextRequest) {
  const header = req.headers.get("accept-language") || "";
  const lower = header.toLowerCase();
  for (const l of (NextIntlConfig as any).locales as string[]) {
    if (lower.includes(`${l}`)) return l;
  }
  return (NextIntlConfig as any).defaultLocale as string;
}

function ensureCsrf(req: NextRequest, res: NextResponse) {
  const cookie = req.cookies.get(CSRF_COOKIE)?.value;
  if (!cookie) {
    res.cookies.set(CSRF_COOKIE, randomToken(), {
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

  // return NextResponse.next();

  const first = pathname.split("/")[1] || "";

  const isLocale = NextIntlConfig.locales.includes(first);

  if (isLocale) return ensureCsrf(req, NextResponse.next());

  const locale = negotiateLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  const res = NextResponse.redirect(url);
  res.headers.set("X-Next-Locale", locale);
  res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
  return ensureCsrf(req, res);
}

export const config = {
  matcher: ["/:path*"],
};
