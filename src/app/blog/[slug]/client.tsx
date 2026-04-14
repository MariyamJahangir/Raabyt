"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  User,
  LinkIcon,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Divider } from "@/components/ui/divider";
import { ArticleSchema } from "@/components/seo/json-ld";
import {
  getPostBySlug,
  getRelatedPosts,
  BLOG_POSTS,
  type BlogPost,
} from "@/lib/blog-data";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/* ─── TOC extraction ─── */

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const text = match[2].replace(/\*\*/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      headings.push({ id, text, level: match[1].length });
    }
  }
  return headings;
}

/* ─── Markdown-to-JSX (simplified) ─── */

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let inList = false;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-4 space-y-2 pl-5 list-disc marker:text-brand-purple/50">
          {listItems.map((item, i) => (
            <li key={i} className="text-base text-muted leading-relaxed pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const renderInline = (text: string): React.ReactNode => {
    // Bold
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Italic
      const italicParts = part.split(/(\*[^*]+\*)/g);
      return italicParts.map((ip, j) => {
        if (ip.startsWith("*") && ip.endsWith("*")) {
          return <em key={`${i}-${j}`}>{ip.slice(1, -1)}</em>;
        }
        // Links
        const linkParts = ip.split(/(\[[^\]]+\]\([^)]+\))/g);
        return linkParts.map((lp, k) => {
          const linkMatch = lp.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (linkMatch) {
            return (
              <Link key={`${i}-${j}-${k}`} href={linkMatch[2]} className="text-brand-purple hover:text-brand-magenta underline underline-offset-2">
                {linkMatch[1]}
              </Link>
            );
          }
          return lp;
        });
      });
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // List item
    if (line.match(/^- /)) {
      inList = true;
      listItems.push(line.replace(/^- /, ""));
      continue;
    } else if (inList) {
      flushList();
    }

    // Heading
    const hMatch = line.match(/^(#{2,3})\s+(.+)/);
    if (hMatch) {
      const level = hMatch[1].length;
      const text = hMatch[2].replace(/\*\*/g, "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const Tag = level === 2 ? "h2" : "h3";
      elements.push(
        <Tag
          key={`h-${i}`}
          id={id}
          className={cn(
            "font-semibold text-foreground scroll-mt-24",
            level === 2 ? "text-2xl mt-10 mb-4" : "text-xl mt-8 mb-3"
          )}
        >
          {text}
        </Tag>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") continue;

    // Paragraph
    elements.push(
      <p key={`p-${i}`} className="text-base text-muted leading-relaxed my-4">
        {renderInline(line)}
      </p>
    );
  }

  flushList();
  return elements;
}

/* ─── Share buttons ─── */

function ShareButtons({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = encodeURIComponent(post.title);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted mr-1">Share:</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted hover:bg-brand-purple/15 hover:text-brand-purple transition-colors border border-white/5"
      >
        <LinkedInIcon className="h-3.5 w-3.5" />
      </a>
      <a
        href={`https://x.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted hover:bg-brand-purple/15 hover:text-brand-purple transition-colors border border-white/5"
      >
        <XIcon className="h-3.5 w-3.5" />
      </a>
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted hover:bg-brand-purple/15 hover:text-brand-purple transition-colors border border-white/5"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <LinkIcon className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

/* ─── TOC Sidebar ─── */

function TableOfContents({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-white/10">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block text-xs leading-relaxed transition-colors duration-150",
                h.level === 3 ? "pl-6" : "pl-3",
                activeId === h.id
                  ? "text-brand-purple border-l-2 border-brand-purple -ml-px"
                  : "text-muted hover:text-foreground"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ─── Page Component ─── */

export function BlogPostClient({ slug }: { slug: string }) {
  const post = getPostBySlug(slug)!;
  const related = getRelatedPosts(slug, 3);
  const headings = useMemo(() => extractHeadings(post.content), [post.content]);

  // Prev/Next navigation
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        datePublished={post.date}
        authorName={post.author.name}
        authorRole={post.author.role}
        authorBio={post.author.bio}
      />

      {/* Hero */}
      <section className="pt-28 pb-8 md:pt-36 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          {/* Featured image placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 aspect-[21/9] rounded-xl bg-gradient-to-br from-brand-purple/10 to-brand-magenta/5 border border-white/10 flex items-center justify-center"
          >
            <div className="h-12 w-12 rounded-lg bg-white/10" />
          </motion.div>
        </div>
      </section>

      {/* Article */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-10">
            {/* Main content */}
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:col-span-3"
            >
              {/* Meta */}
              <div className="mb-8">
                <Badge className="mb-4">{post.category}</Badge>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                  {post.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-purple/15">
                      <User className="h-3.5 w-3.5 text-brand-purple" />
                    </div>
                    {post.author.name}
                  </div>
                  <span>{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime} min read
                  </span>
                </div>
                <div className="mt-4">
                  <ShareButtons post={post} />
                </div>
              </div>

              <Divider className="mb-8" />

              {/* Body */}
              <div className="max-w-none">
                {renderMarkdown(post.content)}
              </div>

              <Divider className="my-10" />

              {/* Author bio */}
              <div
                className={cn(
                  "rounded-xl p-6 flex items-start gap-4",
                  "bg-white/5 border border-white/10"
                )}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-purple/15">
                  <User className="h-6 w-6 text-brand-purple" />
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{post.author.role}</p>
                  <p className="text-sm text-muted leading-relaxed mt-2">
                    {post.author.bio}
                  </p>
                </div>
              </div>

              {/* Prev / Next */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl p-4",
                      "bg-white/5 border border-white/10",
                      "transition-all duration-200 hover:bg-white/10"
                    )}
                  >
                    <ArrowLeft className="h-4 w-4 text-muted shrink-0 group-hover:text-brand-purple transition-colors" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted">Previous</p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {prevPost.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl p-4 text-right",
                      "bg-white/5 border border-white/10",
                      "transition-all duration-200 hover:bg-white/10",
                      "sm:flex-row-reverse"
                    )}
                  >
                    <ArrowRight className="h-4 w-4 text-muted shrink-0 group-hover:text-brand-purple transition-colors" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted">Next</p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {nextPost.title}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </motion.article>

            {/* TOC sidebar */}
            <div className="hidden lg:block">
              <TableOfContents headings={headings} />
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Related posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className={cn(
                      "group rounded-xl p-5",
                      "bg-white/5 border border-white/10",
                      "transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.12)] hover:border-white/20"
                    )}
                  >
                    <Badge className="mb-3">{rp.category}</Badge>
                    <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-brand-purple transition-colors line-clamp-2">
                      {rp.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted line-clamp-2">
                      {rp.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
