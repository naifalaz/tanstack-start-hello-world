// tests/app.spec.ts
import { expect, test } from '@playwright/test';

test('products page shows SkyLaunch gear content', async ({ page }) => {
  await page.goto('/products');

  await expect(
    page.getByRole('heading', { name: /products/i })
  ).toBeVisible();

  await expect(
    page.getByText(/alpine ridge 2 tent/i)
  ).toBeVisible();
});