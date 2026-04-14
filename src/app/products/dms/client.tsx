"use client";

import { PRODUCT_PAGES } from "@/lib/product-data";
import { ProductPageTemplate } from "@/components/features/product-page-template";

export function DMSPageClient() {
  return <ProductPageTemplate data={PRODUCT_PAGES.dms} />;
}
