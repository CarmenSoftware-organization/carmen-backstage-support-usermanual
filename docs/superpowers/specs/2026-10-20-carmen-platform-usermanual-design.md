# Carmen Platform User Manual — Design

Date: 2026-10-20
Status: Draft (awaiting approval)

## Intent

Build a standalone bilingual (Thai / English) user-manual website for **carmen-platform**, the admin web app of Carmen Software's multi-tenant hotel/inventory system. The readers are **superadmins who use the system day to day** — operators, not developers.

Existing documentation (`carmen-wiki/en|th/platform/`, `carmen-platform/docs/ui/`) is written for developers and QA (table names, permission keys, data models). Nothing today tells an operator, in plain language, how to get a job done. This manual fills that gap.

## Goals

1. A superadmin can complete the three most common jobs end to end by following the manual alone.
2. A superadmin can open any screen in the sidebar and find a page explaining what it does and what each field means.
3. Thai and English versions with equal coverage.

## Non-goals

- Developer/QA content: data models, API endpoints, DB tables, permission keys, test scenarios (that stays in carmen-wiki).
- The **Cluster Admin portal** (`/cluster-admin/*`) — it serves a different user type. *(Builder's call recorded by the designer; the user did not object.)*
- Embedding help inside carmen-platform itself.
- Deciding hosting/deploy now — the site must build and run locally; where it is hosted is decided later.

## Anti-goal (the failure the user named)

**Language that is hard to understand or too technical.** A manual that is accurate on every page but reads like developer docs has failed. Concretely:

- Describe what the user sees and what happens, not how it works underneath. E.g. "deleted items can be restored" instead of "soft delete"; "the change takes effect immediately for all hotels in this cluster" instead of "propagates to tenant schemas".
- No table names, API paths, permission keys, JSON, or code — unless the screen itself shows them (e.g. SQL Workbench, cron schedule field), in which case explain them in plain words.
- Short sentences, numbered steps, one action per step.

## Terminology rule (agreed)

- Use the **exact label shown on screen** in that language. The Thai manual uses the Thai UI labels (from `carmen-platform/src/i18n/th.ts` — e.g. `หน่วยธุรกิจ`, `ไลเซนส์`, `ผู้ใช้งาน`; some stay English on screen, e.g. `Clusters`, `Tenant Migrations`, `SQL Workbench`). The English manual uses `src/i18n/en.ts`.
- On a term's **first appearance on a page**, add a plain-language explanation in parentheses, e.g. "หน่วยธุรกิจ (Business Unit — โรงแรมหรือสาขาหนึ่งแห่ง)".
- A **Glossary** page in each language lists every domain term (Cluster, Business Unit, License, Feature Group, Tenant, Migration, Seed Data, Broadcast, Platform Role, Super Admin, Feature Flag, Database Pool, …) with the TH label, EN label and a one-line plain explanation.
- Note: the Thai UI is itself inconsistent in places (e.g. sidebar item `ไลเซนส์` under group `จัดการใบอนุญาต`). The manual follows the screen as-is and the glossary links both forms.

## Structure (agreed: layout "B")

One left sidebar, two groups, plus a language switcher (TH / EN) and search in the top bar.

```
เริ่มต้นใช้งาน / Getting Started
  - เข้าสู่ระบบ (email/username + password; Google sign-in if enabled)
  - รู้จักหน้าจอหลัก (sidebar, collapse, profile menu, language, dark mode, keyboard shortcuts "?")
  - การใช้งานทั่วไป: list pages (search, filter panel, CSV export, row actions),
    form pages (view vs edit mode, Save/Cancel, unsaved-changes warning, activity trail),
    "Access Denied" and "Coming soon" screens
  - อภิธานศัพท์ / Glossary

ขั้นตอนการทำงาน / How-to Guides
  - ตั้งค่าโรงแรมใหม่ (Cluster → Business Unit → License → users)
  - เพิ่มผู้ใช้ (create user, assign to BU/cluster, set role/status, reset password)
  - จัดการ License (license center, subscriptions, buy seats / BU quota / interface, feature groups)

คู่มือรายหน้าจอ / Screen Reference   (mirrors the real sidebar order)
  - Dashboard
  - Organization: Clusters, Business Units, Tenant Migrations, Tenant Seed Data, Data Import, Users
  - License Management: Licenses, License Feature Groups, License Features
  - Content: Report Templates, Form Groups, Dashboard Templates, News, Broadcasts
  - Analytics: Usage Analytics, Activity Events
  - Scheduling: Scheduled Jobs
  - Platform: Platform Config, Email Settings, Applications, Platform Roles, Platform Users,
              Super Admins, Feature Flags
  - Database: Platform Migrations, SQL Workbench, Database Pools
  - Profile (avatar menu)
```

Scope: **every sidebar menu item** (user decision), including technical ones (Database, Tenant Migrations). Sub-pages/dialogs of a menu item (detail tabs, create/edit forms, key dialogs) are covered inside that item's page rather than as separate sidebar entries.

### Screen Reference page template

1. Where to find it (menu path) + one-paragraph "what this screen is for"
2. Screenshot of the main screen
3. What you can do here (bullet list of actions)
4. Fields explained (table: field — what it means — example/notes), for create/edit forms
5. Common tasks on this screen (short numbered steps), incl. key dialogs
6. Cautions (anything irreversible: hard delete, migrations, deploy/apply, SQL)
7. Related guides (links into How-to Guides)

Generic behavior (search, filters, CSV, view/edit mode) is explained once in Getting Started and linked, not repeated.

### How-to Guide template

1. What you'll accomplish + who can do it + what you need beforehand
2. Numbered steps, each with one action and a screenshot where the screen changes
3. How to check it worked
4. Troubleshooting (common errors/messages in plain words)
5. Links to the Screen Reference pages used

## Technical approach

- **Site generator: VitePress** *(designer's call — user had no preference)*. Markdown content, built-in local search, dark mode, i18n locales (`/th/` and `/en/`; **Thai is the default/root locale** — designer's call, since the readers are Thai operators; builder may flip if trivial).
- Lives in this folder: `carmen-platform-usermanual/`. Must `build` to static files and run locally with a dev server.
- **Screenshots** *(designer's call)*: reuse the Playwright setup in `carmen-platform-e2e` (saved login session, `tests/wiki-screenshots/` capture pattern, Access-Denied/Coming-Soon detection). Capture against **DEV** (`http://dev.blueledgers.com:9902`) logged in as a superadmin so every menu is visible. Capture each screen **twice — UI in Thai for the Thai manual, UI in English for the English manual**. Capture must be re-runnable so screenshots can be refreshed when the UI changes. Credentials come from `carmen-platform-e2e/.env`; never commit them.
### Capture decisions (user-answered)

- **Version described = what DEV shows.** The live DEV app (`dev.blueledgers.com:9902`, auto-deployed from `main`) is the source of truth for screens and on-screen labels. `src/i18n/*.ts` on `main` is a helper for exact wording; if it disagrees with DEV, DEV wins. The manual may be ahead of `prod`; that is accepted.
- **Writes to DEV are allowed** for the How-to Guide screenshots (filled forms, confirmations, results). Every record created uses an obvious test name with a shared prefix (designer's call: `MANUAL-DEMO-…`). The script tears down what it can afterwards; records that cannot be deleted (e.g. license purchases) are left, clearly named. A re-run must cope with leftovers from a previous run (reuse or suffix).
- **Feature flags:** before capturing, the script records the current state of every flag on DEV, turns on any flag needed so every sidebar screen is reachable, captures, then **restores every flag to its original state** — including when the run fails partway (restore in a `finally`/teardown). The original states are logged so they can be restored by hand if needed.
- **Account:** a DEV Super Admin account already exists; the user puts its credentials in `carmen-platform-e2e/.env` (`TEST_USER_EMAIL` / `TEST_USER_PASSWORD`). That file currently targets `localhost:3304`, so the capture run must point at DEV (`E2E_NO_WEBSERVER=1`, `E2E_BASE_URL=http://dev.blueledgers.com:9902`) or use its own config.
- The existing `tests/wiki-screenshots/` capture is read-only; the guide captures need new scripted flows that actually fill and submit forms. Screen Reference shots can extend the existing read-only pattern.

- Source of truth for content: the carmen-platform code (`src/App.tsx`, `src/components/nav/platformNav.ts`, `src/pages/**`, `src/i18n/*.ts`) and the running DEV app. carmen-wiki and `docs/ui/` may be mined for facts but **must be rewritten** into plain language. Do not trust `carmen-platform/SITEMAP.md` or the role table in `docs/OVERVIEW.md` — they are stale.

## Constraints

- Plain language over completeness of internals (see anti-goal).
- TH and EN coverage must match page-for-page.
- No secrets in the repo (test credentials, saved sessions like `.auth/user.json`).
- DEV data appears in screenshots; avoid capturing anything that looks like real customer data or secrets (e.g. app secrets, DB connection strings — blur or use placeholders).

## Left to the builder

- VitePress theme details, colors, logo placement.
- Exact file/folder naming inside the site.
- Whether the capture script lives in this repo or as a new project inside `carmen-platform-e2e`.
- Order of writing (suggest: Getting Started + Glossary → 3 guides → Screen Reference by sidebar group).
- How to annotate screenshots (arrows/numbered callouts) if at all.
- Hosting/deploy (deferred).
- Initialising this folder as a git repo (it is not one yet) and adding `.superpowers/` to `.gitignore`.

## Side note (not part of this project)

`carmen-platform-e2e/helpers/auth.ts` and its `README.md` contain plaintext fallback test credentials — worth moving to `.env` separately.
