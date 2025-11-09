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
