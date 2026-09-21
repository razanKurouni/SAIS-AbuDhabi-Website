import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });
const draftId = "drafts.site-footer";
const draft = await client.getDocument(draftId);

if (!draft) {
  console.log(JSON.stringify({ status: "no-draft", documentId: draftId }, null, 2));
  process.exit(0);
}

const labels = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  x: "X",
  twitter: "X",
};

let changed = false;
const socialLinks = (draft.socialLinks || []).map((link) => {
  if (link.label?.trim()) return link;

  const href = (link.href || "").toLowerCase();
  const key = Object.keys(labels).find((network) => href.includes(network));
  changed = true;

  return {
    ...link,
    label: key ? labels[key] : "Social link",
  };
});

if (!changed) {
  console.log(JSON.stringify({ status: "already-valid", documentId: draftId }, null, 2));
  process.exit(0);
}

const result = await client.patch(draftId).set({ socialLinks }).commit();
console.log(
  JSON.stringify(
    {
      status: "fixed",
      documentId: result._id,
      labels: result.socialLinks?.map((link) => link.label),
    },
    null,
    2,
  ),
);
