# Architecture

- App Router: routes, layouts, and API routes live under `src/app`.
- UI components: reusable, typed components under `src/components`.
- Providers: app context providers (`src/providers`).
- State: Zustand stores under `src/stores`.
- Server Actions: colocated in `src/actions`.
- Hooks: reusable hooks under `src/hooks` (named `useX.ts`).
- Lib: utilities and HTTP helpers under `src/lib`.
- Schemas/Constants: Zod schemas in `src/schemas`; constants in `src/constants`.
- i18n: config and helpers in `src/i18n`; messages in `messages/<locale>/<ns>.json`.

Routing
- Locale-aware routes under `src/app/[locale]/**`.
- Middleware negotiates locale and issues CSRF cookie: `middleware.ts:1`.
- Healthcheck endpoint: `src/app/api/health/route.ts:1`.

Internationalization
- Configures supported locales and defaults: `src/i18n/config.ts:1`.
- Server/client helpers with `next-international`: `src/i18n/next-international.server.ts:1`, `src/i18n/next-international.client.ts:1`.
- See i18n details in `docs/i18n.md`.

Caching & Data
- SWR provider set at layout-level for client caching: `src/providers/SWRProvider.client.tsx:1`.
- ETag-aware JSON helper and parsing utilities: `src/lib/http.ts:1`.
- Example site info query and client cache: `src/queries/site.ts:1`, `src/components/SiteInfoClient.tsx:1`.

Security & CSP
- Security headers and CSP configured via `headers()`: `next.config.mjs:1`.
- CSRF token issued by middleware; APIs/actions validate token. See `docs/security.md`.

Analytics & Consent
- Consent-aware loading of GTM/GA4/PostHog in `src/components/Analytics.tsx:1`.
- Partytown defers third-party scripts. Update CSP when adding vendors.

SEO & Assets
- Default SEO config: `src/lib/seo.ts:1`. Sitemap/robots via `next-sitemap.config.js:1`.
- Manifest at `src/app/manifest.ts` (if present) and icons in `public/icons/*`.

Build & Performance
- Bundle analyzer: `ANALYZE=true pnpm build`.
- Million Lint via Next plugin: `next.config.mjs:1`.
- Lighthouse CI runs on production build (see `docs/ci-cd.md`).

