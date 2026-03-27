"use client";

import { Star } from "lucide-react";
import Image from "next/image";

const GITHUB_URL =
  "https://github.com/nicholasadamou/bypass-nextjs-boilerplate";

export default function Header() {
  return (
    <header className="header">
      <div className="landing-container header-inner">
        <a href="/" className="header-logo" aria-label="Next Edge — Home">
          <Image src="/logo.svg" alt="" width={32} height={32} />
          Next Edge
        </a>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="header-cta"
          aria-label="Star on GitHub"
        >
          <Star size={16} />
          Star on GitHub
        </a>
      </div>
    </header>
  );
}
