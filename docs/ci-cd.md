# CI/CD

Workflows
- CI pipeline: `.github/workflows/ci.yml:1`.
  - Lint, i18n parity, unit tests + coverage upload (Codecov).
  - E2E with Playwright (local browsers).
  - Build Storybook assets; build production app; Lighthouse CI on prod build.
  - Deploy Storybook to GitHub Pages; Semantic Release; Slack notifications.
- Security scans: `.github/workflows/security.yml:1`.
  - CodeQL, OSV Scanner, pnpm audit (non-blocking), Trivy FS scan.
- Renovate scheduled: `.github/workflows/renovate.yml:1`.
- BrowserStack E2E (optional): `.github/workflows/browserstack.yml:1`.
- Branch protection: `.github/workflows/protect-branches.yml:1` (requires `ADMIN_TOKEN`).

Releases
- Semantic Release publishes on `main`, `beta`, and `alpha`.
- Branching model: stable on `main`; pre-releases on `beta`/`alpha`.
- Configure `GITHUB_TOKEN` (default Actions token works) and update repo URLs.

Artifacts & Deployments
- Storybook static built and deployed to `gh-pages`.
- Lighthouse CI runs on production build; thresholds in `lighthouserc.json:1`.

Required secrets (depending on features)
- `CODECOV_TOKEN` — Codecov uploads.
- `SENTRY_AUTH_TOKEN` — source map uploads (optional) in release job.
- `SLACK_WEBHOOK_URL` and optional `SLACK_CHANNEL` — notifications.
- `BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY` — BrowserStack workflow.
- `ADMIN_TOKEN` (repo admin PAT) — branch protection workflow.

