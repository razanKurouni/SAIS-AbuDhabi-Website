export const newsPost = {
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "News & Event", value: "news" },
          { title: "Newsletter", value: "newsletter" },
        ],
        layout: "radio",
      },
      initialValue: "news",
    },
    { name: "featured", title: "Featured Post", type: "boolean", initialValue: false },
    { name: "publishedAt", title: "Published Date", type: "datetime" },
    { name: "excerpt", title: "Card Summary", type: "text", rows: 4 },
    {
      // A plain image with the same alt field as the shared "picture" type: Sanity cannot switch the crop tool on
      // for a field of a named image type that has it off, so this field is defined in place.
      name: "image",
      title: "Featured Image",
      type: "image",
      description:
        "Open the crop tool and drag the circle onto the part of the photo that must always show (for example a face). The site keeps that point in view wherever it crops the photo; the crop frame itself is not used.",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for accessibility and SEO.",
        },
      ],
    },
    { name: "body", title: "Full Article", type: "blockContent" },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
};
