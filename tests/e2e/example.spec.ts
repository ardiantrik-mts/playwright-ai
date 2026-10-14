import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage.js";

test("Playwright homepage supports XPath locators", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();
  await homePage.verifyLoaded();
});