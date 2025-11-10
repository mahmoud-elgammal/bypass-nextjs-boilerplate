# Content Security Policy (CSP)

Where it’s configured
- Global headers (including CSP) are set in `next.config.mjs:1` via `headers()`.

Defaults included
- `default-src 'self'`
- `script-src 'self' 'unsafe-inline'` plus GTM, GA, PostHog, Sentry CDNs
- `style-src 'self' 'unsafe-inline'`
- `img-src 'self' data: https:`; `font-src 'self' data:`
- `connect-src 'self' https:`; `frame-src` includes GTM; `worker-src 'self' blob:`

Adding a third-party script
1. Add the provider’s script host(s) to `script-src`.
2. If it loads assets or posts beacons, add hosts to `connect-src`, `img-src`, or `frame-src` as needed.
3. If it renders iframes, add to `frame-src`.
4. Rebuild and verify via browser DevTools (CSP violations appear in console/network).

Examples
- PostHog: already permitted (`https://cdn.posthog.com` for scripts; API host via `connect-src`).
- GTM/GA4: scripts and iframe hosts already included.

Notes
- Keep the policy minimal and specific. Avoid adding wildcards.
- If adopting nonces/hashes, remove `'unsafe-inline'` and update script injection accordingly.

