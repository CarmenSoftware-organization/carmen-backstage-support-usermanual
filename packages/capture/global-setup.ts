// Logs in to DEV, saves the session, then snapshots feature flags and turns them all on.
import { chromium } from '@playwright/test'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { CAPTURE, HAS_CLUSTER_ADMIN, IGNORE_HTTPS_ERRORS, PATHS, addBypassHeaderRoute, clusterAdminLogin } from './env.ts'
import { cleanupDemoData, findAdminCluster } from './demo-data.ts'
import { restoreFlags, snapshotAndEnableFlags } from './flags.ts'

export default async function globalSetup(): Promise<void> {
  const browser = await chromium.launch()
  try {
    const context = await browser.newContext({ ignoreHTTPSErrors: IGNORE_HTTPS_ERRORS })
    await addBypassHeaderRoute(context)
    const page = await context.newPage()
    await page.goto(`${CAPTURE.baseUrl}/login`)
    await page.fill('input[name="username"]', CAPTURE.email)
    await page.fill('input[name="password"]', CAPTURE.password)
    await page.click('button[type="submit"]')
    await page.waitForURL('**/dashboard', { timeout: 30_000 }).catch(() => {
      throw new Error('Login to DEV failed (did not reach /dashboard). Check TEST_USER_EMAIL / TEST_USER_PASSWORD.')
    })
    mkdirSync(dirname(PATHS.authState), { recursive: true })
    await page.context().storageState({ path: PATHS.authState })

    if (HAS_CLUSTER_ADMIN) {
      // Second, separate session for the Cluster Admin manual. A cluster admin does not land on
      // /dashboard (one cluster → straight in, several → the cluster picker), so wait to leave /login.
      const { email, password } = clusterAdminLogin()
      const ca = await browser.newContext({ ignoreHTTPSErrors: IGNORE_HTTPS_ERRORS })
      await addBypassHeaderRoute(ca)
      const caPage = await ca.newPage()
      await caPage.goto(`${CAPTURE.baseUrl}/login`)
      await caPage.fill('input[name="username"]', email)
      await caPage.fill('input[name="password"]', password)
      await caPage.click('button[type="submit"]')
      await caPage.waitForURL((u) => !/^\/login(\/|$)/.test(u.pathname), { timeout: 30_000 }).catch(() => {
        throw new Error('Cluster-admin login to DEV failed. Check CLUSTER_ADMIN_EMAIL / CLUSTER_ADMIN_PASSWORD.')
      })
      await ca.storageState({ path: PATHS.clusterAdminAuthState })
      await ca.close()
    }
  } finally {
    await browser.close()
  }
  try {
    await snapshotAndEnableFlags()
  } catch (err) {
    // Snapshot was saved but enabling failed part-way: put the original back now.
    if (!(err instanceof Error && err.message.startsWith('Flags from a previous run'))) {
      await restoreFlags({ onConflict: 'keep-theirs' }).catch((e: unknown) => console.error('[flags] restore after failed enable also failed:', e))
    }
    throw err
  }
  // Only a run that took the snapshot may restore it in teardown — never a stale file.
  process.env.CAPTURE_FLAGS_OWNED = '1'
  if (!HAS_CLUSTER_ADMIN) {
    // No cluster-admin login this run: drop a session/cluster saved by an earlier run so nothing can use it.
    rmSync(PATHS.clusterAdminAuthState, { force: true })
    rmSync(PATHS.adminCluster, { force: true })
  }
  if (HAS_CLUSTER_ADMIN) {
    // Refuses a Super Admin login or a login that is not an admin of the test cluster.
    const cluster = await findAdminCluster()
    mkdirSync(dirname(PATHS.adminCluster), { recursive: true })
    writeFileSync(PATHS.adminCluster, JSON.stringify(cluster, null, 2))
    console.log(`[cluster-admin] shots are taken in ${cluster.code} (${cluster.name})`)
  }
  // Leftover MANUAL-DEMO records of an earlier run that never reached teardown (killed run).
  // Runs only after the flag step passed, so a refused start still changes nothing.
  // Anything it cannot remove is only listed; a failure never stops the run.
  try {
    await cleanupDemoData()
  } catch (err) {
    console.error('[demo-data] LEFTOVER SWEEP FAILED — run `bun run capture:cleanup-demo` and check DEV:', err)
  }
}
