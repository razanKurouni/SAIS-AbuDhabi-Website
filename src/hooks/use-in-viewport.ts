"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewportOptions = {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function useInViewport<TElement extends Element>({
  once = true,
  rootMargin = "0px",
  threshold = 0.18,
}: UseInViewportOptions = {}) {
  const ref = useRef<TElement | null>(null);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const frameId = window.requestAnimationFrame(() => setIsInViewport(true));

      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextIsInViewport = entry.isIntersecting;

        setIsInViewport((current) => (current === nextIsInViewport ? current : nextIsInViewport));

        if (nextIsInViewport && once) {
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, isInViewport };
}
