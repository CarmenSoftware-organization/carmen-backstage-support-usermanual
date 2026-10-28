---
title: "ZEBRA seat count only drops when the demo user is hard-deleted; invitations list ignores paging; revoked invitations can't be deleted"
author: Thammanoon
date: 2026-10-27
branch: feature/manual-refresh-cluster-admin
cost: { minutes: 64, tokens: 324209 }
id: l-94c9c67c
scope: repo
status: active
src: agent
touches:
  - apps/cluster-admin/en/guides/manage-bu-people.md
  - apps/cluster-admin/guides/manage-bu-people.md
  - packages/capture/global-setup.ts
  - packages/capture/playwright.config.ts
  - apps/support/.vitepress/nav-data.mts
  - apps/support/en/getting-started/main-screen.md
  - apps/support/en/screens/ai/purchase-request-ai-providers.md
  - apps/support/en/screens/backstage/feature-flags.md
  - apps/support/getting-started/main-screen.md
  - apps/support/public/screenshots/en/activity-events-list.png
---

## Decided
- Cluster Admin guide captures delete their own MANUAL-DEMO user permanently in afterAll (`removeDemoMember` in packages/capture/demo-data.ts), because on DEV removing the BU and cluster memberships left the seat counted and the next guide failed with SEAT_LIMIT_REACHED (13/13).
- The invite guide revokes its own invitation right away (`revokeDemoInvitation`), because a run with two pending demo invitations was followed by the seat limit being hit.

## Watch out
- GET `/api-system/clusters/:id/invitations` returns every row on every page; `listAll` now stops when a page brings nothing new, otherwise the sweep saw each invitation 50 times.
- DELETE on an already revoked invitation returns 409, so revoked demo invitations stay in ZEBRA's history for good. They hold no seat.
- Not proven: whether it was the pending invitation or the soft-removed membership that held the seat. The final reviewer pointed out that a screenshot shows 11/13 with one invitation pending.
