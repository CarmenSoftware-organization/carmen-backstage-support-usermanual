# Licenses

## Where to find it and what it is for

Left menu, group **License Management** > **Licenses**

A customer's **licenses** (what the customer has bought) come in several kinds. This screen brings them all together:

- **Subscription** (the contract for one business unit, with a start date, an end date and the feature bundles bought)
- **Seat license** (how many users one business unit can have)
- **BU quota** (how many business units, or hotels, one **cluster** can create — a cluster is one customer's hotel group)
- **Interface license** (permission for a business unit to connect to an outside system, such as an accounting system)

Use this screen to see the whole system at a glance, open one cluster's licenses, and add or change licenses. The steps for adding each kind are in [Manage a License](/en/guides/manage-license), so this page explains what the screen shows and links to the right part of that guide.

## Screenshot

The Licenses home

![The Licenses screen: Fleet capacity and the By cluster tab](/screenshots/en/licenses-list.png)

A cluster's licence page, BU quota tab

![A cluster's licence page: the BU quota tab and the Business units box](/screenshots/en/licenses-detail.png)

The Add Subscription form

![The Add Subscription form: Issued to, Contract period and the summary card on the right](/screenshots/en/licenses-subscription-form.png)

The Add BU quota license form

![The Add BU quota license form](/screenshots/en/licenses-bu-quota-form.png)

## What you can do here

**The home screen (Licenses)**

- **See fleet capacity:** the box at the top shows business units and users in use against what was bought, how many clusters are **active**, how many are **near limit**, and **BU quota expiring**. Click the **BU quota expiring** number to limit the **By cluster** table to those clusters.
- **Switch views** with five tabs. They show the same data arranged differently:
  - **By cluster:** one row per cluster with BU quota, seats, the quota expiry date and status
  - **By subscription:** every subscription of every cluster, with an **Add Subscription** button
  - **By seat license**, **By BU quota**, **By interface license:** every license of that kind, with a summary band of counts by status at the top
- **Search** clusters by name or code, or licenses by license number or reference. See [Search](/en/getting-started/common-actions#search).
- **Filter** the **By cluster** tab by status and **Licence state** (**No licence**, **Over BU limit**, **Seats full**), or turn on **Quota expiring**. When you pick more than one, a cluster must match all of them. See [Filters](/en/getting-started/common-actions#filters).
- **Export** the list to a CSV file. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Open a cluster's licence page:** click the cluster code (blue text).
- **See deleted licenses** (super admins only): on any tab except **By cluster**, click the **Deleted** card in the summary band. The list switches to deleted licenses, and each row has **Restore** and **Delete permanently**. Click **Back to list** to leave.

**A cluster's licence page**

- **Summary bar:** business units against quota, seats and subscriptions. On the right it lists anything that needs attention, such as being over quota or contracts expiring. When there is nothing, it says **Nothing needs attention**.
- **BU quota tab:** the **BU Quota Licenses** box shows the quota in force and every license, an **Add BU quota license** button, and **Edit**, **Cancel license** and **Remove** on each row. Below it, the **Business units** box ranks the hotels the same way the system decides which ones are covered: the head-office business unit (HQ) first, then the oldest. Units ranked past the quota show **Over limit** and are read-only until more quota is bought.
- **Seats tab:** one band per business unit with an **Add seat license** button, and **Edit** and **Remove** on each seat license.
- **Subscriptions tab:** the contracts of this cluster's business units, with an **Add subscription** button. Click **Edit** on a row to open the subscription (on the home screen's **By subscription** tab, click the subscription number).

**A subscription's page or a license's page**

- **Subscription:** change the dates and status in the **Amend contract** box, pick feature bundles in **Purchased groups**, and the **Delete** button at the bottom.
- **Seat / BU quota / interface license:** change the amount, coverage period and reference in **Amend this license**. A BU quota license has a **Cancel license** button at the bottom. An interface license has a **Delete** button at the bottom.

## Fields explained

Fields marked `*` on screen are required. The system numbers subscriptions and licenses itself when you save.

**The Add Subscription form**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Cluster** (required) | The customer's cluster | Already filled in if you came from the cluster's licence page |
| **Business Unit** (required) | The hotel this subscription is for | A subscription belongs to one business unit and cannot be moved to another later |
| **Start Date**, **End Date** (required) | The contract period | Both days are covered — a year that starts on 1 Jan ends on 31 Dec. Click a month under **Common terms** to pick that month's last day quickly. |

**A subscription's page (after it is created)**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Start Date**, **End Date** | The contract period | Change them in **Amend contract** |
| **Status** | The contract's status | **Active**, **Inactive** or **Expired** |
| **Purchased groups** | The feature bundles the customer bought | Tick as many as needed. The number beside each name is how many features it holds. See [License Feature Groups](/en/screens/license/license-feature-groups). |

**The seat, BU quota and interface license forms**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Business Unit** or **Cluster** | Who owns the license | Filled in from the page you came from; cannot be changed. On the BU quota form, **Cluster** shows the cluster's internal ID. |
| **License Number** | The license's number | Assigned automatically when you save |
| **Seats** (required, seat license) | How many users this license buys | e.g. `10`. Several active seat licenses for the same hotel add up. |
| **BU quota** (required, BU quota license) | The total number of business units the cluster may have | e.g. `3`. Licenses do not add up — only one counts. See Cautions. |
| **Feature group** (required, interface license) | The outside system to connect to | Only **Interface** groups that are **On sale** are listed |
| **Reference No.** | A number from the purchase paperwork | Optional, e.g. a purchase order number |
| **Has an end date** / **No expiry** | Whether the license ends | On BU quota and interface licenses. A seat license always needs an end date. |
| **Start Date** (required), **End Date** | The coverage period | **End Date** is required when **Has an end date** is chosen |
| **Note** | Extra notes | Optional; on BU quota and interface licenses |

After a license is created, only the amount (or feature group), the coverage period and the reference can change. The owner and the license number cannot. A cancelled license can no longer be changed — issue a new one instead.

## Common tasks

**See what a customer has bought**

1. On the **By cluster** tab, type the cluster's name or code in the search box.
2. Click the cluster code.
3. Read the summary bar, then click the **BU quota**, **Seats** and **Subscriptions** tabs for details.

There are screenshots in [Manage a License, Part 1](/en/guides/manage-license#open).

**Add a license**

- Subscription and feature bundles: [Manage a License, Part 2](/en/guides/manage-license#subscription)
- Seats: [Manage a License, Part 3](/en/guides/manage-license#seats)
- BU quota: [Manage a License, Part 4](/en/guides/manage-license#bu-quota)
- Interface license (added from the business unit's **Licenses** tab): [Manage a License, Part 5](/en/guides/manage-license#interface)

**Change an existing license**

1. On the cluster's licence page, click **Edit** on the license's row, or click the license number on the **By seat license**, **By BU quota** or **By interface license** tab.
2. Change the values in **Amend this license**. The **Unsaved changes** bar appears at the bottom.
3. Click **Save Changes**.

**Restore a deleted license** (super admins only)

1. On the Licenses home, click the tab for that kind of license, e.g. **By seat license**.
2. Click the **Deleted** card in the summary band. The message **Showing deleted licenses** appears.
3. On the license's row, click **Restore** and confirm. The license becomes active again.

## Cautions

::: warning Cancelling a BU quota license cannot be undone
Only BU quota licenses have **Cancel license**. A cancelled license stays in the list for auditing but stops granting quota, and it cannot be reopened. If it is the license currently granting quota, the confirmation tells you how the cluster's quota will change, immediately.
:::

::: warning Delete permanently cannot be undone
Super admins can delete a license permanently from the deleted list, and can delete a cancelled BU quota license from the **By BU quota** tab (the bin icon at the end of the row). You must type the license number to confirm. The record is gone for good and that license number is never issued again.
:::

- **Remove** (seat and BU quota licenses) and **Delete** (subscriptions and interface licenses) hide the record from the list, and a super admin can restore it — but they take effect immediately. Removing a seat license that is in force takes those seats away from the hotel at once. Removing the BU quota license in force stops the cluster from creating new business units until another license takes over.
- Several active seat licenses add up, but BU quota licenses do not. Only one counts: the one that started most recently. The others show **Superseded**. See [Manage a License, Part 4](/en/guides/manage-license#bu-quota).
- An interface license only works while the hotel's main subscription is active. If the main subscription expires, the connection stops even if the interface license's dates have not ended.
- A subscription cannot move to another business unit. If you created it for the wrong one, create a new subscription for the right business unit.

## Related guides

- [Manage a License](/en/guides/manage-license) — every step for subscriptions, seats, BU quota and interface licenses
- [Set Up a New Hotel](/en/guides/setup-hotel) — Part 3 adds seats and Part 4 creates the subscription for a new hotel
- [Business Units](/en/screens/organization/business-units) — the hotel's **Licenses** tab
