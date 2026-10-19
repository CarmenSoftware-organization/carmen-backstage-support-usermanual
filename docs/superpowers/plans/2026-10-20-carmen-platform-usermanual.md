# Carmen Platform User Manual Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A bilingual (TH/EN) VitePress user-manual site for carmen-platform superadmins, with re-runnable Playwright screenshot capture against DEV.

**Architecture:** VitePress site in `site/` (Thai = root locale, English under `site/en/`), one sidebar with two groups (How-to Guides, Screen Reference) plus Getting Started. Screenshots come from a Playwright harness in `capture/` that logs in to DEV, temporarily enables feature flags (restoring them afterwards), shoots every screen once per UI language, and runs scripted write-flows with `MANUAL-DEMO-` data for the guides. Static check scripts enforce TH/EN parity, existing images, and plain language.

**Tech Stack:** Bun, VitePress 1.6.3, @playwright/test ^1.58, TypeScript ^5.9.

**Spec:** `docs/superpowers/specs/2026-10-20-carmen-platform-usermanual-design.md` — read it before any task.

## Global Constraints

- Readers are superadmin operators, not developers. **Anti-goal: technical/hard language.** No table names, API paths, permission keys, JSON or code unless the screen itself shows them (then explain in plain words).
- Use the exact on-screen label in each language (TH from `carmen-platform/src/i18n/th.ts`, EN from `en.ts`); **if DEV shows something different, DEV wins**. First use of a domain term on a page gets a plain explanation in parentheses, e.g. `หน่วยธุรกิจ (Business Unit — โรงแรมหรือสาขาหนึ่งแห่ง)`.
- TH and EN have the same pages, page for page, same slugs.
- Version described = what DEV shows: `http://dev.blueledgers.com:9902` (API `https://dev.blueledgers.com:4001`).
- Demo records use prefix `MANUAL-DEMO-`. Feature flags must be restored to their original state after every capture run, including failed runs.
- Out of scope: Cluster Admin portal (`/cluster-admin/*`), developer content, hosting.
- No secrets committed: credentials stay in `carmen-platform-e2e/.env` (or this repo's gitignored `.env`); `.auth/` and `.capture-state/` are gitignored. Mask app secrets, DB connection strings, SMTP passwords in screenshots.
- Per user preference: **no `*.spec.ts`/unit-test files for the site or scripts**. Playwright files under `capture/` are capture tooling, not tests. Verification = `bun run check` (type-check + static checks + VitePress build) and manual review in the browser.
- Sources of truth for behavior: `carmen-platform/src/App.tsx`, `src/components/nav/platformNav.ts`, `src/pages/**`, `src/i18n/*.ts`, and the live DEV app. Do **not** trust `carmen-platform/SITEMAP.md` or the role table in `docs/OVERVIEW.md`. carmen-wiki `en|th/platform/` may be mined for facts but must be rewritten in plain language.

## Review Focus

1. **Crashed or interrupted capture run leaves DEV flags enabled** → globalTeardown restores; and if `.capture-state/flags-original.json` already exists at start, setup must abort (never overwrite the true original with an all-active snapshot) and tell the user to run `bun run capture:restore-flags`. Owned by Task 2.
2. **Leftover `MANUAL-DEMO-` records from an earlier run** → names include a run stamp so they never collide; teardown deletes every prefixed user/BU/cluster it can, not only this run's. Owned by Task 3.
3. **Secrets visible in screenshots** (Applications app secret, Business Unit DB connection, Database Pools, Email Settings SMTP password) → those shots declare `mask` selectors; reviewer opens each such PNG. Owned by Tasks 2 and 3.
4. **Shot taken of the wrong screen** (Access Denied, Coming soon, 404, still-loading skeleton) → `shoot()` fails the shot instead of saving it. Owned by Task 2.
5. **TH/EN drift or broken image links** after later edits → `check:parity` fails when a page or referenced image exists in one language only or is missing. Owned by Task 1.

---

## File Structure

```
carmen-platform-usermanual/
├── package.json, tsconfig.json, .gitignore, .env.example, README.md
├── docs/style-guide.md                  # writing rules + page templates (every content task follows it)
├── scripts/
│   ├── check-parity.ts                  # TH/EN page parity + referenced images exist
│   └── check-plain-language.ts          # banned technical terms in site/**/*.md
├── capture/
│   ├── playwright.config.ts
│   ├── env.ts                           # loads credentials/URLs
│   ├── api.ts                           # authenticated fetch to DEV API
│   ├── flags.ts                         # snapshot / enable / restore feature flags (+ CLI)
│   ├── global-setup.ts / global-teardown.ts
│   ├── fixtures.ts                      # `lang` option + shoot()
│   ├── screens.manifest.ts / screens.capture.ts   # read-only screen shots
│   ├── demo-data.ts                     # MANUAL-DEMO names + cleanup
│   └── guides/{setup-hotel,add-user,manage-license}.capture.ts
└── site/
    ├── .vitepress/config.mts            # locales, sidebars, search
    ├── public/screenshots/{th,en}/<slug>.png
    ├── index.md, getting-started/, guides/, screens/<group>/<page>.md, glossary.md      # Thai (root)
    └── en/ …same tree…                                                                   # English
```

Page slugs (identical in TH and EN):
- `getting-started/{login,main-screen,common-actions}.md`, `glossary.md`
- `guides/{setup-hotel,add-user,manage-license}.md`
- `screens/dashboard.md`, `screens/profile.md`
- `screens/organization/{clusters,business-units,tenant-migrations,tenant-seeds,data-import,users}.md`
- `screens/license/{licenses,license-feature-groups,license-features}.md`
- `screens/content/{report-templates,form-groups,dashboard-templates,news,broadcasts}.md`
- `screens/analytics/{usage-analytics,activity-events}.md`
- `screens/scheduling/scheduled-jobs.md`
- `screens/platform/{platform-config,email-settings,applications,platform-roles,platform-users,super-admins,feature-flags}.md`
- `screens/database/{platform-migrations,sql-workbench,database-pools}.md`

Sidebar order of Screen Reference must match the real sidebar in `carmen-platform/src/components/nav/platformNav.ts` (re-check it; reorder the list above if DEV differs).

---

### Task 1: Site scaffold, style guide, static checks

**Files:**
- Create: `package.json`, `tsconfig.json`, `.gitignore`, `README.md`, `docs/style-guide.md`, `scripts/check-parity.ts`, `scripts/check-plain-language.ts`, `site/.vitepress/config.mts`, every page slug above as a stub in `site/` and `site/en/`, `site/index.md`, `site/en/index.md`

**Interfaces:**
- Produces: `package.json` scripts `docs:dev`, `docs:build`, `docs:preview`, `typecheck` (`tsc --noEmit`), `check:parity`, `check:plain`, `check` (= typecheck && check:parity && check:plain && docs:build). Image path convention `/screenshots/<lang>/<slug>.png` referenced from markdown as `![...](/screenshots/th/clusters-list.png)`.

- [ ] **Step 1:** `git init -b main` in this folder. `.gitignore`: `node_modules/`, `site/.vitepress/dist/`, `site/.vitepress/cache/`, `.auth/`, `.capture-state/`, `capture/results/`, `.env`, `.superpowers/`, `/graft/`.
- [ ] **Step 2:** `bun add -d vitepress@1.6.3 @playwright/test@^1.58.2 typescript@^5.9.3 @types/node@^20`.
- [ ] **Step 3: `site/.vitepress/config.mts`** — `locales`: `root` = `{ label: 'ไทย', lang: 'th-TH' }`, `en` = `{ label: 'English', lang: 'en-US', link: '/en/' }`; site title `Carmen Platform คู่มือการใช้งาน` / `Carmen Platform User Manual`; `themeConfig.search.provider = 'local'`; per-locale sidebar with three groups in order: Getting Started (`เริ่มต้นใช้งาน`), How-to Guides (`ขั้นตอนการทำงาน`), Screen Reference (`คู่มือรายหน้าจอ`, nested by sidebar group using the on-screen group labels: TH `องค์กร`, `จัดการใบอนุญาต`, `เนื้อหา`, `การวิเคราะห์`, `งานตามเวลา`, `Platform`, `ฐานข้อมูล`). Item labels = on-screen menu labels. Keep `ignoreDeadLinks` **off** so the build catches dead links.
- [ ] **Step 4: Stub pages** — every slug, both languages, with an H1 (on-screen label) and the page template headings from the style guide, so the sidebar and build work end to end. Home page (`index.md`) uses VitePress `layout: home` with three cards: Getting Started, How-to Guides, Screen Reference.
- [ ] **Step 5: `docs/style-guide.md`** — copy the spec's anti-goal, terminology rule and both page templates verbatim; add: second person, short sentences, one action per numbered step, bold for on-screen labels (`กดปุ่ม **บันทึก**`), cautions as VitePress `::: warning` blocks, link generic behavior to `getting-started/common-actions` instead of re-explaining, a table of plain replacements (`soft delete` → "ลบแบบกู้คืนได้ / can be restored", `hard delete` → "ลบถาวร / delete permanently", `tenant` → "ฐานข้อมูลของโรงแรมแต่ละแห่ง" on first use, `migration` → "อัปเดตโครงสร้างฐานข้อมูล", `seed` → "ข้อมูลตั้งต้น").
- [ ] **Step 6: `scripts/check-parity.ts`** — walk `site/**/*.md` excluding `site/en/` and `site/.vitepress/`; for each, require `site/en/<same path>` and vice versa; for every `/screenshots/<lang>/<file>.png` reference, require `site/public/screenshots/<lang>/<file>.png` to exist and the `<lang>` to match the page's language (`th` under root, `en` under `/en/`). Print every violation; exit 1 if any.
- [ ] **Step 7: `scripts/check-plain-language.ts`** — scan `site/**/*.md` (prose only: skip fenced code blocks) for banned patterns, case-insensitive: `\btb_\w+`, `/api(-system)?/`, `soft[- ]delete`, `hard[- ]delete`, `\bendpoint\b`, `\bpayload\b`, `\bJSON\b`, `\bschema\b`, `\bJWT\b`, permission keys `\b[a-z_]+\.(read|create|update|delete|manage|apply)\b`. Allow-list per line with an HTML comment `<!-- plain-ok -->` for cases where the screen itself shows the term. Exit 1 on hits, printing file:line.
- [ ] **Step 8: Verify** — `bun run check` → typecheck passes, both checks print 0 violations, `docs:build` succeeds. `bun run docs:dev` and confirm in the browser: TH home, language switch to EN keeps the same page, sidebar groups render, search box works.
- [ ] **Step 9: Commit** — `git add -A && git commit -m "feat: scaffold bilingual VitePress manual with parity and plain-language checks"`.

### Task 2: Capture harness + read-only screen shots

**Files:**
- Create: `capture/playwright.config.ts`, `capture/env.ts`, `capture/api.ts`, `capture/flags.ts`, `capture/global-setup.ts`, `capture/global-teardown.ts`, `capture/fixtures.ts`, `capture/screens.manifest.ts`, `capture/screens.capture.ts`, `.env.example`
- Modify: `package.json` (scripts), `README.md` (how to run capture)

**Interfaces:**
- Produces:
  - `env.ts`: `export const CAPTURE: { baseUrl: string; apiBase: string; appId: string; email: string; password: string }`. Loads this repo's `.env` first, then `CAPTURE_ENV_FILE ?? '../carmen-platform-e2e/.env'` for `TEST_USER_EMAIL`/`TEST_USER_PASSWORD` (existing env vars win; reuse the parse approach of `carmen-platform-e2e/scripts/lib/parse-env.mjs`, copied, not imported). Defaults: `CAPTURE_BASE_URL=http://dev.blueledgers.com:9902`, `CAPTURE_API_BASE=https://dev.blueledgers.com:4001`; `CAPTURE_APP_ID` required (value = `REACT_APP_API_APP_ID` in `carmen-platform/.env.dev`; `.env.example` says where to copy it from). Throw a clear error naming the missing key.
  - `api.ts`: `readToken(): string` (reads `localStorage` item `token` for origin `CAPTURE.baseUrl` from `.auth/state.json`); `api<T>(method: 'GET'|'PUT'|'POST'|'DELETE'|'PATCH', path: string, body?: unknown): Promise<T>` — sends `Authorization: Bearer <token>` and `x-app-id: CAPTURE.appId`, unwraps `res.data?.data ?? res.data` like the platform's services, throws on non-2xx with status + path.
  - `flags.ts`: `type FeatureState = 'active'|'inactive'|'hide'`; `snapshotAndEnableFlags(): Promise<void>`; `restoreFlags(): Promise<void>`; run as CLI (`bun capture/flags.ts restore`) → `restoreFlags()`. Endpoint `GET/PUT /api-system/platform/feature-flags`, PUT body `{ value: <full map> }` (PUT replaces the whole map — always send every key).
  - `fixtures.ts`: `test` extended with option `lang: 'th'|'en'`; an auto fixture that runs `page.addInitScript` setting `localStorage.lang = lang` and `localStorage.theme = 'light'`; `shoot(page: Page, slug: string, opts?: { mask?: string[]; fullPage?: boolean }): Promise<void>` saving to `site/public/screenshots/<lang>/<slug>.png`.
  - Manifest entry: `type Shot = { slug: string; path: string; mask?: string[]; openFirstRow?: boolean; rowSelector?: string; prepare?: (page: Page) => Promise<void> }`; `export const SHOTS: Shot[]`.
  - Playwright projects `screens-th` / `screens-en` (`lang` option, `testMatch: /screens\.capture\.ts/`), `guides-th` / `guides-en` (`testMatch: /guides\/.*\.capture\.ts/`, used by Task 3). `workers: 1`, `fullyParallel: false`, viewport 1440×900, `ignoreHTTPSErrors: true`, `storageState: '.auth/state.json'`, `outputDir: 'capture/results'`.
  - package.json: `capture:screens` (projects screens-th + screens-en), `capture:guides` (guides-th + guides-en), `capture` (all four), `capture:restore-flags`.

- [ ] **Step 1: global-setup** — log in like `carmen-platform-e2e/global-setup.ts` (`/login`, `input[name="username"]`, `input[name="password"]`, submit, wait for `**/dashboard`), save `.auth/state.json`; then `snapshotAndEnableFlags()`.
- [ ] **Step 2: flags.ts** — `snapshotAndEnableFlags`: if `.capture-state/flags-original.json` exists → throw `"Flags from a previous run were not restored. Run: bun run capture:restore-flags"` (Review Focus 1). Otherwise GET the map, write it to that file (pretty JSON, also log it), then PUT a copy with every non-`active` value set to `active`. `restoreFlags`: read the file, PUT it back exactly, GET again and verify equal, then delete the file. Absent keys mean "default active" in the frontend, so do not add keys.
- [ ] **Step 3: global-teardown** — `restoreFlags()` (if the file exists); log result. Playwright runs globalTeardown after failed tests too; note in README that a killed process (Ctrl-C twice / crash) needs `bun run capture:restore-flags`.
- [ ] **Step 4: `shoot()`** — before saving: wait for network idle and for no element matching skeleton/spinner (`[data-slot="skeleton"], .animate-pulse, [aria-busy="true"]`) to be visible (timeout 15s); then fail (throw, do not save) if the page shows Access Denied (`/403` URL or the i18n text from `carmen-platform/src/pages` 403 page), Coming soon (the `inactive` feature page text), or 404 (Review Focus 4). Pass `mask` selectors to `page.screenshot` (Review Focus 3).
- [ ] **Step 5: manifest** — one or more shots per Screen Reference page: list screen (`<page>-list`), create/edit form where one exists (`<page>-form`; open `/…/new`, or first row for edit-only pages), and key detail tabs/dialogs named in the spec's survey (e.g. `clusters-detail`, `business-units-form`, `email-settings-test-dialog`, `feature-flags-list`, `sql-workbench`). Use the routes from `carmen-platform/src/App.tsx`. Masks required on: Applications form (app secret field), Business Units DB-connection section, Database Pools form, Email Settings (password field). Add `getting-started` shots: `login` (logged-out context: `test.use({ storageState: { cookies: [], origins: [] } })` for that one), `main-screen` (dashboard with sidebar), `sidebar-collapsed`, `profile-menu-open`, `list-filter-panel` (Users page with filter panel open), `form-view-mode`, `form-edit-mode`, `keyboard-shortcuts` (press `?`).
- [ ] **Step 6: `screens.capture.ts`** — one Playwright `test` per `Shot` (title = slug) so one bad screen does not hide the rest.
- [ ] **Step 7: Verify (needs the user's DEV Super Admin in `carmen-platform-e2e/.env`; if missing, stop and ask)** — `bun run capture:screens`; expect PNGs in `site/public/screenshots/th/` and `/en/` with identical file lists; open several in each language and confirm the UI language matches the folder; open every masked shot and confirm the secret is covered; confirm `.capture-state/flags-original.json` is gone after the run and a GET of flags equals the logged original. `bun run typecheck` passes.
- [ ] **Step 8: Commit** — code + screenshots: `git commit -m "feat: add DEV screenshot capture with flag snapshot/restore"`.

### Task 3: Guide capture flows (writes to DEV)

**Files:**
- Create: `capture/demo-data.ts`, `capture/guides/setup-hotel.capture.ts`, `capture/guides/add-user.capture.ts`, `capture/guides/manage-license.capture.ts`
- Modify: `capture/global-teardown.ts` (call cleanup before restoring flags)

**Interfaces:**
- Consumes: `CAPTURE`, `api()`, `shoot()`, `lang` option, projects `guides-th`/`guides-en` from Task 2.
- Produces: `DEMO_PREFIX = 'MANUAL-DEMO'`; `demoName(kind: string): string` → `` `MANUAL-DEMO-${kind}-${lang}-${yyyyMMddHHmm}` ``; `cleanupDemoData(): Promise<{ deleted: string[]; left: string[] }>`. Screenshot slugs `guide-<guide>-<NN>-<step>` (e.g. `guide-setup-hotel-03-bu-form-filled`).

- [ ] **Step 1: Flows** — drive the real UI (find selectors in `carmen-platform/src/pages/**`; `carmen-platform-e2e/pages/*.ts` page objects are a good reference). Shoot before and after each meaningful action: empty form, filled form, confirm dialog, success state, resulting list row.
  - `setup-hotel`: create Cluster → create Business Unit in it → assign license to it → add a user to the BU.
  - `add-user`: create user → set role/status → assign to BU → reset password dialog.
  - `manage-license`: license center for the demo cluster → new subscription → seats → BU quota → interface → License Feature Group duplicate.
  - Each guide file uses `test.describe.serial` and creates its own demo records (TH and EN runs create separate records via `lang` in the name).
  - **Guardrail:** if creating a Business Unit on DEV requires provisioning a new database or running a tenant migration that cannot be undone, stop and ask the user before running it (choose an existing Database Pool / connection when the form offers one).
- [ ] **Step 2: `cleanupDemoData()`** — via `api()` (endpoints from `carmen-platform/src/services/{userService,businessUnitService,clusterService}.ts`): list and delete every user, BU and cluster whose name/email starts with `MANUAL-DEMO` (Review Focus 2), children first (users → BUs → clusters). Records that cannot be deleted (licenses/subscriptions) go into `left`. Log both lists. Call it in global-teardown **before** `restoreFlags()`, wrapped so a cleanup failure still restores flags.
- [ ] **Step 3: Verify** — `bun run capture:guides`; confirm each guide's PNG sequence in both languages reads as a story; confirm in DEV UI that no `MANUAL-DEMO` users/BUs/clusters remain except those reported in `left`; flags restored. Run it a second time to confirm leftovers don't break it. `bun run typecheck` passes.
- [ ] **Step 4: Commit** — `git commit -m "feat: add guide capture flows with MANUAL-DEMO data and cleanup"`.

### Tasks 4–9: Content (one task each; same procedure)

Each content task writes the listed pages **in Thai and English**, following `docs/style-guide.md` and its templates, using only screenshots that exist in `site/public/screenshots/<lang>/` (re-run `bun run capture:screens` or add a manifest entry from Task 2's pattern if a needed shot is missing). Facts come from the code and the live DEV app, read as an operator would see them; write the Thai page first, then the English one with the same structure, slugs and images (`en` folder).

Procedure per page:
- [ ] Read the screen's page component(s) in `carmen-platform/src/pages/**`, its i18n keys in `th.ts`/`en.ts`, and click through it on DEV.
- [ ] Write TH page, then EN page.
- [ ] Every create/edit page: "Fields explained" table covers every field on the form with plain meaning; mark required fields.
- [ ] Irreversible actions (permanent delete, migrations apply/deploy, seed, import confirm, SQL execute, Super Admin grant/revoke, feature flag hide) get a `::: warning` caution.
- [ ] Cross-link: each Screen Reference page ↔ the guides that use it.

Task verification: `bun run check` passes (0 parity, 0 plain-language violations, build OK); open the pages in `bun run docs:dev` in both languages and read them once as a non-technical superadmin. Commit per task: `git commit -m "docs: <task title>"`.

- **Task 4: Getting Started + Glossary** — `getting-started/login` (username/email + password; Google sign-in when it is shown; what "no access" messages mean), `main-screen` (sidebar groups, collapse, profile menu, TH/EN switch, dark mode, `?` shortcuts), `common-actions` (search, filter panel, CSV export, row actions, bulk select, view vs edit mode, Save/Cancel, unsaved-changes warning, activity trail, Access Denied and Coming soon screens), `glossary.md` (table: term — TH label — EN label — plain meaning; every domain term the other pages use; also both forms where the Thai UI is inconsistent, e.g. `ไลเซนส์` / `ใบอนุญาต`). Do this task first: later pages link here.
- **Task 5: How-to Guides** — `guides/setup-hotel`, `guides/add-user`, `guides/manage-license` using Task 3's screenshot sequences and the guide template (outcome, who/prerequisites, numbered steps, how to check it worked, troubleshooting, related screens).
- **Task 6: Screen Reference — Dashboard, Organization, Profile** — `screens/dashboard`, `screens/profile`, `screens/organization/*` (6 pages).
- **Task 7: Screen Reference — License Management + Content** — `screens/license/*` (3), `screens/content/*` (5). Report Templates: explain the XML editors only to the level of "what you can change and how to preview/restore a version"; the XML itself is shown on screen so it may be named (`<!-- plain-ok -->`).
- **Task 8: Screen Reference — Analytics, Scheduling, Platform** — `screens/analytics/*` (2), `screens/scheduling/scheduled-jobs` (explain the schedule field with 3–4 plain examples like "every day at 02:00"), `screens/platform/*` (7). Super Admins and Feature Flags pages state that only super admins see them.
- **Task 9: Screen Reference — Database** — `screens/database/*` (3). Plain explanations of what each tool is for and when an operator would use it; strong cautions; SQL Workbench page may name SQL (`<!-- plain-ok -->`) since the screen is a SQL editor.

### Task 10: Final pass

**Files:**
- Modify: `README.md`, any page failing the checks below

- [ ] **Step 1:** Confirm Screen Reference sidebar order and labels match the live DEV sidebar in both languages (screenshot `main-screen` vs config).
- [ ] **Step 2:** `bun run capture` (full run) then `bun run check` → all green; flags restored; demo leftovers listed.
- [ ] **Step 3:** README: what this is, `bun install`, `bun run docs:dev`, how to refresh screenshots (needs `carmen-platform-e2e/.env` + `CAPTURE_APP_ID`), what to do after a crashed capture (`bun run capture:restore-flags`), how to add a page in both languages, the style guide link.
- [ ] **Step 4:** Commit `git commit -m "docs: final pass and README"`. Hand the user `bun run docs:dev` URL for review.
