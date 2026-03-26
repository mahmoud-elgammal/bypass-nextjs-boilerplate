"use client";
import { useCallback, useEffect, useState } from "react";
import { fetchJsonWithCache } from "@/lib/clientCache";

export function useCachedJson<T>(url: string, ttlMs = 5 * 60 * 1000) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await fetchJsonWithCache<T>(url, ttlMs);
      setData(data);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [url, ttlMs]);

  useEffect(() => {
    void load();
  }, [load]);

  const refresh = useCallback(async () => {
    try {
      const { refresh } = await fetchJsonWithCache<T>(url, 0);
      const fresh = await refresh();
      setData(fresh);
    } catch (e) {
      setError(e);
    }
  }, [url]);

  return { data, loading, error, refresh } as const;
}
