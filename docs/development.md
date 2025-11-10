# Development

Prerequisites
- Node 20 (`.nvmrc`), pnpm 10, a modern browser.
- Copy `.env.example` → `.env.local`.

Core scripts
- `pnpm dev` — Next.js dev server at http://localhost:3000
- `pnpm storybook` — Storybook at http://localhost:6006
- `pnpm test` — Vitest unit tests (set `COVERAGE=true` for coverage)
- `pnpm test:e2e` — Playwright e2e (auto-starts dev server)
- `pnpm lint` / `pnpm format` — Biome lint/format
- `pnpm i18n:check` — verifies translation key parity

Git hooks (Lefthook)
- Install hooks: `pnpm prepare` or `pnpm dlx lefthook install`.
- Pre-commit: format + lint staged files.
- Pre-push: typecheck, unit tests, i18n key parity.

Conventional commits
- Commitlint enforces conventional commits and scopes.
- See `CONTRIBUTING.md:1` and `AGENTS.md:1` for examples and allowed scopes.

Devcontainer & Gitpod
- Devcontainer pre-installs dependencies and exposes ports 3000/6006.
- Gitpod button available in `README.md:1`.

Troubleshooting
- Missing env vars: see `docs/environment.md`.
- CSP blocks analytics: update `docs/csp.md`.
- CSRF errors in dev: ensure cookies enabled and requests include `X-CSRF-Token` (added by `src/lib/http.ts:1`).

