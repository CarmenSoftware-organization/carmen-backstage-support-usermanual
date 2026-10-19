// Demo records for the How-to Guide captures (written to DEV) and their cleanup.
// Every record a guide creates is named `MANUAL-DEMO-<kind>-<lang>-<yyyyMMddHHmm>`, so runs never
// collide and cleanup can find every one of them, from this run or an earlier one.
// Endpoints come from carmen-platform src/services/{userService,businessUnitService,clusterService,
// licenseFeatureGroupService,clusterLicenseService,businessUnitLicenseService,
// businessUnitInterfaceLicenseService,subscriptionService}.ts.
import { test } from '@playwright/test'
import { api } from './api.ts'

export const DEMO_PREFIX = 'MANUAL-DEMO'
const NAME_PREFIX = `${DEMO_PREFIX}-`
const DEMO_EMAIL_DOMAIN = 'example.com'
/** Exactly what demoEmail() produces: manual-demo-<kind>-<th|en|xx>-<yyyyMMddHHmm>@example.com */
const DEMO_EMAIL_RE = /^manual-demo-[a-z0-9]+(?:-[a-z0-9]+)*-(?:th|en|xx)-\d{12}@example\.com$/

/** A cluster / business unit / feature group name made by demoName(): starts with `MANUAL-DEMO-` (case-sensitive). */
export function isDemoName(value: unknown): boolean {
  return typeof value === 'string' && value.startsWith(NAME_PREFIX)
}

/** A user made by createDemoUser() / the guides: username AND e-mail both have demoEmail()'s exact shape. */
export function isDemoUser(u: { username?: string; email?: string }): boolean {
  return typeof u.username === 'string' && typeof u.email === 'string' &&
    DEMO_EMAIL_RE.test(u.username) && DEMO_EMAIL_RE.test(u.email)
}

const pad = (n: number): string => String(n).padStart(2, '0')

const RUN_START = new Date()

/** yyyyMMddHHmm, fixed for the whole run (local time). */
export const RUN_STAMP: string =
  `${RUN_START.getFullYear()}${pad(RUN_START.getMonth() + 1)}${pad(RUN_START.getDate())}` +
  `${pad(RUN_START.getHours())}${pad(RUN_START.getMinutes())}`

/** MMddHHmmss — second resolution, for codes the platform keeps unique even after a delete. */
const CODE_STAMP = `${RUN_STAMP.slice(4)}${pad(RUN_START.getSeconds())}`

/** UI language of the running project ('th' | 'en'); 'xx' outside a test. */
export function currentLang(): string {
  try {
    return ((test.info().project.use as { lang?: string }).lang ?? 'th').toLowerCase()
  } catch {
    return 'xx'
  }
}

/** `MANUAL-DEMO-<kind>-<lang>-<yyyyMMddHHmm>` */
export function demoName(kind: string): string {
  return `${DEMO_PREFIX}-${kind}-${currentLang()}-${RUN_STAMP}`
}

/** Lower-case e-mail form of demoName(kind), for user names (the platform wants an e-mail). */
export function demoEmail(kind: string): string {
  return `${demoName(kind).toLowerCase()}@${DEMO_EMAIL_DOMAIN}`
}

/**
 * Short code `MD-<lang>-<kind>-<MMddHHmmss>` (≤ 20 chars: pass a kind of 1–2 letters).
 * Codes stay taken after a delete (a cluster's code + name must be new), so they carry seconds:
 * a second run in the same minute still gets fresh codes.
 */
export function demoCode(kind: string): string {
  const code = `MD-${currentLang()}-${kind}-${CODE_STAMP}`.toUpperCase()
  if (code.length > 20) throw new Error(`demoCode too long (${code}): use a 1–2 letter kind`)
  return code
}

/** End of the perpetual licence term the platform uses for "Never expires". */
export const PERPETUAL_END_DATE = '2099-12-31T23:59:59.999Z'

/** yyyy-mm-dd, `days` from today. */
export function isoDate(days = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

type Row = {
  id: string
  name?: string
  code?: string
  username?: string
  email?: string
  license_number?: string
  subscription_number?: string
  deleted_at?: string | null
  audit?: { deleted?: { at?: string } }
}

// ── Prerequisite records, created straight through the API ───────────────────────────
// Guides that only need something to exist (e.g. a cluster to add a user to) create it here;
// the screens they document are driven through the UI.

const idOf = (r: { id?: string; data?: { id?: string } }): string => {
  const id = r?.id ?? r?.data?.id
  if (!id) throw new Error(`create returned no id: ${JSON.stringify(r).slice(0, 200)}`)
  return id
}

/** A MANUAL-DEMO cluster with a never-expiring quota of `bus` business units. */
export async function createDemoCluster(
  kind: string,
  codeKind: string,
  bus = 2,
): Promise<{ id: string; name: string; code: string }> {
  const name = demoName(kind)
  const code = demoCode(codeKind)
  const r = await api<Row>('POST', '/api-system/clusters', {
    code,
    name,
    is_active: true,
    initial_license: { licensed_bus: bus, end_date: PERPETUAL_END_DATE },
  })
  return { id: idOf(r), name, code }
}

/** A MANUAL-DEMO business unit in `clusterId`. No database connection is set. */
export async function createDemoBusinessUnit(clusterId: string, kind: string): Promise<{ id: string; name: string }> {
  const name = demoName(kind)
  const r = await api<Row>('POST', '/api-system/business-units', {
    cluster_id: clusterId,
    name,
    is_hq: true,
    is_active: true,
    config: [],
  })
  return { id: idOf(r), name }
}

/** A MANUAL-DEMO platform user (username = e-mail = demoEmail(kind)). */
export async function createDemoUser(kind: string): Promise<{ id: string; email: string }> {
  const email = demoEmail(kind)
  const r = await api<Row>('POST', '/api-system/user', {
    username: email,
    email,
    firstname: 'Manual',
    lastname: `Demo ${kind}`,
    alias_name: '',
    is_active: true,
  })
  return { id: idOf(r), email }
}

/** A seat licence of `seats` users for one year on a business unit (users can only join a BU with free seats). */
export async function addDemoSeatLicense(buId: string, seats = 5): Promise<void> {
  const start = new Date()
  start.setUTCHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setUTCFullYear(end.getUTCFullYear() + 1)
  await api('POST', `/api-system/business-units/${buId}/licenses`, {
    licensed_users: seats,
    start_date: start.toISOString(),
    end_date: end.toISOString(),
    reference_no: '',
  })
}

/** Makes `userId` a member of `clusterId` with a cluster role. */
export async function addDemoUserToCluster(userId: string, clusterId: string, role = 'user'): Promise<void> {
  await api('POST', '/api-system/user/clusters', { user_id: userId, cluster_id: clusterId, role, is_active: true })
}

// ── Cleanup ───────────────────────────────────────────────────────────────────────

const PER_PAGE = 100
const MAX_PAGES = 50

/** Every row of a paged list endpoint (`?page=&perpage=` — `api()` returns the page's array). */
async function listAll(path: string): Promise<Row[]> {
  const out: Row[] = []
  const sep = path.includes('?') ? '&' : '?'
  // Page until an empty page: a short page is not proof of the end (some lists filter rows
  // after paging), and a missed page would leave demo records behind.
  for (let page = 1; page <= MAX_PAGES; page++) {
    const rows = await api<Row[] | { data?: Row[] }>('GET', `${path}${sep}page=${page}&perpage=${PER_PAGE}`)
    const list = Array.isArray(rows) ? rows : (rows.data ?? [])
    if (list.length === 0) break
    out.push(...list)
  }
  return out
}

/** Child records of a list endpoint that may not be paged (licence lists per cluster/BU). */
async function listPlain(path: string): Promise<Row[]> {
  const rows = await api<Row[] | { data?: Row[] }>('GET', path)
  return Array.isArray(rows) ? rows : (rows.data ?? [])
}

const label = (r: Row): string =>
  r.name ?? r.username ?? r.email ?? r.license_number ?? r.subscription_number ?? r.code ?? r.id
/** The cluster list also returns clusters that were already deleted (marked in `audit.deleted`). */
const alive = (r: Row): boolean => !r.deleted_at && !r.audit?.deleted?.at
const errText = (e: unknown): string => (e instanceof Error ? e.message : String(e)).slice(0, 160)

/**
 * Deletes every user, business unit, cluster and licence feature group whose name (users:
 * username or e-mail) starts with MANUAL-DEMO — from this run and any earlier one —
 * children first: users → business units → clusters → feature groups.
 * Users are deleted permanently (this also removes their sign-in account); business units
 * and clusters are deleted the way the app deletes them.
 * Licence records (quota, seats, interface, subscriptions) of the demo clusters cannot be
 * removed this way and are reported in `left`, as is anything whose delete failed.
 * Never touches a record without the prefix. Never throws: problems are logged and listed.
 */
export async function cleanupDemoData(opts: { dryRun?: boolean } = {}): Promise<{ deleted: string[]; left: string[] }> {
  const deleted: string[] = []
  const left: string[] = []

  const sweep = async (kind: string, rows: Row[], del: (r: Row) => Promise<unknown>): Promise<void> => {
    for (const r of rows) {
      try {
        await del(r)
        deleted.push(`${kind} ${label(r)}`)
      } catch (e) {
        left.push(`${kind} ${label(r)} (delete failed: ${errText(e)})`)
      }
    }
  }
  const find = async (kind: string, path: string, match: (r: Row) => boolean): Promise<Row[]> => {
    try {
      return (await listAll(path)).filter((r) => alive(r) && match(r))
    } catch (e) {
      left.push(`${kind}: could not list (${errText(e)}) — check DEV by hand`)
      return []
    }
  }

  const users = await find('user', '/api-system/user', isDemoUser)
  const bus = await find('business unit', '/api-system/business-units', (b) => isDemoName(b.name))
  const clusters = await find('cluster', '/api-system/clusters', (c) => isDemoName(c.name))
  const groups = await find('feature group', '/api-system/platform/license-feature-groups', (g) => isDemoName(g.name))

  if (opts.dryRun) {
    // Log what would be deleted, plus near misses (mention manual-demo in any case but do not
    // match the strict rule) so the filter can be checked against DEV without deleting anything.
    const loose = (v: unknown): boolean => typeof v === 'string' && v.toLowerCase().includes('manual-demo')
    const report = async (kind: string, path: string, rows: Row[], fields: (keyof Row)[]): Promise<void> => {
      for (const r of rows) console.log(`[demo-data] dry-run WOULD DELETE ${kind}: ${fields.map((f) => r[f]).join(' / ')}`)
      try {
        const ids = new Set(rows.map((r) => r.id))
        for (const r of (await listAll(path)).filter(alive)) {
          if (!ids.has(r.id) && fields.some((f) => loose(r[f]))) {
            console.log(`[demo-data] dry-run near miss (kept) ${kind}: ${fields.map((f) => r[f]).join(' / ')}`)
          }
        }
      } catch {
        /* listing already reported by find() */
      }
    }
    await report('user', '/api-system/user', users, ['username', 'email'])
    await report('business unit', '/api-system/business-units', bus, ['name'])
    await report('cluster', '/api-system/clusters', clusters, ['name'])
    await report('feature group', '/api-system/platform/license-feature-groups', groups, ['name', 'code'])
    return { deleted: [], left }
  }

  // Licence records hang off the demo clusters / business units and stay behind. List them
  // before the owners are deleted (afterwards their lists may no longer be readable).
  for (const c of clusters) {
    for (const [what, path] of [
      ['BU quota licence', `/api-system/clusters/${c.id}/licenses`],
      ['subscription', `/api-system/clusters/${c.id}/subscriptions?page=1&perpage=100`],
    ] as const) {
      try {
        for (const l of await listPlain(path)) left.push(`${what} ${label(l)} (cluster ${c.name})`)
      } catch {
        /* not readable: nothing to report */
      }
    }
  }
  for (const b of bus) {
    for (const [what, path] of [
      ['seat licence', `/api-system/business-units/${b.id}/licenses`],
      ['interface licence', `/api-system/business-units/${b.id}/interface-licenses`],
    ] as const) {
      try {
        for (const l of await listPlain(path)) left.push(`${what} ${label(l)} (business unit ${b.name})`)
      } catch {
        /* not readable: nothing to report */
      }
    }
  }

  await sweep('user', users, (u) => api('DELETE', `/api-system/user/${u.id}/hard`))
  await sweep('business unit', bus, (b) => api('DELETE', `/api-system/business-units/${b.id}`))
  await sweep('cluster', clusters, (c) => api('DELETE', `/api-system/clusters/${c.id}`))
  await sweep('feature group', groups, (g) => api('DELETE', `/api-system/platform/license-feature-groups/${g.id}`))

  console.log(`[demo-data] deleted ${deleted.length}:${deleted.map((d) => `\n  - ${d}`).join('')}`)
  console.log(`[demo-data] left ${left.length}:${left.map((d) => `\n  - ${d}`).join('')}`)
  return { deleted, left }
}

// `bun capture/demo-data.ts cleanup` — run the cleanup by hand (e.g. after a killed run).
// `bun capture/demo-data.ts cleanup --dry-run` only lists what would be deleted.
if (process.argv[1]?.endsWith('demo-data.ts') && process.argv[2] === 'cleanup') {
  await cleanupDemoData({ dryRun: process.argv.includes('--dry-run') })
}
