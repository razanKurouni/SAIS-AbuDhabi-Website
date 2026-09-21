import type { InnerPageNavItem } from "@/components/sections/inner-page-nav";
import type { InnerNavigationItem } from "@/types/sanity";

export const studentSectionNavItems: InnerPageNavItem[] = [
  { label: "Student Life", href: "/student-life" },
  { label: "Achievements", href: "/achievements" },
  { label: "Extra Curricular Activities", href: "/extra-curricular-activities" },
];

const studentSectionHrefByLabel = new Map(
  studentSectionNavItems.map((item) => [item.label.trim().toLowerCase(), item.href]),
);

export function resolveStudentSectionNavItems(items?: InnerNavigationItem[]): InnerPageNavItem[] {
  return studentSectionNavItems.map((fallbackItem, index) => {
    const item = items?.[index];
    const storedLabel = item?.label?.trim();
    const label = storedLabel || fallbackItem.label;
    const href = studentSectionHrefByLabel.get(label.toLowerCase()) || fallbackItem.href;

    return {
      label,
      href,
      openInNewTab: item?.openInNewTab,
    };
  });
}
