# The Main Screen

After you sign in, you always see this main screen. It has 4 parts: the menu on the left, the bar at the top, the work area in the middle, and the bar at the bottom.

![The main screen after signing in](/screenshots/en/main-screen.png)

## The left menu

The left menu takes you to every screen in the app. Menu items are grouped. Each group has a small heading above it.

| Group | What it is for | Items in the group |
| --- | --- | --- |
| (no heading) | The first page after sign-in, summarizing recent changes | [Dashboard](/en/screens/dashboard) |
| **Organization** | Hotel groups, each hotel, each hotel's database, and the people who use them | [Clusters](/en/screens/organization/clusters), [Business Units](/en/screens/organization/business-units), [Tenant Migrations](/en/screens/organization/tenant-migrations) (updating the structure of each hotel's database), [Tenant Seed Data](/en/screens/organization/tenant-seeds) (the starting data of each hotel's database), [Data Import](/en/screens/organization/data-import), [Users](/en/screens/organization/users) |
| **License Management** | What customers bought, such as the number of hotels, the number of users and the features they can use | [Licenses](/en/screens/license/licenses), [License Feature Groups](/en/screens/license/license-feature-groups) (bundles of features sold together), [License Features](/en/screens/license/license-features) |
| **Content** | Report and dashboard templates, news, and notifications sent to users | [Report Templates](/en/screens/content/report-templates), [Form Groups](/en/screens/content/form-groups), [Dashboard Templates](/en/screens/content/dashboard-templates), [News](/en/screens/content/news), [Broadcasts](/en/screens/content/broadcasts) |
| **Analytics** | How much the system is being used | [Usage Analytics](/en/screens/analytics/usage-analytics), [Activity Events](/en/screens/analytics/activity-events) |
| **Scheduling** | Jobs the system runs by itself at set times | [Scheduled Jobs](/en/screens/scheduling/scheduled-jobs) |
| **Platform** | Settings for the app itself, and who can do what | [Platform Config](/en/screens/platform/platform-config), [Email Settings](/en/screens/platform/email-settings), [Applications](/en/screens/platform/applications), [Platform Roles](/en/screens/platform/platform-roles), [Platform Users](/en/screens/platform/platform-users), [Super Admins](/en/screens/platform/super-admins), [Feature Flags](/en/screens/platform/feature-flags) |
| **Database** | Database tools. Use them only when needed | [Platform Migrations](/en/screens/database/platform-migrations), [SQL Workbench](/en/screens/database/sql-workbench), [Database Pools](/en/screens/database/database-pools) |

The terms in this table are explained in the [Glossary](../glossary).

::: tip Why are some menu items missing?
You only see the items your role allows. **Super Admins** and **Platform Migrations** are shown only to super admins (people who can do everything in the system). Items switched off on [Feature Flags](/en/screens/platform/feature-flags) (the switches that decide whether each menu item is shown) are either not shown at all, or shown faded with a **Coming soon** badge and cannot be clicked.
:::

### Collapse and expand the menu

To get a wider work area, collapse the left menu so it shows only icons.

1. Click **Collapse** at the very bottom of the left menu.
2. The menu shows only icons. Point at an icon to see its name.
3. Click the same button at the bottom again to expand the menu.

![The left menu, collapsed](/screenshots/en/sidebar-collapsed.png)

The app remembers your choice. The menu opens the same way next time.

On small screens, such as a phone, the left menu is hidden. Click the menu button in the top-left corner to open it.

## The top bar

From left to right, the top bar has:

- **Breadcrumb**: shows where you are, for example **Users > Edit**. Click an earlier name to go back.
- **Language button** (letters icon): switches the screens between Thai and English.
- **Theme button** (sun or moon icon): choose one of 3 looks.
  - **Light**: light background.
  - **Dark**: dark background, easier on the eyes at night.
  - **System**: follows your computer's setting.
- **User menu** (your name): see the next section.

### The user menu

Click your name in the top-right corner to open the user menu.

![The user menu in the top-right corner](/screenshots/en/profile-menu-open.png)

- The top shows your name and email.
- **Cluster Admin view**: switches to a smaller set of screens for looking after only the Cluster (hotel group) you are responsible for. It appears only if you are an admin of a cluster. Inside that view, this item changes to **Platform Admin view**, which brings you back to the main screen.
- **Profile**: view and change your own details and password. See [Profile](/en/screens/profile).
- **Log out**: sign out.

## The work area

The middle shows the screen you picked from the menu. Every screen starts with a title and a short description. The main buttons of the screen, such as **Add User** or **Export**, sit to the right of the title.

How to use lists, search, filters and editing is explained in [Common Actions](./common-actions).

## The bottom bar

- Left: the version numbers (**App** and **API**). Give them to support when you report a problem.
- Right: the current date and time on your computer.

## Keyboard shortcuts

Press <kbd>?</kbd> on the keyboard (while you are not typing in a box) to see the list of shortcuts.

![The keyboard shortcuts window](/screenshots/en/keyboard-shortcuts.png)

| Keys | What they do |
| --- | --- |
| <kbd>Ctrl</kbd> + <kbd>S</kbd> (on a Mac: <kbd>⌘</kbd> + <kbd>S</kbd>) | Save changes (in edit mode) |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> (on a Mac: <kbd>⌘</kbd> + <kbd>K</kbd>) | Jump to the search box (on list pages) |
| <kbd>Esc</kbd> | Close a dialog or cancel an edit |
| <kbd>?</kbd> | Show keyboard shortcuts |

## Related pages

- [Sign In](./login)
- [Common Actions](./common-actions)
- [Dashboard](/en/screens/dashboard)
- [Profile](/en/screens/profile)
