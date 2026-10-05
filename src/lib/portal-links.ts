/**
 * The mograSYS portals are per campus: SAISS is Sharjah, SAISD Dubai, SAISU Umm
 * Al Quwain, SAISA Abu Dhabi. This site is Abu Dhabi, so a Sharjah, Dubai or
 * Umm Al Quwain portal link is always the wrong destination here.
 *
 * Some of these links and the mograHUB school code are stored in the Studio and
 * may still point at another campus, so they are corrected on read. Editing them
 * in the Studio still wins for every other value.
 */
const PORTAL_HOSTS = ["ppnv1.mograsys.com", "oa.mograsys.com"];

export const ABU_DHABI_SCHOOL_CODE = "SAISA";

export function normalizePortalUrl<T extends string | undefined | null>(url: T): T {
  if (!url) {
    return url;
  }

  const corrected = PORTAL_HOSTS.reduce(
    (value, host) => value.replace(new RegExp(`\\bsais[sdu]\\.${host.replace(/\./g, "\\.")}`, "gi"), `saisa.${host}`),
    url as string
  );

  return corrected as T;
}

export function normalizeSchoolCode<T extends string | undefined | null>(code: T): T {
  if (!code) {
    return code;
  }

  return (/^sais[sdu]$/i.test(code.trim()) ? ABU_DHABI_SCHOOL_CODE : code) as T;
}

/**
 * A link pasted without its scheme — "google.com/maps?…", "www.example.com" —
 * is a relative path to the browser, so it resolves against this site and lands
 * on a 404. Anything that looks like a bare domain gets https:// put back.
 */
export function normalizeExternalUrl<T extends string | undefined | null>(url: T): T {
  if (!url) {
    return url;
  }

  const value = (url as string).trim();

  if (/^(?:[a-z][a-z0-9+.-]*:|\/|#|\?)/i.test(value)) {
    return value as T;
  }

  return (/^[\w-]+(?:\.[\w-]+)+(?:[/:?#]|$)/.test(value) ? `https://${value}` : value) as T;
}

/** Every href the site renders from the Studio goes through this. */
export function normalizeHref<T extends string | undefined | null>(url: T): T {
  return normalizePortalUrl(normalizeExternalUrl(url));
}
