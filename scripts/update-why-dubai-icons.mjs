import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

async function uploadIcon(path, filename, title) {
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

const icons = await Promise.all([
  uploadIcon("/Users/razan/Downloads/Group 288.svg", "why-dubai-innovation-icon.svg", "Innovation and development icon"),
  uploadIcon("/Users/razan/Downloads/Group 290.svg", "why-dubai-graduate-icon.svg", "Student success icon"),
  uploadIcon("/Users/razan/Downloads/Group 292.svg", "why-dubai-learning-styles-icon.svg", "Adaptive learning icon"),
  uploadIcon("/Users/razan/Downloads/Group 294.svg", "why-dubai-family-partnership-icon.svg", "Family partnership icon"),
]);

await client
  .patch("homepage-main")
  .set({
    'whyDubai.items[_key=="well-rounded"].icon': icons[0],
    'whyDubai.items[_key=="staff-development"].icon': icons[1],
    'whyDubai.items[_key=="adaptive-learning"].icon': icons[2],
    'whyDubai.items[_key=="school-experience"].icon': icons[3],
  })
  .commit();

console.log("Updated Why SAIS - Sharjah icons in Sanity.");
