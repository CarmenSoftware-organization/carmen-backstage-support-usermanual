# Manual refresh + Cluster Admin manual — design

Date: 2026-10-28 · Status: draft for approval (builder check done)

## Intent and why

The Carmen Blue Backstage app (`../carmen-backstage`, `origin/main`) has moved on a lot since the manual
was written (baseline commit `5b8c3b28`, 2026-10-19 → 172 commits, 229 files under `src/` changed).
The manual no longer matches the screens. At the same time, hotel-group staff who administer their own
cluster (the **Cluster Admin** view) have no manual at all, and support keeps getting the same
questions from them.

Two deliverables:

1. **Support manual (existing site, `site/`)** — readers: our support team. Bring every page, label,
   route and screenshot back in line with the current app.
2. **Cluster Admin manual (new, separate site)** — readers: hotel-group staff with cluster-admin rights
   on their own cluster. A self-contained site of their own.

## Goals

- Every page of the support manual matches the current app (labels, menu structure, routes, screenshots), TH + EN.
- A new Cluster Admin site, TH + EN, covering every Cluster Admin screen and the five tasks support is asked about most.
- Both sites pass the existing quality checks (TH/EN parity, plain language, anchors, build).

## Non-goals

- Choosing a host or deploying either site (still open from the previous round).
- Changing the app itself.

## Anti-goals

- **Support-only content reaching hotel-group readers.** The Cluster Admin site must not contain or link to Backstage pages (SQL Workbench, Super Admins, Database Pools, …), and its screenshots must not show other customers' hotel or cluster names.
- Language that is hard to understand or too technical (the existing anti-goal in `docs/style-guide.md`) — even stricter for the Cluster Admin site, whose readers are not technical.
- Promising hotel-group readers they can do something the app does not let them do.

## Part 0 — Repo becomes a Turborepo (the user decided)

Why (the user's words): so each site can be **built and deployed separately, clearly**.

Layout (folder names are my call):

```
apps/
  support/        ← support manual (moved from site/ with git mv, history kept)
  cluster-admin/  ← new Cluster Admin manual
packages/
  capture/        ← shared Playwright capture harness (moved from capture/)
  checks/         ← shared check scripts (moved from scripts/): parity, plain language, anchors
  theme/          ← shared VitePress theme bits, only if both sites really share them
docs/             ← stays at the root (style guide, specs, plans)
```

- Package manager stays **bun** (workspaces); add `turbo` with tasks `build`, `check`, `dev`, `typecheck`. `turbo run build --filter=support` (or `cluster-admin`) builds one site alone, into that app's own output folder, so each can later become its own hosting project. Deploy itself stays out of scope.
- Each app owns its screenshots (`apps/<app>/public/screenshots/{th,en}/`) and its capture Playwright projects; `packages/capture` holds the shared login, flags, demo-data and API code. Capture is **not** a cached turbo task (it changes DEV) — run it explicitly per app.
- `.env` stays at the repo root and is read by `packages/capture` as today; `.auth/`, `.capture-state/` likewise.
- Do the move first, as its own commit(s), and prove nothing changed for the support site (same `check` result, same built pages) before any content edits.
- README rewritten for the new commands.

## Part 1 — Support manual refresh (`apps/support`, formerly `site/`)

Changes found in the app since the baseline (from `git log` / `git diff 5b8c3b28 origin/main` in `carmen-backstage`):

| Change in the app | Manual impact |
|---|---|
| Sidebar group **Platform → Backstage**; items renamed (Platform Config → Backstage Config, Platform Roles → Backstage Roles, Platform Users → User Backstage, Platform Migrations → Backstage Migrations); routes `/platform/*` → `/backstage/*` (`user-platform` → `user-backstage`) | Rename labels on those pages, glossary, main-screen; update `capture/screens.manifest.ts` paths. Decide page slugs (see "left to the builder"). |
| License **Feature Groups → Modules**, old "module" → **Feature area**; route `/license-feature-groups` → `/license-modules` | Update licence pages, glossary, manage-license guide; manifest paths. |
| New page **AI → Purchase Request AI Providers** (`/purchase-request-ai-providers`, new sidebar group AI) | New Screen Reference page TH+EN + nav entry + capture shot(s). |
| Tenant Migrations, Tenant Seeds, Data Import now nested under **Business Units** in the sidebar | Rewrite the menu table in Getting Started → main screen; menu paths on those three pages. |
| Cluster edit / BU edit: **Notes** tab (notes, attachments, deleted notes restore, history); BU licences split into sub-tabs **Seats \| Features \| Interface**; seat management from the Users tab; BU **People** tab renamed **Users** and moved last | Update Clusters and Business Units pages (+ shots). |
| Licences: **Days Left** column (sortable), **Expiring soon** filter and count card on seat / BU quota / interface / subscription tabs; feature-group column on subscriptions | Update Licenses page + manage-license guide. |
| Report Templates: **Export XML** tab, run/export switches (`allow_run` / `allow_export`) | Update Report Templates page. |
| Sign-in returns you to the page you asked for (`?next=`) | One line on the Login page. |
| Branding: login page and app name now Carmen Blue Backstage | Re-shoot login; check wording. |

The builder must also re-run a fresh diff of `carmen-backstage` (`src/App.tsx` routes, `src/components/nav/backstageNav.ts`, `src/i18n/th.ts` / `en.ts`) at build time, because the app keeps changing; the table above is a starting list, not the full truth.

All screenshots are re-captured (the sidebar appears in nearly every shot). The README's reference to `platformNav.ts` becomes `backstageNav.ts`.

Page slugs/files are renamed to match the new names (e.g. `platform-roles.md` → `backstage-roles.md`, `license-feature-groups.md` → `license-modules.md`, screenshot names likewise), with every internal link fixed. No redirects: the site has never been deployed, so no one holds old links (my call).

## Part 2 — Cluster Admin manual (new site)

### Site setup

- The `apps/cluster-admin` app (Part 0): VitePress, Thai root, English under `en/`, same pattern as the support site.
- Uses `packages/capture`, `packages/checks` and the style guide; builds separately so no support page can leak in. `turbo run check` covers both apps.
- Branding/title: "Carmen Blue — Cluster Admin manual" (exact title: builder's call, matching the app's wording for this view).

### Readers and tone

Hotel-group staff, not technical, who never see the Backstage side. Style guide rules apply, plus:

- No links to, or mentions of, Backstage-only screens.
- Wherever the reader cannot do something themselves, say so and tell them to **contact support**.
- "Contact support" uses generic wording for now (e.g. "ติดต่อทีม support ของ Carmen" / "contact Carmen support"), defined **once** (one shared snippet or a single "Getting help" page linked from every such spot), so the real channel (email/phone/LINE/ticket link) can be filled in later in one place. The user decided this.
- On-screen labels exactly as in the app's Cluster Admin view (TH from `th.ts`, EN from `en.ts`).

### Screen Reference (follows `src/components/nav/clusterAdminNav.ts` order)

- **Cluster** — cluster details, logo.
- **Business Units** — list, and the BU page with its tabs: Hotel/Company (contact card), Configuration (read-only), Licences (sub-tabs Seats | Features | Interface), Notes, Users.
- **Users** — the seat ledger: who holds a seat, used vs available, seat actions.
- **Licences** — overview, licences expiring soon, seats by BU, interface licences, subscriptions.
- **My profile** (`/cluster-admin/:clusterId/profile`).
- Getting started: signing in and reaching the Cluster Admin view, what the sidebar shows, switching between clusters if the user administers more than one (verify behaviour in the app).
- Glossary (Cluster, Business Unit, Seat, Licence, Module, Feature area, Interface, …).

### How-to Guides (the questions support gets most)

1. **Manage seats** — give / take back a seat, read whether the pool is full, what the over-quota banner means.
2. **Licences** — read licences and their expiry, what to do when one is expiring soon (contact support / what "Manage licences" does — verify in the app what a cluster admin can actually do there).
3. **BU configuration** — the values can be **viewed only**; to change them, contact support. Hotel/Company details that *are* editable: explain how.
4. **Invite a user to a BU.**
5. **Manage people in a BU** — change role, remove, check status.

### Screenshots for the Cluster Admin site (my call)

The capture creates its own demo data and never shoots real customer data:

- Demo records needed for the guides (users to invite, seats to give) are `MANUAL-DEMO-` records created in ZEBRA (extend `capture/demo-data.ts`; it already has `createDemoUser`, `addDemoUserToCluster`, `addDemoSeatLicense`).
- **Shoot as a real non-super-admin cluster admin, never as the Super Admin test user.** A Super Admin has `adminScope.all`, so `/cluster-admin` lists *every* customer's cluster (`src/pages/clusterAdmin/ClusterAdminEntry.tsx`) and the view may expose powers a hotel-group admin lacks.
- **Account (the user decided):** the DEV account in `.env` as `CLUSTER_ADMIN_EMAIL` / `CLUSTER_ADMIN_PASSWORD` (never committed, never in docs/code). Verified 2026-10-28: not super admin, admin of two clusters — `CHG | Cluster Hotel Group` and `ZEBRA | ZEBRA`. Both are test data and may appear in pictures for external readers (the user confirmed). Because it administers two clusters, `/cluster-admin` shows the cluster picker first — document that picker in Getting Started; shoot all other screens inside **ZEBRA**.
- **Changing ZEBRA is allowed (the user confirmed)**, but keep it reversible: guides add only `MANUAL-DEMO-` users/records (invite, seat, role change, remove act on those), and cleanup removes them and any seat/membership they took, then verifies 0 left. Do not edit ZEBRA's existing BUs, users or settings. The demo cluster from earlier is not needed for the Cluster Admin site (the Super Admin still creates demo records through the API where the cluster admin cannot).
- Separate Playwright project(s) (e.g. `cluster-screens-th/en`, `cluster-guides-th/en`) and output folder (`apps/cluster-admin/public/screenshots/{th,en}/`).
- Feature flags: the four `cluster_admin_*` flags are switched to active by the existing `capture/flags.ts` run like every other flag and restored afterwards; all four screens are documented (my call). The support manual's Feature Flags page lists the new keys (`cluster_admin_*`, `ai_providers`, renamed `backstage_*`).

## Constraints

- Thai and English for every page in both sites; `check:parity` enforces it.
- Labels exactly as on screen (`th.ts` / `en.ts`).
- Capture runs against DEV (`https://dev.blueledgers.com:9902`) with the existing `.env` setup; a Super Admin test user (`TEST_USER_EMAIL`) for the support site and API setup, plus the cluster-admin account (`CLUSTER_ADMIN_EMAIL`) for the Cluster Admin site. Capture changes DEV (feature flags, demo records) and must restore/clean up afterwards.
- No credentials committed.
- Work on branch `feature/manual-refresh-cluster-admin`; no tests written beyond the existing check scripts (user preference).

## Left to the builder

- How the check scripts take the app to check (argument, cwd, or per-app config).
- Exact order of work and how to split commits/PRs.
- Wording of each page, within the style guide.
