import type { Metadata } from "next";
import { FinancePageClient } from "./client";

export const metadata: Metadata = {
  title: "Finance - Financial Management",
  description:
    "Raabyt Finance provides AI-powered accounting, GL, AP/AR, and financial reporting — deployed on-premise for maximum data security.",
};

export default function FinancePage() {
  return <FinancePageClient />;
}
