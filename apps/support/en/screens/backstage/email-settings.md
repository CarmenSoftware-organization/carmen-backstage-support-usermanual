# Email Settings

## Where to find it and what it is for

Left menu, group **Backstage** > **Email Settings**

This screen sets who the system sends email as, and through which email server. It has two parts:

- **Email routing:** which sender profile each type of system email uses
- **Sender profiles:** one set of sender details, such as "No-reply": the sender's name and email, and the email-server details (SMTP — the server that takes email from the system and delivers it to recipients) your email provider gives you

The system has 5 types of email:

| Type | Used for |
| --- | --- |
| **Register** | The confirm-your-email link before an account is created, and the "you already have an account" email |
| **Verify email** | The confirm-your-email link for older-style accounts, and accounts an admin creates |
| **Invitation** | Cluster invitations, and the email sent when an account is created from an invitation |
| **Forgot password** | The password-reset link |
| **Notification** | Internal notification email, such as reports and business-unit alerts |

## Screenshot

The main screen

![The Email Settings screen with Email routing at the top and sender profile cards below](/screenshots/en/email-settings-list.png)

A profile card in edit mode

![The No-reply profile card in edit mode, showing profile name, from email and server fields; the password only says that one is set](/screenshots/en/email-settings-form.png)

The test email box

![The Send a test email box with the Recipient field and the Send test email button](/screenshots/en/email-settings-test-dialog.png)

## What you can do here

**Email routing**

- **See which email type goes through which profile:** each row is one profile, with chips for the email types it sends. The profile marked **Default** handles every email type that has no profile chosen. A profile that no email goes through shows **No flow sends through this profile**.
- **Change the routing:** click **Edit routing**, then click an email-type chip to move it to another profile, or click **Make default** on a profile. When done, click **Save Changes**.

**Sender profiles**

- **Read a profile:** its name, sender email, server, the email types it **Carries**, **SMTP username** and **Note**. The password is never shown on screen. You only see **A password is set** or **No password set**.
- **Add a profile:** the **Add profile** button.
- **Edit:** the **Edit** button in the card, then **Save** or **Cancel** at the foot of the card. You can edit one card at a time. If you start editing another card while the first has unsaved changes, the system asks **Discard unsaved changes?**
- **Send a test email:** the **Send test email** button sends a test message through the saved profile, to confirm the server details really work.
- **Clear setting:** the red **Clear setting** button removes this profile. It asks for confirmation.

## Fields explained

**Sender profile card (add or edit)**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Profile name** (required) | The profile's name on this screen | For example "No-reply", "Support" |
| **From email** (required) | The address recipients see as the sender | For example `no-reply@yourhotel.com` |
| **From name** | The name recipients see next to the sender address | For example "Carmen Blue" |
| **SMTP host** (required) | The email server's address, from your email provider | For example `smtp.gmail.com` |
| **SMTP port** | The server's connection number, from your email provider | 1–65535. Usually 587 or 465. |
| **SMTP username** | The user name for signing in to the email server | Often the sender account's email address |
| **SMTP password** | The sender account's password | The screen never shows a saved password. Click **Change password** (or **Set password**) to type a new one. When editing, leaving it blank = keep the current password. This screen cannot remove a password from an existing profile. |
| **Implicit TLS** | How the connection is encrypted. Set it as your email provider says. | Tick it for port 465. For port 587, normally leave it unticked. |
| **Active** | Turns the profile on or off | If you turn off a profile that email still goes through, the system warns how many types will stop sending. Move the routing to another profile first. |
| **Note** | A note for admins | For example who owns this mailbox and which provider it uses |

**The Send a test email box**

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Recipient** | The address that receives the test email | Blank = send to your own email |

## Common tasks

**Test that a profile can really send email**

1. On the profile's card, click **Send test email**.
2. In the **Send a test email** box, type an address in **Recipient**, or leave it blank to send to yourself.
3. Click **Send test email**.
4. The system shows "Sent to ... — check the inbox and spam folder". Check the recipient's mailbox.
5. If it fails, the message says why, for example a connection problem with the server. Check the card's details with your email provider.

The test email goes out as soon as you click the button.

**Change the email server password**

1. On the profile's card, click **Edit**.
2. Under **SMTP password**, click **Change password**.
3. Type the new password.
4. Click **Save**.
5. Send a test email to confirm the new password works.

**Send notification email from a different profile**

1. Click **Edit routing**.
2. Click the **Notification** chip and choose the profile you want.
3. Click **Save Changes**. The system confirms the routing was saved.

## Cautions

::: warning Clearing a profile
**Clear setting** removes this profile. After that, email that used it falls back to the server settings the technical team configured. If none are configured, that type of email stops sending. To create this profile again, you must re-enter everything, including the password.
:::

- Do not send SMTP passwords by chat or email. Type them straight into this screen.
- If no default profile is chosen, the screen warns that some email types have no sender. Those emails cannot be sent until you choose one.
- Changes to routing or profile details apply to the next email the system sends. Email already sent does not change.

## Related guides

There is no step-by-step guide for this screen yet. See the related pages:

- [Backstage Config](/en/screens/backstage/backstage-config) (email links and notification recipients)
- [Common Actions](/en/getting-started/common-actions)
