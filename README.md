# Carmen Blue Backstage User Manual

Bilingual user manual for Carmen Blue Backstage superadmins, built with VitePress. Thai is the root
(`site/`), English lives under `site/en/`. Screenshots are captured automatically from the live
DEV app. Style rules: [`docs/style-guide.md`](docs/style-guide.md).

## Quick start

```
bun install
bun run docs:dev      # preview at http://localhost:5173 (English: /en/)
bun run docs:build    # production build
bun run check         # typecheck + Thai/English parity + plain-language check + build
```

## Adding a page (both languages)

Every page must exist in Thai and English; `bun run check` fails otherwise.

1. Add the entry (slug, Thai label, English label) to `site/.vitepress/nav-data.mts`. The sidebar
   and page lists are generated from it. Screen Reference order follows `carmen-platform`
   `src/components/nav/platformNav.ts`.
2. Create the Thai page at `site/<slug>.md` and the English page at `site/en/<slug>.md`.
3. Reference screenshots as `/screenshots/th/<name>.png` in Thai pages and
   `/screenshots/en/<name>.png` in English pages (the check rejects a mismatched language or a
   missing file). To capture a new shot, add it to `capture/screens.manifest.ts` (or a guide in
   `capture/guides/`) and run the capture below.
4. Follow the style guide (plain language, on-screen labels exactly as in the app), then run
   `bun run check`.

## Screenshots (capture from DEV)

Screenshots are taken from the live DEV app (`https://dev.blueledgers.com:9902`) with Playwright,
once with the app in Thai and once in English, into `site/public/screenshots/th/` and `/en/`.

Setup (once):

1. `cp .env.example .env` and set `CAPTURE_APP_ID` (copy `REACT_APP_API_APP_ID` from `carmen-platform/.env.dev`).
2. Put a DEV Super Admin in `../carmen-platform-e2e/.env` as `TEST_USER_EMAIL` / `TEST_USER_PASSWORD`
   (or point `CAPTURE_ENV_FILE` at another file). Never commit these.
3. `bunx playwright install chromium` if Playwright has no browser yet.

Run:

- `bun run capture:screens` — Screen Reference + Getting Started shots. No form is ever saved, but the run
  still changes DEV for a while: it switches every feature flag on (and restores the original states at the
  end) and sweeps leftover `MANUAL-DEMO-` records at the start and the end.
- `bun run capture:guides` — How-to Guide shots (these create `MANUAL-DEMO-` records).
- `bun run capture` — both.

`capture:guides` creates records on DEV (removed again by cleanup, see below), so run it only
when guide pictures must change. For routine refreshes use `capture:screens`. Run
`bun run check` afterwards.

What a run does to DEV: it logs in, saves the current feature-flag states to
`.capture-state/flags-original.json` (also printed in the log), switches every flag to
active so all menus are reachable, takes the shots, then puts every flag back and checks it.
The restore runs even when shots fail.

If a run is killed (Ctrl-C twice, crash, closed terminal) the restore does not run and the
next run refuses to start. Put the flags back with:

```
bun run capture:restore-flags
```

It restores the saved states, verifies them on DEV and only then deletes the saved files.

If someone changed flags on DEV while the run had them switched on, the restore lists the
keys they changed. The automatic restore at the end of a run then puts back only the keys
the run itself changed and leaves theirs alone. `capture:restore-flags` stops instead, so
nobody's change is overwritten by accident; after checking with them, either fix the flags
by hand on the Feature Flags page and delete `.capture-state/`, or overwrite everything with
the saved original:

```
bun run capture:restore-flags -- --force
```

If the restore says the login has expired (HTTP 401), run `bun run capture:screens` once:
it logs in again and then stops before changing anything, because the saved original is
still there. Then run `bun run capture:restore-flags` again.

### How-to Guide shots write to DEV

`bun run capture:guides` drives the real forms and saves them, in Thai and in English
(`capture/guides/*.capture.ts`). Every record it creates is named
`MANUAL-DEMO-<kind>-<th|en>-<yyyyMMddHHmm>` (users: the same in lower case, `@example.com`),
so runs never collide. Shot names are `guide-<guide>-<NN>-<step>.png`.

At the end of every run (and at the start, for leftovers of a killed run) all users,
business units, clusters and licence feature groups whose name starts with `MANUAL-DEMO`
are deleted — from any run, never anything without the prefix (names must start with
`MANUAL-DEMO-`; users only when both username and e-mail have the exact generated
`manual-demo-<kind>-<th|en>-<yyyyMMddHHmm>@example.com` shape). Users are deleted
permanently (with their sign-in account). Licence records (BU quota, seats, interface
licences, subscriptions) whose cluster — and business unit, when the row names one — starts
with `MANUAL-DEMO-` are deleted first, permanently (soft delete, then hard delete; licence
numbers are never reissued). Anything that fails is listed under `left`. To sweep by hand:

```
bun run capture:cleanup-demo              # delete
bun run capture:cleanup-demo -- --dry-run # only list what would be deleted
```

Business units are created without a database connection (Database Pool stays "Not set");
saving a business unit only stores the record — no database is created and no migration runs.
Typed passwords are masked in the shots.

A shot fails instead of saving when the page shows Access Denied, Coming soon, 404 or is
still loading. Shots that show secrets (app secret, database connection, database pool,
SMTP password) declare masks in `capture/screens.manifest.ts`; a required mask that matches
nothing also fails the shot. Failure details land in `capture/results/` (gitignored).
