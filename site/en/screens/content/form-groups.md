# Form Groups

## Where to find it and what it is for

Left menu, group **Content** > **Form Groups**

Each kind of hotel document, such as a purchase request (PR), a purchase order (PO) or a goods received note (GRN), can have several print layouts, for example portrait and landscape. Each layout is a **report template** (a document layout) of type **Form**. This screen groups form templates by document code and lets you choose which one is the **default** (the main layout for that document). Each group can have only one default.

The templates' content is edited on [Report Templates](/en/screens/content/report-templates).

## Screenshot

![The Form Groups screen: one card per document code, with the default buttons](/screenshots/en/form-groups-list.png)

## What you can do here

- **Search** by group code or template name. See [Search](/en/getting-started/common-actions#search).
- Tick **Active only** to hide inactive templates.
- **Read a card:** one card per document code. The card header shows the code and how many templates it has. Each row has a round button (the default), the name, when it was last edited, an **Active** / **Inactive** tag and a **Standard** / **Custom** tag.
- **Set the default:** click the round button in front of a template's name.
- **Activate or deactivate:** the `⋯` button at the end of the row > **Activate** or **Deactivate**. It saves at once.
- **Edit a template:** the **Edit** button on the row opens that template's page.
- **Add a template to a group:** the **Add** button on a card, or **New Form Template** at the top, opens the new report template form with type **Form** (and the group code, if you came from a card) already chosen.

## Fields explained

This screen has no form of its own. The template fields are explained on [Report Templates](/en/screens/content/report-templates).

| What you see on a card | What it means |
| --- | --- |
| A selected round button | This template is the group's default |
| A faded round button you cannot click | This template is inactive. Activate it before making it the default. |
| **No default set — pick one.** | This group has no default yet |
| **Deactivate (default)** that cannot be clicked | You cannot deactivate the default. Make another template the default first. |

## Common tasks

**Change a document's default layout**

1. Find the card for the document code, e.g. **PO**.
2. Click the round button in front of the template you want.
3. The **Set default form template** box tells you which template it replaces.
4. Click **Set default**. A confirmation message appears.

**Turn off a template you no longer use**

1. If it is the default, make another template the default first.
2. Click the `⋯` button at the end of the row.
3. Click **Deactivate**. The message **Deactivated "..."** appears.

## Cautions

- Changing the default, and activating or deactivating, take effect the moment you click. There is no separate Save.
- This screen has no delete button. Templates are deleted on [Report Templates](/en/screens/content/report-templates), and that cannot be undone.

## Related guides

There is no step-by-step guide for this screen yet. See:

- [Report Templates](/en/screens/content/report-templates)
