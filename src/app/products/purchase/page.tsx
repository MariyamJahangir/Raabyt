import type { Metadata } from "next";
import { PurchasePageClient } from "./client";

export const metadata: Metadata = {
  title: "Purchase - Procurement Management",
  description:
    "Raabyt Purchase provides AI-powered procurement automation, vendor management, and PO workflows — deployed on-premise for enterprise control.",
};

export default function PurchasePage() {
  return <PurchasePageClient />;
}
