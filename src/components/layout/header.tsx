"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, PRODUCTS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const openDropdown = useCallback(() => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-3 left-10 right-10 z-50 rounded-2xl transition-all duration-300",
          "bg-surface/20 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20",
          scrolled && "bg-surface/30"
        )}
      >
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex h-20 items-center justify-between">
            {/* ─── Logo ─── */}
            <Link
              href="/"
              className="relative z-10 flex items-center shrink-0"
              aria-label="Raabyt Technologies home"
            >
              <Logo variant="full" size="lg" className="hidden md:block" />
              <Logo variant="icon" size="lg" className="block md:hidden" />
            </Link>

            {/* ─── Desktop Nav ─── */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {NAV_ITEMS.map((item) =>
                item.hasDropdown ? (
                  <div
                    key={item.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <button
                      className={cn(
                        "group inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted",
                        "transition-colors duration-200 hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
                      )}
                      onClick={() => setDropdownOpen((o) => !o)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          dropdownOpen && "rotate-180"
                        )}
                      />
                      {/* Underline hover effect */}
                      <span className="absolute bottom-0 left-3 right-3 h-px scale-x-0 bg-brand-purple transition-transform duration-200 origin-left group-hover:scale-x-100" />
                    </button>

                    {/* ─── Mega Menu Dropdown ─── */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 8 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={cn(
                            "absolute left-1/2 top-full mt-2 w-[680px] -translate-x-1/2",
                            "rounded-xl border border-white/10 bg-surface/95 backdrop-blur-2xl",
                            "shadow-2xl shadow-black/40 p-6"
                          )}
                        >
                          <div className="flex gap-6">
                            {/* Left column — overview */}
                            <div className="w-48 shrink-0 border-r border-white/5 pr-6">
                              <p className="text-sm font-semibold text-foreground mb-1">
                                Products
                              </p>
                              <p className="text-sm text-muted leading-relaxed mb-4">
                                AI-powered enterprise software, deployed on your terms.
                              </p>
                              <Link
                                href="/products"
                                onClick={() => setDropdownOpen(false)}
                                className="inline-flex items-center gap-1 text-sm font-medium text-brand-purple hover:text-brand-magenta transition-colors"
                              >
                                View all
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </div>

                            {/* Right grid — product items */}
                            <div className="grid grid-cols-2 gap-1 flex-1">
                              {PRODUCTS.map((product) => {
                                const Icon = product.icon;
                                return (
                                  <Link
                                    key={product.slug}
                                    href={`/products/${product.slug}`}
                                    onClick={() => setDropdownOpen(false)}
                                    className={cn(
                                      "group flex items-start gap-3 rounded-lg p-3",
                                      "transition-colors duration-150 hover:bg-white/5"
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                                        "bg-brand-purple/10 text-brand-purple",
                                        "transition-colors duration-150 group-hover:bg-brand-purple/20",
                                        product.slug === "ufm" && "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20"
                                      )}
                                    >
                                      <Icon className="h-4.5 w-4.5" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                                        {product.name}
                                        {product.isNew && (
                                          <Badge className="text-[10px] px-1.5 py-0">
                                            New
                                          </Badge>
                                        )}
                                      </p>
                                      <p className="text-xs text-muted leading-snug mt-0.5">
                                        {product.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "relative group px-3 py-2 text-sm font-medium text-muted",
                      "transition-colors duration-200 hover:text-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
                    )}
                  >
                    {item.label}
                    {/* Underline hover effect */}
                    <span className="absolute bottom-0 left-3 right-3 h-px scale-x-0 bg-brand-purple transition-transform duration-200 origin-left group-hover:scale-x-100" />
                  </Link>
                )
              )}
            </div>

            {/* ─── Desktop CTA Buttons ─── */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center font-medium transition-all duration-200",
                  "h-8 px-3 text-sm rounded-md",
                  "bg-transparent text-foreground hover:bg-white/5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                Contact Sales
              </Link>
              <Link
                href="/demo"
                className={cn(
                  "inline-flex items-center justify-center font-medium transition-all duration-200",
                  "h-8 px-4 text-sm rounded-md",
                  "bg-gradient-to-r from-brand-purple to-brand-magenta text-white",
                  "shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                Get Demo
              </Link>
            </div>

            {/* ─── Mobile Hamburger ─── */}
            <button
              className={cn(
                "relative z-10 lg:hidden p-2 -mr-2 rounded-md text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
              )}
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={cn(
                "fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm lg:hidden",
                "bg-surface/95 backdrop-blur-2xl border-l border-white/5",
                "flex flex-col overflow-y-auto"
              )}
            >
              {/* Drawer header */}
              <div className="flex h-16 items-center justify-between px-6 border-b border-white/5">
                <Logo variant="icon" size="lg" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 rounded-md text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer nav */}
              <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item, i) =>
                  item.hasDropdown ? (
                    <div key={item.label}>
                      <button
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-3",
                          "text-base font-medium text-foreground",
                          "transition-colors hover:bg-white/5"
                        )}
                        onClick={() => setMobileProductsOpen((o) => !o)}
                        aria-expanded={mobileProductsOpen}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-muted transition-transform duration-200",
                            mobileProductsOpen && "rotate-180"
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileProductsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pl-3 pb-2 space-y-0.5">
                              {PRODUCTS.map((product) => {
                                const Icon = product.icon;
                                return (
                                  <Link
                                    key={product.slug}
                                    href={`/products/${product.slug}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                                  >
                                    <Icon className="h-4 w-4 text-brand-purple shrink-0" />
                                    <span className="text-sm text-muted">{product.name}</span>
                                    {product.isNew && (
                                      <Badge className="text-[10px] px-1.5 py-0 ml-auto">
                                        New
                                      </Badge>
                                    )}
                                  </Link>
                                );
                              })}
                              <Link
                                href="/products"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-purple"
                              >
                                View all products
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block rounded-lg px-3 py-3 text-base font-medium text-foreground",
                          "transition-colors hover:bg-white/5"
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>

              {/* Drawer CTA */}
              <div className="px-6 pb-6 space-y-3 border-t border-white/5 pt-4">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-center font-medium transition-all duration-200",
                    "h-12 px-7 text-lg rounded-lg w-full",
                    "bg-transparent border border-white/20 text-foreground hover:bg-white/5 hover:border-brand-purple",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  )}
                >
                  Contact Sales
                </Link>
                <Link
                  href="/demo"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-center font-medium transition-all duration-200",
                    "h-12 px-7 text-lg rounded-lg w-full",
                    "bg-gradient-to-r from-brand-purple to-brand-magenta text-white",
                    "shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  )}
                >
                  Get Demo
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
