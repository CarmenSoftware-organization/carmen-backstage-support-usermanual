# Applications

## Where to find it and what it is for

Left menu, group **Platform** > **Applications** (the screen heading says **Application Management**)

An **application** is a program allowed to connect to Carmen Blue, such as the Carmen Blue website the hotels use, a mobile app, a point-of-sale (POS) terminal, or an outside system that sends data in. Every program needs its own entry on this screen. Without one, the system does not accept connections from that program.

Each application has:

- An **App ID** (the application's ID code — the system uses it to know which program a connection comes from). The system creates it for you.
- **API access** (API — the channels a program uses to request or send data to Carmen Blue): which channels this program may use.
- An **App secret** (a code the program must send along with the App ID to prove it is the real program). Optional.
- A **Service status**, used to put the program into maintenance or switch it off for a while.

## Screenshot

The list

![The Application Management screen with the registry summary at the top and the table of applications](/screenshots/en/applications-list.png)

Adding an application

![The Add Application screen with API access on the left and Settings on the right](/screenshots/en/applications-form.png)

An application's screen

![The Carmen Blue website application screen with the Access definition and Live controls sections](/screenshots/en/applications-detail.png)

If an application has a secret, the screenshots in this manual cover it up. On the real screen the secret is hidden too, until you click **Reveal secret**.

## What you can do here

**The list**

- **See the overview (Registry):** the number of applications, broken down by **Service status**, **App secret** (**Enforced**, **Not required**, **No secret**), **API access scope** (**Full access** or **Scoped**) and **Device**.
- **Search** and **filter** by status and device. See [Search](/en/getting-started/common-actions#search) and [Filters](/en/getting-started/common-actions#filters).
- **Read the table:** **Name** (with the App ID and a copy button), **Status**, **Access** (a bar showing how many channels it may use out of the total; an orange bar with a warning icon = every channel), **Device**, **Created** and **Updated**.
- **Copy an App ID:** click the copy icon next to it.
- **Row menu** (the `⋯` button): **Edit**, **Change history** and **Delete**. See [Row menu](/en/getting-started/common-actions#row-actions).
- **Export.** See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Add an application:** the **Add Application** button.

**An application's screen** has two parts that save differently:

- **Access definition** (**API access** and **Settings**): click **Edit** at the top, make changes, then click **Save Changes** in the bar at the bottom. See [View mode and edit mode](/en/getting-started/common-actions#view-edit).
- **Live controls** (**Service status**, **Bypass users** and **App secret**): each part has its own button and **takes effect as soon as you click — there is no Save step**. This part appears only after the application has been created.

## Fields explained

**Settings**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Name** (required) | The application's name | For example "mobile-app", "interface-opera-pos" |
| **Description** | Extra notes | Optional |
| **Device** | The kind of program | mobile, web, desktop or pos |

**API access**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Full access to every API** | Tick to let the program use every channel | Recommended only for Carmen Blue's own main programs. Outside programs should get only the channels they need. When ticked, the screen warns **This app is not restricted to specific endpoints. It can call every API in the platform.** <!-- plain-ok --> |
| The list of channels (when the box above is not ticked) | Choose each channel the program may use, grouped by module (an area of work, such as ap-invoice) | Click the arrow to expand a module, click **All** to choose a whole module, or type in the filter box to find one. The bottom shows how many are chosen out of the total, for example `3/1091`. |

Channels that can delete or approve data are counted separately and highlighted (for example "266 can delete or approve"). Check that list carefully before giving access to an outside program.

**Service status** (takes effect within about 1 minute)

| Option | What users of this program get |
| --- | --- |
| **Running** | Normal use |
| **Maintenance** | Most use is refused, except signing in. The Carmen Blue website shows a maintenance screen; other programs show an error. Bypass users keep full access. |
| **Read-only** | Users can look at data but not save or change anything (some viewing, such as print previews, is refused too). Bypass users keep full access. |
| **Disabled** | Almost all use is refused, including signing in, and including bypass users. |

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Message to users** | The message users see during maintenance | For example "Upgrading the database" |
| **Expected back** | When you expect the program to be usable again | Must be in the future. Shown to users only — the app does not switch back by itself. Someone must come back and choose **Running**. |
| **Bypass users** | Users who keep full access during **Maintenance** and **Read-only** | Search by name or email, then click **Save bypass list**. Has no effect on **Disabled**. |

**App secret**

| Button or field | What it means |
| --- | --- |
| **Generate secret** | Creates the first secret. Copy it into the program. |
| **Reveal secret** / **Hide secret** | Shows the full secret. It hides again after 30 seconds. Every reveal is recorded with who looked. |
| **Copy secret** | Copies the secret without showing it on screen |
| **Rotate secret** | Creates a new secret to replace the current one. The current one keeps working for 24 hours, so there is time to update the program. |
| **Require secret** | On = refuse connections without the correct secret. Off = accept connections with or without it. You must generate a secret before you can turn it on. |

## Common tasks

**Add an application for an outside system**

1. Click **Add Application**.
2. Under **Settings**, type a **Name** and choose the **Device**.
3. Under **API access**, leave **Full access to every API** unticked and choose only the channels that system needs.
4. Click **Create Application**.
5. On the application's screen, in **App secret**, click **Generate secret**.
6. Copy the **App ID** and the secret, and send them to the outside system's administrator through a secure channel.
7. When the outside system is set up, turn on **Require secret**.

**Put a program into maintenance for a while**

1. Open the application's screen.
2. Under **Service status**, choose **Maintenance**.
3. Type a **Message to users** and **Expected back**.
4. (Optional) Add people who need to test during maintenance under **Bypass users**, then click **Save bypass list**.
5. Click **Apply status**, then confirm in the box that appears.
6. When the work is done, choose **Running** again and click **Apply status**.

## Cautions

::: warning Keep the secret private
Anyone who has both the App ID and the secret can connect to Carmen Blue as that program. Do not send the secret in group chats or emails many people see. Do not take screenshots while the secret is shown. If you think the secret has leaked, click **Rotate secret** at once.
:::

::: warning Live controls affect real users
**Service status** and **Require secret** affect everyone using that program within about 1 minute, with no Save step. If you turn on **Require secret** before the program sends the secret, every connection is refused. If the application is the one this admin app itself uses, the screen warns you, and the system refuses status changes that would lock this screen out.
:::

::: warning Deleting an application
Deleting cannot be undone. Programs using that App ID can no longer connect. To stop it for a while, use **Disabled** under **Service status** instead.
:::

- Rotating the secret again within 24 hours makes the secret from two rotations ago stop working at once.
- **Expected back** does not switch the status back by itself. You must choose **Running** yourself.

## Related guides

There is no step-by-step guide for this screen yet. See the related pages:

- [Usage Analytics](/en/screens/analytics/usage-analytics) (can be filtered by application)
- [Common Actions](/en/getting-started/common-actions)
