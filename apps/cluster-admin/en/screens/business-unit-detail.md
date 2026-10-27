# A Business Unit

**Where to find it:** sidebar > **Business Units** > click a Business Unit's name. The breadcrumb shows **Cluster Admin** > **Business Units** > **Edit**. Click **Business units** (top left, with the arrow) to go back to the list.

This is the page of one Business Unit (one hotel or branch). The top part stays on screen all the time. Under it there are six tabs: **Overview**, **Hotel**, **Company**, **Configuration**, **Licenses** and **Users**.

## The top part

- The Business Unit's **name**. You can click it to change it.
- The hotel's name, and its city and country, under the name.
- A status badge: **Active** or **Inactive**. Click it to switch.
- A badge **HQ** or **Not HQ**. Click it to switch.
- The Business Unit's short code, such as T03. You cannot change it.
- **CLUSTER SEATS** on the right: for example **11 / 13 licensed** and **2 seats open**. This is the whole Cluster's seat pool, not only this Business Unit.

## How saving works

On this page, text you change is **not saved at once**. After your first change, a bar appears at the bottom with the number of **unsaved changes**.

- Click **Save changes** to keep them.
- Click **Cancel** to throw them away.

The logo and avatar are the exception. They are saved as soon as you choose a file.

::: warning
An **Inactive** Business Unit's seat licenses do not count toward the Cluster's seat pool. Switching **Active** or **HQ** can change how seats and quota are counted. If you are not sure, [contact Carmen support](/en/getting-help) first.
:::

## Overview

![The Overview tab](/screenshots/en/bu-overview.png)

| Field | What it means |
| --- | --- |
| **Alias** | A short name for the Business Unit. Click to change it. |
| **Description** | A free note. Click **Set description...** to write one. |
| **Logo** | The Business Unit's logo. Click **Replace logo**. JPEG, PNG or WEBP, up to 5 MB. It is made at most 500 pixels wide. |
| **Avatar** | A small round picture. Click **Replace avatar**. JPEG, PNG or WEBP, up to 5 MB. It is cut into a circle, at most 250 pixels. |
| **Elsewhere** | A short summary of the other tabs. Click a row to jump to that tab. |

## Hotel

![The Hotel tab](/screenshots/en/bu-hotel.png)

How guests and suppliers reach the hotel.

- **Contact:** **Hotel name**, **Phone** and **Email**.
- **Location:** the hotel's address. **Open in Maps** shows it on a map.

Click a value to change it, then use **Save changes**.

## Company

![The Company tab](/screenshots/en/bu-company.png)

The company that is billed for this Business Unit.

- **Billing details:** **Company name**, **Phone**, **Email**, **Tax ID** and **Branch**.
- **Billing address:** the company's address. If it is the same as the hotel's, click **Copy from hotel address**.

Click a value to change it, then use **Save changes**.

## Configuration

![The Configuration tab](/screenshots/en/bu-configuration.png)

::: warning You can only view this tab
The values here can only be **viewed**. You cannot change them. To change them, [contact Carmen support](/en/getting-help).
:::

They are set when the Business Unit is set up, and other parts of Carmen Blue depend on them. The tab shows:

- **Regional formats:** **Timezone**, **Date format**, **Date-time format**, **Time format**, **Long time format** and **Short time format**.
- **Calculation settings:** **Calculation method**, for example FIFO.
- **Number formats:** **Amount format**, **Quantity format** and **Recipe format**. Each shows an example, such as "1234.5678 shows as 1,234.568".

## Licenses

This tab has a small menu of its own: **Seats**, **Modules** and **Interface**, each with a count. Everything here is for reading only.

The link **Manage licences** (top right of this tab) does **not** let you add or change licenses. It opens the [Licenses](/en/screens/licences) screen of your Cluster, where you can see all licenses and their end dates. To add or change a license, [contact Carmen support](/en/getting-help).

### Seats

![The Seats sub-tab](/screenshots/en/bu-licences-seats.png)

Shows where the Cluster's seats come from:

- **This business unit:** seats from this Business Unit's own licenses.
- **From other business units:** seats from the Cluster's other Business Units.
- **Cluster pool:** the two added together, and how many are **in use**.

The note under the bar reminds you that seats are shared across the Cluster. Under **SEAT LICENSES** each license is listed with its number, its dates, its number of seats and its status. A license that shows **End date required** has no end date recorded. If you see this and are unsure what to do, [contact Carmen support](/en/getting-help).

### Modules

![The Modules sub-tab](/screenshots/en/bu-licences-modules.png)

Shows which **modules** (parts of Carmen Blue) are switched on, and until when. Under **SUBSCRIPTIONS** you see the subscription (main contract) with its dates, a bar of the days left, and its status.

### Interface

![The Interface sub-tab](/screenshots/en/bu-licences-interface.png)

Shows the **interfaces** (connections to other systems) this Business Unit may use, with their dates, for example "No expiry". The line at the top says how many are in force, for example "1 of 1 licenses in force".

## Users

![The Users tab](/screenshots/en/bu-users.png)

The people who work in this Business Unit. The columns are **Name**, **Email**, **BU Role** and **BU Status**. **Admin** is shown in bold, **User** in light text.

| Action | How |
| --- | --- |
| Add a person who is already in the Cluster | Click **Add User**, find the person and choose them. |
| Change the person's role or status | Click the pencil icon on their row. Choose the **BU Role** and the **BU Status**, then save. |
| Take the person out of this Business Unit | Click the red bin icon on their row and confirm with **Remove**. |

When you set someone to **Inactive**, the dialog tells you if this frees a Cluster seat. If the person is still active in another Business Unit of the Cluster, no seat is freed.

To bring a person who is **not yet** in the Cluster, use **Invite user** on the [Users](/en/screens/users) screen instead.

## Cautions

- You cannot change the **Configuration** tab or any license. [Contact Carmen support](/en/getting-help).
- Removing a person from the Business Unit takes away their access to it.
- Text changes are lost if you leave the page without **Save changes**.

## Related guides

- [Business Units](/en/screens/business-units)
- [Users](/en/screens/users)
- [Licenses](/en/screens/licences)
- [Glossary](/en/glossary)
