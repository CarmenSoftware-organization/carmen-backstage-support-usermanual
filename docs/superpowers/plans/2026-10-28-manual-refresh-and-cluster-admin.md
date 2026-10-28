# Manual Refresh + Cluster Admin Manual Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the repo into a Turborepo with two separately built VitePress sites — the refreshed support manual and a new Cluster Admin manual — both TH+EN, with screenshots captured from DEV.

**Architecture:** `apps/support` and `apps/cluster-admin` are VitePress roots; `packages/capture` (Playwright harness, two login accounts), `packages/checks` (parity / plain-language / anchors, run against the app in the current directory) and `packages/theme` (shared VitePress theme + search tokenizer) are shared. Turbo runs `build` / `check` per app; capture is run explicitly, never cached.

**Tech Stack:** bun workspaces, turbo, VitePress 1.6.3, Playwright 1.58, TypeScript 5.9.

**Spec:** `docs/superpowers/specs/2026-10-28-manual-refresh-and-cluster-admin-design.md`

## Global Constraints

- Every page exists in Thai (app root) and English (`en/`); `check:parity` enforces it.
- On-screen labels exactly as in `../carmen-backstage/src/i18n/th.ts` / `en.ts` (read from `origin/main`, `git -C ../carmen-backstage fetch` first).
- Style rules: `docs/style-guide.md` (plain language, page templates). Cluster Admin pages: never link to or name Backstage-only screens.
- "Contact support" wording is generic and lives in one place (`apps/cluster-admin/getting-help.md` + `en/getting-help.md`); every such spot links there.
- Cluster Admin shots: logged in as `CLUSTER_ADMIN_EMAIL` / `CLUSTER_ADMIN_PASSWORD` (root `.env`), inside cluster code `ZEBRA`. Never as `TEST_USER_EMAIL`. Never change ZEBRA's existing BUs/users/settings — only `MANUAL-DEMO-` records, removed by cleanup.
- No credentials in committed files. No `*.test.ts` / `*.spec.ts` (user preference) — verification is `bun run check`, typecheck, the grep checks below, and the DEV capture runs.
- Branch `feature/manual-refresh-cluster-admin`. Run `trail check` before pushing.

## Review Focus

1. **Old routes still "work".** The app redirects `/platform/*` and `/license-feature-groups/*` (`LegacyPlatformRedirect`, `LegacyLicenseModuleRedirect`), so a stale manifest path silently shoots the right page under a wrong slug or a redirect flash. Task 3 adds a grep gate: no `'/platform/` or `/license-feature-groups` in `packages/capture/**`.
2. **Killed capture run leaves ZEBRA changed.** A `MANUAL-DEMO-` user still holding a seat or BU membership in ZEBRA after Ctrl-C. Task 7: `cleanupDemoData()` removes ZEBRA memberships/seats of demo users first; the start-of-run sweep covers it; Task 10 verifies `left 0` after a deliberately interrupted run.
3. **Wrong account in a Cluster Admin shot.** Super Admin storage state used by a `cluster-*` project would show every customer's cluster. Task 7: cluster projects use `.auth/cluster-admin.json`; global setup aborts if that account's `/api-system/me/admin-clusters` returns `summary.all === true` or no cluster with code `ZEBRA`.
4. **Support content leaking into the Cluster Admin build.** Task 8 adds a grep gate on `apps/cluster-admin/.vitepress/dist`: no `sql workbench`, `super admin`, `database pool` or `/backstage/` (case-insensitive). The product name "Carmen Blue Backstage" may appear where the sign-in screen shows it, which is why the gate matches `/backstage/` paths, not the bare word.
5. **Turborepo move changes the support site.** Task 1 compares the built `dist` file list and content hashes before/after the move; any difference must be explained before continuing.

---

## File Structure

```
package.json            root: workspaces, turbo, root scripts (check, build, capture*)
turbo.json              tasks build / check / typecheck / dev
tsconfig.json           root typecheck over apps/*/.vitepress, packages/*
apps/support/           ← git mv site/*   (VitePress root; package.json; no README.md inside)
apps/cluster-admin/     new VitePress root (package.json, .vitepress/{config,nav-data}.mts, pages, public/screenshots)
packages/theme/         ← site/.vitepress/theme/index.ts + search-options.mts
packages/checks/        ← scripts/*.ts  (SITE = process.cwd())
packages/capture/       ← capture/*     (ROOT = repo root; per-app screenshot dirs; two accounts)
```

---

### Task 1: Turborepo move with no content change

**Files:**
- Move: `site/` → `apps/support/` (all, incl. `.vitepress/`, `public/`), `scripts/` → `packages/checks/`, `capture/` → `packages/capture/`, `site/.vitepress/theme/index.ts` + `site/.vitepress/search-options.mts` → `packages/theme/`
- Create: `turbo.json`, `apps/support/package.json`, `packages/{checks,capture,theme}/package.json`
- Modify: root `package.json`, `tsconfig.json`, `.gitignore`, `packages/checks/lib.ts`, `packages/checks/check-anchors.ts`, `packages/capture/env.ts`, `packages/capture/fixtures.ts:127-160`, `apps/support/.vitepress/config.mts`, `apps/support/.vitepress/theme/index.ts` (re-export from `@manual/theme`)

**Interfaces:**
- Produces: workspace package names `@manual/support`, `@manual/cluster-admin` (Task 8), `@manual/checks`, `@manual/capture`, `@manual/theme`.
- Produces: `packages/checks/lib.ts` → `export const SITE: string` = `resolve(process.cwd())`; `listMarkdown(): string[]` unchanged. Messages print paths relative to repo root.
- Produces: `@manual/theme` exports `default` (the `Theme` object now in `site/.vitepress/theme/index.ts`) and `miniSearchOptions`.
- Produces: `packages/capture/env.ts` → `PATHS.root` = repo root; `PATHS.screenshots` replaced by `screenshotsDir(app: 'support' | 'cluster-admin'): string` → `<root>/apps/<app>/public/screenshots`. `PATHS.authState` unchanged (`.auth/state.json`).
- Each app's `package.json` scripts: `build` (`vitepress build .`), `dev` (`vitepress dev .`), `preview`, `check:parity` (`bun ../../packages/checks/check-parity.ts`), `check:plain`, `check:anchors`, `check` (parity + plain + anchors).
- `turbo.json`: `build` outputs `[".vitepress/dist/**"]`; `check` dependsOn `["build"]`; `dev` `{cache:false, persistent:true}`.
- Root scripts: `build` = `turbo run build`, `check` = `tsc --noEmit && turbo run check`, `capture` / `capture:*` = `playwright test -c packages/capture/playwright.config.ts ...` (project names unchanged in this task), `capture:restore-flags`, `capture:cleanup-demo` pointing at the new paths.

- [ ] **Step 1: Baseline before moving**

Run: `bun run check && (cd site/.vitepress/dist && find . -type f -exec shasum {} + | sort -k2) > "$SCRATCH/dist-before.txt"`
Expected: check passes; file written. (`$SCRATCH` = the session scratchpad.)

- [ ] **Step 2: `git mv` everything per Files, then fix paths, add package.json files, turbo.json, tsconfig include (`apps/*/.vitepress/*.mts`, `packages/**/*.ts`), .gitignore (`apps/*/.vitepress/dist/`, `apps/*/.vitepress/cache/`, `packages/capture/results/`, `.turbo/`)**

Do not rename any page or screenshot in this task.

- [ ] **Step 3: Install and check**

Run: `bun add -d turbo && bun install && bun run check`
Expected: typecheck, parity, plain, build, anchors all pass for `@manual/support`.

- [ ] **Step 4: Compare build output**

Run: `(cd apps/support/.vitepress/dist && find . -type f -exec shasum {} + | sort -k2) | diff "$SCRATCH/dist-before.txt" -`
Expected: no diff. If hashed asset names differ only because of moved theme source paths, check that page HTML text is identical (`diff -r` after stripping `assets/*.js` names) and note it in the commit message.

- [ ] **Step 5: Capture smoke (Playwright config resolves)**

Run: `bunx playwright test -c packages/capture/playwright.config.ts --list`
Expected: lists the screens/guides tests (no run against DEV).

- [ ] **Step 6: README** — rewrite Quick start / commands for the new layout (`bun run check`, `bunx turbo run build --filter=@manual/support`, capture commands); nav order reference becomes `src/components/nav/backstageNav.ts`.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: ย้ายเป็น Turborepo (apps/support, packages/{capture,checks,theme}) ไม่เปลี่ยนเนื้อหา"
```

---

### Task 2: Support — Platform → Backstage rename

**Files:**
- Rename (TH + EN, pages and screenshot files): `screens/platform/` → `screens/backstage/`; `platform-config` → `backstage-config`; `platform-roles` → `backstage-roles`; `platform-users` → `user-backstage`; `database/platform-migrations` → `database/backstage-migrations`. Screenshot slugs follow (`platform-config-overview` → `backstage-config-overview`, etc.).
- Modify: `apps/support/.vitepress/nav-data.mts` (group label = `navGroup.backstage`, item labels from `nav.backstageConfig`, `nav.backstageRoles`, `nav.userBackstage`, `nav.backstageMigrations`), `packages/capture/screens.manifest.ts` (paths `/backstage/configs`, `/backstage/email-settings`, `/backstage/roles`, `/backstage/user-backstage`, `/backstage/super-admins`, `/backstage/migrations`, `/backstage/database-pools`, `/backstage/features`), every page linking to the renamed ones, `glossary.md` (TH+EN), `screens/backstage/feature-flags.md` (list new keys: `cluster_admin_cluster`, `cluster_admin_business_units`, `cluster_admin_users`, `cluster_admin_licenses`, `ai_providers`, renamed `backstage_config`, `backstage_roles`, `user_backstage`, `backstage_migrations` — describe each in plain words, keys only if the Feature Flags screen shows them).

**Interfaces:**
- Produces: final support slugs used by Tasks 3–6 (above).

- [ ] **Step 1: Rename with `git mv`, update nav-data, manifest, links, glossary, feature-flags page**
- [ ] **Step 2: Gate — no stale names**

Run: `grep -rnE "screens/platform/|platform-(config|roles|users|migrations)|'/platform/" apps/support packages/capture --include=*.md --include=*.mts --include=*.ts`
Expected: no output.

- [ ] **Step 3: `bun run check`** — Expected: pass (old screenshots renamed, so parity finds every file).
- [ ] **Step 4: Commit** — `docs(support): Platform → Backstage (ชื่อเมนู, slug, route)`

---

### Task 3: Support — Licence Modules / Feature area + licence list features

**Files:**
- Rename: `screens/license/license-feature-groups.md` → `license-modules.md` (TH+EN) and its screenshots (`license-feature-groups-*` → `license-modules-*`).
- Modify: nav-data (label from `nav.licenseFeatureGroups` — read its current TH/EN value), manifest paths `/license-modules`, `/license-modules/new`; `licenses.md` (Days Left column + sort, Expiring soon filter and count card on seat / BU quota / interface tabs, feature-group/module and days-left columns on subscriptions), `license-features.md` ("module" → "Feature area" where the screen says so), `guides/manage-license.md`, glossary (Module, Feature area; old "Feature Group" kept as a "formerly" note).

- [ ] **Step 1: Edit pages and manifest** (labels from `th.ts`/`en.ts` keys under licences)
- [ ] **Step 2: Gate (Review Focus 1)**

Run: `grep -rnE "/license-feature-groups|'/platform/" packages/capture; grep -rniE "feature group" apps/support --include=*.md | grep -vi "formerly\|เดิมชื่อ"`
Expected: no output.

- [ ] **Step 3: `bun run check`** — pass.
- [ ] **Step 4: Commit** — `docs(support): License Modules / Feature area + Days Left, Expiring soon`

---

### Task 4: Support — menu structure, sign-in, branding

**Files:**
- Modify: `getting-started/main-screen.md` (menu table rebuilt from `backstageNav.ts` order: Tenant Migrations / Tenant Seeds / Data Import shown as sub-rows under Business Units; new AI group; Backstage group; Database last), `organization/tenant-migrations.md`, `tenant-seeds.md`, `data-import.md` (menu path "Business Units → …"), `getting-started/login.md` (after sign-in you return to the page you opened; app name on login page as shown), nav-data Screen Reference order to match `backstageNav.ts`.

- [ ] **Step 1: Edit** — read `../carmen-backstage/src/components/nav/backstageNav.ts` and `Sidebar.tsx` for how sub-rows render.
- [ ] **Step 2: `bun run check`** — pass.
- [ ] **Step 3: Commit** — `docs(support): โครงเมนูใหม่ + หน้า Login`

---

### Task 5: Support — Clusters / Business Units / Report Templates changes

**Files:**
- Modify: `organization/clusters.md`, `organization/business-units.md` (Notes tab: write, edit, attach files, deleted notes + restore, history; BU licences sub-tabs Seats | Features | Interface; seat management from Users tab and the over-quota banner; tab "Users" (was People) now last), `content/report-templates.md` (Export XML tab and its warning; run / export switches), `guides/add-user.md` and `guides/setup-hotel.md` where those tabs appear.
- Modify: `packages/capture/screens.manifest.ts` — add shots `clusters-notes`, `business-units-notes`, `business-units-licenses-seats`, `report-templates-export-xml` (prepare = click the tab by its on-screen label in the current `lang`).

- [ ] **Step 1: Edit pages + manifest**
- [ ] **Step 2: `bun run check`** — fails only on the new, not-yet-captured screenshots (expected until Task 6's capture); every other check passes.
- [ ] **Step 3: Commit** — `docs(support): Notes, แท็บไลเซนส์ย่อย, seat, Export XML`

---

### Task 6: Support — AI Providers page, sweep, recapture

**Files:**
- Create: `screens/ai/purchase-request-ai-providers.md` (TH+EN, Screen Reference template; list, edit dialog sections, shared prompt, logo, order field must be a whole number ≥ 0).
- Modify: nav-data (new group from `navGroup.ai`, item `nav.aiProvidersShort`), manifest (`ai-providers-list` `/purchase-request-ai-providers`, `ai-providers-form` = open first row's edit dialog, mask any API key field like `APP_SECRET`).

- [ ] **Step 1: Write the page + nav + manifest**
- [ ] **Step 2: Fresh sweep** — `git -C ../carmen-backstage log --oneline <last-commit-reviewed>..origin/main -- src` and `git diff 5b8c3b28 origin/main -- src/App.tsx src/components/nav src/i18n` once more; fix anything the spec table missed. List what you found in the commit message.
- [ ] **Step 3: Capture all support shots**

Run: `bun run capture:support` (root script = projects `support-screens-th`, `support-screens-en`, `support-guides-th`, `support-guides-en` — rename the four existing projects to these names in this task)
Expected: all pass; log ends with flags restored and `[demo-data] … left 0`.

- [ ] **Step 4: Look at every changed PNG** (`git status apps/support/public/screenshots`) — sidebar shows the new menu, no real secrets, no error toasts.
- [ ] **Step 5: `bun run check`** — pass.
- [ ] **Step 6: Commit** — `docs(support): หน้า Purchase Request AI Providers + ถ่ายภาพใหม่ทั้งชุด`

---

### Task 7: Capture — cluster-admin account, ZEBRA, demo records

**Files:**
- Modify: `packages/capture/env.ts`, `global-setup.ts`, `global-teardown.ts`, `fixtures.ts`, `demo-data.ts`, `playwright.config.ts`, root `.env.example` (add the two variable names, empty values).

**Interfaces:**
- Produces: `env.ts` → `CLUSTER_ADMIN: { email: string; password: string }` (required only when a `cluster-*` project runs; missing → clear error naming the variables); `PATHS.clusterAdminAuthState` = `.auth/cluster-admin.json`.
- Produces: `demo-data.ts`
  - `findAdminCluster(code: 'ZEBRA'): Promise<{ id: string; name: string }>` — calls `/api-system/me/admin-clusters` with the cluster-admin token; throws if `summary.all === true` or code not found (Review Focus 3).
  - `addDemoUserToBusinessUnit(userId: string, buId: string, role?: 'admin' | 'user'): Promise<void>` — Super Admin API, mirrors `addDemoUserToCluster`.
  - `cleanupDemoData()` additionally removes every `MANUAL-DEMO-` user's BU and cluster membership (seats freed) in any cluster before deleting the users; returns them in `deleted` / `left` like today.
- Produces: fixture option `account: 'super' | 'clusterAdmin'` (default `'super'`) choosing the storage state; option `app: 'support' | 'cluster-admin'` choosing `screenshotsDir(app)`; option `clusterId` filled for cluster projects from `findAdminCluster('ZEBRA')` (saved by global setup to `.capture-state/cluster.json`).
- Produces: projects `cluster-screens-th`, `cluster-screens-en` (`testMatch: /cluster\/screens\.capture\.ts/`), `cluster-guides-th`, `cluster-guides-en` (`/cluster\/guides\/.*\.capture\.ts/`), all `{ account: 'clusterAdmin', app: 'cluster-admin' }`. Support projects get `testIgnore: /cluster\//`.
- Global setup: logs in both accounts (cluster-admin login waits for any URL that is not `/login`, 30 s), Super Admin flag snapshot/enable as today, then `findAdminCluster('ZEBRA')`, then the leftover sweep.

- [ ] **Step 1: Implement per Interfaces**
- [ ] **Step 2: Typecheck** — `bunx tsc --noEmit` passes.
- [ ] **Step 3: Dry run on DEV** — `bun packages/capture/demo-data.ts cleanup --dry-run` prints the plan; then a one-file probe `cluster/screens.capture.ts` with a single shot of `/cluster-admin/<id>/cluster` run via `bunx playwright test -c packages/capture/playwright.config.ts --project=cluster-screens-en`.
Expected: PNG shows ZEBRA, the Cluster Admin sidebar (Cluster, Business Units, Users, Licences), no Backstage menu.

- [ ] **Step 4: Commit** — `feat(capture): บัญชี cluster admin + ZEBRA + demo membership cleanup`

---

### Task 8: Cluster Admin site scaffold

**Files:**
- Create: `apps/cluster-admin/package.json` (`@manual/cluster-admin`, same scripts as support), `.vitepress/config.mts` (title from the app's Cluster Admin wording, e.g. `breadcrumb.clusterAdmin`, + "คู่มือการใช้งาน" / "User Manual"; same locale/search setup as support, theme from `@manual/theme`), `.vitepress/nav-data.mts` (same `PageDef` shape), `.vitepress/theme/index.ts` (re-export), `index.md` + `en/index.md`, `getting-help.md` + `en/getting-help.md` (generic: "ติดต่อทีม support ของ Carmen" / "Contact Carmen support", with a clearly marked line where the real channel will go).
- Modify: root `package.json` scripts `capture:cluster` (the four cluster projects).

**Interfaces:**
- Produces: nav-data exports `gettingStarted`, `screens`, `guides: PageDef[]` with slugs used by Tasks 9–10:
  - `getting-started/sign-in`, `getting-started/choose-cluster`, `getting-started/main-screen`, `glossary`, `getting-help`
  - `screens/cluster`, `screens/business-units`, `screens/business-unit-detail`, `screens/users`, `screens/licences`, `screens/profile`
  - `guides/manage-seats`, `guides/licences`, `guides/bu-settings`, `guides/invite-user`, `guides/manage-bu-people`

- [ ] **Step 1: Scaffold** (index pages + getting-help only; other pages come in Tasks 9–10)
- [ ] **Step 2: Leak gate (Review Focus 4)** — add `check:leak` to the cluster app: build, then `grep -rliE "sql workbench|super admin|database pool|/backstage/" .vitepress/dist` must print nothing; wire into its `check`.
- [ ] **Step 3: `bun run check`** — both apps pass.
- [ ] **Step 4: Commit** — `feat(cluster-admin): โครงเว็บคู่มือ Cluster Admin`

---

### Task 9: Cluster Admin — Getting Started + Screen Reference

**Files:**
- Create: the `getting-started/*`, `glossary`, `screens/*` pages from Task 8 (TH+EN), using the style guide's Screen Reference template. Readers are hotel-group staff: shorter sentences than the support site, no Backstage terms.
- Create: `packages/capture/cluster/screens.capture.ts` + `cluster/screens.manifest.ts` (same `ShotDef` shape as the support manifest, paths relative to `/cluster-admin/<clusterId>`; picker shot at `/cluster-admin`). Shots: `choose-cluster`, `main-screen`, `cluster-overview`, `business-units-list`, and for the BU detail one shot per tab — `bu-hotel`, `bu-configuration`, `bu-licences-seats`, `bu-licences-features`, `bu-licences-interface`, `bu-notes`, `bu-users`; `users-list`, `licences-overview`, `profile-overview`. BU detail opens a ZEBRA BU that is not `MANUAL-DEMO-`; read-only, never saves.

Content musts:
- `screens/business-unit-detail` Configuration section: values can be viewed only; to change them, link to `getting-help`.
- `getting-started/choose-cluster`: the picker appears when you look after more than one cluster.

- [ ] **Step 1: Write manifest + capture file; run `bun run capture:cluster -- --grep screens`** (or the two `cluster-screens-*` projects). Expected: all shots pass.
- [ ] **Step 2: Look at each PNG** — only ZEBRA/CHG names; no Backstage menu.
- [ ] **Step 3: Write the pages**
- [ ] **Step 4: `bun run check`** — pass (incl. leak gate).
- [ ] **Step 5: Commit** — `docs(cluster-admin): เริ่มต้นใช้งาน + คู่มือรายหน้าจอ`

---

### Task 10: Cluster Admin — How-to Guides + final run

**Files:**
- Create: the five `guides/*` pages (TH+EN, How-to Guide template) and `packages/capture/cluster/guides/{manage-seats,licences,bu-settings,invite-user,manage-bu-people}.capture.ts`.

Guide behaviour on DEV (all inside ZEBRA, only on `MANUAL-DEMO-` records created by the Super Admin API in the test's setup):
- `invite-user`: invite a `MANUAL-DEMO-` email to a ZEBRA BU through the Invite dialog, as the cluster admin.
- `manage-seats`: give a seat to / take it back from a demo user; if ZEBRA has no free seat, show the over-quota state instead of adding licences.
- `manage-bu-people`: change the demo user's role, then remove them.
- `licences`: read-only (Days Left, Expiring soon); state what **Manage licences** does for a cluster admin as observed on DEV — if it only leads to contacting support, say so and link `getting-help`.
- `bu-settings`: read-only Configuration + editing Hotel/Company contact fields — shoot the edit form **without saving**.

- [ ] **Step 1: Write the guide captures; run `bun run capture:cluster`** — Expected: all pass, `left 0`, flags restored.
- [ ] **Step 2: Interrupted-run check (Review Focus 2)** — start `bun run capture:cluster`, stop it with Ctrl-C twice during a guide, then `bun run capture:cleanup-demo`. Expected: `left 0`; in the app as the cluster admin, ZEBRA's Users page shows no `Manual Demo` user and the seat count is back to before.
- [ ] **Step 3: Write the guide pages**
- [ ] **Step 4: Full run** — `bun run capture` (both apps) then `bun run check`. Expected: all pass.
- [ ] **Step 5: README** — Cluster Admin site section (accounts needed, `capture:cluster`, what it changes in ZEBRA and how cleanup undoes it).
- [ ] **Step 6: `trail check`, commit** — `docs(cluster-admin): คู่มือทีละขั้น 5 เรื่อง + README`
