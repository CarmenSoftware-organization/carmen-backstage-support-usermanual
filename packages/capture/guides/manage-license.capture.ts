// Guide: manage licences — the licence center of one cluster, a new subscription, seats,
// BU quota, an interface licence, and a licence feature group.
// WRITES TO DEV. Every record is named MANUAL-DEMO-…; teardown deletes the licence records,
// the cluster, business unit and feature group.
import { expect, test } from '../fixtures.ts'
import { createDemoBusinessUnit, createDemoCluster, demoCode, demoName, isoDate } from '../demo-data.ts'
import { L, button, expectWrite, go, main, openTab, scrollToMiddle, selectsLoaded, snap, successToast, toastsGone } from './ui.ts'

const G = 'guide-manage-license'

test.describe.serial('manage-license', () => {
  const s = { clusterId: '', clusterName: '', buId: '', buName: '' }

  test.beforeAll(async () => {
    // A hotel to license (the setup-hotel guide shows how to create one).
    const cluster = await createDemoCluster('license-cluster', 'L')
    s.clusterId = cluster.id
    s.clusterName = cluster.name
    const bu = await createDemoBusinessUnit(cluster.id, 'license-hotel')
    s.buId = bu.id
    s.buName = bu.name
  })

  test('licence center', async ({ page }) => {
    await go(page, '/licenses')
    const search = main(page).getByRole('textbox').first()
    await search.fill(s.clusterName)
    // The list filters after a short pause; wait until only this cluster is left.
    await expect(main(page).locator('table tbody tr')).toHaveCount(1, { timeout: 15_000 })
    await main(page).locator('tr', { hasText: s.clusterName }).first().waitFor({ state: 'visible', timeout: 15_000 })
    await snap(page, `${G}-01-licenses-list`)

    await main(page).locator('tr', { hasText: s.clusterName }).first().locator('a').first().click()
    await page.waitForURL(`**/licenses/${s.clusterId}**`)
    await snap(page, `${G}-02-license-center`)
  })

  test('subscription', async ({ page }) => {
    await go(page, `/licenses/${s.clusterId}`)
    await openTab(page, L('Subscriptions', 'สัญญา'))
    await snap(page, `${G}-03-subscriptions-tab-empty`)

    await main(page).getByRole('link', { name: L('Add subscription', 'เพิ่มสัญญา') }).first().click()
    await page.waitForURL('**/licenses/subscriptions/new**')
    await page.waitForLoadState('networkidle').catch(() => {})
    const buSelect = main(page).getByRole('combobox', { name: /Business Unit|หน่วยธุรกิจ/ })
    await buSelect.locator('option', { hasText: s.buName }).waitFor({ state: 'attached', timeout: 15_000 })
    await buSelect.selectOption({ label: (await buSelect.locator('option', { hasText: s.buName }).textContent())?.trim() ?? '' })
    await page.locator('#end_date').fill(isoDate(365))
    await snap(page, `${G}-04-subscription-form-filled`)

    await expectWrite(page, 'POST', '/api-system/platform/subscriptions', () =>
      button(main(page), L('Create Subscription', 'สร้างสัญญา')).click(),
    )
    await page.waitForURL('**/licenses/subscriptions/*/edit')
    await successToast(page)
    await snap(page, `${G}-05-subscription-created`)
    await toastsGone(page)

    // Pick what the contract includes: the licence feature groups bought.
    const group = main(page).getByRole('checkbox', { name: 'Full Access', exact: true })
    await group.check()
    await scrollToMiddle(page, 'input[type="checkbox"][aria-label="Full Access"]')
    await snap(page, `${G}-06-subscription-groups-picked`)

    await expectWrite(page, 'PUT', /\/api-system\/platform\/subscriptions\/[^/]+\/groups/, () =>
      button(page.locator('.unsaved-bar'), L('Save Changes', 'บันทึกการแก้ไข')).click(),
    )
    await successToast(page)
    await snap(page, `${G}-07-subscription-saved`)
  })

  test('seats', async ({ page }) => {
    await go(page, `/licenses/${s.clusterId}`)
    await openTab(page, L('Seats', 'ที่นั่ง'))
    const row = main(page).locator('tr', { hasText: s.buName }).first()
    await row.getByRole('link', { name: L('Add seat license', 'เพิ่มไลเซนส์ที่นั่ง') }).first().click()
    await page.waitForURL('**/licenses/seats/new**')
    await page.waitForLoadState('networkidle').catch(() => {})
    await page.locator('#amount').fill('10')
    await page.locator('#reference_no').fill(demoCode('PO'))
    await page.locator('#end_date').fill(isoDate(365))
    await snap(page, `${G}-08-seat-form-filled`)

    await expectWrite(page, 'POST', `/api-system/business-units/${s.buId}/licenses`, () =>
      button(main(page), L('Create License', 'สร้างไลเซนส์')).click(),
    )
    await successToast(page)
    await toastsGone(page)
    await go(page, `/licenses/${s.clusterId}`)
    await openTab(page, L('Seats', 'ที่นั่ง'))
    await snap(page, `${G}-09-seats-added`)
  })

  test('BU quota', async ({ page }) => {
    await go(page, `/licenses/${s.clusterId}`)
    await main(page).getByRole('link', { name: L('Add BU quota license', 'เพิ่มไลเซนส์โควตา BU') }).first().click()
    await page.waitForURL('**/licenses/bu-quota/new**')
    await page.waitForLoadState('networkidle').catch(() => {})
    await page.locator('#amount').fill('3')
    await page.locator('#reference_no').fill(demoCode('PO'))
    await button(main(page), L('No expiry', 'ไม่มีวันหมดอายุ')).click()
    await page.locator('#note').fill(demoName('note'))
    await snap(page, `${G}-10-bu-quota-form-filled`)

    await expectWrite(page, 'POST', `/api-system/clusters/${s.clusterId}/licenses`, () =>
      button(main(page), L('Create License', 'สร้างไลเซนส์')).click(),
    )
    await successToast(page)
    await toastsGone(page)
    await go(page, `/licenses/${s.clusterId}`)
    await snap(page, `${G}-11-bu-quota-added`)
  })

  test('interface licence', async ({ page }) => {
    await go(page, `/business-units/${s.buId}/edit`)
    await openTab(page, /^(Licenses|ไลเซนส์)/)
    await selectsLoaded(page)
    await snap(page, `${G}-12-bu-licenses-tab`)

    await main(page).getByRole('link', { name: L('Add interface license', 'เพิ่มใบสิทธิ์ interface') }).first().click()
    await page.waitForURL('**/licenses/interface/new**')
    await page.waitForLoadState('networkidle').catch(() => {})
    await page.locator('#amount').click()
    await page.getByRole('option', { name: /Interface Carmen GL/ }).click()
    await page.locator('#end_date').fill(isoDate(365))
    await snap(page, `${G}-13-interface-form-filled`)

    await expectWrite(page, 'POST', `/api-system/business-units/${s.buId}/interface-licenses`, () =>
      button(main(page), L('Create License', 'สร้างไลเซนส์')).click(),
    )
    await successToast(page)
    await toastsGone(page)
    await go(page, `/business-units/${s.buId}/edit`)
    await openTab(page, /^(Licenses|ไลเซนส์)/)
    await selectsLoaded(page)
    await snap(page, `${G}-14-interface-added`)
  })

  test('feature group', async ({ page }) => {
    await go(page, '/license-feature-groups')
    await snap(page, `${G}-15-feature-groups-list`)

    await button(main(page), L('New group', 'สร้างกลุ่ม')).click()
    await page.waitForURL('**/license-feature-groups/new')
    await page.waitForLoadState('networkidle').catch(() => {})
    const form = main(page)
    await form.getByRole('textbox', { name: L('Code', 'รหัส') }).fill(demoCode('G'))
    await form.getByRole('textbox', { name: L('Name', 'ชื่อ') }).fill(demoName('group'))
    await form.getByRole('spinbutton').first().fill('999')
    await form.getByRole('button', { name: /^(Select all in Report|เอาทั้งหมดใน (Report|รายงาน))$/ }).first().click()
    await scrollToMiddle(page, 'main #code')
    await snap(page, `${G}-16-feature-group-form-filled`)

    await expectWrite(page, 'POST', '/api-system/platform/license-feature-groups', () =>
      button(main(page), L('Save Changes', 'บันทึกการแก้ไข')).click(),
    )
    await successToast(page)
    await snap(page, `${G}-17-feature-group-created`)
  })
})

