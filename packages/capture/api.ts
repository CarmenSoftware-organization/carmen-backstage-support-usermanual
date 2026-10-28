// Minimal API client for the capture harness, using the saved login token.
import { readFileSync } from 'node:fs'
import { CAPTURE, PATHS, extraHeaders, type Account } from './env.ts'

type StorageState = { origins?: { origin: string; localStorage?: { name: string; value: string }[] }[] }

/** Reads the `token` localStorage item for CAPTURE.baseUrl from the account's saved login (.auth/). */
export function readToken(as: Account = 'super'): string {
  const file = as === 'clusterAdmin' ? PATHS.clusterAdminAuthState : PATHS.authState
  const state = JSON.parse(readFileSync(file, 'utf8')) as StorageState
  const origin = new URL(CAPTURE.baseUrl).origin
  const entry = state.origins?.find((o) => o.origin === origin)
  const token = entry?.localStorage?.find((i) => i.name === 'token')?.value
  if (!token) throw new Error(`No login token for ${origin} in ${file} — run the capture again to log in.`)
  return token
}

/** Non-2xx API response; `status` lets callers react to e.g. 401 (expired login). */
export class ApiError extends Error {
  readonly status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH'

/** Calls the Backstage API; unwraps `data.data ?? data` like the app's services. */
export async function api<T>(method: Method, path: string, body?: unknown, as: Account = 'super'): Promise<T> {
  const json = await apiJson<{ data?: unknown }>(method, path, body, as)
  return (json.data ?? json) as T
}

/** Like api() but returns the whole response body (for fields outside `data`, e.g. `summary`). */
export async function apiJson<T>(method: Method, path: string, body?: unknown, as: Account = 'super'): Promise<T> {
  const res = await fetch(`${CAPTURE.apiBase}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${readToken(as)}`,
      'x-app-id': CAPTURE.appId,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...extraHeaders(),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const text = await res.text()
  if (!res.ok) throw new ApiError(`${method} ${path} failed: HTTP ${res.status} ${text.slice(0, 300)}`, res.status)
  return (text ? JSON.parse(text) : {}) as T
}
