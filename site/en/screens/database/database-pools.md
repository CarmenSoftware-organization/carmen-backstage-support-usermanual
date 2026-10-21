# Database Pools

## Where to find it and what it is for

Left menu, group **Database** > **Database Pools**

A **database pool** is one saved set of **connection details for a machine that holds hotel databases**: the machine's address, and the user name and password the system uses to read and write the data. Several hotels' databases can live on the same machine, so several **business units** (one hotel or branch each) can share one pool. Each business unit chooses its pool in the **Database Pool** field, in the **Database Connection** box on the **Technical** tab of the [Business Units](/en/screens/organization/business-units) screen.

Connection details are **secret**. Anyone who has them can get straight into the hotels' data.

**Who uses this screen, and when:** it is the technical team's job, used when a new database machine is added, or when a machine's address or password changes. Other administrators do not need this screen for everyday work.

## Screenshot

::: info The manual's pictures hide the secrets
The grey bars in the pictures are connection details that this manual hides. On the real screen you see the address, the user name and whatever you type. A saved password is never shown on screen at all.
:::

The list:

![The Database Pools screen with the search box, the Filters button, the Export CSV button, the Add Pool button, and a table with the columns Connection, Status, Created and Updated](/screenshots/en/database-pools-list.png)

The details of one pool:

![The Database Pool details screen showing the connection address with a copy button, the Active label, the note, and the password shown as Stored, hidden](/screenshots/en/database-pools-detail.png)

The form for a new pool:

![The New Database Pool form with the fields Name, Status, Description, Host, Port, Database, Username, Password and Note](/screenshots/en/database-pools-form.png)

## What you can do here

- **See the list of pools:** the **Connection** column shows the address as username@host:port/database. Under the address you may see the pool's name and a note. For example, a pool the system created automatically from a business unit's older connection details has a note starting with **สร้างอัตโนมัติจาก** ("created automatically from"; the note is stored data, so it shows in Thai in both languages).
- **Copy the connection address:** the copy icon next to the address. The system shows **Connection string copied**. The copied address does not include the password.
- **Search** and **filter** by status, **Active** / **Inactive**. See [Search](/en/getting-started/common-actions#search) and [Filters](/en/getting-started/common-actions#filters).
- **Export CSV**: see [Export to a CSV file](/en/getting-started/common-actions#export). The file contains the address, host, port, database and user name, but not the password.
- **See the details:** click the address in the **Connection** column to open it. The password always shows as **Stored, hidden**.
- **Add Pool**, **Edit** and **Delete** (the `⋯` button at the end of the row) are shown only to people whose role lets them change database pools. See [Row menu](/en/getting-started/common-actions#row-actions).
- The details screen opens in view mode. Click **Edit** to change values. See [View mode and edit mode](/en/getting-started/common-actions#view-edit) and [Save and Cancel](/en/getting-started/common-actions#save-cancel).

## Fields explained

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Name** (required) | The name used for this pool. It must not be the same as another pool's. | For example `tenant-primary`. If it is already taken, the system shows **A database pool with this name already exists**. |
| **Status** | Tick **Active** to let business units use this pool | Ticked by default. If you untick it, the hotels that use this pool cannot connect to their database. See the cautions. |
| **Description** | Text describing this pool | Optional |
| **Host** (required) | The address of the machine that holds the databases | Given by the technical team. Secret. |
| **Port** (required) | The number of the entry point on that machine | A number from 1 to 65535. A common value is `5432`. If it is wrong, you see **Port must be a number between 1 and 65535**. |
| **Database** (required) | The name of the database on that machine | For example `carmen_tenant` |
| **Username** (required) | The account name the system uses to get into the database | Not the user name of a person in Carmen Blue. Secret. |
| **Password** (required when creating) | The password of the account above | When editing, leave it blank to keep the current password. Click the eye icon to see what you typed. The system stores it encrypted and never shows a saved password again. |
| **Note** | Any extra note | Optional. Shown under the address in the list. |

## Common tasks

**Find out where a hotel's data is kept**

1. Open [Business Units](/en/screens/organization/business-units) and open the business unit you want.
2. Go to the **Technical** tab and look at the **Database Pool** field in the **Database Connection** box.
3. Come back to **Database Pools** and search for that pool.

**Add a new pool (when the technical team gives you the details)**

1. Click **Add Pool**.
2. Fill in **Name** and all the required fields with the details from the technical team.
3. Make sure **Active** is ticked.
4. Click **Create Pool**. The system shows **Database pool created**.

**Change a password or address (when the technical team tells you to)**

1. On the list, click the `⋯` button on the row and choose **Edit**.
2. Change the fields the technical team named. If the password is not changing, leave **Password** blank.
3. Click **Save Changes**. The system shows **Changes saved**.
4. Ask the technical team to check that the hotels using this pool can still open their data.

**Delete a pool that is no longer used**

1. On the list, click the `⋯` button on the row and choose **Delete**.
2. The **Delete Database Pool** box asks you to confirm. Click **Delete**.
3. If any business unit still uses this pool, the system does not delete it and shows **This database pool is still used by these business units: ...** followed by their names. Those business units must be moved to another pool first (a job for the technical team).

## Cautions

::: warning Connection details are secret
The address, user name and password on this screen give direct access to the hotels' data. Do not send them by chat or email, do not share screenshots of this screen, and keep exported CSV files somewhere safe.
:::

::: warning A change affects every hotel that uses this pool
When you click **Save Changes**, the new values are saved at once. If you enter a wrong host, user name or password, or untick **Active**, every hotel that uses this pool may lose access to its data. The system does not check that the connection works before saving, and this screen has no button to test the connection. Only change it when the technical team tells you to.
:::

::: warning Deleting cannot be undone
The confirmation box says **This cannot be undone**. A deleted pool disappears from the list, and this screen has no restore button.
:::

## Related guides

There is no step-by-step guide for this screen, because it is the technical team's job. Related screens:

- [Business Units](/en/screens/organization/business-units) choose each hotel's pool on the **Technical** tab
- [Set Up a New Hotel](/en/guides/setup-hotel) the step that creates the business unit says to leave the **Database Connection** box to the technical team
- [Tenant Migrations](/en/screens/organization/tenant-migrations) the **Schema** column also shows which pool each hotel uses <!-- plain-ok -->
