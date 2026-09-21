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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Our Campus page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/DSC05177.JPG",
    filename: "our-campus-hero.jpg",
    title: "SAIS - Sharjah outdoor campus and play court",
  },
  videoPoster: {
    path: "/Users/razan/Downloads/DSC05465.png",
    filename: "our-campus-video-poster.png",
    title: "SAIS - Sharjah students in the library",
  },
  technology: {
    path: "public/academics-middle-school-curriculum-classroom.png",
    filename: "our-campus-technology-facilities.png",
    title: "SAIS - Sharjah classroom technology facilities",
  },
  roboticsLab: {
    path: "/Users/razan/Downloads/robotics-lab.jpg",
    filename: "our-campus-robotics-lab.jpg",
    title: "SAIS - Sharjah students building a robot in the robotics lab",
    optional: true,
  },
  secondaryLibrary: {
    path: "/Users/razan/Downloads/middle-high-school-library.jpg",
    filename: "our-campus-secondary-library.jpg",
    title: "SAIS - Sharjah secondary students working in the library",
    optional: true,
  },
  elementaryLibrary: {
    path: "/Users/razan/Downloads/elementary-school-library.jpg",
    filename: "our-campus-elementary-library.jpg",
    title: "SAIS - Sharjah elementary students reading together",
    optional: true,
  },
  sports: {
    path: "/Users/razan/Downloads/DSC05177.JPG",
    filename: "our-campus-sports-facilities.jpg",
    title: "SAIS - Sharjah sports facilities",
  },
};

async function uploadImage({ path, filename, title, optional }) {
  if (!fs.existsSync(path)) {
    if (optional) {
      return null;
    }

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

function block(key, text) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `${key}-text`,
        _type: "span",
        text,
        marks: [],
      },
    ],
  };
}

function strongBlock(key, text) {
  const value = block(key, text);
  value.children[0].marks = ["strong"];
  return value;
}

function bulletBlock(key, text) {
  return { ...block(key, text), listItem: "bullet", level: 1 };
}

function updateOurCommunityCampusCard(page) {
  const cards = page?.linksSection?.cards;
  if (!Array.isArray(cards)) return null;

  return cards.map((card) => {
    const isCampusCard = card?._key === "our-campus" || card?.title === "Our Campus";
    if (!isCampusCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/our-campus",
        variant: card.cta?.variant || "primary",
        openInNewTab: false,
      },
    };
  });
}

const uploadedImages = Object.fromEntries(
  await Promise.all(
    Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])
  )
);

await client.createOrReplace({
  _id: "our-campus-page",
  _type: "ourCampusPage",
  seo: {
    _type: "seo",
    title: "Our Campus | SAIS - Sharjah",
    description: "Explore SAIS - Sharjah's modern campus, facilities, learning spaces, and sports environments.",
    image: uploadedImages.hero,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Our\nCampus",
    },
    image: uploadedImages.hero,
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  intro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Modern Spaces for Modern Learning",
      description: [
        block(
          "campus-intro-1",
          "We offer a modern, safe, and inspiring campus for students from KG to Grade 12. With state-of-the-art classrooms, creative arts studios, science and computer labs, and sports facilities, our campus is designed to support learning, creativity, and personal growth. Every space encourages curiosity, collaboration, and a love for learning."
        ),
      ],
    },
  },
  videoSection: {
    _type: "object",
    poster: uploadedImages.videoPoster,
  },
  facilities: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Facilities",
      description: [
        block(
          "campus-facilities-intro-1",
          "We prioritize the professional development and ongoing growth of our faculty members. Our comprehensive approach begins with an Intensive Induction Week at the start of each academic year, providing teachers with effective orientation, familiarization, and training to ensure they feel confident and equipped to excel in their roles. Throughout the year, designated Professional Development (PD) days address specific needs and priorities identified through ongoing assessment and feedback."
        ),
      ],
    },
    cards: [
      {
        _key: "technology-facilities",
        _type: "campusFacilityCard",
        title: "Technology Facilities",
        image: uploadedImages.technology,
        body: [
          block(
            "technology-1",
            "Every classroom at SAIS is equipped with a smart interactive panel, enabling dynamic, touch-enabled lessons that engage students, support collaborative learning, and empower teachers."
          ),
          block(
            "technology-2",
            "Our two fully equipped computer labs feature the latest all-in-one computers, providing students with a modern environment designed to support digital learning, coding, and creative projects."
          ),
          block(
            "technology-3",
            "Our dedicated STEM lab brings science, technology, engineering, and mathematics to life through hands-on exploration. Equipped for robotics, coding, and design challenges, it gives students the space to experiment, innovate, and develop the critical thinking and problem-solving skills that prepare them for the future."
          ),
        ],
      },
      {
        _key: "swimming-sports-facilities",
        _type: "campusFacilityCard",
        title: "Swimming Pool and Sports Facilities",
        image: uploadedImages.sports,
        body: [
          block(
            "sports-1",
            "Our on-campus swimming pool offers students a dedicated space to develop water confidence, fitness, and competitive swimming skills. With structured PE lessons and ECA, every student has the opportunity to thrive in and out of the water."
          ),
          block(
            "sports-2",
            "SAISD has multi-purpose courts to open playing fields, our sports facilities are designed to inspire an active lifestyle and a love of teamwork. Students can explore a wide range of sports and physical activities (Football, Basketball, Volleyball etc.)"
          ),
        ],
      },
    ],
  },
  elementaryLibrarySection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Elementary School Library",
      description: [
        block(
          "elementary-library-intro",
          "A welcoming and engaging space designed to spark curiosity and build a strong foundation in reading."
        ),
        strongBlock("elementary-library-offers", "The Library offers:"),
        bulletBlock("elementary-library-1", "Age-appropriate fiction and non-fiction books"),
        bulletBlock("elementary-library-2", "Interactive storytelling sessions and read-alouds"),
        bulletBlock("elementary-library-3", "Visual aids, early learning games, and leveled readers"),
        bulletBlock(
          "elementary-library-4",
          "Weekly library lessons integrated into the curriculum to develop reading habits and research basics"
        ),
      ],
    },
    image: uploadedImages.elementaryLibrary || uploadedImages.videoPoster,
    imagePosition: "right",
    theme: "light",
    titleColor: "#00A5B2",
    textColor: "#707278",
    ctas: [],
  },
  secondaryLibrarySection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Middle & High School Library",
      description: [
        block(
          "secondary-library-intro",
          "A resource-rich environment tailored to support academic success, personal interests, and independent learning."
        ),
        block("secondary-library-features", "Features:"),
        bulletBlock(
          "secondary-library-1",
          "Extensive collection of curriculum-aligned reference books and academic texts"
        ),
        bulletBlock("secondary-library-2", "Study zones for group collaboration and independent work"),
        bulletBlock(
          "secondary-library-3",
          "Library classes that teach research skills, citation formats, and digital literacy"
        ),
        bulletBlock("secondary-library-4", "Support for inquiry-based projects and extended essays"),
      ],
    },
    image: uploadedImages.secondaryLibrary || uploadedImages.technology,
    imagePosition: "center",
    backgroundColor: "#1E6F9B",
    curveColor: "#00A5B2",
    curveLineColor: "#D97252",
    titleColor: "#ffffff",
    textColor: "#ffffff",
  },
  roboticsLabSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "The Robotics Lab",
      description: [
        block(
          "robotics-lab-1",
          "We have a dedicated space where students engage in hands-on learning experiences that combine engineering, programming, and innovation. Using programmable robotics kits such as LEGO EV3 and Arduino-based systems, students design, build, and code robots to perform tasks, solve challenges, and compete in school and interschool competitions."
        ),
        block(
          "robotics-lab-2",
          "The lab promotes critical thinking, collaboration, and creativity, allowing students to explore concepts like automation, sensors, artificial intelligence, and mechanical systems. Through structured lessons and open-ended projects, learners apply their knowledge in real-world contexts, preparing them for future pathways in robotics, technology, and engineering fields."
        ),
        block(
          "robotics-lab-3",
          "From elementary to high school, the Robotics Lab fosters curiosity, resilience, and problem-solving, empowering students to become tomorrow's innovators."
        ),
      ],
    },
    image: uploadedImages.roboticsLab || uploadedImages.technology,
    imagePosition: "right",
    theme: "light",
    backgroundColor: "#F2F2F2",
    titleColor: "#00A5B2",
    textColor: "#707278",
    ctas: [],
  },
});

const communityPage = await client.getDocument("our-community-page");
const updatedCards = updateOurCommunityCampusCard(communityPage);

if (updatedCards) {
  await client.patch("our-community-page").set({ "linksSection.cards": updatedCards }).commit();
}

console.log("Seeded Our Campus page and linked the Our Campus community card.");
