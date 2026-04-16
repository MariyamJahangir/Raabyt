"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lightbulb,
  Eye,
  HeartHandshake,
  MapPin,
  ArrowRight,
  Briefcase,
  Globe,
  Users,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Divider } from "@/components/ui/divider";
import { BorderGlow } from "@/components/ui/border-glow";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PersonSchema, SpeakableSchema } from "@/components/seo/json-ld";
import { useParallax } from "@/hooks/use-parallax";
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

/* ═══════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════ */

function AboutHero() {
  const glowParallax = useParallax<HTMLDivElement>({ speed: 0.15 });
  const contentParallax = useParallax<HTMLDivElement>({ speed: -0.08 });

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div
        ref={glowParallax}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.1) 0%, transparent 60%)",
        }}
      />

      <div ref={contentParallax} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-brand-purple mb-4"
          >
            About Raabyt
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground"
          >
            We Didn't Build Raabyt to Sell Software.{" "}
            <span className="bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent">
              Because the Right Answer Didn't Exist.
            </span>
          </motion.h1>
          {/* Direct answer paragraph — AEO optimized for AI extraction */}
          <motion.p
            variants={fadeUp}
            data-speakable="intro"
            className="mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-2xl"
          >
            Somewhere in the rush to the cloud, a fundamental question got lost: who actually owns the intelligence your business creates? We asked that question. We didn't like the answer. So we built one we could stand behind.
          </motion.p>
          {/* <motion.p
            variants={fadeUp}
            className="mt-3 text-base text-muted leading-relaxed max-w-2xl"
          >
            Every line of code we write reinforces a simple belief: enterprises
            shouldn&apos;t have to choose between powerful software and data sovereignty.
          </motion.p> */}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 2 — STORY & TIMELINE
   ═══════════════════════════════════════ */

const TIMELINE = [
  { year: "2024", title: "Founded", description: "Raabyt Technologies incorporated with a mission to bring AI-powered enterprise software on-premise." },
  { year: "2025", title: "First Product", description: "Launched Raabyt ERP — the first AI-native, fully on-premise enterprise resource planning platform." },
  { year: "2025", title: "Suite Expansion", description: "Released CRM, HRM, and DMS modules. "
    // Crossed 100 enterprise customers across 12 countries." 
    },
  // { year: "2026", title: "Security Focus", description: "Launched Sales, Purchase, and Finance modules. Achieved ISO 27001 and SOC 2 Type II certification." },
  { year: "2026", title: "UFM Launch", description: "Introduced Unified Firewall Management — expanding into cybersecurity. Surpassed 350 enterprise clients." },
  // { year: "2024", title: "Global Scale", description: "Opened offices in 4 new regions. 500+ enterprise clients across 50+ countries. Launched AI Copilot features." },
];

function StorySection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              heading="Why Raabyt Exists"
            />
            <div className="mt-6 space-y-4 text-base text-muted leading-relaxed">
              <p>
                The UAE's enterprise landscape was changing faster than its infrastructure. Organisations were adopting powerful SaaS tools — CRMs, ERPs, HR platforms — and quietly surrendering something they hadn't fully registered: their data.
              </p>
              <p>
                Customer records living in foreign data centres. Financial history governed by subscription terms they didn't write. Personnel files traversing servers they'd never inspected. Sensitive procurement strategies visible to infrastructure they didn't own.
              </p>
              <p>
                We kept meeting the same kind of enterprise leader: sophisticated, forward-thinking, deeply aware of what digital transformation required — but increasingly uncomfortable with what it seemed to cost. Not in licensing fees. In control.
              </p>
              <p>
                We asked why the most capable enterprise AI tools required organisations to hand over their most sensitive data. We couldn't find a satisfying answer. So we built Raabyt — a platform that finally separates "cutting-edge intelligence" from "surrendering what's yours."
              </p>
            </div>
          </motion.div>

          {/* Right — timeline */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="relative pl-8 border-l border-white/10">
              {TIMELINE.map((item) => (
                <motion.div
                  key={item.year}
                  variants={fadeUp}
                  className="relative pb-8 last:pb-0"
                >
                  {/* Dot */}
                  <div className="absolute -left-[calc(2rem+5px)] top-1 flex h-2.5 w-2.5 items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-brand-purple" />
                  </div>

                  <p className="text-xs font-bold text-brand-purple uppercase tracking-wider mb-1">
                    {item.year}
                  </p>
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 3 — VALUES
   ═══════════════════════════════════════ */

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  colors: [string, string, string];
  glowHSL: string;
}

const VALUES: Value[] = [
  {
    icon: ShieldCheck,
    title: "Security First",
    description:
      "Every architectural decision starts with security. We don't bolt it on later — it's the foundation everything else is built upon.",
    colors: ["#8B5CF6", "#D946EF", "#7C3AED"],
    glowHSL: "263 84 68",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We push the boundaries of what on-premise software can do. AI, real-time analytics, and modern UX — deployed on your servers.",
    colors: ["#F59E0B", "#FBBF24", "#FCD34D"],
    glowHSL: "38 95 53",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Open communication with customers, clear pricing, honest timelines. We build trust the same way we build software — with integrity.",
    colors: ["#06B6D4", "#22D3EE", "#67E8F9"],
    glowHSL: "188 94 43",
  },
  {
    icon: HeartHandshake,
    title: "Customer Success",
    description:
      "Your success is our metric. Dedicated support, proactive optimization, and a partnership mindset from day one.",
    colors: ["#EC4899", "#F472B6", "#D946EF"],
    glowHSL: "330 81 60",
  },
];

function ValuesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Values"
          heading="What drives us"
          description="Four principles that guide every product decision, every customer interaction, and every line of code."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div key={value.title} variants={fadeUp}>
                <BorderGlow
                  glowColor={value.glowHSL}
                  backgroundColor="rgba(10,10,18,0.95)"
                  borderRadius={12}
                  glowRadius={50}
                  glowIntensity={3.0}
                  coneSpread={30}
                  colors={value.colors}
                  fillOpacity={0.3}
                  className="h-full"
                >
                  <div className="h-full p-8">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-lg mb-5"
                      style={{
                        background: `hsl(${value.glowHSL} / 0.15)`,
                        color: `hsl(${value.glowHSL})`,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </BorderGlow>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 4 — TEAM
   ═══════════════════════════════════════ */

interface TeamMember {
  name: string;
  title: string;
  linkedin: string;
}

const TEAM: TeamMember[] = [
  { name: "Arjun Mehta", title: "Chief Executive Officer", linkedin: "#" },
  { name: "Sarah Chen", title: "Chief Technology Officer", linkedin: "#" },
  { name: "Marcus Adler", title: "Chief Product Officer", linkedin: "#" },
  { name: "Priya Sharma", title: "VP of Engineering", linkedin: "#" },
  { name: "James Okonkwo", title: "VP of Sales", linkedin: "#" },
  { name: "Elena Volkova", title: "VP of Customer Success", linkedin: "#" },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TeamSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Leadership"
          heading="The team behind Raabyt"
          description="Experienced operators, engineers, and security experts building the future of enterprise software."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {TEAM.map((member) => (
            <motion.div key={member.name} variants={fadeUp}>
              <div
                className={cn(
                  "group rounded-xl p-6 text-center",
                  "bg-white/5 backdrop-blur-xl border border-white/10",
                  "transition-all duration-300",
                  "hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]",
                  "hover:border-white/20"
                )}
              >
                {/* Photo placeholder */}
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple/20 to-brand-magenta/10 border border-white/10">
                  <Users className="h-8 w-8 text-brand-purple/50" />
                </div>

                <h3 className="text-base font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-muted mt-1">{member.title}</p>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className={cn(
                    "mt-4 inline-flex h-8 w-8 items-center justify-center rounded-lg",
                    "bg-white/5 text-muted border border-white/5",
                    "transition-all duration-200",
                    "hover:bg-brand-purple/15 hover:text-brand-purple hover:border-brand-purple/25"
                  )}
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 5 — GLOBAL PRESENCE
   ═══════════════════════════════════════ */

const REGIONS = [
  // { region: "North America", locations: ["San Francisco, CA", "New York, NY", "Toronto, Canada"], icon: MapPin },
  // { region: "Europe", locations: ["London, UK", "Berlin, Germany", "Amsterdam, Netherlands"], icon: MapPin },
  // { region: "Asia Pacific", locations: ["Singapore", "Bangalore, India", "Sydney, Australia"], icon: MapPin },
  { region: "Asia Pacific", locations: [" India",], icon: MapPin },
  // { region: "Middle East & Africa", locations: ["Dubai, UAE", "Nairobi, Kenya"], icon: MapPin },
    { region: "Middle East", locations: ["Dubai, United Arab Emirates"], icon: MapPin },
];

function GlobalPresence() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Global Presence"
          heading="Serving enterprises worldwide"
          description="With offices and partners across 4 continents, we're wherever your business operates."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14"
        >
          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-3 gap-6 mb-12"
          >
            {[
              { icon: Globe, value: "50+", label: "Countries" },
              { icon: Users, value: "500+", label: "Enterprise Clients" },
              { icon: Award, value: "4", label: "Continents" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="mx-auto h-5 w-5 text-brand-purple mb-2" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Regions grid */}
          <div className="flex flex-wrap justify-center gap-5">
            {REGIONS.map((region) => (
              <motion.div
                key={region.region}
                variants={fadeUp}
                className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]"
              >
                <div
                  className={cn(
                    "h-full rounded-xl p-6",
                    "bg-white/5 border border-white/10",
                    "transition-all duration-300 hover:border-brand-purple/25"
                  )}
                >
                  <MapPin className="h-5 w-5 text-brand-purple mb-3" />
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    {region.region}
                  </h3>
                  <ul className="space-y-1.5">
                    {region.locations.map((loc) => (
                      <li key={loc} className="text-xs text-muted">
                        {loc}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 6 — CAREERS CTA
   ═══════════════════════════════════════ */

function CareersCTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            "relative rounded-2xl p-10 md:p-16 overflow-hidden",
            "border border-white/10"
          )}
        >
          {/* Gradient bg */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(217,70,239,0.06) 50%, rgba(139,92,246,0.08) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Briefcase className="h-10 w-10 text-brand-purple mb-5" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Join our team
              </h2>
              <p className="mt-4 text-base text-muted leading-relaxed max-w-lg">
                We&apos;re hiring engineers, designers, security researchers, and
                sales leaders who want to build the future of enterprise
                software. Remote-first, with offices on 4 continents.
              </p>
              <Link
                href="/careers"
                className={cn(
                  "mt-8 inline-flex items-center justify-center gap-2",
                  "h-12 px-8 text-base font-semibold rounded-lg",
                  "bg-gradient-to-r from-brand-purple to-brand-magenta text-white",
                  "shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
                  "transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                View Open Positions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Open roles preview */}
            <div className="space-y-3">
              {[
                { role: "Senior Backend Engineer", location: "Remote" },
                { role: "Security Researcher", location: "San Francisco" },
                { role: "Product Designer", location: "London" },
                { role: "Enterprise Account Executive", location: "New York" },
              ].map((job) => (
                <div
                  key={job.role}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-4 py-3",
                    "bg-white/5 border border-white/5",
                    "transition-colors duration-200 hover:bg-white/10"
                  )}
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {job.role}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{job.location}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted" />
                </div>
              ))}
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

export function AboutPageClient() {
  return (
    <>
      <SpeakableSchema
        url="/about"
        cssSelectors={["[data-speakable='intro']"]}
      />
      {TEAM.map((member) => (
        <PersonSchema
          key={member.name}
          name={member.name}
          jobTitle={member.title}
        />
      ))}

      <AboutHero />
      <Divider />
      <StorySection />
      <ValuesSection />
      <Divider />
      {/* <TeamSection /> */}
      {/* <GlobalPresence /> */}
      {/* <CareersCTA /> */}
    </>
  );
}
