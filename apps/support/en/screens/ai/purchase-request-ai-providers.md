# Purchase Request AI Providers

## Where to find it and what this screen is for

Left menu, group **AI** > **Purchase Request** (the page title is **Purchase Request AI Providers**).

This screen decides which AI services people can choose for the Purchase Request feature in the hotels' Carmen Blue app, and in what order. Each service is called a **provider** (an AI service such as Claude, ChatGPT or Gemini). Hotel users see a button for each provider you turn on. When they click it, the app opens that AI's website with a prompt (the instruction text that asks the AI to help review the purchase request) already filled in, or copies the prompt so the user can paste it.

Changes here apply to **every business unit** (each hotel or branch).

## Screenshot

![The Purchase Request AI Providers page, a list of providers with logo, name, destination, default prompt, status and order](/screenshots/en/ai-providers-list.png)

## What you can do here

- **Read the list of providers.** It is sorted by **Order**, lowest first. Each row shows:
  - **Provider:** logo, name and code (inactive rows look faded).
  - **Opens:** the website users are taken to, and whether the prompt is **Prompt pre-filled** (the website opens with the text filled in) or **Prompt copied to paste** (the app copies the text and the user pastes it).
  - **Default prompt:** its length in characters, and whether it is **Shared with N more** (the same text as other providers) or **Unique to this provider** (it was edited to differ). Hover over the number to read the full text.
  - **Status:** **Active** or **Inactive**.
  - **Business units:** **On by default** or **Opt-in**.
  - **Order:** the number used for sorting.
- **Add a provider:** click **Add provider** at the top right.
- **Edit:** click the pencil icon at the end of the row.
- **Delete:** click the trash icon at the end of the row, then confirm.

If there is nothing yet, the screen shows **No AI providers yet**.

The add, edit and delete buttons appear only for people whose role allows it.

## Fields explained

Click the pencil (or **Add provider**) to open the **Edit AI provider** (or **Add AI provider**) window. It has 4 sections.

![The Edit AI provider window with the sections Provider, Where it opens, Default prompt and Availability](/screenshots/en/ai-providers-form.png)

**Section: Provider**

| Field | What it means | Notes |
| --- | --- | --- |
| **Name** | The name users see | Required |
| **Code** | A short English name for the provider | Use a-z, 0-9, _ or -, 2 to 50 characters, starting with a letter or number. **Cannot be changed after it is created** |
| **Built-in icon** | Pick a ready-made logo | You can choose **None** |
| **Icon URL** | A link to your own logo image | https only. When filled in, it is shown instead of the built-in icon |

**Section: Where it opens**

| Field | What it means | Notes |
| --- | --- | --- |
| **URL template** | The web address of the AI that users are taken to | Required. If the link contains the placeholder `{query}` <!-- plain-ok -->, the page opens with the prompt filled in. If not, the app copies the prompt for the user to paste. The placeholder must come after the first ? or #. A **Preview** line under the field shows the resulting link |

**Section: Default prompt**

| Field | What it means | Notes |
| --- | --- | --- |
| **Default prompt** | The instruction text sent to the AI | Required, up to 4000 characters (a counter is shown under the field). Put the placeholder `{items}` <!-- plain-ok --> where the table of purchase request items should go. If you leave it out, the table is added at the end |

**Section: Availability**

| Field | What it means | Notes |
| --- | --- | --- |
| **Active** | Turns this provider on or off | Click the ON/OFF button. When off, the provider is hidden in every business unit |
| **On by default for business units** | Shows this provider to business units automatically | Click the ON/OFF button. Applies to business units that have not chosen for themselves |
| **Sort order** | The number used to order providers | Must be a whole number, 0 or more. Lower numbers come first. For a new provider the app fills in the number after the last one |

**Save** works only when all required fields are filled in and the order is a whole number, 0 or more (no decimals, no negative numbers).

This window has no password or secret key field. The list shows only the destination website name, not the full link.

## Common tasks

**Add a new provider**

1. Click **Add provider**.
2. Fill in **Name** and **Code**.
3. Fill in **URL template** and check the **Preview** line.
4. Fill in **Default prompt**.
5. Set **Active** and **On by default for business units**.
6. Check **Sort order**, then click **Save**.

**Change the order**

1. Click the pencil on the row.
2. Change **Sort order** to a whole number, 0 or more.
3. Click **Save**.

**Pause a provider**

1. Click the pencil on the row.
2. Click the ON/OFF button for **Active** so that it shows OFF.
3. Click **Save**.

If someone else changed the same provider before you, the app tells you it was updated and reloads the list. Open it again and repeat your change.

## Cautions

::: warning Deleting removes the provider from every business unit
**Delete this AI provider?** The provider disappears from every business unit at once. Each business unit's own settings are kept but ignored. If you only want to stop using it for a while, turn off **Active** instead of deleting.
:::

- Changing the **Default prompt** affects every hotel immediately. Check the text before you save.
- A wrong **URL template** sends users to a page that does not work. Check the **Preview** line before you save.
- Do not type any key or password for an AI service into any field on this screen, including the prompt and the URL. People who open this screen and hotel users may be able to see it.

## Related guides

There is no step-by-step guide for this screen yet. See these related pages:

- [The Main Screen](/en/getting-started/main-screen)
- [Feature Flags](/en/screens/backstage/feature-flags), which can hide or switch off this menu item
- [Business Units](/en/screens/organization/business-units)
- [Common Actions](/en/getting-started/common-actions)
