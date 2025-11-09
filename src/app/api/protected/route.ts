import { NextRequest, NextResponse } from "next/server";
import { clientKeyFromHeaders, rateLimit } from "@/lib/rateLimit";

export async function GET(req: NextRequest) {
  const key = clientKeyFromHeaders(req.headers);
  const rl = rateLimit(`protected:${key}`, 20, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });

  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, ts: Date.now() });
}

