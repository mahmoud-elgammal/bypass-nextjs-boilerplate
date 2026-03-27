"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BarChart3,
  Globe,
  Lock,
  Rocket,
  Search,
  Shield,
  TestTube,
  Zap,
} from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FEATURES = [
  {
    icon: Shield,
    title: "Security & CSP",
    description:
      "Strict security headers and Content Security Policy configured out of the box.",
  },
  {
    icon: Lock,
    title: "CSRF Protection",
    description:
      "CSRF tokens issued by middleware — forms and API routes validate automatically.",
  },
  {
    icon: Globe,
    title: "Internationalization",
    description:
      "Locale negotiation, RTL support, and next-international server/client helpers.",
  },
  {
    icon: Search,
    title: "SEO & Metadata",
    description:
      "next-seo defaults, sitemap, robots.txt, manifest, and structured data helpers.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Consent-aware GTM, GA4, and PostHog with Partytown for third-party scripts.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "SWR provider, ETag caching, Million Lint, bundle analyzer, and React 19.",
  },
  {
    icon: TestTube,
    title: "Testing & Quality",
    description:
      "Vitest unit tests, Playwright E2E, Storybook components, and Codecov CI.",
  },
  {
    icon: Rocket,
    title: "CI/CD & Releases",
    description:
      "Semantic releases, Renovate updates, Lighthouse CI, and branch protection.",
  },
] as const;

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-feature-card]", { autoAlpha: 0, y: 40 });

      gsap.to("[data-feature-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        autoAlpha: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="features" ref={sectionRef} className="features">
      <div className="landing-container">
        <div className="features-heading">
          <p className="features-label">Features</p>
          <h2 className="features-title">
            Everything you need.
            <br />
            <span>Nothing you don&apos;t.</span>
          </h2>
        </div>

        <div className="features-grid">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} data-feature-card className="feature-card">
              <div className="feature-icon">
                <Icon size={20} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
