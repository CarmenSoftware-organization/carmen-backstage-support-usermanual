// Feature-flag snapshot / enable / restore for capture runs against the shared DEV.
//
// Safety rules:
// - The original map is written to .capture-state/flags-original.json, and the map this run
//   is about to set to .capture-state/flags-applied.json, BEFORE anything changes.
// - If the original file already exists, a previous run did not restore: refuse to start, so
//   the true original is never overwritten with an all-active snapshot.
// - PUT replaces the whole map, so every key is always sent. Absent keys mean "default active"
//   in the frontend, so no keys are ever added.
// - Before restoring, the current DEV map is compared with what this run set. If someone else
//   changed flags meanwhile, their keys are listed and:
//     · teardown ('keep-theirs') restores only the keys this run changed and leaves theirs;
//     · the CLI ('refuse') stops unless run with --force ('overwrite').
// - The saved files are deleted only after a GET confirms the restore.
//
// CLI: `bun packages/capture/flags.ts restore [--force]` (or `bun run capture:restore-flags [-- --force]`).
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ApiError, api } from './api.ts'
import { PATHS } from './env.ts'

export type FeatureState = 'active' | 'inactive' | 'hide'
export type FeatureStateMap = Record<string, FeatureState>
/** What to do when DEV flags were changed by someone else after this run set them. */
export type OnConflict = 'refuse' | 'keep-theirs' | 'overwrite'

const ENDPOINT = '/api-system/backstage/feature-flags'
const appliedPath = (): string => join(dirname(PATHS.flagsOriginal), 'flags-applied.json')

const LOGIN_EXPIRED =
  'The saved DEV login has expired (HTTP 401), so flags could not be restored.\n' +
  'Fix: run `bun run capture:screens` once — it logs in again and then stops before changing\n' +
  'anything, because the saved original is still there. Then run `bun run capture:restore-flags` again.'

async function call<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) throw new Error(`[flags] ${LOGIN_EXPIRED}`)
    throw err
  }
}

async function getFlags(): Promise<FeatureStateMap> {
  const payload = await call(() => api<{ value?: FeatureStateMap }>('GET', ENDPOINT))
  return { ...(payload?.value ?? {}) }
}

async function putFlags(value: FeatureStateMap): Promise<void> {
  await call(() => api('PUT', ENDPOINT, { value }))
}

function sameMap(a: FeatureStateMap, b: FeatureStateMap): boolean {
  const ka = Object.keys(a).sort()
  const kb = Object.keys(b).sort()
  return ka.length === kb.length && ka.every((k, i) => k === kb[i] && a[k] === b[k])
}

/** Keys whose state differs between two maps (including keys present in only one). */
function changedKeys(a: FeatureStateMap, b: FeatureStateMap): string[] {
  return [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((k) => a[k] !== b[k]).sort()
}

function describe(map: FeatureStateMap): string {
  const keys = Object.keys(map).sort()
  return keys.length ? keys.map((k) => `  ${k}: ${map[k]}`).join('\n') : '  (empty map — every feature uses its default, active)'
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n')
}

/** Records the current flag map, then turns every non-active flag on. */
export async function snapshotAndEnableFlags(): Promise<void> {
  if (existsSync(PATHS.flagsOriginal)) {
    throw new Error('Flags from a previous run were not restored. Run: bun run capture:restore-flags')
  }
  const original = await getFlags()
  writeJson(PATHS.flagsOriginal, original)
  console.log(`[flags] original map saved to ${PATHS.flagsOriginal}:\n${describe(original)}`)

  const enabled: FeatureStateMap = {}
  for (const [k, v] of Object.entries(original)) enabled[k] = v === 'active' ? v : 'active'
  // Saved before the PUT, so a crash mid-PUT still leaves a record of what this run set.
  writeJson(appliedPath(), enabled)
  if (sameMap(enabled, original)) {
    console.log('[flags] every flag is already active — nothing to change')
    return
  }
  await putFlags(enabled)
  const now = await getFlags()
  if (!sameMap(now, enabled)) throw new Error(`[flags] enable did not stick; DEV now has:\n${describe(now)}`)
  console.log(`[flags] turned on for this run: ${changedKeys(original, enabled).join(', ')}`)
}

/**
 * Puts the saved original map back, verifies it, then deletes the saved files.
 * `onConflict` decides what happens when DEV no longer matches what this run set.
 */
export async function restoreFlags(opts: { onConflict?: OnConflict } = {}): Promise<void> {
  const onConflict = opts.onConflict ?? 'refuse'
  if (!existsSync(PATHS.flagsOriginal)) {
    console.log('[flags] nothing to restore (no saved original)')
    return
  }
  const original = JSON.parse(readFileSync(PATHS.flagsOriginal, 'utf8')) as FeatureStateMap
  // Missing applied file = the run stopped before deciding on changes, i.e. it set nothing.
  const applied = existsSync(appliedPath())
    ? (JSON.parse(readFileSync(appliedPath(), 'utf8')) as FeatureStateMap)
    : original
  const current = await getFlags()

  const theirs = changedKeys(applied, current)
  let target: FeatureStateMap = original
  if (theirs.length) {
    console.warn(
      `[flags] someone changed these flags on DEV after this run set them: ${theirs
        .map((k) => `${k} (${applied[k] ?? 'absent'} → ${current[k] ?? 'absent'})`)
        .join(', ')}`,
    )
    if (onConflict === 'refuse') {
      throw new Error(
        `[flags] not restoring, to avoid overwriting their change. Saved files kept in ${dirname(PATHS.flagsOriginal)}.\n` +
          'Check with the person who changed them, then either fix the flags by hand on the Feature Flags page\n' +
          'and delete .capture-state/, or overwrite everything with the saved original:\n' +
          '  bun run capture:restore-flags -- --force',
      )
    }
    if (onConflict === 'keep-theirs') {
      // Start from DEV as it is now; put back only the keys this run changed and nobody touched since.
      target = { ...current }
      for (const k of changedKeys(original, applied)) {
        if (theirs.includes(k)) continue
        if (k in original) target[k] = original[k]
        else delete target[k]
      }
      console.warn('[flags] restoring only the keys this run changed; their changes are left as they are')
    }
  }

  if (!sameMap(current, target)) await putFlags(target)
  const after = await getFlags()
  if (!sameMap(after, target)) {
    throw new Error(
      `[flags] restore could not be verified. Saved files kept in ${dirname(PATHS.flagsOriginal)}.\n` +
        `Expected:\n${describe(target)}\nDEV has:\n${describe(after)}`,
    )
  }
  rmSync(PATHS.flagsOriginal)
  rmSync(appliedPath(), { force: true })
  console.log(`[flags] restored and verified:\n${describe(after)}`)
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isCli) {
  const [cmd, ...rest] = process.argv.slice(2)
  if (cmd !== 'restore' || rest.some((a) => a !== '--force')) {
    console.error('Usage: bun packages/capture/flags.ts restore [--force]')
    process.exit(2)
  }
  restoreFlags({ onConflict: rest.includes('--force') ? 'overwrite' : 'refuse' }).catch((err: unknown) => {
    console.error(err instanceof Error ? err.message : err)
    process.exit(1)
  })
}
