// Guide: view a business unit's settings; the hotel details form is opened but NEVER saved.
import { test } from '../../fixtures.ts'
import { L, button, snap } from '../../guides/ui.ts'
import { GUIDE_BU, goC } from './shared.ts'

const G = 'guide-bu-settings'

test('view settings', async ({ page }) => {
  await goC(page, '/business-units')
  await page.locator('table tbody tr', { hasText: GUIDE_BU }).first().locator('a').first().click()
  await page.waitForURL(/\/business-units\/[^/]+\/edit/)
  const open = async (q: string) => {
    const url = new URL(page.url()); url.search = q
    await page.goto(url.toString()); await page.waitForLoadState('networkidle').catch(() => {})
  }
  await open('?tab=configuration')
  await snap(page, `${G}-01-configuration`)
  await open('?tab=hotel')
  await snap(page, `${G}-02-hotel`)
  const edit = button(page.locator('main'), L('Edit', 'แก้ไข'))
  if (await edit.count()) {
    await edit.click()
    await page.waitForTimeout(300)
    await snap(page, `${G}-03-hotel-edit`)
  }
})
