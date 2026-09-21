export const parentInvolvementPage = {
  name: "parentInvolvementPage",
  title: "Parent Involvement Page",
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
      name: "engagementSection",
      title: "Engaging Families Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description:
        "Centred heading and intro shown above the Parents Video, plus the paragraph shown under it.",
      fields: [
        {
          name: "heading",
          title: "Heading & Intro",
          type: "sectionHeading",
          description: "Title and the paragraph that sits directly under it, above the video.",
        },
        {
          name: "bodyText",
          title: "Text Under the Video",
          type: "blockContent",
        },
        {
          name: "bandColor",
          title: "Band Color",
          type: "string",
          description: "Optional CSS color for the strip behind the video, for example #00A5B2.",
        },
        {
          name: "titleColor",
          title: "Title Color",
          type: "string",
          description: "Optional CSS color for the title, for example #216B97.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color for both paragraphs, for example #666b70.",
        },
      ],
    },
    {
      name: "videoSection",
      title: "Parents Video",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: "videoFile",
          title: "Parents Video File",
          type: "file",
          description: "Upload the parents video here. MP4 is recommended for the best browser support.",
          options: { accept: "video/*" },
        },
        { name: "poster", title: "Video Poster Image", type: "imageWithAlt" },
        {
          name: "videoUrl",
          title: "External Video URL (Optional)",
          type: "url",
          description: "Fallback direct video URL. The uploaded Parents Video File is used first when both are provided.",
        },
      ],
    },
    {
      name: "proactiveIntroSection",
      title: "A Proactive Approach Intro",
      type: "imageTextSection",
      options: { collapsible: true, collapsed: false },
      description: "Text beside an image, shown above the Proactive Approach cards.",
    },
    {
      name: "proactiveApproach",
      title: "Involvement Opportunities Slider",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "parentInvolvementIconCard",
              title: "Icon Card",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 3 },
                { name: "icon", title: "Icon", type: "imageWithAlt" },
              ],
            },
          ],
        },
        { name: "backgroundColor", title: "Background Color", type: "string" },
        { name: "titleColor", title: "Title Color", type: "string" },
        { name: "cardTextColor", title: "Card Text Color", type: "string" },
        { name: "cardBorderColor", title: "Card Border Color", type: "string" },
        { name: "cardHoverBorderColor", title: "Card Hover Border Color", type: "string" },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Parent Involvement",
        subtitle: "Community detail page",
      };
    },
  },
};
