"use client";

import { PRODUCT_PAGES } from "@/lib/product-data";
import { ProductPageTemplate } from "@/components/features/product-page-template";

export function HRMPageClient() {
  return <ProductPageTemplate data={PRODUCT_PAGES.hrm} />;
}
