"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SoftwareApplicationSchema, FAQSchema, SpeakableSchema } from "@/components/seo/json-ld";
import { useParallax } from "@/hooks/use-parallax";
import { BorderGlow } from "@/components/ui/border-glow";
import type { ProductPageData } from "@/lib/product-data";

/* Per-card glow palette — cycled through feature cards (matches WhyRaabyt) */
const FEATURE_GLOW_PALETTE: { colors: [string, string, string]; hsl: string }[] = [
  { colors: ["#8B5CF6", "#D946EF", "#7C3AED"], hsl: "263 84 68" },
  { colors: ["#3B82F6", "#8B5CF6", "#6366F1"], hsl: "217 91 60" },
  { colors: ["#10B981", "#34D399", "#6EE7B7"], hsl: "160 84 45" },
  { colors: ["#F59E0B", "#FBBF24", "#FCD34D"], hsl: "38 95 53" },
  { colors: ["#EC4899", "#F472B6", "#D946EF"], hsl: "330 81 60" },
  { colors: ["#06B6D4", "#22D3EE", "#67E8F9"], hsl: "188 94 43" },
];

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

interface ProductPageTemplateProps {
  data: ProductPageData;
}

/* ═══════════════════════════════════════════════════════════
   1. HERO — Full-screen immersive with number accent
   ═══════════════════════════════════════════════════════════ */
function ProductHero({ data }: { data: ProductPageData }) {
  const glowParallax = useParallax<HTMLDivElement>({ speed: 0.15 });
  const contentParallax = useParallax<HTMLDivElement>({ speed: -0.08, start: "top top", end: "bottom top" });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background ambient glow */}
      <div ref={glowParallax} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] opacity-20 blur-[120px]" style={{ background: "radial-gradient(ellipse at 50% 0%, var(--color-brand-purple) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 right-0 w-[50%] h-[40%] opacity-10 blur-[100px]" style={{ background: "radial-gradient(ellipse at 80% 100%, var(--color-brand-magenta) 0%, transparent 60%)" }} />
      </div>

      <div ref={contentParallax} className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28 w-full">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: data.name },
          ]}
        />

        <div className="mt-8 md:mt-12">
          {/* Eyebrow */}
          <motion.p
            className="text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-brand-purple mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {data.eyebrow}
          </motion.p>

          {/* Headline — large, bold */}
          <motion.h1
            data-speakable="headline"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground max-w-4xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {data.headline}
          </motion.h1>

          {/* Description */}
          <motion.p
            data-speakable="intro"
            className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            {data.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          >
            <Link
              href="/demo"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "h-13 px-9 text-base font-semibold rounded-full",
                "bg-gradient-to-r from-brand-purple to-brand-magenta text-white",
                "hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]",
                "transition-all duration-200",
              )}
            >
              Request Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#features"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "h-13 px-9 text-base font-medium rounded-full",
                "bg-white/5 border border-white/15 text-foreground",
                "transition-all duration-200 hover:bg-white/10 hover:border-white/25",
              )}
            >
              Explore Features
            </Link>
          </motion.div>
        </div>

        {/* Large ghosted product name */}
        <div className="absolute -bottom-8 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <motion.span
            className="text-[8rem] md:text-[14rem] lg:text-[18rem] font-bold text-brand-purple leading-none"
            style={{ opacity: 0.03 }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 0.03, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {data.name}
          </motion.span>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <span className="text-[10px] uppercase tracking-widest text-muted/40">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-brand-purple/50 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. FEATURES — Horizontal scroll-reveal cards
   ═══════════════════════════════════════════════════════════ */
function FeaturesSection({ data }: { data: ProductPageData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".feature-card");
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      const tween = gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-purple mb-3">
            Key Features
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Everything you need in {data.name}
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            Purpose-built features that make Raabyt {data.name} the enterprise choice.
          </p>
        </div>

        {/* Feature cards — 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.features.map((feature, i) => {
            const Icon = feature.icon;
            const glow = FEATURE_GLOW_PALETTE[i % FEATURE_GLOW_PALETTE.length];
            return (
              <div key={feature.title} className="feature-card">
                <BorderGlow
                  glowColor={glow.hsl}
                  backgroundColor="rgba(10,10,18,0.95)"
                  borderRadius={16}
                  glowRadius={50}
                  glowIntensity={3.0}
                  coneSpread={30}
                  colors={glow.colors}
                  fillOpacity={0.3}
                  className="h-full"
                >
                  <div className="group relative h-full p-6 md:p-7">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl mb-5 transition-colors duration-200"
                      style={{
                        backgroundColor: `${glow.colors[0]}1A`,
                        color: glow.colors[0],
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </BorderGlow>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. BENEFITS — Single image + stacked benefit list
   ═══════════════════════════════════════════════════════════ */
function BenefitsSection({ data }: { data: ProductPageData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Parallax on the image — shifts upward inside its overflow-hidden frame
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: 40, scale: 1.15 },
        {
          y: -40,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    const items = sectionRef.current.querySelectorAll(".benefit-item");
    const triggers: ScrollTrigger[] = [];

    items.forEach((item, i) => {
      const tween = gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-purple mb-3">
            Benefits
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Why choose Raabyt {data.name}
          </h2>
        </div>

        {/* Two-column: image left (sticky) + benefits right (stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ─── Left: Single product image with parallax ─── */}
          <div className="lg:sticky lg:top-32">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/8">
              <div ref={imageRef} className="absolute inset-[-15%]">
                <Image
                  src={`/images/products/${data.slug}.jpg`}
                  alt={`Raabyt ${data.name}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Number accent overlay */}
              <div className="absolute top-5 left-5 flex h-12 w-12 items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm border border-white/15 z-10">
                <span className="text-xl font-bold text-white">01</span>
              </div>

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>

          {/* ─── Right: Vertically stacked benefits ─── */}
          <div className="flex flex-col gap-10 md:gap-12">
            {data.benefits.map((benefit, i) => (
              <div key={benefit.title} className="benefit-item">
                <span className="text-xs font-medium uppercase tracking-widest text-brand-purple/60 mb-3 block">
                  Benefit {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-base text-muted leading-relaxed">
                  {benefit.description}
                </p>
                {i < data.benefits.length - 1 && (
                  <div className="mt-10 md:mt-12 border-b border-white/5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. COMPARISON TABLE — Clean dark table
   ═══════════════════════════════════════════════════════════ */
function ComparisonSection({ data }: { data: ProductPageData }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const rows = [
    { feature: "Data Sovereignty", raabyt: "Full — your servers, your data", cloud: "Vendor-controlled cloud storage" },
    { feature: "AI Capabilities", raabyt: "On-premise AI, no cloud APIs", cloud: "Cloud-dependent AI processing" },
    { feature: "Compliance", raabyt: "SOC 2, ISO 27001, GDPR-ready", cloud: "Shared responsibility model" },
    { feature: "Customization", raabyt: "Full source-level customization", cloud: "Limited to vendor configurations" },
    { feature: "Total Cost (5yr)", raabyt: "Lower — no recurring per-seat fees", cloud: "Higher — compounding subscriptions" },
    { feature: "Uptime Control", raabyt: "You control maintenance windows", cloud: "Vendor-scheduled downtime" },
  ];

  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-purple mb-3">
            Comparison
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Raabyt {data.name} vs Cloud {data.name}
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: EASE }}
          className="rounded-2xl border border-white/8 overflow-hidden bg-white/[0.02]"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 font-semibold text-foreground">Feature</th>
                <th className="text-left py-4 px-6 font-semibold text-brand-purple">Raabyt (On-Premise)</th>
                <th className="text-left py-4 px-6 font-semibold text-muted/60">Cloud {data.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={cn("border-b border-white/5", i % 2 === 0 && "bg-white/[0.015]")}>
                  <td className="py-4 px-6 font-medium text-foreground">{row.feature}</td>
                  <td className="py-4 px-6 text-foreground/80">{row.raabyt}</td>
                  <td className="py-4 px-6 text-muted/50">{row.cloud}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. HOW IT WORKS — Vertical timeline with scroll reveal
   ═══════════════════════════════════════════════════════════ */
function HowItWorksSection({ data }: { data: ProductPageData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const tween = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-20">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-purple mb-3">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            From evaluation to go-live
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            A proven implementation process that minimizes disruption and maximizes time to value.
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Animated line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-white/5">
            <div
              ref={lineRef}
              className="absolute inset-0 w-full origin-top"
              style={{ background: "linear-gradient(to bottom, var(--color-brand-purple), var(--color-brand-magenta))" }}
            />
          </div>

          <div className="space-y-16 md:space-y-20">
            {data.steps.map((step, i) => (
              <TimelineStep key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({ step, index }: { step: { title: string; description: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-16 md:pl-20"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* Node */}
      <div className="absolute left-0 top-0 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-surface border border-brand-purple/20 z-10">
        <span className="text-lg md:text-xl font-bold text-brand-purple">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="pt-1 md:pt-3">
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          {step.title}
        </h3>
        <p className="text-base text-muted leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. FAQ — Elegant accordion
   ═══════════════════════════════════════════════════════════ */
function FAQSection({ data }: { data: ProductPageData }) {
  if (!data.faqs || data.faqs.length === 0) return null;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs font-medium uppercase tracking-widest text-brand-purple mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Common questions about {data.name}
            </h2>
          </div>

          {/* Right — accordion */}
          <motion.div
            ref={ref}
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {data.faqs.map((faq) => (
              <details
                key={faq.question}
                className={cn(
                  "group rounded-xl",
                  "bg-white/[0.03] border border-white/8",
                  "transition-colors duration-200",
                  "open:border-brand-purple/20 open:bg-white/[0.05]"
                )}
              >
                <summary
                  className={cn(
                    "flex items-center justify-between cursor-pointer p-5 md:p-6",
                    "text-base font-semibold text-foreground",
                    "list-none [&::-webkit-details-marker]:hidden",
                    "select-none"
                  )}
                >
                  {faq.question}
                  <span className="ml-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45 text-xl">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 md:px-6 md:pb-6 -mt-1">
                  <p className="text-sm text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. BOTTOM CTA — Floating card with glow
   ═══════════════════════════════════════════════════════════ */
function ProductCTA({ data }: { data: ProductPageData }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative overflow-hidden rounded-2xl border border-white/10"
        >
          {/* Card glow */}
          <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full opacity-25 blur-[80px]" aria-hidden="true" style={{ background: "var(--color-brand-purple)" }} />
          <div className="absolute -bottom-20 -right-20 w-[250px] h-[250px] rounded-full opacity-15 blur-[80px]" aria-hidden="true" style={{ background: "var(--color-brand-magenta)" }} />

          {/* Background */}
          <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(135deg, rgba(15,15,25,0.95) 0%, rgba(20,10,35,0.95) 50%, rgba(15,15,25,0.95) 100%)" }} />

          {/* Content */}
          <div className="relative z-10 px-8 py-14 md:px-16 md:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Get started with Raabyt {data.name}
            </h2>
            <p className="mt-4 text-base text-white/50 max-w-xl mx-auto">
              See how Raabyt {data.name} can transform your operations. Book a personalized demo with our solutions team.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/demo"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "h-12 px-8 text-sm font-semibold rounded-full",
                  "bg-gradient-to-r from-brand-purple to-brand-magenta text-white",
                  "hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]",
                  "transition-all duration-200",
                )}
              >
                Request Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "h-12 px-8 text-sm font-medium rounded-full",
                  "bg-white/10 text-white border border-white/20",
                  "transition-all duration-200 hover:bg-white/15",
                )}
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TEMPLATE COMPOSITION
   ═══════════════════════════════════════════════════════════ */
export function ProductPageTemplate({ data }: ProductPageTemplateProps) {
  return (
    <>
      <SoftwareApplicationSchema
        name={data.name}
        description={data.description}
        url={`/products/${data.slug}`}
      />
      {data.faqs && data.faqs.length > 0 && <FAQSchema faqs={data.faqs} />}
      <SpeakableSchema
        url={`/products/${data.slug}`}
        cssSelectors={["[data-speakable='intro']", "[data-speakable='headline']"]}
      />

      <ProductHero data={data} />
      <FeaturesSection data={data} />
      <BenefitsSection data={data} />
      <ComparisonSection data={data} />
      <HowItWorksSection data={data} />
      <FAQSection data={data} />
      <ProductCTA data={data} />
    </>
  );
}
