import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

const homepage = await client.fetch('*[_type == "homepage" && _id == "homepage-main"][0]{tour}');

await client
  .patch("homepage-main")
  .set({
    tour: {
      _type: "object",
      ...(homepage?.tour || {}),
      heading: {
        _type: "sectionHeading",
        title: "Discover a Place",
        accentTitle: "Where Your Child Can Thrive",
        subtitle:
          "We would love to welcome you to Sharjah American International School and show you why our students thrive in a supportive and inspiring environment.",
        description: [
          {
            _type: "block",
            _key: "tour-intro-description",
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: "tour-intro-description-text",
                text:
                  "Our friendly Admissions Team is here to answer your questions and guide you every step of the way. The process starts with a simple online enquiry, followed by a school tour with our Academic Team, and then a formal application.",
                marks: [],
              },
            ],
          },
        ],
      },
    },
  })
  .commit();

console.log("Updated homepage-main.tour intro content.");
