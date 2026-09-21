export const studentProgramsPage = {
  name: "studentProgramsPage",
  title: "Achievements Page",
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
      name: "innerNavigation",
      title: "Inner Navigation",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "href", title: "URL", type: "string" },
                { name: "openInNewTab", title: "Open in new tab", type: "boolean" },
              ],
            },
          ],
        },
        { name: "activeHref", title: "Active URL", type: "string" },
        { name: "activeColor", title: "Active Color", type: "string" },
        { name: "inactiveColor", title: "Inactive Color", type: "string" },
        { name: "textColor", title: "Text Color", type: "string" },
        { name: "dividerColor", title: "Divider Color", type: "string" },
        { name: "topLineColor", title: "Top Line Color", type: "string" },
        { name: "ariaLabel", title: "Accessibility Label", type: "string" },
      ],
    },
    {
      name: "excellenceIntro",
      title: "Honoring Excellence Intro",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Title and copy beside an image, the first section on the page.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Side",
          type: "string",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
          },
          initialValue: "right",
        },
        { name: "backgroundColor", title: "Background Color", type: "string", description: "Optional CSS color, for example #ffffff." },
        { name: "titleColor", title: "Title Color", type: "string", description: "Optional CSS color, for example #216B97." },
        { name: "textColor", title: "Text Color", type: "string", description: "Optional CSS color, for example #666B70." },
      ],
    },
    {
      name: "highlightsSection",
      title: "Competitions and Platforms",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Full-width image with the copy on the curved panel beside it.",
      fields: [
        {
          name: "heading",
          title: "Text Content",
          type: "sectionHeading",
          description: "The title is read by screen readers only; the panel shows the Description.",
        },
        { name: "image", title: "Image", type: "imageWithAlt" },
      ],
    },
    {
      name: "communitySection",
      title: "Community Celebrations",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Copy beside an image on a colored band, the last section on the page.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Side",
          type: "string",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
          },
          initialValue: "right",
        },
        { name: "backgroundColor", title: "Background Color", type: "string", description: "Optional CSS color, for example #F2F2F2." },
        { name: "textColor", title: "Text Color", type: "string", description: "Optional CSS color, for example #666B70." },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Student Programs",
        subtitle: "Student Life detail page",
      };
    },
  },
};
