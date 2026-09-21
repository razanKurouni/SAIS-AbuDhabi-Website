export const siteHeader = {
  name: "siteHeader",
  title: "Menu / Header",
  type: "document",
  fields: [
    {
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
      description: "Main SAIS logo shown on the left side of the header.",
    },
    {
      name: "scrolledLogo",
      title: "Scrolled Logo",
      type: "imageWithAlt",
      description: "White logo shown after the visitor scrolls.",
    },
    {
      name: "menuIcon",
      title: "Menu Icon",
      type: "imageWithAlt",
      description: "Optional uploaded menu icon. Leave empty to use the animated SAIS wave icon.",
    },
    {
      name: "navigation",
      title: "Navigation Links",
      type: "array",
      of: [{ type: "linkField" }],
      description: "Main menu items shown in the full-screen menu.",
    },
    {
      name: "bookTourButton",
      title: "Book a Tour Button",
      type: "cta",
      description: "Controls the label, link, and style for the Book a Tour button.",
    },
    {
      name: "applyNowButton",
      title: "Apply Now Button",
      type: "cta",
      description: "Controls the label, link, and style for the Apply Now button.",
    },
  ],
  preview: {
    select: {
      media: "logo.image",
    },
    prepare({ media }) {
      return {
        title: "Menu / Header",
        subtitle: "Logo, menu links, and header buttons",
        media,
      };
    },
  },
};
