import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /\.css$/,
        replacement: r("./__mocks__/styleMock.ts") },
      { find: /\.(png|jpe?g|gif|svg|ico|webp|avif)$/,
        replacement: r("./__mocks__/fileMock.ts") },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    include: ["**/__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    pool: "threads",
    coverage: {
      enabled: process.env.CI === "true" || process.env.COVERAGE === "true",
      provider: "v8",
      reporter: ["text", "lcov", "html"],
    },
  },
});
