import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

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

async function uploadImage(path, filename, title) {
  if (!fs.existsSync(path)) {
    throw new Error(`Image was not found at ${path}`);
  }

  const asset = await client.assets.upload("image", fs.createReadStream(path), {
    filename,
    title,
  });

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    alt: title,
  };
}

const heroImage = await uploadImage(
  "public/about-hero-building.jpg",
  "about-hero-building.jpg",
  "Sharjah American International School campus building"
);

const introImage = await uploadImage(
  "/Users/razan/Downloads/_DEL4445.jpg",
  "about-intro-students.jpg",
  "SAIS - Sharjah students smiling together on the playground"
);

const governanceImage = await uploadImage(
  "/Users/razan/Downloads/_DEL4569.jpg",
  "about-governance-board.jpg",
  "SAIS - Sharjah governance meeting with a staff member seated at a table"
);

const inspectionImage = await uploadImage(
  "/Users/razan/Downloads/_NEC6334.jpg",
  "about-inspection-review.jpg",
  "SAIS - Sharjah teacher reading with students in the library"
);

await client.createOrReplace({
  _id: "about-page",
  _type: "aboutPage",
  seo: {
    _type: "seo",
    title: "About Us | SAIS - Sharjah",
    description: "Learn more about Sharjah American International School.",
    image: introImage,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      eyebrow: "About Us",
      title: "About Sharjah American International School",
    },
    image: heroImage,
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "60%",
  },
  intro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Sharjah American International School (SAIS)",
      accentTitle: "Dubai Branch",
      subtitle:
        "is a distinguished member of the prestigious SAIS educational network founded and led by Dr. Aysha AlSayyar and Dr. Nawaf Fawaz.",
    },
    image: introImage,
    imagePosition: "center",
    body: [
      block(
        "intro-body-1",
        "The SAIS educational community currently encompasses four Emirates across the UAE: Sharjah, Dubai, Umm Al-Quwain, and Abu Dhabi."
      ),
      block(
        "intro-body-2",
        "The SAIS journey began with the establishment of our flagship Sharjah campus in 1997. The Dubai campus, opened in 2005, represents the second institution in our expanding network. Initially launched as a comprehensive KG-Grade 12 American curriculum school, we began with 60 students and a dedicated core faculty. The school experienced consistent enrollment growth and evolved into a vibrant, innovative learning environment delivering premier American education while honoring local customs and traditions."
      ),
      block(
        "intro-body-3",
        "The administrative leadership across all SAIS campuses maintains close professional collaboration, forming a cohesive professional learning network that supports the development of each institution and its leadership team."
      ),
    ],
  },
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
    image: governanceImage,
    imagePosition: "right",
    theme: "teal",
    ctas: [],
  },
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
    image: inspectionImage,
    imagePosition: "left",
    theme: "light",
    ctas: [],
  },
});

console.log("Seeded about-page with editable hero, intro, governance, and inspection content.");
