import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });
const sourcePath = "/Users/razan/Downloads/_NEC6334.jpg";

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Inspection image was not found at ${sourcePath}`);
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
  filename: "about-inspection-review.jpg",
  title: "SAIS - Sharjah DSIB inspection review",
});

await client
  .patch("about-page")
  .set({
    inspection: {
      _type: "imageTextSection",
      heading: {
        _type: "sectionHeading",
        title: "Dubai Schools Inspection Bureau Review",
        description: [
          block(
            "inspection-body-1",
            "As part of Dubai's educational regulatory framework, all private schools undergo an annual review and inspection process directed by the Dubai Schools Inspection Bureau (DSIB), a division of the Knowledge and Human Development Authority (KHDA). Our school engages in comprehensive self-assessment of student learning outcomes and other relevant metrics to inform our continuous improvement planning prior to the external DSIB review. The insights gained through internal evaluation, combined with the DSIB report and recommendations, form the foundation of our improvement cycle: reflection, planning, action, and monitoring - all directed toward achieving educational excellence."
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
        alt: "SAIS - Sharjah teacher reading with students in the library",
      },
      imagePosition: "left",
      theme: "light",
      ctas: [],
    },
  })
  .commit();

console.log(`Updated about-page.inspection with ${asset._id}`);
