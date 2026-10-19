// Puts DEV feature flags back the way they were. Runs after failed tests too.
// A killed process (Ctrl-C twice / crash) skips this: run `bun run capture:restore-flags`.
import { restoreFlags } from './flags.ts'

export default async function globalTeardown(): Promise<void> {
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
