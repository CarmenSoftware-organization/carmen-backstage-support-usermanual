# Backstage Migrations

## Where to find it and what it is for

Left menu, group **Database** > **Backstage Migrations**. The screen's heading reads **Backstage Database Migrations**.

::: tip Who sees this screen
This menu item and screen are shown only to **Super Admins** (people who can do everything in the system, with no permission checks). Other users do not see the menu item, even if their role has every permission. If they open the link directly, they get the [Access Denied screen](/en/getting-started/common-actions#access-denied).
:::

A **migration** is an update to the database structure so that it matches the latest version of the system. This screen looks after the system's **central database**: the single database that every **cluster** (a hotel group or company group belonging to one customer) shares. It holds platform-wide data such as permissions, roles, currencies and the default report templates.

**How Backstage Migrations differs from Tenant Migrations**

| | Backstage Migrations (this screen) | [Tenant Migrations](/en/screens/organization/tenant-migrations) |
| --- | --- | --- |
| What it updates | The one central database | Each hotel's own database (one per **business unit** — one hotel or branch) |
| Who is affected | Every cluster and every hotel at once | Only the hotel you update |
| Who can open it | Super Admins only | People whose role allows it |

Besides updating the structure, this screen also loads **starting data** (the basic data the system needs from day one), and checks whether the data in the central database still matches what this version of the system expects.

**Who uses this screen:** it is the technical team's job, after a new release. Any Super Admin can safely **look at the status** here and press the buttons in the **Drift checks** card, but do not press the buttons that write data unless you have been asked to.

## Screenshot

![The Backstage Database Migrations screen: the status card reading Up to date with the Apply migrations button, the Resolve a stuck migration card, and the Seed data card](/screenshots/en/backstage-migrations-overview.png)

## What you can do here

- **See the status:** the **Status** card shows when it was last checked, and one of three results:
  - **Up to date** (green left edge): the central database has every update. Nothing to do.
  - **... pending** (orange left edge): some updates have not been applied yet. The screen lists each one by name.
  - **Unknown:** the system could not read the status. Tell the technical team.
- **Check status:** the button at the top right reads the status again. It changes nothing.
- **Raw Prisma output:** click to expand the system's reply word for word (Prisma is the tool the system uses to update the database). It is there for the technical team.
- **Apply migrations:** applies every pending update to the central database. You must confirm first. The button works even when the status is already up to date; in that case the system replies **No pending migrations — nothing changed**.
- **Resolve a stuck migration (advanced):** a collapsed box the technical team uses to fix an update that failed and got stuck. See the **Fields explained** section below.
- **Seed data** (the card with the **Writes data** label): each row is one set of starting data, such as **ISO currencies**, **App permissions**, **Backstage roles**, **Report templates**. Click **Run** to load that set. The system asks you to confirm first. The card says it is safe to run again: data that already exists is skipped.
- **Run…** (with three dots): some sets, such as **Role permissions**, are loaded one business unit at a time. Clicking opens a box where you choose the business units first. You can choose more than one.
- **Drift checks:** this card compares what this version of the system expects with what is actually in the database. **It writes nothing.** Click **Run** and the check starts straight away, with no confirmation.
  - Some row names show English technical words on screen, such as **Check endpoint coverage** and **Check api-system coverage** (an endpoint is a channel an app uses to ask the system for data or send it data; these rows look for channels with no permission check). <!-- plain-ok -->
- If a row shows the label **Not in this build**, its **Run** button cannot be clicked.
- **Run console:** the panel at the bottom of the screen shows the messages from every job you start on this screen, and whether each one succeeded. Click **Copy all**, or the copy icon of one job, to send it to the technical team. Click **Clear** to empty the console.
- While one job is running, the other buttons on this screen cannot be clicked until it finishes.
- If the system cannot read the status (the **Status** card shows an error message with a retry button), **Apply migrations**, **Resolve** and every **Run** button cannot be clicked until the status loads.

## Fields explained

This screen has no create or edit form. The only form is the **Resolve a stuck migration (advanced)** box, which is the technical team's job.

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Migration name** (required) | The name of the stuck update | A date-and-time number followed by a name, for example `20260612000000_add_doc_version`. If the format is wrong, the message **Invalid format** appears and the button cannot be clicked. |
| **Mark as** (required) | Records the update as **Applied** or **Rolled back** | The system does not actually run the update; it only records the status. The default is **Applied**. |

## Common tasks

**Check whether the central database is fully updated (safe)**

1. Open **Backstage Migrations**.
2. Click **Check status**.
3. Look at the **Status** card. If it says **Up to date**, there is nothing more to do.
4. If it says **... pending** or **Unknown**, tell the technical team.

**Run a drift check (safe)**

1. Scroll down to the **Drift checks** card.
2. Click **Run** on the row you want.
3. Read the result in the **Run console** below.
4. If differences are found, click that job's copy icon and send the text to the technical team.

**Apply pending updates (when asked to)**

1. Click **Check status** first, and read the list of pending updates.
2. Click **Apply migrations**.
3. The **Apply platform migrations?** box warns that it cannot be interrupted once started. Click **Apply migrations**.
4. Follow the progress in the **Run console**. Do not close this screen until the job has finished.
5. When it is done, the system shows **Applied ... migration(s)** and checks the status again by itself. Make sure it says **Up to date**.

**Load one set of starting data (when asked to)**

1. In the **Seed data** card, click **Run** on the row the technical team named.
2. The **Run this operation?** box warns that this writes to the central database. Click **Run**.
3. Read the result in the **Run console**. The system shows **Finished** or **Failed (exit ...)**.

**Load starting data that is done one business unit at a time (when asked to)**

1. Click **Run…** on the row, for example **Role permissions**.
2. In the box that opens, search for and choose the business units you need. You can choose more than one.
3. Click **Continue with ... BU(s)**.
4. The **Run this operation?** box names the business units you chose, by name or code. Check them, then click **Run**.
5. The system does them one after another. If one fails, it still carries on with the rest. At the end it shows a summary, such as **Finished ..., failed ...**. Open the failed jobs in the console to see why.

## Cautions

::: warning Apply migrations affects every cluster and cannot be undone
**Apply migrations** changes the structure of the central database that every cluster and every hotel shares. Once started it cannot be interrupted, and there is no undo button. If something goes wrong part way, every hotel may be affected until the technical team fixes it. Only click it when the technical team asks you to, and preferably outside the hotels' busy hours.
:::

::: warning Seed data writes real data
The **Run** buttons in the **Seed data** card write data into the central database as soon as you confirm. They cannot be interrupted, and this screen has no button to remove data once it is loaded. If you choose the wrong business unit, the data goes to that business unit.
:::

::: warning Resolve is for the technical team only
The **Resolve a stuck migration (advanced)** box records an update as applied or rolled back without actually running it. The system warns that **It cannot be undone from here**. If you choose wrongly, the system counts an update that never ran as if it had, and the central database will no longer match the system. Do not use it unless the technical team tells you to.
:::

::: warning Closing this screen does not stop a running job
If you close or leave this screen while starting data is loading, the job carries on to the end in the system. Apply migrations most likely carries on too. But the console messages are lost, and you will not see whether it succeeded. Wait for the job to finish before you leave. If you left by mistake, come back and click **Check status**.
:::

- The **Run console** is not saved. When you leave or refresh this screen, all its messages disappear. To keep them, click **Copy all** first.
- If you see **A platform migration is already running. Try again shortly.**, someone else is running a job. Wait, then click **Check status**. Do not click repeatedly.
- If you see **The platform migration API is disabled, or you are not a super-admin.**, the system has switched this screen off. A Super Admin can switch it on in [Backstage Config](/en/screens/backstage/backstage-config), field **API status**. Only switch it on when the technical team needs it.

## Related guides

There is no step-by-step guide for this screen, because it is the technical team's job. Related screens:

- [Tenant Migrations](/en/screens/organization/tenant-migrations) updates each hotel's own database
- [Tenant Seed Data](/en/screens/organization/tenant-seeds) each hotel's starting data
- [Backstage Config](/en/screens/backstage/backstage-config) switches this screen on or off
- [Super Admins](/en/screens/backstage/super-admins)
