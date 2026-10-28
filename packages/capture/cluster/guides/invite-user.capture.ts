// Guide: invite a user to a business unit. WRITES TO DEV: sends one invitation to a MANUAL-DEMO
// e-mail (example.com, never delivered) in the test cluster; the guide revokes it right after (cleanup is the fallback).
import { test } from '../../fixtures.ts'
import { demoEmail, revokeDemoInvitation } from '../../demo-data.ts'
import { adminCluster } from '../../fixtures.ts'
import { L, Lpart, button, expectWrite, snap, successToast } from '../../guides/ui.ts'
import { GUIDE_BU, goC } from './shared.ts'

const G = 'guide-invite-user'

let email = ''
// A pending invitation holds one of the cluster's seats: give it back straight away.
test.afterAll(async () => { if (email) await revokeDemoInvitation(adminCluster().id, email) })

test('invite a user', async ({ page }) => {
  await goC(page, '/users')
  await snap(page, `${G}-01-users-page`)

  await button(page.locator('main'), L('Invite user', 'เชิญผู้ใช้')).click()
  const dialog = page.getByRole('dialog').first()
  await dialog.waitFor({ state: 'visible' })
  await snap(page, `${G}-02-dialog`)

  email = demoEmail('invite')
  await dialog.locator('#invite-email').fill(email)
  // Give access to the guide's hotel: tick it in "Business unit access".
  await dialog.getByText(GUIDE_BU, { exact: true }).first().click()
  await snap(page, `${G}-03-filled`)

  await expectWrite(page, 'POST', /\/invitations$/, () => button(dialog, L('Send', 'ส่ง')).click())
  await successToast(page)
  await page.getByRole('tab', { name: Lpart('Invitations', 'คำเชิญ') }).first().click()
  await page.waitForLoadState('networkidle').catch(() => {})
  await snap(page, `${G}-04-invitations`)
})
