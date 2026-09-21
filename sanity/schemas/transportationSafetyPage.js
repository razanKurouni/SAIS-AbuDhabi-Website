export const transportationSafetyPage = {
  name: "transportationSafetyPage",
  title: "Transportation Safety Guidelines Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo", options: { collapsible: true, collapsed: false } },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "heading", title: "Hero Text", type: "sectionHeading" },
        { name: "image", title: "Hero Image (Desktop)", type: "imageWithAlt" },
        { name: "mobileImage", title: "Hero Image (Mobile)", type: "imageWithAlt", description: "Optional image used on screens up to 920px wide. Falls back to the desktop image when empty." },
        { name: "topLineColor", title: "Top Line Color", type: "string" },
        { name: "panelColor", title: "Panel Background Color", type: "string" },
        { name: "waveColor", title: "Curved Line Color", type: "string" },
        { name: "textColor", title: "Text Color", type: "string" },
        { name: "imagePosition", title: "Image Position", type: "string" },
        { name: "imageWidth", title: "Desktop Image Width", type: "string" },
      ],
    },
    {
      name: "safetyHighlight",
      title: "Student Safety Highlight Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description:
        "Coloured band with a centred heading and a wide image that hangs over the section below it.",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 50% 40%.",
        },
        {
          name: "backgroundColor",
          title: "Background Color",
          type: "string",
          description: "Optional CSS color for the band, for example #216B97.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the title, for example #00A5B2.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color for the paragraph, for example #ffffff.",
        },
      ],
    },
    {
      name: "boardingSection",
      title: "Boarding & Supervision Section",
      type: "imageTextSection",
      options: { collapsible: true, collapsed: false },
      description: "Image beside body copy, shown under the Student Safety Highlight section.",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Transportation Safety Guidelines",
        subtitle: "Community detail page",
      };
    },
  },
};
