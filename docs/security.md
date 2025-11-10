# Security

Security headers & CSP
- Configured via `headers()` in `next.config.mjs:1` (CSP, HSTS, XFO, XCTO, Referrer-Policy, Permissions-Policy).
- Update `script-src`, `connect-src`, and `frame-src` when adding third-party scripts. See `docs/csp.md`.

CSRF protection
- CSRF cookie `CSRF_TOKEN` issued by `middleware.ts:1`.
- Forms include hidden `_csrf` field. Server Actions and API routes validate.
- `httpJson` sends `X-CSRF-Token` for mutating requests (`src/lib/http.ts:1`).

Environment secrets
- Never commit secrets. Copy `.env.example` → `.env.local` for local dev.
- Env validated with Zod in `src/lib/env.ts:1`. Production fails fast on invalid env.

Sentry (optional)
- Set `SENTRY_DSN` or `NEXT_PUBLIC_SENTRY_DSN` to enable reporting.
- Runtime instrumentation lives in `instrumentation.ts:1` and `src/components/Analytics.tsx:1`.

Scheduled security checks (CI)
- CodeQL, OSV, Trivy, and pnpm audit run via `.github/workflows/security.yml:1`.

Reporting vulnerabilities
- Follow the process in `SECURITY.md:1`.

