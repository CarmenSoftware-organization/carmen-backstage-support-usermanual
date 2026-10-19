# Common Actions

Most screens in the app work the same way. This page explains the shared parts once. The Screen Reference pages link back here instead of repeating them.

The examples on this page use the [Users](/en/screens/organization/users) screen, but other screens work the same way. You may see more or fewer buttons, depending on the screen and your role.

## List screens {#lists}

A list screen shows records in a table. One row is one record.

- **Click a record's name** (blue text) to open its details.
- **Click a column heading** that has arrows to sort by it. Click again to switch between ascending and descending.
- **Below the table** you see which records are shown, for example **Showing 1–10 of 53**. Click a page number or arrow to move between pages.
- **Show 10 / 25 / 50 / 100** in the bottom-right corner sets how many rows appear per page.

## Search {#search}

1. Click the search box above the table, or press <kbd>Ctrl</kbd> + <kbd>K</kbd> (on a Mac: <kbd>⌘</kbd> + <kbd>K</kbd>).
2. Type what you are looking for, such as a name, code or email.
3. The table shows matching records right away. There is no search button to press.

Click the **×** at the end of the search box to clear it.

If nothing matches, you see **No matches found**. Try a shorter word, or clear your filters.

## Filters {#filters}

Filters let you see only the records you want, for example only **Active** ones.

1. Click **Filters** next to the search box.
2. A filter panel opens on the right. Choose what you want.
3. Click the **×** in the panel's top-right corner, or click outside the panel, to close it.

![The filter panel on the Users screen](/screenshots/en/list-filter-panel.png)

Common filters:

- **Status**: **Active** (in use) or **Inactive** (switched off for now, not deleted).
- **Deleted**: tick this to also show records that were deleted. Deleted records are normally hidden from the table.

The filters you chose appear as tags above the table, after **Filters:**. Click the **×** on a tag to remove that filter, or click **Clear all** to remove them all.

## Export to a CSV file {#export}

Use this when you want to open the list in Excel or another spreadsheet program.

1. Search or filter the list first, so it shows what you need.
2. Click **Export** or **Export CSV** to the right of the screen title.
3. Your browser downloads the file, and the app shows **Data exported successfully**.

The file name ends with the export date, for example `users-2026-10-20.csv`.

## Row menu {#row-actions}

The **⋯** button at the end of a row opens a menu of actions for that record.

![The row actions menu](/screenshots/en/list-row-actions.png)

Common actions:

- **Edit**: opens the record in edit mode.
- **Change history**: shows who changed what, and when. See [Change history](#activity-trail).
- **Delete**: deletes the record. It disappears from the table, but you can still see it with the **Deleted** filter. On some screens it can be restored.
- **Hard Delete** (on some screens **Delete permanently**): removes the record and its related data from the system completely. <!-- plain-ok -->

::: warning Permanent delete cannot be undone
After a permanent delete the data is gone for good and cannot be restored. The app asks you to type the record's name or code to confirm. Make sure you picked the right record. If you are not sure, use **Delete** instead.
:::

## Select several records at once {#bulk-select}

Some screens let you act on several records at once.

1. Tick the box at the start of each row you want, or tick the box in the table heading to select every row on this page.
2. A bar above the table shows **N selected** with action buttons, such as **Delete** or **Hard Delete**. <!-- plain-ok -->
3. Click the action you want, then confirm in the box that appears.
4. Click **Clear** to unselect everything.

![The action bar when several records are selected](/screenshots/en/list-bulk-selected.png)

If some records fail, the app tells you how many worked and how many failed, for example **Deleted 3, 1 failed**.

## View mode and edit mode {#view-edit}

When you open a record, it opens in view mode first, so you do not change anything by accident.

**View mode**: you can see the details but not change them. At the top there are buttons such as **Change history** and **Edit**.

![A record in view mode](/screenshots/en/form-view-mode.png)

**Edit mode**: click **Edit** and the boxes become editable. Boxes marked with **\*** are required.

![A record in edit mode](/screenshots/en/form-edit-mode.png)

Some screens, such as [Clusters](/en/screens/organization/clusters) (hotel groups) and [Business Units](/en/screens/organization/business-units) (each one hotel or branch), let you change one detail at a time without clicking **Edit** first.

1. Click the detail you want to change.
2. Type the new value.
3. Press <kbd>Enter</kbd> or click somewhere else to keep it, or press <kbd>Esc</kbd> to go back to the old value.

## Save and Cancel {#save-cancel}

1. Make your changes.
2. Click **Save** or **Save Changes** (or press <kbd>Ctrl</kbd> + <kbd>S</kbd>; on a Mac: <kbd>⌘</kbd> + <kbd>S</kbd>).
3. A confirmation message appears in the corner of the screen when it is saved.

If you do not want to keep your changes, click **Cancel** or press <kbd>Esc</kbd>. Everything goes back to how it was.

If saving fails, the app tells you why in the corner of the screen, or under the box that is not filled in correctly. Fix it as the message says, then save again.

## Unsaved-changes warning {#unsaved-changes}

- On some screens, when you have changed something but not saved it, a bar appears along the bottom of the screen saying **Unsaved changes**, with **Cancel** and **Save Changes** buttons.
- If you close the tab, refresh the page or leave the page before saving, your browser asks whether you really want to leave. If you leave, your changes are lost.
- If someone else changed the same record and saved before you, the app shows **This record was changed by someone else** and loads the latest version. Make your changes again.

## Change history {#activity-trail}

Use this to see who changed what in a record, and when.

1. Open the record and click **Change history** (or choose it from the row's **⋯** menu on a list screen).
2. A panel on the right lists the changes, newest first. Each line says whether the record was created, edited or deleted, when, and by whom.
3. Click the arrow at the end of a line to see which details changed, from what to what.
4. If there is a lot of history, click **Load more** at the bottom.

![The change history panel](/screenshots/en/activity-trail.png)

Good to know:

- Secret details, such as passwords, only show **changed (value hidden)**.
- Changes made before the system started keeping history are not shown.

## Access Denied screen {#access-denied}

If you open a screen your role does not allow, you see **Access Denied** with the message **You don't have permission to access this page.**

- Click **Go Back** to return to the previous page.
- Click **Go to Dashboard** to go to the first page.

If you need this screen, ask a Super Admin to add the permission to your role. See [Platform Roles](/en/screens/platform/platform-roles).

## Coming soon screen {#coming-soon}

Some menu items are faded, carry a **Coming soon** badge and cannot be clicked. If you open such a screen from a link, you see **Coming soon** with the message **This feature is still being built. It will appear here once it is ready.**

These screens are set on [Feature Flags](/en/screens/platform/feature-flags). It is not a problem with your permissions.

## Page not found {#not-found}

If a link is wrong or a page has moved, you see **Page Not Found**. Click **Go Back**, or pick a screen from the left menu.

## Related pages

- [The Main Screen](./main-screen)
- [Glossary](../glossary)
- [Add a User](/en/guides/add-user)
