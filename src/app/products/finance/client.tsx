"use client";

import { PRODUCT_PAGES } from "@/lib/product-data";
import { ProductPageTemplate } from "@/components/features/product-page-template";

export function FinancePageClient() {
  return <ProductPageTemplate data={PRODUCT_PAGES.finance} />;
}
