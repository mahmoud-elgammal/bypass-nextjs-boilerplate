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
    <div>
      <h1>{"Something Went Wrong"}</h1>
      <p>{"An unexpected error occurred."}</p>
      <button type="button" onClick={() => reset()}>
        {"Try Again"}
      </button>
    </div>
  );
}
