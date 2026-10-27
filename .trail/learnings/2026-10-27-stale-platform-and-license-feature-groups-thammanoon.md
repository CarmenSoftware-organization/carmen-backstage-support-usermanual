---
title: "Stale /platform/* and /license-feature-groups capture paths still load because the app redirects them"
author: Thammanoon
date: 2026-10-27
branch: feature/manual-refresh-cluster-admin
cost: { minutes: 3, tokens: 43719 }
id: l-90da80fe
scope: repo
status: active
src: agent
touches:
  - docs/superpowers/plans/2026-10-28-manual-refresh-and-cluster-admin.md
  - docs/superpowers/specs/2026-10-28-manual-refresh-and-cluster-admin-design.md
  - capture/screens.manifest.ts
---

## Watch out
- carmen-backstage `src/App.tsx` routes `/platform/*` to `LegacyPlatformRedirect` and `/license-feature-groups/*` to `LegacyLicenseModuleRedirect`, so a stale path in `capture/screens.manifest.ts` still loads a page. The shot passes, but under an old slug or mid-redirect, and nothing fails to warn you.
- Because of that, grep the capture code for `'/platform/` and `/license-feature-groups` after any route rename, since otherwise only someone reviewing the screenshots by eye would catch it.

## Decided
- Use the new routes `/backstage/*` and `/license-modules` everywhere in the manual and the capture code, because the redirects are a compatibility shim in the app and may be removed later.
