import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });
const sourcePath = "/Users/razan/Downloads/_DEL4004.jpg";

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Contact section image was not found at ${sourcePath}`);
}

const asset = await client.assets.upload("image", fs.createReadStream(sourcePath), {
  filename: "contact-campus-building.jpg",
  title: "SAIS - Sharjah campus entrance",
});

await client.createIfNotExists({
  _id: "contact-page",
  _type: "contactPage",
});

await client
  .patch("contact-page")
  .set({
    contactInfo: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Investing in Continuous Professional Growth",
      },
      image: {
        _type: "imageWithAlt",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
        alt: "Sharjah American International School campus entrance",
      },
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
  })
  .commit();

console.log(`Updated contact-page.contactInfo with ${asset._id}`);
