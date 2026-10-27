# News

## Where to find it and what it is for

Left menu, group **Content** > **News**. The screen is titled **News Management**.

**News** (articles that hotel users open and read themselves) is different from [Broadcasts](/en/screens/content/broadcasts), which are notifications pushed to users. Each article has one of three statuses:

- **Draft:** still being written; readers cannot see it.
- **Published:** readers in the target business units can see it.
- **Archived:** hidden from readers but kept in the system.

## Screenshot

The list

![News Management: the latest article and status counts, and the news table](/screenshots/en/news-list.png)

The Add News form

![The Add News form: Cover image, Headline, Article and the Publish box](/screenshots/en/news-form.png)

## What you can do here

**The list**

- **See the overview:** the box at the top shows the **Latest** published article and how many articles are **Draft**, **Published** and **Archived**.
- **Search** news. See [Search](/en/getting-started/common-actions#search).
- **Filter** by status and tag. See [Filters](/en/getting-started/common-actions#filters).
- **Export** to a CSV file. See [Export to a CSV file](/en/getting-started/common-actions#export).
- **Add an article:** the **Add News** button.
- **Read the table:** **Title**, **Status**, **Target** (**System** or a number of business units), **Tags**, **Published at** and **Updated at**.
- **Row menu** (the `⋯` button): **Edit**, **Change history** and **Delete**. See [Row menu](/en/getting-started/common-actions#row-actions).
- **Act on several articles at once:** tick rows, then click **Publish Selected**, **Archive Selected** or **Delete Selected**. See [Select several records at once](/en/getting-started/common-actions#bulk-select).

**An article's page**

- An existing article opens in view mode. Click **Edit** to change it. See [View mode and edit mode](/en/getting-started/common-actions#view-edit).
- At the top: the **Cover image** and **Headline**, with tags showing the status and who can see it.
- The **Article** box: the body, source and tags.
- The **Publish** box: status, target and publish time.
- The **History** box (saved articles): who created it and who edited it last.

## Fields explained

| Field | What it means | Example / notes |
| --- | --- | --- |
| **Cover image** | The article's picture | Drag an image in or click **browse**. JPEG, PNG, WEBP, GIF, up to 5 MB. The image uploads when you save. Choose a new image to replace it. |
| **Headline** (required) | The article's title | e.g. "System maintenance on Saturday night" |
| **Body (Markdown)** | The article itself | Written in Markdown (simple marks such as `**text**` for bold). Click the **Preview** tab to see how it will look. |
| **Source URL** | A link to where the news came from | Optional; must be a valid web link |
| **Tags** | Keywords for grouping and filtering | Type and press Enter, one at a time. Tags you used before are suggested. |
| **Status** | The article's stage | **Draft**, **Published** or **Archived** |
| **Visible to all business units** | Every hotel can see it | If you untick it, choose at least one business unit |
| **Published at** | When the article was published | Set automatically when the status becomes **Published**; you cannot edit it |

## Common tasks

**Write and publish an article**

1. Click **Add News**.
2. Add a **Cover image** (if you have one) and type the **Headline**.
3. Write the **Body (Markdown)**, then click the **Preview** tab to check it.
4. Add **Tags** and a **Source URL** if needed.
5. In the **Publish** box, choose the readers: tick **Visible to all business units**, or untick it and choose business units.
6. If it is not ready, leave **Status** as **Draft**. If it is ready, choose **Published**.
7. Click **Create News**.

**Publish or archive several articles at once**

1. Tick the articles in the table.
2. Click **Publish Selected** or **Archive Selected**.
3. The confirmation box lists the chosen articles and shows a 6-character code. Type that code in the box.
4. Click the confirm button. The system tells you how many succeeded and how many failed.

To bring back an archived article, open it and change its **Status**.

## Cautions

::: warning Deleting news cannot be undone
Both deleting one article and **Delete Selected** cannot be undone, and this screen has no restore button. If you only want to hide an article from readers, use **Archive** instead.
:::

- Every bulk action asks you to type a confirmation code. The code changes each time the box opens.
- A **Published** article is visible to readers as soon as you save. Check the target before publishing.

## Related guides

There is no step-by-step guide for this screen yet. See:

- [Broadcasts](/en/screens/content/broadcasts)
- [Common Actions: Select several records at once](/en/getting-started/common-actions#bulk-select)
