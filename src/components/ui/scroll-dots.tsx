"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "products", label: "Products" },
  { id: "why-raabyt", label: "Why Raabyt" },
  { id: "stats", label: "Stats" },
  { id: "testimonials", label: "Testimonials" },
  { id: "trust", label: "Trust" },
  { id: "cta", label: "CTA" },
];

export function ScrollDots() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    // The scroll container is <main>, not window
    const main = document.getElementById("main-content");
    if (!main) return;

    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { root: main, threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      aria-label="Section navigation"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={`Scroll to ${label}`}
          className={cn(
            "rounded-full transition-all duration-300",
            active === id
              ? "w-2 h-2 bg-brand-purple shadow-[0_0_8px_rgba(139,92,246,0.6)]"
              : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
          )}
        />
      ))}
    </nav>
  );
}