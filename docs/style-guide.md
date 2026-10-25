# Style Guide

Rules for everyone who writes or edits pages in this manual. Thai and English pages follow the same rules.

## Anti-goal (the failure the user named)

**Language that is hard to understand or too technical.** A manual that is accurate on every page but reads like developer docs has failed. Concretely:

- Describe what the user sees and what happens, not how it works underneath. E.g. "deleted items can be restored" instead of "soft delete"; "the change takes effect immediately for all hotels in this cluster" instead of "propagates to tenant schemas".
- No table names, API paths, permission keys, JSON, or code — unless the screen itself shows them (e.g. SQL Workbench, cron schedule field), in which case explain them in plain words.
- Short sentences, numbered steps, one action per step.

## Terminology rule (agreed)

- Use the **exact label shown on screen** in that language. The Thai manual uses the Thai UI labels (from `carmen-backstage/src/i18n/th.ts` — e.g. `หน่วยธุรกิจ`, `ไลเซนส์`, `ผู้ใช้งาน`; some stay English on screen, e.g. `Clusters`, `Tenant Migrations`, `SQL Workbench`). The English manual uses `src/i18n/en.ts`.
- On a term's **first appearance on a page**, add a plain-language explanation in parentheses, e.g. "หน่วยธุรกิจ (Business Unit — โรงแรมหรือสาขาหนึ่งแห่ง)".
- A **Glossary** page in each language lists every domain term (Cluster, Business Unit, License, Feature Group, Tenant, Migration, Seed Data, Broadcast, Platform Role, Super Admin, Feature Flag, Database Pool, …) with the TH label, EN label and a one-line plain explanation.
- Note: the Thai UI is itself inconsistent in places (e.g. sidebar item `ไลเซนส์` under group `จัดการใบอนุญาต`). The manual follows the screen as-is and the glossary links both forms.

## Page templates

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

## Writing rules

- Write in second person: "คุณ" / "you".
- Use short sentences.
- One action per numbered step.
- Use bold for on-screen labels: `กดปุ่ม **บันทึก**` / `Click **Save**`.
- Put cautions in a VitePress warning block:

  ```md
  ::: warning
  Deleting this cannot be undone.
  :::
  ```

- Do not re-explain generic behavior (search, filters, CSV export, view and edit mode). Link to `getting-started/common-actions` instead.
- Screenshots live at `site/public/screenshots/<lang>/<slug>.png` and are referenced as `![...](/screenshots/th/clusters-list.png)`. The language folder must match the page language.
- If the screen itself shows a technical term, you may use it. Mark the line with `<!-- plain-ok -->` and explain it in plain words.

## Plain replacements

| Instead of | Thai | English |
| --- | --- | --- |
| soft delete | ลบแบบกู้คืนได้ | can be restored |
| hard delete | ลบถาวร | delete permanently |
| tenant (first use) | ฐานข้อมูลของโรงแรมแต่ละแห่ง | each hotel's own database |
| migration | อัปเดตโครงสร้างฐานข้อมูล | update the database structure |
| seed | ข้อมูลตั้งต้น | starting data |

## Checks

`bun run check:plain` flags developer jargon (table names, API paths, permission keys, JSON, schema, JWT, and similar). `bun run check:parity` checks that every Thai page has an English page and the reverse, and that screenshot references exist.
