import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly getStartedLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator("xpath=//a[normalize-space(.)='Get started']");
  }

  async open() {
    await this.page.goto("/");
  }

  async verifyLoaded() {
    await expect(this.page).toHaveTitle(/Playwright/);
    await expect(this.getStartedLink).toBeVisible();
  }
}
