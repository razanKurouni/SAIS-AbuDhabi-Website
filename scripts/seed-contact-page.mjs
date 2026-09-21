import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

async function uploadImage(path, filename, title) {
  if (!fs.existsSync(path)) {
    throw new Error(`Image was not found at ${path}`);
  }

  const asset = await client.assets.upload("image", fs.createReadStream(path), {
    filename,
    title,
  });

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    alt: title,
  };
}

const heroImage = await uploadImage(
  "public/about-hero-building.jpg",
  "contact-hero-building.jpg",
  "Sharjah American International School campus building"
);

const contactInfoImage = await uploadImage(
  "public/contact-campus-building.jpg",
  "contact-campus-building.jpg",
  "Sharjah American International School campus entrance"
);

await client.createOrReplace({
  _id: "contact-page",
  _type: "contactPage",
  seo: {
    _type: "seo",
    title: "Contact Us | SAIS - Sharjah",
    description: "Contact Sharjah American International School.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      eyebrow: "Contact Us",
      title: "Contact Sharjah American International School",
    },
    image: heroImage,
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "60%",
  },
  contactInfo: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Investing in Continuous Professional Growth",
    },
    image: contactInfoImage,
    imagePosition: "center",
    panelColor: "#216B97",
    waveColor: "#d97252",
    textColor: "#ffffff",
    items: [
      {
        _key: "contact-address",
        _type: "object",
        icon: "location",
        label: "Campus Address",
        text: "Sharjah American International School Campus\nP.O. Box 47755 , Al Warqa 1,\nDubai, UAE.",
      },
      {
        _key: "contact-phone",
        _type: "object",
        icon: "phone",
        label: "Phone",
        text: "+971 4 280 1111",
        href: "tel:+97142801111",
      },
      {
        _key: "contact-email",
        _type: "object",
        icon: "email",
        label: "Email",
        text: "sais_dubai@saisdubai.com",
        href: "mailto:sais_dubai@saisdubai.com",
      },
    ],
  },
});

console.log("Seeded contact-page with editable hero and contact information content.");
