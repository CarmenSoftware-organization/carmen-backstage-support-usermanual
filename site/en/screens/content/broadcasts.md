# Broadcasts

## Where to find it and what it is for

Left menu, group **Content** > **Broadcasts**

A **broadcast** (a notification pushed straight to users) tells users something they need to know, such as planned maintenance. A broadcast can go to:

- **All users:** everyone in the system (a system-wide broadcast)
- **Business unit:** everyone in the chosen business unit (hotel), one per broadcast
- **Specific users:** only the people you pick

Every broadcast has an expiry. When it is reached, the broadcast disappears from recipients by itself. You can send at once or schedule it for later.

Broadcasts sent to **Specific users** do not appear in this screen's list, because the system records them as individual notifications.

## Screenshot

The list

![The Broadcasts screen: the cards counting each status, and the broadcast table](/screenshots/en/broadcasts-list.png)

The Send Broadcast screen

![Send Broadcast: Audience, Message, Type and the Preview panel on the right](/screenshots/en/broadcasts-form.png)

## What you can do here

**The list**

- **See the overview:** the **All**, **Active** (showing to recipients now), **Scheduled** (not yet sent), **Expired** and **Deleted** cards.
- **Search** broadcasts. See [Search](/en/getting-started/common-actions#search).
- **Filter** by status, scope (**System** or **Business Unit**), or tick **Show deleted broadcasts**. See [Filters](/en/getting-started/common-actions#filters).
- **Export** to a CSV file. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Create a broadcast:** the **New Broadcast** button.
- **Read the table:** **Title**, **Scope** (e.g. "BU · T02"), **Severity**, **Status**, **Scheduled** and **Expires**.
- **Row menu** (the `⋯` button): **Edit**, **Expire now** (active broadcasts only) and **Delete**. Deleted broadcasts have no menu. See [Row menu](/en/getting-started/common-actions#row-actions).

**The Send Broadcast screen**

- Left side: audience, message, type and delivery.
- Right side, the **Preview** panel: how the broadcast will look, **Reaches** (who gets it, e.g. **Every user in the system**) and **Delivery** (now or the scheduled time, and the expiry). It updates as you type.
- Bottom bar: **Reset** (clears the form) and **Send** (or **Schedule** when you chose to schedule it).

**A broadcast's page**

- It opens in view mode. Click **Edit** to change the send time, the expiry or the content. See [View mode and edit mode](/en/getting-started/common-actions#view-edit).

## Fields explained

**The Send Broadcast screen**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Audience** | Who gets it | **All users**, **Specific users** or **Business unit** |
| **Recipients** (required for Specific users) | The people who get it | Pick as many as needed |
| **Business unit** (required for Business unit) | The hotel that gets it | Pick one |
| **Title** (required) | The broadcast's heading | Up to 200 characters, e.g. "Scheduled maintenance" |
| **Message** (required) | The broadcast's text | Up to 2000 characters |
| **Type** | How important it is | **Info**, **Warning**, **Critical**, **Maintenance** or **Other…** (type your own: capital English letters, digits and underscores only). The colour and label are only for internal sorting — recipients see a standard notification. |
| **Related Business Unit (Metadata)** | Attaches a business unit code to the broadcast | Optional, e.g. so the system can take users to that business unit. It does not change who receives it. |
| **Delivery** | When it is sent | **Send immediately**, or **Schedule for later** and pick a future date and time |
| **Expires** | When it disappears from recipients | 7, 30 or 90 days, or **Custom…**. When scheduled, the days count from the send time. A custom expiry must be in the future and after the send time. |

**A broadcast's page (editing)**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Scheduled at** | The send time | Leave empty to send immediately |
| **Expires** (required) | When the broadcast disappears from recipients | If you set a time already past, the system asks whether to expire it now |
| **Title**, **Message**, **Severity** | The broadcast's content | Can only change while the broadcast is still **Scheduled**. Once sent, the content is locked because some recipients may have seen it. |

## Common tasks

**Send a broadcast to everyone in one hotel**

1. Click **New Broadcast**.
2. Under **Audience**, click **Business unit** and pick the hotel.
3. Type the **Title** and **Message**, and choose a **Type**.
4. Under **Delivery**, choose **Send immediately** or **Schedule for later** and pick a time.
5. Choose the expiry.
6. Check the **Preview** panel on the right, especially **Reaches**.
7. Click **Send** (or **Schedule**). The confirmation asks, e.g. "Send to ...?". Confirm.
8. The message **Broadcast sent** or **Broadcast scheduled for ...** appears.

**Stop showing a broadcast early**

1. On the list, click `⋯` on the row of an **Active** broadcast.
2. Click **Expire now**.
3. The **Expire Broadcast** box says the broadcast disappears from recipients immediately. Confirm.

**Move the send time of a scheduled broadcast**

1. Open the broadcast and click **Edit**.
2. Change **Scheduled at** (and the content, if it has not been sent yet).
3. Click **Save Changes**.

If you move an **Active** broadcast to a future time, the **Reschedule Broadcast** box warns that the message disappears from recipients until the new time.

## Cautions

::: warning Sending to all users
An **All users** broadcast reaches everyone in the system, in every hotel and every cluster. The confirmation box is red. Check the title and message carefully before you send. Once sent, the content cannot be edited — you can only expire or delete it.
:::

::: warning Deleting a broadcast
A deleted broadcast is hidden from everyone immediately. It still appears in the list when you tick **Show deleted broadcasts**, but this screen has no restore button.
:::

- Broadcasts sent to **Specific users** do not appear on this screen, so you cannot edit, expire or delete them here. Check the recipients before you send.
- **Expire now** takes effect immediately; recipients no longer see the broadcast.

## Related guides

There is no step-by-step guide for this screen yet. See:

- [News](/en/screens/content/news)
- [Common Actions](/en/getting-started/common-actions)
