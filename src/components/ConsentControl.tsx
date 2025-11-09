"use client";

import { useConsent } from "@/stores/useConsent";

export default function ConsentControl() {
  const decided = useConsent((s) => s.decided);
  const open = useConsent((s) => s.openManager);

  if (!decided) return null;
  return (
    <button
      type="button"
      onClick={() => open()}
      className="fixed bottom-3 left-3 z-40 inline-flex h-8 items-center justify-center rounded-full border border-black/10 bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-black/4 dark:border-white/15 dark:hover:bg-white/6"
      aria-label={"Cookie settings"}
    >
      {"Cookie settings"}
    </button>
  );
}
