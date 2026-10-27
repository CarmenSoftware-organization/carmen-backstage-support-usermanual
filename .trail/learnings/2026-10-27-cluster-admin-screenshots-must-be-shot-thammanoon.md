---
title: "Cluster Admin screenshots must be shot as a single-cluster demo admin, not the Super Admin capture user"
author: Thammanoon
date: 2026-10-27
branch: feature/manual-refresh-cluster-admin
cost: { minutes: 6, tokens: 34006 }
id: l-b9818cb4
scope: repo
status: active
src: agent
touches:
  - docs/superpowers/specs/2026-10-28-manual-refresh-and-cluster-admin-design.md
  - capture/demo-data.ts
---

## Decided
- Cluster Admin shots log in as a `MANUAL-DEMO-` user made admin of exactly one demo cluster (random password set at run time via `PUT /api-system/user/:id/reset-password`, never stored), then cleaned up by `cleanupDemoData()` in `capture/demo-data.ts`.

## Watch out
- A Super Admin has `adminScope.all`: `/cluster-admin` (carmen-backstage `src/pages/clusterAdmin/ClusterAdminEntry.tsx`) shows a picker of every customer's cluster, and the view may expose powers real hotel-group admins lack. Shooting as the `TEST_USER_EMAIL` Super Admin leaks other customers' names onto the external Cluster Admin site.
- With exactly one administered cluster the app redirects straight to `/cluster-admin/<id>/cluster`, so no picker appears.
- In the Cluster Admin BU page the Configuration tab is read-only (`ConfigurationReadout.tsx`); the manual says "view only, contact support to change".
