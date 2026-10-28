---
title: "Cluster Admin screenshots use the DEV cluster-admin account in .env, shot inside ZEBRA — never the Super Admin"
author: Thammanoon
date: 2026-10-27
branch: feature/manual-refresh-cluster-admin
cost: { minutes: 1, tokens: 1779 }
id: l-7c996777
scope: repo
status: active
replaces: l-b9818cb4
src: agent
touches:
  - docs/superpowers/specs/2026-10-28-manual-refresh-and-cluster-admin-design.md
  - capture/demo-data.ts
---

## Decided
- Cluster Admin site shots log in with `CLUSTER_ADMIN_EMAIL` / `CLUSTER_ADMIN_PASSWORD` from `.env` (non-super-admin DEV account, admin of test clusters CHG and ZEBRA), because those clusters are test data the user cleared for external readers. Screens are shot inside ZEBRA.
- Guides change ZEBRA only through `MANUAL-DEMO-` records removed by `cleanupDemoData()` in `capture/demo-data.ts`, because otherwise each run would leave ZEBRA's real seat counts and members altered.

## Tried and ruled out
- Shooting as the `TEST_USER_EMAIL` Super Admin: ruled out because `adminScope.all` makes `/cluster-admin` (carmen-backstage `src/pages/clusterAdmin/ClusterAdminEntry.tsx`) list every customer's cluster, leaking names onto the external site.
- A generated `MANUAL-DEMO-` cluster-admin user with a run-time password: dropped because the user supplied a real test account, which avoids depending on reset-password/Keycloak sync.

## Watch out
- That account administers two clusters, so `/cluster-admin` shows a picker first instead of redirecting.
- Configuration tab on the Cluster Admin BU page is read-only (`ConfigurationReadout.tsx`), so the manual says "view only, contact support to change".
