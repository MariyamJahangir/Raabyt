import type { Metadata } from "next";
import { ERPGuideClient } from "./client";

export const metadata: Metadata = {
  title: "The Complete Guide to Enterprise ERP in 2026",
  description:
    "A comprehensive guide to enterprise resource planning: what ERP is, how to evaluate vendors, cloud vs on-premise, AI capabilities, and implementation best practices.",
  alternates: { canonical: "/resources/guides/enterprise-erp-guide" },
  openGraph: {
    title: "The Complete Guide to Enterprise ERP in 2026",
    description:
      "Everything enterprises need to know about modern ERP systems — from vendor evaluation to implementation.",
    type: "article",
    images: [{ url: "/og?title=The+Complete+Guide+to+Enterprise+ERP+in+2026", width: 1200, height: 630 }],
  },
};

export default function ERPGuidePage() {
  return <ERPGuideClient />;
}
