// Minimal API client for the capture harness, using the saved login token.
import { readFileSync } from 'node:fs'
import { CAPTURE, PATHS, extraHeaders } from './env.ts'

type StorageState = { origins?: { origin: string; localStorage?: { name: string; value: string }[] }[] }

/** Reads the `token` localStorage item for CAPTURE.baseUrl from .auth/state.json. */
export function readToken(): string {
  const state = JSON.parse(readFileSync(PATHS.authState, 'utf8')) as StorageState
  const origin = new URL(CAPTURE.baseUrl).origin
  const entry = state.origins?.find((o) => o.origin === origin)
  const token = entry?.localStorage?.find((i) => i.name === 'token')?.value
  if (!token) throw new Error(`No login token for ${origin} in .auth/state.json — run the capture again to log in.`)
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

/** Calls the platform API; unwraps `data.data ?? data` like the platform's services. */
export async function api<T>(
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
  path: string,
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${CAPTURE.apiBase}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${readToken()}`,
      'x-app-id': CAPTURE.appId,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...extraHeaders(),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const text = await res.text()
  if (!res.ok) throw new ApiError(`${method} ${path} failed: HTTP ${res.status} ${text.slice(0, 300)}`, res.status)
  const json = (text ? JSON.parse(text) : {}) as { data?: unknown }
  return (json.data ?? json) as T
}
