# Tenant Seed Data

## Where to find it and what it is for

Left menu, group **Organization** > **Tenant Seed Data**. The screen's heading reads **Tenant seed data**.

A **tenant** is each hotel's own database. **Seed data** is the basic starting data that every hotel's database must have before the hotel starts using the system. The system groups this data into several sets.

Use this screen to check which **business units** (a business unit is one hotel or branch) are missing starting data, and fill in only what is missing. Data that already exists is skipped, never changed.

**Who uses this screen:** it is normally the technical team's job, for example after a new hotel is created, or after the system adds a new set of starting data. Any administrator can safely **check** the status, but do not fill in data yourself unless you have been asked to.

## Screenshot

![The Tenant seed data screen: the summary box with Check all, Seed all missing and Export, and the business unit table](/screenshots/en/tenant-seeds-list.png)

## What you can do here

- **See the summary:** the box at the top shows how many **tenants seeded** out of the total, and a coloured bar split into **Seeded**, **Missing**, **Error** and **No DB**. Before anything is checked, it shows `-`.
- **Check all:** checks what every hotel is missing. It changes nothing.
- **Seed all missing** (after a check it becomes **Seed N missing**): fills in the data for every hotel that is missing some, one hotel at a time. You choose the sets and confirm first. The button only works after **Check all**, and it is disabled when every hotel is complete.
- **Export** the results to a CSV file. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Search** business units. See [Search](/en/getting-started/common-actions#search).
- **Read the table:** each row is one hotel.
  - **Status** is **Not checked**, **Seeded**, **N missing**, **No DB** (this hotel's database is not set up yet) or **Error**.
  - **Missing sets** shows which sets of data are missing.
  - **Last Checked** shows when it was last checked.
- **Buttons at the end of each row:**
  - **Check** (circular arrows icon): checks this one hotel. Safe.
  - **Seed** (seedling icon): fills in the missing data for this hotel. Only shown when the status is missing.
  - Rows with **No DB** have no buttons. The technical team must set up the hotel's database first.

## Fields explained

This screen has no create or edit form. When you click **Seed** or **Seed all missing**, a box opens for choosing the sets.

| Field | What it means | Example / notes |
| --- | --- | --- |
| A tick box for each set | A set of starting data to fill in | Next to each set it says how many items are missing, for example `3 missing` or `3 missing in 2 BU`. Click the arrow to see the missing items |
| **Select all** / **Clear** | Tick every set, or untick them all | At least one set must be ticked |

## Common tasks

**Check which hotels are missing starting data (safe)**

1. Open **Tenant Seed Data**.
2. Click **Check all**.
3. Wait until it finishes. A message says how many business units were checked.
4. Look at the **Status** and **Missing sets** columns.
5. If any row shows missing or **Error**, click **Export** and send the file to the technical team.

**Fill in data for one hotel (when asked to)**

1. Click **Check** on the hotel's row.
2. If the status shows missing items, click **Seed**. The **Seed default data?** box opens.
3. Check the hotel's name and code in the box.
4. Tick the sets you need.
5. Click **Seed N rows**. A message says how many items were created for that hotel.

**Fill in data for every hotel that is missing some (when asked to)**

1. Always click **Check all** first.
2. Click **Seed N missing**. The **Seed all missing tenants?** box opens.
3. Tick the sets you need.
4. Click **Seed N rows**. The system works one hotel at a time and shows the progress, for example `BU 2/5`.
5. Do not leave this page until it finishes. If you leave part way, it stops before starting the next hotel.
6. When it finishes, a message says how many business units were seeded.

## Cautions

::: warning Filling in starting data cannot be undone
Data added to a hotel's database cannot be removed from this screen. The system does not change the hotel's existing data, but the new data appears in the hotel's lists straight away, for example in the choices staff see. Check the hotel's name and the sets carefully, and only run it when the technical team asks you to.
:::

::: warning Seed all missing affects many hotels
This button fills in the chosen sets for every hotel that is missing them. Check all first to see which hotels it will touch.
:::

- Each business unit's page has a **Tenant Seed Data** box on the **Technical** tab that does the same for that one hotel. See [Business Units](/en/screens/organization/business-units).
- This screen only fills in the system's basic data. To load the hotel's own data from an Excel file, use [Data Import](/en/screens/organization/data-import).

## Related guides

There is no step-by-step guide for this screen, because it is a job for the technical team. Related pages:

- [Tenant Migrations](/en/screens/organization/tenant-migrations)
- [Data Import](/en/screens/organization/data-import)
- [Set Up a New Hotel](/en/guides/setup-hotel)
