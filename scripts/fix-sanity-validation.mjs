import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });
const draftFooter = await client.getDocument("drafts.site-footer");

if (!draftFooter) {
  console.log(JSON.stringify({ status: "no-draft-footer" }, null, 2));
  process.exit(0);
}

const socialLinks = (draftFooter.socialLinks || []).map((link) => {
  if (link.label) return link;

  const href = String(link.href || "").toLowerCase();
  const label = href.includes("instagram")
    ? "Instagram"
    : href.includes("facebook")
      ? "Facebook"
      : href.includes("linkedin")
        ? "LinkedIn"
        : href.includes("youtube")
          ? "YouTube"
          : "Social media";

  return { ...link, label };
});

const result = await client.patch(draftFooter._id).set({ socialLinks }).commit();
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
