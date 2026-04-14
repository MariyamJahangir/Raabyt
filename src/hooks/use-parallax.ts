"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export interface UseParallaxOptions {
  /** Parallax speed — negative = moves up, positive = moves down. Default -0.2 */
  speed?: number;
  /** ScrollTrigger start position. Default "top bottom" */
  start?: string;
  /** ScrollTrigger end position. Default "bottom top" */
  end?: string;
  /** Whether to animate opacity as well (fade-in). Default false */
  fadeIn?: boolean;
  /** Horizontal parallax offset (vw-based percentage). Default 0 */
  horizontal?: number;
  /** Scale shift — e.g. 0.05 means scale from 1 to 1.05. Default 0 */
  scale?: number;
}

/**
 * GSAP ScrollTrigger-based parallax hook.
 * Works seamlessly with Lenis smooth scroll.
 *
 * @example
 * const ref = useParallax<HTMLDivElement>({ speed: -0.3 });
 * <div ref={ref}>...</div>
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
): RefObject<T | null> {
  const {
    speed = -0.2,
    start = "top bottom",
    end = "bottom top",
    fadeIn = false,
    horizontal = 0,
    scale = 0,
  } = options;

  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const el = ref.current;

    const toVars: gsap.TweenVars = {
      yPercent: speed * 100,
      ease: "none",
    };

    if (horizontal !== 0) {
      toVars.xPercent = horizontal * 100;
    }

    if (scale !== 0) {
      // Start at 1, end at 1 + scale
      gsap.set(el, { scale: 1 });
      toVars.scale = 1 + scale;
    }

    if (fadeIn) {
      gsap.set(el, { opacity: 0.3 });
      toVars.opacity = 1;
    }

    const tween = gsap.to(el, {
      ...toVars,
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, start, end, fadeIn, horizontal, scale, reduced]);

  return ref;
}
