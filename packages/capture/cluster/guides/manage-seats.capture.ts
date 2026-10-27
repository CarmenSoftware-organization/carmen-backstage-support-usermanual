// Guide: release a member's seat and restore it. WRITES TO DEV, only on a MANUAL-DEMO member the
// guide adds to the test cluster first (removed again afterwards, freeing the seat).
import { test } from '../../fixtures.ts'
import { removeDemoMember } from '../../demo-data.ts'
import { adminCluster } from '../../fixtures.ts'
import { L, Lpart, button, expectWrite, snap, successToast } from '../../guides/ui.ts'
import { demoMember, findMember, goC } from './shared.ts'

const G = 'guide-manage-seats'

test.describe.serial('manage-seats', () => {
  const s = { id: '', email: '' }
  test.beforeAll(async () => Object.assign(s, await demoMember('seats')))
  test.afterAll(async () => { if (s.id) await removeDemoMember(adminCluster().id, s.id).catch(() => {}) })

  test('release and restore a seat', async ({ page }) => {
    await goC(page, '/users')
    const row = await findMember(page, s.email)
    await snap(page, `${G}-01-users-seats`)

    await row.getByRole('button', { name: Lpart('Actions for', 'การกระทำสำหรับ') }).click()
    await page.getByRole('menuitem', { name: L('Release seat', 'ปล่อยที่นั่ง') }).click()
    let dialog = page.getByRole('alertdialog').or(page.getByRole('dialog')).first()
    await dialog.waitFor({ state: 'visible' })
    await snap(page, `${G}-02-release-confirm`)
    await expectWrite(page, 'POST', /\/seat\/release$/, () => button(dialog, L('Release seat', 'ปล่อยที่นั่ง')).click())
    await successToast(page).catch(() => {})
    await snap(page, `${G}-03-released`)

    await row.getByRole('button', { name: Lpart('Actions for', 'การกระทำสำหรับ') }).click()
    await page.getByRole('menuitem', { name: L('Restore seat', 'คืนที่นั่ง') }).click()
    dialog = page.getByRole('alertdialog').or(page.getByRole('dialog')).first()
    await dialog.waitFor({ state: 'visible' })
    await expectWrite(page, 'POST', /\/seat\/restore$/, () => button(dialog, L('Restore seat', 'คืนที่นั่ง')).click())
    await successToast(page).catch(() => {})
    await snap(page, `${G}-04-restored`)
  })
})
