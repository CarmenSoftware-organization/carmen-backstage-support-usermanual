// One Playwright test per Shot, so one bad screen does not hide the rest.
// Run via `bun run capture:screens` (projects support-screens-th + support-screens-en).
import { test } from './fixtures.ts'
import { capture } from './capture-shot.ts'
import { SHOTS } from './screens.manifest.ts'

test.describe('signed out', () => {
  test.use({ storageState: { cookies: [], origins: [] } })
  for (const shot of SHOTS.filter((s) => s.loggedOut)) {
    test(shot.slug, ({ page }) => capture(page, shot))
  }
})

test.describe('signed in', () => {
  for (const shot of SHOTS.filter((s) => !s.loggedOut)) {
    test(shot.slug, ({ page }) => capture(page, shot))
  }
})
