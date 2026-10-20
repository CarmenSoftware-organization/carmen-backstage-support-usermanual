# Clusters

## Where to find it and what it is for

Left menu, group **Organization** > **Clusters**

A **cluster** (one customer's hotel group or company group) holds all the **business units** (a business unit is one hotel or branch) of the same customer. Use this screen to create a cluster for a new customer, see how much of its quota each cluster has used, change its name or logo, and manage who is in the cluster.

Every cluster has two limits:

- **Business unit quota:** how many business units it can create. It comes from the BU quota licences the customer bought.
- **Seats:** how many users it can have. It comes from each hotel's seat licences.

See how to add both in [Manage a License](/en/guides/manage-license).

## Screenshot

The cluster list

![Cluster Management: the Fleet Capacity box and the cluster table](/screenshots/en/clusters-list.png)

The new cluster form

![The new cluster form: Identity and First quota licence](/screenshots/en/clusters-form.png)

A cluster's page, Licensing tab

![A cluster's page: the header, the quota gauges and the Licensing tab](/screenshots/en/clusters-detail.png)

## What you can do here

**The list (Cluster Management)**

- **See the fleet capacity:** the box at the top adds up every cluster: business units used against business units bought, users against seats bought, how many clusters are **active**, how many are **near limit**, and how many have a **quota expiring**.
- **Search** clusters by code or name. See [Search](/en/getting-started/common-actions#search).
- **Filter** by status **Active** / **Inactive**, or tick **Show soft-deleted clusters** to see clusters that were deleted. See [Filters](/en/getting-started/common-actions#filters). <!-- plain-ok -->
- **Export** the list to a CSV file. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Read the table:** the **Business Units** and **Users** columns show used / limit, for example `1 / 10`. A red bar means the limit is reached or exceeded; `∞` means there is no limit yet. **Quota Expires** shows when the quota ends.
- **Create a cluster:** the **Add Cluster** button.
- **Open a cluster:** click its name.
- **Row menu** (the `⋯` button): **Edit**, **Change history** and **Delete**. See [Row menu](/en/getting-started/common-actions#row-actions).

**A cluster's page**

- **Header:** the name, the status badge, **Code**, **Alias**, the logo and the avatar. On the right, the **Business units** and **Seats** gauges show how much is used and how much is free.
- **Licensing tab:** the **Subscriptions** box (a subscription is the usage contract that says which features a hotel may use) shows this cluster's latest subscriptions, newest expiry first. Each row shows the subscription number, the expiry date, the number of features and the seats used. Click **Manage** on a row to open that subscription, or **Manage licences** to open the cluster's licence page. If there are none, it says **No subscriptions** with a **Create subscription** button.
- **Business Units tab:** the hotels in this cluster. You can search, and click a hotel to open its page. If there are more hotels than the quota allows, the extra rows carry an **Over limit** badge and are read-only until more quota is bought.
- **Users tab:** the people in this cluster with their **Role**. You can add users, change roles and remove users.
- **Change history:** the button at the top right. See [Change history](/en/getting-started/common-actions#activity-trail).

## Fields explained

**The new cluster form**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Code** (required) | The customer's short code, used to refer to this cluster | `GHG`. Use 2–20 English letters, digits, `-` or `_`, no spaces |
| **Alias** | A very short name for tight spaces | Optional; up to 3 letters or digits, for example `GHG` |
| **Name** (required) | The customer's or hotel group's full name | "Grand Hotel Group" |
| **Business units** (required) | In the **First quota licence** box: how many hotels the customer bought. Without any quota licence, no business unit can be created in this cluster | `2` |
| **Expires** (required) | The date the first quota licence ends | Pick a date, or tick **Never expires** instead |
| **Never expires** | Tick when the quota never ends | When ticked, you don't need an expiry date |

The card on the right of the form previews the cluster you are creating. There is nothing to fill in there.

**A cluster's page (edited in the header)**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Name** | The cluster's name | Click the name to change it |
| **Code** | The cluster's code | Click the code to change it; same rules as when creating |
| **Alias** | A short name of up to 3 characters | Shows **Not set** when empty |
| Status badge | **Active** or **Inactive** | Click the badge to switch |
| **Logo** and **Avatar** | The pictures shown with the cluster's name | Click a picture frame to choose a file |

**The Add User to Cluster box (Users tab)**

| Field | What it means | Example / notes |
| --- | --- | --- |
| User search (required) | The account to add | Type a username or email, then pick one. The account must already exist on [Users](/en/screens/organization/users) |
| **Cluster Role** (required) | What this person can do in the cluster | **User** can only use the system; **Admin** can also manage other users in the cluster. The line under the field shows how many seats are used |

## Common tasks

**Create a cluster for a new customer**

1. Click **Add Cluster**.
2. Enter the **Code** and **Name** (and **Alias** if you want one).
3. In the **First quota licence** box, enter the number of **Business units**, then pick **Expires** or tick **Never expires**.
4. Click **Create cluster**. A message confirms that the cluster was created, and its page opens.

The full procedure, from creating the cluster until staff can sign in, is in [Set Up a New Hotel](/en/guides/setup-hotel).

**Change the name, alias, status or logo**

1. Open the cluster's page.
2. Click the value you want to change in the header and type the new value, or click the status badge to switch it.
3. An **Unsaved changes** bar appears at the bottom.
4. Click **Save Changes**, or **Cancel** to discard your changes. See [Unsaved-changes warning](/en/getting-started/common-actions#unsaved-changes).

**Add a user to the cluster**

1. Open the cluster's page and click the **Users** tab.
2. Click **Add User**. The **Add User to Cluster** box opens.
3. Type a name or email, then pick the person.
4. Choose the **Cluster Role**.
5. Click **Add User**. A message confirms that the user was added to the cluster.

If the box says **Cluster license limit reached**, the seats are full. Add seats first, as in [Manage a License](/en/guides/manage-license#seats).

**Change a user's role in the cluster**

1. On the **Users** tab, find the user's row.
2. Change the value in the **Role** column to **Admin** or **User**.

**Remove users from the cluster**

1. On the **Users** tab, click the remove button on the user's row, or tick several rows and click **Remove selected users**. See [Select several records at once](/en/getting-started/common-actions#bulk-select).
2. The system asks you to confirm, for example **Remove "name" from this cluster?**
3. Confirm. The user's account still exists, but it is no longer in this cluster.

**Delete a cluster**

1. On the list, click `⋯` on the cluster's row and choose **Delete**.
2. If the cluster still has business units, the system refuses and says it still has business units that must be deleted or moved to another cluster first.
3. If it has none, the **Delete Cluster** box asks you to confirm. Click **Delete**.

## Cautions

::: warning Deleting a cluster cannot be undone
The confirmation box says the action **cannot be undone**. There is no restore button on this screen. A deleted cluster can still be seen with the deleted-records filter, but it can no longer be used. Check the name and code carefully before you delete.
:::

::: warning Removing users from a cluster
Removing a user from the cluster may not stop all of their access to its hotels, because their place in each business unit may remain. To really stop the person using the hotels in this cluster, also remove them from this cluster's business units on the [Users](/en/screens/organization/users) screen, or untick **Active** on their account (they then cannot sign in at all). If you remove the wrong person, you must add them back and set their role again yourself.
:::

- Changing the **Code** of a cluster that is in use may confuse people who know the old code. Tell your team before you change it.
- Switching the status to **Inactive** applies to the whole cluster, and after you click **Save Changes** the screen does not ask again. Make sure it is the right cluster. If you are not sure what it will mean for the hotels in the cluster, ask the technical team first.

## Related guides

- [Set Up a New Hotel](/en/guides/setup-hotel): Part 1 creates the cluster and Part 5 adds staff to it
- [Add a User](/en/guides/add-user): Part 3 adds a user to a cluster
- [Manage a License](/en/guides/manage-license): add business unit quota and seats
