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
`BASEAPP_LOGIN_PASSWORD`. To run it locally, copy `.env.example` to `.env` and
fill in your credentials, then run
`npx playwright test tests/e2e/login.spec.ts`. `.env` is ignored by Git, so
credentials stay local; do not put real credentials in source files. The
authenticated test is skipped when either value is missing.