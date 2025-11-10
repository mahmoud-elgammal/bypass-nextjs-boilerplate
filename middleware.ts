import { proxy } from "./src/proxy";
import {
  chain,
  continued,
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

const security = chainMatch(isPageRequest)(
  strictDynamic(),
  strictInlineStyles(),
  csp(),
  reporting(),
);

export default chain(continued(proxy), continued(security));

// export { config } from "./src/proxy";
