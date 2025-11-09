# Docs

This repository is a Next.js (App Router) project with TypeScript, Vitest, Storybook, and CI/CD.

- Development: `pnpm dev` (app at http://localhost:3000)
- Storybook: `pnpm storybook` (http://localhost:6006)
- Tests: `pnpm test` (use `--coverage` for coverage)
- Lint/Format: `pnpm lint` / `pnpm format`

Configuration
- Env: copy `.env.example` to `.env.local`. See `AGENTS.md` for analytics and Sentry.
- Node: `.nvmrc` pins Node 20; CI uses Node 20.
- Hooks: Lefthook runs format/lint on commit and checks on push.

Architecture
- App routes in `src/app`, components in `src/components`, hooks in `src/hooks`, stores in `src/stores`.
- i18n via `next-intl` with messages under `messages/<locale>/<ns>.json`.
- Consent-aware analytics in `src/components/Analytics.tsx` (GTM/GA4/PostHog).

CI & Releases
- CI runs lint, i18n checks, tests + coverage upload (Codecov), Storybook build.
- Releases automated via semantic-release on `main`; Storybook deploys to `gh-pages`.

See `AGENTS.md` for contributor guidelines.
