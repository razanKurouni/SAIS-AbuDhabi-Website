export const admissionsWithdrawalPage = {
  name: "admissionsWithdrawalPage",
  title: "Admissions Withdrawal Page",
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
      title: "Admissions Navigation",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "items", title: "Navigation Items", type: "array", of: [{ type: "linkField" }] },
        { name: "activeHref", title: "Active Page URL", type: "string" },
        { name: "activeColor", title: "Active Color", type: "string" },
        { name: "inactiveColor", title: "Inactive Color", type: "string" },
        { name: "textColor", title: "Text Color", type: "string" },
        { name: "dividerColor", title: "Divider Color", type: "string" },
        { name: "topLineColor", title: "Top Line Color", type: "string" },
        { name: "ariaLabel", title: "Accessibility Label", type: "string" },
      ],
    },
    {
      name: "intro",
      title: "Withdrawal Information",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "heading", title: "Large Intro Title", type: "sectionHeading" },
        { name: "image", title: "Section Image", type: "imageWithAlt" },
        { name: "policyTitle", title: "Policy Details Title", type: "string" },
        { name: "body", title: "Policy Steps and Contact Information", type: "blockContent" },
        { name: "imagePosition", title: "Image Position", type: "string" },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Student Withdrawal Process", subtitle: "Admissions withdrawal page" };
    },
  },
};
