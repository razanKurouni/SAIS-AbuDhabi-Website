"use client";

import { useEffect, useState } from "react";

export function useScrollThreshold(threshold = 18) {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      frameId = 0;
      const nextIsPastThreshold = window.scrollY > threshold;

      setIsPastThreshold((current) =>
        current === nextIsPastThreshold ? current : nextIsPastThreshold,
      );
    };

    const scheduleUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [threshold]);

  return isPastThreshold;
}
