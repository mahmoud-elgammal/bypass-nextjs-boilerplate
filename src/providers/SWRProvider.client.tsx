"use client";
import { SWRConfig } from "swr";

export default function SWRProvider({ children, fallback }: { children: React.ReactNode; fallback?: Record<string, any> }) {
  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then((r) => r.json()), fallback }}>
      {children}
    </SWRConfig>
  );
}

