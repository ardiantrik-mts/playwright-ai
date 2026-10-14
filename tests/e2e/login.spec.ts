import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";

test("login page shows the sign-in form", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.verifyLoaded();
});

test("user can log in with valid credentials", async ({ page }) => {
  const email = process.env.BASEAPP_LOGIN_EMAIL;
  const password = process.env.BASEAPP_LOGIN_PASSWORD;

  if (!email || !password) {
    test.skip(true, "Set BASEAPP_LOGIN_EMAIL and BASEAPP_LOGIN_PASSWORD to run this test.");
    return;
  }

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(email, password);

  await expect(page).toHaveURL("https://nuxt-baseapp-node.on-premise.mitrais-dev.com/account");
  await expect(page.getByRole("heading", { name: "Account Settings" })).toBeVisible();
});
