import Image from "next/image";
import dynamic from "next/dynamic";
import ThemeToggle from "@/components/ThemeToggle";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Greeting from "@/components/Greeting.client";
import {
  getI18n,
  getStaticParams,
  setStaticParamsLocale,
} from "@/i18n/next-international.server";

const SiteInfoClient = dynamic(() => import("@/components/SiteInfoClient"));

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="w-full max-w-xl rounded-2xl border border-black/10 p-6 sm:p-8 text-center shadow-sm dark:border-white/10">
        <div className="mb-6 flex items-center justify-between">
          <LocaleSwitcher current={locale} />
          <ThemeToggle />
        </div>
        <div className="mx-auto mb-6 w-24">
          <Image
            className="mx-auto opacity-90 dark:invert"
            src="/next.svg"
            alt="Next.js"
            width={96}
            height={20}
            priority
          />
        </div>
        <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("common.title")}
        </h1>
        <p className="mx-auto mb-8 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
          {t("common.blurb")} {t("common.edit")} — {t("home.subtitle")}
          <code className="mx-1 rounded-md bg-black/4 px-1.5 py-0.5 text-sm">
            src/app/[locale]/page.tsx
          </code>
          .
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("common.docs")}
          </a>
          <a
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium text-foreground transition-colors hover:bg-black/4 dark:border-white/15 dark:hover:bg-white/6"
            href="https://vercel.com/templates?framework=next.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("common.templates")}
          </a>
        </div>
        <div className="mt-6">
          <Greeting />
        </div>
        <div className="mt-6">
          <SiteInfoClient />
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return getStaticParams();
}
