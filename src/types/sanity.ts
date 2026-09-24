export type PortableTextSpan = {
  _key?: string;
  _type?: "span";
  text?: string;
  marks?: string[];
};

export type PortableTextBlock = {
  _key?: string;
  _type?: "block";
  style?: string;
  markDefs?: unknown[];
  children?: PortableTextSpan[];
  listItem?: "bullet" | "number";
  level?: number;
};

export type SanityImage = {
  alt?: string;
  caption?: string;
  url?: string;
  mobileUrl?: string;
  mobileAlt?: string;
  width?: number;
  height?: number;
};

export type LinkField = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

export type Cta = LinkField & {
  variant?: "primary" | "secondary" | "ghost";
};

export type MograHubAppBand = {
  eyebrow?: string;
  title?: string;
  description?: string;
  schoolCodeLabel?: string;
  schoolCode?: string;
  androidUrl?: string;
  appleUrl?: string;
};

export type SectionHeading = {
  eyebrow?: string;
  title: string;
  accentTitle?: string;
  subtitle?: string;
  description?: PortableTextBlock[];
};

export type Seo = {
  title?: string;
  description?: string;
  image?: SanityImage;
};

export type MetricItem = {
  value: string;
  label: string;
};

export type FeatureCard = {
  title: string;
  description?: string;
  image?: SanityImage;
  cta?: Cta;
  theme?: "blue" | "teal" | "orange" | "gray";
};

export type ImageTextSection = {
  _key?: string;
  heading: SectionHeading;
  image?: SanityImage;
  ctas?: Cta[];
  imagePosition?: string;
  theme?: "blue" | "teal" | "light";
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
};

export type BoardGovernorMember = {
  _key?: string;
  name?: string;
  role?: string;
  image?: SanityImage;
  yearsOfExperience?: string;
  hoverBio?: string;
  cardColor?: string;
  imageBackgroundColor?: string;
};

export type BoardGovernorsSection = {
  heading?: SectionHeading;
  members?: BoardGovernorMember[];
  backgroundColor?: string;
};

export type StatementCard = {
  _key?: string;
  title?: string;
  description?: string;
  image?: SanityImage;
  cardColor?: string;
  imagePosition?: string;
};

export type StatementSection = {
  heading?: SectionHeading;
  cards?: StatementCard[];
  backgroundColor?: string;
};

export type ValuesPillarItem = {
  _key?: string;
  title?: string;
  description?: string;
  icon?: SanityImage;
};

export type ValuesSlide = {
  _key?: string;
  title?: string;
  image?: SanityImage;
  items?: ValuesPillarItem[];
  curveColor?: string;
  titleColor?: string;
  itemTitleColor?: string;
  textColor?: string;
  imagePosition?: string;
};

export type ValuesSection = {
  heading?: SectionHeading;
  slides?: ValuesSlide[];
  backgroundColor?: string;
  titleColor?: string;
  introTextColor?: string;
};

export type MissionShowcaseCard = {
  _key?: string;
  title?: string;
  description?: string;
  image?: SanityImage;
  color?: string;
  imagePosition?: string;
};

export type MissionShowcaseSection = {
  title?: string;
  statement?: string;
  cards?: MissionShowcaseCard[];
};

export type ValuesGridItem = {
  _key?: string;
  title?: string;
  icon?: "tolerance" | "integrity" | "globalCitizenship" | "equity" | "innovation";
  iconImage?: SanityImage;
};

export type ValuesGridSection = {
  title?: string;
  items?: ValuesGridItem[];
};

export type AccreditationLogo = {
  _key?: string;
  name?: string;
  image?: SanityImage;
  width?: string;
};

export type AboutAccreditationsSection = {
  heading?: SectionHeading;
  body?: PortableTextBlock[];
  logos?: AccreditationLogo[];
  backgroundColor?: string;
  titleColor?: string;
  lineColor?: string;
  textColor?: string;
};

export type AboutBranchCard = {
  _key?: string;
  name?: string;
  established?: string;
  location?: string;
  description?: string;
  image?: SanityImage;
  cta?: Cta;
  cardColor?: string;
  buttonColor?: string;
  imagePosition?: string;
};

export type AboutBranchesSection = {
  heading?: SectionHeading;
  cards?: AboutBranchCard[];
  backgroundColor?: string;
  titleColor?: string;
  lineColor?: string;
};

export type PageHeroContent = {
  heading?: SectionHeading;
  image?: SanityImage;
  topLineColor?: string;
  panelColor?: string;
  waveColor?: string;
  textColor?: string;
  imagePosition?: string;
  imageWidth?: string;
};

export type InnerNavigationItem = {
  _key?: string;
  label?: string;
  href?: string;
  openInNewTab?: boolean;
};

export type InnerNavigation = {
  items?: InnerNavigationItem[];
  activeHref?: string;
  activeColor?: string;
  inactiveColor?: string;
  textColor?: string;
  dividerColor?: string;
  topLineColor?: string;
  ariaLabel?: string;
};

export type AboutIntroSection = {
  heading?: SectionHeading;
  image?: SanityImage;
  policyTitle?: string;
  body?: PortableTextBlock[];
  imagePosition?: string;
};

export type AboutBenefitsSection = {
  heading?: SectionHeading;
  cards?: FeatureCard[];
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
};

export type AboutPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  intro?: AboutIntroSection;
  principalMessage?: ImageTextSection;
  boardGovernors?: BoardGovernorsSection;
  statement?: StatementSection;
  values?: ValuesSection;
  missionShowcase?: MissionShowcaseSection;
  valuesGrid?: ValuesGridSection;
  accreditations?: AboutAccreditationsSection;
  khdaSection?: AcademicsKindergartenFeatureSection;
  benefits?: AboutBenefitsSection;
  branches?: AboutBranchesSection;
  governance?: ImageTextSection;
  inspection?: ImageTextSection;
};

export type AdmissionsPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  introSection?: ImageTextSection;
  policySection?: ImageTextSection;
  rollingAdmissionsSection?: ImageTextSection;
};

export type AdmissionsApplicationPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  applicationProcess?: {
    heading?: SectionHeading;
    image?: SanityImage;
    imageSide?: string;
  };
  timelinesSection?: ImageTextSection;
  stepsSection?: ApplicationStepsSection;
  finalCta?: CalendarDownloadSection;
  mograHubAppBand?: MograHubAppBand;
};

export type AdmissionsTourFormField = {
  _key?: string;
  label?: string;
  name?: string;
  type?: "text" | "email" | "tel" | "date" | "time" | "textarea";
  placeholder?: string;
  required?: boolean;
};

export type AdmissionsTourFormSection = {
  ariaLabel?: string;
  recipientEmail?: string;
  fields?: AdmissionsTourFormField[];
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
};

export type AdmissionsBookTourPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  introSection?: ImageTextSection;
  formSection?: AdmissionsTourFormSection;
  virtualTourSection?: ImageTextSection;
};

export type ApplicationStep = {
  _key?: string;
  number?: number;
  title?: string;
  description?: string;
  backgroundColor?: string;
};

export type ApplicationStepsSection = {
  heading?: SectionHeading;
  steps?: ApplicationStep[];
};

export type FaqItem = {
  _key?: string;
  question?: string;
  answer?: string;
};

export type FaqSection = {
  heading?: SectionHeading;
  items?: FaqItem[];
};

export type AdmissionsFaqPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  introSection?: ContactInfoSection;
  faqSection?: FaqSection;
  admissionsOrientationSection?: FaqSection;
  academicsSupportSection?: FaqSection;
  logisticsOperationsSection?: FaqSection;
};

export type AdmissionsFeesPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  journeySection?: ImageTextSection;
  feeStructure?: AdmissionsFeeStructureSection;
  termsSection?: AdmissionsFeeTermsSection;
};

export type AdmissionsFeeStructureRow = {
  _key?: string;
  gradeYear?: string;
  tuitionFee?: string;
  books?: string;
  uniform?: string;
  total?: string;
};

export type AdmissionsFeeStructureSection = {
  heading?: SectionHeading;
  labels?: {
    gradeYear?: string;
    tuitionFee?: string;
    books?: string;
    uniform?: string;
    total?: string;
  };
  rows?: AdmissionsFeeStructureRow[];
};

export type AdmissionsFeeTermsGroup = {
  _key?: string;
  title?: string;
  body?: PortableTextBlock[];
  accentList?: boolean;
};

export type AdmissionsFeeTermsSection = {
  heading?: SectionHeading;
  leftColumn?: AdmissionsFeeTermsGroup[];
  rightColumn?: AdmissionsFeeTermsGroup[];
};

export type AdmissionsWithdrawalPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  intro?: AboutIntroSection;
};

export type NewsPost = {
  _id?: string;
  title?: string;
  slug?: string;
  category?: "news" | "newsletter";
  featured?: boolean;
  publishedAt?: string;
  excerpt?: string;
  image?: SanityImage;
  body?: PortableTextBlock[];
  seo?: Seo;
};

export type NewsListingPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  newsHeading?: string;
  newslettersHeading?: string;
  buttonLabel?: string;
};

export type OurTeamPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  leadershipSection?: {
    heading?: SectionHeading;
    groupTitle?: string;
    members?: BoardGovernorMember[];
    backgroundColor?: string;
    introColor?: string;
    bodyColor?: string;
    titleColor?: string;
    lineColor?: string;
  };
};

export type OurCommunityPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  supportSection?: ImageTextSection;
  linksSection?: {
    heading: SectionHeading;
    cta?: Cta;
    cards?: FeatureCard[];
  };
};

export type CampusVideoSection = {
  poster?: SanityImage;
  videoFileUrl?: string;
  videoFilename?: string;
  videoUrl?: string;
};

export type CampusFacilityCard = {
  _key?: string;
  title?: string;
  image?: SanityImage;
  body?: PortableTextBlock[];
};

export type OurCampusPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  intro?: {
    heading?: SectionHeading;
  };
  videoSection?: CampusVideoSection;
  facilities?: ImageTextSection;
  librarySection?: ImageTextSection;
  elementaryLibrarySection?: ImageTextSection;
  secondaryLibrarySection?: CurvedPanelSection;
  roboticsLabSection?: ImageTextSection;
};

export type WellbeingIconCard = {
  _key?: string;
  title?: string;
  description?: string;
  icon?: SanityImage;
};

export type CurvedPanelSection = {
  heading?: SectionHeading;
  image?: SanityImage;
  imagePosition?: string;
  backgroundColor?: string;
  curveColor?: string;
  curveLineColor?: string;
  titleColor?: string;
  textColor?: string;
};

export type StudentStaffWellbeingPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  commitment?: {
    heading?: SectionHeading;
    image?: SanityImage;
    imagePosition?: string;
  };
  proactiveApproach?: {
    heading?: SectionHeading;
    cards?: WellbeingIconCard[];
  };
  counsellingSection?: ContactInfoSection;
  selSection?: {
    heading?: SectionHeading;
    image?: SanityImage;
    imagePosition?: string;
  };
  wellbeingFramework?: CurvedPanelSection;
};

export type StudentInclusionPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  introSection?: ImageTextSection;
  approachSection?: ImageTextSection;
  whoWeSupportSection?: ImageTextSection;
  supportProgramsSection?: AcademicsSupportProgramsSection;
};

export type HealthSafetyPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  introSection?: ImageTextSection;
  approachSection?: ImageTextSection;
};

export type FoodServicesNutritionPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  introSection?: ImageTextSection;
};

export type MedicalServicesPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  introSection?: ImageTextSection;
};

export type SchoolSuppliesUniformPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  introSection?: ImageTextSection;
  uniformSection?: ImageTextSection;
};

export type SafetyHighlightSection = {
  heading?: SectionHeading;
  image?: SanityImage;
  imagePosition?: string;
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
};

export type TransportationSafetyPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  safetyHighlight?: SafetyHighlightSection;
  boardingSection?: ImageTextSection;
};

export type ParentEngagementSection = {
  heading?: SectionHeading;
  bodyText?: PortableTextBlock[];
  bandColor?: string;
  titleColor?: string;
  textColor?: string;
};

export type ParentInvolvementPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  engagementSection?: ParentEngagementSection;
  videoSection?: CampusVideoSection;
  proactiveIntroSection?: ImageTextSection;
  proactiveApproach?: AcademicsSupportProgramsSection;
};

export type SchoolCalendarTermRow = {
  _key?: string;
  label?: string;
  date?: string;
};

export type SchoolCalendarTerm = {
  _key?: string;
  title?: string;
  color?: string;
  rows?: SchoolCalendarTermRow[];
};

export type SchoolCalendarPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  intro?: {
    heading?: SectionHeading;
  };
  terms?: SchoolCalendarTerm[];
  calendarDownload?: CalendarDownloadSection;
};

export type SchoolPolicyDocument = {
  _key?: string;
  title?: string;
  coverImage?: SanityImage;
  documentUrl?: string | null;
  documentFilename?: string | null;
  downloadLabel?: string;
};

export type SchoolPoliciesPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  intro?: {
    heading?: SectionHeading;
  };
  policies?: SchoolPolicyDocument[];
};

export type StudentLifePageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  beyondClassroomIntro?: {
    heading?: SectionHeading;
    backgroundColor?: string;
    titleColor?: string;
    accentColor?: string;
    textColor?: string;
  };
  sgaSection?: ContactInfoSection;
  studentCongressSection?: ImageTextSection;
  ministriesSlider?: AcademicsSupportProgramsSection;
  programsSection?: ImageTextSection;
  miniSgaSection?: ContactInfoSection;
  sgaShowcaseSection?: ImageTextSection;
};

export type StudentProgramsPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  excellenceIntro?: ImageTextSection;
  highlightsSection?: ImageTextSection;
  communitySection?: ImageTextSection;
};

export type ExtraCurricularActivitiesPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  enrichingIntro?: AcademicsApBenefitsSection;
  activitiesSlider?: AcademicsLearningSliderSection;
};

export type CalendarDownloadSection = {
  text?: string;
  buttonLabel?: string;
  fileUrl?: string | null;
  fileName?: string | null;
};

export type AcademicsPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  curriculumSection?: ContactInfoSection;
  cultureSection?: ImageTextSection;
  steamSection?: ImageTextSection;
  careerGuidanceSection?: AcademicsKindergartenFeatureSection;
  careerGuidanceDetailSection?: AcademicsKindergartenFeatureSection;
  careerGuidanceOutreachSection?: ImageTextSection;
  skillsSection?: AcademicsSkillsSection;
  curriculumOverviewSection?: AcademicsCurriculumOverviewSection;
  testingExcellenceSection?: AcademicsKindergartenFeatureSection;
  stemProgramSection?: ImageTextSection;
  teachingCommitmentsSection?: AcademicsTeachingCommitmentsSection;
  learningSliderSection?: AcademicsLearningSliderSection;
  assessmentProtocolSection?: AcademicsKindergartenAssessmentSection;
  calendarDownload?: CalendarDownloadSection;
};

export type AcademicsKindergartenIntroSection = {
  heading?: SectionHeading;
  titleColor?: string;
  textColor?: string;
  backgroundColor?: string;
};

export type AcademicsKindergartenFeatureSection = {
  heading?: SectionHeading;
  image?: SanityImage;
  imageSide?: "left" | "right";
  imagePosition?: string;
  backgroundColor?: string;
  panelColor?: string;
  waveColor?: string;
  titleColor?: string;
  textColor?: string;
};

export type AcademicsKindergartenAssessmentCard = {
  _key?: string;
  title?: string;
  description?: string;
  icon?: SanityImage;
};

export type AcademicsKindergartenAssessmentSection = {
  heading?: SectionHeading;
  cards?: AcademicsKindergartenAssessmentCard[];
  closingStatement?: PortableTextBlock[];
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
  cardTextColor?: string;
  cardBorderColor?: string;
  cardHoverBorderColor?: string;
};

export type AcademicsKindergartenPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  intro?: AcademicsKindergartenIntroSection;
  excellenceSection?: AcademicsKindergartenFeatureSection;
  curriculumSection?: ImageTextSection;
  assessmentSection?: AcademicsKindergartenFeatureSection;
};

export type AcademicsElementaryIntroSection = {
  heading?: SectionHeading;
  titleColor?: string;
  textColor?: string;
  backgroundColor?: string;
};

export type AcademicsElementaryPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  intro?: AcademicsElementaryIntroSection;
  curriculumSection?: AcademicsKindergartenFeatureSection;
  assessmentSection?: AcademicsKindergartenFeatureSection;
  assessmentDetailSection?: AcademicsKindergartenFeatureSection;
  assessmentSupportSection?: AcademicsKindergartenFeatureSection;
};

export type AcademicsMiddleSchoolPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  overviewSection?: ImageTextSection;
  tailoredInstructionSection?: AcademicsKindergartenFeatureSection;
  curriculumOverviewSection?: AcademicsCurriculumOverviewSection;
  curriculumLifeSection?: ImageTextSection;
  assessmentSection?: ContactInfoSection;
  supportProgramsSection?: AcademicsSupportProgramsSection;
  learningPhasesElementaryImage?: SanityImage;
};

export type AcademicsApBenefitCard = {
  _key?: string;
  title?: string;
  description?: string;
  icon?: SanityImage;
};

export type AcademicsApBenefitsSection = {
  heading?: SectionHeading;
  cards?: AcademicsApBenefitCard[];
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  cardIconColor?: string;
  cardTitleColor?: string;
  cardTextColor?: string;
  textColor?: string;
};

export type AcademicsHighSchoolPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  innerNavigation?: InnerNavigation;
  overviewSection?: ImageTextSection;
  excellenceSection?: AcademicsKindergartenFeatureSection;
  curriculumSection?: ImageTextSection;
  careerGuidanceSection?: AcademicsKindergartenFeatureSection;
  pathwaysSection?: AcademicsKindergartenFeatureSection;
  pathwaysSliderSection?: AcademicsLearningSliderSection;
  pathwaysDetailsSection?: ImageTextSection;
  careerGuidanceIntroSection?: SectionHeading;
  apDiplomaSection?: ImageTextSection;
  apOverviewSection?: ImageTextSection;
  apSupportSection?: AcademicsKindergartenFeatureSection;
  apCoursesSection?: AcademicsSupportProgramsSection;
  apBenefitsSection?: AcademicsApBenefitsSection;
};

export type AcademicsSkillItem = {
  _key?: string;
  title?: string;
  icon?: SanityImage;
  iconType?: "critical" | "communication" | "organization" | "research" | "resilience" | "empathy" | "curiosity" | "growth";
  theme?: "teal" | "orange";
};

export type AcademicsSkillGroup = {
  _key?: string;
  title?: string;
  items?: AcademicsSkillItem[];
};

export type AcademicsSkillsSection = {
  heading?: SectionHeading;
  groups?: AcademicsSkillGroup[];
};

export type AcademicsCurriculumOverviewSection = {
  heading?: SectionHeading;
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
  firstBlock?: ImageTextSection;
  secondBlock?: ImageTextSection;
};

export type AcademicsSupportProgramCard = {
  _key?: string;
  title?: string;
  description?: string;
  icon?: SanityImage;
  iconType?: "determination" | "gifted" | "eal" | "counseling" | "differentiation";
};

export type AcademicsSupportProgramsSection = {
  heading?: SectionHeading;
  cards?: AcademicsSupportProgramCard[];
  backgroundColor?: string;
  titleColor?: string;
  cardBorderColor?: string;
  cardHoverBorderColor?: string;
  cardTextColor?: string;
  cardIconColor?: string;
};

export type AcademicsTeachingCommitmentCard = {
  _key?: string;
  title?: string;
  description?: string;
  icon?: SanityImage;
  iconType?: "expectations" | "engagement" | "achievement";
};

export type AcademicsTeachingCommitmentsSection = {
  heading?: SectionHeading;
  cards?: AcademicsTeachingCommitmentCard[];
};

export type AcademicsLearningSlide = {
  _key?: string;
  title?: string;
  body?: string;
  image?: SanityImage;
  backgroundColor?: string;
  sideColor?: string;
  ringColor?: string;
  titleColor?: string;
  textColor?: string;
  imagePosition?: string;
};

export type AcademicsLearningSliderSection = {
  heading?: SectionHeading;
  slides?: AcademicsLearningSlide[];
};

export type ContactInfoItem = {
  _key?: string;
  icon?: "location" | "phone" | "email";
  label?: string;
  text?: string;
  href?: string;
};

export type ContactInfoSection = {
  heading?: SectionHeading;
  image?: SanityImage;
  imagePosition?: string;
  panelColor?: string;
  waveColor?: string;
  titleColor?: string;
  textColor?: string;
  items?: ContactInfoItem[];
};

export type ContactPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  contactInfo?: ContactInfoSection;
};

export type CareersIntroSection = {
  heading?: SectionHeading;
  image?: SanityImage;
  ctas?: Cta[];
};

export type CareersRequirementColumn = {
  _key?: string;
  title?: string;
  intro?: string;
  items?: string[];
};

export type CareersRequirementsSection = {
  columns?: CareersRequirementColumn[];
};

export type CareersJoinTeamCard = {
  _key?: string;
  icon?: SanityImage;
  label?: string;
  text?: string;
  href?: string;
};

export type CareersJoinTeamSection = {
  heading?: SectionHeading;
  cards?: CareersJoinTeamCard[];
};

export type CareersPageData = {
  seo?: Seo;
  hero?: PageHeroContent;
  intro?: CareersIntroSection;
  editorialSection?: ImageTextSection;
  careSection?: ContactInfoSection;
  requirementsSection?: CareersRequirementsSection;
  joinTeamSection?: CareersJoinTeamSection;
};

export type LogoItem = {
  name: string;
  image?: SanityImage;
};

export type WhyDubaiItem = {
  title?: string;
  description: string;
  iconType?: "student" | "globe" | "learning" | "family";
  icon?: SanityImage;
};

export type FooterColumn = {
  title?: string;
  links?: LinkField[];
};

export type FooterContactItem = {
  _key?: string;
  label?: string;
  text?: string;
  href?: string;
  icon?: "location" | "phone" | "email";
};

export type SiteFooter = {
  logo?: SanityImage;
  logoText?: string;
  contactText?: PortableTextBlock[];
  contactItems?: FooterContactItem[];
  columns?: FooterColumn[];
  parentStudentLinks?: LinkField[];
  parentStudentLinksTitle?: string;
  quickLinks?: LinkField[];
  quickLinksTitle?: string;
  socialLinks?: LinkField[];
  legalLinks?: LinkField[];
  copyrightText?: string;
  creditLabel?: string;
  creditName?: string;
  creditUrl?: string;
};

export type HeaderSettings = {
  logo?: SanityImage;
  scrolledLogo?: SanityImage;
  menuIcon?: SanityImage;
  bookTourButton?: Cta;
  applyNowButton?: Cta;
};

export type SiteHeader = HeaderSettings & {
  navigation?: LinkField[];
};

export type HomepageData = {
  seo?: Seo;
  header?: HeaderSettings;
  navigation?: LinkField[];
  hero?: {
    heading: string;
    subtitle?: string;
    description?: PortableTextBlock[];
    image?: SanityImage;
    ctas?: Cta[];
    valueBar?: string[];
  };
  heroContactBand?: {
    text?: string;
    ctas?: Cta[];
  };
  intro?: ImageTextSection;
  growthSection?: ImageTextSection;
  whyDubai?: {
    heading: SectionHeading;
    image?: SanityImage;
    items?: WhyDubaiItem[];
  };
  ctaBand?: {
    text: string;
    ctas?: Cta[];
  };
  accreditations?: {
    heading: SectionHeading;
    logos?: LogoItem[];
  };
  whySection?: ImageTextSection;
  whyFeature?: ImageTextSection;
  facts?: {
    heading: SectionHeading;
    items?: MetricItem[];
  };
  quickLinks?: {
    heading: SectionHeading;
    cards?: FeatureCard[];
  };
  learningPhases?: {
    heading: SectionHeading;
    cta?: Cta;
    cards?: FeatureCard[];
  };
  tour?: {
    heading: SectionHeading;
    cards?: FeatureCard[];
  };
  news?: {
    heading: SectionHeading;
    cta?: Cta;
    posts?: FeatureCard[];
  };
  instagram?: {
    heading: SectionHeading;
    images?: SanityImage[];
    socialLinks?: LinkField[];
  };
  footer?: SiteFooter;
};

export type LegacyHomeSection = {
  _id: string;
  order: number;
  title: string;
  subtitle?: string;
  body?: PortableTextBlock[];
  items?: string[];
  ctas?: string[];
  imagePlaceholders?: Array<{
    _key?: string;
    label?: string;
    fileName?: string;
    note?: string;
  }>;
  images?: Array<SanityImage & { label?: string }>;
};

/* ------------------------------------------------------------------------- */
/* Content model stored in Sanity (see sanity/schemas and src/content/page-spec) */
/* ------------------------------------------------------------------------- */

export type CmsFile = {
  url?: string | null;
  filename?: string | null;
};

export type CmsEntry = {
  _key?: string;
  label?: string;
  text?: string;
  href?: string;
  iconType?: string;
  icon?: SanityImage;
};

export type CmsCard = {
  _key?: string;
  title?: string;
  subtitle?: string;
  label?: string;
  description?: string;
  body?: PortableTextBlock[];
  image?: SanityImage;
  icon?: SanityImage;
  iconType?: string;
  cta?: Cta;
  file?: CmsFile;
  entries?: CmsEntry[];
};

export type CmsSection = {
  _type: string;
  _key?: string;
  slot?: string;
  heading?: SectionHeading;
  body?: PortableTextBlock[];
  image?: SanityImage;
  mobileImage?: SanityImage;
  icon?: SanityImage;
  cta?: Cta;
  ctas?: Cta[];
  cards?: CmsCard[];
  entries?: CmsEntry[];
  file?: CmsFile;
  video?: CmsFile;
  href?: string;
  recipientEmail?: string;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  images?: SanityImage[];
};

export type CmsHero = {
  heading?: SectionHeading;
  image?: SanityImage;
  ctas?: Cta[];
  items?: string[];
};

export type CmsPage = {
  _id: string;
  title?: string;
  route?: string;
  seo?: Seo;
  hero?: CmsHero;
  sections?: CmsSection[];
};

export type SiteSettings = {
  header?: SiteHeader;
  footer?: SiteFooter;
};
