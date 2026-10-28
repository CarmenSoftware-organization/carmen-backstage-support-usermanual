// Guide: check licences and expiry. Read-only.
import { test } from '../../fixtures.ts'
import { snap } from '../../guides/ui.ts'
import { GUIDE_BU, goC } from './shared.ts'

const G = 'guide-licences'

test('read licences', async ({ page }) => {
  await goC(page, '/licenses')
  await snap(page, `${G}-01-overview`, { fullPage: true })

  await goC(page, '/business-units')
  await page.locator('table tbody tr', { hasText: GUIDE_BU }).first().locator('a').first().click()
  await page.waitForURL(/\/business-units\/[^/]+\/edit/)
  const url = new URL(page.url()); url.search = '?tab=licenses&license=seats'
  await page.goto(url.toString()); await page.waitForLoadState('networkidle').catch(() => {})
  await snap(page, `${G}-02-bu-licences`)

  // "Manage licences" on this tab only opens the cluster's Licenses page (shot 01) — no extra shot.
})
