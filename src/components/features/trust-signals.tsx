"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Award, Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useParallax } from "@/hooks/use-parallax";

const PRESS = ["TechCrunch", "Forbes", "Gartner", "IDC", "Forrester", "The Information"];

const CERTIFICATIONS = [
  { label: "ISO 27001", description: "Information Security", icon: ShieldCheck },
  { label: "SOC 2 Type II", description: "Service Organization", icon: Award },
  { label: "GDPR Compliant", description: "Data Protection", icon: CheckCircle2 },
];

const RATINGS = [
  { count: 5, score: "4.8/5", platform: "ERP" },
  { count: 5, score: "4.7/5", platform: "CRM" },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

function AnimatedStars({ count, inView, delay, instant }: { count: number; inView: boolean; delay: number; instant: boolean }) {
  const [filledCount, setFilledCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (instant) { setFilledCount(count); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) timers.push(setTimeout(() => setFilledCount(i + 1), delay + i * 120));
    return () => timers.forEach(clearTimeout);
  }, [inView, count, delay, instant]);

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4 transition-all duration-300", i < filledCount ? "fill-amber-400 text-amber-400" : "fill-transparent text-white/15")} />
      ))}
    </div>
  );
}

export function TrustSignals() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  // Parallax: bg glow drifts, certs rise slightly
  const glowParallax = useParallax<HTMLDivElement>({ speed: 0.1 });
  const certsParallax = useParallax<HTMLDivElement>({ speed: -0.05 });

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background glow */}
      <div ref={glowParallax} className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)" }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ─── Section heading ─── */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-brand-purple mb-3">
            Trusted & Certified
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Enterprise-grade trust & compliance
          </h2>
          <p className="text-sm md:text-base text-muted mt-3 max-w-lg mx-auto">
            Backed by industry certifications, top ratings, and recognition from leading analysts.
          </p>
        </motion.div>

        {/* ─── Certifications row ─── */}
        <div ref={certsParallax} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {CERTIFICATIONS.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.label}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="flex items-center gap-4 rounded-xl p-5 bg-white/[0.03] border border-white/10 hover:border-brand-purple/20 transition-colors duration-300"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-purple/10 text-brand-purple">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{cert.label}</p>
                  <p className="text-xs text-muted mt-0.5">{cert.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Ratings + Press in two columns ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Ratings */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-muted/50 mb-5">
              Customer ratings
            </p>
            <div className="flex flex-col gap-4">
              {RATINGS.map((rating, i) => (
                <div key={rating.platform} className="flex items-center gap-4 rounded-xl p-4 bg-white/[0.03] border border-white/10">
                  <AnimatedStars count={rating.count} inView={inView} delay={reduced ? 0 : 500 + i * 300} instant={reduced} />
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-foreground">{rating.score}</span>
                    <span className="text-sm text-muted">on {rating.platform}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Press mentions */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-muted/50 mb-5">
              As featured in
            </p>
            <div className="grid grid-cols-3 gap-3">
              {PRESS.map((name, i) => (
                <motion.div
                  key={name}
                  className="flex items-center justify-center rounded-lg py-4 px-3 bg-white/[0.03] border border-white/10"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ duration: 0.4, delay: reduced ? 0 : 0.5 + i * 0.06, ease: EASE }}
                >
                  <span className="text-sm font-semibold text-muted/40 tracking-wide">{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
