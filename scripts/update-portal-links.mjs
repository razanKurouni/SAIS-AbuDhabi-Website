/**
 * Points the stored mograSYS links at the Sharjah campus.
 *
 * The portals are per campus — SAISS Sharjah, SAISD Dubai, SAISU Umm Al Quwain,
 * SAISA Abu Dhabi — and this site's documents still carry the Dubai ones. The
 * site corrects them on read, so this only settles the data.
 *
 *   SANITY_AUTH_TOKEN=... node scripts/update-portal-links.mjs --dry-run
 *   SANITY_AUTH_TOKEN=... node scripts/update-portal-links.mjs
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
  throw new Error("SANITY_AUTH_TOKEN is required to update the portal links.");
}

const PORTAL_HOSTS = ["ppnv1.mograsys.com", "oa.mograsys.com"];

const fixUrl = (value) =>
  PORTAL_HOSTS.reduce(
    (url, host) =>
      url.replace(new RegExp(`\\bsais[dua]\\.${host.replace(/\./g, "\\.")}`, "gi"), `saiss.${host}`),
    value
  );

/** Rewrites portal URLs and the mograHUB school code anywhere in a document. */
function fix(node, path = "", changes = []) {
  if (typeof node === "string") {
    const next = fixUrl(node);
    if (next !== node) changes.push({ path, from: node, to: next });
    return [next, changes];
  }

  if (Array.isArray(node)) {
    return [node.map((item, i) => fix(item, `${path}[${i}]`, changes)[0]), changes];
  }

  if (node && typeof node === "object") {
    const out = {};
    for (const [key, value] of Object.entries(node)) {
      const childPath = path ? `${path}.${key}` : key;

      if (key === "schoolCode" && typeof value === "string" && /^sais[dua]$/i.test(value.trim())) {
        changes.push({ path: childPath, from: value, to: "SAISS" });
        out[key] = "SAISS";
        continue;
      }

      out[key] = fix(value, childPath, changes)[0];
    }
    return [out, changes];
  }

  return [node, changes];
}

const ids = await client.fetch(`*[!(_id in path("_.**"))]._id`);
let touched = 0;

for (const id of ids) {
  const doc = await client.getDocument(id).catch(() => null);
  if (!doc) continue;

  const body = Object.fromEntries(
    Object.entries(doc).filter(([key]) => !key.startsWith("_") || key === "_key")
  );
  const [fixed, changes] = fix(body);

  if (changes.length === 0) continue;

  touched += changes.length;
  console.log(id);
  changes.forEach((c) => console.log(`  ${c.path}: ${c.from} -> ${c.to}`));

  if (!dryRun) {
    await client.patch(id).set(fixed).commit({ autoGenerateArrayKeys: false });
  }
}

console.log(`\n${dryRun ? "Would update" : "Updated"} ${touched} value(s).`);
