"use client";

import { Settings2 } from "lucide-react";
import { playClick } from "@/lib/audio";
import { useConsent } from "@/stores/useConsent";

export default function ConsentControl() {
  const decided = useConsent((s) => s.decided);
  const open = useConsent((s) => s.openManager);

  if (!decided) return null;
  return (
    <button
      type="button"
      onMouseDown={playClick}
      onClick={() => open()}
      aria-label={"Privacy Settings"}
    >
      <Settings2 />
      {"Privacy Unit"}
    </button>
  );
}
