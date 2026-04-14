import type { Metadata } from "next";
import { ProductsOverview } from "./products-overview";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Raabyt's suite of AI-powered enterprise software: ERP, CRM, HRM, DMS, Sales, Purchase, Finance, and Unified Firewall Management.",
};

export default function ProductsPage() {
  return <ProductsOverview />;
}
