"use client";

import { useRef, type TouchEvent } from "react";

/**
 * Touch handlers for a slider: a finger moving at least `threshold` px sideways (and more sideways
 * than down) calls onNext for a swipe to the left and onPrev for a swipe to the right.
 */
export function useSwipe(onPrev: () => void, onNext: () => void, threshold = 40) {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart: (event: TouchEvent) => {
      const touch = event.touches[0];
      start.current = { x: touch.clientX, y: touch.clientY };
    },
    onTouchEnd: (event: TouchEvent) => {
      const from = start.current;
      start.current = null;
      if (!from) return;

      const touch = event.changedTouches[0];
      const dx = touch.clientX - from.x;
      const dy = touch.clientY - from.y;
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) return;

      if (dx < 0) onNext();
      else onPrev();
    },
  };
}
