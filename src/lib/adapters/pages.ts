/**
 * Per-page adapters: CMS page document → the data shape each page renders.
 *
 * Every function maps the sections of a page (looked up by their `slot`) to
 * the props the existing components expect. Design tokens are added later by
 * `applyDesign` in `src/lib/sanity.ts`.
 */
import type {
  AboutPageData,
  AcademicsElementaryPageData,
  AcademicsHighSchoolPageData,
  AcademicsKindergartenPageData,
  AcademicsMiddleSchoolPageData,
  AcademicsPageData,
  AdmissionsApplicationPageData,
  AdmissionsBookTourPageData,
  AdmissionsRegisterInterestPageData,
  AdmissionsFeesPageData,
  AdmissionsPageData,
  AdmissionsWithdrawalPageData,
  CareersPageData,
  CmsPage,
  ContactPageData,
  ExtraCurricularActivitiesPageData,
  HomepageData,
  NewsListingPageData,
  OurCampusPageData,
  OurCommunityPageData,
  OurTeamPageData,
  ParentInvolvementPageData,
  SchoolCalendarPageData,
  SchoolPoliciesPageData,
  SchoolReportsPageData,
  SiteSettings,
  StudentLifePageData,
  StudentProgramsPageData,
  StudentStaffWellbeingPageData,
} from "@/types/sanity";
import { INNER_NAVIGATION } from "@/design/inner-navigation";
import { REGISTER_INTEREST_FORM_ARIA_LABEL, REGISTER_INTEREST_FORM_FIELDS } from "@/design/forms";
import { specIdFromDocumentId } from "@/content/page-spec";
import {
  branchCards,
  bySlot,
  calendarTerms,
  cleanCtas,
  contactInfo,
  ctaBand,
  download,
  featureCards,
  feeLabels,
  feeRows,
  form,
  heading,
  hero,
  homeHero,
  iconCards,
  image,
  imageText,
  joinTeamCards,
  learningSlides,
  logos,
  members,
  metrics,
  mograHubAppBand,
  policies,
  requirementColumns,
  requiredHeading,
  statementCards,
  steps,
  termsGroups,
  textSection,
  valuesSlides,
  video,
} from "./common";

function base(page: CmsPage) {
  return {
    seo: page.seo,
    hero: hero(page),
    innerNavigation: INNER_NAVIGATION[specIdFromDocumentId(page._id)],
  };
}

export function adaptHomepage(page: CmsPage, settings: SiteSettings | null): HomepageData {
  const s = bySlot(page);
  const news = s.get("news");
  const instagram = s.get("instagram");
  const learningPhases = s.get("learningPhases");

  return {
    seo: page.seo,
    header: settings?.header,
    navigation: settings?.header?.navigation,
    hero: homeHero(page.hero),
    heroContactBand: ctaBand(s.get("heroContactBand")),
    intro: imageText(s.get("intro")),
    growthSection: imageText(s.get("growthSection")),
    growthFeature: imageText(s.get("growthFeature")),
    ctaBand: s.has("ctaBand") ? { text: "", ...ctaBand(s.get("ctaBand")) } : undefined,
    accreditations: s.has("accreditations")
      ? { heading: requiredHeading(s.get("accreditations")), logos: logos(s.get("accreditations")).map((logo) => ({ name: logo.name || "", image: logo.image })) }
      : undefined,
    whySection: imageText(s.get("whySection")),
    whyFeature: imageText(s.get("whyFeature")),
    facts: s.has("facts") ? { heading: requiredHeading(s.get("facts")), items: metrics(s.get("facts")) } : undefined,
    quickLinks: s.has("quickLinks")
      ? { heading: requiredHeading(s.get("quickLinks")), cards: featureCards(s.get("quickLinks")) }
      : undefined,
    learningPhases: learningPhases
      ? { heading: requiredHeading(learningPhases), cta: learningPhases.cta, cards: featureCards(learningPhases) }
      : undefined,
    tour: s.has("tour") ? { heading: requiredHeading(s.get("tour")), cards: featureCards(s.get("tour")) } : undefined,
    news: news ? { heading: requiredHeading(news), cta: news.cta } : undefined,
    instagram: instagram
      ? {
          heading: requiredHeading(instagram),
          images: (instagram.images || []).filter((item) => item.url),
          socialLinks: cleanCtas(instagram.ctas),
        }
      : undefined,
    footer: settings?.footer,
  };
}

export function adaptAbout(page: CmsPage): AboutPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: imageText(s.get("intro")),
    governance: imageText(s.get("governance")),
    inspection: imageText(s.get("inspection")),
    ourStory: imageText(s.get("ourStory")),
    ourStoryFeature: imageText(s.get("ourStoryFeature")),
    principalMessage: imageText(s.get("principalMessage")),
    boardGovernors: s.has("boardGovernors")
      ? { heading: heading(s.get("boardGovernors")), members: members(s.get("boardGovernors")) }
      : undefined,
    statement: s.has("statement") ? { heading: heading(s.get("statement")), cards: statementCards(s.get("statement")) } : undefined,
    values: s.has("values") ? { heading: heading(s.get("values")), slides: valuesSlides(s.get("values")) } : undefined,
    accreditations: s.has("accreditations")
      ? { heading: heading(s.get("accreditations")), body: s.get("accreditations")?.body, logos: logos(s.get("accreditations")) }
      : undefined,
    adekSection: imageText(s.get("adekSection")),
    benefits: s.has("benefits") ? { heading: heading(s.get("benefits")), cards: featureCards(s.get("benefits")) } : undefined,
    branches: s.has("branches") ? { heading: heading(s.get("branches")), cards: branchCards(s.get("branches")) } : undefined,
  };
}

export function adaptOurTeam(page: CmsPage): OurTeamPageData {
  const s = bySlot(page);
  const leadership = s.get("leadershipSection");
  return {
    ...base(page),
    leadershipSection: leadership
      ? { heading: heading(leadership), groupTitle: leadership.heading?.eyebrow, members: members(leadership) }
      : undefined,
  };
}

export function adaptAcademics(page: CmsPage): AcademicsPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    curriculumSection: contactInfo(s.get("curriculumSection")),
    teachingCommitmentsSection: s.has("teachingCommitmentsSection")
      ? { heading: heading(s.get("teachingCommitmentsSection")), cards: iconCards(s.get("teachingCommitmentsSection")) }
      : undefined,
    steamSection: imageText(s.get("steamSection")),
    inclusionSection: imageText(s.get("inclusionSection")),
    inclusionFeatureSection: imageText(s.get("inclusionFeatureSection")),
    supportProgramsSection: s.has("supportProgramsSection")
      ? { heading: heading(s.get("supportProgramsSection")), cards: iconCards(s.get("supportProgramsSection")) }
      : undefined,
    learningSliderSection: s.has("learningSliderSection")
      ? { heading: heading(s.get("learningSliderSection")), slides: learningSlides(s.get("learningSliderSection")) }
      : undefined,
    assessmentProtocolSection: s.has("assessmentProtocolSection")
      ? {
          heading: heading(s.get("assessmentProtocolSection")),
          cards: iconCards(s.get("assessmentProtocolSection")),
          closingStatement: s.get("assessmentProtocolSection")?.body,
        }
      : undefined,
    calendarDownload: download(s.get("calendarDownload")),
  };
}

export function adaptKindergarten(page: CmsPage): AcademicsKindergartenPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    excellenceSection: imageText(s.get("excellenceSection")),
    curriculumSection: imageText(s.get("curriculumSection")),
    arabicPolicySection: imageText(s.get("arabicPolicySection")),
    drdpSection: s.has("drdpSection")
      ? { heading: heading(s.get("drdpSection")), cards: iconCards(s.get("drdpSection")) }
      : undefined,
    dayInLifeSection: imageText(s.get("dayInLifeSection")),
  };
}

export function adaptElementary(page: CmsPage): AcademicsElementaryPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    curriculumSection: imageText(s.get("curriculumSection")),
    assessmentSection: imageText(s.get("assessmentSection")),
    assessmentDetailSection: imageText(s.get("assessmentDetailSection")),
    dayInLifeSection: imageText(s.get("dayInLifeSection")),
  };
}

export function adaptMiddleSchool(page: CmsPage): AcademicsMiddleSchoolPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    overviewSection: imageText(s.get("overviewSection")),
    curriculumSection: imageText(s.get("curriculumSection")),
    assessmentSection: imageText(s.get("assessmentSection")),
    assessmentDetailSection: imageText(s.get("assessmentDetailSection")),
    supportProgramsSection: s.has("supportProgramsSection")
      ? { heading: heading(s.get("supportProgramsSection")), cards: iconCards(s.get("supportProgramsSection")) }
      : undefined,
    dayInLifeSection: imageText(s.get("dayInLifeSection")),
    learningPhasesElementaryImage: image(s.get("learningPhasesElementaryImage")?.image),
  };
}

export function adaptHighSchool(page: CmsPage): AcademicsHighSchoolPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    overviewSection: imageText(s.get("overviewSection")),
    curriculumSection: imageText(s.get("curriculumSection")),
    careerGuidanceIntroSection: heading(s.get("careerGuidanceIntroSection")),
    careerGuidanceSliderSection: s.has("careerGuidanceSliderSection")
      ? { heading: heading(s.get("careerGuidanceSliderSection")), slides: learningSlides(s.get("careerGuidanceSliderSection")) }
      : undefined,
    careerGuidanceSection: imageText(s.get("careerGuidanceSection")),
    pathwaysSection: imageText(s.get("pathwaysSection")),
    pathwaysSliderSection: s.has("pathwaysSliderSection")
      ? { heading: heading(s.get("pathwaysSliderSection")), slides: learningSlides(s.get("pathwaysSliderSection")) }
      : undefined,
    apDiplomaSection: imageText(s.get("apDiplomaSection")),
    apBenefitsSection: s.has("apBenefitsSection")
      ? { heading: heading(s.get("apBenefitsSection")), cards: iconCards(s.get("apBenefitsSection")) }
      : undefined,
    dayInLifeSection: imageText(s.get("dayInLifeSection")),
  };
}

export function adaptAdmissions(page: CmsPage): AdmissionsPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    introSection: imageText(s.get("introSection")),
    policySection: imageText(s.get("policySection")),
  };
}

export function adaptAdmissionsApplication(page: CmsPage): AdmissionsApplicationPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    videoSection: video(s.get("videoSection")),
    applicationProcess: imageText(s.get("applicationProcess")),
    stepsSection: s.has("stepsSection") ? { heading: heading(s.get("stepsSection")), steps: steps(s.get("stepsSection")) } : undefined,
    finalCta: download(s.get("finalCta")),
    mograHubAppBand: mograHubAppBand(s.get("mograHubAppBand")),
  };
}

export function adaptAdmissionsBookTour(page: CmsPage): AdmissionsBookTourPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    introSection: imageText(s.get("introSection")),
    formSection: form(s.get("formSection")),
  };
}

export function adaptAdmissionsRegisterInterest(page: CmsPage): AdmissionsRegisterInterestPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    introSection: imageText(s.get("introSection")),
    formSection: form(s.get("formSection"), {
      fields: REGISTER_INTEREST_FORM_FIELDS,
      ariaLabel: REGISTER_INTEREST_FORM_ARIA_LABEL,
    }),
  };
}

export function adaptAdmissionsFees(page: CmsPage): AdmissionsFeesPageData {
  const s = bySlot(page);
  const terms = s.get("termsSection");
  const termsRight = s.get("termsSection.rightColumn");
  return {
    ...base(page),
    journeySection: imageText(s.get("journeySection")),
    feeStructure: s.has("feeStructure")
      ? { heading: heading(s.get("feeStructure")), labels: feeLabels(s.get("feeStructure")), rows: feeRows(s.get("feeStructure")) }
      : undefined,
    termsSection:
      terms || termsRight
        ? { heading: heading(terms), leftColumn: termsGroups(terms), rightColumn: termsGroups(termsRight) }
        : undefined,
  };
}

export function adaptAdmissionsWithdrawal(page: CmsPage): AdmissionsWithdrawalPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: heading(s.get("intro")),
    stepsSection: s.has("stepsSection") ? { heading: heading(s.get("stepsSection")), steps: steps(s.get("stepsSection")) } : undefined,
  };
}

export function adaptNewsListing(page: CmsPage): NewsListingPageData {
  const s = bySlot(page);
  const listing = s.get("newsListing");
  return {
    seo: page.seo,
    hero: hero(page),
    newsHeading: listing?.heading?.title,
    newslettersHeading: listing?.heading?.subtitle,
    buttonLabel: listing?.cta?.label,
  };
}

export function adaptOurCommunity(page: CmsPage): OurCommunityPageData {
  const s = bySlot(page);
  const links = s.get("linksSection");
  return {
    ...base(page),
    supportSection: imageText(s.get("supportSection")),
    linksSection: links ? { heading: requiredHeading(links), cta: links.cta, cards: featureCards(links) } : undefined,
  };
}

export function adaptOurCampus(page: CmsPage): OurCampusPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: textSection(s.get("intro")),
    videoSection: video(s.get("videoSection")),
    facilities: imageText(s.get("facilities")),
    sectionsFeature: imageText(s.get("sectionsFeature")),
    classroomSection: imageText(s.get("classroomSection")),
    librarySection: imageText(s.get("librarySection")),
    makerspaceSection: imageText(s.get("makerspaceSection")),
    gymSection: imageText(s.get("gymSection")),
    poolSection: imageText(s.get("poolSection")),
  };
}

export function adaptStudentStaffWellbeing(page: CmsPage): StudentStaffWellbeingPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    commitment: imageText(s.get("commitment")),
    counselingSupportSection: imageText(s.get("counselingSupportSection")),
    selSection: imageText(s.get("selSection")),
    wellbeingFramework: imageText(s.get("wellbeingFramework")),
    wellnessCampaigns: imageText(s.get("wellnessCampaigns")),
    classroomIntegration: imageText(s.get("classroomIntegration")),
  };
}

export function adaptParentInvolvement(page: CmsPage): ParentInvolvementPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    partnershipSection: imageText(s.get("partnershipSection")),
    videoSection: video(s.get("videoSection")),
    programSection: imageText(s.get("programSection")),
    communitySection: imageText(s.get("communitySection")),
  };
}

export function adaptSchoolCalendar(page: CmsPage): SchoolCalendarPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: textSection(s.get("intro")),
    terms: calendarTerms(s.get("terms")),
    calendarDownload: download(s.get("calendarDownload")),
  };
}

export function adaptSchoolReports(page: CmsPage): SchoolReportsPageData {
  const s = bySlot(page);
  return { ...base(page), intro: textSection(s.get("intro")) };
}

export function adaptSchoolPolicies(page: CmsPage): SchoolPoliciesPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: textSection(s.get("intro")),
    overviewSection: imageText(s.get("overviewSection")),
    policies: policies(s.get("policies")),
  };
}

export function adaptStudentLife(page: CmsPage): StudentLifePageData {
  const s = bySlot(page);
  return {
    ...base(page),
    beyondClassroomIntro: textSection(s.get("beyondClassroomIntro")),
    lifeFeature: imageText(s.get("lifeFeature")),
    committeesSection: s.has("committeesSection")
      ? { heading: heading(s.get("committeesSection")), slides: learningSlides(s.get("committeesSection")) }
      : undefined,
  };
}

export function adaptStudentPrograms(page: CmsPage): StudentProgramsPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    highlightsSection: imageText(s.get("highlightsSection")),
    objectivesSection: imageText(s.get("objectivesSection")),
    houseCaptainsSection: imageText(s.get("houseCaptainsSection")),
    tourIntro: heading(s.get("tourIntro")),
  };
}

export function adaptExtraCurricular(page: CmsPage): ExtraCurricularActivitiesPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    enrichingSection: imageText(s.get("enrichingSection")),
    tourIntro: heading(s.get("tourIntro")),
  };
}

export function adaptContact(page: CmsPage): ContactPageData {
  const s = bySlot(page);
  return { ...base(page), contactInfo: contactInfo(s.get("contactInfo")) };
}

export function adaptCareers(page: CmsPage): CareersPageData {
  const s = bySlot(page);
  return {
    ...base(page),
    intro: imageText(s.get("intro")),
    careSection: contactInfo(s.get("careSection")),
    requirementsSection: s.has("requirementsSection") ? { columns: requirementColumns(s.get("requirementsSection")) } : undefined,
    commitmentSection: s.has("commitmentSection") ? { columns: requirementColumns(s.get("commitmentSection")) } : undefined,
    joinTeamSection: s.has("joinTeamSection")
      ? { heading: heading(s.get("joinTeamSection")), cards: joinTeamCards(s.get("joinTeamSection")) }
      : undefined,
  };
}
