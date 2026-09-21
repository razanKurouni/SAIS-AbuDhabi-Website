import type { Metadata } from "next";

import "./studio.css";

export const metadata: Metadata = {
  title: "Content Studio | SAIS - Sharjah",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
