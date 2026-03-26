import { ArrowRight, Code, Layers, Rocket, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import {
  getCurrentLocale,
  getI18n,
  getStaticParams,
} from "@/i18n/next-international.server";

const _SiteInfoClient = dynamic(() => import("@/components/SiteInfoClient"));
const _Greeting = dynamic(() => import("@/components/Greeting.client"));

export default async function Home() {
  const t = await getI18n();
  const _locale = await getCurrentLocale();

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#0A0A0B] text-white">
      {/* Background Glows (Solid Opacity) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] h-[400px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100" height="100" filter="url(#noise)" />
        </svg>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Hero Content */}
      <main className="relative z-20 flex flex-col items-center px-6 pt-32 lg:pt-48 pb-20 text-center">
        <div className="mx-auto max-w-5xl">
          {/* Badge */}
          <div className="group mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-zinc-300 group-hover:text-white transition-colors">
              {t("landing.hero.badge")}
            </span>
            <ArrowRight className="h-4 w-4 text-white/40 group-hover:translate-x-0.5 transition-transform" />
          </div>

          <h1 className="mb-8 text-6xl font-black tracking-tight sm:text-8xl lg:text-9xl leading-[0.9] text-white">
            {t("landing.hero.title")}
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl lg:text-2xl font-light">
            {t("landing.hero.description")}
          </p>

          {/* CTA Button */}
          <div className="mb-24 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href="#get-started"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-10 text-lg font-bold text-black transition-all hover:bg-zinc-200 active:scale-[0.98]"
            >
              {t("landing.hero.primaryCTA")}
            </a>
          </div>

          {/* High-End Hyper-Glass Visual */}
          <div className="relative mx-auto mt-12 w-full max-w-5xl px-4 lg:px-0 group [perspective:1000px]">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#121214]/80 p-1.5 backdrop-blur-2xl shadow-[0_0_80px_-20px_rgba(255,255,255,0.05)] transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateX(6deg)_translateY(-10px)_rotateY(1deg)]">
              {/* Internal Dashboard Elements */}
              <div className="rounded-[2.2rem] bg-[#0A0A0B] overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-white/10" />
                      <div className="h-3 w-3 rounded-full bg-white/10" />
                      <div className="h-3 w-3 rounded-full bg-white/10" />
                    </div>
                    <div className="h-4 w-32 rounded bg-white/5" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded bg-white/5" />
                    <div className="h-8 w-8 rounded bg-white/10" />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-6 p-8">
                  <div className="col-span-8 space-y-4">
                    <div className="h-40 rounded-3xl bg-white/[0.03] border border-white/5 p-6 relative overflow-hidden">
                      <div className="h-4 w-1/3 rounded bg-white/10 mb-4" />
                      <div className="h-2 w-full rounded bg-white/5 mb-2" />
                      <div className="h-2 w-2/3 rounded bg-white/5" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 rounded-3xl bg-white/[0.02] border border-white/5 p-6 flex flex-col items-center justify-center">
                        <Code className="text-white/40 h-6 w-6 mb-2" />
                        <div className="h-2 w-1/2 rounded bg-white/10" />
                      </div>
                      <div className="h-32 rounded-3xl bg-white/[0.02] border border-white/5 p-6 flex flex-col items-center justify-center">
                        <Layers className="text-white/40 h-6 w-6 mb-2" />
                        <div className="h-2 w-1/2 rounded bg-white/10" />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 rounded-3xl bg-white/[0.03] border border-white/5 p-6">
                    <div className="h-full w-full rounded-2xl bg-white/5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating Elements */}
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hidden lg:flex items-center justify-center opacity-40">
              <Rocket className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -bottom-6 -left-12 h-24 w-24 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hidden lg:flex items-center justify-center opacity-40">
              <div className="h-8 w-8 rounded bg-white/10" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return getStaticParams();
}
