"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Shield, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import type { LucideIcon } from "lucide-react";

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

interface Guide {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  readTime: number;
  category: string;
}

const GUIDES: Guide[] = [
  {
    icon: BookOpen,
    title: "The Complete Guide to Enterprise ERP in 2026",
    description:
      "Everything enterprises need to know about modern ERP: vendor evaluation, cloud vs on-premise, AI capabilities, and implementation best practices.",
    href: "/resources/guides/enterprise-erp-guide",
    readTime: 18,
    category: "Guide",
  },
  {
    icon: Shield,
    title: "The Complete Guide to Unified Firewall Management",
    description:
      "How to centralize security across multi-vendor firewall environments. Covers architecture, AI threat detection, compliance, and zero trust.",
    href: "/resources/guides/firewall-management-guide",
    readTime: 15,
    category: "Security Guide",
  },
  {
    icon: Scale,
    title: "On-Premise vs Cloud: The Enterprise Decision Guide",
    description:
      "A data-driven comparison of on-premise and cloud deployment. Covers cost, security, compliance, performance, and total cost of ownership.",
    href: "/resources/guides/on-premise-vs-cloud",
    readTime: 14,
    category: "Comparison",
  },
];

export function GuidesIndexClient() {
  return (
    <>
      <section className="pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }, { label: "Guides" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              align="left"
              eyebrow="Resources"
              heading="Enterprise Guides"
              description="In-depth, authoritative guides on enterprise software, security, and deployment strategy."
            />
          </motion.div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {GUIDES.map((guide) => {
              const Icon = guide.icon;
              return (
                <motion.div key={guide.href} variants={fadeUp}>
                  <Link
                    href={guide.href}
                    className={cn(
                      "group flex flex-col h-full rounded-xl p-6",
                      "bg-white/5 backdrop-blur-xl border border-white/10",
                      "transition-all duration-300",
                      "hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]",
                      "hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-purple/10 text-brand-purple">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge>{guide.category}</Badge>
                    </div>
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-brand-purple transition-colors mb-2">
                      {guide.title}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed flex-1">
                      {guide.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted">{guide.readTime} min read</span>
                      <span className="text-sm font-medium text-brand-purple flex items-center gap-1 group-hover:text-brand-magenta transition-colors">
                        Read guide <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
