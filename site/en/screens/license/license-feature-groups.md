# License Feature Groups

## Where to find it and what it is for

Left menu, group **License Management** > **License Feature Groups**. The **License Catalog** screen opens on the **Bundles** tab.

A **license feature group** (a ready-made bundle of features) is the "package" you pick when selling, instead of ticking features one by one. There are two kinds:

- **Standard:** sold on a hotel's main subscription. A subscription can have several.
- **Interface:** sold on an interface license (permission to connect to an outside system), one group per license.

Use this screen to create new groups, change the features in a group, set the order on the sales form, and withdraw groups you no longer sell. The **Features** tab on the same screen is the [License Features](/en/screens/license/license-features) page.

## Screenshot

The list (Bundles tab)

![The License Catalog screen, Bundles tab](/screenshots/en/license-feature-groups-list.png)

The New group form

![The New group form: Code, Kind, Name, Description, Sort order and Status](/screenshots/en/license-feature-groups-form.png)

An existing group's page

![The TEST License group page with the Features in this bundle panel on the right](/screenshots/en/license-feature-groups-detail.png)

## What you can do here

**The list**

- **Search** by code or name. See [Search](/en/getting-started/common-actions#search).
- Tick **Active only** to hide withdrawn groups.
- **Export** to a CSV file. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Create a group:** the **New group** button.
- **Read the table:** **Sort order** (position on the sales form), **Code** (Interface groups carry an Interface tag), **Name**, **Features** (e.g. "98 of 111 features"), **Subscriptions** (how many contracts use this bundle) and **Status**.
- **Row menu** (the `⋯` button): **Edit** and **Delete**. See [Row menu](/en/getting-started/common-actions#row-actions).

There is no button to copy a group. If you need a bundle similar to an existing one, create a new group and pick the features yourself.

**A group's page**

- The group's fields (see the table below).
- The **Features in this bundle** panel on the right: how many features are actually saved, out of the whole catalogue, and a line "... ticked · ... parent modules added". If contracts use this group, the panel warns that adding or removing a feature affects all of them at once.
- The **Features in this group** box: every feature, grouped by area (module). You can search, expand or collapse areas, and each area has buttons to take the whole area or none of it.

## Fields explained

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Code** (required) | The group's short code | e.g. `FULL_ACC`. Cannot be changed after the group is created. |
| **Kind** | Which kind of license this group is sold on | **Standard** or **Interface**. Can only be set when the group is created. |
| **Name** (required) | The name you see when picking it for a subscription | e.g. "Full Accounting" |
| **Description** | A description of the group | Optional |
| **Sort order** | Where this bundle sits on the sales form | Lower comes first. If another group has the same number, an orange message warns that the order on the sales form is not decided. |
| **Status** | Whether you still sell this bundle | **On sale** = can be picked for new subscriptions. **Withdrawn** = hidden from the sales form; contracts already on it are untouched. |
| **Features in this group** | The features in the bundle | Selecting a feature also grants its area, so the saved list can be longer than what you ticked |

## Common tasks

**Create a new group**

See the steps with screenshots in [Manage a License, Part 6](/en/guides/manage-license#feature-group).

**Add or remove features in a group**

1. On the list, click the group's code (blue text), or click `⋯` > **Edit**.
2. Check the **Features in this bundle** panel to see how many contracts use this bundle.
3. In the **Features in this group** box, tick or untick features.
4. Click **Save Changes** in the bottom bar. The message **Group updated** appears.

**Withdraw a group**

1. Open the group's page.
2. Under **Status**, click **Withdrawn**. If contracts are on this bundle, the screen reminds you to check them first.
3. Click **Save Changes**.

**Delete a group**

1. On the list, click `⋯` > **Delete**.
2. The **Delete this group?** box asks you to confirm. If contracts use this bundle, it tells you how many. Click **Delete**.

## Cautions

::: warning Deleting a group cannot be undone
The confirmation says the group and its feature list will be removed and this cannot be undone, and this screen has no restore button. If you only want to stop selling the bundle, set it to **Withdrawn** instead.
:::

- Adding or removing features in a group that contracts already use affects every contract on that group at once, not just new ones.
- **Code** and **Kind** cannot be changed after creation. If one is wrong, create a new group with the right values and set the old one to **Withdrawn**.

## Related guides

- [Manage a License](/en/guides/manage-license) — Part 2 picks bundles for a subscription, Part 6 creates a new group
- [Licenses](/en/screens/license/licenses)
- [License Features](/en/screens/license/license-features)
