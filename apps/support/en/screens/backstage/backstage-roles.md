# Backstage Roles

## Where to find it and what it is for

Left menu, group **Backstage** > **Backstage Roles**

A **role** (Backstage Role — a set of permissions that says what the people holding it can do in this admin app). For example, a "Support Staff" role might only view data, while "Backstage Admin" can do almost everything.

Use this screen to create and edit roles: to decide which **permissions** (permission to do one thing on one screen, such as view, create, edit or delete) a role includes. Giving a role to a person is done on [Backstage Users](/en/screens/backstage/user-backstage).

The flow in short: create the role here → give it to people on **Backstage Users** → they see the menus and buttons the role allows.

## Screenshot

The list

![The Backstage Roles screen with the broadest roles summary and the table of roles](/screenshots/en/backstage-roles-list.png)

Adding a role

![The new role screen with permissions grouped by menu and Settings on the right](/screenshots/en/backstage-roles-form.png)

A role's screen

![The Security Officer role screen with granted permissions as coloured buttons and a warning that it can grant itself more access](/screenshots/en/backstage-roles-detail.png)

The Permission Catalog

![The Permission Catalog screen listing every permission with a description](/screenshots/en/backstage-roles-permissions.png)

## What you can do here

**The list**

- **See the overview:** the number of roles (how many active, how many removed) and the **Broadest roles** compared with the total number of permissions. An orange bar with a warning icon = every permission.
- **Search** and **filter** by status. See [Search](/en/getting-started/common-actions#search) and [Filters](/en/getting-started/common-actions#filters).
- **Read the table:** **Name** (with description), **Permissions** (how many out of the total, across how many screens), **Status**, **Created** and **Updated**.
- **Row menu** (the `⋯` button): **Edit** and **Delete**. See [Row menu](/en/getting-started/common-actions#row-actions).
- **Permission Catalog:** this button opens a reference list of every permission in the system, with descriptions. It is read-only. This screen is not in the left menu; you reach it only from this button.
- **Export.** See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Add a role:** the **Add Role** button.

**A role's screen**

- The top sums up how many permissions the role has and across how many screens.
- If the role has permissions that let its holders give themselves more access (such as editing roles or giving roles to users), a **Can grant itself more access:** warning lists them.
- It opens in view mode. Click **Edit** to change it. See [View mode and edit mode](/en/getting-started/common-actions#view-edit).

## Fields explained

**Settings**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Name** (required) | The role's name | For example "Support Staff" |
| **Description** | Who the role is for | Optional. For example "Support team, view only" |
| **Status** | Tick **Active** for the role to take effect | |

**Permissions**

Permissions are grouped like the left menu. Each row is one screen (such as **Clusters**, **Users**) with buttons for the actions that can be allowed:

| Button on screen | What it means |
| --- | --- |
| **read** | Open and view that screen |
| **create** | Create new records |
| **update** | Edit records |
| **delete** | Delete records |
| **manage** | Manage everything on that screen (add, edit, delete or run actions) |
| **apply** | Make the system actually carry something out, such as updating a hotel's database structure |
| **detail** | See per-person details, such as individual activity events |

- Click an action button to choose or unchoose it. Granted buttons are solid. Dashed buttons are permissions that exist but this role does not have.
- Click **All** at the end of a row to choose every action for that screen, or **All** on a group heading to choose the whole group.
- While editing, permissions you have just added or removed are marked **(added)** or **(removed)**, and the top shows the number of changes, such as "+2 −1 permissions", so you can check before saving.

## Common tasks

**Create a new role for the support team**

1. Click **Add Role**.
2. Under **Settings**, type the **Name** and **Description**.
3. Under **Permissions**, click **read** for each screen the team needs to see.
4. Add other buttons only for work the team must do, such as **update** on **Users**.
5. Click **Create Role**.
6. Go to [Backstage Users](/en/screens/backstage/user-backstage) to give this role to the team.

**Remove a permission from a role**

1. Click the role's name in the table.
2. Click **Edit**.
3. Click the action button you want to remove. It is marked **(removed)**.
4. Check the number of changes at the top, then click **Save Changes**.

## Cautions

::: warning Permission changes affect everyone with the role
When you save, everyone who holds this role gains or loses those permissions at the same time. Before removing permissions, check on [Backstage Users](/en/screens/backstage/user-backstage) who holds the role.
:::

::: warning Deleting a role
The confirmation box warns that deleting cannot be undone. Deleted roles are counted in the "removed" figure at the top, but this screen has no restore button. To stop using a role for a while, untick **Active** instead.
:::

- Watch for permissions flagged with **Can grant itself more access:** — holders of that role can edit roles or give roles to themselves. Give it only to people you trust.
- Super Admins do not need roles, because they can already do everything. See [Super Admins](/en/screens/backstage/super-admins).

## Related guides

There is no step-by-step guide for this screen yet. See the related pages:

- [Backstage Users](/en/screens/backstage/user-backstage)
- [Access Denied screen](/en/getting-started/common-actions#access-denied)
- [Common Actions](/en/getting-started/common-actions)
