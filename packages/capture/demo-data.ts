// Demo records for the How-to Guide captures (written to DEV) and their cleanup.
// Every record a guide creates is named `MANUAL-DEMO-<kind>-<lang>-<yyyyMMddHHmm>`, so runs never
// collide and cleanup can find every one of them, from this run or an earlier one.
// Endpoints come from carmen-backstage src/services/{userService,businessUnitService,clusterService,
// licenseFeatureGroupService,clusterLicenseService,businessUnitLicenseService,
// businessUnitInterfaceLicenseService,subscriptionService}.ts.
import { test } from '@playwright/test'
import { api, apiJson } from './api.ts'
import { ADMIN_CLUSTER_CODE, HAS_CLUSTER_ADMIN } from './env.ts'

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
  cluster_id?: string
  cluster_name?: string
  business_unit_id?: string
  business_unit_name?: string
  bu_name?: string
  deleted_at?: string | null
  audit?: { deleted?: { at?: string } }
  /** Invitation state, e.g. `pending`. */
  status?: string
  /** Cluster member: the seat with one link (BU membership row) per business unit. */
  seat?: { links?: Row[] }
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

/** Makes `userId` a member of business unit `buId` (the cluster membership must exist first). */
export async function addDemoUserToBusinessUnit(userId: string, buId: string, role: 'admin' | 'user' = 'user'): Promise<void> {
  await api('POST', '/api-system/user/business-units', { user_id: userId, business_unit_id: buId, role })
}

/**
 * Takes demo user `userId` out of `clusterId` again — every business-unit membership and the
 * cluster membership — and deletes the user, which is what frees the seat. For guides that borrow a seat in the real test cluster.
 * Only ever called with a user the guide created itself.
 */
export async function removeDemoMember(clusterId: string, userId: string): Promise<void> {
  const r = await api<Row[] | { data?: Row[] }>('GET', `/api-system/user/clusters/${clusterId}`)
  const m = (Array.isArray(r) ? r : (r.data ?? [])).find((x) => (x as Row & { user_id?: string }).user_id === userId)
  const user = await api<Row>('GET', `/api-system/user/${userId}`)
  if (!isDemoUser(user)) throw new Error(`refusing to remove non-demo user ${user.email}`)
  for (const l of m?.seat?.links ?? []) await api('DELETE', `/api-system/user/business-units/${l.id}`)
  if (m) await api('DELETE', `/api-system/user/clusters/${m.id}`)
  // The cluster's seat count only drops once the user is gone for good (observed on DEV:
  // removed memberships still counted until the hard delete).
  await api('DELETE', `/api-system/user/${userId}/hard`)
}

/** Revokes the pending invitation to demo e-mail `email` in `clusterId` (a pending invitation holds a seat). */
export async function revokeDemoInvitation(clusterId: string, email: string): Promise<void> {
  if (!DEMO_EMAIL_RE.test(email)) throw new Error(`refusing to revoke non-demo invitation ${email}`)
  const inv = (await listAll(`/api-system/clusters/${clusterId}/invitations`)).find((i) => i.email === email)
  if (inv) await api('DELETE', `/api-system/clusters/${clusterId}/invitations/${inv.id}`)
}

/** The business unit named `name` in `clusterId` (a real one in the test cluster, looked up with the Super Admin login). */
export async function findBusinessUnit(clusterId: string, name: string): Promise<{ id: string; name: string }> {
  const rows = await listAll(`/api-system/business-units?search=${encodeURIComponent(name)}`)
  const bu = rows.find((b) => b.cluster_id === clusterId && b.name === name && alive(b))
  if (!bu) throw new Error(`business unit "${name}" not found in cluster ${clusterId}`)
  return { id: bu.id, name }
}

/**
 * The cluster with `code` among the clusters the cluster-admin login administers.
 * Refuses a login that administers every cluster (a Super Admin): its Cluster Admin view lists
 * every customer's cluster, which must never reach the hotel-group manual.
 */
export async function findAdminCluster(code: string = ADMIN_CLUSTER_CODE): Promise<{ id: string; name: string; code: string }> {
  const body = await apiJson<{ data?: Row[]; summary?: { all?: boolean } }>(
    'GET', '/api-system/me/admin-clusters?page=1&perpage=100', undefined, 'clusterAdmin',
  )
  if (body.summary?.all) {
    throw new Error('CLUSTER_ADMIN_EMAIL administers every cluster (Super Admin) — use a plain cluster admin for the Cluster Admin shots.')
  }
  const c = (body.data ?? []).find((r) => r.code === code)
  if (!c) throw new Error(`CLUSTER_ADMIN_EMAIL is not an admin of cluster ${code}.`)
  return { id: c.id, name: c.name ?? code, code }
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
    // Some lists (e.g. cluster invitations) ignore paging and return everything on every page.
    const seen = new Set(out.map((r) => r.id))
    const fresh = list.filter((r) => !seen.has(r.id))
    if (fresh.length === 0) break
    out.push(...fresh)
  }
  return out
}

const label = (r: Row): string =>
  r.name ?? r.username ?? r.email ?? r.license_number ?? r.subscription_number ?? r.code ?? r.id
/** The cluster list also returns clusters that were already deleted (marked in `audit.deleted`). */
const alive = (r: Row): boolean => !r.deleted_at && !r.audit?.deleted?.at
const errText = (e: unknown): string => (e instanceof Error ? e.message : String(e)).slice(0, 160)

/** Platform-wide licence lists (each has a `/deleted` twin and a `/:id/hard` delete). */
const LICENCE_KINDS = [
  { kind: 'BU quota licence', path: 'cluster-licenses' },
  { kind: 'seat licence', path: 'business-unit-licenses' },
  { kind: 'interface licence', path: 'interface-licenses' },
  { kind: 'subscription', path: 'subscriptions' },
] as const

/** A licence row owned by a demo cluster (and demo business unit, when the row names one). */
const isDemoLicence = (r: Row): boolean => {
  const bu = r.business_unit_name ?? r.bu_name
  return isDemoName(r.cluster_name) && (bu === undefined || bu === null || isDemoName(bu))
}

/** The app's (soft) delete for a licence row; the hard delete only takes rows already soft-deleted. */
const softDeletePath = (path: string, r: Row): string =>
  path === 'cluster-licenses' ? `/api-system/clusters/${r.cluster_id}/licenses/${r.id}` :
  path === 'business-unit-licenses' ? `/api-system/business-units/${r.business_unit_id}/licenses/${r.id}` :
  path === 'interface-licenses' ? `/api-system/business-units/${r.business_unit_id}/interface-licenses/${r.id}` :
  `/api-system/backstage/subscriptions/${r.id}`

/**
 * Deletes every user, business unit, cluster and licence feature group whose name (users:
 * username or e-mail) starts with MANUAL-DEMO — from this run and any earlier one —
 * children first: licences → users → business units → clusters → feature groups.
 * Licence records (quota, seats, interface, subscriptions) count as demo when their cluster
 * (and business unit, if named) starts with MANUAL-DEMO-; they are soft-deleted, then deleted
 * permanently, as are demo licences an earlier run left soft-deleted.
 * Users are deleted permanently (this also removes their sign-in account); business units
 * and clusters are deleted the way the app deletes them.
 * Never touches a record without the prefix. Never throws: problems are logged and listed in `left`.
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
  const groups = await find('feature group', '/api-system/backstage/license-feature-groups', (g) => isDemoName(g.name))
  const licences: { kind: string; path: string; live: Row[]; dead: Row[] }[] = []
  for (const { kind, path } of LICENCE_KINDS) {
    const base = `/api-system/backstage/${path}`
    const live = await find(kind, base, isDemoLicence)
    const liveIds = new Set(live.map((r) => r.id))
    let dead: Row[] = []
    try {
      dead = (await listAll(`${base}/deleted`)).filter((r) => !liveIds.has(r.id) && isDemoLicence(r))
    } catch (e) {
      left.push(`${kind} (soft-deleted): could not list (${errText(e)}) — check DEV by hand`)
    }
    licences.push({ kind, path, live, dead })
  }

  if (opts.dryRun) {
    await sweepAdminCluster(async (kind, rows) => {
      for (const r of rows) console.log(`[demo-data] dry-run WOULD REMOVE ${kind}: ${label(r)}`)
    }, left)
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
    await report('feature group', '/api-system/backstage/license-feature-groups', groups, ['name', 'code'])
    for (const { kind, path, live, dead } of licences) {
      await report(kind, `/api-system/backstage/${path}`, live, ['license_number', 'subscription_number', 'cluster_name'])
      for (const r of dead) console.log(`[demo-data] dry-run WOULD DELETE ${kind} (soft-deleted): ${label(r)} / ${r.cluster_name}`)
    }
    return { deleted: [], left }
  }

  // Licences first: they hang off the demo clusters / business units.
  for (const { kind, path, live, dead } of licences) {
    const hard = (r: Row) => api('DELETE', `/api-system/backstage/${path}/${r.id}/hard`)
    await sweep(kind, live, async (r) => {
      await api('DELETE', softDeletePath(path, r))
      await hard(r)
    })
    await sweep(`${kind} (soft-deleted)`, dead, hard)
  }
  // Demo people inside the real test cluster (ZEBRA): BU memberships (seats) and the cluster
  // membership first, then pending invitations — so the cluster's seat counts are back to before.
  await sweepAdminCluster(sweep, left)
  await sweep('user', users, (u) => api('DELETE', `/api-system/user/${u.id}/hard`))
  await sweep('business unit', bus, (b) => api('DELETE', `/api-system/business-units/${b.id}`))
  await sweep('cluster', clusters, (c) => api('DELETE', `/api-system/clusters/${c.id}`))
  await sweep('feature group', groups, (g) => api('DELETE', `/api-system/backstage/license-feature-groups/${g.id}`))

  console.log(`[demo-data] deleted ${deleted.length}:${deleted.map((d) => `\n  - ${d}`).join('')}`)
  console.log(`[demo-data] left ${left.length}:${left.map((d) => `\n  - ${d}`).join('')}`)
  return { deleted, left }
}

type Sweep = (kind: string, rows: Row[], del: (r: Row) => Promise<unknown>) => Promise<void>

/**
 * In ADMIN_CLUSTER_CODE (looked up with the Super Admin login, by code), removes every demo
 * user's business-unit memberships and cluster membership, and revokes pending invitations to
 * demo e-mails. Real members and their seats are never touched (demo = demoEmail() shape).
 */
async function sweepAdminCluster(sweep: Sweep, left: string[]): Promise<void> {
  if (!HAS_CLUSTER_ADMIN) return
  let clusterId: string | undefined
  try {
    const all = await listAll(`/api-system/clusters?search=${encodeURIComponent(ADMIN_CLUSTER_CODE)}`)
    clusterId = all.find((c) => c.code === ADMIN_CLUSTER_CODE && alive(c))?.id
    if (!clusterId) return void left.push(`cluster ${ADMIN_CLUSTER_CODE}: not found — demo memberships there not checked`)
  } catch (e) {
    return void left.push(`cluster ${ADMIN_CLUSTER_CODE}: could not look up (${errText(e)}) — check DEV by hand`)
  }
  const isDemoEmail = (v: unknown): boolean => typeof v === 'string' && DEMO_EMAIL_RE.test(v)
  let members: Row[] = []
  let invitations: Row[] = []
  try {
    const r = await api<Row[] | { data?: Row[] }>('GET', `/api-system/user/clusters/${clusterId}`)
    members = (Array.isArray(r) ? r : (r.data ?? [])).filter((m) => isDemoEmail(m.email))
  } catch (e) {
    left.push(`${ADMIN_CLUSTER_CODE} members: could not list (${errText(e)}) — check DEV by hand`)
  }
  try {
    invitations = (await listAll(`/api-system/clusters/${clusterId}/invitations`))
      .filter((i) => isDemoEmail(i.email) && (i.status === undefined || i.status === 'pending'))
  } catch (e) {
    left.push(`${ADMIN_CLUSTER_CODE} invitations: could not list (${errText(e)}) — check DEV by hand`)
  }
  const links: Row[] = members.flatMap((m) =>
    ((m.seat?.links ?? []) as Row[]).map((l) => ({ ...l, name: `${m.email} in ${l.bu_name}` })))
  await sweep(`${ADMIN_CLUSTER_CODE} BU membership`, links, (l) => api('DELETE', `/api-system/user/business-units/${l.id}`))
  await sweep(`${ADMIN_CLUSTER_CODE} membership`, members.map((m) => ({ ...m, name: m.email })), (m) => api('DELETE', `/api-system/user/clusters/${m.id}`))
  await sweep(`${ADMIN_CLUSTER_CODE} invitation`, invitations.map((i) => ({ ...i, name: i.email })), (i) => api('DELETE', `/api-system/clusters/${clusterId}/invitations/${i.id}`))
}

// `bun packages/capture/demo-data.ts cleanup` — run the cleanup by hand (e.g. after a killed run).
// `bun packages/capture/demo-data.ts cleanup --dry-run` only lists what would be deleted.
if (process.argv[1]?.endsWith('demo-data.ts') && process.argv[2] === 'cleanup') {
  await cleanupDemoData({ dryRun: process.argv.includes('--dry-run') })
}
