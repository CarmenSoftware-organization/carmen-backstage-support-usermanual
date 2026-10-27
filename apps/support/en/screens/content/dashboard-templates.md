# Dashboard Templates

## Where to find it and what it is for

Left menu, group **Content** > **Dashboard Templates**

Hotel users see a dashboard (a page of summary numbers and charts) in each part of Carmen Blue, such as Procurement or Inventory. Each box of numbers or chart is a **widget**. This screen defines those widgets. It has three tabs:

- **System widgets:** widgets shown on every module's dashboard (a module is one part of the program) in every business unit (hotel), within the scope you set.
- **BU default:** the starting set of widgets for the "BU dashboard", which each hotel can customise. This set does not reach any hotel until it is deployed.
- **Deploy:** copies the BU default to the business units you choose. Only people allowed to deploy see this tab.

## Screenshot

![The Dashboard Templates screen: the System widgets tab, Procurement page](/screenshots/en/dashboard-templates-list.png)

## What you can do here

**The System widgets and BU default tabs**

- **Pick a page:** the **Page** box chooses the module, e.g. **Procurement** or **Inventory**. The BU default tab also has **Main dashboard**.
- **Check the Thai titles:** a tag such as **Thai titles 8/8** shows how many widgets have a Thai title.
- **See the version:** the BU default tab shows a **Version N** tag for the current default set.
- **Read the table:** **Title** (Thai and English), **Dataset** (the data the widget shows), **Type** (e.g. kpi a single number, pie a pie chart, bar a bar chart), **Shown on** (system widgets only) and **Status**.
- **Add a widget:** the **Add widget** button.
- **Reorder:** the **Move up** / **Move down** arrows at the end of the row.
- **Edit** and **Delete:** the pencil and bin buttons at the end of the row.

**The Deploy tab**

- A table of every business unit with **Status**, **Deployed version**, **Deployed at** and **Customised at**.
- The status is **Never deployed**, **Customised** (the hotel changed its BU dashboard itself), **Outdated** (it has an older version), **Up to date**, **Not checked** or **Error**.
- The **Refresh status** and **Select outdated** buttons.
- **Mode:** **Skip customised business units** or **Overwrite everything**.
- The **Deploy to N business unit(s)** button, and a **Stop** button while it runs.

## Fields explained

**The Add widget / Edit widget box**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Dataset** (required) | The data the widget shows | e.g. "Purchase Request pending" |
| **Widget type** (required) | How it is drawn | The choices depend on the dataset, e.g. kpi, pie, bar |
| **Title (English)** | The title on the widget | Defaults to the dataset name if left empty |
| **Title (Thai)** | The Thai title | Optional; falls back to English. Enter the English title before the Thai one. |
| **Parameters** | Settings for the dataset | Only shown for datasets that have settings |
| **Only these business units** | Show the widget only at the chosen hotels | System widgets only. Leave empty to show it at every business unit. |
| **Hide from these business units** | Do not show the widget at the chosen hotels | System widgets only |
| **Active** | Turns the widget on or off | When off it is not shown, and it is not deployed with the BU default |

## Common tasks

**Add a widget**

1. Click the **System widgets** or **BU default** tab.
2. Choose the **Page** for the widget.
3. Click **Add widget**.
4. Choose a **Dataset**, then a **Widget type**.
5. Enter the titles and set the other fields as needed.
6. Click **Save**.

**Deploy the BU default to hotels**

1. Click the **Deploy** tab, then **Refresh status** to see the latest state.
2. Tick the business units you want, or click **Select outdated**.
3. Choose a mode. If unsure, use **Skip customised business units**.
4. Click **Deploy to N business unit(s)**.
5. If you chose **Overwrite everything**, the **Overwrite customised dashboards?** box appears. Type `OVERWRITE` to confirm.
6. Each row shows its result, e.g. **Deployed 5 widget(s)** or **Skipped (customised)**. A summary message appears at the end.

Deploying runs from your browser, a few business units at a time. Keep this page open until it finishes. If you leave the page or click **Stop**, business units not yet started are not deployed; those already deployed are not rolled back. If the BU default changes while deploying, the whole run stops — refresh the status and deploy again.

## Cautions

::: warning Deploying replaces the hotel's existing BU dashboard
Deploying copies the BU default over the BU dashboard of each chosen business unit. **Overwrite everything** replaces even dashboards the hotel customised itself — their changes are lost, and this screen cannot undo it.
:::

- Deleting a widget has no restore button. Business units that already received it keep their own copy until the next deploy.
- Changes on the **BU default** tab reach no hotel until you deploy them on the **Deploy** tab.
- If the BU default has no active widgets, the system will not let you deploy.

## Related guides

There is no step-by-step guide for this screen yet. See:

- [Business Units](/en/screens/organization/business-units)
- [Common Actions](/en/getting-started/common-actions)
