import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

async function uploadImage(path, filename, alt) {
  const asset = await client.assets.upload("image", fs.createReadStream(path), { filename, title: alt });
  return {
    _type: "imageWithAlt",
    alt,
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
  };
}

const images = await Promise.all([
  uploadImage("/Users/razan/Downloads/_DEL6414.jpg", "sais-sharjah-mission-help.jpg", "Teacher helping SAIS - Sharjah students with their creative work"),
  uploadImage("/Users/razan/Downloads/_DEL5738.jpg", "sais-sharjah-mission-support.jpg", "Teacher supporting young SAIS - Sharjah students in class"),
  uploadImage("/Users/razan/Downloads/_DEL4995.jpg", "sais-sharjah-mission-promote.jpg", "SAIS - Sharjah teacher celebrating learning with students"),
  uploadImage("/Users/razan/Downloads/_DEL3816.jpg", "sais-sharjah-mission-cultivate.jpg", "SAIS - Sharjah student learning to play the violin"),
]);

const missionShowcase = {
  _type: "object",
  title: "Our Mission",
  statement: "Our mission is to foster a culture of inclusion that recognizes and values the diversity of all students.",
  cards: [
    {
      _key: "mission-help",
      _type: "object",
      title: "Help",
      description: "Helping students achieve their personal goals, develop an individual purpose, and become college- and career-ready.",
      image: images[0],
      color: "#287AA3",
      imagePosition: "center",
    },
    {
      _key: "mission-support",
      _type: "object",
      title: "Support",
      description: "Providing individualized support and removing barriers to learning, ensuring that every student has access to high-quality education and opportunities for growth and development.",
      image: images[1],
      color: "#00A5B2",
      imagePosition: "center",
    },
    {
      _key: "mission-promote",
      _type: "object",
      title: "Promote",
      description: "Promoting character, critical thinking, communication, and creativity in a safe and socially enriching environment.",
      image: images[2],
      color: "#7A7A7A",
      imagePosition: "center",
    },
    {
      _key: "mission-cultivate",
      _type: "object",
      title: "Cultivate",
      description: "Cultivating well-being, leadership, and community service to prepare students for lifelong success.",
      image: images[3],
      color: "#DF7150",
      imagePosition: "center",
    },
  ],
};

const valuesGrid = {
  _type: "object",
  title: "Our Values",
  items: [
    { _key: "value-tolerance", _type: "object", title: "Tolerance", icon: "tolerance" },
    { _key: "value-integrity", _type: "object", title: "Integrity", icon: "integrity" },
    { _key: "value-global-citizenship", _type: "object", title: "Global Citizenship", icon: "globalCitizenship" },
    { _key: "value-equity", _type: "object", title: "Equity", icon: "equity" },
    { _key: "value-innovation", _type: "object", title: "Innovation", icon: "innovation" },
  ],
};

await client.patch("about-page").set({ missionShowcase, valuesGrid }).commit();
console.log(JSON.stringify({ status: "updated", dataset: client.config().dataset, imageAssets: images.map((image) => image.image.asset._ref) }, null, 2));
