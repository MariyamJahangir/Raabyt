"use client";

import { type ReactNode, type JSX } from "react";
import { useParallax, type UseParallaxOptions } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";

interface ParallaxProps extends UseParallaxOptions {
  children: ReactNode;
  className?: string;
  /** HTML tag to render. Default "div" */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Drop-in parallax wrapper component.
 *
 * @example
 * <Parallax speed={-0.3} fadeIn>
 *   <h2>This moves slowly on scroll</h2>
 * </Parallax>
 *
 * @example — background image with zoom
 * <Parallax speed={-0.15} scale={0.08} className="absolute inset-0">
 *   <Image src="/bg.jpg" fill className="object-cover" alt="" />
 * </Parallax>
 */
export function Parallax({
  children,
  className,
  as: Tag = "div",
  speed,
  start,
  end,
  fadeIn,
  horizontal,
  scale,
}: ParallaxProps) {
  const ref = useParallax<HTMLDivElement>({
    speed,
    start,
    end,
    fadeIn,
    horizontal,
    scale,
  });

  return (
    // @ts-expect-error — dynamic tag typing
    <Tag ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </Tag>
  );
}
