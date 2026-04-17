"use client";

import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { useParallax } from "@/hooks/use-parallax";

export function ChallengeSection() {
  const glowParallax = useParallax<HTMLDivElement>({ speed: 0.15 });
  const textParallax = useParallax<HTMLDivElement>({ speed: -0.08 });

  return (
    <section className="relative py-14 px-10 md:py-18 overflow-hidden">
      {/* ─── Purple ambient glow background ─── */}
      <div ref={glowParallax} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[140%] h-[80%]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.18) 0%, rgba(124,58,237,0.10) 25%, rgba(88,28,135,0.05) 50%, transparent 75%)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ─── Text content ─── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div ref={textParallax}>
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-brand-purple mb-6">
            The Challenge
          </p>

          <ScrollReveal
            textClassName="text-4xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight"
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
            wordAnimationEnd="bottom bottom-=20%"
            rotationEnd="bottom bottom-=20%"
          >
            You&apos;ve Built Something Remarkable. Don&apos;t Let a Data Breach Define It.
          </ScrollReveal>

          <ScrollReveal
            containerClassName="mt-6 md:mt-8"
            textClassName="text-base sm:text-lg text-muted leading-relaxed"
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
            wordAnimationEnd="bottom center"
            rotationEnd="bottom center"
          >
            {"Every enterprise carries the same quiet fear: one breach, one compliance failure, one moment of lost control — and years of work become tomorrow's crisis. The cloud promised simplicity. What it quietly delivered was dependency — and exposure you never signed up for."}
          </ScrollReveal>
        </div>
      </div>

    </section>
  );
}
