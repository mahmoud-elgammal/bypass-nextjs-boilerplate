// test setup (kept intentionally minimal)
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import "@testing-library/jest-dom";

// No-op next/script in test env
vi.mock("next/script", () => ({ default: () => null }));

// Basic matchMedia shim for components that may query it
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// MSW server
try {
  const { setupServer } = await import("msw/node");
  const { handlers } = await import("./__tests__/msw/handlers");
  const server = setupServer(...handlers);
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
} catch {}
