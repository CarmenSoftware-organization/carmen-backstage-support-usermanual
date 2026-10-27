# Manage a License

## What you'll accomplish

This guide shows how to record what a customer has bought. When you finish, you will be able to:

- open the licence status (what the customer has bought) of a **Cluster** (one customer's group of hotels)
- create a **Subscription** (the usage contract of one hotel) and pick the feature bundles the customer bought
- add **Seats** (how many users a hotel may have)
- add **BU quota** (how many hotels a cluster may create)
- add an **Interface license** (permission for a hotel to connect to an outside system, such as an accounting system)
- create a new **License Feature Group** (a ready-made bundle of features to pick when selling)

Each part stands on its own. Do only the parts you need.

**Who can do this:** a super admin, or someone whose Backstage Role (the set of permissions that says what you may do) lets them manage Licenses and License Feature Groups.

**What you need first**

- The cluster and the Business Unit (one hotel or branch) must already exist. If not, see [Set Up a New Hotel](/en/guides/setup-hotel).
- The details from the purchase order or contract: amounts, start and end dates, the purchase order number, and the feature bundles bought.

::: tip Names in the pictures
The pictures in this guide use sample names that start with `MANUAL-DEMO-`. In real use you will see the customer's real names, such as "Grand Hotel Group" and "Grand Hotel Bangkok".
:::

## Steps

### Part 1: Open a cluster's licence page {#open}

1. In the left menu, click **Licenses**. The top of the page shows **Fleet capacity**, an overview of all clusters together.
2. On the **By cluster** tab, type the cluster's name or code in the search box. See also [Search](/en/getting-started/common-actions#search).

   ![The Licenses page, searched down to one cluster](/screenshots/en/guide-manage-license-01-licenses-list.png)

3. Click the cluster's code (blue text). The cluster's licence page opens. The bar at the top sums up the hotels, seats and contracts, and there are **BU quota**, **Seats** and **Subscriptions** tabs.

   ![A cluster's licence page](/screenshots/en/guide-manage-license-02-license-center.png)

   You can also open this page from the cluster's own page, with the **Manage licences** button.

### Part 2: Create a subscription and pick its feature bundles {#subscription}

1. Click the **Subscriptions** tab, then click **Add subscription**.

   ![The Subscriptions tab with no contract yet](/screenshots/en/guide-manage-license-03-subscriptions-tab-empty.png)

2. **Cluster** is already filled in. Pick the **Business Unit** the contract is for. A subscription belongs to one business unit and can't be moved to another one later.
3. Pick the start and end dates, or click a month under **Common terms** to pick a range faster. The card on the right shows how many months the contract covers.

   ![The completed Add Subscription form](/screenshots/en/guide-manage-license-04-subscription-form-filled.png)

4. Click **Create Subscription**. A message confirms that the subscription was created, and its page opens. Its number starts with `SUB-`. In the **Amend contract** box you can change only the dates and the status.

   ![The new subscription's page](/screenshots/en/guide-manage-license-05-subscription-created.png)

5. In the **Purchased groups** box, tick the feature bundles the customer bought, for example **Full Access**. The number next to each name is how many features it holds. The bottom bar shows **Unsaved changes**.

   ![Feature bundles ticked, not saved yet](/screenshots/en/guide-manage-license-06-subscription-groups-picked.png)

6. Click **Save Changes**. The message **Changes saved successfully** appears.

   ![The subscription's page after saving](/screenshots/en/guide-manage-license-07-subscription-saved.png)

### Part 3: Add seats {#seats}

1. Go back to the cluster's licence page and click the **Seats** tab.
2. Click **Add seat license** on the hotel's row.
3. In **Seats**, enter how many users were bought, for example `10`. In **Reference No.**, you can enter the purchase order number (optional).
4. Pick the start and end dates. The licence number is given automatically when you save.

   ![The completed Add seat license form](/screenshots/en/guide-manage-license-08-seat-form-filled.png)

5. Click **Create License**.
6. Go back to the cluster's licence page.
7. Click the **Seats** tab. The new licence is under the hotel's name, with **Active** status.

   ![Seats tab with the new licence](/screenshots/en/guide-manage-license-09-seats-added.png)

If a hotel has several seat licences active at the same time, the system adds them all up. For example, two licences of 5 seats each give 10 seats.

### Part 4: Add BU quota {#bu-quota}

1. On the cluster's licence page, **BU quota** tab, click **Add BU quota license**.
2. In **BU quota**, enter the total number of hotels this cluster may have, for example `3`. **Reference No.** is optional.
3. Pick the start date. Then choose **Has an end date** and pick the end date, or choose **No expiry**.
4. Use **Note** for any extra details (optional).

   ![The Add BU quota license form with No expiry](/screenshots/en/guide-manage-license-10-bu-quota-form-filled.png)

5. Click **Create License**.
6. Go back to the cluster's licence page. The **BU quota** tab lists all of the cluster's quota licences.

   ![BU quota tab with two licences](/screenshots/en/guide-manage-license-11-bu-quota-added.png)

BU quota works differently from seats. The system does not add quota licences up. It uses only one: the one that started most recently. The others show **Superseded**.

Why the new licence in the picture shows **Superseded**: the cluster's first quota licence, made together with the cluster, starts at the exact moment the cluster was created. A licence made with this form starts at the beginning of the day you pick.

- If the new licence starts on the day the cluster was created, the first licence counts as the later one, so it stays in use (quota 2 in the picture).
- If the new licence starts on the next day or later, it takes over as soon as its start date arrives.
- If two licences made with this form start on the same day, the one created later is used.

::: warning Cancel license can't be undone
The **Cancel license** button on a quota licence's row stops that licence from giving any quota. The licence stays in the list so it can be checked later, but it can't be switched back on. Make sure before you click it.
:::

### Part 5: Add an interface license {#interface}

1. In the left menu, click **Business Units**, then click the hotel's name.
2. Click the **Licenses** tab. The **User Licenses** box shows the hotel's seats and contract. The **Interface licenses** box shows its connections to outside systems.

   ![A business unit's Licenses tab](/screenshots/en/guide-manage-license-12-bu-licenses-tab.png)

3. Click **Add interface license**.
4. In **Feature group**, pick the system to connect to, for example **Interface Carmen GL**. This list only shows Interface-kind groups that are on sale.
5. Pick the start and end dates, or choose **No expiry**. **Reference No.** and **Note** are optional.

   ![The completed Add interface license form](/screenshots/en/guide-manage-license-13-interface-form-filled.png)

6. Click **Create License**.
7. Go back to the business unit's **Licenses** tab. The new licence (its number starts with `INF-`) is listed with **Active** status.

   ![The business unit's Licenses tab with the interface licence](/screenshots/en/guide-manage-license-14-interface-added.png)

An interface license only works while the hotel's main contract is active. If the main contract expires, the connection is switched off, even if the interface license's own dates have not ended.

### Part 6: Create a new License Feature Group {#feature-group}

There is no button to copy a group. If you need a bundle that is like an existing one, create a new group and pick the features yourself.

1. In the left menu, click **License Feature Groups**. The **License Catalog** page opens on the **Bundles** tab.

   ![The License Catalog page, Bundles tab](/screenshots/en/guide-manage-license-15-feature-groups-list.png)

2. Click **New group**.
3. Enter the group's **Code**. The code can't be changed after the group is created.
4. Choose the **Kind**: **Standard** for bundles sold on the main contract, or **Interface** for interface licenses. The kind can only be set when you create the group.
5. Enter the **Name**, and a **Description** if you like.
6. Enter the **Sort order**: where this bundle sits on the sales form. Lower numbers come first. Use a number no other group uses.
7. Under **Status**, choose **On sale** if the bundle should be available for new contracts, or **Withdrawn**.
8. In **Features in this group**, tick the features you want, or click **Select all in** followed by a section name to take the whole section. The number at the top right shows how many features you have picked.

   ![The completed new group form](/screenshots/en/guide-manage-license-16-feature-group-form-filled.png)

9. Click **Save Changes** in the bottom bar. The message **Group created** appears.

   ![The new group's page after saving](/screenshots/en/guide-manage-license-17-feature-group-created.png)

## Check that it worked

- On the cluster's licence page, the summary bar shows the hotels, seats and contracts the customer bought.
- The business unit's **Licenses** tab shows the subscription and the interface license with **Active** status.
- The BU quota licence you want to count has **Active** status, not **Superseded**.
- A new group that is **On sale** appears in the subscription's **Purchased groups** box (Standard kind), or in the **Feature group** list of an interface license (Interface kind).

## Troubleshooting

- **A new BU quota licence shows Superseded:** another licence that started later is still the one in use, or the new licence starts on the day the cluster was created. See the note at the end of Part 4.
- **A subscription was created for the wrong business unit:** subscriptions can't be moved. Create a new subscription for the right business unit.
- **"No active interface group to sell — create one under License Feature Groups first":** create a group of the **Interface** kind with **On sale** status first (Part 6).
- **An interface license says its dates are valid but the main contract has ended:** renew the hotel's main contract first. The interface comes back on after that.
- **Orange text under Sort order saying another group already holds this order:** change it to a number no other group uses.
- **A group's code or kind is wrong:** these can't be changed after the group is created. Create a new, correct group and set the wrong one to **Withdrawn**.
- **A button in this guide is missing, or you see Access Denied:** see [Access Denied screen](/en/getting-started/common-actions#access-denied).

## Related screens

- [Licenses](/en/screens/license/licenses)
- [License Feature Groups](/en/screens/license/license-feature-groups)
- [License Features](/en/screens/license/license-features)
- [Business Units](/en/screens/organization/business-units)
- [Clusters](/en/screens/organization/clusters)
- [Common actions: Unsaved-changes warning](/en/getting-started/common-actions#unsaved-changes)
