import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

await client
  .patch("homepage-main")
  .set({
    facts: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Facts & Figures",
      },
      items: [
        { _type: "metricItem", _key: "start", value: "2005", label: "Start of Classes" },
        { _type: "metricItem", _key: "uae-nationals", value: "26.5%", label: "UAE Nationals" },
        { _type: "metricItem", _key: "professionals", value: "34+", label: "Certified Professionals" },
        { _type: "metricItem", _key: "students", value: "2068+", label: "Students Enrolled" },
      ],
    },
  })
  .commit();

console.log("Updated homepage-main.facts.");
