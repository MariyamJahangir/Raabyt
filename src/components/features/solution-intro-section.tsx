"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParallax } from "@/hooks/use-parallax";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    title: "100% Data Sovereignty",
    description: "Every byte on your servers",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 0-4 4c0 2 2 3 2 6H14c0-3 2-4 2-6a4 4 0 0 0-4-4Z" />
        <path d="M10 12h4" />
        <path d="M10 16h4" />
        <path d="M12 16v4" />
      </svg>
    ),
    title: "AI Without Exposure",
    description: "LLMs deployed locally, fully private",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H2v7l6.29 6.29a1 1 0 0 0 1.42 0l5.58-5.58a1 1 0 0 0 0-1.42Z" />
        <circle cx="6" cy="9" r="1" />
        <path d="M15 5h2a2 2 0 0 1 2 2v1" />
        <path d="M22 12l-4.5 4.5" />
      </svg>
    ),
    title: "UAE Compliance Ready",
    description: "FTA, VAT, WPS built-in by design",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Fully Customisable",
    description: "Modular architecture, your business logic",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "UAE-Founded",
    description: "Built here, operated here, supported here",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
    title: "Cloud Coming Soon",
    description: "Hybrid-ready architecture from day one",
  },
];

export function SolutionIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const glowParallax = useParallax<HTMLDivElement>({
    speed: -0.1,
    horizontal: 0.04,
  });

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    // Left-side reveal animation
    const items = section.querySelectorAll<HTMLElement>(".reveal-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 40, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=10%",
          end: "center center",
          scrub: true,
        },
      }
    );

    // Cards scroll-up parallax — cards translate upward while section scrolls
    gsap.fromTo(
      cards,
      { y: 120 },
      {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Individual card stagger entrance
    const cardEls = cards.querySelectorAll<HTMLElement>(".feature-card");
    gsap.fromTo(
      cardEls,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=15%",
          end: "center center",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-18 overflow-hidden">
      {/* Background glow */}
      <div
        ref={glowParallax}
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "30%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* ─── Left: Sticky text content ─── */}
          <div className="lg:sticky lg:top-22">
            <p className="reveal-item text-brand-purple text-sm font-semibold tracking-wide uppercase mb-5">
              The Solution
            </p>

            <h2 className="reveal-item text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-white">
              Meet Raabyt.
            </h2>

            <h2 className="reveal-item mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent">
              Enterprise Software Built for Ownership.
            </h2>

            <p className="reveal-item mt-8 text-base sm:text-lg md:text-xl text-white/60 leading-relaxed max-w-xl">
              A complete suite of AI-powered enterprise applications — deployed on your own
              infrastructure, controlled by your own team, governed entirely by your own rules.
              Not a feature. A principle we don&apos;t compromise on.
            </p>
          </div>

          {/* ─── Right: Scrolling feature cards ─── */}
          <div ref={cardsRef} className="flex flex-col gap-4">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="feature-card group relative rounded-xl px-5 py-4 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(217,70,239,0.04) 100%)",
                    border: "1px solid rgba(139,92,246,0.2)",
                  }}
                />

                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg text-brand-purple"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 100%)",
                      border: "1px solid rgba(139,92,246,0.2)",
                    }}
                  >
                    {feature.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-white font-semibold text-base">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 text-sm mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
