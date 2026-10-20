# Data Import

## Where to find it and what it is for

Left menu, group **Organization** > **Data Import**. The screen's heading reads **Tenant Data Import**.

Use this screen to load a hotel's master data from a prepared Excel file called **Preconfig.xlsx** into the database of one **business unit** (a business unit is one hotel or branch) at a time, instead of entering every record by hand. Data you can load includes, for example:

- the company and hotel details (Company Profile)
- currencies, units, tax profiles, delivery points, departments and store locations
- product categories, sub-categories and item groups
- products and vendors

**Who uses this screen:** the team that sets up a new hotel, after the business unit is created and the technical team has set up the hotel's database. It is normally used once, at the start. You only see this menu if you have permission to manage data imports.

## Screenshot

![The Tenant Data Import screen before a business unit is selected](/screenshots/en/data-import-wizard.png)

## What you can do here

This screen is a step-by-step wizard.

1. **Select the business unit:** click **Select business unit** and pick the hotel that will receive the data. The button at the top right changes to **BU: hotel code**; click it again to change the hotel.
2. **Upload the file:** drag Preconfig.xlsx onto the drop area, or click to browse. Only `.xlsx`, up to 10 MB.
3. **Check the file:** the system checks that the file has every sheet and column it needs. The table lists every step with its **Sheet**, **Rows** and a status of **Ready**, **Sheet missing** or **Columns missing** (the **Missing** column shows what is missing). Click **Continue** to go on, or **Choose another file**.
4. **Work through the steps:** the list of steps is on the left. Each step is one sheet of the file, and step names are shown in English. Every step works the same way: **Preview** first, then **Import**.
5. **See the run summary:** the **Run summary** box shows the result of every step imported so far, with a **Re-run** button.

**In each step**

- **Preview:** the system reads every row without saving anything and sorts them into three kinds: `new` rows to add, `duplicate` rows that already exist, and `error` rows with a problem. Click a count to filter the table to that kind.
- **On duplicate:** choose what to do with rows that already exist.
- **Clear existing data first:** the **Soft-delete existing rows first** tick box (on some steps only) hides all of this step's existing data before importing. See the cautions below. <!-- plain-ok -->
- **New reference data:** if the file refers to data that does not exist yet, for example a delivery point not yet in the system, a box says new reference data will be created. You must tick **Create these N values** before you can import.
- **Import:** saves the data into the hotel's database straight away. The result shows how many rows were inserted, updated, skipped and failed.

**The Company Profile step** works differently from the others. The table compares **Current (BU)** with **Workbook** field by field and marks each as changed or the same. Click **Apply to BU** to write the file's values over the business unit's details (for example the details on the **Location** tab of [Business Units](/en/screens/organization/business-units)).

## Fields explained

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Select business unit** (required) | The hotel that receives the data | Check that its code matches the file |
| Preconfig.xlsx file (required) | The hotel's master data file | `.xlsx` only, up to 10 MB |
| **On duplicate** | What to do with rows that already exist | **Skip duplicates** (safest; existing data is left alone), **Update duplicates** (the file's values overwrite existing data) or **Report duplicates as errors** (duplicate rows are not imported and are counted as errors). Next to it, **Key:** shows which columns decide that a row is a duplicate |
| **Soft-delete existing rows first** | Hides all of this step's existing data before importing | Can be ticked only after **Preview**. You must type the **BU code** to confirm <!-- plain-ok --> |
| **Create these N values** | Lets the system create reference data that does not exist yet | Must be ticked when the new reference data box appears |
| **BU code** | The field in the confirmation box for clearing existing data | Type the hotel's code exactly; only then can you click **Confirm** |

## Common tasks

**Load a new hotel's data**

1. Prepare the hotel's complete Preconfig.xlsx file.
2. Open **Data Import** and click **Select business unit**.
3. Pick the hotel, then check that the button at the top right shows the right code.
4. Drag the file onto the drop area, or click to browse.
5. Look at the file check table. If any step shows **Sheet missing** or **Columns missing**, fix the file and click **Choose another file**.
6. Click **Continue**.
7. Click the first step in the list on the left.
8. Leave **On duplicate** at its default, or choose **Skip duplicates**.
9. Click **Preview** and look at the `new`, `duplicate` and `error` counts.
10. If there are `error` rows, click the count to see them, fix them in the file, and start again from step 4.
11. If the new reference data box appears, read the list and tick the box if it is correct.
12. Click **Import** and wait for the result.
13. Do the next steps in the order of the list until all are done.
14. Check the **Run summary** to make sure no step has failed rows.

Do the steps in the order of the list, because some steps need data from earlier ones. For example, Company Profile needs the Currency step to run first so that the default currency can be set. If it says **Not found — run Currency first**, run Currency, then click **Refresh**.

## Cautions

::: warning Import saves immediately and does not ask for confirmation
When you click **Import**, the system writes the data into the hotel's database straight away. There is no confirmation box, and it cannot be undone from this screen. Always check that you picked the right hotel, and look at the **Preview** first.
:::

::: warning Update duplicates overwrites existing data
If you choose **Update duplicates**, the values in the file overwrite data the hotel already has, such as product names or prices staff have changed. Use it only when you are sure the file holds the latest data.
:::

::: warning Clearing existing data before import
**Soft-delete existing rows first** hides all of that step's existing data, and related data elsewhere, before the new data is imported. The confirmation box shows how many rows will be hidden. Existing documents that refer to this data keep working, but staff will no longer see the old data in their lists. Use it only for a hotel that has not started using the system, or when the technical team advises it. <!-- plain-ok -->
:::

::: warning Company Profile overwrites the business unit's details
**Apply to BU** writes the file's values over the selected business unit's company and hotel details. If a warning says the BU code in the file does not match the selected business unit, you may have picked the wrong file or the wrong hotel. Stop and check before you continue.
:::

- If it says another step is still importing, wait for that step to finish first.
- If it says the import step catalog could not be loaded, your account usually does not have the data import permission yet. Tell a super admin.
- This screen loads the hotel's own data from a file. The basic system data every hotel needs is filled in on [Tenant Seed Data](/en/screens/organization/tenant-seeds).

## Related guides

There is no separate step-by-step guide for this screen. Related pages:

- [Set Up a New Hotel](/en/guides/setup-hotel): create the business unit before you import data
- [Business Units](/en/screens/organization/business-units)
- [Tenant Seed Data](/en/screens/organization/tenant-seeds)
