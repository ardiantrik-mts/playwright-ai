# Playwright + TypeScript

A minimal end-to-end test project using Node.js, TypeScript, and Playwright.

## Getting started

```bash
npm install
npx playwright install chromium
npm test
```

Run tests with the browser visible using `npm run test:headed`, or open the
HTML report with `npm run report` after a run.

## BaseApp login test

The login test reads credentials from `BASEAPP_LOGIN_EMAIL` and
`BASEAPP_LOGIN_PASSWORD`. Set both environment variables before running
`npx playwright test tests/e2e/login.spec.ts`; the authenticated test is
skipped when either variable is missing.