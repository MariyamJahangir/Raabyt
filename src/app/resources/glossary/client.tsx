"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { DefinedTermSchema } from "@/components/seo/json-ld";

interface GlossaryEntry {
  term: string;
  slug: string;
  definition: string;
  relatedLink?: string;
}

const GLOSSARY: GlossaryEntry[] = [
  {
    term: "ERP (Enterprise Resource Planning)",
    slug: "erp",
    definition:
      "Enterprise Resource Planning is a type of business software that integrates core operations — including finance, inventory, manufacturing, procurement, and human resources — into a unified platform. ERP systems provide a single source of truth for business data, enabling real-time visibility and automated workflows across departments.",
    relatedLink: "/products/erp",
  },
  {
    term: "CRM (Customer Relationship Management)",
    slug: "crm",
    definition:
      "Customer Relationship Management software helps organizations manage interactions with current and prospective customers. CRM systems centralize contact data, track sales pipelines, automate marketing campaigns, and provide analytics to improve customer retention and revenue growth.",
    relatedLink: "/products/crm",
  },
  {
    term: "HRM (Human Resource Management)",
    slug: "hrm",
    definition:
      "Human Resource Management software automates workforce administration including payroll processing, attendance tracking, recruitment, performance reviews, and compliance reporting. Modern HRM platforms include self-service portals for employees and AI-powered analytics for workforce planning.",
    relatedLink: "/products/hrm",
  },
  {
    term: "DMS (Document Management System)",
    slug: "dms",
    definition:
      "A Document Management System is software for storing, organizing, versioning, and retrieving digital documents. DMS platforms provide access controls, audit trails, workflow automation, and search capabilities — replacing file servers and paper-based processes with structured, secure document handling.",
    relatedLink: "/products/dms",
  },
  {
    term: "UFM (Unified Firewall Management)",
    slug: "ufm",
    definition:
      "Unified Firewall Management is a centralized platform for monitoring, configuring, and enforcing security policies across an organization's entire firewall infrastructure — regardless of vendor or deployment model. UFM provides a single pane of glass for multi-vendor firewall environments, AI-powered threat detection, and automated compliance reporting.",
    relatedLink: "/products/ufm",
  },
  {
    term: "On-Premise Software",
    slug: "on-premise",
    definition:
      "On-premise software (also 'on-prem') is deployed and runs on servers physically located within an organization's own data center or facilities, rather than in a vendor's cloud. On-premise deployment gives organizations full control over their data, security configurations, and infrastructure — critical for regulated industries and data-sensitive operations.",
  },
  {
    term: "SaaS (Software as a Service)",
    slug: "saas",
    definition:
      "Software as a Service is a software distribution model where applications are hosted in the vendor's cloud and accessed by customers over the internet, typically via a subscription. While SaaS reduces infrastructure management, it requires organizations to trust vendor security and accept data residency outside their direct control.",
  },
  {
    term: "Data Sovereignty",
    slug: "data-sovereignty",
    definition:
      "Data sovereignty is the principle that data is subject to the laws and governance frameworks of the country or jurisdiction where it is physically stored. For enterprises, data sovereignty often requires on-premise deployment to ensure sensitive business data remains within controlled jurisdictions and complies with regulations like GDPR and CCPA.",
  },
  {
    term: "Zero Trust Architecture",
    slug: "zero-trust",
    definition:
      "Zero Trust is a security framework that requires strict identity verification for every person and device attempting to access resources, regardless of whether they are inside or outside the network perimeter. Zero Trust operates on the principle of 'never trust, always verify' and enforces least-privilege access through microsegmentation.",
  },
  {
    term: "AI-Powered Enterprise Software",
    slug: "ai-enterprise",
    definition:
      "AI-powered enterprise software integrates artificial intelligence capabilities — such as machine learning, natural language processing, and predictive analytics — directly into business applications. These capabilities automate routine tasks, surface insights from large datasets, and enable features like demand forecasting, anomaly detection, and intelligent document processing.",
  },
  {
    term: "Microsegmentation",
    slug: "microsegmentation",
    definition:
      "Microsegmentation is a network security technique that divides a network into isolated segments, each with its own security policies. This limits lateral movement of threats and enforces granular access controls. Microsegmentation is a key component of Zero Trust architecture.",
  },
  {
    term: "Three-Way Matching",
    slug: "three-way-matching",
    definition:
      "Three-way matching is an accounts payable control that compares a purchase order, goods receipt, and vendor invoice to verify that quantities, prices, and terms align before authorizing payment. This process prevents overpayment, duplicate payments, and fraud in procurement workflows.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

export function GlossaryPageClient() {
  return (
    <>
      {/* Inject DefinedTerm schema for each entry */}
      {GLOSSARY.map((entry) => (
        <DefinedTermSchema
          key={entry.slug}
          name={entry.term}
          description={entry.definition}
          url={`/resources/glossary#${entry.slug}`}
        />
      ))}

      {/* Hero */}
      <section className="pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Resources" },
              { label: "Glossary" },
            ]}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              align="left"
              eyebrow="Resources"
              heading="Enterprise Software Glossary"
              description="Clear definitions of key terms in enterprise software, cybersecurity, and on-premise deployment."
            />
          </motion.div>
        </div>
      </section>

      {/* Glossary entries */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {GLOSSARY.map((entry) => (
              <motion.div
                key={entry.slug}
                variants={fadeUp}
                id={entry.slug}
                className="scroll-mt-24"
              >
                <details
                  open
                  className={cn(
                    "group rounded-xl",
                    "bg-white/5 border border-white/10",
                    "transition-colors duration-200",
                    "open:border-brand-purple/15"
                  )}
                >
                  <summary
                    className={cn(
                      "flex items-center justify-between cursor-pointer p-5",
                      "text-base font-semibold text-foreground",
                      "list-none [&::-webkit-details-marker]:hidden",
                      "select-none"
                    )}
                  >
                    {entry.term}
                    <span className="ml-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45 text-lg">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-muted leading-relaxed">
                      {entry.definition}
                    </p>
                    {entry.relatedLink && (
                      <a
                        href={entry.relatedLink}
                        className="mt-3 inline-flex text-xs font-medium text-brand-purple hover:text-brand-magenta transition-colors"
                      >
                        Learn more about Raabyt {entry.term.split("(")[0].trim()} →
                      </a>
                    )}
                  </div>
                </details>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
