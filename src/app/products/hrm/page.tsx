import type { Metadata } from "next";
import { HRMPageClient } from "./client";

export const metadata: Metadata = {
  title: "HRM - Human Resource Management",
  description:
    "Raabyt HRM delivers AI-powered payroll, attendance, recruitment, and employee management — deployed on-premise for maximum data privacy.",
};

export default function HRMPage() {
  return <HRMPageClient />;
}
