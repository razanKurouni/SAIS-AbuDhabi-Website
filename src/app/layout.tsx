import type { Metadata } from "next";
import { NavigationProgress } from "@/components/layout/navigation-progress";
import { RouteScrollReset } from "@/components/layout/route-scroll-reset";
import "./globals.css";
import "./motion-v2.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://new-sais-main.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sharjah American International School | SAIS - UAQ",
  description: "Official website of Sharjah American International School.",
  icons: {
    icon: "/sais-tab-icon.png",
    shortcut: "/sais-tab-icon.png",
    apple: "/sais-tab-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavigationProgress />
        <RouteScrollReset />
        {children}
      </body>
    </html>
  );
}
