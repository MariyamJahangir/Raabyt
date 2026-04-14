"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BorderGlow } from "@/components/ui/border-glow";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useParallax } from "@/hooks/use-parallax";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const PAIN_POINTS = [
  {
    title: "Cloud vendors own your uptime",
    description:
      "When their infrastructure goes down, your business stops. You have no way to fix it, troubleshoot, or recover. The outage is theirs; the damage is yours.",
  },
  {
    title: "Your data may train their AI",
    description:
      "Every input, every pattern, every customer behaviour quietly feeds the models that power your competitors. You're paying for the privilege of giving away your intelligence.",
  },
  {
    title: "UAE compliance has no shortcuts",
    description:
      "FTA VAT regulations, data residency, and industry-specific mandates demand more precision than generic, international vendors typically build into their platforms.",
  },
];

export function PainPointsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();

  // Three-layer parallax: card (slow), text (medium), image (slowest = appears to lag behind)
  const cardParallax = useParallax<HTMLDivElement>({ speed: -0.05 });
  const textParallax = useParallax<HTMLDivElement>({ speed: -0.12 });
  const imageParallax = useParallax<HTMLDivElement>({ speed: -0.21, scale: 0.16 });
  const reflectionParallax = useParallax<HTMLDivElement>({ speed: 0.15 });

  return (
    <section className="relative py-16 md:py-24">
      <div
        ref={ref}
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div ref={cardParallax}>
            <BorderGlow
              glowColor="263 84 68"
              backgroundColor="#0a0a14"
              borderRadius={16}
              glowRadius={90}
              glowIntensity={5.0}
              coneSpread={25}
              colors={["#8B5CF6", "#D946EF", "#7C3AED"]}
              fillOpacity={0.4}
              animated
            >
              <div className="grid md:grid-cols-[1fr_1fr] items-stretch">
                {/* Left — pain points (scrolls faster = floats up) */}
                <div ref={textParallax} className="flex flex-col justify-center gap-7 p-8 md:p-10 lg:p-12">
                  {PAIN_POINTS.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={reduced ? undefined : { opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : undefined}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + i * 0.15,
                        ease: EASE,
                      }}
                      className="flex gap-4"
                    >
                      {/* Glowing purple dot */}
                      <div className="mt-1.5 flex-shrink-0">
                        <span className="relative flex h-3.5 w-3.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-brand-purple/40 blur-[4px]" />
                          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-brand-purple shadow-[0_0_10px_3px_rgba(139,92,246,0.45)]" />
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm md:text-base font-semibold text-white leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-xs md:text-sm leading-relaxed text-white/45">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right — Dubai skyline image (scrolls slowest = lags behind, with subtle zoom) */}
                <div className="relative hidden md:block min-h-[320px] lg:min-h-[380px] overflow-hidden rounded-r-2xl">
                  <div ref={imageParallax} className="absolute inset-[-15%] will-change-transform">
                    <Image
                      src="/images/dubai-skyline.jpg"
                      alt="Dubai skyline at night"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  {/* Left fade into the dark card */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14] via-[#0a0a14]/40 to-transparent w-1/3 pointer-events-none z-10" />
                  {/* Subtle purple tint overlay */}
                  <div className="absolute inset-0 bg-brand-purple/[0.06] pointer-events-none z-10" />
                </div>

                {/* Mobile — show image below text */}
                <div className="relative md:hidden h-48 w-full overflow-hidden rounded-b-2xl">
                  <Image
                    src="/images/dubai-skyline.jpg"
                    alt="Dubai skyline at night"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] to-transparent h-1/3 pointer-events-none" />
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Reflection effect (sinks away as you scroll) */}
          <div ref={reflectionParallax} className="relative mt-0 h-24 overflow-hidden opacity-30 pointer-events-none select-none" aria-hidden>
            <div className="absolute inset-x-0 top-0 h-full [transform:scaleY(-1)] rounded-2xl overflow-hidden">
              <div className="relative h-full w-full">
                <Image
                  src="/images/dubai-skyline.jpg"
                  alt=""
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-background,#050510)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
