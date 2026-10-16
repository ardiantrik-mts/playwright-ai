import { expect, test } from "../fixtures/login.fixture.js";
import { LoginPage } from "../pages/loginPage.js";

test("login page shows the sign-in form", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.verifyLoaded();
});

test("login shows required-field errors when submitted empty", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("", "");

  await expect(page.getByText("Email is required", { exact: true })).toBeVisible();
  await expect(page.getByText("Password is required", { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/login(?:\?|$)/);
});

test("login rejects an invalid email format", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("not-an-email", "example");

  await expect(page.getByText("Invalid email", { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/login(?:\?|$)/);
});

test("login rejects invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("playwright.invalid@example.com", "not-a-valid-password");

  await expect(page.getByText("Login Failed", { exact: true })).toBeVisible();
  await expect(page.getByText("Validation failed", { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/login(?:\?|$)/);
});

test("user can log in with valid credentials", async ({ page, credentials }) => {
  if (!credentials) {
    test.skip(true, "Set BASEAPP_LOGIN_EMAIL and BASEAPP_LOGIN_PASSWORD to run this test.");
    return;
  }

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(credentials.email, credentials.password);

  await expect(page).toHaveURL("https://nuxt-baseapp-node.on-premise.mitrais-dev.com/account");
  await expect(page.getByRole("heading", { name: "Account Settings" })).toBeVisible();
});
