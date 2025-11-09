import { useEffect, useState } from "react";

// Returns true after the component mounts (avoids SSR/CSR mismatch)
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

