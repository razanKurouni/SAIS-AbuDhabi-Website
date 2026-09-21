import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

const fallbackNavigation = [
  { _type: "linkField", _key: "about", label: "About", href: "/about-us#about", openInNewTab: false },
  { _type: "linkField", _key: "academics", label: "Academics", href: "#academics", openInNewTab: false },
  { _type: "linkField", _key: "admissions", label: "Admissions", href: "#admissions", openInNewTab: false },
  { _type: "linkField", _key: "community", label: "Community", href: "#community", openInNewTab: false },
  { _type: "linkField", _key: "contact", label: "Contact", href: "/contact-us", openInNewTab: false },
];

const fallbackHeaderButtons = {
  bookTourButton: {
    _type: "cta",
    label: "Book a Tour",
    href: "#tour",
    variant: "primary",
    openInNewTab: false,
  },
  applyNowButton: {
    _type: "cta",
    label: "Apply Now",
    href: "#apply",
    variant: "secondary",
    openInNewTab: false,
  },
};

const fallbackFooter = {
  logoText: "SAIS",
  contactText: [],
  columns: [],
  socialLinks: [],
  legalLinks: [],
};

const homepage = await client.getDocument("homepage-main");

await client.createOrReplace({
  _id: "site-header-main",
  ...(homepage?.header || fallbackHeaderButtons),
  _type: "siteHeader",
  bookTourButton: homepage?.header?.bookTourButton || fallbackHeaderButtons.bookTourButton,
  applyNowButton: homepage?.header?.applyNowButton || fallbackHeaderButtons.applyNowButton,
  navigation: homepage?.navigation || fallbackNavigation,
});

await client.createOrReplace({
  _id: "site-footer",
  _type: "siteFooter",
  ...(homepage?.footer || fallbackFooter),
});

console.log("Created/updated singleton documents: site-header-main and site-footer.");
