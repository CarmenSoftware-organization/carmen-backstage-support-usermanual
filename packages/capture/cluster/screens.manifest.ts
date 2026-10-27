// Read-only shots for the Cluster Admin manual (apps/cluster-admin), taken as the cluster-admin
// login inside the test cluster (ADMIN_CLUSTER_CODE, default ZEBRA). Nothing is saved.
// `{c}` in a path is replaced with `/cluster-admin/<test cluster id>`.
// Routes come from carmen-backstage src/App.tsx (`/cluster-admin/:clusterId/...`).
import type { Shot } from '../screens.manifest.ts'

export const CLUSTER_SHOTS: Shot[] = [
  { slug: 'cluster-overview', path: '{c}/cluster' },
]
