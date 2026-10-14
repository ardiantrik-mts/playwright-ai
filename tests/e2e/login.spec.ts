import { expect, test } from "@playwright/test";

const loginUrl = "https://nuxt-baseapp-node.on-premise.mitrais-dev.com/";

test("login page shows the sign-in form", async ({ page }) => {
  await page.goto(loginUrl);

  await expect(page).toHaveTitle("Nuxt Base App");
  await expect(page.getByRole("heading", { name: "Login to your account" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Forgot your password?" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Login", exact: true })).toBeVisible();
});

test("user can log in with valid credentials", async ({ page }) => {
  const email = process.env.BASEAPP_LOGIN_EMAIL;
  const password = process.env.BASEAPP_LOGIN_PASSWORD;

  if (!email || !password) {
    test.skip(true, "Set BASEAPP_LOGIN_EMAIL and BASEAPP_LOGIN_PASSWORD to run this test.");
    return;
  }

  await page.goto(loginUrl);
  await page.waitForLoadState("networkidle");
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Login", exact: true }).click();

  await expect(page).toHaveURL(`${loginUrl}account`);
  await expect(page.getByRole("heading", { name: "Account Settings" })).toBeVisible();
});
