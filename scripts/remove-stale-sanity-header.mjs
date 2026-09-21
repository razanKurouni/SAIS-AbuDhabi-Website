import fs from "node:fs/promises";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });
const staleId = "site-header";
const activeId = "site-header-main";

const [staleHeader, activeHeader, referenceCount] = await Promise.all([
  client.getDocument(staleId),
  client.getDocument(activeId),
  client.fetch('count(*[references($staleId)])', { staleId }),
]);

if (!staleHeader) {
  console.log(JSON.stringify({ status: "already-removed", staleId }, null, 2));
  process.exit(0);
}

if (staleHeader._type !== "object") {
  throw new Error(`Refusing to remove ${staleId}: expected type object, found ${staleHeader._type}.`);
}

if (activeHeader?._type !== "siteHeader") {
  throw new Error(`Refusing to remove ${staleId}: active replacement ${activeId} is missing.`);
}

if (referenceCount !== 0) {
  throw new Error(`Refusing to remove ${staleId}: it still has ${referenceCount} reference(s).`);
}

const backupDirectory = path.resolve("sanity-backups");
const backupPath = path.join(backupDirectory, `${staleId}.json`);
await fs.mkdir(backupDirectory, { recursive: true });
await fs.writeFile(backupPath, `${JSON.stringify(staleHeader, null, 2)}\n`, "utf8");
await client.delete(staleId);

console.log(
  JSON.stringify(
    {
      status: "removed",
      staleId,
      activeId,
      referenceCount,
      backupPath,
    },
    null,
    2,
  ),
);
