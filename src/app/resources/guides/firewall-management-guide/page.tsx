import type { Metadata } from "next";
import { FirewallGuideClient } from "./client";

export const metadata: Metadata = {
  title: "The Complete Guide to Unified Firewall Management",
  description:
    "Learn how unified firewall management centralizes security across multi-vendor environments. Covers architecture, AI threat detection, compliance, and zero trust.",
  alternates: { canonical: "/resources/guides/firewall-management-guide" },
  openGraph: {
    title: "The Complete Guide to Unified Firewall Management",
    description:
      "Everything security teams need to know about centralized firewall management across vendors.",
    type: "article",
    images: [{ url: "/og?title=The+Complete+Guide+to+Unified+Firewall+Management", width: 1200, height: 630 }],
  },
};

export default function FirewallGuidePage() {
  return <FirewallGuideClient />;
}
