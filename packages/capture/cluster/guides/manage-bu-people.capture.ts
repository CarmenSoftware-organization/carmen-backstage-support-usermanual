// Guide: manage people — change a member's cluster role, then remove them. WRITES TO DEV, only on
// a MANUAL-DEMO member the guide adds to the test cluster first (removed again afterwards).
import { test } from '../../fixtures.ts'
import { removeDemoMember } from '../../demo-data.ts'
import { adminCluster } from '../../fixtures.ts'
import { L, Lpart, button, expectWrite, snap, successToast } from '../../guides/ui.ts'
import { demoMember, findMember, goC } from './shared.ts'

const G = 'guide-manage-bu-people'

test.describe.serial('manage-bu-people', () => {
  const s = { id: '', email: '' }
  test.beforeAll(async () => Object.assign(s, await demoMember('people')))
  test.afterAll(async () => { if (s.id) await removeDemoMember(adminCluster().id, s.id).catch(() => {}) })

  test('change role and remove', async ({ page }) => {
    await goC(page, '/users')
    const row = await findMember(page, s.email)
    await row.getByRole('button', { name: Lpart('Actions for', 'การกระทำสำหรับ') }).click()
    await page.getByRole('menu').first().waitFor({ state: 'visible' })
    await snap(page, `${G}-01-row-menu`)

    await expectWrite(page, 'PUT', /\/user\/clusters\//, () =>
      page.getByRole('menuitem', { name: Lpart('Make ', 'ตั้งเป็น ') }).first().click())
    await successToast(page)
    await snap(page, `${G}-02-role-changed`)

    await row.getByRole('button', { name: Lpart('Actions for', 'การกระทำสำหรับ') }).click()
    await page.getByRole('menuitem', { name: L('Remove', 'นำออก') }).click()
    const dialog = page.getByRole('alertdialog').or(page.getByRole('dialog')).first()
    await dialog.waitFor({ state: 'visible' })
    await snap(page, `${G}-03-remove-confirm`)

    await expectWrite(page, 'DELETE', /\/user\/clusters\//, () => button(dialog, L('Remove', 'นำออก')).click())
    await successToast(page)
    await snap(page, `${G}-04-removed`)
  })
})
