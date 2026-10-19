import { defineConfig } from '@playwright/test'
import { CAPTURE, PATHS, extraHeaders } from './env.ts'
import type { CaptureOptions } from './fixtures.ts'

export default defineConfig<CaptureOptions>({
  testDir: '.',
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  outputDir: './results',
  workers: 1,
  fullyParallel: false,
  retries: 0,
  timeout: 90_000,
  reporter: [['list']],
  use: {
    baseURL: CAPTURE.baseUrl,
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    storageState: PATHS.authState, // <repo>/.auth/state.json
    extraHTTPHeaders: extraHeaders(),
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'screens-th', testMatch: /screens\.capture\.ts/, use: { lang: 'th' } },
    { name: 'screens-en', testMatch: /screens\.capture\.ts/, use: { lang: 'en' } },
    { name: 'guides-th', testMatch: /guides\/.*\.capture\.ts/, use: { lang: 'th' } },
    { name: 'guides-en', testMatch: /guides\/.*\.capture\.ts/, use: { lang: 'en' } },
  ],
})
