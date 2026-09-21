import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

await client
  .patch("academics-high-school-page")
  .set({
    "careerGuidanceSection.imageSide": "left",
    "careerGuidanceSection.panelColor": "#6F7175",
    "careerGuidanceSection.waveColor": "#216B97",
    "careerGuidanceSection.titleColor": "#ffffff",
    "careerGuidanceSection.textColor": "#ffffff",
  })
  .commit();

console.log(
  JSON.stringify(
    {
      status: "updated",
      dataset: client.config().dataset,
      documentId: "academics-high-school-page",
      visibleSection: "High School Pathways",
    },
    null,
    2,
  ),
);
