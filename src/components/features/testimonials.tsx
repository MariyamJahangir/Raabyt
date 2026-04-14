"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useParallax } from "@/hooks/use-parallax";
import { BorderGlow } from "@/components/ui/border-glow";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

const TESTIMONIALS: Testimonial[] = [
  { quote: "Raabyt's on-premise ERP gave us full control of our data while delivering the AI features we needed. Migration was seamless.", name: "Sarah Chen", title: "CTO", company: "Nexora Industries" },
  { quote: "We evaluated a dozen platforms. Raabyt was the only one that met our security requirements without compromising on usability.", name: "Marcus Adler", title: "VP of Engineering", company: "Stratos Group" },
  { quote: "The unified dashboard alone saved our team 15 hours a week. Having ERP, CRM, and HRM in one platform changed everything.", name: "Priya Sharma", title: "COO", company: "Vantage Solutions" },
  { quote: "UFM caught three intrusion attempts in the first month. The AI-driven threat detection is genuinely best-in-class.", name: "James Okonkwo", title: "CISO", company: "Meridian Finance" },
  { quote: "Raabyt's support team resolved a critical deployment issue at 2 AM on a Sunday. That's the kind of partner we need.", name: "Elena Volkova", title: "IT Director", company: "QuantumBridge" },
  { quote: "We've rolled out Raabyt across 12 offices in 8 countries. The multi-tenancy and localization support is outstanding.", name: "David Kim", title: "Global IT Lead", company: "Apex Manufacturing" },
];

/* Per-card glow palette — cycled through testimonials */
const GLOW_PALETTE: { colors: [string, string, string]; hsl: string }[] = [
  { colors: ["#8B5CF6", "#D946EF", "#7C3AED"], hsl: "263 84 68" }, // purple
  { colors: ["#3B82F6", "#8B5CF6", "#6366F1"], hsl: "217 91 60" }, // blue
  { colors: ["#10B981", "#34D399", "#6EE7B7"], hsl: "160 84 45" }, // green
  { colors: ["#F59E0B", "#FBBF24", "#FCD34D"], hsl: "38 95 53" },  // amber
  { colors: ["#EC4899", "#F472B6", "#D946EF"], hsl: "330 81 60" }, // pink
  { colors: ["#06B6D4", "#22D3EE", "#67E8F9"], hsl: "188 94 43" }, // cyan
];

/* ─── Testimonial card ─── */
function TestimonialCard({
  testimonial,
  isActive,
  glowIndex,
}: {
  testimonial: Testimonial;
  isActive: boolean;
  glowIndex: number;
}) {
  const glow = GLOW_PALETTE[glowIndex % GLOW_PALETTE.length];

  return (
    <div
      className={cn(
        "shrink-0 w-[320px] sm:w-[360px] transition-opacity duration-300",
        isActive ? "opacity-100" : "opacity-70"
      )}
    >
      <BorderGlow
        glowColor={glow.hsl}
        backgroundColor="rgba(10,10,18,0.95)"
        borderRadius={12}
        glowRadius={50}
        glowIntensity={3.0}
        coneSpread={30}
        colors={glow.colors}
        fillOpacity={0.3}
        className="h-full"
      >
        <div className="flex flex-col max-h-[200px] p-4 sm:p-5">
          <Quote
            className={cn(
              "h-4 w-4 transition-opacity duration-300",
              isActive ? "opacity-60" : "opacity-30"
            )}
            style={{ color: `hsl(${glow.hsl})` }}
          />
          <p className="text-sm text-foreground/90 leading-snug flex-1 mt-2 line-clamp-4">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="mt-3 pt-3 border-t border-white/5">
            <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
            <p className="text-xs text-muted mt-0.5">
              {testimonial.title}, {testimonial.company}
            </p>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}

/* ─── Testimonials Section ─── */
export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();
  const frameCount = useRef(0);

  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Parallax: heading drifts up
  const headingParallax = useParallax<HTMLDivElement>({ speed: -0.06 });

  const updateActiveCard = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.children;
    const viewportCenter = window.innerWidth / 2;
    let closestIndex = 0;
    let closestDist = Infinity;
    for (let i = 0; i < cards.length; i++) {
      const rect = cards[i].getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - viewportCenter);
      if (dist < closestDist) { closestDist = dist; closestIndex = i; }
    }
    setActiveIndex(closestIndex);
  }, []);

  const animate = useCallback(() => {
    const track = trackRef.current;
    if (!track) { animRef.current = requestAnimationFrame(animate); return; }
    if (!paused) {
      posRef.current -= 0.5;
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(posRef.current) >= halfWidth) posRef.current = 0;
    }
    track.style.transform = `translateX(${posRef.current}px)`;

    // Throttle expensive getBoundingClientRect calls
    frameCount.current++;
    if (frameCount.current % 10 === 0) {
      updateActiveCard();
    }

    animRef.current = requestAnimationFrame(animate);
  }, [paused, updateActiveCard]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section ref={sectionRef} className="relative h-full overflow-hidden">
      <div className="h-full flex flex-col justify-center">
        {/* ─── Compact heading ─── */}
        <div ref={headingParallax} className="text-center px-4 sm:px-6 lg:px-8 mb-6 md:mb-8">
          <motion.p
            className="text-xs font-medium uppercase tracking-wider text-brand-purple mb-2"
            initial={reduced ? undefined : { opacity: 0, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, filter: "blur(0px)" } : undefined}
            transition={{ duration: 0.5 }}
          >
            Testimonials
          </motion.p>

          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground"
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Trusted by enterprise leaders
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-muted mt-2"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            See why hundreds of organizations choose Raabyt for their mission-critical operations.
          </motion.p>
        </div>

        {/* ─── Carousel ─── */}
        <motion.div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          initial={reduced ? undefined : { opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
            <div className="overflow-hidden">
              <div ref={trackRef} className="flex gap-4 will-change-transform" style={{ width: "max-content" }}>
                {items.map((t, i) => (
                  <TestimonialCard
                    key={`${t.name}-${i}`}
                    testimonial={t}
                    isActive={i === activeIndex}
                    glowIndex={i % TESTIMONIALS.length}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
