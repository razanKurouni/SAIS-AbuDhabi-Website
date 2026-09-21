"use client";

import dynamic from "next/dynamic";

const StudioClient = dynamic(
  () => import("./studio-client").then((module) => module.StudioClient),
  { ssr: false }
);

export default function StudioPage() {
  return <StudioClient />;
}
