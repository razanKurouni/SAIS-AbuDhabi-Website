import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { blocksFromText } from "@/lib/content";
import type { ImageTextSection } from "@/types/sanity";
import { RichText } from "@/components/ui/rich-text";

type AboutPrincipalMessageSectionProps = {
  section?: ImageTextSection;
};

const fallbackParagraphs = [
  "Dear Students, Parents, Colleagues and Community Partners,",
  "It is my pleasure to welcome you to the official website of Sharjah American International School.",
  "SAIS - UAQ cultivates an environment where dedicated educators collaborate seamlessly with parents and stakeholders to support and challenge our students in becoming innovative individuals and effective team players who excel in their pursuits.",
  "Our institution delivers a comprehensive American curriculum founded on well-defined, internationally recognized American Education Standards. We thoughtfully integrate relevant international benchmarking and enrichment programs to guide our curriculum, instruction, assessment protocols, and extracurricular offerings.",
  "We envision SAIS - UAQ as a dynamic, interactive learning community that serves not only our students but all members of our educational family. Life-long learning stands as a cornerstone of our guiding statement and is meaningfully implemented throughout our academic programs, events, and activities.",
  "We diligently foster a community that inspires a passion for learning - where students confidently embark on challenging journeys to realize their aspirations or explore opportunities as innovators and future entrepreneurs.",
  "Our community embraces and nurtures cultural diversity and multiculturalism with intention and care. We take pride in our diverse learning environment where all members work harmoniously, collaboratively, and respectfully to achieve common objectives and support individual needs.",
  "SAIS - UAQ maintains a distinguished record of success and achievement, widely acknowledged for preparing our students for careers that have yet to emerge. Our graduates consistently gain admission to leading colleges and universities both within the UAE and internationally.",
  "While we emphasize rigorous academic standards, we equally value nurturing the unique interests, talents, and capabilities of our students through specialized academic and enrichment programs. The depth of our curriculum, the commitment of our faculty, and the accomplishments of our students serve as compelling evidence of our standing among the premier American-curriculum private schools in Dubai. Through active parental involvement and strong community connections, SAIS - UAQ exemplifies holistic educational excellence.",
  "SAIS - UAQ offers a comprehensive education with student services centered on academic achievement, social development, and self-reliance. We actively encourage students to participate in school events, activities, and competitions, becoming engaged members of our broader school community.",
  "I extend a warm welcome to all visitors to our website who seek to learn more about our school community and services. We trust that the information provided will assist you in developing a comprehensive understanding of the quality educational experience we offer.",
  "Regards,",
  "Mohammed Sultan",
  "School Principal",
];

const fallbackImage = {
  url: "/principal-message-mohammed-sultan.JPG",
  alt: "Mohammed Sultan, School Principal",
};

const mobilePrincipalImage = {
  url: "/principal-message-mobile-sultan.jpg",
  alt: "Mohammed Sultan, School Principal",
};

export function AboutPrincipalMessageSection({ section }: AboutPrincipalMessageSectionProps) {
  const title = section?.heading?.title || "A Message from Our Principal";
  const body = section?.heading?.description?.length
    ? section.heading.description
    : blocksFromText(fallbackParagraphs.join("\n"));
  const image = section?.image?.url ? section.image : fallbackImage;
  // The Studio's phone image for the section, when one is set; the packaged portrait otherwise.
  const mobileImage = section?.image?.mobileUrl
    ? { url: section.image.mobileUrl, alt: section.image.mobileAlt || image.alt || mobilePrincipalImage.alt }
    : mobilePrincipalImage;

  return (
    <section
      id="about-principal-message"
      className="principal-message-section"
      aria-labelledby="about-principal-message-title"
    >
      <Reveal className="principal-message-section__image-wrap" threshold={0.18}>
        <Image
          src={image.url || fallbackImage.url}
          alt={image.alt || fallbackImage.alt}
          fill
          sizes="(max-width: 767px) 100vw, 46vw"
          quality={86}
          className="principal-message-section__image principal-message-section__image--desktop"
        />
        <Image
          src={mobileImage.url}
          alt={mobileImage.alt}
          fill
          sizes="(max-width: 767px) 100vw"
          quality={86}
          className="principal-message-section__image principal-message-section__image--mobile"
        />
      </Reveal>

      <Reveal className="principal-message-section__panel" threshold={0.18}>
        <svg
          className="principal-message-section__shape"
          viewBox="0 0 1647 928"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="principal-message-section__shape-fill"
            d="M0,0 H1460 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980 L0,928 Z"
          />
          <path
            className="principal-message-section__shape-accent"
            d="M1460,-50 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980"
            fill="none"
            strokeWidth="56"
            strokeLinecap="round"
          />
        </svg>

        <div className="principal-message-section__content">
          <h2 id="about-principal-message-title" className="principal-message-section__title">
            {title}
          </h2>

          <div className="principal-message-section__scroll" tabIndex={0}>
            <RichText blocks={body} className="principal-message-section__copy" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
