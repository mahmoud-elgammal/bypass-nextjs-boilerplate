"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent } from "@/stores/useConsent";

let sentryInited = false;

export default function Analytics() {
  const analytics = useConsent((s) => s.consent.analytics);

  useEffect(() => {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;
    if (!dsn) return;
    if (!analytics) return;
    if (sentryInited) return;

    (async () => {
      try {
        const Sentry = await import("@sentry/react");
        Sentry.init({
          dsn,
          tracesSampleRate: 1.0,
        } as any);
        sentryInited = true;
      } catch {
        // ignore
      }
    })();
  }, [analytics]);

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID;
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

  if (!analytics) return null;

  return (
    <>
      {gtmId && (
        <>
          <Script
            id="gtm-datalayer"
            type="text/partytown"
            strategy="afterInteractive"
          >{`
              (function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              })(window,document,'script','dataLayer','${gtmId}');
            `}</Script>
          <Script
            id="gtm"
            type="text/partytown"
            src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
            strategy="afterInteractive"
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              title="Google Tag Manager"
              role="none"
              hidden
            />
          </noscript>
        </>
      )}

      {!gtmId && gtagId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            type="text/partytown"
            strategy="afterInteractive"
          />
          <Script
            id="gtag-init"
            type="text/partytown"
            strategy="afterInteractive"
          >{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtagId}', { anonymize_ip: true });
            `}</Script>
        </>
      )}

      {posthogKey && (
        <>
          <Script
            src="https://cdn.posthog.com/posthog.js"
            type="text/partytown"
            strategy="afterInteractive"
          />
          <Script
            id="posthog-init"
            type="text/partytown"
            strategy="afterInteractive"
          >{`
              (function(){
                if (!window.posthog) return;
                try { window.posthog.init('${posthogKey}', { api_host: '${posthogHost}', capture_pageview: true, respect_dnt: true }); } catch(e) {}
              })();
            `}</Script>
        </>
      )}
    </>
  );
}
