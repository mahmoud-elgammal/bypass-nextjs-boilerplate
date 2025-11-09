import { config, proxy } from "./src/proxy";
import {
  chainMatch,
  isPageRequest,
  csp,
  reporting,
  strictDynamic,
  strictInlineStyles,
} from "@next-safe/middleware";

// const security = csp({
//   contentSecurityPolicy: {
//     "default-src": "'self'",
//     "script-src": [
//       "'self'",
//       "'unsafe-inline'",
//       "https://www.googletagmanager.com",
//       "https://www.google-analytics.com",
//       "https://cdn.posthog.com",
//       "https://js.sentry-cdn.com",
//     ],
//     "style-src": ["'self'", "'unsafe-inline'"],
//     "img-src": ["'self'", "data:", "https:"],
//     "font-src": ["'self'", "data:"],
//     "connect-src": ["'self'", "https:"],
//     "frame-src": ["https://www.googletagmanager.com"],
//     "worker-src": ["'self'", "blob:"],
//   },
//   referrerPolicy: "no-referrer-when-downgrade",
//   xFrameOptions: "DENY",
//   xContentTypeOptions: "nosniff",
//   strictTransportSecurity: "max-age=63072000; includeSubDomains; preload",
//   permissionsPolicy: {
//     camera: [],
//     microphone: [],
//     geolocation: [],
//     payment: [],
//   },
// });

const securityMiddleware = [csp(), strictDynamic(), reporting()];

export default function middleware(req: any, ev: any) {
  const res = proxy(req);
  // Apply security headers via next-safe-middleware
  return res;
}
