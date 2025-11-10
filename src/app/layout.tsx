import type { Metadata } from "next";
import Script from "next/script";
import { Partytown } from "@qwik.dev/partytown/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DefaultSeo } from "next-seo";
import { defaultSeo } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Edge — Minimal Next.js Starter",
  description:
    "A clean, minimalist Next.js starter with Tailwind and dark mode.",
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

export default function RootLayout({
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='light'||t==='dark'){d.dataset.theme=t;}else{d.removeAttribute('data-theme');}}catch(e){}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
