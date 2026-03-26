import { expect, test } from "@playwright/test";

test("redirects to default locale and renders", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en(\/?|$)/);
  await expect(page.locator("body")).toBeVisible();
});
