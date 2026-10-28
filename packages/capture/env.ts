// Capture settings. Loads this repo's `.env` first, then the e2e repo's `.env`
// (credentials). Values already in the environment always win.
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { BrowserContext } from '@playwright/test'

const ROOT = fileURLToPath(new URL('../..', import.meta.url))

/** Parses dotenv text: `KEY=VALUE`, optional `export`, quotes, `#` comments.
 *  Copied from carmen-backstage-e2e/scripts/lib/parse-env.mjs (not imported on purpose). */
export function parseEnv(contents: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const raw of String(contents ?? '').split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const match = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line)
    if (!match) continue
    const key = match[1]
    let value = match[2].trim()
    const quote = value[0]
    if ((quote === '"' || quote === "'") && value.length > 1 && value.endsWith(quote)) {
      value = value.slice(1, -1)
    } else {
      const hash = value.indexOf(' #')
      if (hash !== -1) value = value.slice(0, hash).trim()
    }
    out[key] = value
  }
  return out
}

/** Copies `values` into `env` without clobbering anything already set. */
function applyEnvDefaults(values: Record<string, string>, env: NodeJS.ProcessEnv): void {
  for (const [key, value] of Object.entries(values)) {
    if (env[key] === undefined || env[key] === '') env[key] = value
  }
}

function loadFile(path: string): void {
  if (existsSync(path)) applyEnvDefaults(parseEnv(readFileSync(path, 'utf8')), process.env)
}

loadFile(resolve(ROOT, '.env'))
loadFile(resolve(ROOT, process.env.CAPTURE_ENV_FILE ?? '../carmen-backstage-e2e/.env'))

function required(key: string, hint: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing ${key}. ${hint}`)
  return value
}

export const CAPTURE: { baseUrl: string; apiBase: string; appId: string; email: string; password: string } = {
  baseUrl: (process.env.CAPTURE_BASE_URL || 'https://dev.blueledgers.com:9902').replace(/\/$/, ''),
  apiBase: (process.env.CAPTURE_API_BASE || 'https://dev.blueledgers.com:4001').replace(/\/$/, ''),
  appId: required('CAPTURE_APP_ID', 'Copy REACT_APP_API_APP_ID from carmen-backstage/.env.dev into this repo\'s .env (see .env.example).'),
  email: required('TEST_USER_EMAIL', 'Set it in carmen-backstage-e2e/.env (or the file named by CAPTURE_ENV_FILE).'),
  password: required('TEST_USER_PASSWORD', 'Set it in carmen-backstage-e2e/.env (or the file named by CAPTURE_ENV_FILE).'),
}

/** Which DEV login a call or a Playwright project uses. */
export type Account = 'super' | 'clusterAdmin'

/**
 * The cluster-admin login for the Cluster Admin manual (not a Super Admin — see the trail
 * learning on why). Read only when a cluster project or the ZEBRA cleanup needs it.
 */
export function clusterAdminLogin(): { email: string; password: string } {
  const hint = "Set it in this repo's .env (see .env.example)."
  return { email: required('CLUSTER_ADMIN_EMAIL', hint), password: required('CLUSTER_ADMIN_PASSWORD', hint) }
}

/** True when the cluster-admin login is configured (cluster projects and the ZEBRA sweep are skipped otherwise). */
export const HAS_CLUSTER_ADMIN = Boolean(process.env.CLUSTER_ADMIN_EMAIL && process.env.CLUSTER_ADMIN_PASSWORD)

/** Code of the test cluster the Cluster Admin shots are taken in. Demo records there are swept by cleanup. */
export const ADMIN_CLUSTER_CODE = process.env.CLUSTER_ADMIN_CLUSTER_CODE || 'ZEBRA'

/** Optional gateway rate-limit bypass header (same token the e2e suite uses). Empty when unset. */
export function extraHeaders(): Record<string, string> {
  const token = process.env.CAPTURE_RATE_LIMIT_BYPASS_TOKEN || process.env.E2E_RATE_LIMIT_BYPASS_TOKEN
  return token ? { 'x-rate-limit-bypass': token } : {}
}

/** DEV certificates are valid; set CAPTURE_IGNORE_HTTPS_ERRORS=1 only for a host with a bad cert. */
export const IGNORE_HTTPS_ERRORS = process.env.CAPTURE_IGNORE_HTTPS_ERRORS === '1'

/**
 * Adds the bypass header only to requests for the app or its API — never to third parties
 * (fonts, CDNs). No-op when no token is configured.
 */
export async function addBypassHeaderRoute(context: BrowserContext): Promise<void> {
  const headers = extraHeaders()
  if (!Object.keys(headers).length) return
  const origins = new Set([new URL(CAPTURE.baseUrl).origin, new URL(CAPTURE.apiBase).origin])
  await context.route(
    (url) => origins.has(url.origin),
    (route) => route.continue({ headers: { ...route.request().headers(), ...headers } }),
  )
}

export const PATHS = {
  root: ROOT,
  authState: resolve(ROOT, '.auth/state.json'),
  clusterAdminAuthState: resolve(ROOT, '.auth/cluster-admin.json'),
  /** `{ id, name, code }` of ADMIN_CLUSTER_CODE, written by global setup for the cluster projects. */
  adminCluster: resolve(ROOT, '.capture-state/admin-cluster.json'),
  flagsOriginal: resolve(ROOT, '.capture-state/flags-original.json'),
}

export type App = 'support' | 'cluster-admin'

/** `<repo>/apps/<app>/public/screenshots` — each app owns its screenshots. */
export function screenshotsDir(app: App): string {
  return resolve(ROOT, 'apps', app, 'public', 'screenshots')
}
