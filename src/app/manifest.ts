import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "next-edge",
    short_name: "next-edge",
    description:
      "A clean, minimalist Next.js starter with Tailwind and dark mode.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0ea5e9",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32 48x48 64x64",
        type: "image/x-icon",
      },
      { src: "/icons/icon-64.png", sizes: "64x64", type: "image/png" },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      { src: "/icons/icon-256.png", sizes: "256x256", type: "image/png" },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
