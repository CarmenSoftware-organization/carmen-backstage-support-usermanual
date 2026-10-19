# Platform Config

## Where to find it and what it is for

Left menu, group **Platform** > **Platform Config**

This screen holds settings that apply to the whole system. Changes take effect without waiting for the technical team to reinstall the program — for example, how long the links in invitation and password-reset emails stay valid, who receives notification email, and whether the system really enforces licenses (the usage rights a customer has bought).

The bar at the top sums up the three most important settings: **License Enforcement**, **Notification Email** and **Platform migration API**.

## Screenshot

![The Platform Config screen with the status bar at the top and the email-link cards, each with an Edit button](/screenshots/en/platform-config-overview.png)

## What you can do here

- **Read the current values:** each card shows its current values, and the foot of the card says who last changed it and when.
- **Edit one card at a time:** click **Edit** at the top right of a card. The button turns into **Save Changes** and **Cancel** in the same place. Each card saves on its own. Saving one card does not save any other card.
- The cards are grouped into sections:
  - **Email links & lifetimes:** **Invitation**, **Sign-up**, **Email Verification**, **Password Reset**
  - **Invitation limits:** **Rate limits**
  - **Notifications:** **Notification Email**
  - **Licensing:** **License Enforcement** and **Expiring-soon thresholds**
  - **Sign-in:** **Google sign-in**
  - **External API:** the address outside systems use to connect
  - **Platform Database:** **Platform migration API**

Who can change what:

- The **Edit** buttons appear only for people whose role allows managing settings.
- The **License Enforcement** card also needs the permission to manage licenses.
- The **Platform migration API** card can be changed only by Super Admins (people who can do everything in the system).

## Fields explained

**Email links & lifetimes**

The links in these emails take recipients to the Carmen website the hotels use, not to this admin app. Enter only the page address. The system adds each person's own code to the end by itself. The address must start with `https://` or `http://`.

| Card | Field | What it means | Example / notes |
| --- | --- | --- | --- |
| **Invitation** | **Base URL** (required) | The page people open from a cluster invitation. They accept the invitation and create their account from the same link. | For example `https://inventory.carmen.io/invitations` |
| | **Expiry (days)** (required) | How many days the invitation stays valid | 1–365 days |
| **Sign-up** | **Verify URL** (required) | The page opened from the sign-up confirmation email. The person sets a password there, and the account is created only then. | For example `https://inventory.carmen.io/register/verify` |
| | **Expiry (hours)** (required) | How many hours the link stays valid | 1–720 hours |
| **Email Verification** | **Base URL** (required) | The email-confirmation page for older-style accounts (accounts created before the sign-up steps changed, and accounts an admin creates) | |
| | **Expiry (hours)** (required) | How many hours the link stays valid | 1–720 hours |
| **Password Reset** | **Base URL** (required) | The page opened from the forgot-password email | |
| | **Expiry (hours)** (required) | How many hours the link stays valid | 1–720 hours |

**Rate limits** (Invitation limits section)

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Per admin / hour** (required) | How many invitations one admin may send per hour | A whole number, 1 or more |
| **Per cluster / day** (required) | How many invitations one Cluster may send per day | A whole number, 1 or more |

The defaults are high on purpose, because opening a new hotel and inviting 30–50 staff at once is normal. The limit is there to stop abuse. Do not lower it close to real use. If the system runs on several servers, the real limit multiplies by the number of servers — for example, 100 on two servers really allows up to 200.

**Notification Email**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Sending** | Tick **Send internal notification email** to send notification email, such as reports and business-unit alerts | If off, no notification email is sent at all. System email, such as sign-up and password-reset links, is still sent as usual. |
| **Recipients** | Recipient addresses, separated by commas | For example `ops@example.com, finance@example.com`. Leave blank so each notification goes to its own recipients. |
| **CC** | Addresses that get a copy | For example `audit@example.com` |
| **Subject prefix** | Text added before the email subject | At most 64 characters. Blank = nothing added. The email-server details are not set here — set them on [Email Settings](/en/screens/platform/email-settings). |

**License Enforcement**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Enforcement** | Tick **Enforce licences for real** so the system refuses use that no license covers | Off (the default) = **shadow mode**: the system checks rights as usual but blocks nobody, it only records the result for later review. On = a business unit without a subscription covering a feature it uses cannot use it, an expired subscription can be read but not changed, and you cannot invite users beyond the seat count. Applies only to the hotels' programs, not to this admin app. |

**Expiring-soon thresholds**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Subscription licences**, **BU-quota licences**, **BU seat licences**, **Interface licences** (all required) | How many days before expiry the "expiring soon" badge starts, for each kind of license | 1–365 days. Affects display only. It does not give or remove anyone's rights. |

**Google sign-in**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Carmen Platform** | Tick **Allow Google sign-in** on the sign-in page of this admin app | If off, the Google button is still shown but cannot be clicked. |
| **App** | Tick to allow it in the hotels' Carmen website and every other program | The button works only once the technical team has fully set up the Google connection. |

**External API**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Base URL** | The main address that outside systems (such as a hotel's accounting system) use to connect to Carmen with a business unit's connection key | Enter the main address only. Do not add `/api/ext` to the end. Leave blank to use the server's default. <!-- plain-ok --> |

**Platform migration API**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **API status** | Tick **Enable the platform migration API** to let Super Admins update the structure of the central database (the database every Cluster shares) from the [Platform Migrations](/en/screens/database/platform-migrations) screen | Off = that screen cannot run anything, not even for Super Admins. Only Super Admins can change this. |

## Common tasks

**Change how long password-reset links last**

1. On the **Password Reset** card, click **Edit**.
2. Change **Expiry (hours)**, for example to 48.
3. Click **Save Changes** at the top right of the card.
4. The system shows **Password Reset settings saved**. Links sent from now on use the new lifetime.

**Turn on license enforcement**

1. First check on [Licenses](/en/screens/license/licenses) that every business unit has an active subscription with all its features.
2. On the **License Enforcement** card, click **Edit**.
3. Tick **Enforce licences for real**.
4. Click **Save Changes**.
5. The **Turn on license enforcement?** box explains what will happen. Click **Turn on enforcement**.
6. The system says the change takes effect within 60 seconds.

To turn it off again, do the same but untick the box. Turning it off has no confirmation box.

## Cautions

::: warning License Enforcement
When you turn it on, within about 60 seconds every business unit without a subscription covering the features it uses is refused at once, and inviting users beyond the seat count stops working. Check every hotel's subscriptions first. You can turn it off again at once by unticking the box.
:::

::: warning Platform migration API
When it is on, Super Admins can update the structure of the central database for every Cluster from the screen. Such an update affects every hotel at once. Turn it on only when an update is planned, and turn it off when done. This setting takes effect within about a minute, not instantly.
:::

- On **Invitation**, **Sign-up**, **Email Verification** and **Password Reset**, a wrong address means recipients cannot open the link. After a change, test by sending a real email.
- Turning off **Sending** in **Notification Email** stops all report and notification email.

## Related guides

- [Manage a License](/en/guides/manage-license)

Related pages:

- [Licenses](/en/screens/license/licenses)
- [Email Settings](/en/screens/platform/email-settings)
- [Common Actions](/en/getting-started/common-actions)
