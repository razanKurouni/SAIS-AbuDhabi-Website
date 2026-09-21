"use client";

import { useEffect, useMemo, useState } from "react";
import { useInViewport } from "@/hooks/use-in-viewport";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type ParsedMetricValue = {
  decimals: number;
  prefix: string;
  suffix: string;
  target: number;
};

function parseMetricValue(value: string): ParsedMetricValue | null {
  const trimmed = value.trim();
  const match = trimmed.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, numericPart, suffix] = match;
  const decimals = numericPart.includes(".") ? numericPart.split(".")[1]?.length || 0 : 0;

  return {
    decimals,
    prefix,
    suffix,
    target: Number(numericPart),
  };
}

function formatMetricValue(parsedValue: ParsedMetricValue, currentValue: number) {
  const formattedValue =
    parsedValue.decimals > 0
      ? currentValue.toFixed(parsedValue.decimals)
      : Math.round(currentValue).toString();

  return `${parsedValue.prefix}${formattedValue}${parsedValue.suffix}`;
}

export function useCountUpValue(value: string, duration = 1650) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const parsedValue = useMemo(() => parseMetricValue(value), [value]);
  const { ref, isInViewport } = useInViewport<HTMLParagraphElement>({ once: true, threshold: 0.7 });
  const [animatedDisplayValue, setAnimatedDisplayValue] = useState<string | null>(null);
  const shouldAnimate = Boolean(parsedValue && !prefersReducedMotion);
  const displayValue =
    shouldAnimate && parsedValue
      ? animatedDisplayValue ?? formatMetricValue(parsedValue, 0)
      : value;

  useEffect(() => {
    if (!parsedValue || prefersReducedMotion || !isInViewport) {
      return;
    }

    const startTime = performance.now();
    let frameId = 0;

    const updateValue = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedDisplayValue(formatMetricValue(parsedValue, parsedValue.target * easedProgress));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(updateValue);
      } else {
        setAnimatedDisplayValue(value);
      }
    };

    frameId = window.requestAnimationFrame(updateValue);

    return () => window.cancelAnimationFrame(frameId);
  }, [duration, isInViewport, parsedValue, prefersReducedMotion, value]);

  return {
    displayValue,
    ref,
  };
}
