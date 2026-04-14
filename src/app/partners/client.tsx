"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  DollarSign,
  Server,
  Package,
  Megaphone,
  Handshake,
  ArrowRight,
  Download,
  CheckCircle2,
  BadgeCheck,
  AlertTriangle,
  Award,
  Trophy,
  Crown,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Divider } from "@/components/ui/divider";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FAQSchema, SpeakableSchema } from "@/components/seo/json-ld";
import { PARTNER_TIERS } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

/* ─── Shared animations ─── */

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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

/* ─── Icon map for partner types ─── */
const PARTNER_TYPE_ICONS: LucideIcon[] = [
  DollarSign,
  Server,
  Package,
  Megaphone,
  Handshake,
];

const PARTNER_TYPES_DATA = [
  {
    title: "Reseller",
    description:
      "Grow your revenue and strengthen customer relationships by delivering powerful, end-to-end CRM solutions with Raabyt as your trusted vendor of choice.",
  },
  {
    title: "On-Prem Deployment",
    description:
      "Offer as a one-time solution with yearly support and service backed by Raabyt, combining flexible billing with powerful business management tools to strengthen your customers' day-to-day operations.",
  },
  {
    title: "Procurement Partner",
    description:
      "Simplify procurement and drive profitability by leveraging Raabyt's ecosystem to offer integrated ERP solutions to your customers. Ensuring incumbency protection.",
  },
  {
    title: "Marketing Partner",
    description:
      "Expand business reach by distributing Raabyt ERP solutions to customers, adding value through local expertise and long-term relationship building.",
  },
  {
    title: "Strategic Alliance Partner",
    description:
      "Collaborate with Raabyt to deliver integrated business solutions, streamline operations, and support customers through scalable and innovative ecosystems.",
  },
];

/* ─── FAQs for schema ─── */
const PARTNER_FAQS = [
  {
    question: "What types of partners does Raabyt support?",
    answer:
      "Raabyt supports five partner types: Reseller, On-Prem Deployment, Procurement Partner, Marketing Partner, and Strategic Alliance Partner. Each model is designed for different business approaches to delivering Raabyt's enterprise software suite.",
  },
  {
    question: "What are the Raabyt Partner Program tiers?",
    answer:
      "The Raabyt Partner Program has four tiers: Authorized (entry level), Silver, Gold, and Platinum. Each tier offers increasing discounts and benefits based on revenue performance.",
  },
  {
    question: "What discounts do Raabyt partners receive?",
    answer:
      "Partners receive up to 45% discounts on new purchases, support renewals, and customization at the Platinum tier. Discounts range from 10% (Authorized) to 45% (Platinum) based on your tier level.",
  },
  {
    question: "What is the revenue requirement for Platinum partners?",
    answer:
      "$100K annual revenue commitment (January through December). Partners who reach this threshold qualify for Platinum tier with maximum 45% discounts across all categories.",
  },
  {
    question: "How do I become a Raabyt partner?",
    answer:
      "Apply through the partner program page at raabyt.com/partners or contact Raabyt Sales directly. New partners are onboarded at the Silver tier to immediately access deal registration and renewal incumbency benefits.",
  },
];

/* ═══════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════ */

function PartnersHero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Partners" }]} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-brand-purple mb-4"
          >
            Partner Program
          </motion.p>
          <motion.h1
            variants={fadeUp}
            data-speakable="headline"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground"
          >
            Building the{" "}
            <span className="bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent">
              Future Together
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            data-speakable="intro"
            className="mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto"
          >
            Our partner program is structured to support diverse business models.
            Whether you&apos;re reselling, providing on-prem services, or building
            tailored integrations, Raabyt enables scalable growth through a
            flexible and partner-first ecosystem.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/contact?type=partner"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "h-12 px-8 text-base font-semibold rounded-lg",
                "bg-gradient-to-r from-brand-purple to-brand-magenta text-white",
                "shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              Become a Partner
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#program-overview"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "h-12 px-8 text-base font-medium rounded-lg",
                "bg-transparent border border-white/20 text-foreground",
                "transition-all duration-200 hover:bg-white/5 hover:border-brand-purple/50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              <Download className="h-4 w-4" />
              Download Program Guide
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 2 — INTRODUCTION
   ═══════════════════════════════════════ */

function IntroSection() {
  return (
    <section id="program-overview" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              align="left"
              eyebrow="Why Partner with Us"
              heading="Partners at the core"
            />
            <p className="mt-6 text-base text-muted leading-relaxed">
              Our partners are central to everything we do. Through the Raabyt
              Partner Program, we enable organizations to deliver reliable,
              scalable, and integrated ERP solutions that strengthen businesses
              to operate with confidence, clarity, and control.
            </p>
            <p className="mt-4 text-base text-muted leading-relaxed">
              Raabyt is designed to support modern enterprises through a flexible
              platform that delivers a complete ERP or individual modules,
              including CRM, Accounts, Finance, HRM, and core business
              operations. Raabyt helps organizations streamline processes,
              improve visibility, and drive operational efficiency across
              departments.
            </p>
          </motion.div>

          {/* Decorative visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/images/3d-young-businessman.png"
                alt="Raabyt partnership"
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-contain"
                priority={false}
              />
            </div>

            {/* Glow */}
            <div
              className="absolute -inset-4 -z-10 rounded-2xl opacity-20 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 3 — PARTNER TYPES
   ═══════════════════════════════════════ */

function PartnerTypesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Partnership Models"
          heading="Choose Your Path"
          description="Five distinct partnership models designed to match your business strategy and customer base."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PARTNER_TYPES_DATA.map((type, i) => {
            const Icon = PARTNER_TYPE_ICONS[i];
            return (
              <motion.div
                key={type.title}
                variants={fadeUp}
                className={cn(i === 4 && "sm:col-span-2 lg:col-span-1")}
              >
                <div
                  className={cn(
                    "group relative h-full rounded-xl p-6",
                    "bg-white/5 backdrop-blur-xl border border-white/10",
                    "transition-all duration-300",
                    "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
                    "hover:border-brand-purple/30"
                  )}
                >
                  {/* Number badge */}
                  <div className="absolute top-4 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-brand-purple/15 text-brand-purple text-xs font-bold">
                    {i + 1}
                  </div>

                  <div className="pt-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-purple/10 text-brand-purple mb-4 transition-colors group-hover:bg-brand-purple/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {type.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 4 — PARTNER TIERS (Staircase)
   ═══════════════════════════════════════ */

const TIER_CONFIG = [
  { name: "Authorized", icon: CheckCircle2, color: "from-slate-500/40 to-slate-600/20", barH: "h-24 sm:h-28" },
  { name: "Silver", icon: Shield, color: "from-slate-300/30 to-slate-400/15", barH: "h-36 sm:h-44" },
  { name: "Gold", icon: Award, color: "from-amber-500/30 to-amber-600/15", barH: "h-48 sm:h-56" },
  { name: "Platinum", icon: Crown, color: "from-brand-purple/40 to-brand-magenta/20", barH: "h-60 sm:h-72" },
];

function TiersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Grow with Us"
          heading="Partner Program Tiers"
          description="Achieve the level of engagement that best suits your business. As you advance your partner tier, you'll gain access to additional benefits and increase your margins."
        />

        {/* Staircase visualization */}
        <div ref={ref} className="mt-16 flex items-end justify-center gap-4 sm:gap-6 md:gap-8">
          {TIER_CONFIG.map((tier, i) => {
            const Icon = tier.icon;
            const tierData = PARTNER_TIERS.find((t) => t.name === tier.name);
            return (
              <motion.div
                key={tier.name}
                initial={{ height: 0, opacity: 0 }}
                animate={
                  inView
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: "easeOut" as const,
                }}
                className="flex flex-col items-center"
              >
                {/* Bar */}
                <div
                  className={cn(
                    "w-16 sm:w-20 md:w-28 rounded-t-xl",
                    "bg-gradient-to-t border border-white/10 border-b-0",
                    "flex flex-col items-center justify-end pb-4",
                    tier.color,
                    tier.barH,
                    tier.name === "Platinum" &&
                      "shadow-[0_0_30px_rgba(139,92,246,0.2)]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6 sm:h-7 sm:w-7 mb-2",
                      tier.name === "Platinum"
                        ? "text-brand-purple"
                        : tier.name === "Gold"
                          ? "text-amber-400"
                          : "text-muted"
                    )}
                  />
                </div>

                {/* Label */}
                <div className="mt-3 text-center">
                  <p
                    className={cn(
                      "text-xs sm:text-sm font-semibold",
                      tier.name === "Platinum"
                        ? "text-brand-purple"
                        : "text-foreground"
                    )}
                  >
                    {tier.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted mt-0.5 max-w-[100px]">
                    {tierData?.revenue === "$0"
                      ? "No commitment"
                      : `${tierData?.revenue}/yr`}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tier descriptions */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {PARTNER_TIERS.slice()
            .reverse()
            .map((tier) => (
              <motion.div key={tier.name} variants={fadeUp}>
                <div
                  className={cn(
                    "h-full rounded-xl p-5",
                    "bg-white/5 border border-white/10",
                    tier.name === "Platinum" &&
                      "border-brand-purple/20 bg-brand-purple/[0.03]"
                  )}
                >
                  <p
                    className={cn(
                      "text-sm font-semibold mb-2",
                      tier.name === "Platinum"
                        ? "text-brand-purple"
                        : "text-foreground"
                    )}
                  >
                    {tier.name}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    {tier.description}
                  </p>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 5 — DISCOUNTS TABLE
   ═══════════════════════════════════════ */

function DiscountsTable() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FY26 Revenue Requirements"
          heading="Partner Discounts & Revenue Commitments"
          description="Your partner tier and the benefits you receive are determined by your revenue performance. (Jan 2026 – Dec 2026)"
        />

        {/* Desktop table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 hidden md:block overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-purple text-white">
                <th className="text-left py-3 px-4 rounded-tl-lg font-semibold">
                  Tier
                </th>
                <th className="text-left py-3 px-4 font-semibold">
                  Annual Revenue
                </th>
                <th className="text-left py-3 px-4 font-semibold">
                  New Buy Discount
                </th>
                <th className="text-left py-3 px-4 font-semibold">
                  Non-Protected
                </th>
                <th className="text-left py-3 px-4 font-semibold">
                  Support Renewal
                </th>
                <th className="text-left py-3 px-4 font-semibold">
                  Non-Incumbent
                </th>
                <th className="text-left py-3 px-4 rounded-tr-lg font-semibold">
                  Customization
                </th>
              </tr>
            </thead>
            <tbody>
              {PARTNER_TIERS.map((tier, i) => (
                <tr
                  key={tier.name}
                  className={cn(
                    "border-b border-white/5",
                    i === 0 &&
                      "bg-brand-purple/[0.06] shadow-[0_0_20px_rgba(139,92,246,0.08)]",
                    i % 2 === 1 ? "bg-white/[0.03]" : "bg-white/5"
                  )}
                >
                  <td
                    className={cn(
                      "py-3 px-4 font-semibold",
                      tier.name === "Platinum"
                        ? "text-brand-purple"
                        : "text-foreground"
                    )}
                  >
                    {tier.name}
                  </td>
                  <td className="py-3 px-4 text-foreground">{tier.revenue}</td>
                  <td className="py-3 px-4 text-foreground">{tier.newBuy}</td>
                  <td className="py-3 px-4 text-muted">{tier.nonProtected}</td>
                  <td className="py-3 px-4 text-foreground">
                    {tier.supportRenewal}
                  </td>
                  <td className="py-3 px-4 text-muted">{tier.nonIncumbent}</td>
                  <td className="py-3 px-4 text-foreground">
                    {tier.customization}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted/50">
            All commitments are in USD
          </p>
        </motion.div>

        {/* Mobile stacked cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 md:hidden space-y-4"
        >
          {PARTNER_TIERS.map((tier) => (
            <motion.div key={tier.name} variants={fadeUp}>
              <div
                className={cn(
                  "rounded-xl p-5",
                  "bg-white/5 border border-white/10",
                  tier.name === "Platinum" &&
                    "border-brand-purple/25 bg-brand-purple/[0.04]"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={cn(
                      "text-base font-bold",
                      tier.name === "Platinum"
                        ? "text-brand-purple"
                        : "text-foreground"
                    )}
                  >
                    {tier.name}
                  </h3>
                  <span className="text-sm font-medium text-muted">
                    {tier.revenue}/yr
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "New Buy", value: tier.newBuy },
                    { label: "Non-Protected", value: tier.nonProtected },
                    { label: "Support Renewal", value: tier.supportRenewal },
                    { label: "Non-Incumbent", value: tier.nonIncumbent },
                    { label: "Customization", value: tier.customization },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-muted/60">{item.label}</p>
                      <p className="font-semibold text-foreground">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <p className="text-xs text-muted/50 text-center">
            All commitments are in USD
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 6 — COMPLIANCE
   ═══════════════════════════════════════ */

const COMPLIANCE_CARDS = [
  {
    icon: Handshake,
    title: "Partner Tiers",
    gradient: "from-brand-purple/30 to-brand-purple/10",
    text: "Your partner tier is determined by the Raabyt revenue generated during the previous 12-month period (January 1st – December 31st). Partners who qualify for a higher tier will be promoted on the 15th of the following month. Tier downgrades, if applicable, will occur only once per year after December 31.",
  },
  {
    icon: BadgeCheck,
    title: "Partner Accreditations",
    gradient: "from-brand-magenta/30 to-brand-pink/10",
    text: "Partners earn accreditation once they meet the required performance, engagement, and program criteria defined by Raabyt. Accreditations are reviewed annually during the compliance audit and will be renewed if all eligibility requirements continue to be met.",
  },
  {
    icon: AlertTriangle,
    title: "Partner Terminations",
    gradient: "from-brand-purple/25 to-brand-magenta/10",
    text: "Raabyt reserves the right to deactivate partnerships with Authorized Partners who have been inactive for one year or more. Partners may reactivate their partnership at any time by contacting Raabyt Sales.",
  },
];

function ComplianceSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Program Compliance"
          heading="How the Program Works"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {COMPLIANCE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} variants={fadeUp}>
                <div
                  className={cn(
                    "h-full rounded-xl p-6 relative overflow-hidden",
                    "bg-gradient-to-br",
                    card.gradient,
                    "border border-white/10"
                  )}
                >
                  <Icon className="h-8 w-8 text-white/80 mb-4" />
                  <h3 className="text-base font-semibold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {card.text}
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

/* ═══════════════════════════════════════
   SECTION 7 — CTA
   ═══════════════════════════════════════ */

function PartnerCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #8B5CF6 0%, #D946EF 50%, #8B5CF6 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.1) 50%, rgba(10,10,15,0.4) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-white/60 leading-relaxed max-w-2xl mx-auto mb-8 italic">
            &ldquo;The Raabyt Partner Program is built on clarity, accountability,
            and trust. We work closely with our partners to create measurable
            value, long-term trust, and consistent outcomes for every client we
            serve.&rdquo;
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Ready to Partner with Raabyt?
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
            Join 500+ organizations in the Raabyt ecosystem. Start with Silver
            tier and grow from there.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact?type=partner"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "h-12 px-8 text-base font-semibold rounded-lg",
                "bg-white text-[#7C3AED]",
                "transition-all duration-200 hover:bg-white/90",
                "shadow-xl shadow-black/20",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-purple"
              )}
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "h-12 px-8 text-base font-medium rounded-lg",
                "bg-white/10 text-white border border-white/25",
                "backdrop-blur-sm transition-all duration-200",
                "hover:bg-white/20 hover:border-white/40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-purple"
              )}
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════ */

export function PartnersPageClient() {
  return (
    <>
      <FAQSchema faqs={PARTNER_FAQS} />
      <SpeakableSchema
        url="/partners"
        cssSelectors={["[data-speakable='intro']", "[data-speakable='headline']"]}
      />

      <PartnersHero />
      <Divider />
      <IntroSection />
      <PartnerTypesSection />
      <Divider />
      <TiersSection />
      <DiscountsTable />
      <Divider />
      <ComplianceSection />
      <PartnerCTA />
    </>
  );
}
