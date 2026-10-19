# Set Up a New Hotel

## What you'll accomplish

This guide takes a new customer from nothing to a first staff member who has access to the hotel. Before that staff member can actually work, the technical team must prepare the hotel's database (Part 6). When you finish, you will have:

- a **Cluster** (one customer's group of hotels) with a quota for how many hotels it may create
- one **Business Unit** (one hotel or branch) in that cluster
- **Seats** (how many users the hotel may have) for that hotel
- a **Subscription** (the hotel's usage contract, which says which features it may use) for that hotel
- one staff member in the cluster and in the business unit, each with a role

**Who can do this:** a super admin, or someone whose Platform Role (the set of permissions that says what you may do) lets them manage Clusters, Business Units and Licenses.

**What you need first**

- The customer's name and code, for example the name "Grand Hotel Group" and the code `GHG`
- The hotel's name, for example "Grand Hotel Bangkok"
- How many hotels the customer bought, and when that quota expires (if it does)
- How many users the customer bought, and the contract dates
- The contract's start and end dates, and the feature bundles the customer bought, for example **Full Access**
- An account for the staff member. If there isn't one yet, create it first with [Add a User](/en/guides/add-user).

::: tip Names in the pictures
The pictures in this guide use sample names that start with `MANUAL-DEMO-`. When you do this for real, use the customer's and hotel's real names.
:::

## Steps

### Part 1: Create the cluster

1. In the left menu, click **Clusters**.
2. Click **Add Cluster** at the top right. The new cluster form opens.

   ![The empty new cluster form](/screenshots/en/guide-setup-hotel-01-cluster-form-empty.png)

3. Under **Identity**, enter the **Code**, for example `GHG`. Use 2–20 English letters, digits, `-` or `_`.
4. Enter the **Name**, for example "Grand Hotel Group". **Alias** is optional. If you fill it in, use up to 3 letters or digits.
5. Under **First quota licence**, enter in **Business units** how many hotels the customer bought, for example `2`.
6. Pick the **Expires** date of the quota, or tick **Never expires** if the quota never ends. The card on the right shows a preview of the cluster you are creating.

   ![The completed form, with the preview card on the right](/screenshots/en/guide-setup-hotel-02-cluster-form-filled.png)

7. Click **Create cluster**. A message confirms that the cluster was created, and the new cluster's page opens. The top right shows how many more business units it can have. The subscriptions box still says there are no subscriptions; you create one in Part 4.

   ![The new cluster's page after it was created](/screenshots/en/guide-setup-hotel-03-cluster-created.png)

### Part 2: Create the business unit (the hotel)

1. In the left menu, click **Business Units**.
2. Click **Add Business Unit**. The bar at the bottom tells you what is still missing, for example **Still needed: Name, Cluster**.

   ![The new business unit form, General tab](/screenshots/en/guide-setup-hotel-04-bu-form-empty.png)

3. Click the heading **(unnamed business unit)** and type the hotel's name, for example "Grand Hotel Bangkok".
4. On the **Cluster** row, click **Set cluster…** and pick the cluster you created in Part 1.

   ![Hotel name entered and cluster picked](/screenshots/en/guide-setup-hotel-05-bu-form-filled.png)

5. The **Location** and **Formats** tabs hold the hotel's address and display formats. You can fill them in now or later.
6. The **Technical** tab has a **Database Connection** box, which says where this hotel's data is kept. Leave it as it is. The technical team sets this part (see Part 6).

   ![The Technical tab, Database Connection box (values hidden in this picture)](/screenshots/en/guide-setup-hotel-06-bu-technical.png)

   ::: warning Don't change the database connection yourself
   If this box is set wrongly, the hotel may not be able to open its own data, or may be connected to a database that isn't its own. If you are not sure, leave it empty and tell the technical team.
   :::

7. Click **Create Business Unit** in the bottom bar. The message **Business unit created successfully** appears. The business unit gets a code that starts with `BU-`, and the **Users** and **Licenses** tabs appear.

   ![The new business unit's page after it was created](/screenshots/en/guide-setup-hotel-07-bu-created.png)

### Part 3: Give the hotel its seats

1. Open the cluster's page (**Clusters**, then click the cluster's name).
2. Click **Manage licences**. The cluster's licence page opens on the **BU quota** tab. You see the quota licence created with the cluster, and the hotels in the cluster.

   ![The cluster's licence page, BU quota tab](/screenshots/en/guide-setup-hotel-08-license-center.png)

3. Click the **Seats** tab. The new hotel's row says **No seat license**.

   ![Seats tab: the new hotel has no seats yet](/screenshots/en/guide-setup-hotel-09-seats-tab-empty.png)

4. Click **Add seat license** on the hotel's row.
5. In **Seats**, enter how many users the customer bought, for example `5`.
6. Pick the start and end dates from the contract. **Reference No.** is optional; you can use it for the purchase order number. The licence number is given automatically when you save.

   ![The completed Add seat license form](/screenshots/en/guide-setup-hotel-10-seat-form-filled.png)

7. Click **Create License**.
8. Go back to the cluster's licence page.
9. Click the **Seats** tab. The hotel's row shows the number of seats, with a licence in **Active** status.

   ![Seats tab after the seat licence was added](/screenshots/en/guide-setup-hotel-11-seat-license-added.png)

### Part 4: Create the subscription

This part is required. The subscription says which Carmen features the hotel may use. If the hotel has no active subscription, then once licence checking is switched on, the hotel's users are refused when they use those features.

1. Create a subscription for the hotel and tick the feature bundles the customer bought, following [Manage a License, Part 2: Create a subscription and pick its feature bundles](/en/guides/manage-license#subscription).
2. Come back and continue with Part 5.

### Part 5: Put the staff member in the cluster and the hotel

A user must be in the cluster before they can be added to one of its business units.

1. Open the cluster's page.
2. Click the **Users** tab.
3. Click **Add User**. The **Add User to Cluster** box opens.
4. Type the staff member's name or email, then click their name in the results.
5. Under **Cluster Role**, choose **User** (can only use the system) or **Admin** (can manage other users in the cluster). The line below shows how many seats are already in use.

   ![The Add User to Cluster box with a user picked](/screenshots/en/guide-setup-hotel-12-cluster-add-user-dialog.png)

6. Click **Add User**. The message **User added to cluster** appears and the staff member is in the list. The account of the person who created the cluster is in the list from the start.

   ![The cluster's user list after adding the user](/screenshots/en/guide-setup-hotel-13-cluster-user-added.png)

7. Open the business unit's page (**Business Units**, then click the hotel's name).
8. Click the **Users** tab.
9. Click **Add User**. The **Add User to Business Unit** box opens. It only lists people who are already in the cluster.
10. Type the name or email, then click the name in the results.
11. Under **BU Role**, choose **Admin** or **User**.

    ![The Add User to Business Unit box with the Admin role](/screenshots/en/guide-setup-hotel-14-bu-add-user-dialog.png)

12. Click **Add User**. The message **User added to business unit** appears.

    ![The business unit's user list after adding the user](/screenshots/en/guide-setup-hotel-15-bu-user-added.png)

### Part 6: Have the technical team prepare the hotel's database

Creating a business unit does not create a database for the hotel. Staff can start working only after the technical team has prepared the hotel's database.

1. Tell the technical team the hotel's name and its `BU-` code, so they can set the **Database Connection** on the business unit's **Technical** tab.
2. The technical team updates the hotel's database on the [Tenant Migrations](/en/screens/organization/tenant-migrations) screen and fills in its starting data on the [Tenant Seed Data](/en/screens/organization/tenant-seeds) screen.
3. When the technical team says it is done, tell the staff member they can start.

::: tip You can check the status yourself
Both screens have a **Check** button that changes nothing. You can safely use it to see the hotel's status, but do not update or fill in data yourself unless you have been asked to.
:::

## Check that it worked

- On the cluster's page, the top right shows the business units in use against the quota, for example **1 / 2**, and the seats in use.
- On the cluster's licence page, the summary bar shows the number of seats and contracts, and the **1 BU without seats** warning is gone.
- The business unit's **Licenses** tab shows the subscription (its number starts with `SUB-`) with **Active** status.
- The business unit's **Users** tab lists the staff member, with their **BU Role** and **Active** status.
- After the technical team finishes Part 6, the hotel's row shows **In sync** on **Tenant Migrations** and **Seeded** on **Tenant Seed Data**.

## Troubleshooting

- **Red text under Code:** the code must be 2–20 English letters, digits, `-` or `_`, with no spaces.
- **Red text under the cluster's Alias:** the alias may have at most 3 characters, letters or digits only.
- **Create Business Unit can't be clicked and the bottom bar says something is still needed:** enter the hotel's name and pick the cluster.
- **You can't create the business unit because the cluster has used its whole quota:** add a BU quota licence, see [Manage a License](/en/guides/manage-license#bu-quota).
- **The staff member can't be found in Add User to Cluster:** the account may not exist yet. Create it first with [Add a User](/en/guides/add-user).
- **The staff member can't be found in Add User to Business Unit:** add them to the cluster first (Part 5, steps 1–6).
- **You can't add the user to the business unit because there are no free seats:** add a seat licence for the hotel first (Part 3).
- **The hotel's users are refused when they use a feature:** check that the hotel has an active subscription that includes the feature bundle they need (Part 4).
- **A menu or button in this guide is missing, or you see Access Denied:** your role may not cover this work. See [Access Denied screen](/en/getting-started/common-actions#access-denied).

## Related screens

- [Clusters](/en/screens/organization/clusters)
- [Business Units](/en/screens/organization/business-units)
- [Licenses](/en/screens/license/licenses)
- [Users](/en/screens/organization/users)
- [Common actions: Save and Cancel](/en/getting-started/common-actions#save-cancel)
