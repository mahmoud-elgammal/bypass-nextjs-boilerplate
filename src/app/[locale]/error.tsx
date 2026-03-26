"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Brand Lead Catch: Professional Error Logging
  if (error) {
    console.error("Critical System Exception:", error);
  }

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-semibold">{"Something Went Wrong"}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        {"An unexpected error occurred."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium text-foreground transition-colors hover:bg-black/4 dark:border-white/15 dark:hover:bg-white/5"
      >
        {"Try Again"}
      </button>
    </main>
  );
}
