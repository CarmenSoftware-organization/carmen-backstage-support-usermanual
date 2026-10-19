# Add a User

## What you'll accomplish

This guide takes you through creating an account for a new staff member, up to the point where they can work in their own hotel. When you finish, you will have:

- a new user account with a name, an email and **Active** status
- the user in a **Cluster** (one customer's group of hotels), with a cluster role
- the user in a **Business Unit** (one hotel or branch), with a role in that business unit
- a password for their first sign-in

The guide also shows how to change the name, and how to switch an account off for a while.

**Who can do this:** a super admin, or someone whose Platform Role (the set of permissions that says what you may do) lets them manage Users and Clusters.

**What you need first**

- The staff member's email, for example `somchai@grandhotelbangkok.com`
- Their first name and last name
- The cluster and business unit they will use, already created. If not, see [Set Up a New Hotel](/en/guides/setup-hotel).
- At least one free seat (a place for one more user) in that business unit

::: tip Names in the pictures
The pictures in this guide use sample names and emails that start with `manual-demo-` or `MANUAL-DEMO-`. When you do this for real, use the staff member's and hotel's real details.
:::

## Steps

### Part 1: Create the account

1. In the left menu, click **Users**. The **User Management** page opens.

   ![The User Management page](/screenshots/en/guide-add-user-01-users-list.png)

2. Click **Add User** at the top right. The **Add User** form opens.

   ![The empty Add User form](/screenshots/en/guide-add-user-02-form-empty.png)

3. In **Username**, enter the staff member's email. They sign in with this username, and it can't be changed once the account exists.
4. Enter the **Email**. Usually this is the same as the username.
5. Enter the **First Name** and **Last Name**. **Middle Name** is optional.
6. **Alias Name** is optional. It is shown instead of the full name where space is tight. If you fill it in, use up to 3 letters or digits, for example `SOM`.
7. Leave **Active** ticked.

   ![The completed form](/screenshots/en/guide-add-user-03-form-filled.png)

8. Click **Create User**. A message confirms that the user was created, and the user's page opens. Under the name it says **No access assigned yet**, because the user is not in any cluster yet.

   ![The user's page after it was created](/screenshots/en/guide-add-user-04-created.png)

   In the sample picture the alias has 4 characters, so a red message appears. Use 3 or fewer when you do this for real.

### Part 2: Change details or switch the account off

Do this part when you need to fix a name, or stop someone from signing in.

9. On the user's page, click **Edit** at the top right. See also [View mode and edit mode](/en/getting-started/common-actions#view-edit).
10. Change the name as needed, for example add a **Middle Name**.
11. To switch the account off for a while, untick **Active**. An inactive user keeps every assignment but cannot sign in. Tick it again to switch the account back on.

    ![Edit mode, showing Active and Save Changes](/screenshots/en/guide-add-user-05-edit-status.png)

12. Click **Save Changes**. The message **Changes saved successfully** appears.

    ![The user's page after saving](/screenshots/en/guide-add-user-06-saved.png)

### Part 3: Put the user in a cluster

A user must be in a cluster before they can be given that cluster's business units.

13. In the left menu, click **Clusters**, then click the hotel's cluster.
14. Click the **Users** tab, then click **Add User**. The **Add User to Cluster** box opens.
15. Type the user's name or email, then click their name in the results.
16. Under **Cluster Role**, choose **User** (can only use the system) or **Admin** (can manage other users in the cluster).

    ![The Add User to Cluster box](/screenshots/en/guide-add-user-07-cluster-add-user-dialog.png)

17. Click **Add User**. The message **User added to cluster** appears, and the user is in the cluster's list.

    ![The cluster's user list after adding the user](/screenshots/en/guide-add-user-08-cluster-user-added.png)

### Part 4: Give the user a business unit

18. Go back to the user's page (**Users**, then click the user's name).
19. In the **Access** box, click **Add BU**. The **Add Business Unit** box opens.
20. Pick the **Cluster** first, then the **Business Unit**.
21. Under **BU Role**, pick the user's role in this hotel, for example **Admin**.

    ![The Add Business Unit box with cluster, business unit and role picked](/screenshots/en/guide-add-user-09-add-bu-dialog.png)

22. Click **Add**. The message **Business unit assigned successfully** appears. The **Access** box now shows the cluster with its role, and the business unit with its role and **Active** status.

    ![The Access box showing the cluster and the business unit](/screenshots/en/guide-add-user-10-bu-assigned.png)

### Part 5: Set a password

23. On the user's page, click **Change password** at the top right.

    ![The change password box](/screenshots/en/guide-add-user-11-password-dialog.png)

24. Type a password in **New Password**. It must have at least 6 characters.
25. Type the same password again in **Confirm Password**.

    ![Passwords typed in (hidden in this picture)](/screenshots/en/guide-add-user-12-password-filled.png)

26. Click **Update Password**. The message **Password changed successfully** appears.

    ![The user's page after the password was changed](/screenshots/en/guide-add-user-13-password-changed.png)

27. Give the username and password to the staff member in a safe way, for example in person, and never both in the same email.

## Check that it worked

- On the user's page, the **Active** badge is next to the name.
- The **Access** box shows the cluster with its role, and the business unit with its role and **Active** status. Under the user's name, a line says how many business units and clusters the user can reach.
- On the business unit's page, the **Users** tab lists this user.
- The staff member can sign in with the username and password you set.

## Troubleshooting

- **"Username must be a valid email address":** the username must be an email, for example `somchai@grandhotelbangkok.com`.
- **"Alias must be 1-3 alphanumeric characters":** the alias is longer than 3 characters, or has a space or a symbol. Shorten it.
- **The username was typed wrongly:** a username can't be changed after the account exists. Create a new account with the right username, then delete the wrong one. See [Row menu](/en/getting-started/common-actions#row-actions).
- **The cluster you need isn't offered in Add Business Unit:** the user is not in that cluster yet. Do Part 3 first.
- **You can't add the business unit because the seats are full:** the hotel has used all its seats. Add a seat licence, see [Manage a License](/en/guides/manage-license), or take users who no longer work there out of that business unit.
- **"Passwords do not match":** both fields in the change password box must be exactly the same.
- **The staff member can't sign in:** check that **Active** is still ticked, and that the user has a business unit in the **Access** box.
- **A button in this guide is missing, or you see Access Denied:** see [Access Denied screen](/en/getting-started/common-actions#access-denied).

## Related screens

- [Users](/en/screens/organization/users)
- [Clusters](/en/screens/organization/clusters)
- [Business Units](/en/screens/organization/business-units)
- [Common actions: Search](/en/getting-started/common-actions#search)
- [Common actions: Change history](/en/getting-started/common-actions#activity-trail)
