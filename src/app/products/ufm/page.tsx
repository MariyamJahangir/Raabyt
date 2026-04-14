import type { Metadata } from "next";
import { UFMPageClient } from "./client";

export const metadata: Metadata = {
  title: "UFM - Unified Firewall Management",
  description:
    "Raabyt UFM provides centralized firewall management, AI-powered threat detection, and compliance reporting across all vendors — deployed on your infrastructure.",
};

export default function UFMPage() {
  return <UFMPageClient />;
}
