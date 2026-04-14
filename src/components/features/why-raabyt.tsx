"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck, Brain, Layers, Clock, Settings, Headset,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useParallax } from "@/hooks/use-parallax";
import { BorderGlow } from "@/components/ui/border-glow";
import type { LucideIcon } from "lucide-react";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  large?: boolean;
  /** Glow accent colors — [primary, secondary, tertiary] hex strings */
  colors: [string, string, string];
  /** HSL glow color string for BorderGlow (e.g. "263 84 68") */
  glowHSL: string;
}

const FEATURES: FeatureCard[] = [
  { icon: ShieldCheck, title: "On-Premise Security", description: "Deploy within your own infrastructure. Your data never leaves your servers — full sovereignty, zero compromise.", large: true, colors: ["#8B5CF6", "#D946EF", "#7C3AED"], glowHSL: "263 84 68" },
  { icon: Brain, title: "AI-Powered Automation", description: "Intelligent workflows, predictive analytics, and natural language interfaces built into every module.", large: true, colors: ["#3B82F6", "#8B5CF6", "#6366F1"], glowHSL: "217 91 60" },
  { icon: Layers, title: "Unified Platform", description: "One login, one dashboard, one platform for ERP, CRM, HRM, finance, and more.", colors: ["#10B981", "#34D399", "#6EE7B7"], glowHSL: "160 84 45" },
  { icon: Clock, title: "99.9% Uptime", description: "Enterprise-grade reliability with redundant architecture and real-time monitoring.", colors: ["#F59E0B", "#FBBF24", "#FCD34D"], glowHSL: "38 95 53" },
  { icon: Settings, title: "Customizable Workflows", description: "Tailor every process to your organization with a drag-and-drop workflow builder.", colors: ["#EC4899", "#F472B6", "#D946EF"], glowHSL: "330 81 60" },
  { icon: Headset, title: "24/7 Enterprise Support", description: "Dedicated support engineers available around the clock for your mission-critical systems.", colors: ["#06B6D4", "#22D3EE", "#67E8F9"], glowHSL: "188 94 43" },
];

export function WhyRaabyt() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  // Parallax: heading drifts up, grid stays slightly behind
  const headingParallax = useParallax<HTMLDivElement>({ speed: -0.06 });
  const gridParallax = useParallax<HTMLDivElement>({ speed: -0.03 });

  return (
    <section className="relative h-full overflow-hidden">
      <div ref={ref} className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* ─── Compact heading ─── */}
        <div ref={headingParallax} className="text-center mb-6 md:mb-8">
          <motion.p
            className="text-xs font-medium uppercase tracking-wider text-brand-purple mb-2"
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4 }}
          >
            Why Raabyt?
          </motion.p>

          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground"
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Built for enterprises that refuse to compromise
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-muted mt-2 max-w-2xl mx-auto"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Security-first architecture, AI-native automation, and a unified platform — everything your enterprise needs.
          </motion.p>
        </div>

        {/* ─── Bento grid — all 6 cards ─── */}
        <div ref={gridParallax} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            const isLarge = feature.large;
            const isFirst = i === 0;

            const initial = reduced
              ? { opacity: 0 }
              : isLarge
                ? { opacity: 0, x: isFirst ? -40 : 40 }
                : { opacity: 0, y: 30 };
            const visible = reduced
              ? { opacity: 1 }
              : { opacity: 1, x: 0, y: 0 };

            const delay = reduced
              ? 0
              : isLarge
                ? 0.3 + i * 0.1
                : 0.5 + (i - 2) * 0.08;

            return (
              <motion.div
                key={feature.title}
                className={cn(isLarge && "md:col-span-2")}
                initial={initial}
                animate={inView ? visible : initial}
                transition={{ duration: reduced ? 0.3 : 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <BorderGlow
                  glowColor={feature.glowHSL}
                  backgroundColor="rgba(10,10,18,0.95)"
                  borderRadius={12}
                  glowRadius={50}
                  glowIntensity={3.0}
                  coneSpread={30}
                  colors={feature.colors}
                  fillOpacity={0.3}
                  className="h-full"
                >
                  <div className="group relative h-full p-3 md:p-4">
                    {/* Large card bg icon */}
                    {isLarge && (
                      <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 opacity-[0.04] pointer-events-none" aria-hidden="true">
                        <Icon className="w-full h-full" strokeWidth={0.5} />
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg mb-2 transition-colors duration-200"
                      style={{
                        backgroundColor: `${feature.colors[0]}15`,
                        color: feature.colors[0],
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <h3 className={cn("font-semibold text-foreground mb-1", isLarge ? "text-sm md:text-base" : "text-sm")}>
                      {feature.title}
                    </h3>

                    <p className={cn("text-muted leading-snug", isLarge ? "text-xs md:text-sm line-clamp-3" : "text-xs line-clamp-2")}>
                      {feature.description}
                    </p>
                  </div>
                </BorderGlow>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
