// Next.js instrumentation entrypoint (server & edge)
// Initializes Sentry when DSN is configured. Runs during app boot.

export async function register() {
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;

  try {
    // Lazy import to keep edge bundle slim when unused
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn,
      tracesSampleRate: 1.0,
      profilesSampleRate: 0.5,
      release:
        process.env.SENTRY_RELEASE ||
        process.env.VERCEL_GIT_COMMIT_SHA ||
        process.env.GITHUB_SHA,
      enabled:
        process.env.NODE_ENV === "production" ||
        process.env.ENABLE_SENTRY === "true",
    } as any);
  } catch {
    // ignore init errors in instrumentation
  }
}
