# Super Admins

## Where to find it and what it is for

Left menu, group **Backstage** > **Super Admins**

::: tip Who sees this screen
This menu item and screen are shown only to Super Admins. Other users do not see the menu item, even if their role has every permission. If they open the link directly, they get the [Access Denied screen](/en/getting-started/common-actions#access-denied).
:::

**Super Admins** (people who can do everything in the system, with no permission checks) do not need roles, and they see every menu item that is not set to **Hidden** on [Feature Flags](/en/screens/backstage/feature-flags), including reserved ones such as **Backstage Migrations**. Use this screen to see who the Super Admins are, and to add or remove them.

Under the heading, the screen gives the count, for example "2 people on this platform bypass every permission check". Keep this number as small as possible.

## Screenshot

![The Super Admins screen listing two people; the first is marked You and the second has a Remove button](/screenshots/en/super-admins-list.png)

## What you can do here

- **Read the list:** name, email, user ID, account status and **Granted** date. Your own name is marked **You**.
- **Search.** See [Search](/en/getting-started/common-actions#search).
- **Export.** See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Add a Super Admin:** the **Add Super Admin** button opens a box where you pick a user.
- **Remove:** the red **Remove** button next to a name. It asks for confirmation. You cannot remove yourself — your row shows **You cannot revoke your own privileges** instead of the button.

Adding and removing **take effect as soon as you confirm**. This screen has no separate Save button.

## Fields explained

**The Add Super Admin box**

| Field | What it means | Example / notes |
| --- | --- | --- |
| User search box (required) | The person who gets Super Admin rights | Search by username or email. People who already are Super Admins show **Already super admin** and cannot be chosen. |

## Common tasks

**Add a Super Admin**

1. Click **Add Super Admin**.
2. Type a username or email, then choose the name that appears.
3. Click **Add Super Admin** in the box.
4. The system shows **Super admin added successfully** and the name appears in the list.

**Remove a Super Admin**

1. Click **Remove** next to that person's name.
2. The **Remove Super Admin** box asks you to confirm. Click **Remove**.
3. The system shows **Super admin removed successfully**.

After removal, that person can do only what their roles allow. If they have no role, they cannot use the Backstage admin screens. See [Backstage Users](/en/screens/backstage/user-backstage).

## Cautions

::: warning Adding a Super Admin
The person gets the power to do everything at once — including deleting data, updating every hotel's database, adding other Super Admins and removing you. There is no second confirmation after you click the button in the box. Check that the name and email are the right person before you click. If their work can be done with a role, give a role on [Backstage Users](/en/screens/backstage/user-backstage) instead.
:::

::: warning Removing a Super Admin
Takes effect at once. The person loses every right that did not come from a role. If they are in the middle of important work, such as a database update, the work may not be able to continue. Tell them before you remove them. If you remove someone by mistake, add them back the same way.
:::

- Always keep at least two Super Admins, in case one cannot sign in.

## Related guides

There is no step-by-step guide for this screen yet. See the related pages:

- [Backstage Users](/en/screens/backstage/user-backstage)
- [Backstage Roles](/en/screens/backstage/backstage-roles)
- [Common Actions](/en/getting-started/common-actions)
