# Tenant Migrations

## Where to find it and what it is for

Left menu, group **Organization** > **Business Units** > **Tenant Migrations**. The screen's heading reads **Tenant migrations**.

A **tenant** is each hotel's own database: every **business unit** (one hotel or branch) has its own. A **migration** is an update to the database structure so that it matches the latest version of the system.

When Carmen Blue releases a new version, each hotel's database may need new fields or tables before the hotel can use the new features. Use this screen to check which hotels are **behind** (not yet updated), then update them one hotel at a time or all at once.

**Who uses this screen:** it is normally the technical team's job, after a new release, or when a hotel reports that a screen stopped working after a system update. Any administrator can safely **check** the status here, but do not run updates yourself unless you have been asked to.

## Screenshot

![The Tenant migrations screen: the summary box with Check all, Deploy all and Export, and the business unit table](/screenshots/en/tenant-migrations-list.png)

## What you can do here

- **See the summary:** the box at the top shows how many **tenants in sync** out of the total, for example `10 / 12`, and a coloured bar split into **In sync**, **Behind** and **Error**. Before anything is checked, it shows `-`.
- **Check all:** checks every hotel to see whether it is behind. It changes nothing.
- **Deploy all** (after a check it becomes **Deploy N behind**): updates every hotel that is behind. You must confirm first. The button can be clicked even before you check (hovering over it shows a warning), and it is disabled once a check shows every hotel is in sync.
- **Export** the results to a CSV file. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Search** business units. See [Search](/en/getting-started/common-actions#search).
- **Read the table:** each row is one hotel.
  - The **Schema** column shows where the hotel's data is kept and which database it uses (the **pool:** line). <!-- plain-ok -->
  - **Status** is **Not checked**, **In sync**, **N behind** (how many updates it is behind) or **Error** (the check failed).
  - **Last Checked** shows when it was last checked.
- **Buttons at the end of each row:**
  - **Check** (circular arrows icon): checks this one hotel. Safe.
  - **Apply** (play icon): updates this hotel. Only shown when updates are pending. You must confirm first.
  - **Apply dashboard views** (dashboard icon): updates the parts this hotel uses to draw its dashboards. Disabled when they are already in sync.
  - **Resolve** (wrench icon): only on rows with **Error**. Fixes a stuck update. For the technical team only.
- If your account is not allowed to run updates, the update buttons are disabled. Hover over a button to see why.

## Fields explained

This screen has no create or edit form. The only box with fields is **Resolve a stuck migration** (the **Resolve** button), which is a job for the technical team.

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Migration name** (required) | The name of the stuck update | The technical team gives you the name |
| **Mark as** (required) | Records that the update is **Applied** or **Rolled back** | The system does not actually run the update; it only records the status |

## Common tasks

**Check which hotels are not updated yet (safe)**

1. Open **Tenant Migrations**.
2. Click **Check all**. The button shows that it is checking.
3. Wait until it finishes, then look at the summary box and the **Status** column.
4. If every row is **In sync**, there is nothing more to do.
5. If any row shows **N behind** or **Error**, click **Export** and send the file to the technical team.

**Update one hotel (when asked to)**

1. Click **Check** on the hotel's row.
2. If updates are pending, the **Apply** button appears. Click it.
3. The **Apply tenant migrations** box shows the number of updates and the hotel's name and code. Make sure it is the right hotel.
4. Click **Apply migrations**.
5. Wait until the status is **In sync**.

**Update every hotel that is behind (when asked to)**

1. Always click **Check all** first, so you know which hotels will be touched.
2. Click **Deploy N behind**.
3. The **Deploy migrations to all BUs** box asks you to confirm. Read the number of business units carefully.
4. Click **Deploy all**. The screen shows the progress while it runs. Do not close this page. If you close it by mistake, the system does not stop updating the hotel it is working on; that hotel carries on to the end, and the screen only stops showing progress. Hotels whose turn has not come yet are not updated. Do not click **Deploy all** again straight away. Wait a while, open this page again, click **Check all** to see which hotels are still behind, and tell the technical team.
5. When it finishes, a message says the deploy completed. Check that no row shows **Error**.

## Cautions

::: warning Database structure updates cannot be undone
**Apply** and **Deploy all** really change the structure of the hotels' databases, and they **cannot be undone**. If something goes wrong part way, the hotel may be unable to use some screens until the technical team fixes it. Only run them when the technical team asks you to, and preferably outside the hotel's busy hours.
:::

::: warning Deploy all affects every hotel at once
This button updates every hotel that is behind in one go, and it can be clicked even before you check. If you have not clicked **Check all**, you will not know which hotels it will touch. Always check first. Once it starts, there is no stop or cancel button.
:::

::: warning Resolve is for the technical team only
The **Resolve a stuck migration** box records that an update was applied or rolled back, without actually running it. If you choose wrongly, the system counts an update that never ran as done, and the hotel's database no longer matches the system. Do not use it without guidance from the technical team.
:::

- If you see a message that a migration is already running, wait and check again. Do not click repeatedly.
- Each business unit's page has a **Tenant Migrations** box on the **Technical** tab that does the same for that one hotel. See [Business Units](/en/screens/organization/business-units).

## Related guides

There is no step-by-step guide for this screen, because it is a job for the technical team. Related pages:

- [Tenant Seed Data](/en/screens/organization/tenant-seeds)
- [Business Units](/en/screens/organization/business-units)
- [Set Up a New Hotel](/en/guides/setup-hotel)
