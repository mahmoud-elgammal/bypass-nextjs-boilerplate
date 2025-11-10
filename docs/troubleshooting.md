# Troubleshooting

Missing environment variables
- Ensure `.env.local` exists (copied from `.env.example`).
- See `docs/environment.md` for common variables.

CSRF validation failed
- For mutating requests, `httpJson` adds `X-CSRF-Token` automatically in the browser (`src/lib/http.ts:1`).
- Forms must include hidden `_csrf` field; cookie `CSRF_TOKEN` must be present.

CSP violations (analytics blocked)
- Update `next.config.mjs:1` CSP `script-src`/`connect-src`/`frame-src`. See `docs/csp.md`.

Storybook not loading styles
- Ensure global CSS is configured in `.storybook/preview.tsx`.

Playwright timeouts
- Run headed mode and slow-mo to debug: `pnpm exec playwright test --headed --slow-mo=200`.

Locale not applied or 404
- Verify `NextIntlConfig` locales (`src/i18n/config.ts:1`) and middleware negotiation.

