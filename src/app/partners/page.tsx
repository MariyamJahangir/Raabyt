import type { Metadata } from "next";
import { PartnersPageClient } from "./client";

export const metadata: Metadata = {
  title: "Partner Program",
  description:
    "Join the Raabyt Partner Program. Resell, deploy, and grow with our enterprise software suite. Earn up to 45% discounts across Authorized, Silver, Gold, and Platinum tiers.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return <PartnersPageClient />;
}
