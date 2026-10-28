# License Modules

## Where to find it and what it is for

Left menu, group **License Management** > **License Modules**. The **License Catalog** screen opens on the **Modules** tab.

A **module** (a ready-made set of licence features) is what you pick when selling, instead of ticking features one by one. There are two kinds:

- **Standard:** sold on a hotel's main subscription. A subscription can have several.
- **Interface:** sold on an interface license (permission to connect to an outside system), one module per license.

Use this screen to create new modules, change the features in a module, set the order on the sales form, and withdraw modules you no longer sell. The **Features** tab on the same screen is the [License Features](/en/screens/license/license-features) page.

## Screenshot

The list (Modules tab)

![The License Catalog screen, Modules tab](/screenshots/en/license-modules-list.png)

The New module form

![The New module form: Code, Kind, Name, Description, Sort order and Status](/screenshots/en/license-modules-form.png)

An existing module's page

![The TEST License module page with the Features in this module panel on the right](/screenshots/en/license-modules-detail.png)

## What you can do here

**The list**

- **Search** by code or name. See [Search](/en/getting-started/common-actions#search).
- Tick **Active only** to hide withdrawn modules.
- **Export** to a CSV file. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Create a module:** the **New module** button.
- **Read the table:** **Sort order** (position on the sales form), **Code** (Interface modules carry an Interface tag), **Name**, **Features** (e.g. "98 of 111 features"), **Subscriptions** (how many contracts use this module) and **Status**.
- **Row menu** (the `⋯` button): **Edit** and **Delete**. See [Row menu](/en/getting-started/common-actions#row-actions).

There is no button to copy a module. If you need a module similar to an existing one, create a new module and pick the features yourself.

**A module's page**

- The module's fields (see the table below).
- The **Features in this module** panel on the right: how many features are actually saved, out of the whole catalogue, and a line "... ticked · ... parent feature areas added". If contracts use this module, the panel warns that adding or removing a feature affects all of them at once.
- The **Features in this module** box: every feature, grouped by feature area. You can search, expand or collapse areas, and each area has buttons to take the whole area or none of it.

## Fields explained

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Code** (required) | The module's short code | e.g. `FULL_ACC`. Cannot be changed after the module is created. |
| **Kind** | Which kind of license this module is sold on | **Standard** or **Interface**. Can only be set when the module is created. |
| **Name** (required) | The name you see when picking it for a subscription | e.g. "Full Accounting" |
| **Description** | A description of the module | Optional |
| **Sort order** | Where this module sits on the sales form | Lower comes first. If another module has the same number, an orange message warns that the order on the sales form is not decided. |
| **Status** | Whether you still sell this module | **On sale** = can be picked for new subscriptions. **Withdrawn** = hidden from the sales form; contracts already on it are untouched. |
| **Features in this module** | The features in the module | Selecting a feature also grants its feature area, so the saved list can be longer than what you ticked |

## Common tasks

**Create a new module**

See the steps with screenshots in [Manage a License, Part 6](/en/guides/manage-license#module).

**Add or remove features in a module**

1. On the list, click the module's code (blue text), or click `⋯` > **Edit**.
2. Check the **Features in this module** panel to see how many contracts use this module.
3. In the **Features in this module** box, tick or untick features.
4. Click **Save Changes** in the bottom bar. The message **Module updated** appears.

**Withdraw a module**

1. Open the module's page.
2. Under **Status**, click **Withdrawn**. If contracts are on this module, the screen reminds you to check them first.
3. Click **Save Changes**.

**Delete a module**

1. On the list, click `⋯` > **Delete**.
2. The **Delete this module?** box asks you to confirm. If contracts use this module, it tells you how many. Click **Delete**.

## Cautions

::: warning Deleting a module cannot be undone
The confirmation says the module and its feature list will be removed and this cannot be undone, and this screen has no restore button. If you only want to stop selling the module, set it to **Withdrawn** instead.
:::

- Adding or removing features in a module that contracts already use affects every contract on that module at once, not just new ones.
- **Code** and **Kind** cannot be changed after creation. If one is wrong, create a new module with the right values and set the old one to **Withdrawn**.

## Related guides

- [Manage a License](/en/guides/manage-license) — Part 2 picks modules for a subscription, Part 6 creates a new module
- [Licenses](/en/screens/license/licenses)
- [License Features](/en/screens/license/license-features)
