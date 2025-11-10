# Environment & Configuration

Basics
- Copy `.env.example` → `.env.local` for local development.
- Do not commit secrets. CI reads from repository/organization secrets.

Validation
- Env is validated at runtime using Zod in `src/lib/env.ts:1`.
- Production fails fast on invalid env; dev logs warnings for visibility.

Common variables
- `NEXT_PUBLIC_SITE_URL` — used by SEO/sitemap for absolute URLs.
- `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GTAG_ID` — analytics (see `docs/analytics.md`).
- `NEXT_PUBLIC_POSTHOG_KEY` [+ `NEXT_PUBLIC_POSTHOG_HOST`] — PostHog.
- `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` — Sentry reporting.

Instrumentation
- Sentry instrumentation hook: `instrumentation.ts:1` (initializes when DSN is set).

