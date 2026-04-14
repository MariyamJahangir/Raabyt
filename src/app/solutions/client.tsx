"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Factory, HeartPulse, Landmark, ShoppingBag, Building, GraduationCap,
  ArrowRight, Wrench, ChevronDown, Quote, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/ui/border-glow";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useParallax } from "@/hooks/use-parallax";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = dynamic(() => import("@/components/reactbits/ScrollReveal"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */

interface Industry {
  icon: LucideIcon;
  name: string;
  description: string;
  detail: string;
  products: string[];
}

const INDUSTRIES: Industry[] = [
  { icon: Factory, name: "Manufacturing", description: "Optimize production planning, inventory control, and supply chain management with real-time visibility across your factory floor.", detail: "Raabyt ERP integrates with Sales and Purchase to create a closed-loop manufacturing system. AI-powered demand forecasting reduces raw material waste by up to 25%, while automated quality control catches defects before they reach customers.", products: ["ERP", "Sales", "Purchase"] },
  { icon: HeartPulse, name: "Healthcare", description: "Manage workforce scheduling, patient records, and regulatory compliance with HIPAA-ready infrastructure on your own servers.", detail: "HRM handles complex shift rotations and credentialing. DMS provides version-controlled clinical document workflows with full audit trails. All data stays within your infrastructure — critical for HIPAA, HITRUST, and local healthcare regulations.", products: ["HRM", "DMS", "Finance"] },
  { icon: Landmark, name: "Financial Services", description: "Enterprise-grade financial management with multi-entity consolidation, client relationship tracking, and network security hardened for regulators.", detail: "Finance handles multi-currency GL, automated reconciliation, and regulatory reporting. CRM tracks client portfolios and relationship histories. UFM provides the network security and compliance reporting required by SOC 2, PCI-DSS, and financial regulators.", products: ["Finance", "CRM", "UFM"] },
  { icon: ShoppingBag, name: "Retail & E-commerce", description: "Unify sales channels, manage inventory in real time, and build deeper customer relationships across every touchpoint.", detail: "Sales automates quote-to-cash across online and offline channels. CRM provides a 360° view of every customer with AI-powered purchase predictions. ERP manages multi-warehouse inventory with automated reorder points synced to demand forecasts.", products: ["Sales", "CRM", "ERP"] },
  { icon: Building, name: "Government", description: "Sovereign document management, zero-trust firewall security, and on-premise deployment to meet the strictest public sector requirements.", detail: "DMS provides classified document handling with granular access controls and retention policies. UFM delivers centralized firewall management across agency networks. Every byte of data stays on-premise — no cloud dependencies, no foreign data residency concerns.", products: ["DMS", "UFM", "HRM"] },
  { icon: GraduationCap, name: "Education", description: "Streamline faculty management, institutional finances, and document workflows from admissions to alumni relations.", detail: "HRM manages faculty contracts, payroll, and performance reviews. DMS handles student records, research documents, and accreditation paperwork. Finance automates tuition billing, grant tracking, and departmental budgeting.", products: ["HRM", "DMS", "Finance"] },
];

interface CaseStudy {
  company: string;
  industry: string;
  result: string;
  metric: string;
}

const CASE_STUDIES: CaseStudy[] = [
  { company: "Nexora Industries", industry: "Manufacturing", result: "Reduced inventory carrying costs by 30% and cut production planning time in half with Raabyt ERP.", metric: "30% cost reduction" },
  { company: "Meridian Finance", industry: "Financial Services", result: "Deployed UFM across 40+ branch firewalls and achieved PCI-DSS compliance in under 90 days.", metric: "90-day compliance" },
  { company: "Vantage Health", industry: "Healthcare", result: "Migrated 500K patient documents to Raabyt DMS with zero data exposure and full HIPAA audit trail.", metric: "Zero data incidents" },
];

/* ═══════════════════════════════════════
   1. HERO — Full-screen immersive
   ═══════════════════════════════════════ */
function SolutionsHero() {
  const glowParallax = useParallax<HTMLDivElement>({ speed: 0.15 });
  const contentParallax = useParallax<HTMLDivElement>({ speed: -0.08, start: "top top", end: "bottom top" });

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Ambient glows */}
      <div ref={glowParallax} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] opacity-15 blur-[120px]" style={{ background: "var(--color-brand-purple)" }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] opacity-10 blur-[100px]" style={{ background: "var(--color-brand-magenta)" }} />
      </div>

      <div ref={contentParallax} className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Solutions" }]} />

        <div className="mt-8 md:mt-12 max-w-3xl">
          <motion.p
            className="text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-brand-purple mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Industry Solutions
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            Solutions for Every Industry
          </motion.h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            Raabyt&apos;s enterprise suite adapts to your industry&apos;s unique requirements. On-premise deployment, AI-powered automation, and compliance-ready — out of the box.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          >
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "h-13 px-9 text-base font-semibold rounded-full",
                "bg-gradient-to-r from-brand-purple to-brand-magenta text-white",
                "hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]",
                "transition-all duration-200",
              )}
            >
              Discuss Your Needs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#industries"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "h-13 px-9 text-base font-medium rounded-full",
                "bg-white/5 border border-white/15 text-foreground",
                "transition-all duration-200 hover:bg-white/10",
              )}
            >
              Explore Industries
            </Link>
          </motion.div>
        </div>

        {/* Ghosted text */}
        <div className="absolute -bottom-4 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <motion.span
            className="text-[7rem] md:text-[12rem] font-bold text-brand-purple leading-none"
            style={{ opacity: 0.03 }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 0.03, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Solutions
          </motion.span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   2. INDUSTRIES — Interactive cards with GSAP reveal
   ═══════════════════════════════════════ */
function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = industry.icon;

  return (
    <div className="industry-card">
      <BorderGlow
        glowColor="263 84 68"
        backgroundColor="var(--color-surface)"
        borderRadius={20}
        glowRadius={35}
        glowIntensity={0.8}
        coneSpread={30}
        colors={["#8B5CF6", "#D946EF", "#7C3AED"]}
        fillOpacity={0.3}
        className="h-full"
      >
        <div className="p-6 sm:p-7 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{industry.name}</h3>
              <span className="text-[10px] uppercase tracking-widest text-muted/50">
                {String(index + 1).padStart(2, "0")} / {String(INDUSTRIES.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted leading-relaxed flex-1">
            {industry.description}
          </p>

          {/* Product tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {industry.products.map((product) => (
              <span
                key={product}
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium bg-brand-purple/8 text-brand-purple border border-brand-purple/15"
              >
                {product}
              </span>
            ))}
          </div>

          {/* Expandable detail */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="mt-4 pt-4 border-t border-white/5 text-sm text-muted/80 leading-relaxed">
                  {industry.detail}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={() => setExpanded((e) => !e)}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-purple transition-colors hover:text-brand-magenta"
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : "Learn more"}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", expanded && "rotate-180")} />
            </button>
            <Link href="/contact" className="text-xs text-muted/50 hover:text-foreground transition-colors">
              Discuss needs <ArrowRight className="inline h-3 w-3 ml-0.5" />
            </Link>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}

function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".industry-card");
    const triggers: ScrollTrigger[] = [];

    // Small delay to let Lenis + layout settle before creating triggers
    const timer = setTimeout(() => {
      cards.forEach((card, i) => {
        const tween = gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 95%", toggleActions: "play none none none" },
          }
        );
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="industries" className="py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-purple mb-3">Industries</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Built for your industry
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            Every industry has unique challenges. Raabyt adapts to yours with purpose-built configurations and compliance-ready deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((industry, i) => (
            <IndustryCard key={industry.name} industry={industry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   3. CUSTOM SOLUTIONS — Split layout with scroll reveal
   ═══════════════════════════════════════ */
function CustomSolutions() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Left — text */}
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple mb-6">
              <Wrench className="h-6 w-6" />
            </div>

            <ScrollReveal
              textClassName="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
              baseOpacity={0.1}
              enableBlur
              baseRotation={2}
              blurStrength={3}
            >
              Custom solutions for unique challenges
            </ScrollReveal>

            <p className="mt-5 text-base text-muted leading-relaxed">
              Every organization is different. Our solutions engineering team works with you to configure, extend, and integrate Raabyt modules to match your exact workflows — not the other way around.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Dedicated solutions architect assigned to your project",
                "Custom module development and API integrations",
                "Industry-specific compliance and reporting templates",
                "On-site deployment and migration support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-purple/15 mt-0.5 shrink-0">
                    <Check className="h-3 w-3 text-brand-purple" />
                  </div>
                  <span className="text-sm text-muted">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className={cn(
                "mt-8 inline-flex items-center justify-center gap-2",
                "h-12 px-8 text-base font-semibold rounded-full",
                "bg-gradient-to-r from-brand-purple to-brand-magenta text-white",
                "hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]",
                "transition-all duration-200",
              )}
            >
              Discuss Your Needs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right — vertical timeline */}
          <div>
            <ImplementationTimeline />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ImplementationTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || !containerRef.current) return;

    const tween = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const steps = [
    { step: "01", label: "Discovery", desc: "Map your processes and requirements" },
    { step: "02", label: "Design", desc: "Architect the optimal module configuration" },
    { step: "03", label: "Build", desc: "Custom workflows, integrations, and reports" },
    { step: "04", label: "Deploy", desc: "On-premise rollout with training and support" },
  ];

  return (
    <div ref={containerRef} className="relative pl-12">
      {/* Animated line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-white/5">
        <div
          ref={lineRef}
          className="absolute inset-0 w-full origin-top"
          style={{ background: "linear-gradient(to bottom, var(--color-brand-purple), var(--color-brand-magenta))" }}
        />
      </div>

      <div className="space-y-10">
        {steps.map((item, i) => {
          const stepRef = useRef<HTMLDivElement>(null);
          const stepInView = useInView(stepRef, { once: true, margin: "-40px" });

          return (
            <motion.div
              key={item.step}
              ref={stepRef}
              className="relative"
              initial={{ opacity: 0, x: -16 }}
              animate={stepInView ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            >
              {/* Node */}
              <div className="absolute -left-12 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-brand-purple/20 z-10">
                <span className="text-sm font-bold text-brand-purple">{item.step}</span>
              </div>

              <div className="rounded-xl bg-white/[0.03] border border-white/8 p-5 hover:border-brand-purple/20 transition-colors duration-300">
                <h4 className="text-base font-semibold text-foreground mb-1">{item.label}</h4>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   4. CASE STUDIES — Cards with glow
   ═══════════════════════════════════════ */
function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".case-card");
    const triggers: ScrollTrigger[] = [];

    const timer = setTimeout(() => {
      cards.forEach((card, i) => {
        const tween = gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 95%", toggleActions: "play none none none" },
          }
        );
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-purple mb-3">Case Studies</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Real results from real enterprises
          </h2>
          <p className="mt-4 text-base text-muted">
            See how organizations across industries are using Raabyt to transform their operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASE_STUDIES.map((study) => (
            <div key={study.company} className="case-card">
              <div className={cn(
                "h-full rounded-2xl p-7 flex flex-col",
                "bg-white/[0.03] border border-white/8",
                "transition-all duration-300",
                "hover:border-brand-purple/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]",
              )}>
                <Quote className="h-5 w-5 text-brand-purple/30 mb-5" />

                <p className="text-sm text-foreground/90 leading-relaxed flex-1">
                  &ldquo;{study.result}&rdquo;
                </p>

                <div className="mt-6 pt-5 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{study.company}</p>
                      <p className="text-xs text-muted mt-0.5">{study.industry}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {study.metric}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   5. CTA — Floating card with glow
   ═══════════════════════════════════════ */
function SolutionsCTA() {
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
          {/* Glow blobs */}
          <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full opacity-25 blur-[80px]" aria-hidden="true" style={{ background: "var(--color-brand-purple)" }} />
          <div className="absolute -bottom-20 -right-20 w-[250px] h-[250px] rounded-full opacity-15 blur-[80px]" aria-hidden="true" style={{ background: "var(--color-brand-magenta)" }} />

          {/* Background */}
          <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(135deg, rgba(15,15,25,0.95) 0%, rgba(20,10,35,0.95) 50%, rgba(15,15,25,0.95) 100%)" }} />

          {/* Content */}
          <div className="relative z-10 px-8 py-14 md:px-16 md:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Don&apos;t see your industry?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/50 max-w-xl mx-auto leading-relaxed">
              Raabyt is built to be flexible. Our solutions team has deployed across dozens of industries — let&apos;s discuss how we can tailor the platform for your specific needs.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "h-11 px-7 text-sm font-semibold rounded-full",
                  "bg-gradient-to-r from-brand-purple to-brand-magenta text-white",
                  "hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]",
                  "transition-all duration-200",
                )}
              >
                Discuss Your Needs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "h-11 px-7 text-sm font-medium rounded-full",
                  "bg-white/10 text-white border border-white/20",
                  "transition-all duration-200 hover:bg-white/15",
                )}
              >
                Explore Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════ */
export function SolutionsPageClient() {
  return (
    <>
      <SolutionsHero />
      <IndustriesSection />
      <CustomSolutions />
      <CaseStudiesSection />
      <SolutionsCTA />
    </>
  );
}
