type Bucket = { tokens: number; updated: number };
const BUCKETS = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const b = BUCKETS.get(key) || { tokens: limit, updated: now };
  const elapsed = now - b.updated;
  const refill = Math.floor(elapsed / windowMs) * limit;
  const tokens = Math.min(limit, b.tokens + (refill > 0 ? refill : 0));
  const next: Bucket = { tokens, updated: refill > 0 ? now : b.updated };
  if (next.tokens <= 0) {
    BUCKETS.set(key, next);
    return { ok: false, remaining: 0 };
  }
  next.tokens -= 1;
  BUCKETS.set(key, next);
  return { ok: true, remaining: next.tokens };
}

export function clientKeyFromHeaders(headers: Headers) {
  const fwd = headers.get('x-forwarded-for');
  const ip = fwd?.split(',')[0]?.trim() || 'unknown';
  return ip;
}

