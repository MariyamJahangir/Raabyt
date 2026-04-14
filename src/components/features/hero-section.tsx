"use client";

import { useState, useEffect, useRef } from "react";
import VariableProximity from "@/components/reactbits/VariableProximity";
import StarBorder from "@/components/reactbits/StarBorder";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Server, Brain, ShieldCheck, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { SpeakableSchema } from "@/components/seo/json-ld";
import { useParallax } from "@/hooks/use-parallax";

/* Dynamic import — SSR disabled for WebGL */
const LightPillar = dynamic(() => import("@/components/backgrounds/light-pillar"), {
  ssr: false,
});

/* ─── Static fallback for mobile / reduced motion ─── */
function StaticBackground() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse at 55% 50%, rgba(139,92,246,0.25) 0%, rgba(217,70,239,0.1) 30%, transparent 60%)",
        }}
      />
    </div>
  );
}

/* ─── Trust badges ─── */
const TRUST_BADGES = [
  { icon: Server, label: "On-Premise" },
  { icon: Brain, label: "AI-Powered" },
  { icon: ShieldCheck, label: "ISO 27001" },
  { icon: Award, label: "SOC 2" },
] as const;

/* ─── Heading words ─── */
const HEADING_WORDS = [
  // { text: "Secure ", className: "text-foreground" },

  { text: "Your Data Built This Business ", className: "text-foreground" },
  { text: "\n", className: "" },
  {
    text: "It Should Never Leave Your Walls",
    className:
      "bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent",
  },


  // { text: "Enterprise Software", className: "text-foreground" },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

/* ─── Hero Section ─── */
export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const mobile = useIsMobile(768);
  const [mounted, setMounted] = useState(false);
  const headingRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const show = prefersReducedMotion || mounted;
  const showPillar = mounted && !prefersReducedMotion && !mobile;

  // Parallax: background moves slower, content moves slightly faster
  const bgParallax = useParallax<HTMLDivElement>({ speed: 0.15, start: "top top", end: "bottom top" });
  const contentParallax = useParallax<HTMLDivElement>({ speed: -0.1, start: "top top", end: "bottom top" });
  const badgesParallax = useParallax<HTMLDivElement>({ speed: -0.18, start: "top top", end: "bottom top" });

  return (
    <>
      <SpeakableSchema
        url="/"
        cssSelectors={["[data-speakable='hero-intro']"]}
      />
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        {/* ─── Background ─── */}
        <div className="absolute inset-0 bg-background" aria-hidden="true" />

        {showPillar ? (
          <div ref={bgParallax} className="absolute inset-0" aria-hidden="true">
            <LightPillar
              topColor="#8B5CF6"
              bottomColor="#D946EF"
              intensity={0.3}
              rotationSpeed={0.3}
              glowAmount={0.003}
              pillarWidth={2.5}
              pillarHeight={0.4}
              noiseIntensity={0.3}
              pillarRotation={80}
              quality="high"
              mixBlendMode="screen"
            />
          </div>
        ) : (
          <StaticBackground />
        )}

        {/* ─── Content — centered ─── */}
        <div ref={contentParallax} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center pt-28 pb-16">
          {/* Eyebrow pill */}
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
          >
            <h1 className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium bg-brand-purple/15 border border-brand-purple/25 text-brand-purple">
              Secure AI-Powered On-Premise Enterprise Software
            </h1>
          </motion.div>

          {/* Heading — variable proximity */}
          <motion.span
            ref={headingRef}
            className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          >
            {prefersReducedMotion ? (
              <>
                {HEADING_WORDS.map((w, i) =>
                  w.text === "\n" ? (
                    <br key={i} />
                  ) : (
                    <span key={i} className={w.className}>
                      {w.text}
                    </span>
                  )
                )}
              </>
            ) : (
              <>
                <VariableProximity
                  label="Your Data Built This Business"
                  className="text-foreground"
                  fromFontVariationSettings="'wght' 400, 'opsz' 14"
                  toFontVariationSettings="'wght' 1000, 'opsz' 144"
                  containerRef={headingRef}
                  radius={120}
                  falloff="gaussian"
                />
                <br />
                <VariableProximity
                  label="It Should Never Leave Your Walls"
                  className={cn(
                    "bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent"
                  )}
                  fromFontVariationSettings="'wght' 400, 'opsz' 14"
                  toFontVariationSettings="'wght' 1000, 'opsz' 144"
                  containerRef={headingRef}
                  radius={120}
                  falloff="gaussian"
                />
              </>
            )}
          </motion.span>

          {/* Subtitle */}
          <motion.p
            data-speakable="hero-intro"
            className="mt-5 sm:mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.9, ease: EASE }}
          >
            Raabyt is an enterprise software company that provides secure,
            AI-powered, on-premise solutions including ERP, CRM, HRM, DMS,
            and Unified Firewall Management. Full data sovereignty, AI
            automation, and zero compromise.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
          >
            <Link href="/demo" className="relative inline-flex group">
              <div
                className={cn(
                  "absolute -inset-1 rounded-full opacity-50 blur-lg transition-opacity duration-500",
                  "bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-purple",
                  "bg-[length:200%_100%] animate-[glow-shift_3s_ease-in-out_infinite]",
                  "group-hover:opacity-80"
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "relative inline-flex items-center justify-center gap-2",
                  "h-12 px-8 text-sm sm:text-base font-semibold text-white rounded-full",
                  "bg-gradient-to-r from-brand-purple to-brand-magenta",
                  "transition-transform duration-200 active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                Request A Free Demo
              </span>
            </Link>

            <StarBorder
              as={Link}
              href="/products"
              color="#D946EF"
              speed="5s"
              thickness={1}
              className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              innerClassName="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm sm:text-base font-medium"
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </StarBorder>

            <StarBorder
              as={Link}
              href="/about"
              color="#8B5CF6"
              speed="5s"
              thickness={1}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              innerClassName="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm sm:text-base font-medium"
            >
              Our Story
            </StarBorder>


          </motion.div>

          {/* Trust badges */}
          <motion.div
            ref={badgesParallax}
            className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3"
            initial={prefersReducedMotion ? undefined : { opacity: 0 }}
            animate={show ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 1.4, ease: EASE }}
          >
            {TRUST_BADGES.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="flex items-center gap-2 text-muted/50">
                  {i > 0 && (
                    <span className="hidden sm:block h-4 w-px bg-white/10 -ml-3 sm:-ml-5 mr-3 sm:mr-5" aria-hidden="true" />
                  )}
                  <Icon className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">{badge.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
