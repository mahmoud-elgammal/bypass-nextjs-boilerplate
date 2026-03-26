"use server";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/constants/cache";
import { getSiteInfo } from "@/queries/site";

export async function getSiteInfoAction() {
  // Server action wrapping cached data fetch
  return await getSiteInfo();
}

export async function revalidateSiteInfoAction() {
  revalidateTag(CACHE_TAGS.SITE_INFO, {});
  return { ok: true } as const;
}
