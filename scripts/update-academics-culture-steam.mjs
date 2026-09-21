import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

function block(_key, text) {
  return {
    _key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: `${_key}-span`, _type: "span", marks: [], text }],
  };
}

async function uploadImage(path, filename, alt) {
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}`,
    { filename }
  );
  const asset = existing || await client.assets.upload("image", fs.createReadStream(path), { filename, title: alt });
  return {
    _type: "imageWithAlt",
    alt,
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
  };
}

const cultureImage = await uploadImage(
    "public/images/academics-culture.jpg",
    "academics-rooted-in-culture.jpg",
    "SAIS - Sharjah students connecting with Emirati culture"
  );
const steamImage = await uploadImage(
    "public/images/academics-steam.jpg",
    "academics-steam-integration.jpg",
    "SAIS - Sharjah student completing classwork"
  );

const cultureSection = {
  _type: "imageTextSection",
  heading: {
    _type: "sectionHeading",
    title: "Rooted in Culture, Prepared for the World",
    description: [
      block(
        "culture-requirements",
        "In line with the UAE Ministry of Education requirements, we incorporate Arabic Language, Islamic Studies, UAE Social Studies, and Moral Education across all grade levels. This ensures students remain rooted in their cultural identity while embracing global perspectives."
      ),
      block(
        "culture-support",
        "Both native and non-native speakers receive targeted support in Arabic, and Islamic education is offered in both Arabic and English."
      ),
    ],
  },
  image: cultureImage,
  imagePosition: "center",
  theme: "dark",
};

const steamSection = {
  _type: "imageTextSection",
  heading: {
    _type: "sectionHeading",
    title: "STEAM Integration",
    description: [
      block(
        "steam-integration",
        "A strong emphasis is placed on STEAM integration (Science, Technology, Engineering, Arts, Mathematics), project-based learning, and interdisciplinary teaching approaches that promote creativity, collaboration, and independent inquiry."
      ),
      block(
        "digital-literacy",
        "Digital literacy and responsible citizenship are embedded throughout the curriculum, supported by the use of educational technology platforms and personalized learning tools."
      ),
    ],
  },
  image: steamImage,
  imagePosition: "left",
  theme: "light",
};

await client.patch("academics-page").set({ cultureSection, steamSection }).commit();

console.log(JSON.stringify({
  status: "updated",
  dataset: client.config().dataset,
  assets: [cultureImage.image.asset._ref, steamImage.image.asset._ref],
}, null, 2));
