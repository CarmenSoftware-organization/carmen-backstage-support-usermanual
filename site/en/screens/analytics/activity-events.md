# Activity Events

## Where to find it and what it is for

Left menu, group **Analytics** > **Activity Events**

This screen lists what users did on screen, one action per row: who opened which page or clicked what, and when. Use it to look back at what one user did — for example, when a customer reports a problem and you want to know what they clicked just before it happened. The screen is view-only.

Each row is an **event** (one action). There are two types: **Page view** and **Click**. For an overview in numbers, go to [Usage Analytics](/en/screens/analytics/usage-analytics).

## Screenshot

![The Activity Events screen with the search box, date range and table of events](/screenshots/en/activity-events-list.png)

## What you can do here

- **Search** by page path (the address of a page in the program, such as `/vendor-management`) or by the name and text of the clicked button. See [Search](/en/getting-started/common-actions#search).
- **Pick a date range:** **Last 7 days** (the default), **Last 30 days**, **Last 90 days** or **Custom**, at most 90 days. Dates are in Thailand time.
- **Filter** (the **Filters** button) by **Event type**, **Business Unit**, **Application**, **User (User ID)** (the user's ID code), **Page path** and **Session ID** (the code of one period of use). Filters in use appear as chips under the search box. Click the cross on a chip to remove it. See [Filters](/en/getting-started/common-actions#filters).
- **Read the table:** **Time**, **User** (name and email), **BU**, **Type**, **Page**, **Element** (the button or link clicked) and **App**, newest first.
- **See an event's details:** click the eye icon at the end of the row.
- **Export CSV.** See [Export to a CSV file](/en/getting-started/common-actions#export). The file contains only the rows on the current table page. If you need more, increase the rows per page before exporting.

Only people whose role allows viewing per-person details can open this screen. Some people can see [Usage Analytics](/en/screens/analytics/usage-analytics) but not this screen.

## Fields explained

This screen has no form to fill in. The **Event Details** panel shows:

| Field | What it means |
| --- | --- |
| **Time (server)** | When the system received the record |
| **Time (client)** | The time on the user's device when they acted. It may differ slightly from the server time if the device clock is off. |
| **Type** | **Page view** or **Click** |
| **User**, **Email** | Who did it |
| **Business Unit** | The hotel the user was working in. Shows `-` if none. |
| **Application** | The program used, such as the Carmen Blue website |
| **Domain** | The web address the user had open |
| **Page** | The path of the page the user was on |
| **Element**, **Element text** | The button or link clicked, and the text on it (click events only) |
| **Session** | The code of that period of use |
| **Event ID** | The code of this event. Quote it when reporting to the technical team. |
| **props**, **user agent** | Extra details sent by the program, and the user's browser details. Mostly used by the technical team. |

## Common tasks

**See what one user did before a problem**

1. Choose a **Date range** that covers when the problem happened.
2. In **Search**, type the name of the page the customer mentioned, or open **Filters** and choose the customer's **Business Unit**.
3. Find that user's row and click the eye icon.
4. In the details panel, click **View this entire session**.
5. The table now shows every event in that period of use, in time order.

**Clear all filters**

1. Click the cross on each filter chip under the search box.

## Cautions

- This screen is view-only. Nothing here changes data.
- The data here identifies people (name, email and what they did). Handle and share the CSV file with care.

## Related guides

There is no step-by-step guide for this screen yet. See the related pages:

- [Usage Analytics](/en/screens/analytics/usage-analytics)
- [Common Actions](/en/getting-started/common-actions)
