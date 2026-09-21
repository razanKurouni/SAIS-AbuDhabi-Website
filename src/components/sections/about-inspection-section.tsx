import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import type { ImageTextSection } from "@/types/sanity";

type AboutInspectionSectionProps = {
  section?: ImageTextSection;
};

const fallbackParagraphs = [
  "SAIS - UAQ takes part in the annual review and inspection that the Strategic Planning and Educational Affairs Authority (SPEA) runs for private schools in the Emirate. Ahead of it the school assesses its own student learning outcomes and the measures around them, and the findings, together with the authority's report and recommendations, set the improvement cycle for the year: reflection, planning, action, and monitoring."
];

const fallbackImage = {
  url: "/about-inspection-review.jpg",
  alt: "SAIS - UAQ teacher reading with students in the library",
};

export function AboutInspectionSection({ section }: AboutInspectionSectionProps) {
  return (
    <EditorialSplitSection
      id="about-inspection"
      title="Annual Review and Inspection"
      section={section}
      fallbackImage={fallbackImage}
      fallbackParagraphs={fallbackParagraphs}
      className="editorial-split-section--inspection"
    />
  );
}
