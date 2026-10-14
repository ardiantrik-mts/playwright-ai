import { expect, type Locator, type Page } from "@playwright/test";

const loginUrl = "https://nuxt-baseapp-node.on-premise.mitrais-dev.com/";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly forgotPasswordLink: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.forgotPasswordLink = page.getByRole("link", { name: "Forgot your password?" });
    this.loginButton = page.getByRole("button", { name: "Login", exact: true });
  }

  async open() {
    await this.page.goto(loginUrl);
    await this.page.waitForLoadState("networkidle");
  }

  async verifyLoaded() {
    await expect(this.page).toHaveTitle("Nuxt Base App");
    await expect(this.page.getByRole("heading", { name: "Login to your account" })).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
