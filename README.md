# Carmen Platform User Manual

Bilingual (Thai root, English under `/en/`) VitePress manual for the carmen-platform admin app.

- `bun install`
- `bun run docs:dev` to preview, `bun run docs:build` to build
- `bun run check` runs typecheck, parity check, plain-language check and the build

Style rules: `docs/style-guide.md`. Full README is completed in a later task.

## Screenshots (capture from DEV)

Screenshots are taken from the live DEV app (`http://dev.blueledgers.com:9902`) with Playwright,
once with the app in Thai and once in English, into `site/public/screenshots/th/` and `/en/`.

Setup (once):

1. `cp .env.example .env` and set `CAPTURE_APP_ID` (copy `REACT_APP_API_APP_ID` from `carmen-platform/.env.dev`).
2. Put a DEV Super Admin in `../carmen-platform-e2e/.env` as `TEST_USER_EMAIL` / `TEST_USER_PASSWORD`
   (or point `CAPTURE_ENV_FILE` at another file). Never commit these.
3. `bunx playwright install chromium` if Playwright has no browser yet.

Run:

- `bun run capture:screens` — read-only Screen Reference + Getting Started shots (nothing is saved on DEV).
- `bun run capture:guides` — How-to Guide shots (these create `MANUAL-DEMO-` records).
- `bun run capture` — both.

What a run does to DEV: it logs in, saves the current feature-flag states to
`.capture-state/flags-original.json` (also printed in the log), switches every flag to
active so all menus are reachable, takes the shots, then puts every flag back and checks it.
The restore runs even when shots fail.

If a run is killed (Ctrl-C twice, crash, closed terminal) the restore does not run and the
next run refuses to start. Put the flags back with:

```
bun run capture:restore-flags
```

It restores the saved states, verifies them on DEV and only then deletes the saved file.

A shot fails instead of saving when the page shows Access Denied, Coming soon, 404 or is
still loading. Shots that show secrets (app secret, database connection, database pool,
SMTP password) declare masks in `capture/screens.manifest.ts`; a required mask that matches
nothing also fails the shot. Failure details land in `capture/results/` (gitignored).
