import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { blocksFromText } from "@/lib/content";
import type { ImageTextSection } from "@/types/sanity";
import { RichText } from "@/components/ui/rich-text";

type AboutPrincipalMessageSectionProps = {
  section?: ImageTextSection;
};

const fallbackParagraphs = [
  "Dear valued students, dedicated staff, and supportive parents,",
  "It is with great pride that I welcome you to SAIS - Abu Dhabi, a school where we nurture an enriching, inclusive environment, celebrating the uniqueness of every child and fostering a deep sense of belonging.",
  "At SAIS, our philosophy goes beyond academics. We believe in building character and equipping students with practical life skills. Empowering future leaders who are ready to face challenges and excel in all areas of life is at the heart of our mission. This commitment to holistic development forms the foundation of our school’s vision.",
  "We hold ourselves to the highest standards, expecting excellence from every member of our community. Guided by our mission and vision, we are committed to preparing students to become responsible, confident individuals. Throughout their educational journey, students are continuously encouraged to act as role models, demonstrating integrity, leadership, and respect in all aspects of school life.",
  "Leadership grows through opportunity. We provide a safe, nurturing environment where students are taught to respect and value others and to engage as responsible citizens. We are proud to share that ADEK has rated us Outstanding in students’ social responsibility and innovation skills.",
  "From Pre-KG to Grade 12, we offer a high-quality American curriculum enriched with innovation and real-world application. Our programs include STEM, Artificial Intelligence (AI), Project-Based Learning (PBL), and a strong high school program. Students benefit from a wide range of electives such as Human Anatomy, Organic Chemistry, Design & Technology, Business Studies, Programming, and AP College Board courses. As a certified SAT, AP, and IELTS center, we ensure that students are prepared for various university pathways: the General, General+, and Advanced tracks.",
  "We also take great pride in preserving and promoting our heritage subjects, enabling students to develop a deep appreciation of local culture, Arabic language, and values.",
  "Our dedicated teachers are committed to nurturing each student’s growth academically, socially, and emotionally. We strive not only to help students meet high standards but to exceed their own expectations. Parents are key partners in this journey, and we deeply value their involvement and voice through committees like the Parent Advisory Council and National Identity Committee.",
  "Beyond the classroom, we offer a rich After-School Activities (ASA) program and a variety of extracurricular opportunities, including MUN (Model United Nations), public speaking, arts conferences, and more. Our students actively contribute to the Abu Dhabi community by completing internal and external volunteer service hours, strengthening their leadership skills and engagement.",
  "We believe in education that makes a tangible, positive difference in the lives of our students and equips them with the skills they need for lifelong sustainable success.",
  "It would be an honor to welcome you to our SAIS community. Together, let us continue building a future rooted in excellence, compassion, and ambition.",
  "Sincerely,",
  "Ms. Ban Al Duri",
  "Principal",
];

const fallbackImage = {
  url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/48e0ea39c79215107d32381cb70192e6729cb8ab-1474x2106.png",
  alt: "Ms. Ban Al Duri, Principal of SAIS - Abu Dhabi",
};

const mobilePrincipalImage = {
  url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/48e0ea39c79215107d32381cb70192e6729cb8ab-1474x2106.png",
  alt: "Ms. Ban Al Duri, Principal of SAIS - Abu Dhabi",
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
