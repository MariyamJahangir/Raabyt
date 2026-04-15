"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { BounceCards } from "@/components/ui/bounce-cards";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useParallax } from "@/hooks/use-parallax";
import type { ProductItem } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.25, 0.1, 0.25, 1] as const;

/* Card positions — fan out from center, 8 cards */
const TRANSFORM_STYLES = [
  "rotate(-12deg) translate(-340px, 10px)",
  "rotate(-8deg) translate(-240px, -5px)",
  "rotate(-4deg) translate(-125px, 5px)",
  "rotate(-1deg) translate(-15px, -3px)",
  "rotate(2deg) translate(100px, 5px)",
  "rotate(5deg) translate(210px, -5px)",
  "rotate(9deg) translate(320px, 8px)",
  "rotate(13deg) translate(420px, -2px)",
];

/* ─── Glowing Product Card ─── */
function GlowCard({ product }: { product: ProductItem }) {
  const Icon = product.icon;
  const [r, g, b] = product.glowColor;
  const color = `rgb(${r}, ${g}, ${b})`;
  const colorFaded = `rgba(${r}, ${g}, ${b}, 0.15)`;
  const colorMid = `rgba(${r}, ${g}, ${b}, 0.25)`;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="flex flex-col h-full relative group"
    >
      {/* ─── Card background — dark glass ─── */}
      <div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{
          background: `linear-gradient(160deg, rgba(${r},${g},${b},0.08) 0%, rgba(15,15,25,0.95) 40%, rgba(10,10,18,0.98) 100%)`,
        }}
      />

      {/* ─── Top ambient glow (always visible) ─── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[70%] h-[45%] rounded-full blur-[50px] opacity-30 group-hover:opacity-50 transition-opacity duration-500 -z-10"
        style={{ background: color }}
        aria-hidden="true"
      />

      {/* ─── Content ─── */}
      <div className="flex flex-col items-center h-full px-5 pt-8 pb-5 text-center">
        {/* Glowing icon */}
        <div className="relative mb-6">
          {/* Bloom glow behind icon */}
          <div
            className="absolute inset-0 blur-[22px] opacity-60 group-hover:opacity-80 scale-[2.2] transition-opacity duration-500"
            style={{ background: color }}
            aria-hidden="true"
          />
          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${colorMid}, ${colorFaded})`,
              boxShadow: `0 0 30px ${colorFaded}, inset 0 1px 0 rgba(255,255,255,0.1)`,
            }}
          >
            <Icon className="h-7 w-7" style={{ color }} />
          </div>
        </div>

        {/* Name */}
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="text-lg font-bold text-white tracking-tight">
            {product.name}
          </h3>
          {product.isNew && <Badge>New</Badge>}
        </div>

        {/* Tagline */}
        <p className="text-[13px] font-medium mb-2" style={{ color }}>
          {product.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-white/40 leading-relaxed line-clamp-3 flex-1">
          {product.description}
        </p>

        {/* Bottom accent line */}
        <div
          className="mt-4 h-[2px] w-8 rounded-full opacity-40 group-hover:w-12 group-hover:opacity-70 transition-all duration-300"
          style={{ background: color }}
        />
      </div>
    </Link>
  );
}

export function ProductsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  // Parallax: heading floats up slightly, cards area moves differently
  const headingParallax = useParallax<HTMLDivElement>({ speed: -0.06 });
  const cardsParallax = useParallax<HTMLDivElement>({ speed: -0.03 });

  useEffect(() => {
    if (!sectionRef.current || !glowRef.current) return;

    const tween = gsap.fromTo(
      glowRef.current,
      { xPercent: 0 },
      {
        xPercent: -120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
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
    <section ref={sectionRef} className="relative py-18 md:py-28 overflow-hidden">
      {/* ─── Scroll-linked glowing orb ─── */}
      <div
        ref={glowRef}
        className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] md:w-[1100px] md:h-[1100px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(217,70,239,0.08) 35%, transparent 65%)",
        }}
      />

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ─── Heading ─── */}
        <div ref={headingParallax} className="text-center mb-10 md:mb-14">
          <motion.div
            className="inline-flex flex-col items-center mb-2"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-brand-purple">
              Our Products
            </p>
            {!reduced && (
              <motion.div
                className="h-[2px] mt-1.5 bg-brand-purple rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              />
            )}
          </motion.div>

          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground"
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            One Platform. Every Solution.
          </motion.h2>

          <motion.p
            className="mt-2 text-sm md:text-base text-muted"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From ERP to firewall management, Raabyt covers your entire enterprise technology stack.
          </motion.p>
        </div>

        {/* ─── Mobile: responsive grid (the fan layout below requires desktop width) ─── */}
        <div ref={cardsParallax} className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRODUCTS.map((product) => (
            <div
              key={product.slug}
              className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50 aspect-[3/4] w-full max-w-[280px] mx-auto"
              style={{
                background: "linear-gradient(160deg, rgba(25,25,40,0.95) 0%, rgba(10,10,18,0.98) 100%)",
              }}
            >
              <GlowCard product={product} />
            </div>
          ))}
        </div>

        {/* ─── Desktop: BounceCards fan layout ─── */}
        <div className="hidden md:flex justify-center">
          <BounceCards
            containerWidth="100%"
            containerHeight={420}
            cardWidth={220}
            animationDelay={0.3}
            animationStagger={0.06}
            easeType="elastic.out(1, 0.8)"
            transformStyles={TRANSFORM_STYLES}
            enableHover
          >
            {PRODUCTS.map((product) => (
              <GlowCard key={product.slug} product={product} />
            ))}
          </BounceCards>
        </div>
      </div>
    </section>
  );
}
