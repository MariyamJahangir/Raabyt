"use client";

import { useCallback } from "react";
import { useParallax } from "@/hooks/use-parallax";
import ScrollReveal from "@/components/reactbits/ScrollReveal";

/* Words that should get the purple gradient highlight */
const HIGHLIGHT_WORDS = new Set([
  "enterprises",
  "managing",
  "sensitive",
  "data,",
  "regulated",
  "operations,",
  "and",
  "hard-won",
]);

const FULL_TEXT =
  "We're not anti-cloud. We believe the right tool depends on your risk profile. But for enterprises managing sensitive data, regulated operations, and hard-won customer trust — the question was never 'cloud or not?' It was always: 'who is responsible when something goes wrong — and what are the consequences — when it does?'";

const HIGHLIGHT_CLASS =
  "font-semibold bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent";

export function StanceSection() {
  // Parallax orbs
  const orb1 = useParallax<HTMLDivElement>({ speed: -0.2, horizontal: 0.05 });
  const orb2 = useParallax<HTMLDivElement>({ speed: 0.15, horizontal: -0.04 });
  const orb3 = useParallax<HTMLDivElement>({ speed: -0.12, horizontal: 0.03 });
  const textParallax = useParallax<HTMLDivElement>({ speed: -0.05 });

  const highlightWord = useCallback(
    (word: string, idx: number, allWords: string[]): string | undefined => {
      if (word === "and") {
        const prev = allWords[idx - 1];
        const next = allWords[idx + 1];
        return prev === "operations," && next === "hard-won"
          ? HIGHLIGHT_CLASS
          : undefined;
      }
      return HIGHLIGHT_WORDS.has(word) && word !== "and"
        ? HIGHLIGHT_CLASS
        : undefined;
    },
    []
  );

  return (
    <section className="relative py-18 md:py-20 overflow-hidden">
      {/* ─── Scattered circular gradient orbs (parallax) ─── */}

      {/* Orb 1 — large purple, top-right */}
      <div
        ref={orb1}
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          right: "-5%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Orb 2 — magenta, bottom-left */}
      <div
        ref={orb2}
        className="absolute pointer-events-none"
        style={{
          bottom: "-15%",
          left: "-8%",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(217,70,239,0.12) 0%, rgba(217,70,239,0.04) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Orb 3 — small violet, center-left */}
      <div
        ref={orb3}
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "10%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.03) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ─── Text content ─── */}
      <div ref={textParallax} className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10 relative">
        <ScrollReveal
          enableBlur={true}
          baseOpacity={0.1}
          baseRotation={2}
          blurStrength={4}
          containerClassName="my-0"
          textClassName="text-2xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug sm:leading-relaxed md:leading-[1.7] text-center text-white/85 font-normal"
          highlightWord={highlightWord}
          wordAnimationEnd="bottom center"
          rotationEnd="bottom center"
        >
          {FULL_TEXT}
        </ScrollReveal>
      </div>
    </section>
  );
}
