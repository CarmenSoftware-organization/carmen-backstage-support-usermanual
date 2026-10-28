// Read-only shots for the Cluster Admin manual (apps/cluster-admin), taken as the cluster-admin
// login inside the test cluster (ADMIN_CLUSTER_CODE, default ZEBRA). Nothing is saved.
// `{c}` in a path is replaced with `/cluster-admin/<test cluster id>`.
// Routes come from carmen-backstage src/App.tsx (`/cluster-admin/:clusterId/...`); the business
// unit page's tabs are deep links (`?tab=` and `&license=`, see clusterAdmin/businessUnitForm/ClusterBuTabs.tsx).
import type { Page } from '@playwright/test'
import type { Shot } from '../screens.manifest.ts'

/** Re-opens the current page with `query` (same path, so the shot's "stayed on the page" check holds). */
const withQuery = (query: string) => async (page: Page): Promise<void> => {
  const url = new URL(page.url())
  url.search = query
  await page.goto(url.toString(), { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
}

/** A tab of the business unit ZEBRA (FIFO) — a real test hotel with seats, licences and users (DUMMY, first in the list, is empty). */
const buTab = (slug: string, query: string): Shot => ({
  slug,
  path: '{c}/business-units',
  openFirstRow: true,
  rowSelector: 'table tbody tr:has-text("ZEBRA (FIFO)")',
  prepare: withQuery(query),
})

export const CLUSTER_SHOTS: Shot[] = [
  // Getting Started
  { slug: 'choose-cluster', path: '/cluster-admin' },
  { slug: 'main-screen', path: '{c}/cluster' },
  // Screen Reference
  { slug: 'cluster-overview', path: '{c}/cluster', fullPage: true },
  { slug: 'business-units-list', path: '{c}/business-units' },
  buTab('bu-overview', '?tab=overview'),
  buTab('bu-hotel', '?tab=hotel'),
  buTab('bu-company', '?tab=company'),
  buTab('bu-configuration', '?tab=configuration'),
  buTab('bu-licences-seats', '?tab=licenses&license=seats'),
  buTab('bu-licences-modules', '?tab=licenses&license=modules'),
  buTab('bu-licences-interface', '?tab=licenses&license=interface'),
  buTab('bu-users', '?tab=users'),
  { slug: 'users-list', path: '{c}/users', fullPage: true },
  { slug: 'licences-overview', path: '{c}/licenses', fullPage: true },
  { slug: 'profile-overview', path: '{c}/profile' },
]
