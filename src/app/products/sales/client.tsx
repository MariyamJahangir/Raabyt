"use client";

import { PRODUCT_PAGES } from "@/lib/product-data";
import { ProductPageTemplate } from "@/components/features/product-page-template";

export function SalesPageClient() {
  return <ProductPageTemplate data={PRODUCT_PAGES.sales} />;
}
