# Business Units

## Where to find it and what it is for

Left menu, group **Organization** > **Business Units**

A **business unit** (BU — one hotel or branch) belongs to exactly one **cluster** (one customer's hotel group). Use this screen to create a new hotel in a cluster, change a hotel's details such as its address, tax details and date formats, and manage who can access the hotel.

Each business unit has its own database, separate from every other hotel. Creating a business unit uses up one place in the cluster's quota.

## Screenshot

The list

![Business Unit Management: the Overview box and the table](/screenshots/en/business-units-list.png)

The new business unit form

![The new business unit form, General tab, with the bottom bar listing what is still needed](/screenshots/en/business-units-form.png)

A business unit's page, General tab

![A business unit's page: the status and HQ badges and the General tab](/screenshots/en/business-units-detail.png)

The Technical tab (the database connection values are hidden in this manual; the real values show on screen)

The Notes tab

![A business unit's Notes tab: the note box, the list of notes and the All files panel](/screenshots/en/business-units-notes.png)

The Licenses tab, User Licenses (seats)

![A business unit's Licenses tab: the User Licenses box with the seat summary and the hotel's subscriptions](/screenshots/en/business-units-licenses-seats.png)

![The Technical tab: Configuration, Database Connection, Tenant Migrations and Tenant Seed Data](/screenshots/en/business-units-technical.png)

## What you can do here

**The list (Business Unit Management)**

- **See the overview:** the total number of business units, how many clusters they cover, and how many are **Active**, **Inactive** and **Archived** (deleted).
- **Search** by code or name. See [Search](/en/getting-started/common-actions#search).
- **Filter** by status, or tick **Show soft-deleted business units**. See [Filters](/en/getting-started/common-actions#filters). <!-- plain-ok -->
- **Export** to a CSV file. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Create a business unit:** the **Add Business Unit** button.
- **Open a business unit:** click its code or name.
- **Row menu** (the `⋯` button): **Edit**, **Change history** and **Delete**. See [Row menu](/en/getting-started/common-actions#row-actions).

**A business unit's page**

The page is split into tabs. A new business unit has the first four tabs; after it is created, the **Users** and **Licenses** tabs appear too, and the **Notes** tab is last if you may view notes. The tab order is General, Location, Formats, Technical, Users, Licenses, Notes.

- **Header:** the hotel's name (click to change it), the status badge **Active** / **Inactive**, and the **HQ** badge (the business unit that is the cluster's head office). Click a badge to switch it.
- **General:** details, calculation settings, and branding (logo and avatar).
- **Location:** the hotel's address, the company that invoices for it, and tax details.
- **Formats:** how dates, times and numbers are shown.
- **Technical:** comment attachments, extra configuration, the database connection, and boxes that check the hotel's database. This part is for the technical team.
- **Users:** who can access this hotel, with their **BU Role** and **BU Status**. You can add, edit and remove users.
- **Licenses:** **User Licenses** (seats — how many users this hotel can have), the hotel's subscriptions, and **Interface licenses** (rights to connect to other systems). Seats are managed on [Licenses](/en/screens/license/licenses); the **Manage licences** and **New subscription** buttons take you there. This tab shows these boxes one after another; it is not split into sub-tabs.
- **Notes:** internal notes about this hotel. Only staff can see them; customers cannot. The number beside the tab name is the number of notes. It works like the Notes tab of a cluster. See [Clusters](/en/screens/organization/clusters#notes) (write, edit, delete, attach files, see all files, restore deleted notes and see history).

## Fields explained

You change most fields by clicking the value (or the **Set ...** text) and typing. Fields marked `*` are required.

**General tab**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Business unit name** (required) | The hotel's name, at the top of the page | "Grand Hotel Bangkok". Must not repeat another business unit's name in the same cluster |
| **Code** | The hotel's code | The system assigns it when the business unit is created (it starts with `BU-`). It cannot be changed, so it does not appear while creating |
| **Alias** | A short name for the hotel | Optional |
| **Cluster** (required) | The cluster this hotel belongs to | Pick from the list |
| **Max users** | The total seats from the hotel's active seat licences | View only; add a seat licence to raise it |
| **Description** | Any extra notes | Optional; up to 500 characters |
| **Calculation method** | How the hotel's inventory cost is calculated | **Average**, **FIFO** (first in, first out) or **Average per location**. Ask the hotel's accounting team before choosing |
| **Default currency** | The hotel's main currency | Appears after the hotel is created; pick from the hotel's currencies |
| **Logo**, **Avatar** | The pictures shown with the hotel's name across the system | In the **Branding** box; appears after the hotel is created |

**Location tab**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Hotel name** | The hotel name used on documents | Optional |
| **Address line 1**, **Address line 2**, **Sub-district**, **District**, **City**, **Province**, **Postal code**, **Country** | The hotel's address | Optional |
| **Latitude**, **Longitude** | The position on a map | Optional, for example `13.7563` and `100.5018` |
| **Phone**, **Email** | How to contact the hotel | Optional |
| **Company**, company phone, company email and every company address field | The legal company that invoices for this hotel | Optional. Click **Copy from hotel address** to use the same address as the hotel |
| **Tax ID**, **Branch** | The numbers used on tax documents | Optional |

**Formats tab**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Timezone** | The hotel's time zone | If you are not sure, ask the technical team |
| **Date format**, **Date-time format**, **Time format**, **Long time format**, **Short time format** | How dates and times are shown in the hotel's system | If you are not sure, leave them as they are and let the technical team set them |
| **Amount format**, **Quantity format**, **Recipe format** | How money amounts, quantities and recipes are shown | Each field shows a sample of how a number will look. If the value is not valid, the screen says it will not be used. Leave these to the technical team |

**Technical tab**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Allowed file types** | The file types the hotel's users may attach to comments | When not set, images and PDF are allowed. Choose at least one type |
| **Max size per file (MB)** | The largest attachment allowed | A whole number from 1 to 25. Click **Reset to default** to go back to the system default |
| **Key**, **Label**, **Data Type**, **Value** | Extra settings for the hotel, in the **Configuration** box | Added with **Add Config Entry**. Use only what the technical team gives you |
| **Database Pool**, **Schema** | Where this hotel's data is stored, in the **Database Connection** box | Leave this to the technical team. See the cautions below <!-- plain-ok --> |

**The Add User to Business Unit and Edit User in Business Unit boxes (Users tab)**

| Field | What it means | Example / notes |
| --- | --- | --- |
| Cluster user search (required) | The person to add | Only people already in this cluster can be picked |
| **BU Role** (required) | What this person can do in this hotel | **Admin** or **User** |
| **BU Status** | Switches this person's access to this hotel on or off | In the edit box; **Active** or **Inactive** |

## Common tasks

**Create a business unit**

1. Click **Add Business Unit**. The bar at the bottom shows what is still needed, for example **Still needed: Name, Cluster**.
2. Click the **(unnamed business unit)** heading and type the hotel's name.
3. On the **Cluster** row, click the set-cluster text and pick the cluster.
4. Choose the **Calculation method**, and fill in the **Location** and **Formats** tabs if you have the details.
5. Do not touch the **Technical** tab.
6. Click **Create Business Unit**. A message confirms that the business unit was created.

If the system says **Cannot create business unit: cluster has reached its license limit**, add a BU quota licence first, as in [Manage a License](/en/guides/manage-license#bu-quota).

**Change a hotel's details**

1. Open the business unit's page and click the tab you need.
2. Click the value you want to change and type the new value.
3. An **Unsaved changes** bar appears at the bottom.
4. Click **Save Changes**, or **Cancel**. See [Unsaved-changes warning](/en/getting-started/common-actions#unsaved-changes).

**Add a user to the hotel**

1. Click the **Users** tab.
2. Click **Add User**. The **Add User to Business Unit** box opens.
3. Type a name or email and pick the person. If the name does not appear, add the person to the cluster first on [Clusters](/en/screens/organization/clusters).
4. Choose the **BU Role**.
5. Click **Add User**. A message confirms that the user was added to the business unit.

**Change a user's role or switch off their access to the hotel**

1. On the **Users** tab, click the edit button on the user's row. The **Edit User in Business Unit** box opens.
2. Change the **BU Role** or **BU Status**.
3. Click **Save**.

A user with the **Shared** badge is also active in another hotel in the same cluster, so switching them off here frees no seat.

**Remove a user from the hotel**

1. On the **Users** tab, click the remove button on the user's row.
2. The **Remove User** box asks you to confirm. Confirm. The user's account still exists, but they can no longer access this hotel.

**Write a note about the hotel**

1. Open the business unit's page and click the **Notes** tab.
2. Type in the **Write a note…** box. You can attach files with **Attach files**. Then click **Post note**.
3. Edit, delete, restore and see the history of notes the same way as for a cluster. The full steps are in [Clusters](/en/screens/organization/clusters#notes).

**Switch off a user to free a seat**

When you switch off a user's BU Status, or remove them from the hotel, the edit box and the confirmation box tell you the effect on seats, for example **This frees one cluster seat.** or **Still active in another business unit in this cluster, so this frees no cluster seat.** To free the seat of a person who is no longer in the cluster's member list, do it on this **Users** tab. See [The over-quota banner](/en/screens/organization/clusters#seats).

**Delete a business unit**

1. On the list, click `⋯` on the row and choose **Delete**.
2. The **Delete Business Unit** box asks you to confirm. Click **Delete**.

## Cautions

::: warning Do not change the database connection yourself
The **Database Connection** box on the **Technical** tab says where this hotel's data is stored. If you change it, the system asks **Repoint this business unit?** If you click **Repoint**, the hotel reads and writes its data in the new place. The old data stays where it was, but it can no longer be reached from this screen, so the hotel's users may see all their data disappear. Always leave this box to the technical team.
:::

::: warning The buttons in the Tenant Migrations and Tenant Seed Data boxes on the Technical tab
These two boxes check and update this one hotel's database, the same as the [Tenant Migrations](/en/screens/organization/tenant-migrations) and [Tenant Seed Data](/en/screens/organization/tenant-seeds) screens. **Check status** is safe. But **Apply migrations** changes the structure of the hotel's database and cannot be undone, and **Seed** adds starting data that cannot be removed from this screen. Let the technical team press these.
:::

::: warning Deleting a business unit cannot be undone
The confirmation box says **This action cannot be undone**. There is no restore button on this screen, and the hotel's users can no longer access the hotel.
:::

- **Calculation method** affects how the hotel's inventory cost is calculated. Ask the hotel's accounting team before you choose or change it.
- If a cluster has more business units than its quota, the extra ones are read-only until more quota is bought.

## Related guides

- [Set Up a New Hotel](/en/guides/setup-hotel): Part 2 creates the business unit and Part 5 adds staff to the hotel
- [Add a User](/en/guides/add-user)
- [Manage a License](/en/guides/manage-license): seats, BU quota and the hotel's subscription
