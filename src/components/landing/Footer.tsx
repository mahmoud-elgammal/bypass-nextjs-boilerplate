"use client";

import { GitHubIcon } from "./icons";

const GITHUB_URL =
  "https://github.com/nicholasadamou/bypass-nextjs-boilerplate";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="landing-container footer-inner">
        <p className="footer-copy">© {new Date().getFullYear()} Next Edge</p>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          aria-label="Next Edge on GitHub"
        >
          <GitHubIcon />
          GitHub
        </a>
      </div>
    </footer>
  );
}
