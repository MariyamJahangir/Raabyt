"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductsCurvedCarousel } from "@/components/features/products-curved-carousel";

export function ProductsOverview() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              align="left"
              eyebrow="Products"
              heading="One Platform. Every Solution."
              description="AI-powered enterprise software deployed on your infrastructure. Choose the modules you need — they all work together seamlessly."
            />
          </motion.div>
        </div>
      </section>

      {/* Curved 3D carousel */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            {/* Eyebrow above the carousel, matching the reference */}
            <p className="text-center text-xs font-medium uppercase tracking-widest text-muted/60 mb-8">
              Whole suite of enterprise modules
            </p>

            <ProductsCurvedCarousel />
          </motion.div>
        </div>
      </section>
    </>
  );
}
