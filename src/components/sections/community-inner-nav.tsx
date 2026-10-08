import { InnerPageNav } from "@/components/sections/inner-page-nav";

const communityNavItems = [
  { label: "Our Community", href: "/our-community" },
  { label: "Our Campus", href: "/our-campus" },
  { label: "Student & Staff Wellbeing", href: "/student-staff-wellbeing" },
  { label: "Parent Involvement", href: "/parent-involvement" },
  { label: "School Calendar", href: "/school-calendar" },
  { label: "School Reports", href: "/school-reports" },
  { label: "School Policies", href: "/school-policies" },
];

export function CommunityInnerNav({ activeHref }: { activeHref: string }) {
  return (
    <InnerPageNav
      className="community-inner-nav"
      items={communityNavItems}
      activeHref={activeHref}
      activeColor="#00A5B2"
      inactiveColor="#216B97"
      textColor="#ffffff"
      dividerColor="#ffffff"
      topLineColor="#ffffff"
      ariaLabel="Our Community navigation"
    />
  );
}
