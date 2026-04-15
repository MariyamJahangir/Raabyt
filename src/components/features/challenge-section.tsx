"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollFloat from "@/components/reactbits/ScrollFloat";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { BorderGlow } from "@/components/ui/border-glow";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useParallax } from "@/hooks/use-parallax";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function ChallengeSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageRef, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();

  const glowParallax = useParallax<HTMLDivElement>({ speed: 0.15 });
  const textParallax = useParallax<HTMLDivElement>({ speed: -0.08 });
  const imageParallax = useParallax<HTMLDivElement>({ speed: -0.15, scale: -0.52 });

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

      {/* ─── Two-column: Text + Businessman ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* ─── Left: Text Content ─── */}
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
              wordAnimationEnd="bottom center"
              rotationEnd="bottom center"
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

          {/* ─── Right: Businessman Image (parallax) ─── */}
          <div ref={imageParallax} className="relative flex justify-center lg:justify-end">
            <motion.div
              ref={imageRef}
              initial={reduced ? undefined : { opacity: 0, y: 50, scale: 0.95 }}
              animate={imageInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl"
            >
              {/* Glow behind the image */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.05) 50%, transparent 75%)",
                  filter: "blur(40px)",
                  transform: "scale(1.2)",
                }}
                aria-hidden="true"
              />
              <Image
                src="/images/3d-male-character.png"
                alt="Young businessman representing enterprise leadership"
                width={600}
                height={700}
                className="relative w-full h-auto drop-shadow-2xl"
                priority={false}
              />
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
