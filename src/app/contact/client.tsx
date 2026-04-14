"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Animations ─── */

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

/* ─── Social icons ─── */

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

/* ─── Types ─── */

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/* ─── Component ─── */

export function ContactPageClient() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Contact form submitted:", form);
    setSubmitting(false);
    setSubmitted(true);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const inputClass = (hasError?: string) =>
    cn(
      "w-full h-11 rounded-lg px-4 text-sm",
      "bg-white/5 border text-foreground placeholder:text-muted/50",
      "transition-colors duration-200",
      "focus:outline-none focus:ring-1",
      hasError
        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
        : "border-white/10 focus:border-brand-purple focus:ring-brand-purple"
    );

  return (
    <>
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid lg:grid-cols-5 gap-12 lg:gap-16"
          >
            {/* ─── Left — Form ─── */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">
                Get in touch
              </h1>
              <p className="text-base text-muted mb-8">
                Have a question or want to learn more? We&apos;d love to hear from you.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "rounded-xl p-10 text-center",
                    "bg-white/5 backdrop-blur-xl border border-white/10"
                  )}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, delay: 0.1 }}
                  >
                    <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400 mb-4" />
                  </motion.div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Message sent!
                  </h2>
                  <p className="text-sm text-muted">
                    We&apos;ll get back to you within 1 business day.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className={cn(
                    "rounded-xl p-6 sm:p-8",
                    "bg-white/5 backdrop-blur-xl border border-white/10"
                  )}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="c-name" className="block text-sm font-medium text-foreground mb-1.5">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className={inputClass(errors.name)}
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "c-name-err" : undefined}
                      />
                      {errors.name && (
                        <p id="c-name-err" className="mt-1 text-xs text-red-400">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="c-email" className="block text-sm font-medium text-foreground mb-1.5">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={inputClass(errors.email)}
                        placeholder="you@company.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "c-email-err" : undefined}
                      />
                      {errors.email && (
                        <p id="c-email-err" className="mt-1 text-xs text-red-400">{errors.email}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="c-company" className="block text-sm font-medium text-foreground mb-1.5">
                        Company
                      </label>
                      <input
                        id="c-company"
                        type="text"
                        value={form.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        className={inputClass()}
                        placeholder="Company name"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="c-phone" className="block text-sm font-medium text-foreground mb-1.5">
                        Phone
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className={inputClass()}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-5">
                    <label htmlFor="c-message" className="block text-sm font-medium text-foreground mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="c-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className={cn(
                        inputClass(errors.message),
                        "h-auto py-3 resize-none"
                      )}
                      placeholder="How can we help?"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "c-msg-err" : undefined}
                    />
                    {errors.message && (
                      <p id="c-msg-err" className="mt-1 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={cn(
                      "mt-6 inline-flex items-center justify-center gap-2",
                      "h-11 px-6 text-sm font-semibold rounded-lg w-full sm:w-auto",
                      "bg-gradient-to-r from-brand-purple to-brand-magenta text-white",
                      "shadow-lg hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]",
                      "transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      "disabled:opacity-60 disabled:pointer-events-none"
                    )}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* ─── Right — Info ─── */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-8">
              {/* Contact details */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-5">
                  Contact information
                </h2>
                <ul className="space-y-4">
                  {[
                    { icon: Mail, label: "info@raabyt.com", href: "mailto:info@raabyt.com" },
                    { icon: Phone, label: "+1 (555) 987-6543", href: "tel:+15559876543" },
                    { icon: MapPin, label: "San Francisco, CA", href: undefined },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label} className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-purple/10 text-brand-purple">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="pt-1.5">
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-sm text-muted hover:text-foreground transition-colors"
                            >
                              {item.label}
                            </a>
                          ) : (
                            <span className="text-sm text-muted">
                              {item.label}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Social */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Follow us
                </h2>
                <div className="flex gap-3">
                  {[
                    { label: "LinkedIn", href: "https://linkedin.com/company/raabyt", icon: LinkedInIcon },
                    { label: "X", href: "https://x.com/raabyt", icon: XIcon },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg",
                          "bg-white/5 text-muted border border-white/5",
                          "transition-all duration-200",
                          "hover:bg-brand-purple/15 hover:text-brand-purple hover:border-brand-purple/25"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className={cn(
                  "rounded-xl aspect-[4/3] overflow-hidden",
                  "bg-white/5 border border-white/10",
                  "flex items-center justify-center"
                )}
              >
                <div className="text-center">
                  <MapPin className="mx-auto h-8 w-8 text-brand-purple/30 mb-2" />
                  <p className="text-xs text-muted/50">Map placeholder</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
