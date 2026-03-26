"use client";

import { motion } from "framer-motion";
import { Globe, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useCurrentLocale, useI18n } from "@/i18n/next-international.client";
import Logo from "./Logo";

export default function Footer() {
  const t = useI18n();
  const locale = useCurrentLocale();

  const sections = [
    {
      title: "Product",
      links: [
        { name: t("common.nav.features"), href: "#features" },
        { name: t("common.nav.pricing"), href: "#pricing" },
        { name: "Changelog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: t("common.nav.docs"), href: "https://nextjs.org/docs" },
        { name: "Templates", href: "https://vercel.com/templates" },
        {
          name: "Examples",
          href: "https://github.com/vercel/next.js/tree/canary/examples",
        },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: t("common.footer.privacy"), href: "#" },
        { name: t("common.footer.terms"), href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-[#0A0A0B] pt-24 pb-12 overflow-hidden">
      {/* Background Glows (Solid Opacity) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-24 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-6">
            <Link
              href={`/${locale}`}
              className="group transition-all hover:opacity-90"
            >
              <Logo size="lg" />
            </Link>
            <p className="max-w-xs text-base leading-relaxed text-zinc-500">
              {t("common.blurb")}
            </p>
            <div className="flex gap-4">
              <motion.div whileHover={{ y: -3 }}>
                <Link
                  href="#"
                  className="h-10 w-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-zinc-500 transition-all hover:border-white/20 hover:text-white hover:bg-white/10"
                >
                  <Globe size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }}>
                <Link
                  href="#"
                  className="h-10 w-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-zinc-500 transition-all hover:border-white/20 hover:text-white hover:bg-white/10"
                >
                  <LinkIcon size={18} />
                </Link>
              </motion.div>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-200">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-zinc-500 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-12 text-sm font-medium text-zinc-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Bypass.{" "}
            <span className="text-zinc-500">{t("common.footer.rights")}</span>
          </p>
          <div className="flex gap-8">
            <Link href="#" className="transition-colors hover:text-white">
              {t("common.footer.privacy")}
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              {t("common.footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
