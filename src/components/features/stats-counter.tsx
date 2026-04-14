"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Clock, Globe, Headset } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useParallax } from "@/hooks/use-parallax";
import GlassIcons from "@/components/reactbits/GlassIcons";

interface Stat {
  icon: React.ReactNode;
  glassColor: string;
  end: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  {
    icon: <Building2 className="h-5 w-5" />,
    glassColor: "purple",
    end: 500,
    suffix: "+",
    label: "Enterprise Clients",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    glassColor: "green",
    end: 99.9,
    suffix: "%",
    label: "Uptime",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    glassColor: "blue",
    end: 50,
    suffix: "+",
    label: "Countries",
  },
  {
    icon: <Headset className="h-5 w-5" />,
    glassColor: "indigo",
    end: 24,
    suffix: "/7",
    label: "Support",
  },
];

/* ─── Animated number with glow-on-complete ─── */
function AnimatedNumber({
  end,
  suffix,
  enabled,
  instant,
}: {
  end: number;
  suffix: string;
  enabled: boolean;
  instant: boolean;
}) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const isDecimal = end % 1 !== 0;

  useEffect(() => {
    if (!enabled) return;
    if (instant) {
      setValue(end);
      setDone(true);
      return;
    }

    let startTime: number | null = null;
    let raf: number;
    const duration = 1500;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = progress < 1 ? 1 - Math.pow(1 - progress, 4) : 1;
      setValue(eased * end);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setDone(true);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, enabled, instant]);

  const display = isDecimal ? value.toFixed(1) : Math.floor(value);

  return (
    <span className={done && !instant ? "stat-glow-active" : ""}>
      {display}
      {suffix}
    </span>
  );
}

/* ─── Floating particles (reduced from 18 to 8) ─── */
function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${(i * 12 + 5) % 100}%`,
      bottom: `${(i * 17) % 40}%`,
      size: 2 + (i % 2),
      opacity: 0.08 + (i % 4) * 0.01,
      duration: 6 + (i % 5) * 1.5,
      delay: (i % 7) * 0.8,
      driftX: ((i % 3) - 1) * 15,
    }));
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            ["--drift-x" as string]: `${p.driftX}px`,
            animation: `stat-particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Stats Counter Section ─── */
export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(ref, { once: true, amount: 0.3 });
  const [droppedIn, setDroppedIn] = useState(false);
  const reduced = useReducedMotion();

  // Parallax: glow bg shifts, stats grid rises
  const glowParallax = useParallax<HTMLDivElement>({ speed: 0.12 });
  const statsParallax = useParallax<HTMLDivElement>({ speed: -0.06 });

  useEffect(() => {
    if (!sectionInView) return;
    if (reduced) {
      setDroppedIn(true);
      return;
    }
    const timer = setTimeout(() => setDroppedIn(true), 500);
    return () => clearTimeout(timer);
  }, [sectionInView, reduced]);

  return (
    <section className="relative h-full overflow-hidden">
      {/* Center glow */}
      <div
        ref={glowParallax}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Floating particles */}
      {!reduced && <FloatingParticles />}

      <div
        ref={ref}
        className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl"
      >
        {/* Eyebrow */}
        <motion.p
          className="text-xs font-medium uppercase tracking-wider text-brand-purple mb-8 md:mb-10"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4 }}
        >
          By the Numbers
        </motion.p>

        <div
          ref={statsParallax}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center flex flex-col items-center"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -30 }}
              animate={
                sectionInView
                  ? reduced
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0 }
                  : undefined
              }
              transition={
                reduced
                  ? { duration: 0.3 }
                  : {
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: i * 0.15,
                    }
              }
            >
              {/* GlassIcon */}
              <div className="mb-4">
                <GlassIcons
                  items={[
                    {
                      icon: stat.icon,
                      color: stat.glassColor,
                      label: stat.label,
                    },
                  ]}
                  className="glass-icon-single"
                />
              </div>

              <p className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                <AnimatedNumber
                  end={stat.end}
                  suffix={stat.suffix}
                  enabled={droppedIn}
                  instant={reduced}
                />
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
