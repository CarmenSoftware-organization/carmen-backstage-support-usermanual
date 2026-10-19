// Removes MANUAL-DEMO records, then puts DEV feature flags back the way they were.
// Runs after failed tests too. A killed process (Ctrl-C twice / crash) skips this:
// run `bun run capture:cleanup-demo` and `bun run capture:restore-flags`.
import { cleanupDemoData } from './demo-data.ts'
import { restoreFlags } from './flags.ts'

export default async function globalTeardown(): Promise<void> {
  try {
    // Every run that got past setup sweeps MANUAL-DEMO records (only prefixed ones), so
    // leftovers of an earlier crashed run are removed too. Cheap when there are none.
    // A run whose setup refused to start touches nothing.
    if (process.env.CAPTURE_FLAGS_OWNED === '1') await cleanupDemoData()
  } catch (err) {
    // cleanupDemoData() never throws by design; this is a last guard so flags are always restored.
    console.error('[demo-data] CLEANUP FAILED — run `bun run capture:cleanup-demo` and check DEV:', err)
  } finally {
    await restoreOwnedFlags()
  }
}

async function restoreOwnedFlags(): Promise<void> {
  if (process.env.CAPTURE_FLAGS_OWNED !== '1') {
    console.log('[flags] this run did not change flags — teardown leaves them alone')
    return
  }
  try {
    // If someone changed flags during the run, put back only the keys this run changed.
    await restoreFlags({ onConflict: 'keep-theirs' })
  } catch (err) {
    console.error('[flags] RESTORE FAILED — run `bun run capture:restore-flags` and check DEV.')
    throw err
  }
}
