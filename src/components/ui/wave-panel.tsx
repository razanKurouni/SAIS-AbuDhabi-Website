import type { ReactNode } from "react";
import { SaisCurvedPanel } from "@/components/ui/sais-curved-panel";

type WavePanelProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "blue" | "teal" | "light";
};

const toneColors = {
  blue: {
    fillColor: "var(--sais-primary)",
    accentColor: "var(--sais-accent)",
    className: "text-white",
  },
  teal: {
    fillColor: "var(--sais-accent)",
    accentColor: "#d97252",
    className: "text-white",
  },
  light: {
    fillColor: "#ffffff",
    accentColor: "var(--sais-accent)",
    className: "text-[#10324b]",
  },
};

export function WavePanel({ children, className = "", id, tone = "blue" }: WavePanelProps) {
  const colors = toneColors[tone];

  return (
    <SaisCurvedPanel
      id={id}
      fillColor={colors.fillColor}
      accentColor={colors.accentColor}
      className={`rounded-[10px] ${colors.className} ${className}`}
    >
      {children}
    </SaisCurvedPanel>
  );
}
