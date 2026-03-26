"use client";
import useSWR from "swr";

type SiteInfo = {
  name: string;
  description: string;
  templates: { id: string; title: string }[];
};

export default function SiteInfoClient() {
  const { data, isLoading, error, mutate } = useSWR<SiteInfo>("/api/site");
  if (isLoading && !data)
    return <div className="text-sm opacity-70">Loading site info…</div>;
  if (error) return <div className="text-sm text-red-600">Failed to load.</div>;
  if (!data) return null;
  return (
    <div className="text-sm">
      <div className="font-medium">{data.name}</div>
      <div className="opacity-70">{data.description}</div>
      <button
        type="button"
        onClick={() => mutate()}
        className="mt-2 inline-flex h-8 items-center rounded-full border px-3 text-xs"
      >
        Refresh
      </button>
    </div>
  );
}
