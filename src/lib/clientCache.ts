type CacheEntry<T> = {
  t: number; // timestamp (ms)
  e?: string; // etag
  d: T; // data
};

function keyFor(url: string) {
  return `cc:${url}`;
}

export function readCache<T>(url: string): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(keyFor(url));
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry<T>;
  } catch {
    return null;
  }
}

export function writeCache<T>(url: string, entry: CacheEntry<T>) {
  try {
    localStorage.setItem(keyFor(url), JSON.stringify(entry));
  } catch {
    // ignore quota errors
  }
}

export async function fetchJsonWithCache<T>(url: string, ttlMs = 5 * 60 * 1000): Promise<{ data: T; fromCache: boolean; refresh: () => Promise<T> }> {
  const cached = typeof window !== 'undefined' ? readCache<T>(url) : null;

  async function doFetch(): Promise<T> {
    const headers: Record<string, string> = {};
    if (cached?.e) headers["If-None-Match"] = cached.e;
    const res = await fetch(url, { headers });
    if (res.status === 304 && cached) {
      return cached.d;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const etag = res.headers.get("ETag") || undefined;
    const data = (await res.json()) as T;
    if (typeof window !== 'undefined') writeCache<T>(url, { t: Date.now(), e: etag, d: data });
    return data;
  }

  const isFresh = cached && Date.now() - cached.t < ttlMs;
  if (isFresh && cached) {
    // Return cached immediately, but expose refresh
    return { data: cached.d, fromCache: true, refresh: doFetch };
  }
  const data = await doFetch();
  return { data, fromCache: !!cached, refresh: doFetch };
}

