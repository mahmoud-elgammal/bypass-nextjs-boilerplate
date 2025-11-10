import { NextResponse, NextRequest } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { CACHE_TAGS } from "@/constants/cache";
import { CSRF_COOKIE } from "@/lib/csrf";
import { clientKeyFromHeaders, rateLimit } from "@/lib/rateLimit";
import { NextIntlConfig } from "@/i18n/config";

export async function POST(req: NextRequest) {
  const key = clientKeyFromHeaders(req.headers);
  const rl = rateLimit(`revalidate:${key}`, 5, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  const cookie = req.cookies.get(CSRF_COOKIE)?.value;
  const hdr = req.headers.get("x-csrf-token");
  if (!cookie || !hdr || cookie !== hdr) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }
  revalidateTag(CACHE_TAGS.SITE_INFO, {});
  // Proactively ISR-revalidate the localized home pages as well
  for (const l of NextIntlConfig.locales) {
    revalidatePath(`/${l}`);
  }
  return NextResponse.json({ revalidated: true, tags: [CACHE_TAGS.SITE_INFO], paths: NextIntlConfig.locales.map((l) => `/${l}`) });
}
