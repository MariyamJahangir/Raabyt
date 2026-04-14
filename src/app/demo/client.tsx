"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Presentation,
  Cpu,
  PieChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PRODUCTS } from "@/lib/constants";

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

/* ─── Types ─── */

interface DemoForm {
  name: string;
  email: string;
  company: string;
  companySize: string;
  products: string[];
  preferredDate: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  companySize?: string;
  products?: string;
}

const COMPANY_SIZES = [
  "1-50 employees",
  "51-200 employees",
  "201-1,000 employees",
  "1,001-5,000 employees",
  "5,000+ employees",
];

const BENEFITS = [
  {
    icon: Presentation,
    title: "Personalized walkthrough",
    description: "See the modules that matter most to your business, configured for your use case.",
  },
  {
    icon: Cpu,
    title: "Technical deep-dive",
    description: "Architecture, deployment options, security model, and integration capabilities.",
  },
  {
    icon: PieChart,
    title: "ROI assessment",
    description: "Custom analysis of time-to-value and cost savings based on your current stack.",
  },
];

/* ─── Component ─── */

export function DemoPageClient() {
  const [form, setForm] = useState<DemoForm>({
    name: "",
    email: "",
    company: "",
    companySize: "",
    products: [],
    preferredDate: "",
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
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.companySize) e.companySize = "Select company size";
    if (form.products.length === 0) e.products = "Select at least one product";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Demo request submitted:", form);
    setSubmitting(false);
    setSubmitted(true);
  };

  const updateField = (field: keyof DemoForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const toggleProduct = (slug: string) => {
    setForm((f) => ({
      ...f,
      products: f.products.includes(slug)
        ? f.products.filter((p) => p !== slug)
        : [...f.products, slug],
    }));
    if (errors.products) setErrors((e) => ({ ...e, products: undefined }));
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
    <section className="relative pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 70% 20%, rgba(139,92,246,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Request Demo" }]} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid lg:grid-cols-5 gap-12 lg:gap-16"
        >
          {/* ─── Left — Info ─── */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              See Raabyt{" "}
              <span className="bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent">
                in Action
              </span>
            </h1>
            <p className="mt-4 text-base text-muted leading-relaxed">
              Book a personalized demo with our solutions team. We&apos;ll walk
              you through the platform tailored to your industry and requirements.
            </p>

            <div className="mt-10 space-y-6">
              {BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-purple/10 text-brand-purple">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {b.title}
                      </h3>
                      <p className="text-sm text-muted mt-0.5 leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ─── Right — Form ─── */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
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
                  Demo requested!
                </h2>
                <p className="text-sm text-muted max-w-sm mx-auto">
                  We&apos;ll be in touch within 24 hours to confirm your demo
                  slot and prepare a personalized walkthrough.
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
                    <label htmlFor="d-name" className="block text-sm font-medium text-foreground mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="d-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className={inputClass(errors.name)}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "d-name-err" : undefined}
                    />
                    {errors.name && (
                      <p id="d-name-err" className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="d-email" className="block text-sm font-medium text-foreground mb-1.5">
                      Work Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="d-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={inputClass(errors.email)}
                      placeholder="you@company.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "d-email-err" : undefined}
                    />
                    {errors.email && (
                      <p id="d-email-err" className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="d-company" className="block text-sm font-medium text-foreground mb-1.5">
                      Company <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="d-company"
                      type="text"
                      value={form.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      className={inputClass(errors.company)}
                      placeholder="Company name"
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? "d-co-err" : undefined}
                    />
                    {errors.company && (
                      <p id="d-co-err" className="mt-1 text-xs text-red-400">{errors.company}</p>
                    )}
                  </div>

                  {/* Company Size */}
                  <div>
                    <label htmlFor="d-size" className="block text-sm font-medium text-foreground mb-1.5">
                      Company Size <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="d-size"
                      value={form.companySize}
                      onChange={(e) => updateField("companySize", e.target.value)}
                      className={cn(
                        inputClass(errors.companySize),
                        "appearance-none cursor-pointer",
                        !form.companySize && "text-muted/50"
                      )}
                      aria-invalid={!!errors.companySize}
                      aria-describedby={errors.companySize ? "d-size-err" : undefined}
                    >
                      <option value="" disabled>
                        Select size
                      </option>
                      {COMPANY_SIZES.map((s) => (
                        <option key={s} value={s} className="bg-surface text-foreground">
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.companySize && (
                      <p id="d-size-err" className="mt-1 text-xs text-red-400">{errors.companySize}</p>
                    )}
                  </div>
                </div>

                {/* Products multi-select */}
                <fieldset className="mt-5">
                  <legend className="block text-sm font-medium text-foreground mb-2">
                    Products Interested In <span className="text-red-400">*</span>
                  </legend>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PRODUCTS.map((product) => {
                      const checked = form.products.includes(product.slug);
                      return (
                        <label
                          key={product.slug}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-2.5 cursor-pointer",
                            "border text-sm transition-all duration-150",
                            checked
                              ? "bg-brand-purple/15 border-brand-purple/40 text-foreground"
                              : "bg-white/5 border-white/10 text-muted hover:bg-white/10"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleProduct(product.slug)}
                            className="sr-only"
                          />
                          <div
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                              checked
                                ? "bg-brand-purple border-brand-purple"
                                : "border-white/20 bg-transparent"
                            )}
                          >
                            {checked && (
                              <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          {product.name}
                        </label>
                      );
                    })}
                  </div>
                  {errors.products && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.products}</p>
                  )}
                </fieldset>

                {/* Preferred Date */}
                <div className="mt-5">
                  <label htmlFor="d-date" className="block text-sm font-medium text-foreground mb-1.5">
                    Preferred Demo Date
                  </label>
                  <input
                    id="d-date"
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) => updateField("preferredDate", e.target.value)}
                    className={cn(inputClass(), "cursor-pointer")}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Message */}
                <div className="mt-5">
                  <label htmlFor="d-message" className="block text-sm font-medium text-foreground mb-1.5">
                    Anything else we should know?
                  </label>
                  <textarea
                    id="d-message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className={cn(inputClass(), "h-auto py-3 resize-none")}
                    placeholder="Current tools, pain points, timeline..."
                  />
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request Demo
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
