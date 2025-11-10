# Analytics & Tags

Consent-aware loading
- Analytics load only after user consents (analytics toggle stored in Zustand).
- Implementation: `src/components/Analytics.tsx:1`.

Supported providers
- Google Tag Manager (preferred): set `NEXT_PUBLIC_GTM_ID` (e.g., `GTM-XXXXXXX`).
- Google Analytics 4: set `NEXT_PUBLIC_GTAG_ID` (e.g., `G-XXXXXXXXXX`) when GTM is not set.
- PostHog: set `NEXT_PUBLIC_POSTHOG_KEY` and optional `NEXT_PUBLIC_POSTHOG_HOST`.
- Sentry: set `SENTRY_DSN` or `NEXT_PUBLIC_SENTRY_DSN` to initialize client SDK on consent.

Order of precedence
- GTM takes precedence over GA4.
- PostHog can run alongside GTM/GA4.

Performance & isolation
- Third-party scripts are marked with `type="text/partytown"` to offload via Partytown.
- Update CSP to allow required hosts. See `docs/csp.md`.

