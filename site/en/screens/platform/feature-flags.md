# Feature Flags

## Where to find it and what it is for

Left menu, group **Platform** > **Feature Flags**

::: tip Who sees this screen
This menu item is shown only to Super Admins and to people whose role includes the permission to manage feature flags. In the system's starting setup, only the Platform Admin role has that permission. Other users do not see the menu item. If they open the link directly, they get the [Access Denied screen](/en/getting-started/common-actions#access-denied).
:::

**Feature Flags** (controls for how each menu item appears) are used to hide or disable menu items that are not ready yet. These settings apply to **everyone** who uses this admin app — including Super Admins and you — not to one role.

Each menu item has three states:

| State | What users see |
| --- | --- |
| **Active** | Works as usual |
| **Coming soon** | The menu item is faded with a **Coming soon** label and cannot be clicked. Opening the link directly shows the [Coming soon screen](/en/getting-started/common-actions#coming-soon). |
| **Hidden** | The menu item is not shown at all. Opening the link directly shows [Page not found](/en/getting-started/common-actions#not-found). |

These switches change only what this admin app shows. They do not stop anything running in the background, and do not affect the Carmen website the hotels use.

## Screenshot

![The Feature Flags screen listing menu items grouped like the left menu; each row has Active, Coming soon and Hidden buttons](/screenshots/en/feature-flags-list.png)

## What you can do here

- **Read the states:** menu items are grouped in the same order as the left menu (**Organization**, **License Management**, **Content** and so on), plus the **Cluster administration** group, which holds the Cluster admins' menu items. Under each name is the menu item's English code.
- **Change a state:** click **Active**, **Coming soon** or **Hidden** in the menu item's row.
- **Save:** click **Save Changes** at the top right. Changes do not take effect until you save. If you leave the page before saving, the system warns you. See [Unsaved-changes warning](/en/getting-started/common-actions#unsaved-changes).
- **Remove unknown keys:** if there is an **Unknown keys** card (saved values for menu items this version of the program no longer has), click **Remove** and confirm, then click **Save Changes**. The removal happens when you save.

Some screens have no switch on purpose, so the system cannot lock itself out: **Dashboard**, this screen (**Feature Flags**), your profile and the sign-in page. You can therefore always come back here to turn a menu item on again.

## Fields explained

This screen has no form to fill in. Each row has the three state buttons described in the table above.

## Common tasks

**Hide a menu item that is not ready**

1. Find the menu item's row in the group that matches the left menu.
2. Click **Coming soon** (if you want users to know it is on the way) or **Hidden** (if you do not want them to see it at all).
3. Click **Save Changes**.
4. The system shows **Feature states saved**. Your own left menu changes at once.

**Turn a menu item back on**

1. Find the menu item's row.
2. Click **Active**.
3. Click **Save Changes**.

Other users who have the app open may still see the old menu until they reload the page.

## Cautions

::: warning Hidden means nobody can reach the screen
**Hidden** removes the menu item from everyone's left menu, and makes direct links to that screen show **Page not found** — for Super Admins and for you too. Saved or shared links stop working at once. Before hiding a menu item people use, such as **Licenses** or **Users**, tell the team first. If you hide something by mistake, come back here and choose **Active** — you can always do that.
:::

- **Coming soon** and **Hidden** do not stop work in the background. Scheduled jobs or other programs that use that menu item's data keep working as usual.
- Changes on this screen do not change anyone's permissions. To stop certain people from seeing a menu item, change their [Platform Roles](/en/screens/platform/platform-roles) instead.

## Related guides

There is no step-by-step guide for this screen yet. See the related pages:

- [The Main Screen](/en/getting-started/main-screen)
- [Common Actions](/en/getting-started/common-actions)
