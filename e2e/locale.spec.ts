import { expect, test } from "@playwright/test";

test("arabic locale route mounts with rtl container", async ({ page }) => {
  await page.goto("/ar");
  const rtlContainer = page.locator('[dir="rtl"]');
  await expect(rtlContainer).toBeVisible();
});
