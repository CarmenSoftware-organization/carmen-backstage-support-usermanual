import { defineConfig } from '@playwright/test'
import { CAPTURE, IGNORE_HTTPS_ERRORS, PATHS } from './env.ts'
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
    ignoreHTTPSErrors: IGNORE_HTTPS_ERRORS,
    storageState: PATHS.authState, // <repo>/.auth/state.json
    // The rate-limit bypass header is added per request in fixtures.ts (app + API origins only).
    screenshot: 'only-on-failure',
  },
  projects: [
    // Support manual (Super Admin session from global setup).
    { name: 'support-screens-th', testMatch: /screens\.capture\.ts$/, testIgnore: /\/cluster\//, use: { lang: 'th' } },
    { name: 'support-screens-en', testMatch: /screens\.capture\.ts$/, testIgnore: /\/cluster\//, use: { lang: 'en' } },
    { name: 'support-guides-th', testMatch: /\/guides\/.*\.capture\.ts$/, testIgnore: /\/cluster\//, use: { lang: 'th' } },
    { name: 'support-guides-en', testMatch: /\/guides\/.*\.capture\.ts$/, testIgnore: /\/cluster\//, use: { lang: 'en' } },
    // Cluster Admin manual: the cluster-admin session, never the Super Admin one.
    ...(['th', 'en'] as const).flatMap((lang) => [
      { name: `cluster-screens-${lang}`, testMatch: /\/cluster\/screens\.capture\.ts$/, use: { lang, app: 'cluster-admin' as const, storageState: PATHS.clusterAdminAuthState } },
      { name: `cluster-guides-${lang}`, testMatch: /\/cluster\/guides\/.*\.capture\.ts$/, use: { lang, app: 'cluster-admin' as const, storageState: PATHS.clusterAdminAuthState } },
    ]),
  ],
})
