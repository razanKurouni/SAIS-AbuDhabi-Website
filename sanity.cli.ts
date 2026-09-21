import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "sais-uaq";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    appId: "tgm4q15n1jrl57igjm5gvrhg",
  },
});
