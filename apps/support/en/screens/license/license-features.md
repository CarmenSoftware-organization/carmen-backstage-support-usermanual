# License Features

## Where to find it and what it is for

Left menu, group **License Management** > **License Features**. The **License Catalog** screen opens on the **Features** tab.

A **feature** (one capability of Carmen Blue, such as the accounts payable page or the accounts receivable page) is the smallest thing that can be sold. The system builds the feature list itself from the program, so you cannot add or delete features here. The only thing you set is each feature's **state**: still sellable, closed to new sales, or hidden.

Features are sold to customers through [License Modules](/en/screens/license/license-modules) (ready-made sets of features), not one at a time.

## Screenshot

![The Features tab: the cards counting each state and the features of the Accounting area](/screenshots/en/license-features-list.png)

## What you can do here

- **Search** by key or name. See [Search](/en/getting-started/common-actions#search).
- **Filter by state:** click the **All states**, **Sellable**, **Closed** or **Hidden** card. Each card shows how many features are in that state.
- **Export** to a CSV file. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Read the list:** features are grouped by **Feature area**, e.g. Accounting. The area's heading row is itself a feature. Each row shows the name, the **key** (the feature's internal name, used when talking to the technical team) and a description. Nested features are indented under their parent.
- **See how many hotels use it:** a number such as "4 BU" is how many business units hold this feature today. Point at the number to read the explanation.
- **Change the state:** click **Sellable**, **Closed** or **Hidden** at the end of the row. It saves at once and shows **State updated** — there is no separate Save.

## Fields explained

This screen has no form, only three states:

| State | What it means | Effect on customers |
| --- | --- | --- |
| **Sellable** | Sold as normal | Can be added to any module |
| **Closed** | No longer sold to new customers | Modules that already contain it keep it, but it cannot be added to a module. Customers who already bought it keep using it. |
| **Hidden** | Removed from the catalogue | The feature's menu disappears for every business unit that holds it, including customers who already paid. Their users can no longer open that page. |

## Common tasks

**Stop selling a feature without affecting existing customers**

1. Search for the feature by name or key.
2. Click **Closed** on its row.
3. The message **State updated** appears.

**Hide a feature**

1. Search for the feature and check its "BU" number to see how many hotels use it.
2. Click **Hidden** on its row.
3. If any business unit holds it, the **Hide this feature?** box tells you how many will lose the menu, and that any features nested under it stop working too.
4. Read it fully, then click **Hide it**, or cancel.

**Bring a hidden feature back**

1. Click the **Hidden** card to see only hidden features.
2. Click **Sellable** on its row. The menu returns to the business units within about a minute.

The hide confirmation says to set it back to "Active"; the button you actually click on this screen is **Sellable**.

## Cautions

::: warning Hiding takes effect immediately for paying customers
**Hidden** deletes nothing and can be undone, but while a feature is hidden, users in every business unit that holds it lose that page at once — together with every feature nested under it. If you only want to stop selling it to new customers, use **Closed**.
:::

- State changes save the moment you click. There is no Save or Cancel.

## Related guides

- [Manage a License](/en/guides/manage-license) — Part 6 creates a module and picks its features
- [License Modules](/en/screens/license/license-modules)
- [Licenses](/en/screens/license/licenses)
