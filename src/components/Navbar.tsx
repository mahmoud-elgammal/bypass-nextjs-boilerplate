"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCurrentLocale, useI18n } from "@/i18n/next-international.client";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const t = useI18n();
  const locale = useCurrentLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("common.nav.features"), href: "#features" },
    { name: t("common.nav.pricing"), href: "#pricing" },
    { name: t("common.nav.docs"), href: "https://nextjs.org/docs" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300">
      <motion.div
        animate={{ y: [-20, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-5xl rounded-full border border-white/20 bg-[#1A1A1E]/95 backdrop-blur-2xl transition-all duration-500 ${
          scrolled
            ? "px-6 py-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]"
            : "px-8 py-3"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="transition-all hover:opacity-90">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white group"
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-white"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <LocaleSwitcher current={locale} />
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#get-started"
                className="relative overflow-hidden rounded-full bg-white px-6 py-2 text-sm font-bold text-black"
              >
                {t("common.nav.getStarted")}
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="absolute top-20 left-0 right-0 mx-4 overflow-hidden rounded-3xl border border-white/10 bg-[#121214]/95 p-6 backdrop-blur-3xl shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-bold text-zinc-100 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-500">
                    Language
                  </span>
                  <LocaleSwitcher current={locale} />
                </div>
                <Link
                  href="#get-started"
                  className="rounded-full bg-white py-4 text-center text-sm font-bold text-black"
                  onClick={() => setIsOpen(false)}
                >
                  {t("common.nav.getStarted")}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
