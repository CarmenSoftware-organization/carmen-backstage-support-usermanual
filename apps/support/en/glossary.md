# Glossary

This page lists the words used in the app and in this manual, each with a short meaning. The **Thai label** and **English label** columns show the words you see on screen in each language.

::: tip The Thai screens use more than one word in places
Some Thai screen labels vary. For example, the Thai menu item for Licenses (**ไลเซนส์**) sits under a group called **จัดการใบอนุญาต**, and some places just say **license**. All three mean the same thing. The Thai manual uses the words as shown on screen, and this table lists every form.
:::

## Organization and users

| Thai label | English label | Meaning |
| --- | --- | --- |
| Cluster, คลัสเตอร์ | **Cluster**, Clusters | A hotel group or company group belonging to one customer. It holds several business units. See [Clusters](/en/screens/organization/clusters). |
| หน่วยธุรกิจ, BU | **Business Unit**, BU | One hotel or one branch. It belongs to one cluster. See [Business Units](/en/screens/organization/business-units). |
| HQ | **HQ** | The business unit that is the head office of its cluster. |
| Tenant | **Tenant** | Each hotel's own database. Every business unit has its own database, separate from the others. |
| Migration, Tenant Migrations | **Migration**, Tenant Migrations | Updating the structure of each hotel's database to match the latest version of the system. See [Tenant Migrations](/en/screens/organization/tenant-migrations). |
| Tenant Seed Data, ข้อมูลตั้งต้นของ tenant | **Tenant Seed Data** | The starting data every hotel's database needs before it can be used. See [Tenant Seed Data](/en/screens/organization/tenant-seeds). |
| นำเข้าข้อมูล | **Data Import** | Loading a hotel's main data from a prepared Excel file into that business unit's database. See [Data Import](/en/screens/organization/data-import). |
| ผู้ใช้งาน | **Users** | The accounts of everyone who uses Carmen Blue, such as hotel staff. Each account is linked to the clusters and business units it can reach. See [Users](/en/screens/organization/users). |
| ผู้ดูแล / ผู้ใช้ (role in a cluster or business unit) | **Admin** / **User** | A person's level inside one cluster or business unit. An admin can manage other people there; a user can only use it. |
| มุมมองผู้ดูแล Cluster | **Cluster Admin view** | A smaller set of screens for people who look after only their own cluster. Open it from the user menu in the top-right corner. |

## Licenses

| Thai label | English label | Meaning |
| --- | --- | --- |
| ไลเซนส์, ใบอนุญาต, license | **License**, Licenses, License Management | What a customer has bought, such as the number of hotels, the number of users, the features they can use, and connections to outside systems. See [Licenses](/en/screens/license/licenses). |
| สัญญา | **Subscription** | A business unit's usage contract. It has a start and end date and says which feature groups the business unit can use. |
| ที่นั่ง, ไลเซนส์ที่นั่ง | **Seats**, Seat license | How many users one business unit may have. |
| โควตา BU | **BU Quota** | How many business units one cluster may create. |
| ใบสิทธิ์ interface | **Interface license** | Permission for a business unit to connect to an outside system, such as a point-of-sale system, a hotel management system or an accounting system. |
| กลุ่มสิทธิ์ license | **License Feature Groups** | Ready-made bundles of features, picked when selling a subscription or an interface license. See [License Feature Groups](/en/screens/license/license-feature-groups). |
| ทั่วไป / Interface (kind of feature group) | **Standard** / **Interface** | Standard groups are sold on subscriptions. Interface groups are sold on interface licenses. |
| ฟีเจอร์ที่ขายได้, feature | **License Features** | Each capability of Carmen Blue that can be sold to customers. The system builds the list itself; you only choose whether each one can be sold yet. See [License Features](/en/screens/license/license-features). |
| ความจุรวมทั้งระบบ, fleet | **Fleet capacity** | All clusters added together: how much has been used out of what was bought. |
| ใกล้เต็ม | **Near limit** | Almost everything that was bought is already in use. |
| ใกล้หมดอายุ, หมดอายุ | **Expiring soon**, **Expired** | A subscription or license close to its end date, or past it. |

## Content sent to users

| Thai label | English label | Meaning |
| --- | --- | --- |
| เทมเพลตรายงาน | **Report Templates** | The layouts of the reports hotels view or print from Carmen Blue. See [Report Templates](/en/screens/content/report-templates). |
| กลุ่มฟอร์ม | **Form Groups** | The print forms for each type of document, and which one is the default for each group. See [Form Groups](/en/screens/content/form-groups). |
| แม่แบบแดชบอร์ด | **Dashboard Templates** | The information boxes on each business unit's dashboards, and the starting dashboard installed for business units. See [Dashboard Templates](/en/screens/content/dashboard-templates). |
| ข่าวสาร | **News** | Articles or news that users open and read themselves. They go through draft, published and archived. See [News](/en/screens/content/news). |
| ประกาศ | **Broadcasts** | Notifications sent straight to users — everyone, a chosen list, or everyone in one business unit. They always have an expiry date. See [Broadcasts](/en/screens/content/broadcasts). |

## Analytics and scheduling

| Thai label | English label | Meaning |
| --- | --- | --- |
| สถิติการใช้งาน | **Usage Analytics** | An overview of how much people use the system. See [Usage Analytics](/en/screens/analytics/usage-analytics). |
| บันทึกกิจกรรม, เหตุการณ์ | **Activity Events** | A list of single actions people took on screen, such as opening a page or clicking a button: who, on which page, and when. See [Activity Events](/en/screens/analytics/activity-events). |
| ประวัติการเปลี่ยนแปลง | **Change history** | The history of who changed a record, what they changed and when. Not the same as Activity Events. See [Common Actions](/en/getting-started/common-actions#activity-trail). |
| งานตามเวลา | **Scheduled Jobs** | Jobs the system runs by itself at set times, such as producing reports, sending notifications or clearing out old data. See [Scheduled Jobs](/en/screens/scheduling/scheduled-jobs). |

## Backstage: settings and permissions

| Thai label | English label | Meaning |
| --- | --- | --- |
| ตั้งค่า, ตั้งค่า Backstage | **Backstage Config** | Settings for the whole system, such as user invitations, password resets and expiry warnings. Changes take effect without reinstalling the system. See [Backstage Config](/en/screens/backstage/backstage-config). |
| ตั้งค่าอีเมล | **Email Settings** | The sender details the system uses to send email, and which sender each type of email uses. See [Email Settings](/en/screens/backstage/email-settings). |
| แอปพลิเคชัน | **Applications** | Programs allowed to connect to Carmen Blue, such as a website or a mobile app. See [Applications](/en/screens/backstage/applications). |
| App ID | **App ID** | The ID of each application. The system uses it to know which program a request comes from. |
| บทบาท | **Backstage Roles** | A set of permissions that says what the people holding the role can do in this admin app. See [Backstage Roles](/en/screens/backstage/backstage-roles). |
| สิทธิ์ | **Permission** | Being allowed to do one thing on one screen, such as view, create, edit or delete. A role groups many permissions together. |
| ผู้ใช้, ผู้ใช้ Backstage | **Backstage Users** | People who have been given a role, so they can use this admin app. See [Backstage Users](/en/screens/backstage/user-backstage). |
| ผู้ดูแลระบบสูงสุด | **Super Admins** | People who can do everything in the system, with no permission checks. See [Super Admins](/en/screens/backstage/super-admins). |
| สวิตช์ฟีเจอร์ | **Feature Flags** | Controls how each menu item appears: **Active** (works normally), **Coming soon** (visible but cannot be clicked) or **Hidden** (not shown at all). See [Feature Flags](/en/screens/backstage/feature-flags). |

## Database

| Thai label | English label | Meaning |
| --- | --- | --- |
| Migration Backstage | **Backstage Migrations** | Updating the structure of the central database that all clusters share. Super admins only. See [Backstage Migrations](/en/screens/database/backstage-migrations). |
| SQL Workbench | **SQL Workbench** | A tool for giving commands directly to one hotel's database. Use it only when needed. See [SQL Workbench](/en/screens/database/sql-workbench). |
| Database Pools, Database Pool | **Database Pools** | The connection details for the machines that hold hotel databases. Several business units can share one. See [Database Pools](/en/screens/database/database-pools). |

## Common statuses and actions

| Thai label | English label | Meaning |
| --- | --- | --- |
| ใช้งาน / ไม่ใช้งาน | **Active** / **Inactive** | In use / switched off for now. The data is all still there and it can be switched back on. |
| ลบ, ลบแล้ว, ลบชั่วคราว, ถูกลบชั่วคราว | **Delete**, **Deleted**, soft-deleted | The record is hidden from the table, but you can still see it with the **Deleted** filter. On some screens it can be restored. <!-- plain-ok --> |
| ลบถาวร | **Delete permanently**, **Hard Delete** | Removed from the system completely. It cannot be restored. <!-- plain-ok --> |
| กู้คืน | **Restore** | Bring a deleted record back into use. |
| เก็บถาวร, เก็บถาวรแล้ว | **Archive**, **Archived** | Move a record you no longer use out of the main list, without deleting it. Exception: in the summary box on the **Users** screen, the **Archived** count is the number of deleted users. |
| เร็ว ๆ นี้, กำลังพัฒนา | **Coming soon** | A menu item or screen that is not open for use yet. |
| ไม่มีสิทธิ์เข้าถึง | **Access Denied** | Your role does not allow you to open this screen. |
| ส่งออก, ส่งออก CSV | **Export**, **Export CSV** | Download the list as a file you can open in Excel. |
