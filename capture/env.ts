// Capture settings. Loads this repo's `.env` first, then the e2e repo's `.env`
// (credentials). Values already in the environment always win.
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

/** Parses dotenv text: `KEY=VALUE`, optional `export`, quotes, `#` comments.
 *  Copied from carmen-platform-e2e/scripts/lib/parse-env.mjs (not imported on purpose). */
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
loadFile(resolve(ROOT, process.env.CAPTURE_ENV_FILE ?? '../carmen-platform-e2e/.env'))

function required(key: string, hint: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing ${key}. ${hint}`)
  return value
}

export const CAPTURE: { baseUrl: string; apiBase: string; appId: string; email: string; password: string } = {
  baseUrl: (process.env.CAPTURE_BASE_URL || 'http://dev.blueledgers.com:9902').replace(/\/$/, ''),
  apiBase: (process.env.CAPTURE_API_BASE || 'https://dev.blueledgers.com:4001').replace(/\/$/, ''),
  appId: required('CAPTURE_APP_ID', 'Copy REACT_APP_API_APP_ID from carmen-platform/.env.dev into this repo\'s .env (see .env.example).'),
  email: required('TEST_USER_EMAIL', 'Set it in carmen-platform-e2e/.env (or the file named by CAPTURE_ENV_FILE).'),
  password: required('TEST_USER_PASSWORD', 'Set it in carmen-platform-e2e/.env (or the file named by CAPTURE_ENV_FILE).'),
}

/** Optional gateway rate-limit bypass header (same token the e2e suite uses). Empty when unset. */
export function extraHeaders(): Record<string, string> {
  const token = process.env.CAPTURE_RATE_LIMIT_BYPASS_TOKEN || process.env.E2E_RATE_LIMIT_BYPASS_TOKEN
  return token ? { 'x-rate-limit-bypass': token } : {}
}

export const PATHS = {
  root: ROOT,
  authState: resolve(ROOT, '.auth/state.json'),
  flagsOriginal: resolve(ROOT, '.capture-state/flags-original.json'),
  screenshots: resolve(ROOT, 'site/public/screenshots'),
}
