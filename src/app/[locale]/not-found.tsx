import Link from "next/link";

export default async function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-semibold">
        {"Page Not Found"}
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        {"The page you’re looking for doesn’t exist."}
      </p>
      <Link
        href="/"
        className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        {"Back to Home"}
      </Link>
    </main>
  );
}
