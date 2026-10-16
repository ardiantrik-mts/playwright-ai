import { expect, test as base } from "@playwright/test";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginFixtures = {
  credentials: LoginCredentials | undefined;
};

export const test = base.extend<LoginFixtures>({
  credentials: async ({}, use) => {
    const email = process.env.BASEAPP_LOGIN_EMAIL;
    const password = process.env.BASEAPP_LOGIN_PASSWORD;

    await use(email && password ? { email, password } : undefined);
  },
});

export { expect };
