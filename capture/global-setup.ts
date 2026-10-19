// Logs in to DEV, saves the session, then snapshots feature flags and turns them all on.
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { CAPTURE, PATHS, extraHeaders } from './env.ts'
import { restoreFlags, snapshotAndEnableFlags } from './flags.ts'

export default async function globalSetup(): Promise<void> {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage({ ignoreHTTPSErrors: true, extraHTTPHeaders: extraHeaders() })
    await page.goto(`${CAPTURE.baseUrl}/login`)
    await page.fill('input[name="username"]', CAPTURE.email)
    await page.fill('input[name="password"]', CAPTURE.password)
    await page.click('button[type="submit"]')
    await page.waitForURL('**/dashboard', { timeout: 30_000 }).catch(() => {
      throw new Error('Login to DEV failed (did not reach /dashboard). Check TEST_USER_EMAIL / TEST_USER_PASSWORD.')
    })
    mkdirSync(dirname(PATHS.authState), { recursive: true })
    await page.context().storageState({ path: PATHS.authState })
  } finally {
    await browser.close()
  }
  try {
    await snapshotAndEnableFlags()
  } catch (err) {
    // Snapshot was saved but enabling failed part-way: put the original back now.
    if (!(err instanceof Error && err.message.startsWith('Flags from a previous run'))) {
      await restoreFlags().catch((e: unknown) => console.error('[flags] restore after failed enable also failed:', e))
    }
    throw err
  }
  // Only a run that took the snapshot may restore it in teardown — never a stale file.
  process.env.CAPTURE_FLAGS_OWNED = '1'
}
