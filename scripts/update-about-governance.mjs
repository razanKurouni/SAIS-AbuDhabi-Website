import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });
const sourcePath = "/Users/razan/Downloads/_DEL4569.jpg";

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Governance image was not found at ${sourcePath}`);
}

function block(_key, text) {
  return {
    _type: "block",
    _key,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `${_key}-text`,
        text,
        marks: [],
      },
    ],
  };
}

const asset = await client.assets.upload("image", fs.createReadStream(sourcePath), {
  filename: "about-governance-board.jpg",
  title: "SAIS - Sharjah Governance Board meeting",
});

await client
  .patch("about-page")
  .set({
    governance: {
      _type: "imageTextSection",
      heading: {
        _type: "sectionHeading",
        title: "Governance Board",
        description: [
          block(
            "governance-body-1",
            "The Governance Board regularly convenes to ensure curriculum coordination, protocols, processes, and practices remain consistent and cohesive across all SAIS institutions. In recent years, the Governance Board has formalized the active involvement of parents in the planning and local governance structure of each campus."
          ),
          block(
            "governance-body-2",
            "The establishment of a Governance Board - evolving from our previous parent committee - incorporates parents, senior students, and faculty members, enabling each campus to operate efficiently at the local level while maintaining alignment with the overarching governance framework. The SAIS - Sharjah Governance Board meets regularly to monitor improvement initiatives and celebrate the diversity that defines our vibrant community."
          ),
        ],
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
        alt: "SAIS - Sharjah governance meeting with a staff member seated at a table",
      },
      imagePosition: "right",
      theme: "teal",
      ctas: [],
    },
  })
  .commit();

console.log(`Updated about-page.governance with ${asset._id}`);
