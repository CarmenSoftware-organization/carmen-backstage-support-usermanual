// Shared bits for the Cluster Admin guide captures (cluster-admin session, test cluster).
import type { Locator, Page } from '@playwright/test'
import { adminCluster } from '../../fixtures.ts'
import { addDemoUserToBusinessUnit, addDemoUserToCluster, createDemoUser, findBusinessUnit } from '../../demo-data.ts'
import { go } from '../../guides/ui.ts'

/** The real test hotel the guides work in (has free seats; see the cluster screens manifest). */
export const GUIDE_BU = 'ZEBRA (FIFO)'

/** `/cluster-admin/<test cluster id><rest>` */
export const cpath = (rest: string): string => `/cluster-admin/${adminCluster().id}${rest}`

export const goC = (page: Page, rest: string): Promise<void> => go(page, cpath(rest))

/**
 * A MANUAL-DEMO user who is a member of the test cluster and of GUIDE_BU (takes one seat),
 * created with the Super Admin login. Removed by the guide's afterAll (removeDemoMember) and,
 * as a fallback, by the cleanup sweep.
 */
export async function demoMember(kind: string): Promise<{ id: string; email: string; name: string }> {
  const cluster = adminCluster()
  const bu = await findBusinessUnit(cluster.id, GUIDE_BU)
  const u = await createDemoUser(kind)
  await addDemoUserToCluster(u.id, cluster.id, 'user')
  await addDemoUserToBusinessUnit(u.id, bu.id, 'user')
  return { ...u, name: `Manual Demo ${kind}` }
}

/** Filters the Users page's members table to `email` (the table pages, so a new member may be off page 1). */
export async function findMember(page: Page, email: string): Promise<Locator> {
  await page.getByPlaceholder(/^(Search members|ค้นหาสมาชิก)/).first().fill(email)
  const row = page.locator('table tbody tr', { hasText: email }).first()
  await row.waitFor({ state: 'visible', timeout: 15_000 })
  return row
}
