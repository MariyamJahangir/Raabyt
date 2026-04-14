import type { Metadata } from "next";
import { CRMPageClient } from "./client";

export const metadata: Metadata = {
  title: "CRM - Customer Relationship Management",
  description:
    "Raabyt CRM provides AI-powered pipeline management, contact tracking, and deal automation — deployed on-premise for full data sovereignty.",
};

export default function CRMPage() {
  return <CRMPageClient />;
}
