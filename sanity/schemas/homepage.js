export const homepage = {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo", options: { collapsible: true, collapsed: false } },
    {
      name: "hero",
      title: "Hero Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "heading", title: "Main Heading", type: "string", validation: (Rule) => Rule.required() },
        { name: "subtitle", title: "Subtitle", type: "string" },
        { name: "description", title: "Description", type: "blockContent" },
        { name: "image", title: "Hero Image (Desktop)", type: "imageWithAlt" },
        { name: "mobileImage", title: "Hero Image (Mobile)", type: "imageWithAlt", description: "Optional image used on screens up to 920px wide. Falls back to the desktop image when empty." },
        {
          name: "cardImage",
          title: "Legacy Hero Card Image",
          type: "imageWithAlt",
          hidden: true,
          description: "Kept for compatibility with earlier Homepage content.",
        },
        { name: "ctas", title: "Buttons", type: "array", of: [{ type: "cta" }] },
        {
          name: "valueBar",
          title: "Values Bar",
          type: "array",
          of: [{ type: "string" }],
          description: "Short values shown at the bottom of the hero.",
        },
      ],
    },
    { name: "intro", title: "Intro Section", type: "imageTextSection", options: { collapsible: true, collapsed: false } },
    {
      name: "growthSection",
      title: "SAIS Growth & Curriculum Section",
      type: "imageTextSection",
      options: { collapsible: true, collapsed: false },
      description: "The teal curved text and image section shown after the Homepage intro.",
    },
    {
      name: "heroContactBand",
      title: "Hero Contact Band",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "The turquoise contact strip shown below the hero.",
      fields: [
        {
          name: "text",
          title: "Text",
          type: "text",
          rows: 2,
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ctas",
          title: "Buttons",
          type: "array",
          of: [{ type: "cta" }],
        },
      ],
    },
    {
      name: "accreditations",
      title: "Accreditations",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        {
          name: "logos",
          title: "Logos",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() },
                { name: "image", title: "Logo Image", type: "imageWithAlt" },
              ],
            },
          ],
        },
      ],
    },
    { name: "whySection", title: "Why SAIS Section", type: "imageTextSection", options: { collapsible: true, collapsed: false } },
    {
      name: "facts",
      title: "Facts & Figures",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        { name: "items", title: "Metrics", type: "array", of: [{ type: "metricItem" }] },
      ],
    },
    {
      name: "whyDubai",
      title: "Why SAIS - Sharjah Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Edit the heading, subtitle, building image, icon images, and the visible text shown under each icon.",
      fields: [
        { name: "heading", title: "Website Heading & Intro Text", type: "sectionHeading" },
        { name: "image", title: "Building Image", type: "imageWithAlt" },
        {
          name: "items",
          title: "Icon Items / Visible Text",
          type: "array",
          of: [{ type: "whyDubaiItem" }],
        },
      ],
    },
    {
      name: "quickLinks",
      title: "Quick Links",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Edit the section title and all quick-link cards: image, title, text, button, and color theme.",
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        { name: "cards", title: "Cards", type: "array", of: [{ type: "featureCard" }] },
      ],
    },
    {
      name: "learningPhases",
      title: "Learning Phases",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        {
          name: "cta",
          title: "Section Button",
          type: "cta",
          description: "The See More button shown at the top right of the section.",
        },
        { name: "cards", title: "Phase Cards", type: "array", of: [{ type: "featureCard" }] },
      ],
    },
    {
      name: "tour",
      title: "Tour / Application Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        { name: "cards", title: "Cards", type: "array", of: [{ type: "featureCard" }] },
      ],
    },
    {
      name: "news",
      title: "Latest News",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Edit the latest news title, top button, and all news cards.",
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        {
          name: "cta",
          title: "Section Button",
          type: "cta",
          description: "The See All button shown at the top right of the section.",
        },
        { name: "posts", title: "News Cards", type: "array", of: [{ type: "featureCard" }] },
      ],
    },
    {
      name: "instagram",
      title: "Instagram / Social Feed",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        { name: "images", title: "Images", type: "array", of: [{ type: "imageWithAlt" }] },
        { name: "socialLinks", title: "Social Links", type: "array", of: [{ type: "linkField" }] },
      ],
    },
    {
      name: "ctaBand",
      title: "CTA Band",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "text", title: "Text", type: "text", rows: 2 },
        { name: "ctas", title: "Buttons", type: "array", of: [{ type: "cta" }] },
      ],
    },
    {
      name: "header",
      title: "Legacy Header",
      type: "object",
      options: { collapsible: true, collapsed: false },
      hidden: true,
      description: "Legacy Homepage header data. The live header is managed from Menu / Header.",
      fields: [
        { name: "logo", title: "Logo", type: "imageWithAlt" },
        { name: "bookTourButton", title: "Book a Tour Button", type: "cta" },
        { name: "applyNowButton", title: "Apply Now Button", type: "cta" },
      ],
    },
    {
      name: "navigation",
      title: "Legacy Navigation",
      type: "array",
      hidden: true,
      description: "Legacy Homepage navigation. The live navigation is managed from Menu / Header.",
      of: [{ type: "linkField" }],
    },
  ],
  preview: {
    select: {
      title: "hero.heading",
      subtitle: "seo.description",
      media: "hero.image.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Homepage",
        subtitle,
        media,
      };
    },
  },
};
