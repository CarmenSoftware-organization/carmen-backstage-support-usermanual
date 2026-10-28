// Opens one Shot's screen, runs its prepare step and saves it. Shared by the support and
// Cluster Admin screen captures.
import type { Page } from '@playwright/test'
import { shoot } from './fixtures.ts'
import type { Shot } from './screens.manifest.ts'

async function openFirstRow(page: Page, shot: Shot): Promise<void> {
  const row = page.locator(shot.rowSelector ?? 'table tbody tr').first()
  await row.waitFor({ state: 'visible', timeout: 15_000 })
  const link = row.locator('a').first()
  const before = page.url()
  if (await link.count()) await link.click()
  else await row.click()
  await page.waitForURL((u) => u.toString() !== before, { timeout: 15_000 })
  // The URL changes before the lazy detail route renders; wait until the list row is gone.
  await row.waitFor({ state: 'detached', timeout: 15_000 })
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
}

export async function capture(page: Page, shot: Shot): Promise<void> {
  await page.goto(shot.path, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
  const listPath = new URL(shot.path, 'http://x').pathname
  if (shot.openFirstRow) {
    await openFirstRow(page, shot)
    const landed = new URL(page.url()).pathname
    if (!landed.startsWith(`${listPath}/`)) throw new Error(`first row opened ${landed}, expected ${listPath}/…`)
  } else if (!shot.loggedOut) {
    const landed = new URL(page.url()).pathname
    if (landed !== listPath) throw new Error(`landed on ${landed}, expected ${listPath}`)
  }
  if (shot.prepare) {
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
    const before = new URL(page.url()).pathname
    await shot.prepare(page)
    const after = new URL(page.url()).pathname
    if (!shot.prepareNavigates && after !== before) throw new Error(`prepare left ${before} for ${after}`)
  }
  await shoot(page, shot.slug, {
    mask: shot.mask,
    maskOptional: shot.maskOptional,
    fullPage: shot.fullPage,
    allowLogin: shot.loggedOut,
  })
}
