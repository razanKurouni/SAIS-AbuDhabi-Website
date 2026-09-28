import Image from "next/image";
import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Reveal } from "@/components/ui/reveal";
import { getHomepage, getSchoolPoliciesPage } from "@/lib/sanity";
import type { PortableTextBlock, SanityImage, SchoolPolicyDocument } from "@/types/sanity";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";

const fallbackMetadata: Metadata = {
  title: "School Policies | SAIS - UAQ",
  description: "Review SAIS - UAQ school policies and download policy documents.",
};

const fallbackHero = {
  title: "School\nPolicies",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - UAQ school policies",
  },
  topLineColor: "#216B97",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

const fallbackIntro = {
  heading: {
    title: "A Safe and Supportive Environment",
    description: [
      paragraph(
        "school-policies-intro",
        "Safety and wellbeing of every child is our highest priority. Our policies outline the measures we take to create a secure, respectful, and supportive environment for all students. These guidelines ensure that staff, students, and the wider community share a clear understanding of safeguarding expectations and responsibilities across all aspects of school life."
      ),
    ],
  },
};

const fallbackCover: SanityImage = {
  url: "/contact-campus-building.jpg",
  alt: "SAIS - UAQ policy document",
};

const fallbackPolicies: SchoolPolicyDocument[] = [
  { _key: "acceptable-use", title: "Acceptable Use of Devices\nPolicy 2025-2026" },
  { _key: "admission", title: "Admission Policy\n2025-2026" },
  { _key: "child-protection", title: "Child Protection and\nSafeguarding Policy\n2025-2026" },
  { _key: "digital-learning", title: "Digital Learning Policy\n2025-2026" },
  { _key: "fire-evacuation", title: "Fire Evacuation Policy\n2025-2026" },
  { _key: "gifted-talented", title: "Gifted & Talented Policy\n2025-2026" },
  { _key: "inclusion-education", title: "Inclusion Education\nPolicy 2025-2026" },
];

function getPolicyViewerUrl(documentUrl: string, title: string) {
  const cleanUrl = documentUrl.split(/[?#]/)[0].toLowerCase();

  if (cleanUrl.endsWith(".pdf")) {
    return `/api/policy-viewer?url=${encodeURIComponent(documentUrl)}`;
  }

  if (/\.(doc|docx|xls|xlsx|ppt|pptx)$/.test(cleanUrl)) {
    return `/school-policies/view?url=${encodeURIComponent(documentUrl)}&title=${encodeURIComponent(title)}`;
  }

  return documentUrl;
}

function PolicyCard({ policy, index }: { policy: SchoolPolicyDocument; index: number }) {
  const cover = policy.coverImage || fallbackCover;
  const title = policy.title || "School Policy";
  const downloadLabel = policy.downloadLabel || "Download PDF";
  const documentUrl = policy.documentUrl || null;
  const viewerUrl = documentUrl ? getPolicyViewerUrl(documentUrl, title) : null;

  return (
    <Reveal
      as="article"
      className="school-policy-card academics-card-reveal"
      delay={100 + index * 110}
      threshold={0.1}
    >
      {documentUrl ? (
        <a
          href={viewerUrl || documentUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="school-policy-card__cover"
          aria-label={`Open ${title}`}
        >
          {cover.url ? (
            <Image
              src={cover.url}
              alt={cover.alt || title}
              fill
              sizes="(max-width: 767px) 72vw, 21vw"
              className="school-policy-card__image"
            />
          ) : null}
        </a>
      ) : (
        <div className="school-policy-card__cover" aria-label={title}>
          {cover.url ? (
            <Image
              src={cover.url}
              alt={cover.alt || title}
              fill
              sizes="(max-width: 767px) 72vw, 21vw"
              className="school-policy-card__image"
            />
          ) : null}
        </div>
      )}

      <h3 className="school-policy-card__title">{title}</h3>

      {documentUrl ? (
        <a href={documentUrl} download className="school-policy-card__download">
          {downloadLabel}
        </a>
      ) : (
        <span className="school-policy-card__download school-policy-card__download--disabled">
          {downloadLabel}
        </span>
      )}
    </Reveal>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSchoolPoliciesPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function SchoolPoliciesPage() {
  const [data, page] = await Promise.all([getHomepage(), getSchoolPoliciesPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;
  const intro = page?.intro || fallbackIntro;
  const policies = page?.policies?.length ? page.policies : fallbackPolicies;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main school-policies-page__main"
      pageClassName="school-policies-page"
    >
      <PageHero
        className="school-policies-hero"
        title={heroTitle}
        image={heroImage}
        titleId="school-policies-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/school-policies" />

      <section
        id="school-policies-intro"
        className="student-life-overview school-policies-intro"
        aria-labelledby="school-policies-intro-title"
      >
        <div className="student-life-overview__inner">
          <h2 id="school-policies-intro-title" className="student-life-overview__title">
            {intro.heading?.title || fallbackIntro.heading.title}
          </h2>
          <div className="student-life-overview__body">
            <RichText blocks={intro.heading?.description} className="student-life-overview__copy" />
          </div>
        </div>
      </section>

      {page?.overviewSection ? (
        <EditorialSplitSection
          id="school-policies-overview"
          title="Our Policies"
          section={page.overviewSection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section wellbeing-counseling-section school-policies-overview"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          preserveRichText
        />
      ) : null}

      <section className="school-policies-content" aria-label="Policy documents">
        <SectionReveal className="school-policies-content__inner" threshold={0.01}>
          <div className="school-policies-grid">
            {policies.map((policy, index) => (
              <PolicyCard key={policy._key || `${policy.title}-${index}`} policy={policy} index={index} />
            ))}
          </div>
        </SectionReveal>
      </section>
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
