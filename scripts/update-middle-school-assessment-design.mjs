import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

await client
  .patch("academics-middle-school-page")
  .set({
    "assessmentSection.panelColor": "#00A5B2",
    "assessmentSection.waveColor": "#216B97",
    "assessmentSection.titleColor": "#ffffff",
    "assessmentSection.textColor": "#ffffff",
  })
  .commit();

console.log(
  JSON.stringify(
    {
      status: "updated",
      dataset: client.config().dataset,
      documentId: "academics-middle-school-page",
      field: "assessmentSection",
    },
    null,
    2,
  ),
);
