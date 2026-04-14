"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Eye,
  ClipboardCheck,
  FileCheck2,
  Server,
  Lock,
  ArrowRight,
  Check,
  Cloud,
  HardDrive,
  Router,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const UFMShieldScene = dynamic(() => import("@/components/3d/ufm-shield"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 animate-pulse"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, rgba(6,182,212,0.15) 0%, rgba(10,10,15,1) 70%)",
      }}
    />
  ),
});

/* ─── Shared animation helpers ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* ═════════════════════════════════════════════
   SECTION 1 — HERO
   ═════════════════════════════════════════════ */

function ThreatCounter() {
  const [count, setCount] = useState(0);
  const target = 2_847_391;

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 3000;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Increment slowly after initial animation
  useEffect(() => {
    if (count < target) return;
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3 + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
      </span>
      <span className="text-sm text-cyan-300 font-medium">
        Threats blocked today:{" "}
        <span className="font-mono font-bold tabular-nums">
          {count.toLocaleString()}
        </span>
      </span>
    </div>
  );
}

function UFMHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative h-screen min-h-[650px] max-h-[1200px] flex items-center overflow-hidden">
      {/* 3D Scene (desktop) */}
      <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
        {prefersReducedMotion ? (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(6,182,212,0.12) 0%, rgba(139,92,246,0.06) 40%, #0A0A0F 70%)",
            }}
          />
        ) : (
          <UFMShieldScene />
        )}
      </div>

      {/* Mobile fallback */}
      <div className="absolute inset-0 lg:hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(6,182,212,0.15) 0%, rgba(139,92,246,0.06) 40%, #0A0A0F 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.1) 0%, transparent 50%)",
            animation: "hero-pulse 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Text readability overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.5) 50%, rgba(10,10,15,0.15) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, #0A0A0F 0%, transparent 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={prefersReducedMotion ? undefined : stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={prefersReducedMotion ? undefined : fadeUp}>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "UFM" },
              ]}
              className="mb-6"
            />
          </motion.div>

          <motion.div variants={prefersReducedMotion ? undefined : fadeUp} className="mb-6">
            <Badge className="bg-cyan-500/15 text-cyan-400 border-cyan-500/25">
              New Product
            </Badge>
          </motion.div>

          <motion.h1
            variants={prefersReducedMotion ? undefined : fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight"
          >
            <span className="text-foreground">Unified </span>
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
              Firewall
            </span>
            <br />
            <span className="text-foreground">Management</span>
          </motion.h1>

          <motion.p
            variants={prefersReducedMotion ? undefined : fadeUp}
            className="mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-xl"
          >
            Centralize, monitor, and protect your entire network infrastructure
            from a single pane of glass.
          </motion.p>

          <motion.div
            variants={prefersReducedMotion ? undefined : fadeUp}
            className="mt-8 flex flex-col sm:flex-row items-start gap-3"
          >
            <Link
              href="/contact"
              className={cn(
                "relative inline-flex group items-center"
              )}
            >
              <div
                className="absolute -inset-1 rounded-lg opacity-50 blur-lg bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-[length:200%_100%] animate-[glow-shift_3s_ease-in-out_infinite] group-hover:opacity-80 transition-opacity duration-500"
                aria-hidden="true"
              />
              <span
                className={cn(
                  "relative inline-flex items-center justify-center gap-2",
                  "h-12 px-8 text-base font-semibold text-white rounded-lg",
                  "bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]",
                  "transition-transform duration-200 active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                Schedule Security Assessment
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/docs"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "h-12 px-8 text-base font-medium rounded-lg",
                "bg-transparent border border-white/20 text-foreground",
                "transition-all duration-200 hover:bg-white/5 hover:border-cyan-500/40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              View Documentation
            </Link>
          </motion.div>

          <motion.div variants={prefersReducedMotion ? undefined : fadeUp} className="mt-8">
            <ThreatCounter />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   SECTION 2 — BENTO FEATURES
   ═════════════════════════════════════════════ */

const FEATURES = [
  {
    icon: Shield,
    title: "Centralized Dashboard",
    description:
      "Single pane of glass for all firewall rules across your network. Real-time status, alerts, and configuration changes in one unified view.",
    span: "sm:col-span-2 lg:row-span-2",
    large: true,
  },
  {
    icon: Eye,
    title: "Real-time Threat Detection",
    description:
      "AI-powered anomaly detection that identifies zero-day threats, lateral movement, and policy violations before damage occurs.",
    span: "lg:col-span-2",
    large: true,
  },
  {
    icon: ClipboardCheck,
    title: "Policy Management",
    description:
      "Create, deploy, and audit firewall policies across vendors. Version control and rollback for every change.",
    span: "",
    large: false,
  },
  {
    icon: FileCheck2,
    title: "Compliance Reporting",
    description:
      "Automated SOC 2, ISO 27001, and PCI-DSS compliance reports generated on-demand or on schedule.",
    span: "",
    large: false,
  },
  {
    icon: Server,
    title: "Multi-vendor Support",
    description:
      "Works with Cisco, Palo Alto, Fortinet, Check Point, Juniper, and more — one interface for every firewall.",
    span: "",
    large: false,
  },
  {
    icon: Lock,
    title: "Zero Trust Architecture",
    description:
      "Microsegmentation and least-privilege access policies enforced across your entire infrastructure.",
    span: "",
    large: false,
  },
] as const;

function BentoFeatures() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Capabilities"
          heading="Enterprise-grade firewall management"
          description="Every tool your security team needs to monitor, manage, and protect your network infrastructure."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className={feature.span}
              >
                <div
                  className={cn(
                    "group relative h-full rounded-xl overflow-hidden",
                    "bg-white/5 backdrop-blur-xl border border-white/10",
                    "transition-all duration-300",
                    "hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
                    "hover:border-cyan-500/30",
                    feature.large ? "p-8" : "p-6"
                  )}
                >
                  {/* Hover gradient */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(6,182,212,0.06), rgba(139,92,246,0.04))",
                    }}
                    aria-hidden="true"
                  />

                  {/* Large card bg icon */}
                  {feature.large && (
                    <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.03] pointer-events-none" aria-hidden="true">
                      <Icon className="w-full h-full" strokeWidth={0.5} />
                    </div>
                  )}

                  <div
                    className={cn(
                      "flex items-center justify-center rounded-lg mb-4",
                      "bg-cyan-500/10 text-cyan-400",
                      "transition-colors duration-200 group-hover:bg-cyan-500/20",
                      feature.large ? "h-12 w-12" : "h-10 w-10"
                    )}
                  >
                    <Icon className={cn(feature.large ? "h-6 w-6" : "h-5 w-5")} />
                  </div>

                  <h3
                    className={cn(
                      "font-semibold text-foreground mb-2",
                      feature.large ? "text-xl" : "text-base"
                    )}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={cn(
                      "text-muted leading-relaxed",
                      feature.large ? "text-base" : "text-sm"
                    )}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   SECTION 3 — ARCHITECTURE DIAGRAM
   ═════════════════════════════════════════════ */

const NODES = [
  { icon: Cloud, label: "Cloud Firewalls", pos: "top-0 left-1/2 -translate-x-1/2" },
  { icon: HardDrive, label: "On-Premise Firewalls", pos: "bottom-0 left-1/2 -translate-x-1/2" },
  { icon: Router, label: "Edge Devices", pos: "top-1/2 left-0 -translate-y-1/2" },
  { icon: Cpu, label: "IoT Gateways", pos: "top-1/2 right-0 -translate-y-1/2" },
] as const;

function ArchitectureDiagram() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Architecture"
          heading="One hub. Total visibility."
          description="UFM sits at the center of your network, connecting to every firewall regardless of vendor or deployment model."
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="relative w-full max-w-xl aspect-square">
            {/* Connecting lines (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.4" />
                </linearGradient>
                <filter id="line-glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Lines from center to each node */}
              {[
                [200, 200, 200, 40],
                [200, 200, 200, 360],
                [200, 200, 40, 200],
                [200, 200, 360, 200],
              ].map(([x1, y1, x2, y2], i) => (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#line-grad)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  filter="url(#line-glow)"
                />
              ))}
              {/* Outer ring */}
              <circle
                cx="200"
                cy="200"
                r="160"
                fill="none"
                stroke="url(#line-grad)"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </svg>

            {/* Center Hub — UFM */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div
                className={cn(
                  "flex flex-col items-center justify-center",
                  "h-28 w-28 sm:h-32 sm:w-32 rounded-full",
                  "bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4]",
                  "shadow-[0_0_40px_rgba(6,182,212,0.3),0_0_80px_rgba(139,92,246,0.15)]"
                )}
              >
                <Shield className="h-8 w-8 text-white mb-1" />
                <span className="text-xs font-bold text-white tracking-wider">
                  UFM
                </span>
              </div>
            </div>

            {/* Nodes */}
            {NODES.map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.label}
                  className={cn("absolute z-10", node.pos)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        "flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl",
                        "bg-white/5 backdrop-blur-xl border border-white/10",
                        "shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                      )}
                    >
                      <Icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-muted text-center whitespace-nowrap">
                      {node.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   SECTION 4 — VENDOR LOGOS
   ═════════════════════════════════════════════ */

const VENDORS = [
  "Cisco",
  "Palo Alto Networks",
  "Fortinet",
  "Check Point",
  "Juniper",
  "SonicWall",
  "Sophos",
  "WatchGuard",
];

function VendorSupport() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-cyan-400 mb-8">
          Works with every major vendor
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {VENDORS.map((name) => (
            <div
              key={name}
              className={cn(
                "flex items-center gap-2 rounded-lg px-5 py-3",
                "bg-white/5 border border-white/10 text-sm font-medium text-muted",
                "transition-all duration-200 hover:bg-white/10 hover:text-foreground hover:border-cyan-500/30"
              )}
            >
              <Server className="h-4 w-4 text-cyan-400/60" />
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   SECTION 5 — PRICING TIERS
   ═════════════════════════════════════════════ */

const TIERS = [
  {
    name: "Starter",
    description: "For growing teams",
    limit: "Up to 10 firewalls",
    features: [
      "Centralized dashboard",
      "Basic threat detection",
      "Policy management",
      "Email support",
      "Monthly compliance reports",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    description: "For mid-size enterprises",
    limit: "Up to 100 firewalls",
    features: [
      "Everything in Starter",
      "AI-powered anomaly detection",
      "Multi-vendor support",
      "Zero trust policies",
      "Priority support (24/5)",
      "Weekly compliance reports",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For global organizations",
    limit: "Unlimited firewalls",
    features: [
      "Everything in Professional",
      "Custom threat models",
      "Dedicated security engineer",
      "24/7 SOC support",
      "On-demand compliance reports",
      "Custom integrations & API access",
    ],
    highlighted: false,
  },
] as const;

function PricingSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          heading="Plans that scale with your infrastructure"
          description="All plans include on-premise deployment, data sovereignty, and core UFM features."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {TIERS.map((tier) => (
            <motion.div key={tier.name} variants={fadeUp}>
              <div
                className={cn(
                  "relative h-full rounded-xl p-8 flex flex-col",
                  "bg-white/5 backdrop-blur-xl border",
                  "transition-all duration-300",
                  tier.highlighted
                    ? "border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-cyan-500/15 text-cyan-400 border-cyan-500/25">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <h3 className="text-xl font-bold text-foreground">
                  {tier.name}
                </h3>
                <p className="text-sm text-muted mt-1">{tier.description}</p>
                <p className="mt-4 text-sm font-medium text-cyan-400">
                  {tier.limit}
                </p>

                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 text-cyan-400 shrink-0" />
                      <span className="text-sm text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={cn(
                    "mt-8 inline-flex items-center justify-center gap-2",
                    "h-11 w-full text-sm font-semibold rounded-lg",
                    "transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    tier.highlighted
                      ? "bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] focus-visible:ring-cyan-400"
                      : "bg-white/5 border border-white/20 text-foreground hover:bg-white/10 focus-visible:ring-cyan-400"
                  )}
                >
                  Contact Sales
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   SECTION 6 — CTA
   ═════════════════════════════════════════════ */

function UFMCTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            "relative rounded-2xl p-10 md:p-16 text-center overflow-hidden",
            "border border-cyan-500/20"
          )}
        >
          {/* Gradient bg */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(6,182,212,0.08) 50%, rgba(139,92,246,0.06) 100%)",
            }}
            aria-hidden="true"
          />

          <Shield className="mx-auto h-12 w-12 text-cyan-400 mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Secure your network today
          </h2>
          <p className="mt-4 text-base text-muted max-w-xl mx-auto">
            Get a free security assessment and see how UFM can simplify your
            firewall management across your entire infrastructure.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "h-12 px-8 text-base font-semibold rounded-lg",
                "bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white",
                "shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              Schedule Security Assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "h-12 px-8 text-base font-medium rounded-lg",
                "bg-transparent border border-white/20 text-foreground",
                "transition-all duration-200 hover:bg-white/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              Watch Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   PAGE COMPOSITION
   ═════════════════════════════════════════════ */

export function UFMPageClient() {
  return (
    <>
      <UFMHero />
      <Divider />
      <BentoFeatures />
      <ArchitectureDiagram />
      <Divider />
      <VendorSupport />
      <PricingSection />
      <UFMCTA />
    </>
  );
}
