# Testing

Unit tests (Vitest)
- Location: `__tests__/**` or feature-local `src/**/__tests__/**`.
- Run: `pnpm test` (use `--coverage` or `COVERAGE=true` for coverage).
- Environment: jsdom; mock DOM/network as needed.
- Example specs: `__tests__/i18n.spec.ts:1`, `__tests__/preferences.spec.ts:1`.

E2E tests (Playwright)
- Location: `e2e/*.spec.ts`.
- Run: `pnpm test:e2e` (installs browsers on first run, starts dev server).
- CI can run locally or on BrowserStack (see `docs/ci-cd.md`).
- Example specs: `e2e/home.spec.ts:1`, `e2e/locale.spec.ts:1`.

Storybook
- Component-driven tests and visual review. Start with `pnpm storybook`.
- Stories co-located as `*.stories.tsx` in `src/**`. Example: `src/components/ThemeToggle.stories.tsx:1`.

Coverage & CI
- CI uploads `coverage/lcov.info` to Codecov when `CODECOV_TOKEN` is set (`codecov.yml:1`).
- Ensure tests are deterministic and do not rely on external networks.

Tips
- Prefer unit tests near the feature for faster iteration.
- Keep i18n keys in sync: `pnpm i18n:check`.
- For fetch JSON, validate shapes with `zod` using `httpJsonParsed` (`src/lib/http.ts:1`).

