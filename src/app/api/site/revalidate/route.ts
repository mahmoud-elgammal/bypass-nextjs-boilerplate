import { NextResponse, NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/constants/cache";
import { CSRF_COOKIE } from "@/lib/csrf";
import { clientKeyFromHeaders, rateLimit } from "@/lib/rateLimit";

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
  return NextResponse.json({ revalidated: true, tags: [CACHE_TAGS.SITE_INFO] });
}
