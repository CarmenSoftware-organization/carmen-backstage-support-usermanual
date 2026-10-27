# Report Templates

## Where to find it and what it is for

Left menu, group **Content** > **Report Templates**

A **report template** (the layout of a report or document that hotels view or print from Carmen Blue) comes in two types:

- **Form:** the printed layout of a document, such as a purchase request (PR) or a purchase order (PO). Each document can have several layouts and one default. See [Form Groups](/en/screens/content/form-groups).
- **List:** a report that hotel users open from their report list.

Use this screen to add or change templates, turn them on or off, choose which hotels see a report, back templates up to a file, and bring back the content of an older version.

A template is stored as XML text (a file format that describes a report's layout), and the screen shows that text. Usually the technical team writes the XML; administrators use this screen to configure, back up and restore. <!-- plain-ok -->

## Screenshot

The list

![The Report Templates screen: Import, Backup all, Export and the table](/screenshots/en/report-templates-list.png)

A template's page (view mode)

![A template's page: Template Info on the left and the Dialog XML tab on the right](/screenshots/en/report-templates-detail.png)

The new template form

![The New Report Template form and the editor toolbar](/screenshots/en/report-templates-form.png)

## What you can do here

**The list**

- **Search** by name. See [Search](/en/getting-started/common-actions#search).
- **Filter** by status, **Template Type**, **Source Type** and **Calculation Method**. See [Filters](/en/getting-started/common-actions#filters).
- **Export** the list to a CSV file. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Add a template:** the **Add Template** button.
- **Back up everything:** the **Backup all** button downloads every template in one file.
- **Back up some:** tick the rows you want, then click **Download backup (N)** in the bar that appears. See [Select several records at once](/en/getting-started/common-actions#bulk-select).
- **Import:** the **Import** button brings templates back from a backup file.
- **Read the table:** **Template Type**, **Report Group** (a **Default** tag marks the document's default layout), **Calculation Method**, a **Standard** or **Custom** tag, and **Status**.
- **Row menu** (the `⋯` button): **Edit**, **Change history**, **Download backup** and **Delete**. See [Row menu](/en/getting-started/common-actions#row-actions).

**A template's page**

- **Header:** the name, the version number (e.g. **v15**) and the data path, e.g. "Dialog · 3 fields → View ... → ..." (this part is for the technical team). Buttons: **Change history**, **XML versions**, **Download backup** and **Edit**. See [View mode and edit mode](/en/getting-started/common-actions#view-edit). <!-- plain-ok -->
- **Left side:** Template Info, Business Unit Scope, Calculation Method and Data Source.
- **Right side:** three editor tabs and a preview tab. The number beside each tab name is the line count.
  - **Dialog XML:** the filter window users fill in before opening the report, e.g. a date range or a vendor. <!-- plain-ok -->
  - **Content XML:** the layout of the report or document itself. <!-- plain-ok -->
  - **Export XML:** the data layout used when a user clicks Export data. <!-- plain-ok -->
  - **Preview:** a mock-up of the filter window built from the Dialog XML. Its controls are disabled and hold no real data — it only shows how the window will look. <!-- plain-ok -->
- **Editor toolbar:** in edit mode there are **Upload** (load a file from your computer), **Format** (tidy the indentation), **Copy**, **Download** and **Clear**. In view mode there are only **Copy** and **Download**. Below the editor it says **Valid XML** or points to the line with the error. <!-- plain-ok -->

## Fields explained

**Template Info**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Template type** (required) | Form or list | **Form** or **List**. The fields below change with the type. |
| **Name (EN)** (required) | The English name | Import uses this name to match templates |
| **Name (TH)** | The Thai name | Optional |
| **Description (EN)**, **Description (TH)** | What the report shows | Optional |
| **Report group** (required) | The template's group | Form: pick a document code such as `PR`, `PO`, `GRN`. List: type a group name such as `inventory`. |
| **Standard** | The template's tag | List type only. Ticked = **Standard** tag, unticked = **Custom** tag. |
| **Default for this report group** | The document's default layout | Form type only. Each group can have one default. If another template in the group is already the default, saving fails — change it on [Form Groups](/en/screens/content/form-groups) instead. |
| **Active** | Turns the template on or off | When off, hotel users do not see it |
| **Run report** | Shows the button to open the report in the report list | List type only |
| **Export data** | Shows the Export data button | List type only. Needs an Export XML too. If both are off, the report does not appear in the report list at all. <!-- plain-ok --> |

**Business Unit Scope and Calculation Method** (list type only — form templates always apply to every business unit)

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Allow** | Business units that see this report | Type a business unit code and press Enter, one at a time. Blank = every business unit. |
| **Deny** | Business units that do not see this report | Type a code and press Enter. Blank = none. |
| **Calculation Method** | The costing methods this report supports | **FIFO**, **Average**, **Average per location**. Leave all unticked if it works with every method. Business units using an unticked method will not see or run it. |

**Data Source** (for the technical team)

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Source Type**, **Source Name**, **Browse in BU**, **Source Parameters**, **Builder Key** | Where in the hotel's database the report gets its data | Types are View, Function, Procedure. Leave these to the technical team. <!-- plain-ok --> |

## Common tasks

**Change a template's text or settings**

1. On the list, click the template's name.
2. Click **Edit**.
3. Change the fields on the left, edit the text in an editor tab, or click **Upload** to replace that tab's text with a file from your computer.
4. Click the **Preview** tab to see the filter window users will get.
5. Click **Save Changes**. Every save creates a new version.

**View and restore an older version**

1. Open the template's page. If you are editing, save or cancel first.
2. Click **XML versions**. The **Version history** panel opens. Each version says whether it came from **Created**, **Updated**, **Imported** or **Restored from v...**. <!-- plain-ok -->
3. Expand the version you want to see its **Changed fields** and its content.
4. Click **Download this version** if you want to keep it as a file.
5. Click **Restore this version** and confirm in the **Restore v...?** box.

Restoring deletes no version. The system creates a new version from the chosen one's content (e.g. restoring v12 creates v16), and it does not change whether the template is its group's default.

**Back templates up to a file**

1. Click **Backup all**, or tick rows and click **Download backup (N)**, or click `⋯` > **Download backup** on one row.
2. The button shows progress, e.g. **Backing up 12/40**.
3. When it finishes, your browser downloads one .json file. <!-- plain-ok -->

The backup runs in your browser. If you close the page or the browser before it finishes, you get no file — wait for the **Backed up ... templates** message.

**Import from a backup file**

1. Click **Import**. The **Import report templates** box opens.
2. Click **Choose file** and pick a backup file (10 MB at most).
3. The table lists each template with a status: **New**, **Name exists** (a template with this English name is already in the system) or **Invalid**.
4. Choose an action for each row: **Create**, **Overwrite** or **Skip** — or click **Overwrite all**.
5. Click **Import N** and wait for the summary, e.g. "Created 2 · overwritten 1 · skipped 0 · failed 0".

The box cannot be closed while importing. Import runs in your browser one template at a time; if you close the browser part-way, the templates already done stay and the rest are not imported. Templates created by an import are never set as their group's default.

## Cautions

::: warning Deleting a template cannot be undone
The **Delete Report Template** box says **This action cannot be undone**. This screen has no restore button, and that template's version history can no longer be opened here. Always click **Download backup** before deleting; to bring it back, **Import** that file.
:::

::: warning Overwrite during import
**Overwrite** replaces the template in the system that has the same English name. Hotel users see the new version straight away. If you overwrote the wrong one, restore the previous version from **XML versions**. <!-- plain-ok -->
:::

- **Clear** in the editor removes all the text in that tab. Press Ctrl+Z (or ⌘+Z) to undo it before you save.
- Turning off **Active** or changing **Allow** / **Deny** affects hotel users once you save.

## Related guides

There is no step-by-step guide for this screen yet. See:

- [Form Groups](/en/screens/content/form-groups) — choose each document's default layout
- [Common Actions: Change history](/en/getting-started/common-actions#activity-trail)
- [Common Actions: Unsaved-changes warning](/en/getting-started/common-actions#unsaved-changes)
