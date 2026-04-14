import type { Metadata } from "next";
import { SalesPageClient } from "./client";

export const metadata: Metadata = {
  title: "Sales - Sales Automation",
  description:
    "Raabyt Sales delivers AI-powered quoting, order management, and revenue forecasting — deployed on-premise for enterprise security.",
};

export default function SalesPage() {
  return <SalesPageClient />;
}
