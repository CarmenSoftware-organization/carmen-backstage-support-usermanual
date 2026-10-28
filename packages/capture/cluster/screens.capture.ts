// One Playwright test per Cluster Admin shot. Run via `bun run capture:cluster`
// (projects cluster-screens-th + cluster-screens-en, cluster-admin session).
import { adminCluster, test } from '../fixtures.ts'
import { capture } from '../capture-shot.ts'
import { CLUSTER_SHOTS } from './screens.manifest.ts'

for (const shot of CLUSTER_SHOTS) {
  test(shot.slug, ({ page }) => {
    const base = `/cluster-admin/${adminCluster().id}`
    return capture(page, { ...shot, path: shot.path.replace('{c}', base) })
  })
}
