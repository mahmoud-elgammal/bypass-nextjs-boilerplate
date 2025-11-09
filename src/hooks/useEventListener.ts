import { useEffect, useRef } from "react";

type Target = EventTarget | null | undefined;

export function useEventListener<K extends keyof WindowEventMap>(
  target: () => Target,
  type: K,
  handler: (ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) {
  const saved = useRef<typeof handler>(handler);
  useEffect(() => void (saved.current = handler), [handler]);

  useEffect(() => {
    const t = target();
    if (!t || !t.addEventListener) return;
    const listener = (e: Event) => saved.current(e as any);
    t.addEventListener(type as any, listener, options);
    return () => t.removeEventListener(type as any, listener, options as any);
  }, [target, type, options]);
}

