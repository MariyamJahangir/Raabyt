"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useParallax } from "@/hooks/use-parallax";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  // Parallax: glow blobs shift at different rates for depth
  const topGlowParallax = useParallax<HTMLDivElement>({ speed: 0.15 });
  const bottomGlowParallax = useParallax<HTMLDivElement>({ speed: 0.08 });

  return (
    <section className="relative py-20 md:py-28">
      {/* ─── Background: dark with subtle purple ambient ─── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top glow */}
        <div
          ref={topGlowParallax}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(ellipse at 50% 0%, var(--color-brand-purple) 0%, transparent 70%)" }}
        />
        {/* Bottom glow */}
        <div
          ref={bottomGlowParallax}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] opacity-15 blur-[100px]"
          style={{ background: "radial-gradient(ellipse at 50% 100%, var(--color-brand-magenta) 0%, transparent 70%)" }}
        />
      </div>

      {/* ─── CTA Card ─── */}
      <div ref={ref} className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/10"
          initial={reduced ? undefined : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Card background gradient */}
          <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(135deg, rgba(15,15,25,0.95) 0%, rgba(20,10,35,0.95) 50%, rgba(15,15,25,0.95) 100%)" }} />

          {/* Purple/magenta glow blobs inside the card */}
          <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full opacity-30 blur-[80px]" aria-hidden="true" style={{ background: "var(--color-brand-purple)" }} />
          <div className="absolute -bottom-20 -right-20 w-[250px] h-[250px] rounded-full opacity-20 blur-[80px]" aria-hidden="true" style={{ background: "var(--color-brand-magenta)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full opacity-10 blur-[60px]" aria-hidden="true" style={{ background: "var(--color-brand-purple)" }} />

          {/* Content */}
          <div className="relative z-10 px-8 py-14 md:px-16 md:py-20 text-center">
            {/* Heading */}
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              Ready to Own Your Enterprise&apos;s Future?
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="mt-4 text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              The consultation is free. The insight is immediate. And the decision to take back control of your enterprise data starts with one conversation — no pressure, no commitment.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            >
              <Link
                href="/demo"
                className={cn(
                  "inline-flex items-center justify-center",
                  "h-11 px-7 text-sm font-semibold rounded-full",
                  "bg-gradient-to-r from-brand-purple to-brand-magenta text-white",
                  "transition-all duration-200 hover:scale-[1.03]",
                  "hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                Request a Free Demo
              </Link>

              <Link
                href="/products"
                className={cn(
                  "inline-flex items-center justify-center",
                  "h-11 px-7 text-sm font-medium rounded-full",
                  "bg-white/10 text-white border border-white/20",
                  "transition-all duration-200 hover:bg-white/15 hover:scale-[1.03]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                Explore All 7 Products
              </Link>

              <Link
                href="/about"
                className={cn(
                  "inline-flex items-center justify-center",
                  "h-11 px-7 text-sm font-medium rounded-full",
                  "bg-white/10 text-white border border-white/20",
                  "transition-all duration-200 hover:bg-white/15 hover:scale-[1.03]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
