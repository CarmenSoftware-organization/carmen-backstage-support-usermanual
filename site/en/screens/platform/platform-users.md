# Platform Users

## Where to find it and what it is for

Left menu, group **Platform** > **Platform Users** (the screen heading says **User Platform**)

This screen shows everyone who holds a **role** (a set of permissions that says what they can do in this admin app), and is where you give or take away roles. People with no role do not appear here and cannot use the Platform admin screens (except Super Admins, who are managed on their own screen).

The difference between the two screens:

- [Platform Roles](/en/screens/platform/platform-roles) decides **what a role can do**.
- This screen decides **who has which role**, and over what scope.

There are two **scopes**:

- **Platform-wide:** the role applies to every Cluster and every business unit.
- **Specific cluster:** the role applies only inside the chosen Cluster (one customer's group of hotels).

The user's account must exist before you can give a role. If it does not, create it on [Users](/en/screens/organization/users) first.

## Screenshot

The list

![The User Platform screen with the holders summary and the table of users with their roles and scope](/screenshots/en/platform-users-list.png)

A user's screen

![One user's screen with the Reaches the entire platform section, Roles & Scope, and Membership](/screenshots/en/platform-users-detail.png)

## What you can do here

**The list**

- **See the overview:** the number of **holders**, split into **Platform-wide** and **Cluster-scoped**, and the total number of **Assignments**. If any deactivated accounts still hold roles, there is a warning.
- **Search** and **filter** by status, **Role** and **Scope**. See [Search](/en/getting-started/common-actions#search) and [Filters](/en/getting-started/common-actions#filters).
- **Read the table:** **User** (name and email), **Roles & scope** and **Granted** (with who granted it).
- **Row menu** (the `⋯` button): **Manage roles** (opens the user's screen) and **Revoke all access**. See [Row menu](/en/getting-started/common-actions#row-actions).
- **Export.** See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Grant access:** the **Grant access** button opens the **Grant platform access** box.

**A user's screen**

- The top says whether the user **Reaches the entire platform** or how many Clusters they reach.
- **Roles & Scope:** the roles the user holds, with who granted each and when. A role the user gave to themselves is marked **Self-granted**. The **Add Role** and **Remove** buttons are here.
- **Membership:** the Clusters and business units the user belongs to as staff. This part is view-only and is not a permission in this admin app.

Granting, adding, removing and revoking roles **take effect as soon as you confirm**. This screen has no separate Save button.

## Fields explained

**The Grant platform access box** (from the list)

| Field | What it means | Example / notes |
| --- | --- | --- |
| **User** (required) | The person who gets the role | Search by name or email |
| **Roles** (required) | The roles to give | You can choose several. Roles the user already has show **Already granted**. |
| **Scope** | How widely the role applies | **Platform-wide** or **A specific cluster**. Every role in this request gets the same scope. |
| **Cluster** (required for a specific cluster) | The Cluster where the role applies | |

**The Add Role box** (from a user's screen)

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Role** (required) | The role to add | One role at a time |
| **Scope** | **Platform-wide** or **Specific cluster** | |
| **Cluster** (required for a specific cluster) | The Cluster where the role applies | |

## Common tasks

**Let a new staff member use the admin app**

1. Check on [Users](/en/screens/organization/users) that the person has an account. If not, create it first. See [Add a User](/en/guides/add-user).
2. On this screen, click **Grant access**.
3. Search for and choose the **User**.
4. Tick the **Roles** you want.
5. Choose the **Scope**. If you choose **A specific cluster**, choose the **Cluster**.
6. Click **Grant access**. The system shows **Access granted** and the user appears in the table.

**Remove one role from a user**

1. Click the user's name in the table (or choose **Manage roles** from the row menu).
2. On the role you want, click **Remove**.
3. The **Remove role** box asks you to confirm. If it is the last role, the box warns that the user will no longer appear on this screen. Confirm.

**Take away all access when someone leaves**

1. In the list, click the `⋯` button on the user's row.
2. Choose **Revoke all access**.
3. The **Revoke all platform access** box says how many roles will be removed. Click **Revoke all**.
4. The system confirms the access was revoked.

## Cautions

::: warning Takes effect at once
Granting and removing roles take effect as soon as you confirm. There is no Save or Cancel. If you remove a role by mistake, you must grant it again. The record of who originally granted it and when does not come back.
:::

- Removing roles does not delete the user's account, and does not take the user out of the Clusters or business units they belong to.
- **Self-granted** means that person gave the role to their own account. Check that this was intended.
- Super Admins are managed on [Super Admins](/en/screens/platform/super-admins), not here.

## Related guides

- [Add a User](/en/guides/add-user) (create the account before giving a role)

Related pages:

- [Platform Roles](/en/screens/platform/platform-roles)
- [Users](/en/screens/organization/users)
- [Common Actions](/en/getting-started/common-actions)
