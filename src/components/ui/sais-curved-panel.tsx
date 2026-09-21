import type { CSSProperties, ReactNode } from "react";

type SaisCurvedPanelProps = {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
  fillColor?: string;
  accentColor?: string;
  strokeWidth?: number;
  flipped?: boolean;
  minHeight?: string;
  ariaLabel?: string;
};

type PanelStyle = CSSProperties & {
  "--sais-panel-fill"?: string;
  "--sais-panel-accent"?: string;
};

export function SaisCurvedPanel({
  children,
  className = "",
  contentClassName = "",
  id,
  fillColor = "var(--sais-primary)",
  accentColor = "var(--sais-accent)",
  strokeWidth = 88,
  flipped = false,
  minHeight,
  ariaLabel,
}: SaisCurvedPanelProps) {
  const style: PanelStyle = {
    "--sais-panel-fill": fillColor,
    "--sais-panel-accent": accentColor,
    minHeight,
  };

  return (
    <section
      id={id}
      className={`sais-curved-panel ${flipped ? "is-flipped" : ""} ${className}`}
      style={style}
    >
      <svg
        className="sais-curved-panel__svg"
        viewBox="0 0 1647 928"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
        role={ariaLabel ? "img" : undefined}
      >
        <path
          className="sais-curved-panel__shape"
          d="M0,0 H1460 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980 L0,928 Z"
        />
        <path
          className="sais-curved-panel__accent"
          d="M1460,-50 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980"
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>

      {children ? (
        <div className={`sais-curved-panel__content ${contentClassName}`}>
          {children}
        </div>
      ) : null}
    </section>
  );
}
