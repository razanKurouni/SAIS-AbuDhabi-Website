import fs from "node:fs";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "sais-uaq",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Careers page.");
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
  "public/careers-hero.jpg",
  "careers-hero.jpg",
  "SAIS - Sharjah teacher supporting a student in a sensory learning space"
);

const workForSaisImage = await uploadImage(
  "public/careers-work-for-sais.png",
  "careers-work-for-sais.png",
  "SAIS - Sharjah staff members standing together"
);

const editorialImage = await uploadImage(
  "public/careers-editorial.jpg",
  "careers-editorial.jpg",
  "SAIS - Sharjah teacher supporting a student in a learning space"
);

const professionalCareImage = await uploadImage(
  "public/careers-professional-care.jpg",
  "careers-professional-care.jpg",
  "SAIS - Sharjah teacher supporting students during a classroom activity"
);

const emailApplicationIcon = await uploadImage(
  "public/careers-apply-email.png",
  "careers-apply-email.png",
  "Email application icon"
);

const webApplicationIcon = await uploadImage(
  "public/careers-apply-web.png",
  "careers-apply-web.png",
  "Online application icon"
);

await client.createOrReplace({
  _id: "careers-page",
  _type: "careersPage",
  seo: {
    _type: "seo",
    title: "Careers | SAIS - Sharjah",
    description: "Explore career opportunities at Sharjah American International School.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Work At\nOur School",
    },
    image: heroImage,
    topLineColor: "#216B97",
    panelColor: "#707174",
    waveColor: "#d97252",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "60%",
  },
  intro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Work For SAIS",
      description: [
        block(
          "work-for-sais-body-1",
          "Sharjah American International School Campus, delivers premium education that equips students to meet contemporary global challenges. With over 23 years as an education provider in the UAE, we remain dedicated to pursuing excellence and leadership in educational practice."
        ),
      ],
    },
    image: workForSaisImage,
    ctas: [],
  },
  editorialSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "SAIS Educational Community",
      description: [
        block(
          "careers-community-body-1",
          "The SAIS educational community currently encompasses four Emirates across the UAE: Sharjah, Dubai, Umm Al-Quwain, and Abu Dhabi."
        ),
        block(
          "careers-community-body-2",
          "The SAIS journey began with the establishment of our flagship Sharjah campus in 1997. The Dubai campus, opened in 2005, represents the second institution in our expanding network. Initially launched as a comprehensive KG-Grade 12 American curriculum school, we began with 60 students and a dedicated core faculty. The school experienced consistent enrollment growth and evolved into a vibrant, innovative learning environment delivering premier American education while honoring local customs and traditions."
        ),
        block(
          "careers-community-body-3",
          "The administrative leadership across all SAIS campuses maintains close professional collaboration, forming a cohesive professional learning network that supports the development of each institution and its leadership team."
        ),
      ],
    },
    image: editorialImage,
    imagePosition: "right",
    theme: "light",
    ctas: [],
  },
  careSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Professional Care,\nEvery School Day",
      description: [
        block(
          "professional-care-body-1",
          "We are committed to safeguarding and promoting the welfare of children and young people, and we expect all employees and volunteers to share this commitment. As our institution continues to grow, we seek qualified, talented, and dedicated professionals to join our team."
        ),
      ],
    },
    image: professionalCareImage,
    imagePosition: "center",
    panelColor: "#00a5b2",
    waveColor: "#d97252",
    textColor: "#ffffff",
  },
  requirementsSection: {
    _type: "object",
    columns: [
      {
        _key: "our-commitment",
        _type: "object",
        title: "Our Commitment",
        intro: "Successful candidates will receive an excellent remuneration package including:",
        items: [
          "Competitive tax-free salary",
          "Medical insurance",
          "UAE working permit",
          "Residence visa",
          "Annual flight allowance",
          "Tuition fee concession",
          "Additional benefits in accordance with UAE Labour Law",
        ],
      },
      {
        _key: "qualifications-requirements",
        _type: "object",
        title: "Qualifications & Requirements",
        items: [
          "Certified professional teaching qualification at degree level (B.Ed., PGCE, PGDE, or equivalent in Primary Education for KG and Primary positions)",
          "Subject teachers must hold a Bachelor's or Master's degree in the relevant subject",
          "Minimum of 2 years of varied and demonstrable teaching experience at various school levels",
          "Experience in American curriculum schools is advantageous but not mandatory",
          "Proven ability to motivate and inspire students",
          "Commitment to providing outstanding teaching and learning",
          "Desire to work in a challenging environment with genuine career advancement opportunities",
        ],
      },
    ],
  },
  joinTeamSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Join Our Team",
      description: [
        block(
          "join-team-body-1",
          "If you possess the ideal combination of skills and attitude with a drive to excel in your career, we invite you to apply by:"
        ),
      ],
    },
    cards: [
      {
        _key: "email-cv",
        _type: "object",
        icon: emailApplicationIcon,
        label: "Emailing your CV to",
        text: "hrrecruitment@saisdubai.com\n(specify position in the subject line)",
        href: "mailto:hrrecruitment@saisdubai.com",
      },
      {
        _key: "teach-away",
        _type: "object",
        icon: webApplicationIcon,
        label: "Applying through",
        text: "www.teachaway.com",
        href: "https://www.teachaway.com",
      },
      {
        _key: "schrole",
        _type: "object",
        icon: webApplicationIcon,
        label: "Applying through",
        text: "www.schrole.edu.au",
        href: "https://www.schrole.edu.au",
      },
    ],
  },
});

console.log("Seeded careers-page with editable hero, Work For SAIS, care, requirements, and join team content.");
