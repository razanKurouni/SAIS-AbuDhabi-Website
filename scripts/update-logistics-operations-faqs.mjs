import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

const logisticsOperationsSection = {
  _type: "object",
  heading: {
    _type: "sectionHeading",
    title: "Logistics and\nOperations",
  },
  items: [
    {
      _key: "transportation",
      _type: "object",
      question: "Is transportation provided?",
      answer:
        "Yes, SAIS offers safe and reliable bus transportation with designated routes throughout Sharjah and nearby areas.",
    },
    {
      _key: "school-hours",
      _type: "object",
      question: "What are the school hours?",
      answer:
        "School hours are typically from 7:30 AM to 3:15 PM, Monday through Wednesday and Thursday from 7:30 AM to 2:30 PM.",
    },
    {
      _key: "meal-services",
      _type: "object",
      question: "Does the school offer meal services?",
      answer:
        "Yes, the school has a canteen offering healthy snacks and lunch options, with menus updated regularly.",
    },
  ],
};

const result = await client
  .patch("admissions-faq-page")
  .set({ logisticsOperationsSection })
  .commit({ autoGenerateArrayKeys: true });

console.log(
  JSON.stringify(
    {
      documentId: result._id,
      dataset: client.config().dataset,
      title: result.logisticsOperationsSection?.heading?.title,
      itemCount: result.logisticsOperationsSection?.items?.length,
    },
    null,
    2,
  ),
);
