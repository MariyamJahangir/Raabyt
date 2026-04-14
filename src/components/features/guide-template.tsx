"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, User, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Divider } from "@/components/ui/divider";
import { TechArticleSchema, SpeakableSchema } from "@/components/seo/json-ld";

export interface GuideSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface GuideData {
  title: string;
  description: string;
  speakableIntro: string;
  url: string;
  category: string;
  datePublished: string;
  dateModified: string;
  readTime: number;
  wordCount: number;
  keywords: string[];
  authorName: string;
  authorRole: string;
  sections: GuideSection[];
  relatedLinks: { label: string; href: string }[];
}

function TableOfContents({ sections }: { sections: GuideSection[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
        In this guide
      </p>
      <ul className="space-y-1.5 border-l border-white/10">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={cn(
                "block pl-3 text-xs leading-relaxed transition-colors duration-150",
                activeId === s.id
                  ? "text-brand-purple border-l-2 border-brand-purple -ml-px"
                  : "text-muted hover:text-foreground"
              )}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Related links */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
          Related
        </p>
        <ul className="space-y-2">
          <li>
            <Link href="/products" className="text-xs text-brand-purple hover:text-brand-magenta transition-colors">
              Explore Raabyt Products →
            </Link>
          </li>
          <li>
            <Link href="/demo" className="text-xs text-brand-purple hover:text-brand-magenta transition-colors">
              Request a Demo →
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function GuideTemplate({ data }: { data: GuideData }) {
  return (
    <>
      <TechArticleSchema
        title={data.title}
        description={data.description}
        url={data.url}
        datePublished={data.datePublished}
        dateModified={data.dateModified}
        authorName={data.authorName}
        authorRole={data.authorRole}
        wordCount={data.wordCount}
        keywords={data.keywords}
      />
      <SpeakableSchema url={data.url} cssSelectors={["[data-speakable='guide-intro']"]} />

      {/* Hero */}
      <section className="pt-28 pb-8 md:pt-36 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Resources" },
              { label: "Guides", href: "/resources/guides" },
              { label: data.title },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4">{data.category}</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight max-w-3xl">
              {data.title}
            </h1>
            <p
              data-speakable="guide-intro"
              className="mt-4 text-base sm:text-lg text-muted leading-relaxed max-w-2xl"
            >
              {data.speakableIntro}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5" />
                {data.authorName}, {data.authorRole}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                Last updated: {formatDate(data.dateModified)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                {data.readTime} min read
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Content + TOC */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-10">
            <article className="lg:col-span-3 space-y-0">
              {data.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 mb-12"
                  aria-labelledby={`${section.id}-heading`}
                >
                  <h2
                    id={`${section.id}-heading`}
                    className="text-2xl font-semibold text-foreground mb-4"
                  >
                    {section.title}
                  </h2>
                  <div className="text-base text-muted leading-relaxed space-y-4">
                    {section.content}
                  </div>
                </section>
              ))}

              {/* CTA */}
              <div className={cn(
                "rounded-xl p-8 text-center mt-16",
                "bg-gradient-to-br from-brand-purple/10 to-brand-magenta/5",
                "border border-white/10"
              )}>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Ready to see it in action?
                </h2>
                <p className="text-sm text-muted mb-6">
                  Schedule a personalized demo with our solutions team.
                </p>
                <Link
                  href="/demo"
                  className={cn(
                    "inline-flex items-center gap-2 h-11 px-6 text-sm font-semibold rounded-lg",
                    "bg-gradient-to-r from-brand-purple to-brand-magenta text-white",
                    "hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-200"
                  )}
                >
                  Request Demo <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>

            <div className="hidden lg:block">
              <TableOfContents sections={data.sections} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
