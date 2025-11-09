import { test, expect } from '@playwright/test';

test('consent banner accepts and sets cookie', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByText('We use cookies')).toBeVisible();
  await page.getByRole('button', { name: 'Accept all' }).click();
  // Cookie should be set on document
  await expect.poll(async () => await page.evaluate(() => document.cookie)).toContain('CONSENT=');
});

