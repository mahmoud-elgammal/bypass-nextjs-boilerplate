import { z } from "zod";

type NextCache = "force-cache" | "no-store";

export type JsonRequestInit = RequestInit & {
  next?: { revalidate?: number | false; tags?: string[] };
  cache?: NextCache;
};

export async function httpJson<T>(
  url: string,
  init: JsonRequestInit = {}
): Promise<T> {
  const method = (init.method || 'GET').toUpperCase();
  const headers: Record<string, string> = {
    "content-type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };
  if (typeof window !== 'undefined' && ["POST","PUT","PATCH","DELETE"].includes(method)) {
    try {
      const m = document.cookie.match(/(?:^|; )CSRF_TOKEN=([^;]+)/);
      if (m) headers["x-csrf-token"] = decodeURIComponent(m[1]);
    } catch {}
  }

  const res = await fetch(url, {
    ...init,
    headers,
  } as RequestInit & { next?: { revalidate?: number | false; tags?: string[] } });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

export async function httpJsonParsed<T>(
  url: string,
  schema: z.ZodType<T>,
  init: JsonRequestInit = {}
): Promise<T> {
  const data = await httpJson<unknown>(url, init);
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid JSON shape: " + parsed.error.message);
  }
  return parsed.data;
}
