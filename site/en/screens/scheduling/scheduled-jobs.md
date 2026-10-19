# Scheduled Jobs

## Where to find it and what it is for

Left menu, group **Scheduling** > **Scheduled Jobs**

**Scheduled jobs** (work the system does by itself at set times), such as producing a report every morning, sending notifications or clearing out old data every night. Use this screen to see which jobs exist, which are running, when each last ran and when it runs next — and to create, edit, stop or run a job right now.

Some jobs are created by another program for one business unit (hotel), such as a report a user scheduled in the Carmen website. For these, the **Owner** column shows that program's name. Jobs created on this screen show **Platform**.

## Screenshot

The list

![The Scheduled Jobs screen with summary cards and a table of jobs with row buttons](/screenshots/en/scheduled-jobs-list.png)

Creating a job

![The New Scheduled Job screen with the Basics, Schedule and Execution sections](/screenshots/en/scheduled-jobs-form.png)

## What you can do here

**The list**

- **See the overview:** the cards **Total**, **Running**, **Stopped**, **With errors**, **Foreign-owned** and **Active in scheduler** (how many jobs the system's scheduler is actually holding). Running, Stopped, With errors and Foreign-owned count only the rows on the current table page.
- **Search** and **filter** by **Job type** or **Status**. See [Search](/en/getting-started/common-actions#search) and [Filters](/en/getting-started/common-actions#filters).
- **Read the table:** **Name**, **Type**, **Business unit**, **Schedule** (the schedule code with a short description under it, such as "at 03:30 AM"), **Status**, **Owner**, **Last run**, **Next run** and **Runs**. If the last run had a problem, a yellow triangle appears next to **Last run**. Point at it to read the message.
- **Row buttons** (left to right):
  - **Stop** or **Start** stops or starts the job running on schedule. Takes effect at once, with no confirmation.
  - **Run now** runs the job once, right now. Takes effect at once, with no confirmation.
  - **Edit** opens the job.
  - **Delete** asks for confirmation.
- **Export CSV.** See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Create a job:** the **Add Scheduled Job** button.

The row buttons and the add button appear only for people whose role allows managing scheduled jobs.

**A job's screen (create or edit)**

- Split into **Basics**, **Schedule**, **Execution** and **Type-specific configuration**.
- The bar at the bottom has **Cancel** and **Save Changes**. See [Save and Cancel](/en/getting-started/common-actions#save-cancel).
- A job owned by another program shows a yellow bar at the top saying that changes here take effect for that business unit immediately.

## Fields explained

**Basics**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Name** (required) | The job's name | For example "Clear old activity events" |
| **Job type** | What the job does | **Report**, **Notification**, **Cleanup**, **Dashboard refresh**, **Activity rollup** or **Activity retention**. You can choose it only when creating. It cannot be changed afterwards. The fields under **Type-specific configuration** change with the type. |
| **Description** | Extra notes | Optional |
| **Status** | Tick **Active** to let the job run on schedule. Untick to stop it. | Takes effect when you save. |

**Schedule**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Pattern** | How often the job runs | **Every few minutes**, **Hourly**, **Daily**, **Weekly**, **Monthly** or **Custom**. After choosing, more boxes appear for the time, day or number of minutes. |
| **Cron expression** (required) | The schedule code the system actually uses. The system fills it in for you when you choose a pattern and time. | Under the box you see a plain-words description and the next 3 run times. See the examples below. |
| **Notify recipients at** (report jobs only) | When recipients are told the report is ready | Separate from when the report runs. Leave empty to notify as soon as the run finishes. |

Schedule examples

| You want | Choose on screen | Resulting cron expression |
| --- | --- | --- |
| Every day at 02:00 | **Daily**, then set **At** 02 : 00 | `0 2 * * *` |
| Every 30 minutes | **Every few minutes**, then set **Every** 30 **minutes** | `*/30 * * * *` |
| Every Monday at 08:30 | **Weekly**, tick **Mon**, then set the time 08 : 30 | `30 8 * * 1` |
| The 1st of every month at 06:00 | **Monthly**, set **On day** 1, then set the time 06 : 00 | `0 6 1 * *` |

The schedule code has 5 parts in a row: minute, hour, day of month, month and day of week. A `*` means "every". You do not need to type it yourself — choosing a **Pattern** is enough. If you choose **Custom**, you get one box per part, and they stay in sync with the **Cron expression** box.

**Execution**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Max retries** | How many times to try again if a run fails | Default 0 (no retry) |
| **Timeout (seconds)** | If a run takes longer than this, the system stops it | Default 300 seconds (5 minutes) |

**Type-specific configuration**

| Job type | Field | What it means |
| --- | --- | --- |
| **Report** | **Report template** | The report to produce |
| | **Business units** (required) | The hotels to produce the report for. Select at least one, or the run will fail. |
| | **Format** | pdf, excel, csv or json <!-- plain-ok --> |
| | **Filters** | Conditions for the report, as **Key** and **Value** pairs. Click **Add filter** to add a row. Use what the reporting team specifies. |
| | **Recipient users** | The users who receive the report |
| | **Delivery method** | **File** (the report file is attached) or **Viewer URL** (a link to view the report) |
| | **Notify in web app**, **Notify by email** | How recipients are told. If you tick email, a **Mail source** box (**Internal** or **External**) appears. |
| **Notification** | **Title**, **Message** | The notification's content |
| | **Type**, **Category** | Labels that group notifications. Type what the technical team specifies. |
| | **Recipient users** (required) | Select at least one user, or the run will fail. |
| **Cleanup** | **Action**, **Type** | What to clear. Type what the technical team specifies. If unsure, ask them first. |
| | **Older than** | Clear data older than this, for example `30d` (30 days), `90d`, `1y` (1 year) |
| **Dashboard refresh** | **Business units** | The hotels whose dashboard figures are refreshed. Leave empty to include all. |
| | **Tier** | Which set of dashboards to refresh: **All tiers** or one tier |
| **Activity rollup** | **Days back** | How many past days of activity to total on each run |
| **Activity retention** | **Retention days** | Activity records older than this many days are deleted |
| | **Batch size** | The most rows deleted per batch. Keeps the system from working too hard at once. |

## Common tasks

**Create a new job**

1. Click **Add Scheduled Job**.
2. Type a **Name** and choose the **Job type**.
3. In **Pattern**, choose how often, then set the time.
4. Check that the **Cron expression** box has a value and that the description under it matches what you want. If the box is still empty (you only see faint grey text), change the pattern or time and the system fills it in.
5. Fill in the fields under **Type-specific configuration**.
6. Click **Save Changes**. The system shows **Scheduled job created** and opens the job.

**Pause a job**

1. In the list, click **Stop** at the end of the row.
2. The system shows **Scheduled job stopped**. The status changes to **Stopped** at once.
3. To let it run again, click **Start** on the same row.

**Run a job once, right now**

1. Click **Run now** at the end of the row.
2. The system shows **Run dispatched — the job is now running in the background**. This message does not mean the job has succeeded.
3. Wait a moment, then reload the page to see **Last run** and any error icon.

A job you have started keeps running in the background. Closing this page or signing out does not stop it.

## Cautions

::: warning Run now does the real work
**Run now** does one real run at once, with no confirmation — for example, it sends the report or notification to the real recipients, or deletes old data as configured. Click once per run. Clicking again starts another run.
:::

::: warning Deleting a job
Deleting a job cannot be undone. To pause it, click **Stop** instead. If another program created the job for a business unit, deleting it here also removes that business unit's schedule.
:::

::: warning Cleanup jobs
**Cleanup** and **Activity retention** jobs really delete old data every time they run. Data they delete cannot be restored from this screen. Check **Older than** or **Retention days** before you save.
:::

- **Stop** and **Start** take effect as soon as you click. There is no Save step.
- The times shown under **Cron expression** are in your computer's time zone. The system's scheduler may use a different one. After saving, check the real time in the **Next run** column of the list.
- For jobs owned by another program, the system may refuse changes from this screen and say "This job is owned by ... and cannot be changed here."

## Related guides

There is no step-by-step guide for this screen yet. See the related pages:

- [Report Templates](/en/screens/content/report-templates)
- [Activity Events](/en/screens/analytics/activity-events)
- [Common Actions](/en/getting-started/common-actions)
