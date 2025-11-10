# E2E Testing (Playwright)

Local
- Install browsers once: `pnpm exec playwright install` (CI handles this automatically).
- Run tests: `pnpm test:e2e` (starts the dev server automatically).
- Headed mode: `pnpm exec playwright test --headed`.

Tests
- Location: `e2e/*.spec.ts`. Examples: `e2e/home.spec.ts:1`, `e2e/consent.spec.ts:1`.
- Prefer stable selectors and avoid timing assumptions.

BrowserStack (optional)
- Workflow: `.github/workflows/browserstack.yml:1`.
- Requires `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` secrets.

