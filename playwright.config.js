// @ts-check
import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  expect: {
    timeout: 2 * 1000,
  },
  testDir: './teste',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry - no */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://127.0.0.1:3000',
    NEXT_PUBLIC_URL: 'http://localhost:3000',

    /* Collect trace. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',

    /* Slow motion, and/or video */
    // launchOptions: {
    //   slowMo: 1000
    // },
    // video: {
    //   mode: 'on',
    //   size: { width: 640, height: 480 }
    // }
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
