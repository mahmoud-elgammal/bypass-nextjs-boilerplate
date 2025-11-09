"use client";

import { useEffect } from "react";
import { usePreferences } from "@/stores/usePreferences";

export default function ClientInit({ locale }: { locale: string }) {
  const hydrateFromEnv = usePreferences((s) => s.hydrateFromEnv);
  useEffect(() => {
    hydrateFromEnv({ locale });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);
  return null;
}

