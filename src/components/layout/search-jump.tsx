"use client";

import { useEffect } from "react";

const PARAM = "find";
const HEADER_OFFSET = 130;

function normalize(text: string | null | undefined) {
  return (text ?? "").replace(/\s+/g, " ").trim().toLowerCase();
}

/**
 * When the page opens from a search result (#find=<section title>), scroll to
 * the heading that carries that title and flash it, so the visitor lands on
 * the section rather than the top of the page.
 */
export function SearchJump() {
  useEffect(() => {
    const jump = () => {
      const hash = window.location.hash;
      if (!hash.startsWith(`#${PARAM}=`)) return;
      let target = "";
      try {
        target = normalize(decodeURIComponent(hash.slice(PARAM.length + 2)));
      } catch {
        return;
      }
      if (!target) return;

      const headings = Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main h3, main h4, main strong, main p"));
      const match =
        headings.find((el) => normalize(el.textContent) === target) ||
        headings.find((el) => normalize(el.textContent).startsWith(target)) ||
        headings.find((el) => normalize(el.textContent).includes(target));
      if (!match) return;

      const top = match.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      match.classList.add("sais-search-target");
      window.setTimeout(() => match.classList.remove("sais-search-target"), 2600);
    };

    // Let the page settle (fonts, reveal animations) before measuring.
    const timer = window.setTimeout(jump, 350);
    window.addEventListener("hashchange", jump);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", jump);
    };
  }, []);

  return null;
}
