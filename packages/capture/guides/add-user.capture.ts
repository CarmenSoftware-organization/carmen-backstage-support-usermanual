// Guide: add a user — create the account, set status, give a cluster role, assign a business
// unit with a BU role, then set a password.
// WRITES TO DEV. Every record is named MANUAL-DEMO-…; global teardown removes what it can.
import { randomBytes } from 'node:crypto'
import { test } from '../fixtures.ts'
import { addDemoSeatLicense, createDemoBusinessUnit, createDemoCluster, demoEmail } from '../demo-data.ts'
import { L, button, createdId, expectWrite, go, main, openTab, reEsc, scrollToMiddle, snap, successToast, toastsGone } from './ui.ts'

const G = 'guide-add-user'
// Typed passwords are painted over in every shot.
const PASSWORDS = ['#newPassword', '#confirmPassword']

test.describe.serial('add-user', () => {
  const s = { clusterId: '', clusterName: '', buName: '', userId: '', email: '' }

  test.beforeAll(async () => {
    // The hotel already exists (the setup-hotel guide shows how to create one).
    const cluster = await createDemoCluster('user-cluster', 'U')
    s.clusterId = cluster.id
    s.clusterName = cluster.name
    const bu = await createDemoBusinessUnit(cluster.id, 'user-hotel')
    s.buName = bu.name
    await addDemoSeatLicense(bu.id)
  })

  test('create the account', async ({ page }) => {
    s.email = demoEmail('user')
    await go(page, '/users')
    await snap(page, `${G}-01-users-list`)

    await go(page, '/users/new')
    await snap(page, `${G}-02-form-empty`)

    const form = main(page)
    await form.locator('#username').fill(s.email)
    await form.locator('input[name="email"]').fill(s.email)
    await form.locator('input[name="firstname"]').fill('Manual')
    await form.locator('input[name="lastname"]').fill('Demo')
    await form.locator('input[name="alias_name"]').fill('Demo')
    await snap(page, `${G}-03-form-filled`)

    const res = await expectWrite(page, 'POST', /\/api-system\/user$/, () =>
      button(form, L('Create User', 'สร้างผู้ใช้')).click(),
    )
    s.userId = await createdId(res)
    await page.waitForURL(`**/users/${s.userId}/edit`)
    await successToast(page)
    await snap(page, `${G}-04-created`)
  })

  test('status', async ({ page }) => {
    await go(page, `/users/${s.userId}/edit`)
    await button(main(page), L('Edit', 'แก้ไข')).click()
    const active = main(page).locator('input[name="is_active"]')
    await active.waitFor({ state: 'visible' })
    await main(page).locator('input[name="middlename"]').fill('M.')
    await scrollToMiddle(page, 'input[name="is_active"]')
    await snap(page, `${G}-05-edit-status`)

    await expectWrite(page, 'PUT', `/api-system/user/${s.userId}`, () =>
      button(main(page), L('Save Changes', 'บันทึกการแก้ไข')).click(),
    )
    await successToast(page)
    await snap(page, `${G}-06-saved`)
  })

  test('cluster role', async ({ page }) => {
    // A user can only be given business units of a cluster they belong to.
    await go(page, `/clusters/${s.clusterId}/edit`)
    await openTab(page, /^(Users|ผู้ใช้งาน)/)
    await button(main(page), L('Add User', 'เพิ่มผู้ใช้')).click()
    const dialog = page.getByRole('dialog')
    await dialog.getByRole('textbox').first().fill(s.email)
    await dialog.getByRole('button', { name: new RegExp(reEsc(s.email)) }).first().click()
    await dialog.locator('select').first().selectOption('user')
    await snap(page, `${G}-07-cluster-add-user-dialog`)

    await expectWrite(page, 'POST', '/api-system/user/clusters', () =>
      button(dialog, L('Add User', 'เพิ่มผู้ใช้')).click(),
    )
    await successToast(page)
    await dialog.waitFor({ state: 'hidden' }).catch(() => {})
    await main(page).getByText(s.email).first().waitFor({ state: 'visible', timeout: 15_000 })
    await snap(page, `${G}-08-cluster-user-added`)
  })

  test('business unit and BU role', async ({ page }) => {
    await go(page, `/users/${s.userId}/edit`)
    await button(main(page), L('Add BU', 'เพิ่ม BU')).click()
    const dialog = page.getByRole('dialog')
    const selects = dialog.locator('select')
    await selects.first().selectOption({ label: s.clusterName })
    await dialog.locator('option', { hasText: s.buName }).first().waitFor({ state: 'attached', timeout: 15_000 })
    const buValue = await dialog.locator('option', { hasText: s.buName }).first().getAttribute('value')
    await selects.nth(1).selectOption(buValue ?? '')
    await selects.nth(2).selectOption('admin')
    await snap(page, `${G}-09-add-bu-dialog`)

    await expectWrite(page, 'POST', '/api-system/user/business-units', () =>
      button(dialog, L('Add', 'เพิ่ม')).click(),
    )
    await successToast(page)
    await dialog.waitFor({ state: 'hidden' }).catch(() => {})
    await main(page).getByText(s.buName).first().waitFor({ state: 'visible', timeout: 15_000 })
    await snap(page, `${G}-10-bu-assigned`)
    await toastsGone(page)
  })

  test('password', async ({ page }) => {
    await go(page, `/users/${s.userId}/edit`)
    await button(main(page), L('Change password', 'เปลี่ยนรหัสผ่าน')).click()
    const dialog = page.getByRole('dialog')
    await snap(page, `${G}-11-password-dialog`)

    // Random, never logged, and masked in the shot. The account is deleted by teardown.
    const password = `${randomBytes(9).toString('base64url')}Aa1!`
    await dialog.locator('#newPassword').fill(password)
    await dialog.locator('#confirmPassword').fill(password)
    await snap(page, `${G}-12-password-filled`, { mask: PASSWORDS })

    await expectWrite(page, 'PUT', `/api-system/user/${s.userId}/reset-password`, () =>
      button(dialog, L('Update Password', 'อัปเดตรหัสผ่าน')).click(),
    )
    await successToast(page)
    await dialog.waitFor({ state: 'hidden' }).catch(() => {})
    await snap(page, `${G}-13-password-changed`)
  })
})
