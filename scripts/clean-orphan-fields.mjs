/**
 * Removes fields that documents still carry but the schema no longer defines.
 *
 * The Studio shows such a field as a red "unknown field" block with the raw
 * JSON and a "Remove field" button, because it has no idea how to edit it.
 * They are left behind whenever a section is dropped from a schema without the
 * matching data being unset — every entry below is a section or setting that
 * was removed from the code but stayed in the dataset.
 *
 * Run once, with a write token:
 *   SANITY_AUTH_TOKEN=... node scripts/clean-orphan-fields.mjs
 *
 * Pass --dry-run to list what would be removed without writing:
 *   SANITY_AUTH_TOKEN=... node scripts/clean-orphan-fields.mjs --dry-run
 *
 * Draft documents (drafts.<id>) are cleaned too when they exist.
 */
import { createClient } from "@sanity/client";

const dryRun = process.argv.includes("--dry-run");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "sais-uaq",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error("SANITY_AUTH_TOKEN is required to clean orphan fields.");
}

/** documentId -> field paths the schema no longer defines */
const ORPHANS = {
  "our-team-page": [
    // the three team sections removed from the page
    "departmentsSection",
    "pastoralSection",
    "administrationSection",
  ],
  "student-programs-page": [
    // the seven sections replaced by the Achievements layout
    "introSection",
    "proactiveApproach",
    "studentCongressSection",
    "sgaGoalsSection",
    "coreValuesSection",
    "leadershipStructureSection",
    "eligibilitySection",
  ],
  "student-life-page": [
    // replaced by the Beyond the Classroom intro, and the slider that was dropped
    "intro",
    "learningSliderSection",
  ],
  "extra-curricular-activities-page": [
    // replaced by the enriching intro and the activities slider
    "introSection",
    "activitiesSection",
  ],
  "parent-involvement-page": [
    // replaced by the engagement section
    "introSection",
    "videoHeading",
    // the slider has no intro paragraph to colour
    "proactiveApproach.textColor",
  ],
  "transportation-safety-page": [
    // replaced by the safety highlight band
    "guidelinesSection",
  ],
  "admissions-fees-page": ["feesIntro", "discountPolicy"],
  "admissions-application-page": [
    // the section moved to the editorial split treatment, which has no panel
    "applicationProcess.panelColor",
    "applicationProcess.waveColor",
    "applicationProcess.titleColor",
    "applicationProcess.textColor",
    "applicationProcess.backgroundColor",
    "applicationProcess.imagePosition",
  ],
  "student-inclusion-page": [
    // the bespoke panel became an imageTextSection
    "whoWeSupportSection.panelColor",
    "whoWeSupportSection.accentColor",
  ],
  "our-campus-page": [
    // facilities became an imageTextSection, which has no cards
    "facilities.cards",
  ],
  "academics-page": [
    // the curriculum overview keeps a single row
    "curriculumOverviewSection.secondBlock",
  ],
};

const valueAt = (doc, path) =>
  path.split(".").reduce((value, key) => (value == null ? undefined : value[key]), doc);

let removed = 0;
let missing = 0;

for (const [id, paths] of Object.entries(ORPHANS)) {
  for (const documentId of [id, `drafts.${id}`]) {
    const doc = await client.getDocument(documentId).catch(() => null);

    if (!doc) {
      continue;
    }

    const present = paths.filter((path) => valueAt(doc, path) !== undefined);
    missing += paths.length - present.length;

    if (present.length === 0) {
      console.log(`${documentId}: clean`);
      continue;
    }

    console.log(`${documentId}: ${dryRun ? "would remove" : "removing"} ${present.join(", ")}`);

    if (!dryRun) {
      await client.patch(documentId).unset(present).commit({ autoGenerateArrayKeys: false });
    }

    removed += present.length;
  }
}

console.log(
  `\n${dryRun ? "Would remove" : "Removed"} ${removed} field(s). ${missing} listed field(s) were already gone.`
);
