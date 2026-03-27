"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { GitHubIcon } from "./icons";

gsap.registerPlugin(useGSAP);

const GITHUB_URL =
  "https://github.com/nicholasadamou/bypass-nextjs-boilerplate";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Set initial hidden state immediately
      gsap.set("[data-hero-badge]", { autoAlpha: 0, y: 20 });
      gsap.set("[data-hero-title] .hero-word", {
        autoAlpha: 0,
        y: 40,
        rotateX: -40,
      });
      gsap.set("[data-hero-sub]", { autoAlpha: 0, y: 20 });
      gsap.set("[data-hero-cta]", { autoAlpha: 0, y: 20 });
      gsap.set("[data-hero-glow]", { autoAlpha: 0, scale: 0.6 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      tl.to("[data-hero-badge]", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
      })
        .to(
          "[data-hero-title] .hero-word",
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.08,
            duration: 0.7,
          },
          "-=0.2",
        )
        .to(
          "[data-hero-sub]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.3",
        )
        .to(
          "[data-hero-cta]",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
          },
          "-=0.2",
        )
        .to(
          "[data-hero-glow]",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          0.2,
        );
    },
    { scope: containerRef },
  );

  const titleWords = [
    { text: "Bypass", accent: false },
    { text: "the", accent: false },
    { text: "boring", accent: true },
    { text: "setup.", accent: false },
  ];

  return (
    <section ref={containerRef} className="hero">
      <div data-hero-glow className="hero-glow" />

      <div className="landing-container hero-content">
        <div data-hero-badge className="hero-badge">
          <span className="hero-badge-dot" />
          Production-ready Next.js starter
        </div>

        <h1 data-hero-title className="hero-title">
          {titleWords.map(({ text, accent }) => (
            <span
              key={text}
              className={`hero-word${accent ? " hero-word--accent" : ""}`}
            >
              {text}
            </span>
          ))}
        </h1>

        <p data-hero-sub className="hero-subtitle">
          A batteries-included Next.js App Router boilerplate with security,
          i18n, SEO, testing, and CI/CD — so you can ship what matters.
        </p>

        <div className="hero-actions">
          <a data-hero-cta href="#features" className="btn-primary">
            Get Started
            <ArrowRight size={16} />
          </a>

          <a
            data-hero-cta
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <GitHubIcon />
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
