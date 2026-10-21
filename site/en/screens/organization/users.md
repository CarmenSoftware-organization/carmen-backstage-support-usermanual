# Users

## Where to find it and what it is for

Left menu, group **Organization** > **Users**. The screen's heading reads **User Management**.

This screen holds the account of everyone who uses Carmen Blue, such as hotel staff. Use it to create accounts, change names, switch accounts off for a while, set a user's password, and decide which **business units** (a business unit is one hotel or branch) a user can access.

A user must be in a **cluster** (one customer's hotel group) before they can be given that cluster's business units. Adding a user to a cluster is done on [Clusters](/en/screens/organization/clusters).

## Screenshot

The list

![User Management: the Directory box and the user table](/screenshots/en/users-list.png)

The Add User form

![The Add User form: sign-in details, display name and the Active box](/screenshots/en/users-form.png)

A user's page

![A user's page: the header, the Access box and the MCP tokens box](/screenshots/en/users-detail.png)

## What you can do here

**The list (User Management)**

- **See the directory:** the total number of users, split into **Active**, **Inactive** and **Archived** (deleted), and small pictures of the users **Recently added**.
- **Search** by name or email. See [Search](/en/getting-started/common-actions#search).
- **Filter** by status **Active** / **Inactive**, or tick **Show soft-deleted users**. See [Filters](/en/getting-started/common-actions#filters). <!-- plain-ok -->
- **Read the table:** the **User** column shows the name and email. The **BU** column shows the user's business units as active / total, for example `2 / 2`; `-` means none.
- **Export** to a CSV file. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Fetch Keycloak:** fetches accounts from the central sign-in system into this list. Use it when an account was created in the central sign-in system but does not show here yet. If you are not sure, ask the technical team before you click it.
- **Add a user:** the **Add User** button.
- **Open a user:** click the user's name.
- **Row menu** (the `⋯` button): **Edit**, **Change history**, **Delete** and **Hard Delete**. See [Row menu](/en/getting-started/common-actions#row-actions). <!-- plain-ok -->
- **Select several rows:** tick the boxes at the start of the rows, then use **Delete** or **Hard Delete** on all of them. These tick boxes are only shown to **super admins**. See [Select several records at once](/en/getting-started/common-actions#bulk-select). <!-- plain-ok -->

**A user's page**

- **Header:** the name, email, status badge, and a line saying how many business units in how many clusters the user can access. If none, it says **No access assigned yet**.
- **Buttons at the top right:** **Change history**, **Change Password** and **Edit**.
- **Access:** each cluster with the user's cluster role, and under it the business units with their **BU Role** and status. Click **Add BU** to give the user another business unit, or the bin icon to remove one.
- **MCP tokens:** keys the user created to connect an AI assistant to their own account, with name, created date, expiry date, last used date and status. **Revoke all MCP tokens** stops every token working immediately.

## Fields explained

**The Add User form and the Edit account form**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Username** (required) | The name used to sign in | Must be an email address, for example `somchai@example.com`. Cannot be changed after the account is created |
| **Email** (required) | The user's email | Use the same email as the username |
| **First Name** (required) | The user's first name | `Somchai` |
| **Middle Name** | A middle name, if any | Optional |
| **Last Name** (required) | The user's last name | `Jaidee` |
| **Alias Name** | A short name shown instead of the full name where space is tight | Optional; up to 3 letters or digits, for example `SOM` |
| **Active** | Switches the account on or off | Ticked by default. An inactive user keeps every assignment but cannot sign in |

**The Change Password box (sets a password for this user)**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **New Password** (required) | The password the user will sign in with | At least 6 characters. You do not need the old password |
| **Confirm Password** (required) | Type the new password again | Must match the first field exactly |

**The Add Business Unit box (the Add BU button)**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Cluster** (required) | The business unit's cluster | Only clusters the user is already in can be picked |
| **Business Unit** (required) | The hotel the user will access | If it says there are no available business units in this cluster, the user is already in every hotel of that cluster |
| **BU Role** (required) | What the user can do in this hotel | For example **Admin** |

## Common tasks

**Create an account**

1. Click **Add User**.
2. Enter the same email in **Username** and **Email**.
3. Enter the **First Name** and **Last Name**.
4. Leave **Active** ticked.
5. Click **Create User**. The user's page opens.
6. Next, set a password and add the user to a cluster and business unit, as in [Add a User](/en/guides/add-user).

**Switch an account off for a while**

1. Open the user's page and click **Edit**.
2. Untick **Active**.
3. Click **Save Changes**.

The user can no longer sign in, but every assignment is kept. Tick it again to switch the account back on. This is safer than deleting.

**Set a new password for a user who forgot theirs**

1. Open the user's page and click **Change Password**.
2. Type the **New Password** and **Confirm Password**.
3. Click **Update Password**. A message confirms that the password was changed.
4. Give the password to the user through a safe channel.

**Give a user a business unit, or remove one**

1. Open the user's page.
2. In the **Access** box, click **Add BU**.
3. Choose the **Cluster**, then the **Business Unit** and the **BU Role**.
4. Click **Add**. A message confirms that the business unit was assigned.
5. To remove a business unit, click the bin icon on its row and confirm.

If the cluster you need is not in the list, add the user to that cluster first on [Clusters](/en/screens/organization/clusters).

**Delete a user**

1. On the list, click `⋯` on the user's row and choose **Delete**.
2. The **Delete User** box asks you to confirm. Confirm.
3. The user disappears from the table, but can still be seen when you tick **Show soft-deleted users**. <!-- plain-ok -->

**Delete a user permanently**

1. Click `⋯` on the user's row and choose **Hard Delete**. <!-- plain-ok -->
2. The **Permanently Delete User** box opens.
3. Type that person's username exactly in the **Enter username to confirm** field.
4. Click **Permanently Delete**.

**Delete several users at once (super admins only)**

1. Tick the boxes of the users you want. A bar shows **N selected**.
2. Click **Delete**, or **Hard Delete** to delete permanently. <!-- plain-ok -->
3. If you chose to delete permanently, the box shows a 6-character code. Type it into **Enter the 6-character code**, then click **Permanently Delete**.
4. The system tells you how many were deleted and how many failed.

## Cautions

::: warning Permanent delete cannot be undone
**Hard Delete** removes the user and all related data from the system and **cannot be undone**. If you only want to stop the person signing in, switch the account off with **Active** instead. <!-- plain-ok -->
:::

::: warning Even a normal delete has no restore button on screen
The single-user delete box says **This action cannot be undone**, while the multi-user delete box says the users can be restored later. But this screen has no restore button. If you delete the wrong person, tell the technical team.
:::

::: warning Revoke all MCP tokens
This button stops every one of the user's tokens immediately and **cannot be undone**. Any AI assistant the user connected stops working. Use it when the user leaves, or when you suspect a token has leaked.
:::

- The **Username** cannot be changed after the account is created. If the email was typed wrongly, create a new account and delete the wrong one.
- Removing a business unit from a user stops them accessing that hotel immediately.
- Do not send the username and password together in the same email.

## Related guides

- [Add a User](/en/guides/add-user): create the account, set the password, and add the user to a cluster and business unit
- [Set Up a New Hotel](/en/guides/setup-hotel): Part 5 adds staff to the cluster and hotel
- [Manage a License](/en/guides/manage-license#seats): add seats when a hotel has used them all
