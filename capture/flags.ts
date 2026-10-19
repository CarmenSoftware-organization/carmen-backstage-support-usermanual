// Feature-flag snapshot / enable / restore for capture runs against the shared DEV.
//
// Safety rules:
// - The original map is written to .capture-state/flags-original.json BEFORE anything changes.
// - If that file already exists, a previous run did not restore: refuse to start, so the true
//   original is never overwritten with an all-active snapshot.
// - PUT replaces the whole map, so every key is always sent. Absent keys mean "default active"
//   in the frontend, so no keys are ever added.
// - The file is deleted only after a GET confirms the restore.
//
// CLI: `bun capture/flags.ts restore` (or `bun run capture:restore-flags`).
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { api } from './api.ts'
import { PATHS } from './env.ts'

export type FeatureState = 'active' | 'inactive' | 'hide'
export type FeatureStateMap = Record<string, FeatureState>

const ENDPOINT = '/api-system/platform/feature-flags'

async function getFlags(): Promise<FeatureStateMap> {
  const payload = await api<{ value?: FeatureStateMap }>('GET', ENDPOINT)
  return { ...(payload?.value ?? {}) }
}

async function putFlags(value: FeatureStateMap): Promise<void> {
  await api('PUT', ENDPOINT, { value })
}

function sameMap(a: FeatureStateMap, b: FeatureStateMap): boolean {
  const ka = Object.keys(a).sort()
  const kb = Object.keys(b).sort()
  return ka.length === kb.length && ka.every((k, i) => k === kb[i] && a[k] === b[k])
}

function describe(map: FeatureStateMap): string {
  const keys = Object.keys(map).sort()
  return keys.length ? keys.map((k) => `  ${k}: ${map[k]}`).join('\n') : '  (empty map — every feature uses its default, active)'
}

/** Records the current flag map, then turns every non-active flag on. */
export async function snapshotAndEnableFlags(): Promise<void> {
  if (existsSync(PATHS.flagsOriginal)) {
    throw new Error('Flags from a previous run were not restored. Run: bun run capture:restore-flags')
  }
  const original = await getFlags()
  mkdirSync(dirname(PATHS.flagsOriginal), { recursive: true })
  writeFileSync(PATHS.flagsOriginal, JSON.stringify(original, null, 2) + '\n')
  console.log(`[flags] original map saved to ${PATHS.flagsOriginal}:\n${describe(original)}`)

  const enabled: FeatureStateMap = {}
  for (const [k, v] of Object.entries(original)) enabled[k] = v === 'active' ? v : 'active'
  if (sameMap(enabled, original)) {
    console.log('[flags] every flag is already active — nothing to change')
    return
  }
  const changed = Object.keys(original).filter((k) => original[k] !== 'active')
  await putFlags(enabled)
  const now = await getFlags()
  if (!sameMap(now, enabled)) throw new Error(`[flags] enable did not stick; DEV now has:\n${describe(now)}`)
  console.log(`[flags] turned on for this run: ${changed.join(', ')}`)
}

/** Puts the saved original map back, verifies it, then deletes the saved file. */
export async function restoreFlags(): Promise<void> {
  if (!existsSync(PATHS.flagsOriginal)) {
    console.log('[flags] nothing to restore (no saved original)')
    return
  }
  const original = JSON.parse(readFileSync(PATHS.flagsOriginal, 'utf8')) as FeatureStateMap
  const current = await getFlags()
  if (!sameMap(current, original)) await putFlags(original)
  const after = await getFlags()
  if (!sameMap(after, original)) {
    throw new Error(
      `[flags] restore could not be verified. Original kept at ${PATHS.flagsOriginal}.\n` +
        `Expected:\n${describe(original)}\nDEV has:\n${describe(after)}`,
    )
  }
  rmSync(PATHS.flagsOriginal)
  console.log(`[flags] restored and verified:\n${describe(after)}`)
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isCli) {
  const cmd = process.argv[2]
  if (cmd !== 'restore') {
    console.error('Usage: bun capture/flags.ts restore')
    process.exit(2)
  }
  restoreFlags().catch((err: unknown) => {
    console.error(err instanceof Error ? err.message : err)
    process.exit(1)
  })
}
