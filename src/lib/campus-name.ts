/**
 * Keeps the campus name on one line: "SAIS - Abu Dhabi" never wraps, and in the full name a line may break before
 * the dash ("... School" / "- Abu Dhabi") but never after it. A word joiner after the dash stops the browser
 * breaking there (a hyphen allows a break after it).
 */
export function keepCampusNameTogether(text: string) {
  return text
    .replace(/SAIS - Abu Dhabi/g, "SAIS -⁠ Abu Dhabi")
    .replace(/ - Abu Dhabi/g, " -⁠ Abu Dhabi");
}

// Links, ids and the SEO title and description stay exactly as written in the Studio.
const UNCHANGED_KEYS = new Set(["_id", "_ref", "_key", "_type", "_rev", "href", "url", "current", "seo"]);

/** Applies keepCampusNameTogether to every text in content fetched from Sanity. */
export function keepCampusNamesTogether<T>(value: T): T {
  if (typeof value === "string") return keepCampusNameTogether(value) as T;
  if (Array.isArray(value)) return value.map((item) => keepCampusNamesTogether(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, UNCHANGED_KEYS.has(key) ? item : keepCampusNamesTogether(item)]),
    ) as T;
  }
  return value;
}
