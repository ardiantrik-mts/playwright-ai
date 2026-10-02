import { expect, test } from "@playwright/test";

test("Playwright homepage supports XPath locators", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Playwright/);
  await expect(
    page.locator("xpath=//a[normalize-space(.)='Get started']"),
  ).toBeVisible();
});