import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

const asset = await client.assets.upload(
  "image",
  fs.createReadStream("/Users/razan/Downloads/_NEC6222.jpg"),
  {
    filename: "latest-news-classroom-reading.jpg",
    title: "SAIS teacher reading with students",
  }
);

const image = {
  _type: "imageWithAlt",
  image: {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  },
  alt: "SAIS teacher reading with students",
};

await client
  .patch("homepage-main")
  .set({
    'news.posts[_key=="news-1"].image': image,
    'news.posts[_key=="news-2"].image': image,
    'news.posts[_key=="news-3"].image': image,
  })
  .commit();

console.log("Updated Latest News images in Sanity.");
