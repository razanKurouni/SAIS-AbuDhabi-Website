export const seo = {
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "title",
      title: "SEO Title",
      type: "string",
      description: "Recommended length: 50-60 characters.",
    },
    {
      name: "description",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Recommended length: 140-160 characters.",
    },
    {
      name: "image",
      title: "Social Share Image",
      type: "imageWithAlt",
    },
  ],
};
