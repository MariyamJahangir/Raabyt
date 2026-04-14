"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on pointer devices (no touch)
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;

    const el = glowRef.current;
    if (!el) return;

    let raf: number;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.03) 40%, transparent 70%)",
      }}
    />
  );
}
