// Guide: set up a new hotel — Cluster → Business Unit → seat licence → a user in the BU.
// WRITES TO DEV. Every record is named MANUAL-DEMO-…; global teardown removes what it can.
//
// Business unit guardrail: saving a business unit only stores a record (checked in
// carmen-backstage BusinessUnitEdit.tsx and the backend's createBusinessUnit — no database is
// created and no migration runs). The Database connection is still left "Not set" here, so the
// demo record never points at a real database.
import { test } from '../fixtures.ts'
import { createDemoUser, demoCode, demoName, isoDate } from '../demo-data.ts'
import {
  L,
  button,
  createdId,
  expectWrite,
  go,
  main,
  openTab,
  reEsc,
  scrollToMiddle,
  selectsLoaded,
  setInlineSelect,
  setInlineText,
  snap,
  successToast,
  toastsGone,
} from './ui.ts'

const G = 'guide-setup-hotel'
const BU_DB_CONNECTION = ['#database_pool_id', '#db_schema']

test.describe.serial('setup-hotel', () => {
  const s = { clusterId: '', clusterName: '', buId: '', buName: '', userEmail: '' }

  test.beforeAll(async () => {
    // The person who will work at the hotel already has an account (the add-user guide shows
    // how to create one); this guide only puts them into the new cluster and business unit.
    s.userEmail = (await createDemoUser('hotel-user')).email
  })

  test('cluster', async ({ page }) => {
    s.clusterName = demoName('cluster')
    await go(page, '/clusters/new')
    await snap(page, `${G}-01-cluster-form-empty`)

    const form = main(page)
    await form.locator('input[name="code"]').fill(demoCode('H'))
    await form.locator('input[name="name"]').fill(s.clusterName)
    await form.locator('input[name="licensed_bus"]').fill('2')
    await form.getByRole('checkbox', { name: L('Never expires', 'ไม่มีวันหมดอายุ') }).check()
    await snap(page, `${G}-02-cluster-form-filled`)

    const res = await expectWrite(page, 'POST', '/api-system/clusters', () =>
      button(form, L('Create cluster', 'สร้าง Cluster')).click(),
    )
    s.clusterId = await createdId(res)
    await page.waitForURL(`**/clusters/${s.clusterId}/edit`)
    await successToast(page)
    await snap(page, `${G}-03-cluster-created`)
  })

  test('business unit', async ({ page }) => {
    s.buName = demoName('hotel')
    await go(page, '/business-units/new')
    await snap(page, `${G}-04-bu-form-empty`)

    await setInlineText(page, ['Business unit name', 'ชื่อหน่วยธุรกิจ'], s.buName, page.locator('h1').getByRole('button').first())
    await setInlineSelect(page, ['Cluster'], s.clusterName)
    await snap(page, `${G}-05-bu-form-filled`)

    await openTab(page, L('Technical', 'เทคนิค'))
    await scrollToMiddle(page, '#database_pool_id')
    await snap(page, `${G}-06-bu-technical`, { maskOptional: BU_DB_CONNECTION })
    await openTab(page, L('General', 'ทั่วไป'))

    const res = await expectWrite(page, 'POST', '/api-system/business-units', () =>
      button(page.locator('.unsaved-bar'), L('Create Business Unit', 'สร้างหน่วยธุรกิจ')).click(),
    )
    s.buId = await createdId(res)
    await page.waitForURL(`**/business-units/${s.buId}/edit`)
    await successToast(page)
    await selectsLoaded(page)
    await snap(page, `${G}-07-bu-created`, { maskOptional: BU_DB_CONNECTION })
  })

  test('seat licence', async ({ page }) => {
    await go(page, `/licenses/${s.clusterId}`)
    await snap(page, `${G}-08-license-center`)

    await openTab(page, L('Seats', 'ที่นั่ง'))
    await snap(page, `${G}-09-seats-tab-empty`)

    const row = main(page).locator('tr', { hasText: s.buName }).first()
    await row.getByRole('link', { name: L('Add seat license', 'เพิ่มไลเซนส์ที่นั่ง') }).first().click()
    await page.waitForURL('**/licenses/seats/new**')
    await page.waitForLoadState('networkidle').catch(() => {})
    await page.locator('#amount').fill('5')
    await page.locator('#end_date').fill(isoDate(365))
    await snap(page, `${G}-10-seat-form-filled`)

    await expectWrite(page, 'POST', `/api-system/business-units/${s.buId}/licenses`, () =>
      button(main(page), L('Create License', 'สร้างไลเซนส์')).click(),
    )
    await successToast(page)
    await toastsGone(page)
    await go(page, `/licenses/${s.clusterId}`)
    await openTab(page, L('Seats', 'ที่นั่ง'))
    await snap(page, `${G}-11-seat-license-added`)
  })

  test('user into cluster and business unit', async ({ page }) => {
    await go(page, `/clusters/${s.clusterId}/edit`)
    await openTab(page, /^(Users|ผู้ใช้งาน)/)
    await button(main(page), L('Add User', 'เพิ่มผู้ใช้')).click()
    let dialog = page.getByRole('dialog')
    await dialog.getByRole('textbox').first().fill(s.userEmail)
    await dialog.getByRole('button', { name: new RegExp(reEsc(s.userEmail)) }).first().click()
    await snap(page, `${G}-12-cluster-add-user-dialog`)

    await expectWrite(page, 'POST', '/api-system/user/clusters', () =>
      button(dialog, L('Add User', 'เพิ่มผู้ใช้')).click(),
    )
    await successToast(page)
    await dialog.waitFor({ state: 'hidden' }).catch(() => {})
    await main(page).getByText(s.userEmail).first().waitFor({ state: 'visible', timeout: 15_000 })
    await snap(page, `${G}-13-cluster-user-added`)
    await toastsGone(page)

    await go(page, `/business-units/${s.buId}/edit`)
    await openTab(page, /^(Users|ผู้ใช้งาน)/)
    await button(main(page), L('Add User', 'เพิ่มผู้ใช้')).click()
    dialog = page.getByRole('dialog')
    await dialog.getByRole('textbox').first().fill(s.userEmail)
    await dialog.getByRole('button', { name: new RegExp(reEsc(s.userEmail)) }).first().click()
    await dialog.locator('select').first().selectOption('admin')
    await snap(page, `${G}-14-bu-add-user-dialog`)

    await expectWrite(page, 'POST', '/api-system/user/business-units', () =>
      button(dialog, L('Add User', 'เพิ่มผู้ใช้')).click(),
    )
    await successToast(page)
    await dialog.waitFor({ state: 'hidden' }).catch(() => {})
    await main(page).getByText(s.userEmail).first().waitFor({ state: 'visible', timeout: 15_000 })
    await snap(page, `${G}-15-bu-user-added`)
  })
})
