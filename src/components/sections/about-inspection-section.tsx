import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import type { ImageTextSection } from "@/types/sanity";

type AboutInspectionSectionProps = {
  section?: ImageTextSection;
};

const fallbackParagraphs = [
  "Our staff communicate with stakeholders through various channels to ensure students’ wellbeing and academic success. Teachers create an inclusive environment by planning lessons that meet the needs of all learners, including students of determination and those who are gifted and talented. Student-led national and international events are regularly held at the school, helping students stay actively engaged with the wider community.",
  "At SAIS - Abu Dhabi, we are committed to preparing our students to become lifelong learners who are curious, resilient, and driven to grow. We focus on developing strong character values such as integrity, respect, and responsibility. Through academic and personal development, we encourage our students to contribute positively to their community and make a meaningful difference in the world around them.",
];

const fallbackImage = {
  url: "/about-inspection-review.jpg",
  alt: "SAIS - Abu Dhabi teacher reading with students in the library",
};

export function AboutInspectionSection({ section }: AboutInspectionSectionProps) {
  return (
    <EditorialSplitSection
      id="about-inspection"
      title="A School of Possibilities"
      section={section}
      fallbackImage={fallbackImage}
      fallbackParagraphs={fallbackParagraphs}
      className="editorial-split-section--inspection"
    />
  );
}
