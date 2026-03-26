import "server-only";
import ky from "ky";
import { unstable_cache } from "next/cache";
import { z } from "zod";
import { CACHE_TAGS, REVALIDATE } from "@/constants/cache";
import { type SiteInfo, SiteInfoSchema } from "@/schemas/site";

const UPSTREAM = "https://api.github.com/repos/vercel/next.js"; // replace with real API

async function fetchSiteInfo(): Promise<SiteInfo> {
  try {
    const repo = await ky
      .get(UPSTREAM, { headers: { accept: "application/json" } })
      .json<{ name: string; description?: string }>();

    const parsed = z
      .object({ name: z.string(), description: z.string().default("") })
      .parse(repo);

    return SiteInfoSchema.parse({
      name: parsed.name,
      description: parsed.description,
      templates: [
        { id: "docs", title: "Documentation" },
        { id: "examples", title: "Examples" },
      ],
    });
  } catch {
    return {
      name: "next-edge",
      description: "Local fallback (offline)",
      templates: [
        { id: "starter", title: "Starter Template" },
        { id: "blog", title: "Blog Template" },
      ],
    } satisfies SiteInfo;
  }
}

export const getSiteInfo = unstable_cache(
  fetchSiteInfo,
  [CACHE_TAGS.SITE_INFO],
  {
    revalidate: REVALIDATE.SITE_INFO_SECONDS,
    tags: [CACHE_TAGS.SITE_INFO],
  },
);
