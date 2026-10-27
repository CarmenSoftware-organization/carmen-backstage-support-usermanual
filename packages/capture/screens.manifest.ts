// Read-only screen shots for Getting Started and the Screen Reference pages.
// Nothing here saves a form: /new pages and edit modes are only opened, never submitted.
//
// Slug = file name under apps/support/public/screenshots/<lang>/. Screen Reference shots are
// `<page>-<view>` where <page> is the page slug in apps/support/.vitepress/nav-data.mts.
// Routes come from carmen-backstage src/App.tsx. Labels are matched in both UI languages.
import type { Page } from '@playwright/test'
import { scrollToMiddle } from './guides/ui.ts'

export type Shot = {
  slug: string
  /** Route to open. For openFirstRow shots this is the LIST route. */
  path: string
  /** Must each match at least one visible element, or the shot fails (secrets can't slip through). */
  mask?: string[]
  /** Masked when present; for secrets that DEV may not have (e.g. an app with no secret yet). */
  maskOptional?: string[]
  /** Open the first record of the list at `path` (its first link, else the row). */
  openFirstRow?: boolean
  /** Element clicked for openFirstRow; defaults to the first table body row. */
  rowSelector?: string
  /** Runs after the page (and first row) is open, before the shot. Must not save anything. */
  prepare?: (page: Page) => Promise<void>
  fullPage?: boolean
  /** prepare() deliberately moves to another route (otherwise leaving the page fails the shot). */
  prepareNavigates?: boolean
  /** Shot with an empty session (the sign-in page). */
  loggedOut?: boolean
}

const button = (page: Page, name: RegExp) => page.getByRole('button', { name }).first()
const tab = (page: Page, name: RegExp) => page.getByRole('tab', { name }).first()
const EDIT = /^(Edit|แก้ไข)$/

async function openDialog(page: Page, name: RegExp): Promise<void> {
  await button(page, name).click()
  await page.getByRole('dialog').first().waitFor({ state: 'visible' })
}

// Secret-bearing elements (Review Focus 3).
const APP_SECRET = ['code.select-none', 'code.select-all'] // masked stub / revealed value
const BU_DB_CONNECTION = ['#database_pool_id', '#db_schema']
const POOL_LIST_CONNECTION = ['table tbody .font-mono']
const POOL_DETAIL_CONNECTION = ['p.font-mono']
const POOL_FORM_SECRETS = ['#host', '#username', '#password']
const SMTP_PASSWORD = ['#smtp_password', 'input[type="password"]']

export const SHOTS: Shot[] = [
  // ── Getting Started ────────────────────────────────────────────────
  { slug: 'login', path: '/login', loggedOut: true },
  { slug: 'main-screen', path: '/dashboard' },
  {
    slug: 'sidebar-collapsed',
    path: '/dashboard',
    prepare: async (page) => {
      await button(page, /^(Collapse sidebar|ย่อแถบเมนูด้านข้าง)$/).click()
      await page.waitForTimeout(300)
    },
  },
  {
    slug: 'profile-menu-open',
    path: '/dashboard',
    prepare: async (page) => {
      await button(page, /^(User menu|เมนูผู้ใช้)/).click()
      await page.getByRole('menu').first().waitFor({ state: 'visible' })
    },
  },
  {
    slug: 'list-filter-panel',
    path: '/users',
    prepare: async (page) => {
      await button(page, /^(Filters|ตัวกรอง)/).click()
      await page.waitForTimeout(500)
    },
  },
  { slug: 'form-view-mode', path: '/users', openFirstRow: true },
  {
    slug: 'form-edit-mode',
    path: '/users',
    openFirstRow: true,
    prepare: async (page) => {
      await button(page, EDIT).click()
      await page.waitForTimeout(500)
    },
  },
  {
    slug: 'keyboard-shortcuts',
    path: '/dashboard',
    prepare: async (page) => {
      // No click first: a click on the dashboard can land on a link and leave the page.
      await page.keyboard.press('Shift+Slash')
      await page.getByRole('dialog').first().waitFor({ state: 'visible' })
    },
  },
  {
    slug: 'list-row-actions',
    path: '/users',
    prepare: async (page) => {
      await button(page, /^(Actions for|การกระทำสำหรับ)/).click()
      await page.getByRole('menu').first().waitFor({ state: 'visible' })
    },
  },
  {
    slug: 'list-bulk-selected',
    path: '/users',
    prepare: async (page) => {
      // Selecting rows only shows the bulk bar; nothing is deleted.
      const rows = page.locator('table tbody tr')
      await rows.nth(0).getByRole('checkbox').click()
      await rows.nth(1).getByRole('checkbox').click()
      await page.waitForTimeout(300)
    },
  },
  {
    slug: 'activity-trail',
    path: '/users',
    openFirstRow: true,
    prepare: async (page) => {
      await openDialog(page, /^(Change history|ประวัติการเปลี่ยนแปลง)$/)
      await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
    },
  },

  // ── Dashboard / Profile ────────────────────────────────────────────
  { slug: 'dashboard-overview', path: '/dashboard' },
  { slug: 'profile-overview', path: '/profile' },

  // ── Organization ───────────────────────────────────────────────────
  { slug: 'clusters-list', path: '/clusters' },
  { slug: 'clusters-form', path: '/clusters/new' },
  { slug: 'clusters-detail', path: '/clusters', openFirstRow: true },
  { slug: 'business-units-list', path: '/business-units' },
  { slug: 'business-units-form', path: '/business-units/new', maskOptional: BU_DB_CONNECTION },
  { slug: 'business-units-detail', path: '/business-units', openFirstRow: true, maskOptional: BU_DB_CONNECTION },
  {
    slug: 'business-units-technical',
    path: '/business-units',
    openFirstRow: true,
    mask: BU_DB_CONNECTION,
    prepare: async (page) => {
      await tab(page, /^(Technical|เทคนิค)/).click()
      await scrollToMiddle(page, '#database_pool_id')
    },
  },
  { slug: 'tenant-migrations-list', path: '/tenant-migrations' },
  { slug: 'tenant-seeds-list', path: '/tenant-seeds' },
  { slug: 'data-import-wizard', path: '/tenant-imports' },
  { slug: 'users-list', path: '/users' },
  { slug: 'users-form', path: '/users/new' },
  { slug: 'users-detail', path: '/users', openFirstRow: true },

  // ── License Management ─────────────────────────────────────────────
  { slug: 'licenses-list', path: '/licenses' },
  { slug: 'licenses-detail', path: '/licenses', openFirstRow: true },
  { slug: 'licenses-subscription-form', path: '/licenses/subscriptions/new' },
  {
    slug: 'licenses-bu-quota-form',
    path: '/licenses',
    openFirstRow: true,
    prepareNavigates: true,
    prepare: async (page) => {
      const clusterId = new URL(page.url()).pathname.split('/').pop()
      await page.goto(`/licenses/bu-quota/new?cluster=${clusterId}`)
    },
  },
  { slug: 'license-feature-groups-list', path: '/license-feature-groups' },
  { slug: 'license-feature-groups-form', path: '/license-feature-groups/new' },
  { slug: 'license-feature-groups-detail', path: '/license-feature-groups', openFirstRow: true },
  { slug: 'license-features-list', path: '/license-features' },

  // ── Content ────────────────────────────────────────────────────────
  { slug: 'report-templates-list', path: '/report-templates' },
  { slug: 'report-templates-form', path: '/report-templates/new' },
  { slug: 'report-templates-detail', path: '/report-templates', openFirstRow: true },
  { slug: 'form-groups-list', path: '/report-form-groups' },
  { slug: 'dashboard-templates-list', path: '/dashboard-templates' },
  { slug: 'news-list', path: '/news' },
  { slug: 'news-form', path: '/news/new' },
  { slug: 'broadcasts-list', path: '/broadcasts' },
  { slug: 'broadcasts-form', path: '/broadcasts/new' },

  // ── Analytics ──────────────────────────────────────────────────────
  { slug: 'usage-analytics-overview', path: '/analytics' },
  { slug: 'activity-events-list', path: '/activity-events' },

  // ── Scheduling ─────────────────────────────────────────────────────
  { slug: 'scheduled-jobs-list', path: '/cronjobs' },
  { slug: 'scheduled-jobs-form', path: '/cronjobs/new' },

  // ── Platform ───────────────────────────────────────────────────────
  { slug: 'platform-config-overview', path: '/platform/configs' },
  { slug: 'email-settings-list', path: '/platform/email-settings', maskOptional: SMTP_PASSWORD },
  {
    slug: 'email-settings-form',
    path: '/platform/email-settings',
    maskOptional: SMTP_PASSWORD,
    prepare: async (page) => {
      await button(page, EDIT).click()
      // Bring the edit form (fields down to the password row) into view.
      await scrollToMiddle(page, 'input[id^="smtp_port_"]')
    },
  },
  {
    slug: 'email-settings-test-dialog',
    path: '/platform/email-settings',
    prepare: (page) => openDialog(page, /^(Send test email|ส่งเมลทดสอบ)$/),
  },
  { slug: 'applications-list', path: '/applications' },
  { slug: 'applications-form', path: '/applications/new', maskOptional: APP_SECRET },
  { slug: 'applications-detail', path: '/applications', openFirstRow: true, maskOptional: APP_SECRET },
  { slug: 'platform-roles-list', path: '/platform/roles' },
  { slug: 'platform-roles-form', path: '/platform/roles/new' },
  { slug: 'platform-roles-detail', path: '/platform/roles', openFirstRow: true },
  { slug: 'platform-roles-permissions', path: '/platform/category-permissions' },
  { slug: 'platform-users-list', path: '/platform/user-platform' },
  { slug: 'platform-users-detail', path: '/platform/user-platform', openFirstRow: true },
  { slug: 'super-admins-list', path: '/platform/super-admins' },
  { slug: 'feature-flags-list', path: '/platform/features' },

  // ── Database ───────────────────────────────────────────────────────
  { slug: 'platform-migrations-overview', path: '/platform/migrations' },
  { slug: 'sql-workbench', path: '/sql-workbench' },
  {
    // Choosing a BU only loads its list of tables; nothing is run (the Run button is never pressed).
    slug: 'sql-workbench-connected',
    path: '/sql-workbench',
    prepare: async (page) => {
      await button(page, /^(Switch business unit|เปลี่ยนหน่วยธุรกิจ)$/).click()
      await page.getByRole('dialog').first().waitFor({ state: 'visible' })
      await page.getByRole('option').first().click()
      await page.getByRole('dialog').first().waitFor({ state: 'hidden' })
      await page.getByText(/^(Tables|Table)$/).first().waitFor({ state: 'visible' })
      await page.waitForTimeout(800)
    },
  },
  { slug: 'database-pools-list', path: '/platform/database-pools', mask: POOL_LIST_CONNECTION },
  { slug: 'database-pools-form', path: '/platform/database-pools/new', mask: POOL_FORM_SECRETS },
  { slug: 'database-pools-detail', path: '/platform/database-pools', openFirstRow: true, mask: POOL_DETAIL_CONNECTION },
]
