# SQL Workbench

## Where to find it and what it is for

Left menu, group **Database** > **SQL Workbench**

Use this screen to give commands **directly to one hotel's database**, by typing them in **SQL** (the language used to look at or change data in a database). On screen, a hotel's database is called a **tenant** (each hotel's own database). Every **business unit** (one hotel or branch) has its own database, and you work with one at a time.

SQL commands come in two kinds:

- **Commands that only look at data** start with `SELECT` (or `WITH`). They only read data and show it. They change nothing in the database. <!-- plain-ok -->
- **Commands that change data**, such as `INSERT` (add), `UPDATE` (change), `DELETE` (remove rows), `TRUNCATE` (empty a whole table), `CREATE` / `ALTER` / `DROP` (create, change or remove structure). These change the hotel's real data straight away. <!-- plain-ok -->

**Who uses this screen, and when:** it is a tool for the technical team, used to find the cause when a hotel reports that its data looks wrong, or when the technical team needs to build a special report. For everyday work, such as changing a user or a business unit, use the screen for that job, not this one: the normal screens check that your changes are valid, and this screen does not.

## Screenshot

Before you choose a business unit, the screen is empty and says **No tenant selected**.

![The SQL Workbench screen before a business unit is chosen, with the Choose BU button and the message Select a business unit to begin](/screenshots/en/sql-workbench.png)

Once a business unit is chosen, the **Database Objects** list is on the left, the command editor is in the middle, and **Results** are at the bottom.

![The SQL Workbench screen after a business unit is chosen: the top bar shows the hotel code and the read / write label, the list of tables is on the left, the command editor with the Run, Format, Find and Clear buttons is in the middle, and the results pane is at the bottom](/screenshots/en/sql-workbench-connected.png)

## What you can do here

- **Choose the business unit:** click **Choose BU** (or **Switch** once one is chosen), or press Ctrl+B (Mac: ⌘B), then search by code, name or cluster. The top bar shows the code and name of the hotel you are working with. Check this bar every time before you run a command.
- **Read the permission label in the top bar:**
  - **read / write** (orange): you can run commands, save and drop.
  - **read-only:** your role only lets you look. The **Run**, **Save** and **Drop** buttons are not shown. You cannot run even a command that only looks at data. You can only browse the list and open saved commands.
- **Browse the Database Objects list:** what the hotel's database contains, in three groups. Search with the box at the top.
  - **Tables** hold the actual data. Click a table name and the system puts a command to look at the first 100 rows of that table into the editor for you. It does not run it yet.
  - **Views** are saved commands that look at data. You can look at a view as if it were a table.
  - **Procedures / Functions** are sets of commands saved in the database to be used again.
  - Click a view, procedure or function name, and the system opens its commands in the editor and shows **Editing:** followed by its name.
- **Type and manage commands:** the bar above the editor has **Run** (Ctrl+Enter or ⌘+Enter), **Format** (indents the text so it is easier to read), **Find** (Ctrl+F or ⌘+F) and **Clear** (empties the editor). On the right it shows the number of lines and commands.
- **Run:** if you have selected some text, the system runs only the selected text. If nothing is selected, it runs only the command the cursor is in (commands are separated by `;`).
- **Read the results:** the **Results** pane shows the number of rows, the number of columns and the time taken. If you run several commands at once, you see the result of the last one only. If a command is wrong, the pane shows **Error** with the database's message.
- **Export results to a CSV file:** the **CSV** button in the results pane. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Resize:** drag the line between the editor and the results pane. Double-click it to reset. Your browser remembers the size.
- **Save:** saves the commands in the editor as a view, stored procedure or function in the hotel's database. See the fields below.
- **Drop:** removes the open view, procedure or function from the hotel's database. This button appears only when you opened an item from **Database Objects**.
- When you switch to another business unit, the editor and the results are cleared. If you want to keep your commands, copy them somewhere first.

## Fields explained

These fields are in the bar above the editor. They are used only when you click **Save**. To simply run a command, you do not need to fill them in.

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Object Name** | The name of the view, stored procedure or function to save | For example `v_pr_summary`. Required when you save a **View** that is only a command that looks at data. If it is empty, you see **Please enter a name for the view**. |
| **Type** (the drop-down next to the name) | Save as **View**, **Stored Procedure** or **Function** | The default is **View**. A stored procedure or function must be typed as a full create command (starting with `CREATE OR REPLACE`). <!-- plain-ok --> |
| Command editor (required) | The SQL commands to run or save | If it is empty when you click **Save**, you see **Please enter SQL**. |

## Common tasks

**Look at the data in a table (changes nothing)**

1. Click **Choose BU** and choose the hotel.
2. Check that the hotel code in the top bar is correct.
3. In the **Tables** list, click the table you want. The system fills in a command to look at the first 100 rows.
4. Click **Run**.
5. Read the result in the **Results** pane. To keep it, click **CSV**.

An example of a safe command that only looks at data:

```sql
SELECT * FROM tb_activity LIMIT 100;
```

**Run a command that changes data (when the technical team gives you one)**

1. Choose the hotel, then check the code in the top bar again.
2. Paste the command you were given into the editor. Do not edit it yourself.
3. Select all the text of the commands to run, then click **Run**.
4. If a command starts with `DROP`, `TRUNCATE`, `DELETE`, `UPDATE`, `ALTER`, `GRANT` or `REVOKE`, the system asks **Run destructive SQL?** and names the hotel database it will run on. Read it carefully, then click **Run anyway**. <!-- plain-ok -->
5. Check the **Results** pane to see whether it succeeded or shows **Error**.

**Save a new view (when asked to)**

1. Type a command that looks at data in the editor, then click **Run** to check the result is right.
2. Fill in **Object Name**.
3. Choose the type **View**.
4. Click **Save**. The system confirms it was saved, and the new item appears in **Database Objects**.

**Drop a view, procedure or function (when asked to)**

1. Click the item in **Database Objects** to open it.
2. Check that the bar above the editor shows **Editing:** followed by the right name.
3. Click **Drop**.
4. The confirmation box names the item and the hotel. Click **Drop**.

## Cautions

::: warning Commands that change data take effect at once and cannot be undone
When you click **Run**, a command that changes data changes the hotel's real data at once. There is no undo button, and this screen does not check whether your change follows the system's rules. The hotel's users see the result straight away. Only run commands the technical team has given you, and check the hotel code in the top bar every time.
:::

::: warning The system does not ask before every command
The system asks you to confirm only commands that start with `DROP`, `TRUNCATE`, `DELETE`, `UPDATE`, `ALTER`, `GRANT` or `REVOKE`. Other commands that change data, such as `INSERT` (add data) or `CREATE` (create), run at once without asking. <!-- plain-ok -->
:::

::: warning A DELETE or UPDATE without WHERE affects every row
`WHERE` is the part that says which rows to change or remove. Without it, the command changes or removes **every row** in the table. The confirmation box warns **A DELETE/UPDATE has no WHERE clause and will affect ALL rows.** If you see this, click cancel and check the command with the technical team. <!-- plain-ok -->
:::

::: warning Save overwrites without asking
If a view, procedure or function with the same name already exists, **Save** overwrites it at once without asking. Any report or screen that used the old one changes too.
:::

::: warning Drop cannot be restored
**Drop** permanently removes a view, procedure or function from the hotel's database. The confirmation box says it **cannot be undone**. Any report or screen that uses it will stop working.
:::

- **Running several commands at once:** if any command in the set fails, the system cancels the whole set. None of the commands in it take effect.
- **Long-running commands:** each command may run for about 30 seconds at most. After that, the system stops it and shows an error.
- **Closing the screen while a command runs:** the command keeps running in the hotel's database until it finishes or runs out of time, but you will not see the result. Do not run it again to see the result; use a command that only looks at data to check whether the data has changed.
- If the screen shows the word **schema**, for example in the message after saving, it means the part of the database that belongs to this hotel. <!-- plain-ok -->

## Related guides

There is no step-by-step guide for this screen, because it is the technical team's job. Related screens:

- [Business Units](/en/screens/organization/business-units) the codes and names of the hotels you choose here
- [Tenant Migrations](/en/screens/organization/tenant-migrations) a safer way to update the structure of a hotel's database
- [Database Pools](/en/screens/database/database-pools) where each hotel's database is kept
