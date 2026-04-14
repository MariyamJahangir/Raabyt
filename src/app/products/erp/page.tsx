import type { Metadata } from "next";
import { ERPPageClient } from "./client";

export const metadata: Metadata = {
  title: "ERP - Enterprise Resource Planning",
  description:
    "Raabyt ERP delivers AI-powered enterprise resource planning with on-premise deployment. Manage operations, inventory, and manufacturing securely.",
};

export default function ERPPage() {
  return <ERPPageClient />;
}
