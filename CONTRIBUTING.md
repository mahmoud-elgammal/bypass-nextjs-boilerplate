# Contributing to Next Edge

Thanks for your interest in contributing! This project aims to be a polished, production‑ready Next.js starter. Please follow the guidelines below to keep quality high and changes focused.

## Getting Started

1) Fork and clone the repo
2) Install deps: `pnpm install`
3) Copy env: `cp .env.example .env.local`
4) Run dev: `pnpm dev` (app) and `pnpm storybook` (components)

## Development Workflow

- Format and lint: `pnpm format` and `pnpm lint`
- Unit tests: `pnpm test` (add `--coverage` or set `COVERAGE=true`)
- E2E: `pnpm test:e2e`
- i18n parity: `pnpm i18n:check`

## Commit Messages

We enforce Conventional Commits via Commitlint. Use the format:

```
<type>(<scope>): <subject>
```

- Allowed types: `feat, fix, perf, refactor, docs, test, style, build, ci, chore, revert`
- Allowed scopes: `actions, app, components, constants, i18n, lib, providers, queries, schemas, stores, utils, api, messages, config, ci, deps, repo, docs, tests`
- Subject: lower‑case, imperative, ≤ 100 chars, no trailing period

Examples:
- `feat(app): add locale switcher`
- `fix(components): guard against null props`

## Pull Requests

Before requesting review:
- Ensure the PR is small and focused
- Run `pnpm lint`, `pnpm test`, and `pnpm i18n:check`
- Include a summary, rationale, screenshots for UI, and a test plan

## Code Style

- TypeScript everywhere; 2‑space indent (Biome)
- Components: PascalCase; hooks: `useX.ts` under `src/hooks`
- Server actions in `src/actions/*.ts`; API routes under `src/app/api/**/route.ts`
- Keep imports organized and dead code out

## Security

Never commit secrets. Copy `.env.example` to `.env.local`. See `SECURITY.md` for reporting vulnerabilities.

## License

By contributing you agree that your contributions are licensed under the repository’s license.

