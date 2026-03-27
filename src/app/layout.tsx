import { Partytown } from "@qwik.dev/partytown/react";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bypass Next.js Boilerplate | Home",
  description: "Bypass Next.js Boilerplate starter to bypass the boring setup.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icons/icon-64.png", type: "image/png", sizes: "64x64" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-256.png", type: "image/png", sizes: "256x256" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/icon-192.png",
    shortcut: "/favicon.ico",
  },
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Partytown
          debug={false}
          forward={["dataLayer.push", "gtag", "posthog.capture"]}
        />
      </head>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='light'||t==='dark'){d.dataset.theme=t;}else{d.removeAttribute('data-theme');}}catch(e){}})();`}
        </Script>

        {children}
      </body>
    </html>
  );
}

export default RootLayout;
