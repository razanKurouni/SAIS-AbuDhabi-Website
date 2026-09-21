import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });
const sourcePath = "/Users/razan/Downloads/Group 241.png";

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Hero card image was not found at ${sourcePath}`);
}

const asset = await client.assets.upload("image", fs.createReadStream(sourcePath), {
  filename: "Group 241.png",
  title: "SAIS blue hero text box shape",
});

await client
  .patch("homepage-main")
  .set({
    "hero.cardImage": {
      _type: "imageWithAlt",
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
      alt: "SAIS blue hero text box shape",
    },
  })
  .commit();

console.log(`Updated homepage-main hero.cardImage with ${asset._id}`);
