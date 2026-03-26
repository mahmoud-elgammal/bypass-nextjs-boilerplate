import { type NextRequest, NextResponse } from "next/server";
import { etagFor } from "@/lib/etag";
import { getSiteInfo } from "@/queries/site";

export async function GET(req: NextRequest) {
  const data = await getSiteInfo();
  const tag = etagFor(data);
  const inm = req.headers.get("if-none-match");
  if (inm && inm === tag) {
    return new NextResponse(null, { status: 304, headers: { ETag: tag } });
  }
  const res = NextResponse.json(data);
  res.headers.set("ETag", tag);
  // Allow shared caches/CDNs to keep briefly; clients can revalidate via ETag
  res.headers.set(
    "Cache-Control",
    "public, max-age=60, stale-while-revalidate=300",
  );
  return res;
}
