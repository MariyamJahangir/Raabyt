import type { Metadata } from "next";
import { DemoPageClient } from "./client";

export const metadata: Metadata = {
  title: "Request Demo",
  description:
    "Schedule a personalized demo of Raabyt's AI-powered enterprise software suite. See ERP, CRM, HRM, DMS, and more in action.",
};

export default function DemoPage() {
  return <DemoPageClient />;
}
