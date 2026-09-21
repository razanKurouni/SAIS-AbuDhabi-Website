import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

const logos = [
  {
    key: "ap",
    name: "College Board Advanced Placement Program",
    path: "/Users/razan/Downloads/nCxwJ2uF9o0CLCK9Nfy6YlTVEk.png",
    filename: "college-board-ap.png",
    alt: "College Board Advanced Placement Program logo",
  },
  {
    key: "cognia",
    name: "Cognia Accredited",
    path: "/Users/razan/Downloads/NT5qr4URIdMt5th4kPVG7aHQgzI.png",
    filename: "cognia-accredited.png",
    alt: "Cognia accredited logo",
  },
  {
    key: "khda",
    name: "Rated Good by KHDA",
    path: "/Users/razan/Downloads/Group 952.png",
    filename: "rated-good-by-khda.png",
    alt: "Rated Good by KHDA badge",
  },
  {
    key: "neasc",
    name: "NEASC Accredited",
    path: "/Users/razan/Downloads/rA0GpkF0HUhxGluRxydnAitWxA.png",
    filename: "neasc-accredited.png",
    alt: "NEASC accredited logo",
  },
];

async function uploadLogo(logo) {
  if (!fs.existsSync(logo.path)) {
    throw new Error(`Logo file was not found at ${logo.path}`);
  }

  const asset = await client.assets.upload("image", fs.createReadStream(logo.path), {
    filename: logo.filename,
    title: logo.alt,
  });

  return {
    _type: "object",
    _key: logo.key,
    name: logo.name,
    image: {
      _type: "imageWithAlt",
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
      alt: logo.alt,
    },
  };
}

const uploadedLogos = await Promise.all(logos.map(uploadLogo));

await client
  .patch("homepage-main")
  .set({
    accreditations: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Accreditations & Affiliations",
      },
      logos: uploadedLogos,
    },
  })
  .commit();

console.log("Updated homepage-main.accreditations with uploaded logos.");
