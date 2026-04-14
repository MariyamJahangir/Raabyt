"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  getAllTags,
  type BlogPost,
  type BlogCategory,
} from "@/lib/blog-data";

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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ─── Blog Card ─── */

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group flex flex-col h-full rounded-xl overflow-hidden",
          "bg-white/5 backdrop-blur-xl border border-white/10",
          "transition-all duration-300",
          "hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]",
          "hover:border-white/20"
        )}
      >
        {/* Image placeholder */}
        <div className="aspect-[16/9] bg-gradient-to-br from-brand-purple/10 to-brand-magenta/5 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rounded-lg bg-white/10" />
          </div>
          <div className="absolute top-3 left-3">
            <Badge>{post.category}</Badge>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-brand-purple transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple/15">
                <User className="h-3 w-3 text-brand-purple" />
              </div>
              <span className="text-xs text-muted">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted/70">
              <span>{formatDate(post.date)}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime} min
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Sidebar ─── */

function BlogSidebar() {
  const tags = getAllTags();
  const popularPosts = BLOG_POSTS.slice(0, 3);

  return (
    <aside className="space-y-8">
      {/* Newsletter */}
      <div className={cn("rounded-xl p-6", "bg-white/5 border border-white/10")}>
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Subscribe to updates
        </h3>
        <p className="text-xs text-muted mb-4">
          Get new posts delivered to your inbox.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex gap-2"
        >
          <label htmlFor="blog-email" className="sr-only">Email</label>
          <input
            id="blog-email"
            type="email"
            placeholder="you@company.com"
            className={cn(
              "flex-1 h-9 rounded-lg px-3 text-xs",
              "bg-white/5 border border-white/10 text-foreground placeholder:text-muted/50",
              "focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            )}
          />
          <button
            type="submit"
            className="h-9 px-3 text-xs font-medium rounded-lg bg-brand-purple text-white hover:bg-brand-purple/90 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Popular Posts */}
      <div className={cn("rounded-xl p-6", "bg-white/5 border border-white/10")}>
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Popular posts
        </h3>
        <ul className="space-y-3">
          {popularPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block text-sm text-muted hover:text-foreground transition-colors leading-snug"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className={cn("rounded-xl p-6", "bg-white/5 border border-white/10")}>
        <h3 className="text-sm font-semibold text-foreground mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

/* ─── Page ─── */

export function BlogListingClient() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");

  const filtered =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Insights & Resources
            </h1>
            <p className="mt-3 text-base text-muted max-w-2xl">
              Perspectives on enterprise software, security, AI, and on-premise
              deployment from the Raabyt team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple",
                  activeCategory === cat
                    ? "bg-brand-purple/15 text-brand-purple border border-brand-purple/30"
                    : "bg-white/5 text-muted border border-white/10 hover:bg-white/10 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid + Sidebar */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Posts grid */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeCategory}
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </motion.div>

              {filtered.length === 0 && (
                <p className="text-center text-muted py-16">
                  No posts in this category yet.
                </p>
              )}
            </div>

            {/* Sidebar (desktop) */}
            <div className="hidden lg:block">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
